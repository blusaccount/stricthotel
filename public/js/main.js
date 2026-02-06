// ============================
// MÄXCHEN ONLINE - Main Entry
// ============================

// Socket connection
const socket = io();

// DOM helper
const $ = id => document.getElementById(id);

// Screens
const screens = {
    start: $('screen-start'),
    waiting: $('screen-waiting'),
    game: $('screen-game'),
    reveal: $('screen-reveal'),
    gameover: $('screen-gameover')
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

// Client state
const state = {
    mySocketId: null,
    roomCode: null,
    isHost: false,
    playerName: '',
    gamePlayers: [],
    myPlayerIndex: -1,
    currentPlayerIndex: -1
};

// Socket ID
socket.on('connect', () => {
    state.mySocketId = socket.id;
});

// Error handling
socket.on('error', ({ message }) => {
    console.warn('Server:', message);
    const errorEl = $('start-error');
    if (errorEl) errorEl.textContent = message;
});

// Export for global access
window.MaexchenApp = { socket, $, showScreen, state };
