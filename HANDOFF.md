# Handoff: Remove dead CSS from shared/css/theme.css

## What Changed

Removed 39 lines of dead/duplicate CSS from `shared/css/theme.css` (2683 → 2644 lines):

1. **Removed unused `.waiting-box` class** (8 lines) — not referenced in any HTML or JS file
2. **Removed unused `.waiting-dots` rules** (`.waiting-dots`, `.waiting-dots span`, two `nth-child` rules — 17 lines) — not referenced in any HTML or JS file
3. **Removed duplicate `.winner-crown`** at line 855 (4 lines) — fully overridden by identical selector at line 1827 in the Victory Screen section
4. **Removed duplicate `.winner-name`** at line 860 (6 lines) — fully overridden by identical selector at line 1838 in the Victory Screen section
5. **Removed orphaned section comment** `/* ===== Game Over ===== */` and `/* ===== Waiting Indicator ===== */`

Kept:
- `.waiting-text` — used in `games/maexchen/index.html`
- `@keyframes pulse` — used by `.sidebar-turn-indicator`

## How to Verify
1. `npm test` — All 184 tests pass
2. Visually verify maexchen, watchparty, and lobby pages render correctly (waiting text, victory screen)
