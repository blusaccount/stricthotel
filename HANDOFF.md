# Handoff: Socket.IO Boilerplate Refactor (2026-02-09)

## What Changed

Consolidated duplicated Socket.IO initialization code across 12+ client-side files into a single shared module at `shared/js/socket-init.js`. This eliminates ~100 lines of copy-pasted boilerplate for player registration, name/character retrieval, and HTML escaping.

### Files Modified

**New file:**
- `shared/js/socket-init.js` — Shared helpers exposed via `window.StrictHotelSocket` global

**Updated client JS (11 files):**
- `public/lobby.js` — Removed local `escapeHtml`, refactored `registerPlayer()` to use shared helper
- `public/shop.js` — Removed `NAME_KEY` constant, use `StrictHotelSocket.registerPlayer()`
- `public/contacts.js` — Removed `NAME_KEY` and local `escapeHtml`, use shared helpers
- `public/soundboard.js` — Removed local `escapeHtml` and `getName()`, use shared equivalents
- `public/pictochat.js` — Removed local `escapeHtml`, use shared helper
- `public/strict-club/club.js` — Refactored register-player boilerplate to use shared helper
- `games/loop-machine/js/game.js` — Removed `escapeHtml`, use `StrictHotelSocket.registerPlayer()`
- `games/lol-betting/js/game.js` — Removed `NAME_KEY`/`CHAR_KEY`/`escapeHtml`, use shared helpers
- `games/stocks/js/game.js` — Removed `NAME_KEY`/`CHAR_KEY`, use shared `registerPlayer()`
- `games/strictly7s/js/game.js` — Removed `NAME_KEY`/`CHAR_KEY`, simplified `registerPlayer()`
- `games/strictbrain/js/game.js` — Removed local `escapeHtml`, use shared helper

**Updated HTML (10 files):**
- Added `<script src="/shared/js/socket-init.js"></script>` before game scripts in:
  - `public/index.html`
  - `public/shop.html`
  - `public/contacts.html`
  - `public/strict-club/index.html`
  - `games/loop-machine/index.html`
  - `games/lol-betting/index.html`
  - `games/stocks/index.html`
  - `games/strictly7s/index.html`
  - `games/strictbrain/index.html`

## What Didn't Change

- **No behavioral changes** — All socket events, registration, and game logic work identically
- **`shared/js/core.js` untouched** — Mäxchen/watchparty use their own pattern (creates `socket` globally)
- **Soundboard socket source** — Still reuses lobby's socket via `window.StrictHotelLobby.socket`
- **`socket = io()` calls remain** — Only extracted helper functions, not socket creation

## How to Verify

1. **Tests:** `npm test` — All 159 tests still pass (3 pre-existing failures unchanged)
2. **Manual:** Visit `/`, `/shop.html`, `/contacts.html`, `/strict-club/`, and all games — verify pages load, players register, and functionality works identically
3. **Check registration:** Open browser console, confirm no errors on page load or socket connect
4. **Check escapeHtml:** Try entering `<script>alert(1)</script>` in name fields — should be escaped in rendered HTML

## Notes

- This is a pure DRY (Don't Repeat Yourself) refactor — no new features, no bug fixes
- Uses vanilla JS global (`window.StrictHotelSocket`) since the project doesn't use ES modules on client side
- Matches existing code style: uses `var` in files that use `var`, `const` in files that use `const`
