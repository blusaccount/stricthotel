import { isDatabaseEnabled, query, withTransaction } from './db.js';
import { addBalance } from './currency.js';

const streaksMemory = new Map(); // name -> { currentStreak, maxStreak, lastDay }

const REWARD_PER_DAY = 5;
const REWARD_MAX = 50;

function getUtcDayNumber(date = new Date()) {
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
}

function dayNumberToDateString(dayNumber) {
    return new Date(dayNumber * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

async function getOrCreatePlayerId(playerName, client) {
    const runner = client || { query };
    await runner.query(
        `insert into players (name, balance)
         values ($1, $2)
         on conflict (name) do nothing`,
        [playerName, 1000]
    );

    const result = await runner.query(
        'select id from players where name = $1',
        [playerName]
    );

    return result.rows[0]?.id || null;
}

function computeReward(streak) {
    return Math.min(REWARD_MAX, streak * REWARD_PER_DAY);
}

function computeNextStreak({ lastDay, currentStreak }, todayDay) {
    if (lastDay === todayDay) {
        return { currentStreak, alreadyCompleted: true };
    }
    if (lastDay === todayDay - 1) {
        return { currentStreak: currentStreak + 1, alreadyCompleted: false };
    }
    return { currentStreak: 1, alreadyCompleted: false };
}

export async function recordDailyCompletion(playerName, date = new Date()) {
    const todayDay = getUtcDayNumber(date);
    const todayDate = dayNumberToDateString(todayDay);

    if (!isDatabaseEnabled()) {
        const entry = streaksMemory.get(playerName) || { currentStreak: 0, maxStreak: 0, lastDay: null };
        const { currentStreak, alreadyCompleted } = computeNextStreak(entry, todayDay);
        const maxStreak = Math.max(entry.maxStreak || 0, currentStreak);

        entry.currentStreak = currentStreak;
        entry.maxStreak = maxStreak;
        entry.lastDay = todayDay;
        streaksMemory.set(playerName, entry);

        const rewardCoins = alreadyCompleted ? 0 : computeReward(currentStreak);
        if (rewardCoins > 0) {
            await addBalance(playerName, rewardCoins, 'turkish_daily', { day: todayDate, streak: currentStreak });
        }

        return {
            ok: true,
            alreadyCompleted,
            rewardCoins,
            currentStreak,
            maxStreak,
            day: todayDate
        };
    }

    return withTransaction(async (client) => {
        const playerId = await getOrCreatePlayerId(playerName, client);
        if (!playerId) {
            return { ok: false, error: 'Player not found' };
        }

        const current = await client.query(
            `select current_streak, max_streak, last_completed_day
             from turkish_streaks
             where player_id = $1`,
            [playerId]
        );

        const row = current.rows[0];
        const lastDay = row ? Number(row.last_completed_day) : null;
        const existingCurrent = row ? Number(row.current_streak) : 0;
        const existingMax = row ? Number(row.max_streak) : 0;

        const { currentStreak, alreadyCompleted } = computeNextStreak(
            { lastDay, currentStreak: existingCurrent },
            todayDay
        );
        const maxStreak = Math.max(existingMax, currentStreak);

        if (row) {
            await client.query(
                `update turkish_streaks
                 set current_streak = $1, max_streak = $2, last_completed_day = $3
                 where player_id = $4`,
                [currentStreak, maxStreak, todayDay, playerId]
            );
        } else {
            await client.query(
                `insert into turkish_streaks (player_id, current_streak, max_streak, last_completed_day)
                 values ($1, $2, $3, $4)`,
                [playerId, currentStreak, maxStreak, todayDay]
            );
        }

        const rewardCoins = alreadyCompleted ? 0 : computeReward(currentStreak);
        if (rewardCoins > 0) {
            await addBalance(playerName, rewardCoins, 'turkish_daily', { day: todayDate, streak: currentStreak }, client);
        }

        return {
            ok: true,
            alreadyCompleted,
            rewardCoins,
            currentStreak,
            maxStreak,
            day: todayDate
        };
    });
}

export async function getTurkishLeaderboard(limit = 10) {
    if (!isDatabaseEnabled()) {
        const entries = [];
        for (const [name, streak] of streaksMemory.entries()) {
            entries.push({
                name,
                currentStreak: streak.currentStreak || 0,
                maxStreak: streak.maxStreak || 0
            });
        }
        entries.sort((a, b) => {
            if (b.currentStreak !== a.currentStreak) return b.currentStreak - a.currentStreak;
            if (b.maxStreak !== a.maxStreak) return b.maxStreak - a.maxStreak;
            return a.name.localeCompare(b.name);
        });
        return entries.slice(0, limit);
    }

    const result = await query(
        `select p.name, ts.current_streak, ts.max_streak
         from turkish_streaks ts
         join players p on p.id = ts.player_id
         order by ts.current_streak desc, ts.max_streak desc, p.name asc
         limit $1`,
        [limit]
    );

    return result.rows.map(r => ({
        name: r.name,
        currentStreak: Number(r.current_streak),
        maxStreak: Number(r.max_streak)
    }));
}

export function getDailyRewardInfo(streak) {
    return {
        rewardCoins: computeReward(streak),
        rewardMax: REWARD_MAX,
        rewardPerDay: REWARD_PER_DAY
    };
}
