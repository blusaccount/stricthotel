# Recherche: Stickman-Ragdolls für den Hub (Open-Source-Vorbilder & Lizenzen)

Stand: 2026-07-03. Ziel: 3D-Raum, in dem Spieler als Stickman-Ragdolls
umherlaufen und chatten. Alles muss kommerziell nutzbar sein (Steam-Release,
siehe CLAUDE.md-Grundregel).

Legende: ✅ = Behauptung adversarial verifiziert (3 unabhängige Prüfungen),
⚠️ = aus Primärquelle extrahiert, aber Verifikations-Pass nicht abgeschlossen
(vor Code-Übernahme Lizenz selbst nochmal öffnen).

---

## 1. Babylon.js bringt das meiste schon mit

Die wichtigste Erkenntnis: **Wir müssen kein fremdes Ragdoll-Framework
adaptieren.** Babylon.js Physics V2 (mit Havok) enthält alles Nötige:

- ✅ **`BABYLON.Ragdoll`-Klasse** (Physics V2): wird in einer Zeile aus
  Skeleton + Skinned Mesh + Bone-Config instanziert. Die Config definiert
  pro Bone Shape/Größe/Rotationsachse mit Min/Max-Winkellimits.
  Doku: https://doc.babylonjs.com/features/featuresDeepDive/physics/ragdolls
- ✅ **Kinematic ↔ Dynamic-Umschaltung**: Nach Instanziierung ist die Ragdoll
  im Kinematic-Modus (Animation treibt die Physik-Bodies), `ragdoll.ragdoll()`
  schaltet auf reine Physik um — genau der „Charakter kippt um“-Moment
  unserer Minigame-Comedy.
- ✅ **7 Constraint-Typen** (LOCK, BALL_AND_SOCKET, DISTANCE, HINGE,
  PRISMATIC, SLIDER, SIX_DOF); `Physics6DoFConstraint` erlaubt Min/Max-Limits
  pro Achse — damit sind alle Ragdoll-Gelenke abbildbar.
  Doku: https://doc.babylonjs.com/features/featuresDeepDive/physics/constraints
- ✅ **Motor-Constraints** (Velocity- und Positions-Target, Playground
  `#5KKGOT#1`) — der Mechanismus, um eine Ragdoll aktiv Richtung
  Animations-Pose zu treiben statt sie schlaff hängen zu lassen
  („Active Ragdoll“, siehe Abschnitt 3).
- ✅ **Offizielle Playgrounds**: `#V6FLZP#1` (Bunny-Ragdoll), `#DLPNQT#0`
  (animierter Charakter + Impulse), `#HLZE74#0` (Physicalized Bone).
- ✅ **Havok-WASM ist MIT-lizenziert**, kostenlos, kommerziell nutzbar.
  npm: `@babylonjs/havok`; Init: `await HavokPhysics()` →
  `new HavokPlugin(true, hk)`. Achtung: braucht WASM SIMD → **kein iOS < 16.4**.
- ⚠️ Havok-WASM enthält NICHT Havoks nativen Ragdoll-Support; das
  Babylon-Team baut die Ragdoll-Klasse bewusst selbst (Forum-Aussage Cedric).
  Konsequenz: Wir bleiben auf der Babylon-API, nicht auf Havok-Interna.

**Community-Lib:** `jongomez/ragdoll.js` (Babylon-Forum, Havok-Support seit
06/2023) existiert, aber ⚠️ Lizenz im Thread ungenannt → vor jeglicher
Übernahme im Repo prüfen. Vermutlich unnötig, da die eingebaute Klasse reicht.

## 2. Code-Vorbilder im Web-Ökosystem

