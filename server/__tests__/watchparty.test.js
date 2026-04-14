import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerWatchpartyHandlers } from '../handlers/watchparty.js';

function createMockSocket() {
    const handlers = {};
    return {
        id: 'test-socket-1',
        handlers,
        on(event, fn) { handlers[event] = fn; },
        emit: vi.fn(),
        to: vi.fn(() => ({ emit: vi.fn() })),
        trigger(event, data) { handlers[event]?.(data); }
    };
}

function createMockIo() {
    const roomEmit = vi.fn();
    return {
        roomEmit,
        to: vi.fn(() => ({ emit: roomEmit }))
    };
}

describe('watchparty handler', () => {
    let socket, io, checkRateLimit, getRoom, room;

    beforeEach(() => {
        socket = createMockSocket();
        io = createMockIo();
        checkRateLimit = vi.fn(() => true);
        room = {
            code: 'ABCD',
            gameType: 'watchparty',
            players: [{ socketId: 'test-socket-1', name: 'Alice' }],
            watchparty: { videoId: 'dQw4w9WgXcQ', state: 'playing', time: 42, updatedAt: Date.now() }
        };
        getRoom = vi.fn(() => room);

        registerWatchpartyHandlers(socket, io, { checkRateLimit, getRoom });
    });

    // ==================== HEARTBEAT ====================

    describe('watchparty-heartbeat', () => {
        it('should respond with heartbeat-ack when in a watchparty room', () => {
            socket.trigger('watchparty-heartbeat');

            const ackCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-heartbeat-ack');
            expect(ackCall).toBeTruthy();
        });

        it('should not respond if rate limited', () => {
            checkRateLimit.mockReturnValue(false);
            socket.trigger('watchparty-heartbeat');

            expect(socket.emit).not.toHaveBeenCalled();
        });

        it('should not respond if not in a room', () => {
            getRoom.mockReturnValue(null);
            socket.trigger('watchparty-heartbeat');

            expect(socket.emit).not.toHaveBeenCalled();
        });

        it('should not respond if room is not a watchparty', () => {
            room.gameType = 'maexchen';
            socket.trigger('watchparty-heartbeat');

            expect(socket.emit).not.toHaveBeenCalled();
        });
    });

    // ==================== LOAD ====================

    describe('watchparty-load', () => {
        it('should broadcast video to room on valid load', () => {
            socket.trigger('watchparty-load', 'dQw4w9WgXcQ');

            const videoCall = io.roomEmit.mock.calls.find(c => c[0] === 'watchparty-video');
            expect(videoCall).toBeTruthy();
            expect(videoCall[1].videoId).toBe('dQw4w9WgXcQ');
            expect(videoCall[1].state).toBe('paused');
            expect(videoCall[1].time).toBe(0);
        });

        it('should reject invalid video IDs', () => {
            socket.trigger('watchparty-load', '');

            expect(io.roomEmit).not.toHaveBeenCalled();
        });

        it('should emit error on invalid video ID', () => {
            socket.trigger('watchparty-load', '');

            const errorCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-error');
            expect(errorCall).toBeTruthy();
            expect(errorCall[1].message).toContain('Ungültige');
        });

        it('should reject non-string video IDs', () => {
            socket.trigger('watchparty-load', 12345);

            expect(io.roomEmit).not.toHaveBeenCalled();
            const errorCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-error');
            expect(errorCall).toBeTruthy();
        });

        it('should reset watchparty state on new video load', () => {
            room.watchparty = { videoId: 'oldVideo1234', state: 'playing', time: 100, updatedAt: Date.now() };
            socket.trigger('watchparty-load', 'xYz123AbCdE');

            expect(room.watchparty.videoId).toBe('xYz123AbCdE');
            expect(room.watchparty.state).toBe('paused');
            expect(room.watchparty.time).toBe(0);
        });

        it('should not load if not in a room', () => {
            getRoom.mockReturnValue(null);
            socket.trigger('watchparty-load', 'dQw4w9WgXcQ');

            expect(io.roomEmit).not.toHaveBeenCalled();
        });

        it('should not load if room is not a watchparty', () => {
            room.gameType = 'maexchen';
            socket.trigger('watchparty-load', 'dQw4w9WgXcQ');

            expect(io.roomEmit).not.toHaveBeenCalled();
        });

        it('should initialize watchparty object if not present', () => {
            delete room.watchparty;
            socket.trigger('watchparty-load', 'dQw4w9WgXcQ');

            expect(room.watchparty).toBeDefined();
            expect(room.watchparty.videoId).toBe('dQw4w9WgXcQ');
        });
    });

    // ==================== PLAY/PAUSE ====================

    describe('watchparty-playpause', () => {
        it('should broadcast playing state to other clients', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'playing', time: 10.5 });

            expect(socket.to).toHaveBeenCalledWith('ABCD');
            expect(toEmit).toHaveBeenCalledWith('watchparty-sync', expect.objectContaining({
                state: 'playing',
                time: 10.5
            }));
        });

        it('should broadcast paused state to other clients', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'paused', time: 25 });

            expect(toEmit).toHaveBeenCalledWith('watchparty-sync', expect.objectContaining({
                state: 'paused',
                time: 25
            }));
        });

        it('should update room watchparty state', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'playing', time: 15 });

            expect(room.watchparty.state).toBe('playing');
            expect(room.watchparty.time).toBe(15);
        });

        it('should normalize invalid state to paused', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'invalid', time: 5 });

            expect(room.watchparty.state).toBe('paused');
        });

        it('should clamp negative time to 0', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'playing', time: -10 });

            expect(room.watchparty.time).toBe(0);
        });

        it('should default time to 0 for non-number', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'playing', time: 'abc' });

            expect(room.watchparty.time).toBe(0);
        });

        it('should reject non-object data', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', 'invalid');

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should reject null data', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', null);

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should not broadcast if no video loaded', () => {
            room.watchparty = {};
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-playpause', { state: 'playing', time: 5 });

            expect(toEmit).not.toHaveBeenCalled();
        });
    });

    // ==================== SEEK ====================

    describe('watchparty-seek', () => {
        it('should broadcast seek time to other clients', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', 30.5);

            expect(socket.to).toHaveBeenCalledWith('ABCD');
            expect(toEmit).toHaveBeenCalledWith('watchparty-sync', expect.objectContaining({
                state: 'playing',
                time: 30.5
            }));
        });

        it('should update room watchparty time', () => {
            socket.to.mockReturnValue({ emit: vi.fn() });

            socket.trigger('watchparty-seek', 55);

            expect(room.watchparty.time).toBe(55);
        });

        it('should clamp negative time to 0', () => {
            socket.to.mockReturnValue({ emit: vi.fn() });

            socket.trigger('watchparty-seek', -20);

            expect(room.watchparty.time).toBe(0);
        });

        it('should reject non-number time', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', 'abc');

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should reject NaN time', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', NaN);

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should reject Infinity time', () => {
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', Infinity);

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should not seek if no video loaded', () => {
            room.watchparty = {};
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', 10);

            expect(toEmit).not.toHaveBeenCalled();
        });

        it('should not seek if not in a room', () => {
            getRoom.mockReturnValue(null);
            const toEmit = vi.fn();
            socket.to.mockReturnValue({ emit: toEmit });

            socket.trigger('watchparty-seek', 10);

            expect(toEmit).not.toHaveBeenCalled();
        });
    });

    // ==================== REQUEST SYNC ====================

    describe('watchparty-request-sync', () => {
        it('should send current video state to requester', () => {
            socket.trigger('watchparty-request-sync');

            const videoCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-video');
            expect(videoCall).toBeTruthy();
            expect(videoCall[1].videoId).toBe('dQw4w9WgXcQ');
            expect(videoCall[1].state).toBe('playing');
            expect(videoCall[1].time).toBe(42);
        });

        it('should not send if no video loaded', () => {
            room.watchparty = {};
            socket.trigger('watchparty-request-sync');

            const videoCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-video');
            expect(videoCall).toBeUndefined();
        });

        it('should not send if no watchparty state', () => {
            delete room.watchparty;
            socket.trigger('watchparty-request-sync');

            const videoCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-video');
            expect(videoCall).toBeUndefined();
        });

        it('should not send if not in a room', () => {
            getRoom.mockReturnValue(null);
            socket.trigger('watchparty-request-sync');

            const videoCall = socket.emit.mock.calls.find(c => c[0] === 'watchparty-video');
            expect(videoCall).toBeUndefined();
        });
    });
});
