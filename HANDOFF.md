# HANDOFF - Socket.IO Security Hardening

## Was wurde gemacht

### server.js - Input-Validierung
- `sanitizeName()`: Entfernt `<>&"'/`, trimmt, max 20 Zeichen
- `validateCharacter()`: Prüft Objekt-Typ, max 2KB JSON, nur `pixels`/`dataURL` Keys erlaubt, dataURL muss mit `data:image/` beginnen
- `validateRoomCode()`: Nur A-Z0-9, max 4 Zeichen
- `validateGameType()`: Whitelist (`maexchen`, `lobby`), Fallback auf `maexchen`
- Alle 13 Socket-Handler nutzen diese Validierungen

### server.js - Rate Limiting
- Token-Bucket pro Socket-ID (Map-basiert)
- `checkRateLimit(socketId, maxPerSecond)` - Default: 10/Sekunde
- Strengere Limits für: Chat (5/s), Emotes (5/s), Drawings (3/s)
- Automatische Cleanup der Rate-Limiter-Map

### server.js - Error Handling
- Alle 13 `socket.on()` Handler in try-catch gewrappt
- Fehler werden geloggt mit Handler-Name (`console.error('handler-name error:', err.message)`)
- User-facing Fehler werden per `socket.emit('error', ...)` zurückgegeben wo sinnvoll
- setTimeout-Callbacks ebenfalls in try-catch

### server.js - Zusätzliche Sicherheit
- Doppelte Room-Erstellung verhindert (prüft `getRoom()` vor create)
- Doppelter Room-Join verhindert (prüft ob Socket schon im Raum)
- `announce`: Prüft `typeof value !== 'number' || !Number.isInteger(value)`
- `drawing-note`: dataURL max 70KB, muss mit `data:image/` starten, target max 20 Zeichen
- `chat-message`: HTML-Entities entfernt, max 100 Zeichen
- `emote`: max 50 Zeichen String

### server.js - Periodischer Cleanup (alle 5 Min)
- Prüft ob Socket-IDs in `onlinePlayers` noch connected sind
- Entfernt verwaiste Spieler aus Rooms
- Löscht leere Rooms
- Reassigned Host wenn alter Host disconnected
- Cleanup der Rate-Limiter-Map
- Loggt Anzahl entfernter Einträge

## Geänderte Datei
- `server.js` (einzige Datei)

## Was nicht geändert wurde
- Client-Code (public/, shared/, games/)
- Discord Bot
- Statische Dateien

## Was ist offen
- Client-seitige Validierung (optional, Server validiert bereits alles)
- CORS-Konfiguration für Socket.IO (aktuell offen)
- Authentifizierung/Sessions (aktuell anonym)