| Repo/Demo | Stack | Lizenz | Was abschauen | Einordnung |
|---|---|---|---|---|
| [armomu/ergoudan](https://github.com/armomu/ergoudan) | **Babylon.js + Havok + TS + Vite** | ✅ MIT (LICENSE-Datei geprüft) | Third-Person-Controller auf Havok: Laufen, Treppen, Slopes. Exakt unser Stack; Kandidat als Ersatz für unseren `moveWithCollisions`-Controller, sobald Havok drin ist. Kein Ragdoll. | Code übernehmbar (vendoren, kein npm-Paket). ⚠️ Enthaltenes Modell `x-bot.glb` ist Mixamo — NICHT unter MIT, nicht mitkopieren! |
| [mattvb91/rapierjs-ragdoll](https://github.com/mattvb91/rapierjs-ragdoll) | three.js + Rapier, TS | ⚠️ MIT | Passive Ragdoll: Ball-Joints zwischen Körperteilen, pro Frame Physik-Body→Bone-Sync, Blender→glTF→DRACO-Pipeline. | Muster übertragbar, Code portierbar |
| [schteppe/ammo.js-demos](https://schteppe.github.io/ammo.js-demos/demos/RagdollDemo/three.html) | three.js + Ammo | ⚠️ zlib | Constraint-Aufbau einer Browser-Ragdoll; Trennung Physik-Step/Rendering. | 2011-Ära, nur Lernvorlage |
| cannon.js Ragdoll-Demo + sbedit-Demo (three.js-Forum) | three.js + Cannon | Demo-Code | Muster: Physik-Bodies an animierte (Mixamo-)Bones hängen, Animation mit Ragdoll blenden. | Konzept-Referenz |

## 3. Architektur-Vorbilder „Active Ragdoll“ (Unity/Godot — nur Konzept, kein Code-Copy)

Alle folgenden sind C#/GDScript → Code wird ohnehin neu in TS geschrieben,
Lizenz erlaubt aber auch direktes Portieren:

- **[sergioabreu-g/active-ragdolls](https://github.com/sergioabreu-g/active-ragdolls)**
  (Unity, ⚠️ Apache-2.0, 356★) — **das Referenz-Pattern**: Dual-Body —
  ein unsichtbares animiertes Skelett spielt normale Animationen, ein
  physisches Duplikat folgt ihm, indem jedes Gelenk per Angular Drive die
  Rotation seines animierten Zwillings anpeilt. Maps 1:1 auf Babylons
  6DoF-Constraints mit Motoren.
- **[matieme/Active-Ragdoll-Character](https://github.com/matieme/Active-Ragdoll-Character)**
  (Unity, ⚠️ MIT) — Balance über „Balance Strength“-Parameter auf den
  Joint-Drives; Mixamo-Rig-Autocomplete zeigt: Mixamo-Skelett ist ein
  praktikables Rig-Target. ⚠️ Beiliegendes Charaktermodell hat keine
  eigene Lizenzangabe → Assets nicht übernehmen.
- **[ashleve/ActiveRagdoll](https://github.com/ashleve/ActiveRagdoll)**
  (Unity, ⚠️ MIT) — PID-Controller-Ansatz, sauber getrennt in:
  Animations-Folge-Kräfte, Master-Controller (Animator driftet nicht weg),
  Slave-Controller (Kollisionen → Gelenke verlieren Kraft = floppy
  Gang-Beasts-Reaktion). Gute Blaupause für unser `RagdollPhysics.ts`.
- **[R3X-G1L6AME5H/Godot-Active-Ragdolls](https://github.com/R3X-G1L6AME5H/Godot-Active-Ragdolls)**
  (Godot, ⚠️ MIT, 77★) — baut Ragdoll aus RigidBodies + Generic6DOFJoints
  statt Engine-PhysicalBones, Dual-Skeleton-Animation-Matching mit
  Matching-Velocity-Multiplikatoren. Bestätigt: das Pattern ist
  engine-unabhängig.
- [Wapit1/Godot_open_ragdoll…](https://github.com/Wapit1/Godot_open_ragdoll_physic_body_system)
  (⚠️ MIT) — zielt auf Gang-Beasts-Stil, aber pre-MVP-Hobbyprototyp (8★) → überspringen.

**Konsens-Technik über alle Quellen:** Animation + Physik blenden.
Passive Ragdoll = Bodies folgen Bones (kinematic) bzw. Bones folgen Bodies
(dynamic). Active Ragdoll = Motor-Constraints ziehen das Physik-Skelett
permanent zur Animations-Pose, Stärke regelbar (voll = läuft sauber,
schwach/aus = Comedy-Flop).

## 4. Charaktermodelle / Rigs (kommerziell nutzbar)

| Quelle | Lizenz | Details |
|---|---|---|
| **[Quaternius](https://quaternius.com/)** | ⚠️ CC0, explizit „personal, educational and commercial“ | Gerigte Low-Poly-Humanoide (Universal Base Characters, ~13k Tris, Retargeting-freundlich), FBX **und glTF** (Babylon-nativ). Diverse animierte Packs. **Erste Wahl als Basis/Platzhalter.** |
| **[Kenney](https://kenney.nl/assets/blocky-characters)** | ⚠️ CC0 (alle Kenney-Assets; Attribution optional; nur das Kenney-Logo ist ausgenommen) | „Blocky Characters“ v2.0, animiert. Stil eher Minecraft-ig als Stickman. |
| **[Mixamo](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)** | ⚠️ Royalty-free inkl. „Create video games“, gratis mit Adobe ID | Auto-Rigger + große Animations-Library (nur bipedale Humanoide — passt für Stickman). **Vorsicht:** FAQ regelt Attribution/Redistribution nicht explizit; rohe Assets nicht weiterverbreiten (siehe ergoudan-x-bot-Caveat), einbacken ins Spiel ist gedeckt. Nicht verfügbar für Enterprise-Adobe-IDs/China. |
| **Eigenes Stickman-Modell** | unser IP | Ein Stickman ist geometrisch trivial (Kapseln + Kugel). Eigenes Rig in Blender = null Lizenzrisiko, voll auf unsere Bone-Config zugeschnitten, Mixamo-Animationen retargetbar. |

## 5. Lizenz-Spielregeln für den Steam-Release

- ✅/⚠️ Valve nennt **MIT, BSD (3/4-Clause), Apache-2.0, WTFPL explizit als
  Steamworks-kompatibel**; **GPL als problematisch** (Steamworks SDK ist
  proprietär). GPL-Code kann nur der Rechteinhaber selbst per Ausnahme
  shippen — für Fremdcode keine Option.
  Quelle: https://partner.steamgames.com/doc/sdk/uploading/distributing_opensource
- ⚠️ GNU-FAQ bestätigt: Schon Linken gegen eine GPL-Library GPL-t die
  Kombination; LGPL ist bedingt ok; „nur ein kleiner Schnipsel“ ist keine
  sichere Umgehung.
- Valve legt die Compliance-Verantwortung vollständig auf den Entwickler →
  **wir dokumentieren ab jetzt pro übernommenem Repo/Asset die Lizenz**
  (dieses Dokument ist der Anfang; bei Übernahme: Eintrag in ein
  THIRD_PARTY_NOTICES-File).

## 6. Empfehlung für unseren Stack

Gestufter Plan — jede Stufe ist eigenständig spielbar:

1. **Havok einbinden** (`@babylonjs/havok`, MIT): HavokPlugin-Init in der
   HubScene, Boden/Objekte als PhysicsAggregates. Unser
   `moveWithCollisions`-Controller läuft parallel weiter, bis der
   Havok-Controller steht (ergoudan als MIT-Referenz).
2. **Eigenes Stickman-Rig bauen** (Blender: Kapsel-Glieder + Kugel-Kopf,
   Standard-Humanoid-Skelett) → glTF. Animationen (Idle/Walk/Jump) via
   Mixamo-Retargeting oder handgemacht. Null Lizenzrisiko, passt exakt
   zur Ragdoll-Bone-Config. Quaternius als Fallback/Platzhalter.
3. **Passive Ragdoll zuerst** (= unser `RagdollPhysics.ts`-Stub füllen):
   `BABYLON.Ragdoll` im Kinematic-Modus während des Laufens,
   `ragdoll.ragdoll()` beim Umkippen/Getroffen-Werden, danach Blend zurück
   zur Animation. Das liefert bereits die Kern-Comedy (Hinfallen im Hub,
   Ampel-Rennen-Umkippen) mit minimalem Eigenbau.
4. **Active Ragdoll als Ausbaustufe** (für „laufende Ragdolls“ à la Gang
   Beasts): Dual-Body-Pattern von sergioabreu-g auf Babylon portieren —
   unsichtbares animiertes Skelett + physisches Skelett, 6DoF-Motoren
   peilen die animierte Pose an, Motorstärke = Balance-Regler. Erst
   angehen, wenn Stufe 3 im Multiplayer stabil läuft (Ragdoll-Sync über
   Socket.IO ist die eigentliche Herausforderung: Server-seitig nur
   Trigger/Seed synchen, Physik clientseitig deterministisch genug halten
   oder Root-Transform + Pose-Snapshot senden).

**Nicht tun:** GPL-Ragdoll-Projekte forken/kopieren (nur lesen), Mixamo-
Rohdateien ins Repo committen, jongomez/ragdoll.js ohne Lizenzcheck vendoren.

---

*Recherche-Methodik: 5 parallele Such-Stränge, 22 Quellen gefetcht, 108
Claims extrahiert, Top-25 adversarial verifiziert (11 bestätigt 3-0, 0
widerlegt, 14 wegen Rate-Limit ohne abgeschlossenen Verify-Pass — als ⚠️
markiert). Lizenzangaben mit ⚠️ vor Übernahme im jeweiligen Repo verifizieren.*
