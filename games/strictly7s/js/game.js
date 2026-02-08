// ============== STRICTLY7S CLIENT ==============

(function () {
    'use strict';

    var socket = io();
    var NAME_KEY = 'stricthotel-name';
    var CHAR_KEY = 'stricthotel-character';

    var SYMBOLS = [
        { id: 'SEVEN', label: '7' },
        { id: 'BAR', label: 'BAR' },
        { id: 'DIAMOND', label: 'DIAMOND' },
        { id: 'BELL', label: 'BELL' },
        { id: 'CHERRY', label: 'CHERRY' },
        { id: 'LEMON', label: 'LEMON' }
    ];

    var symbolById = SYMBOLS.reduce(function (acc, s) {
        acc[s.id] = s.label;
        return acc;
    }, {});

    var reels = [
        document.getElementById('reel-1'),
        document.getElementById('reel-2'),
        document.getElementById('reel-3')
    ];
    var statusEl = document.getElementById('status');
    var balanceEl = document.getElementById('balance-display');
    var spinBtn = document.getElementById('spin-btn');
    var betButtons = Array.prototype.slice.call(document.querySelectorAll('.bet-btn'));
    var soundToggle = document.getElementById('sound-toggle');

    var selectedBet = null;
    var isSpinning = false;
    var spinInterval = null;
    var audioEnabled = true;
    var audioCtx = null;

    function setStatus(text, kind) {
        statusEl.textContent = text;
        statusEl.setAttribute('data-kind', kind || 'info');
    }

    function setBalance(value) {
        if (typeof value === 'number') {
            balanceEl.textContent = String(value);
        }
    }

    function pickRandomSymbol() {
        var idx = Math.floor(Math.random() * SYMBOLS.length);
        return SYMBOLS[idx].label;
    }

    function setReels(values) {
        for (var i = 0; i < reels.length; i++) {
            reels[i].textContent = values[i] || '---';
        }
    }

    function setSpinningState(active) {
        isSpinning = active;
        reels.forEach(function (reel) {
            reel.classList.toggle('spinning', active);
        });
        spinBtn.disabled = active || selectedBet === null;
    }

    function startSpinAnimation() {
        if (spinInterval) {
            clearInterval(spinInterval);
        }
        spinInterval = setInterval(function () {
            setReels([pickRandomSymbol(), pickRandomSymbol(), pickRandomSymbol()]);
        }, 80);
    }

    function stopSpinAnimation(finalReels) {
        if (spinInterval) {
            clearInterval(spinInterval);
            spinInterval = null;
        }
        setReels(finalReels);
    }

    function ensureAudioContext() {
        if (!audioCtx) {
            var AudioCtor = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtor) return null;
            audioCtx = new AudioCtor();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTone(freq, durationMs, type, volume) {
        if (!audioEnabled) return;
        var ctx = ensureAudioContext();
        if (!ctx) return;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type || 'square';
        osc.frequency.value = freq;
        gain.gain.value = volume || 0.03;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
        osc.stop(ctx.currentTime + durationMs / 1000);
    }

    function playSpinSound() {
        playTone(320, 80, 'square', 0.02);
    }

    function playWinSound(multiplier) {
        if (multiplier >= 20) {
            playTone(520, 120, 'square', 0.04);
            setTimeout(function () { playTone(660, 160, 'square', 0.04); }, 140);
            setTimeout(function () { playTone(820, 220, 'square', 0.04); }, 320);
        } else {
            playTone(440, 150, 'square', 0.03);
            setTimeout(function () { playTone(620, 180, 'square', 0.03); }, 160);
        }
    }

    function playLoseSound() {
        playTone(160, 140, 'sawtooth', 0.02);
    }

    function registerPlayer() {
        var name = localStorage.getItem(NAME_KEY) || '';
        if (!name) {
            setStatus('Not logged in. Set a name in the lobby first.', 'loss');
            spinBtn.disabled = true;
            return;
        }

        var character = null;
        try {
            var raw = localStorage.getItem(CHAR_KEY);
            character = raw ? JSON.parse(raw) : null;
        } catch (err) {
            character = null;
        }

        socket.emit('register-player', { name: name, character: character, game: 'strictly7s' });
        socket.emit('get-balance');
    }

    function handleBetClick(btn) {
        var betValue = Number(btn.getAttribute('data-bet'));
        if (!Number.isInteger(betValue)) return;
        selectedBet = betValue;
        betButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        spinBtn.disabled = isSpinning || selectedBet === null;
        setStatus('Bet set to ' + betValue + ' SC. Ready to spin.', 'info');
    }

    function handleSpin() {
        if (isSpinning || selectedBet === null) return;
        setStatus('Spinning...', 'info');
        setSpinningState(true);
        startSpinAnimation();
        playSpinSound();
        socket.emit('strictly7s-spin', { bet: selectedBet });
    }

    function formatWinMessage(result) {
        if (result.multiplier <= 0) {
            return 'No win this time.';
        }
        if (result.winType === 'two-cherries') {
            return 'Two CHERRY hit. You won ' + result.payout + ' SC.';
        }
        var label = symbolById[result.reels[0]] || result.reels[0];
        return label + ' x3. You won ' + result.payout + ' SC.';
    }

    socket.on('connect', function () {
        registerPlayer();
    });

    socket.on('balance-update', function (data) {
        if (data && typeof data.balance === 'number') {
            setBalance(data.balance);
        }
    });

    socket.on('strictly7s-spin-result', function (result) {
        var finalReels = (result.reels || []).map(function (id) {
            return symbolById[id] || id || '---';
        });

        setTimeout(function () {
            stopSpinAnimation(finalReels);
            setSpinningState(false);
            setBalance(result.balance);

            if (result.multiplier > 0) {
                setStatus(formatWinMessage(result), 'win');
                playWinSound(result.multiplier);
            } else {
                setStatus('No win this time.', 'loss');
                playLoseSound();
            }
        }, 450);
    });

    socket.on('strictly7s-error', function (data) {
        stopSpinAnimation(['---', '---', '---']);
        setSpinningState(false);
        setStatus(data && data.message ? data.message : 'Spin failed.', 'loss');
    });

    betButtons.forEach(function (btn) {
        btn.addEventListener('click', function () { handleBetClick(btn); });
    });

    spinBtn.addEventListener('click', handleSpin);

    soundToggle.addEventListener('click', function () {
        audioEnabled = !audioEnabled;
        soundToggle.textContent = 'Sound: ' + (audioEnabled ? 'On' : 'Off');
        if (audioEnabled) {
            ensureAudioContext();
        }
    });

    setReels(['---', '---', '---']);
})();
