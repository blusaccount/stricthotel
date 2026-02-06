// ============================
// CHARACTER CREATOR MODULE - Mii Style
// ============================

(function() {
    const { $ } = window.MaexchenApp;

    // Character parts (first option is always "none")
    const PARTS = {
        // Basis-Formen die als Gesicht funktionieren
        base: ['👽', '🤖', '👾', '💀', '🎃', '🌚', '🌝', '🔵', '🟣', '⚫'],
        // Augen - können weggelassen werden
        eyes: ['—', '👀', '👁️', '⭐', '✨', '🔥', '❄️', '💢', '♦️', '●●'],
        // Mund - kann weggelassen werden
        mouth: ['—', '👄', '〰️', '💋', '🔻', '⚡', '✖️', '═', '♪', '◡'],
        // Accessoires auf dem Kopf
        accessory: ['—', '👑', '🎩', '🎀', '💎', '🌸', '⭐', '🔮', '👓', '🎭']
    };

    const COLORS = [
        '#00ff88', '#00aaff', '#ff3366', '#ffdd00',
        '#ff6600', '#aa00ff', '#00ffff', '#ff00ff'
    ];

    // Current character state
    let currentCharacter = {
        base: 0,
        eyes: 1, // Default: 👀
        mouth: 1, // Default: 👄
        accessory: 0, // Default: none
        color: 0
    };

    let onCompleteCallback = null;

    // Show character creator
    function showCreator(onComplete) {
        onCompleteCallback = onComplete;

        // Load saved character if exists
        const saved = localStorage.getItem('maexchen-character');
        if (saved) {
            try {
                currentCharacter = JSON.parse(saved);
            } catch (e) {}
        }

        createCreatorUI();
        updatePreview();
    }

    // Create the creator UI
    function createCreatorUI() {
        // Remove existing
        const existing = document.getElementById('character-creator');
        if (existing) existing.remove();

        const creator = document.createElement('div');
        creator.id = 'character-creator';

        creator.innerHTML = `
            <div class="creator-title">CHARAKTER ERSTELLEN</div>

            <div class="avatar-preview" id="avatar-preview">
                <div class="avatar-layer base"></div>
                <div class="avatar-layer eyes"></div>
                <div class="avatar-layer mouth"></div>
                <div class="avatar-layer accessory"></div>
            </div>

            <div class="creator-section">
                <div class="creator-section-title">Basis</div>
                <div class="creator-options" id="options-base">
                    ${PARTS.base.map((p, i) => `
                        <button class="creator-option ${i === currentCharacter.base ? 'selected' : ''}"
                                data-part="base" data-index="${i}">${p}</button>
                    `).join('')}
                </div>
            </div>

            <div class="creator-section">
                <div class="creator-section-title">Augen</div>
                <div class="creator-options" id="options-eyes">
                    ${PARTS.eyes.map((p, i) => `
                        <button class="creator-option ${i === currentCharacter.eyes ? 'selected' : ''}"
                                data-part="eyes" data-index="${i}">${p === '—' ? '✖️' : p}</button>
                    `).join('')}
                </div>
            </div>

            <div class="creator-section">
                <div class="creator-section-title">Mund</div>
                <div class="creator-options" id="options-mouth">
                    ${PARTS.mouth.map((p, i) => `
                        <button class="creator-option ${i === currentCharacter.mouth ? 'selected' : ''}"
                                data-part="mouth" data-index="${i}">${p === '—' ? '✖️' : p}</button>
                    `).join('')}
                </div>
            </div>

            <div class="creator-section">
                <div class="creator-section-title">Accessoire</div>
                <div class="creator-options" id="options-accessory">
                    ${PARTS.accessory.map((p, i) => `
                        <button class="creator-option ${i === currentCharacter.accessory ? 'selected' : ''}"
                                data-part="accessory" data-index="${i}">${p === '—' ? '✖️' : p}</button>
                    `).join('')}
                </div>
            </div>

            <div class="creator-section">
                <div class="creator-section-title">Farbe</div>
                <div class="creator-options" id="options-color">
                    ${COLORS.map((c, i) => `
                        <button class="color-option ${i === currentCharacter.color ? 'selected' : ''}"
                                data-color="${i}" style="background: ${c}"></button>
                    `).join('')}
                </div>
            </div>

            <div class="creator-buttons">
                <button class="btn btn-secondary" id="btn-randomize">Zufällig</button>
                <button class="btn btn-primary" id="btn-confirm">Fertig!</button>
            </div>
        `;

        document.body.appendChild(creator);

        // Add event listeners
        creator.querySelectorAll('.creator-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const part = btn.dataset.part;
                const index = parseInt(btn.dataset.index);

                currentCharacter[part] = index;

                // Update selected state
                creator.querySelectorAll(`[data-part="${part}"]`).forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');

                updatePreview();
                playSelectSound();
            });
        });

        creator.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const colorIndex = parseInt(btn.dataset.color);
                currentCharacter.color = colorIndex;

                creator.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');

                updatePreview();
                playSelectSound();
            });
        });

        document.getElementById('btn-randomize').addEventListener('click', randomize);
        document.getElementById('btn-confirm').addEventListener('click', confirm);
    }

    // Update the preview
    function updatePreview() {
        const preview = document.getElementById('avatar-preview');
        if (!preview) return;

        const color = COLORS[currentCharacter.color];
        preview.style.borderColor = color;
        preview.style.boxShadow = `0 0 30px ${color}40`;

        // Base is always shown
        preview.querySelector('.base').textContent = PARTS.base[currentCharacter.base];

        // Eyes - hide if "—" (index 0)
        const eyes = PARTS.eyes[currentCharacter.eyes];
        preview.querySelector('.eyes').textContent = eyes === '—' ? '' : eyes;

        // Mouth - hide if "—" (index 0)
        const mouth = PARTS.mouth[currentCharacter.mouth];
        preview.querySelector('.mouth').textContent = mouth === '—' ? '' : mouth;

        // Accessory - hide if "—" (index 0)
        const accessory = PARTS.accessory[currentCharacter.accessory];
        preview.querySelector('.accessory').textContent = accessory === '—' ? '' : accessory;

        // Position layers
        preview.querySelector('.base').style.fontSize = '5rem';
        preview.querySelector('.eyes').style.cssText = 'font-size: 1.5rem; top: 30%; left: 50%; transform: translate(-50%, -50%);';
        preview.querySelector('.mouth').style.cssText = 'font-size: 1.2rem; top: 65%; left: 50%; transform: translate(-50%, -50%);';
        preview.querySelector('.accessory').style.cssText = 'font-size: 2rem; top: 5%; left: 50%; transform: translate(-50%, 0);';
    }

    // Randomize character
    function randomize() {
        currentCharacter.base = Math.floor(Math.random() * PARTS.base.length);
        currentCharacter.eyes = Math.floor(Math.random() * PARTS.eyes.length);
        currentCharacter.mouth = Math.floor(Math.random() * PARTS.mouth.length);
        currentCharacter.accessory = Math.floor(Math.random() * PARTS.accessory.length);
        currentCharacter.color = Math.floor(Math.random() * COLORS.length);

        // Update UI
        const creator = document.getElementById('character-creator');
        if (creator) {
            ['base', 'eyes', 'mouth', 'accessory'].forEach(part => {
                creator.querySelectorAll(`[data-part="${part}"]`).forEach((btn, i) => {
                    btn.classList.toggle('selected', i === currentCharacter[part]);
                });
            });
            creator.querySelectorAll('.color-option').forEach((btn, i) => {
                btn.classList.toggle('selected', i === currentCharacter.color);
            });
        }

        updatePreview();
        playSelectSound();
    }

    // Confirm and close
    function confirm() {
        // Save to localStorage
        localStorage.setItem('maexchen-character', JSON.stringify(currentCharacter));

        // Close creator
        const creator = document.getElementById('character-creator');
        if (creator) creator.remove();

        // Callback
        if (onCompleteCallback) {
            onCompleteCallback(getAvatarDisplay());
        }

        playConfirmSound();
    }

    // Get the avatar display string (simplified for list views)
    function getAvatarDisplay() {
        const base = PARTS.base[currentCharacter.base];
        const accessory = PARTS.accessory[currentCharacter.accessory];
        // Only show accessory + base for compact display
        return accessory === '—' ? base : `${accessory}${base}`;
    }

    // Get the avatar color
    function getAvatarColor() {
        return COLORS[currentCharacter.color];
    }

    // Get full character data
    function getCharacter() {
        return {
            ...currentCharacter,
            display: getAvatarDisplay(),
            color: COLORS[currentCharacter.color]
        };
    }

    // Load saved character
    function loadSavedCharacter() {
        const saved = localStorage.getItem('maexchen-character');
        if (saved) {
            try {
                currentCharacter = JSON.parse(saved);
                return true;
            } catch (e) {}
        }
        return false;
    }

    // Check if character was created
    function hasCharacter() {
        return localStorage.getItem('maexchen-character') !== null;
    }

    // Sound effects
    function playSelectSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 600 + Math.random() * 200;
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {}
    }

    function playConfirmSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [523, 659, 784].forEach((freq, i) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.2);
                }, i * 100);
            });
        } catch (e) {}
    }

    // Public API
    window.MaexchenCreator = {
        showCreator,
        getAvatarDisplay,
        getAvatarColor,
        getCharacter,
        loadSavedCharacter,
        hasCharacter,
        PARTS,
        COLORS
    };
})();
