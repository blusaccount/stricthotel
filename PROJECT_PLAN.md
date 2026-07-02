# Projektplan: 3D Social Hangout Game (Arbeitstitel)

## 1. Konzept

Ein "goofy" 3D-Social-Hangout-Spiel im Stil eines virtuellen 3rd Space, inspiriert vom Battle-Royale-Minigame-Genre (Crab Game, Squid Guys), aber mit eigener, parodistischer Identität statt geklonter Netflix-IP. Kernstück ist ein persistenter Hub, in dem Spieler herumlaufen und chatten, plus instanzierte Minigame-Arenen mit physikbasierter Ragdoll-Comedy.

Wiederverwendete Konzepte aus bestehenden Projekten:
- **StrictHotel**: Lobby-/Presence-System, Minigames, Currency-Wirtschaft, Chat, Charakter-Editor-Idee (hier als 3D-Avatar-Baukasten neu gedacht) — großer Teil des Socket.IO-Backends direkt weiterverwendbar
- **Control and Conquer**: Erfahrung mit Node/TS-Server-Betrieb auf Render.com, evaluierter Electron+steamworks.js-Pfad (hier für den Steam-Longterm-Plan wieder relevant)

## 2. Tech-Stack (final)

| Bereich | Wahl | Begründung |
|---|---|---|
| Engine | Babylon.js | In TS geschrieben, Physik (Havok) + GUI + Animation eingebaut, browserfirst |
| Sprache | TypeScript | Bekannter Stack, gute Typisierung hilft Claude Code |
| Build-Tool | Vite | Schneller Dev-Server, einfaches Bundling |
| Client-Physik | Havok (in Babylon.js integriert) | Für Ragdoll-Comedy in den Minigames |
| Multiplayer | Node.js + TypeScript + Socket.IO | Gleiches Muster wie StrictHotel/Control and Conquer |
| Hosting | Render.com | Bekannte Pipeline (Autodeploy) |
| Steam (longterm) | Electron-Wrapper + steamworks.js | Exakt der für Control and Conquer evaluierte Pfad |
| Versionierung | Git, eigenständiges neues Repo | Kein Koppeln an StrictHotel-Codebasis |
| Lokale Entwicklung | Claude Code (lokal) | Reine `.ts`-Datei-Edits, voll im reliablen Workflow, kein Computer-Use nötig |

## 3. Repo-Struktur (Vorschlag)

```
hangout-game/
├── CLAUDE.md                     # Projektkontext für Claude Code (siehe Abschnitt 6)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── client/
│   ├── index.html
│   ├── main.ts                   # Babylon.js Engine-Bootstrap
│   ├── scenes/
│   │   ├── HubScene.ts           # Persistenter Social-Space
│   │   ├── arenas/
│   │   │   ├── AmpelRennen.ts     # Minigame 1
│   │   │   ├── Wackelbruecke.ts   # Minigame 2
│   │   │   └── Tauziehen.ts       # Minigame 3
│   │   └── MinigameBase.ts       # Basisklasse für alle Arenen
│   ├── player/
│   │   ├── PlayerController.ts
│   │   ├── RagdollPhysics.ts     # Havok-basiert
│   │   └── AvatarCustomizer.ts
│   ├── net/
│   │   ├── NetworkClient.ts      # Socket.IO-Client, Verbindung zum Server
│   │   └── PlayerSync.ts         # Interpolation/State-Sync
│   ├── ui/
│   │   ├── ChatOverlay.ts        # Babylon GUI
│   │   ├── LobbyMenu.ts
│   │   └── MinigameHUD.ts
│   └── economy/
│       └── CurrencyManager.ts    # Angelehnt an StrictCoins-Logik
├── server/
│   ├── index.ts                  # Socket.IO-Server, Räume/Matchmaking
│   ├── rooms/
│   │   ├── HubRoom.ts
│   │   └── ArenaRoom.ts
│   ├── economy/
│   │   └── currency.ts
│   └── db/                       # Persistenz (analog StrictHotel-Ansatz)
├── shared/
│   └── types.ts                  # Von Client & Server geteilte TS-Typen (Messages, State)
└── assets/
    ├── models/
    ├── materials/
    └── audio/
```

## 4. Architektur-Grundzüge

