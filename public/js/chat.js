// ============================
// CHAT MODULE - Alien Transmission System
// ============================

(function() {
    const { socket, $, state } = window.MaexchenApp;

    let chatVisible = false;

    // Initialize chat
    function initChat() {
        const sendBtn = $('btn-send');
        const chatInput = $('chat-input');

        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Listen for chat broadcasts
        socket.on('chat-broadcast', handleChatBroadcast);

        // Listen for system messages
        socket.on('system-message', handleSystemMessage);
    }

    // Show chat panel
    function showChat() {
        const panel = $('chat-panel');
        if (panel) {
            panel.style.display = 'flex';
            chatVisible = true;
        }
    }

    // Hide chat panel
    function hideChat() {
        const panel = $('chat-panel');
        if (panel) {
            panel.style.display = 'none';
            chatVisible = false;
        }
    }

    // Send a message
    function sendMessage() {
        const input = $('chat-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        socket.emit('chat-message', text);
        input.value = '';
    }

    // Handle incoming chat broadcast
    function handleChatBroadcast({ playerName, text, timestamp }) {
        displayMessage({
            sender: playerName,
            text: text,
            timestamp: timestamp,
            isSystem: false
        });

        // TTS - speak the message with player's voice
        if (window.MaexchenTTS && playerName !== state.playerName) {
            window.MaexchenTTS.speakPlayerMessage(playerName, text);
        }
    }

    // Handle system messages
    function handleSystemMessage({ text, timestamp }) {
        displayMessage({
            sender: 'SYSTEM',
            text: text,
            timestamp: timestamp,
            isSystem: true
        });
    }

    // Display a message in the chat
    function displayMessage({ sender, text, timestamp, isSystem }) {
        const messagesContainer = $('chat-messages');
        if (!messagesContainer) return;

        const msgEl = document.createElement('div');
        msgEl.className = 'chat-message' + (isSystem ? ' system' : '');

        const time = timestamp ? new Date(timestamp).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        }) : '';

        msgEl.innerHTML = `
            <div class="sender">${escapeHtml(sender)}</div>
            <div class="text">${escapeHtml(text)}</div>
            ${time ? `<div class="timestamp">${time}</div>` : ''}
        `;

        messagesContainer.appendChild(msgEl);
        scrollToBottom();

        // Remove old messages if too many
        while (messagesContainer.children.length > 50) {
            messagesContainer.removeChild(messagesContainer.firstChild);
        }
    }

    // Add a local system message (not from server)
    function addLocalMessage(text) {
        displayMessage({
            sender: 'SYSTEM',
            text: text,
            timestamp: Date.now(),
            isSystem: true
        });
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        const container = $('chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    // Clear all messages
    function clearMessages() {
        const container = $('chat-messages');
        if (container) {
            container.innerHTML = '';
        }
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }

    // Public API
    window.MaexchenChat = {
        showChat,
        hideChat,
        sendMessage,
        displayMessage,
        addLocalMessage,
        clearMessages,
        scrollToBottom
    };
})();
