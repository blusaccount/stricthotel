# LLM Agent Guide (StrictHotel)

This guide helps LLM agents work effectively in this repo. Keep it short, stay in scope, and follow local patterns.

## Quick repo map

**Server:**
- Entry: [server.js](server.js) → [server/index.js](server/index.js)
- Socket handlers: [server/handlers/](server/handlers/) (one file per game/feature)
  - `lobby.js`, `currency.js`, `maexchen.js`, `watchparty.js`, `stocks.js`, `strictly7s.js`, `loop-machine.js`, `lol-betting.js`, `brain-versus.js`, `strict-club.js`, `pictochat.js`, `soundboard.js`
- Express routes: [server/routes/](server/routes/) (`auth.js`, `stocks.js`, `turkish.js`, `nostalgiabait.js`)
- Database modules: `currency-store.js`, `stock-game.js`, `character-store.js`, `lol-match-checker.js`
- Room state: [server/room-manager.js](server/room-manager.js)

**Client:**
- Public pages: [public/](public/) (`index.html`, `login.html`, `contacts.html`, `shop.html`)
- Game frontends: [games/](games/) (9 games: maexchen, watchparty, stocks, strictly7s, loop-machine, lol-betting, strictbrain, turkish, shopping)
- Shared modules: [shared/js/](shared/js/) (lobby, chat, socket-init, creator, ambience)
- Shared styles: [shared/css/theme.css](shared/css/theme.css)

**Tests:**
- [server/__tests__/](server/__tests__/) - Vitest tests for all server modules

## Core flows (mental model)

**Authentication:**
- Login gate: [server/routes/auth.js](server/routes/auth.js) protects all routes except `/login`
- Session-based auth with `SITE_PASSWORD` env var (default: ADMIN)

**Player Registration:**
- Players register via `register-player` socket event ([server/handlers/currency.js](server/handlers/currency.js))
- Registration creates/loads: username, character, StrictCoin balance, diamond count
- Character data persisted to PostgreSQL `players.character_data` column

**Lobby Flow:**
- Client: [shared/js/lobby.js](shared/js/lobby.js)
- Server: [server/handlers/lobby.js](server/handlers/lobby.js)
- Flow: `create-room` → `join-room` → `start-game` → game-specific handlers take over

**Multiplayer Rooms:**
- Room state managed by [server/room-manager.js](server/room-manager.js) (in-memory)
- Each game has its own handler in [server/handlers/](server/handlers/)
- Socket events are the source of truth for real-time behavior

**Currency System:**
- StrictCoins: Virtual currency for games (stored in PostgreSQL `players.balance`)
- Diamonds: Premium currency (stored in `players.diamonds`)
- Handlers: [server/handlers/currency.js](server/handlers/currency.js)
- Database: [server/currency-store.js](server/currency-store.js)

**Stock Market:**
- Real-time prices: Yahoo Finance API via [server/routes/stocks.js](server/routes/stocks.js)
- Portfolio/trades: PostgreSQL via [server/stock-game.js](server/stock-game.js)
- Socket events: [server/handlers/stocks.js](server/handlers/stocks.js)
- Batch price fetching with merge-on-update cache strategy

## Do this every task
- Read [HANDOFF.md](HANDOFF.md) first to capture recent changes and open risks
- Check [docs/EVENTS.md](docs/EVENTS.md) for socket event contracts
- Prefer existing helpers and patterns before adding new ones
- Keep changes minimal, additive, and reversible
- Run `npm test` before committing changes (207+ tests should pass)
- Validate behavior manually if you touch sockets, auth, or game logic
- Update HANDOFF.md with your changes and verification notes

## ExecPlans
When a task is large, risky, or spans multiple files, create an ExecPlan using [PLANS.md](PLANS.md). Keep it short and update it as you work.

## Scope discipline
- Implement exactly what the user asks.
- Avoid adding adjacent features without confirmation.
- Prefer existing patterns and helpers.

## Handoff
Record changes and verification notes in [HANDOFF.md](HANDOFF.md).

## Safety and reliability
- **Validate all inputs**: Server-side validation for all socket events and API endpoints
- **Database transactions**: Use transactions for multi-step operations (e.g., stock buy/sell updates both balance and positions)
- **Error handling**: Emit specific error events (e.g., `stock-error`, `lol-error`) with error codes and messages
- **Rate limiting**: Some handlers have cooldowns (e.g., Strictly7s has 3-second spin cooldown)
- **Logging**: Use `console.error` for failures, `console.log` for important state changes
- **Resource cleanup**: Close database connections, clear intervals/timeouts, remove event listeners on disconnect
- **Fallbacks**: In-memory fallback when `DATABASE_URL` is not set (for local dev)

## Local conventions
- **ES6 modules**: All code uses `import/export` (not `require`)
- **Modern JS**: Use `const/let`, arrow functions, template literals (client code is already modernized)
- **Naming**: camelCase for variables/functions, kebab-case for file names, UPPER_CASE for constants
- **Socket events**: Use kebab-case (e.g., `stock-buy`, `loop-toggle-cell`)
- **Database**: PostgreSQL with `pg` library, tables: `players`, `stock_trades`, `stock_positions`, `lol_bets`, etc.
- **Tests**: Vitest, test files in `server/__tests__/`, follow existing patterns
- **CSS**: Inline styles extracted to separate CSS files (completed in recent refactor)
- **Comments**: Only add comments where logic isn't self-evident
- **Keep content ASCII** unless the file already uses Unicode
- **Prefer the smallest viable change**

## Common pitfalls
- **Don't forget to register new socket events** in the appropriate handler file
- **Database queries**: Always handle the case where DB is not available (in-memory fallback)
- **Character data**: Must have both `pixels` and `dataURL` to be valid
- **Stock prices**: Non-ticker stocks need individual lookups via `getQuoteForSymbol`
- **Merge cache strategy**: Stock ticker cache merges new data instead of replacing
- **Pictochat security**: Validate all drawing commands to prevent XSS/injection
- **LoL betting**: Always pick the oldest match after bet placement (player's "next game")
- **WatchParty**: Keep-alive heartbeats prevent server spin-down on free hosting
