# Hangout Game (Arbeitstitel)

Goofy 3D-Social-Hangout-Game in Godot 4.x / GDScript. Voller Projektplan in
[`PROJECT_PLAN.md`](PROJECT_PLAN.md), Arbeitsregeln für Claude Code in
[`CLAUDE.md`](CLAUDE.md).

## Setup

1. Godot 4.7 (stable) öffnen, `project.godot` importieren.
2. Dieses Skeleton wurde ohne laufenden Editor geschrieben — beim ersten Öffnen
   einmal alle Szenen durchgehen und speichern, damit Godot UIDs/`.godot`-Cache anlegt.

## Lokaler Multiplayer-Test

1. Projekt zweimal starten (zwei Fenster/Instanzen).
2. In Instanz 1: Spielername eingeben, **Host** klicken.
3. In Instanz 2: Spielername eingeben, Adresse `127.0.0.1` lassen, **Join** klicken.
4. Beide Spieler sollten sich im Hub sehen und bewegen können (WASD + Maus, Leertaste = Sprung).
5. **Enter** öffnet den Chat unten links.

## Stand

Phase 0 der Roadmap (siehe `PROJECT_PLAN.md`, Abschnitt 7): begehbarer Hub-Blockout,
Spieler-Controller, ENet-Host/Join, Chat-Overlay. Minigames, Avatar-Baukasten, Currency-Wiring
und Steam-Integration folgen in den nächsten Phasen.
