# Projektkontext

Dies ist ein 3D Social-Hangout-Game mit Babylon.js (TypeScript), inspiriert vom
Battle-Royale-Minigame-Genre, mit eigener goofy/parodistischer Identität.
Der vollständige Projektplan liegt in `PROJECT_PLAN.md`.

## Grundregeln
- Sprache: ausschließlich TypeScript
- Client-Engine: Babylon.js, Physik über die integrierte Havok-Anbindung
- UI über Babylon GUI (kein separates DOM-Overlay-Framework, außer explizit gewünscht)
- Multiplayer: Node.js + Socket.IO; Client und Server teilen sich Typen aus shared/types.ts
- Neue Minigames erben von client/scenes/MinigameBase.ts
- Economy-Logik ist konzeptionell an das bestehende StrictHotel-Currency-System angelehnt,
  aber ein eigenständiges System (kein Datenbank-Sharing zwischen Repos)
- Build über Vite
- WICHTIG: Alles muss kommerziell nutzbar sein (späterer Steam-Release). Nur
  Dependencies, Code-Vorlagen und Assets mit permissiven Lizenzen übernehmen
  (MIT/Apache-2.0/BSD/CC0/CC-BY mit Attribution). GPL/Copyleft-Projekte nur
  als Lernvorlage studieren, niemals Code/Assets daraus kopieren.

## Nicht anfassen / Vorsicht
- shared/types.ts ist die Single Source of Truth für Netzwerk-Messages —
  Änderungen immer auf beiden Seiten (Client + Server) konsistent halten
- package.json / vite.config.ts nur bei expliziter Anfrage anpassen
- Der Electron/Steam-Wrapper kommt erst in einer späteren Phase; Client-Code
  soll bis dahin ohne Electron-Abhängigkeiten lauffähig bleiben

## Aktueller Stand (Phase 0)
- Portiert vom früheren Godot-4-Skelett (siehe Git-History vor der Umstellung):
  begehbarer Hub-Blockout (`client/scenes/HubScene.ts`), Spieler-Controller mit
  WASD/Maus/Sprung (`client/player/PlayerController.ts`), Socket.IO-Server mit
  persistentem HubRoom (`server/`), Player-Sync mit Interpolation, Chat-Overlay
  und Lobby-Menü (Babylon GUI).
- Phase 0 nutzt noch KEIN Havok: der Controller läuft über Babylons einfaches
  Collision-System (`moveWithCollisions`). Havok kommt mit der Ragdoll-Arbeit;
  `client/player/RagdollPhysics.ts` ist nur ein Stub und wartet auf ein
  gerigtes Charaktermodell (offene Art-Style-Frage, PROJECT_PLAN.md Abschnitt 8).
- Minigame-Arenen, Avatar-Baukasten (`AvatarCustomizer.ts` ist Stub) und die
  Currency-Persistenz (server/db/) sind noch nicht gebaut — siehe Roadmap in
  PROJECT_PLAN.md Abschnitt 7.
