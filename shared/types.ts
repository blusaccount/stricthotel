// Single Source of Truth für alle Netzwerk-Messages zwischen Client und Server.
// Änderungen hier immer auf beiden Seiten konsistent halten (siehe CLAUDE.md).

export const DEFAULT_SERVER_PORT = 3001;
export const MAX_PLAYERS = 16;

export interface Vector3State {
  x: number;
  y: number;
  z: number;
}

/** Das, was pro Spieler kontinuierlich repliziert wird. */
export interface PlayerTransform {
  position: Vector3State;
  rotationY: number;
}

/** Voller Spieler-Zustand, wie ihn der Server verwaltet und verteilt. */
export interface PlayerState extends PlayerTransform {
  id: string;
  name: string;
}

/** Messages Client -> Server. */
export interface ClientToServerEvents {
  join: (playerName: string) => void;
  move: (transform: PlayerTransform) => void;
  chat: (message: string) => void;
}

/** Messages Server -> Client. */
export interface ServerToClientEvents {
  /** Antwort auf "join": eigene id plus alle Spieler im Raum (inkl. sich selbst mit Spawn-Position). */
  welcome: (selfId: string, players: PlayerState[]) => void;
  playerJoined: (player: PlayerState) => void;
  playerLeft: (playerId: string) => void;
  playerMoved: (playerId: string, transform: PlayerTransform) => void;
  chat: (senderName: string, message: string) => void;
  /** Server-autoritativer Kontostand (StrictCoins-artig), gepusht bei jeder Änderung. */
  balance: (newAmount: number) => void;
}
