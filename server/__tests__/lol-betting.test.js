import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the db module so lol-betting.js uses in-memory mode
vi.mock('../db.js', () => ({
    isDatabaseEnabled: () => false,
    query: vi.fn()
}));

const { placeBet, getActiveBets, getPlayerBets, resolveBet, getPendingBetsForChecking } = await import('../lol-betting.js');

describe('lol-betting (in-memory mode)', () => {
    describe('placeBet', () => {
        it('creates a pending bet', async () => {
            const bet = await placeBet('alice', 'Player#NA1', 100, true);
            expect(bet).toMatchObject({
                playerName: 'alice',
                lolUsername: 'Player#NA1',
                amount: 100,
                betOnWin: true,
                status: 'pending'
            });
            expect(bet.id).toBeDefined();
            expect(bet.createdAt).toBeDefined();
        });

        it('assigns incrementing IDs', async () => {
            const bet1 = await placeBet('charlie', 'A#NA1', 50, false);
            const bet2 = await placeBet('charlie', 'B#NA1', 75, true);
            expect(bet2.id).toBeGreaterThan(bet1.id);
        });

        it('accepts optional client parameter without error', async () => {
            const bet = await placeBet('bob', 'Player#NA1', 50, false, null);
            expect(bet.playerName).toBe('bob');
        });
    });

    describe('getActiveBets', () => {
        it('returns pending bets', async () => {
            const bets = await getActiveBets();
            expect(bets.length).toBeGreaterThan(0);
            expect(bets.every(b => b.status === 'pending')).toBe(true);
        });
        it('returns active bets sorted newest first', async () => {
            await placeBet('dave', 'X#NA1', 10, true);
            await placeBet('eve', 'Y#NA1', 20, false);
            const active = await getActiveBets();
            expect(active.length).toBeGreaterThanOrEqual(2);
            const dates = active.map(b => new Date(b.createdAt).getTime());
            for (let i = 1; i < dates.length; i++) {
                expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
            }
        });
    });

    describe('getPlayerBets', () => {
        it('returns bets for a specific player', async () => {
            const bets = await getPlayerBets('alice');
            expect(bets.length).toBeGreaterThan(0);
            expect(bets.every(b => b.playerName === 'alice')).toBe(true);
        });

        it('limits player bets to the requested count', async () => {
            for (let i = 0; i < 5; i++) {
                await placeBet('grace', `P${i}#NA1`, 10, true);
            }
            const limited = await getPlayerBets('grace', 3);
            expect(limited.length).toBe(3);
        });

        it('returns empty array for unknown player', async () => {
            const bets = await getPlayerBets('unknown_player_xyz');
            expect(bets).toEqual([]);
        });
    });

    describe('placeBet with puuid and lastMatchId', () => {
        it('stores puuid and lastMatchId when provided', async () => {
            const bet = await placeBet('frank', 'TestPlayer#NA1', 200, true, 'test-puuid-123', 'NA1_4567890');
            expect(bet.puuid).toBe('test-puuid-123');
            expect(bet.lastMatchId).toBe('NA1_4567890');
            expect(bet.status).toBe('pending');
        });

        it('accepts null puuid and lastMatchId', async () => {
            const bet = await placeBet('george', 'AnotherPlayer#EUW', 150, false, null, null);
            expect(bet.puuid).toBeNull();
            expect(bet.lastMatchId).toBeNull();
        });
    });

    describe('getPendingBetsForChecking', () => {
        it('returns only pending bets with puuid and lastMatchId', async () => {
            // Create bets with and without puuid/lastMatchId
            await placeBet('harry', 'WithData#NA1', 100, true, 'puuid-1', 'match-1');
            await placeBet('ian', 'NoData#NA1', 100, true, null, null);
            await placeBet('jane', 'OnlyPuuid#NA1', 100, false, 'puuid-2', null);
            
            const pending = await getPendingBetsForChecking();
            
            // Should only return bets with both puuid AND lastMatchId
            const withData = pending.filter(b => b.playerName === 'harry');
            expect(withData.length).toBe(1);
            expect(withData[0].puuid).toBe('puuid-1');
            expect(withData[0].lastMatchId).toBe('match-1');
        });
    });
});
