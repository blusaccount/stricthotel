import { describe, it, expect, beforeEach, vi } from 'vitest';

let recordSnapshot, getHistory;

beforeEach(async () => {
    vi.resetModules();
    const mod = await import('../portfolio-history.js');
    recordSnapshot = mod.recordSnapshot;
    getHistory = mod.getHistory;
});

describe('portfolio-history', () => {
    it('returns empty array for unknown player', () => {
        expect(getHistory('nobody')).toEqual([]);
    });

    it('records and retrieves snapshots', () => {
        recordSnapshot('alice', 100, 50);
        recordSnapshot('alice', 120, 30);
        const history = getHistory('alice');
        expect(history).toHaveLength(2);
        expect(history[0]).toMatchObject({ portfolioValue: 100, cash: 50, netWorth: 150 });
        expect(history[1]).toMatchObject({ portfolioValue: 120, cash: 30, netWorth: 150 });
        expect(typeof history[0].ts).toBe('number');
    });

    it('rounds values to 2 decimal places', () => {
        recordSnapshot('bob', 100.555, 50.111);
        const snap = getHistory('bob')[0];
        expect(snap.portfolioValue).toBe(100.56);
        expect(snap.cash).toBe(50.11);
        expect(snap.netWorth).toBe(150.67);
    });

    it('keeps players isolated', () => {
        recordSnapshot('alice', 100, 50);
        recordSnapshot('bob', 200, 80);
        expect(getHistory('alice')).toHaveLength(1);
        expect(getHistory('bob')).toHaveLength(1);
    });
});
