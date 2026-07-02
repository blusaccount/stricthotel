# Projektkontext

Dies ist ein 3D Social-Hangout-Game in Godot 4.x (GDScript), inspiriert vom
Battle-Royale-Minigame-Genre, mit eigener goofy/parodistischer Identität.
Der vollständige Projektplan liegt in `PROJECT_PLAN.md`.

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

## Aktueller Stand (Phase 0)
- Begehbarer Hub-Blockout, ein Spieler-Controller, lokaler ENet-Multiplayer-Test
  (Host/Join-UI in `scenes/ui/lobby_menu.tscn`) und ein Basis-Chat-Overlay stehen.
- Ragdoll-Physik ist nur als Stub vorhanden (`scripts/player/ragdoll_physics.gd`) —
  wartet auf ein gerigtes Charaktermodell (offene Art-Style-Frage, siehe PROJECT_PLAN.md Abschnitt 8).
- Alle `.tscn`-Dateien in diesem Skelett wurden von Hand geschrieben (kein Godot-Editor
  in der Erstellungs-Umgebung verfügbar) — vor dem Weiterbauen einmal im Editor öffnen
  und Szenen/Resourcen speichern lassen, damit UIDs und Formatierung sauber sind.
- Minigame-Arenen, Avatar-Baukasten, Currency-Wiring und GodotSteam-Integration
  sind noch nicht gebaut (siehe Roadmap in PROJECT_PLAN.md).
