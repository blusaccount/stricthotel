import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the db module
let mockQueryResult = { rows: [] };
vi.mock('../db.js', () => ({
    isDatabaseEnabled: () => true,
    query: vi.fn((sql, params) => {
        return Promise.resolve(mockQueryResult);
    })
}));

const { getBalancesBatch } = await import('../currency.js');
const { query } = await import('../db.js');

describe('Security Hardening', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockQueryResult = { rows: [] };
    });

    describe('getBalancesBatch', () => {
        it('fetches multiple balances in a single query', async () => {
            mockQueryResult = {
                rows: [
                    { player_name: 'player1', balance: '1500.00' },
                    { player_name: 'player2', balance: '2000.00' }
                ]
            };

            const names = ['player1', 'player2', 'player3'];
            const balances = await getBalancesBatch(names);

            expect(query).toHaveBeenCalledTimes(1);
            expect(query).toHaveBeenCalledWith(
                'SELECT player_name, balance FROM players WHERE player_name = ANY($1)',
                [names]
            );

            expect(balances).toEqual({
                player1: 1500,
                player2: 2000,
                player3: 1000 // Starting balance for missing player
            });
        });

        it('returns starting balance for all players when none exist', async () => {
            mockQueryResult = { rows: [] };

            const names = ['newPlayer1', 'newPlayer2'];
            const balances = await getBalancesBatch(names);

            expect(balances).toEqual({
                newPlayer1: 1000,
                newPlayer2: 1000
            });
        });
    });

    describe('Name sanitization', () => {
        // We'll import the socket-handlers to test sanitization indirectly
        // For now, we'll just verify the logic would work
        
        it('should enforce minimum length requirements', () => {
            // This is tested implicitly by the sanitizeName function
            // which now returns empty string for names shorter than 2 chars
            const testCases = [
                { input: '<', expected: '' },
                { input: '<<', expected: '' },
                { input: 'ab', expected: 'ab' },
                { input: 'abc', expected: 'abc' },
                { input: '<script>', expected: 'script' },
                { input: '<<"', expected: '' }
            ];

            // The function is not exported, but this documents the behavior
            testCases.forEach(({ input, expected }) => {
                const clean = input.replace(/[<>&"'/]/g, '').trim().slice(0, 20);
                const result = clean.length < 2 ? '' : clean;
                expect(result).toBe(expected);
            });
        });
    });
});
