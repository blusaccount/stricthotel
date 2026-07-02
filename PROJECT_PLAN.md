# Projektplan: 3D Social Hangout Game (Arbeitstitel)

## 1. Konzept

Ein "goofy" browserunabhängiges 3D-Social-Hangout-Spiel im Stil eines virtuellen 3rd Space, inspiriert von Friend-Slop Games und dem Battle-Royale-Minigame-Genre (Crab Game, Squid Guys), aber mit eigener, parodistischer Identität statt geklonter Netflix-IP. Kernstück ist ein persistenter Hub, in dem Spieler herumlaufen und chatten, plus instanzierte Minigame-Arenen mit physikbasierter Ragdoll-Comedy.

Wiederverwendete Konzepte aus bestehenden Projekten:
- **StrictHotel**: Lobby-/Presence-System, Currency-Wirtschaft, Chat, Charakter-Editor-Idee (hier als 3D-Avatar-Baukasten neu gedacht)
- **Control and Conquer**: Erfahrung mit Node/TS-Server-Betrieb, geplanter Steamworks.js-Pfad (hier ersetzt durch GodotSteam)

## 2. Tech-Stack (final)

| Bereich | Wahl | Begründung |
|---|---|---|
| Engine | Godot 4.x | Beste 3D-Tools, nativer Steam-Export, höhere Qualitätsobergrenze |
| Sprache | GDScript | Reine Textdateien, kein Kompilierschritt, beste Engine-Feature-Parität, Claude-Code-freundlich |
| Multiplayer | Godot High-Level-Multiplayer-API mit ENet (`ENetMultiplayerPeer`) | Nativ für Desktop/Steam, geringe Latenz |
| Steam-Integration | GodotSteam (GDExtension) | Ausgereifteste Steamworks-Anbindung für Godot |
| Versionierung | Git, eigenständiges neues Repo | Kein Koppeln an StrictHotel-Codebasis |
| Lokale Entwicklung | Claude Code (lokal via `C:\Users\...`) | Direkte Datei-Edits an `.gd`/`.tscn`, kein Cowork/Computer-Use nötig für die meisten Aufgaben |

## 3. Repo-Struktur (Vorschlag)

```
hangout-game/
├── CLAUDE.md                     # Projektkontext für Claude Code (siehe Abschnitt 6)
├── project.godot
├── scenes/
│   ├── hub/
│   │   ├── hub_world.tscn        # Persistenter Social-Space
│   │   └── spawn_points.tscn
│   ├── arenas/
│   │   ├── ampel_rennen.tscn     # Minigame 1
│   │   ├── wackelbruecke.tscn    # Minigame 2
│   │   └── tauziehen.tscn        # Minigame 3
│   ├── player/
│   │   ├── player_character.tscn # Ragdoll-fähiger Avatar
│   │   └── avatar_customizer.tscn
│   └── ui/
│       ├── chat_overlay.tscn
│       ├── lobby_menu.tscn
│       └── minigame_hud.tscn
├── scripts/
│   ├── net/
│   │   ├── network_manager.gd    # ENet-Setup, Matchmaking
│   │   └── player_sync.gd        # MultiplayerSynchronizer-Logik
│   ├── player/
│   │   ├── player_controller.gd
│   │   └── ragdoll_physics.gd
│   ├── minigames/
│   │   ├── minigame_base.gd      # Basisklasse für alle Arenen
│   │   ├── ampel_rennen.gd
│   │   └── ...
│   └── economy/
│       └── currency_manager.gd   # Angelehnt an StrictCoins-Logik
├── autoload/
│   ├── GameState.gd              # Singleton: Spielerstatus, aktuelle Szene
│   └── SteamManager.gd           # GodotSteam-Wrapper
├── assets/
│   ├── models/
│   ├── materials/
│   └── audio/
└── addons/
    └── godotsteam/
```

## 4. Architektur-Grundzüge

