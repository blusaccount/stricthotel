# StrictHotel

StrictHotel ist eine experimentelle Minigame-Sammlung im **neal.fun-inspirierten** Stil: schnelle, visuelle Web-Erlebnisse mit Multiplayer-Chaos und Nostalgie-Elementen.

## Highlights
- Multiplayer Lobby und Rooms via Socket.IO
- Maexchen (Wuerfel-Bluff) und Watchparty
- Pictochat-artiges Doodle-Board in Lobby
- Soundboard in Lobby
- Nostalgiabait (Retro-Boot-Erlebnisse) im Bereich /nostalgiabait
- Login-Schutz via Session + Passwort

## Repo-Struktur
- **Server**: `server.js` startet [server/index.js](server/index.js) (Express + Socket.IO)
- **Public UI**: [public](public) (Landing, Login, Nostalgiabait, Lobby-Features)
- **Games**: [games](games) (z. B. Maexchen, Watchparty)
- **Shared**: [shared](shared) (Chat, Lobby, Avatare, Creator, CSS, Audio)
- **Bot**: [bot](bot) (Discord Bot + Commands)

## LLM Agent Hinweise
Wenn LLM Agents im Repo arbeiten, bitte diese Dateien verwenden:
- [AGENTS.md](AGENTS.md): Einstieg und Arbeitsregeln
- [LLM_AGENT_GUIDE.md](LLM_AGENT_GUIDE.md): Repo-Mentalmodell, Do/Don'ts
- [EVENTS.md](EVENTS.md): Socket-Event Uebersicht
- [PLANS.md](PLANS.md): ExecPlan Vorlage fuer groessere Tasks
- [HANDOFF.md](HANDOFF.md): Kurzprotokoll von Aenderungen und Risiken

## Lokal starten
```
npm install
npm run dev
```
Server startet unter `http://localhost:3000`.

## Konfiguration (Env)
- `SESSION_SECRET` (required in production)
- `SITE_PASSWORD` (Login-Passwort, default: ADMIN)
- `CLIENT_ID` und `GUILD_ID` fuer Discord Bot (optional)

## Kurz gesagt
Dieses Repository buendelt eine spielbare Website und Multiplayer-Features mit Fokus auf kreative Mini-Games, Social-Interaktion und stilisierte Retro-Atmosphaere.
