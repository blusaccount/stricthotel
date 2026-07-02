# Hangout Game (Arbeitstitel)

Goofy 3D-Social-Hangout-Game mit Babylon.js + TypeScript (Client) und
Node.js + Socket.IO (Server). Voller Projektplan in
[`PROJECT_PLAN.md`](PROJECT_PLAN.md), Arbeitsregeln für Claude Code in
[`CLAUDE.md`](CLAUDE.md).

## Setup

```bash
npm install
```

## Lokaler Multiplayer-Test

1. Server starten: `npm run dev:server` (Socket.IO auf Port 3001)
2. Client-Dev-Server starten: `npm run dev` (Vite, Port 5173)
3. `http://localhost:5173` in **zwei** Browser-Tabs/-Fenstern öffnen.
4. In beiden: Spielername eingeben, Adresse (`localhost:3001`) lassen,
   **Verbinden** klicken.
5. Beide Spieler sollten sich im Hub sehen und bewegen können
   (Klick ins Spiel für Mouse-Look, WASD + Maus, Leertaste = Sprung).
6. **Enter** öffnet den Chat unten links, Enter sendet, Escape schließt.

## Weitere Skripte

| Skript | Zweck |
|---|---|
| `npm run build` | Produktions-Build des Clients nach `dist/` |
| `npm run start` | Server ohne Watch-Modus (z.B. auf Render.com) |
| `npm run typecheck` | `tsc --noEmit` über Client, Server und shared/ |

## Stand

Phase 0 der Roadmap (siehe `PROJECT_PLAN.md`, Abschnitt 7): begehbarer
Hub-Blockout, Spieler-Controller, Socket.IO-Server mit persistentem HubRoom,
Player-Sync und Chat-Overlay — portiert vom früheren Godot-Skelett (siehe
Git-History). Havok/Ragdoll, Minigames, Avatar-Baukasten, Currency-Wiring
und Steam-Integration folgen in den nächsten Phasen.