- **Hub-Szene**: immer aktiv, ein Server-Node verwaltet verbundene Spieler, Chat-Overlay läuft parallel
- **Minigame-Arenen**: werden bei Spielerwunsch instanziert (eigene `.tscn`), Ergebnis/Reward fließt zurück in `currency_manager.gd`
- **MultiplayerSpawner/Synchronizer**: pro Spieler-Node für Position, Ragdoll-State, Animation
- **Autoload-Singletons**: `GameState` für szenenübergreifenden Zustand, `SteamManager` kapselt alle GodotSteam-Aufrufe (Achievements, Lobby-Erstellung, Freundeslisten)

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

Dies ist ein 3D Social-Hangout-Game in Godot 4.x (GDScript), inspiriert vom
Battle-Royale-Minigame-Genre, mit eigener goofy/parodistischer Identität.

## Grundregeln
- Sprache: ausschließlich GDScript, kein C#
- Multiplayer: Godot High-Level-Multiplayer-API mit ENetMultiplayerPeer
- Steam-Anbindung ausschließlich über addons/godotsteam
- Szenen (.tscn) und Ressourcen (.tres) sind Textdateien und können direkt bearbeitet werden;
  bei rein visuellen Änderungen (Platzierung, Kamera, Partikel) im Editor prüfen lassen
- Neue Minigames erben von scripts/minigames/minigame_base.gd
- Economy-Logik ist konzeptionell an das bestehende StrictHotel-Currency-System angelehnt,
  aber ein eigenständiges System (kein Datenbank-Sharing zwischen Repos)

## Nicht anfassen / Vorsicht
- addons/godotsteam nicht manuell verändern (externe Dependency)
- project.godot nur bei expliziter Anfrage anpassen
```

## 7. Roadmap

**Phase 0 – Prototyp**
- Godot-Projekt aufsetzen, Repo initialisieren
- Begehbarer Hub (Blockout), ein Spieler-Controller mit Basic-Movement
- Lokaler Multiplayer-Test mit zwei Clients (ENet, kein Internet nötig)

**Phase 1 – Social-Layer**
- Chat-Overlay
- Avatar-Baukasten (Basis-Anpassung: Farbe, Form, Accessoires)
- Currency-System (Grundgerüst)

**Phase 2 – Erstes Minigame**
- `minigame_base.gd` definieren
- Ampel-Rennen als erstes vollständiges Minigame inkl. Matchmaking/Instanzierung
- Reward-Fluss zurück in die Currency

**Phase 3 – Minigame-Ausbau**
- Wackelbrücke, Tauziehen ergänzen
- Spectator-Modus für laufende Runden

**Phase 4 – Steam-Vorbereitung**
- GodotSteam-Integration (Login, Lobbys, Achievements)
- Build-Pipeline für Steam-Depot
- Store-Page-Vorbereitung (F2P oder 0,99 €, analog zur Control-and-Conquer-Überlegung)

## 8. Offene Punkte für die nächste Session mit Claude Code

- Konkreter Art-Style (Low-Poly? Voxel? Toon-Shading?)
- Zielspielerzahl pro Arena (Performance-Budget für Ragdoll-Physik)
- Soll die Avatar-Persistenz lokal (Save-Datei) oder später serverseitig laufen?

## 9. Umsetzungsstand

Dieses Repo (`stricthotel`, Branch `claude/3d-social-hangout-game-w4o6z6`) wurde als
Host für dieses Projekt übernommen (siehe CLAUDE.md), obwohl Abschnitt 2 ursprünglich
ein eigenständiges neues Repo vorsah. Phase 0 aus der Roadmap ist als handgeschriebenes
Skeleton umgesetzt: Projektstruktur, Hub-Blockout, Spieler-Controller mit ENet-Multiplayer,
Host/Join-Lobby-UI und ein einfaches Chat-Overlay. Es wurde ohne laufenden Godot-Editor
erstellt — vor dem Weiterbauen einmal öffnen und die Szenen im Editor durchspeichern.
