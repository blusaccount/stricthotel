// ============================
// LOBBY MODULE
// ============================

(function() {
    const { socket, $, showScreen, state } = window.MaexchenApp;

    // --- Create Room ---
    $('btn-create').addEventListener('click', () => {
        const name = $('input-name').value.trim();
        if (!name) {
            $('start-error').textContent = 'Bitte gib einen Namen ein!';
            return;
        }
        state.playerName = name;
        $('start-error').textContent = '';

        // Check if character exists, if not show creator
        if (window.MaexchenCreator && !window.MaexchenCreator.hasCharacter()) {
            window.MaexchenCreator.showCreator(() => {
                const character = window.MaexchenCreator.getCharacter();
                socket.emit('create-room', { playerName: name, character });
            });
        } else {
            const character = window.MaexchenCreator ? window.MaexchenCreator.getCharacter() : null;
            socket.emit('create-room', { playerName: name, character });
        }
    });

    // --- Join Room ---
    $('btn-join').addEventListener('click', () => {
        const name = $('input-name').value.trim();
        const code = $('input-code').value.trim().toUpperCase();

        if (!name) {
            $('start-error').textContent = 'Bitte gib einen Namen ein!';
            return;
        }
        if (!code || code.length !== 4) {
            $('start-error').textContent = 'Bitte 4-stelligen Code eingeben!';
            return;
        }

        state.playerName = name;
        $('start-error').textContent = '';

        // Check if character exists, if not show creator
        if (window.MaexchenCreator && !window.MaexchenCreator.hasCharacter()) {
            window.MaexchenCreator.showCreator(() => {
                const character = window.MaexchenCreator.getCharacter();
                socket.emit('join-room', { code, playerName: name, character });
            });
        } else {
            const character = window.MaexchenCreator ? window.MaexchenCreator.getCharacter() : null;
            socket.emit('join-room', { code, playerName: name, character });
        }
    });

    // Edit character button
    $('btn-edit-character').addEventListener('click', () => {
        if (window.MaexchenCreator) {
            window.MaexchenCreator.showCreator(() => {
                updateCharacterPreview();
            });
        }
    });

    // Update character preview on start screen
    function updateCharacterPreview() {
        const avatarSpan = $('current-avatar');
        if (avatarSpan && window.MaexchenCreator) {
            if (window.MaexchenCreator.hasCharacter()) {
                window.MaexchenCreator.loadSavedCharacter();
                avatarSpan.textContent = window.MaexchenCreator.getAvatarDisplay();
            } else {
                avatarSpan.textContent = '👽';
            }
        }
    }

    // Initialize character preview
    setTimeout(updateCharacterPreview, 100);

    // Enter key handlers
    $('input-name').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const code = $('input-code').value.trim();
            if (code.length === 4) {
                $('btn-join').click();
            } else {
                $('btn-create').click();
            }
        }
    });

    $('input-code').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') $('btn-join').click();
    });

    // --- Room Created ---
    socket.on('room-created', ({ code }) => {
        state.roomCode = code;
        state.isHost = true;
        $('room-code-display').textContent = code;
        showScreen('waiting');

        // Show chat panel
        if (window.MaexchenChat) {
            window.MaexchenChat.showChat();
            window.MaexchenChat.addLocalMessage('Raum erstellt. Warte auf Spieler...');
        }
    });

    // --- Room Joined ---
    socket.on('room-joined', ({ code }) => {
        state.roomCode = code;
        state.isHost = false;
        $('room-code-display').textContent = code;
        showScreen('waiting');

        // Show chat panel
        if (window.MaexchenChat) {
            window.MaexchenChat.showChat();
            window.MaexchenChat.addLocalMessage('Raum beigetreten!');
        }

        // Trigger join reaction
        if (window.MaexchenReactions) {
            window.MaexchenReactions.showReactionCentered('join');
        }
    });

    // --- Room Update ---
    socket.on('room-update', ({ players, hostId }) => {
        renderPlayerList(players);
        state.isHost = (hostId === state.mySocketId);

        // Show/hide start button
        const canStart = state.isHost && players.length >= 2;
        $('btn-start-game').style.display = canStart ? 'inline-block' : 'none';
        $('waiting-hint').textContent = players.length < 2
            ? 'Warte auf weitere Spieler...'
            : (state.isHost ? '' : 'Warte auf den Host...');
    });

    // --- Start Game ---
    $('btn-start-game').addEventListener('click', () => {
        socket.emit('start-game');
    });

    // --- Player Left ---
    socket.on('player-left', ({ playerName }) => {
        console.log(`${playerName} hat den Raum verlassen`);
    });

    function renderPlayerList(players) {
        const list = $('player-list');
        list.innerHTML = '';

        players.forEach(p => {
            const item = document.createElement('div');
            item.className = 'player-item';

            // Get character display
            let avatar = '👽';
            if (p.character && p.character.display) {
                avatar = p.character.display;
            }

            let badges = '';
            if (p.isHost) badges += '<span class="badge badge-host">HOST</span>';
            if (p.name === state.playerName) badges += '<span class="badge badge-you">DU</span>';

            item.innerHTML = `<span class="player-avatar">${avatar}</span><span>${p.name}</span>${badges}`;
            list.appendChild(item);
        });
    }
})();