- **Client (Browser)**: Babylon.js-Runtime rendert Hub + aktuell aktive Arena, Havok für Physik, Babylon GUI für Chat/Menüs
- **Server (Node/Socket.IO)**: verwaltet Räume — ein `HubRoom` (persistent) plus dynamisch instanzierte `ArenaRoom`s pro Minigame-Runde
- **shared/types.ts**: gemeinsame TS-Typen für Netzwerk-Messages und State — sorgt für Typsicherheit über die Client/Server-Grenze, konkreter Vorteil des durchgehenden TS-Stacks
- **CurrencyManager/currency.ts**: Reward-Logik nach Minigame-Runden, konzeptionell an StrictCoins angelehnt
- **Steam-Pfad (später)**: bestehender Browser-Client wird per Electron gewrappt, steamworks.js für Achievements/Overlay — kein Rewrite der Spiellogik nötig

## 5. Minigame-Katalog (goofy, eigene Identität statt Netflix-Look)

| Arbeitstitel | Prinzip | Goofy-Twist |
|---|---|---|
| Ampel-Rennen | Red Light/Green Light | Ragdoll-Charaktere kippen beim abrupten Stoppen um |
| Wackelbrücke | Glasbrücke | Brücke schwankt physikbasiert statt nur Fallen/Bestehen |
| Tauziehen | Klassisch, aber Team-Ragdoll-Chaos | Physik-Overkill, Teams fliegen bei Sieg durch die Luft |
| Sackhüpfen | Hindernislauf | Übertriebene Sprungphysik |
| Bohnensack-Wettlauf | Balance-Parcours | Gegenstände auf Kopf/Tablett bei Ragdoll-Bewegung |

## 6. CLAUDE.md – Vorschlag für Projektkontext

```markdown
# Projektkontext

Dies ist ein 3D Social-Hangout-Game mit Babylon.js (TypeScript), inspiriert vom
Battle-Royale-Minigame-Genre, mit eigener goofy/parodistischer Identität.

## Grundregeln
- Sprache: ausschließlich TypeScript
- Client-Engine: Babylon.js, Physik über die integrierte Havok-Anbindung
- UI über Babylon GUI (kein separates DOM-Overlay-Framework, außer explizit gewünscht)
- Multiplayer: Node.js + Socket.IO; Client und Server teilen sich Typen aus shared/types.ts
- Neue Minigames erben von client/scenes/MinigameBase.ts
- Economy-Logik ist konzeptionell an das bestehende StrictHotel-Currency-System angelehnt,
  aber ein eigenständiges System (kein Datenbank-Sharing zwischen Repos)
- Build über Vite

## Nicht anfassen / Vorsicht
- shared/types.ts ist die Single Source of Truth für Netzwerk-Messages —
  Änderungen immer auf beiden Seiten (Client + Server) konsistent halten
- package.json / vite.config.ts nur bei expliziter Anfrage anpassen
- Der Electron/Steam-Wrapper kommt erst in einer späteren Phase; Client-Code
  soll bis dahin ohne Electron-Abhängigkeiten lauffähig bleiben
```

## 7. Roadmap

**Phase 0 – Prototyp**
- Vite-Projekt aufsetzen, Babylon.js-Bootstrap, Repo initialisieren
- Begehbarer Hub (Blockout), Spieler-Controller mit Basic-Movement
- Minimaler Socket.IO-Server, zwei Clients sehen sich gegenseitig laufen

**Phase 1 – Social-Layer**
- Chat-Overlay (Babylon GUI)
- Avatar-Baukasten (Basis-Anpassung: Farbe, Form, Accessoires)
- Currency-System (Grundgerüst)

**Phase 2 – Erstes Minigame**
- `MinigameBase.ts` definieren
- Ampel-Rennen als erstes vollständiges Minigame inkl. ArenaRoom-Instanzierung
- Reward-Fluss zurück in die Currency

**Phase 3 – Minigame-Ausbau**
- Wackelbrücke, Tauziehen ergänzen
- Spectator-Modus für laufende Runden

**Phase 4 – Steam-Vorbereitung (optional/longterm)**
- Electron-Wrapper um den bestehenden Client
- steamworks.js für Login, Achievements, Overlay
- Store-Page-Vorbereitung (F2P oder 0,99 €, analog zur Control-and-Conquer-Überlegung)

## 8. Offene Punkte für die nächste Session mit Claude Code

- Konkreter Art-Style (Low-Poly? Voxel? Toon-Shading?)
- Zielspielerzahl pro Arena (Performance-Budget für Havok-Ragdoll-Physik im Browser)
- Soll die Avatar-Persistenz clientseitig (localStorage) oder serverseitig (DB, wie StrictHotel) laufen?
- Wird das StrictHotel-Backend als Vorlage kopiert oder von Grund auf neu aufgesetzt?
