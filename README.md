# StrictHotel

StrictHotel is an experimental minigame collection in a **neal.fun-inspired** style: fast, visual web experiences with multiplayer chaos and nostalgic flair.

## Highlights
- **13 Games/Experiences**: Mäxchen, Watch Party, Stock Market, Strictly7s, Loop Machine, LoL Betting, Strict Brain, Türkçe, Strict Club, Nostalgiabait, Shopping, Contacts, The Hotel
- **Multiplayer Rooms**: Lobby system with Socket.IO for real-time gameplay
- **Virtual Economy**: StrictCoins currency system with earning and spending mechanics
- **Social Features**: Pictochat-style doodle board, soundboard, contacts app, character creator
- **Persistent Data**: PostgreSQL database for player profiles, portfolios, and game history
- **Login Protection**: Session-based authentication with password gate

## Repo Structure
- **Server**: `server.js` starts [server/index.js](server/index.js) (Express + Socket.IO)
  - [server/handlers](server/handlers) - Socket event handlers for each game/feature
  - [server/routes](server/routes) - Express routes (auth, stocks, turkish, nostalgiabait)
  - Database modules: `currency-store.js`, `stock-game.js`, `character-store.js`, etc.
- **Public UI**: [public](public) - Landing page, login, lobby, contacts, shop
- **Games**: [games](games) - 9 game frontends (Mäxchen, Watchparty, Stocks, Strictly7s, Loop Machine, LoL Betting, StrictBrain, Turkish, Shopping)
- **Shared**: [shared](shared) - Reusable client modules (chat, lobby, avatars, creator, CSS, audio)
- **Bot**: [bot](bot) - Discord bot with voice commands (optional)

## LLM Agent Notes
When LLM agents work in this repo, use these files:
- [AGENTS.md](AGENTS.md): entry point and rules
- [LLM_AGENT_GUIDE.md](LLM_AGENT_GUIDE.md): repo mental model, do/don'ts
- [EVENTS.md](EVENTS.md): socket event overview
- [PLANS.md](PLANS.md): ExecPlan template for larger tasks
- [HANDOFF.md](HANDOFF.md): short log of changes and risks

## Run Locally
```
npm install
npm run dev
```
Server runs at `http://localhost:3000`.

## Self-Hosted Quickstart (Docker)
1. Copy env template and fill required values:
   ```bash
   cp .env.example .env
   ```
2. Build and start:
   ```bash
   docker compose up -d --build
   ```
3. Open `http://localhost:3000`.
4. Health check:
   ```bash
   docker compose ps
   curl http://localhost:3000/health
   ```

### Troubleshooting
- **Bot not starting**: ensure `DISCORD_TOKEN` is set in `.env`.
- **Database errors**: verify `DATABASE_URL` format and DB network access.
- **Port already in use**: change host mapping in `docker-compose.yml` (left side of `3000:3000`).

## Configuration (Env)
See `.env.example` for all available options. Key variables:

**Core:**
- `SESSION_SECRET` - Session encryption key (required in production)
- `SITE_PASSWORD` - Login password (default: ADMIN)
- `DATABASE_URL` - PostgreSQL connection string (optional, uses in-memory fallback if not set)

**Discord Bot (Optional):**
- `DISCORD_TOKEN` - Bot token for Discord integration
- `CLIENT_ID`, `GUILD_ID` - Discord application IDs

**Features:**
- `GAME_ENABLED` (default: `true`) - Toggles stock market APIs and socket events
  - `true`: Stock APIs and socket events are active
  - `false`: Stock APIs return `503` with `{ code: "GAME_DISABLED" }`
- `ADMIN_PASSWORD` - Required for admin actions (e.g., LoL bet resolution)
- `RIOT_API_KEY` - For LoL betting feature (optional)

## Games & Features

**Multiplayer Games:**
- 🎲 **Mäxchen** - Dice bluffing game (Liar's Dice variant)
- 📺 **Watch Party** - Synchronized YouTube viewing with friends
- 🧠 **Strict Brain** - Memory, math, reaction time challenges

**Single-Player Games:**
- 📈 **Stock Market** - Real-time stock trading with leaderboards
- 🎰 **Strictly7s** - Slot machine with 89.78% RTP
- 🎹 **Loop Machine** - 16-step sequencer with 14 instruments (including 808s)
- ⚔️ **LoL Betting** - Bet on League of Legends player outcomes
- 🇹🇷 **Türkçe** - Turkish language learning game

**Social & Utility:**
- 🎧 **Strict Club** - Shared music listening room
- 📇 **Contacts** - View online players and their characters
- 💎 **Shop** - Spend StrictCoins on premium items
- 📼 **Nostalgiabait** - Retro boot experiences (Windows XP, GameCube, etc.)
- 🏨 **The Hotel** - External game link

**Lobby Features:**
- Character creator with pixel art editor
- Pictochat-style collaborative drawing board
- Soundboard with ambient audio controls
- StrictCoins currency system with "Make It Rain" animations

## In Short
This repository bundles a playable website and multiplayer features with a focus on creative minigames, social interaction, and a stylized retro atmosphere.
