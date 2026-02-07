# HANDOFF - Character Creator auf Hauptseite

## Was wurde gemacht

### shared/js/creator.js angepasst
- `MaexchenApp.$` Dependency ist jetzt optional — Creator funktioniert auch ohne `window.MaexchenApp`
- localStorage Key von `maexchen-pixels` auf `stricthotel-character` geändert (global geteilt)
- Neuer Alias `window.StrictHotelCreator` neben `window.MaexchenCreator` (Abwärtskompatibilität)

### shared/js/lobby.js angepasst
- Lädt gespeicherten Namen aus `stricthotel-name` in das Namensfeld vor
- Speichert den Namen bei `registerPlayer()` in `stricthotel-name`

### public/index.html erweitert
- Avatar-Bar oben: Pixel-Art-Vorschau, Namensfeld, "Charakter erstellen/ändern"-Button
- Online-Spieler-Sektion unten: zeigt alle verbundenen Spieler mit Avatar und Status
- Socket.IO Client + Creator + lobby.js eingebunden
- Bestehendes Retro-Design beibehalten, Spielekarten unverändert

### public/lobby.js erstellt (neu)
- Lädt gespeicherten Character aus `stricthotel-character` via `StrictHotelCreator`
- Lädt gespeicherten Namen aus `stricthotel-name`
- Avatar-Vorschau: zeigt Pixel-Art oder Placeholder
- "Charakter erstellen"-Button öffnet den Creator, speichert und registriert
- Namensfeld: speichert bei Änderung, registriert bei `change`
- Socket: `register-player` mit `game: "lobby"`
- `online-players` Event: rendert Spielerliste mit Avatar + Name + Status
- Re-Registrierung bei Socket-Reconnect

### Nicht geändert
- server.js (register-player Event unterstützt `game: "lobby"` bereits)
- Nostalgiabait (keine Änderungen)
- games/maexchen/index.html (unverändert)
- Canvas-Versionen der Boot-Sequenzen

## Was funktioniert
- Character auf Hauptseite erstellen → wird in localStorage gespeichert
- Name auf Hauptseite eingeben → wird in localStorage gespeichert
- In Mäxchen wechseln → Name und Character werden automatisch vorgeladen
- Character in Mäxchen erstellen → wird auch auf der Hauptseite angezeigt
- Online-Spieler werden global auf allen Seiten angezeigt
- Spieler auf der Hauptseite registrieren sich als `game: "lobby"`

## Was ist offen
- Character-Edit in der Avatar-Bar ist nur über den Button möglich (kein Klick auf den Avatar selbst)
