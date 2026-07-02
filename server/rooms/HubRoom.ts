import type { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  PlayerState,
  PlayerTransform,
  ServerToClientEvents,
  Vector3State,
} from "../../shared/types";
import { MAX_PLAYERS } from "../../shared/types";
import { CurrencyLedger } from "../economy/currency";

type IoServer = Server<ClientToServerEvents, ServerToClientEvents>;
type IoSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const MAX_NAME_LENGTH = 24;
const MAX_CHAT_LENGTH = 300;

// Spiegel der Spawn-Punkte im Hub-Blockout. Netzwerk-Positionen sind immer
// das Kapsel-Zentrum (Kapselhöhe 1.8 -> y = 1.0 knapp über dem Boden).
const SPAWN_POINTS: readonly Vector3State[] = [
  { x: 3, y: 1.0, z: 0 },
  { x: -3, y: 1.0, z: 0 },
  { x: 0, y: 1.0, z: 3 },
  { x: 0, y: 1.0, z: -3 },
  { x: 2.2, y: 1.0, z: 2.2 },
  { x: -2.2, y: 1.0, z: -2.2 },
];

/**
 * Der eine persistente Social-Raum. Verwaltet Roster, Bewegungs-Relay und
 * Chat. ArenaRooms (Phase 2) werden pro Minigame-Runde zusätzlich instanziert.
 */
export class HubRoom {
  private readonly players = new Map<string, PlayerState>();
  private readonly currency = new CurrencyLedger();

  constructor(private readonly io: IoServer) {}

  handleConnection(socket: IoSocket): void {
    socket.on("join", (playerName) => this.addPlayer(socket, playerName));
    socket.on("move", (transform) => this.movePlayer(socket, transform));
    socket.on("chat", (message) => this.relayChat(socket, message));
    socket.on("disconnect", () => this.removePlayer(socket));
  }

  private addPlayer(socket: IoSocket, playerName: string): void {
    if (this.players.has(socket.id)) {
      return;
    }
    if (this.players.size >= MAX_PLAYERS) {
      socket.disconnect(true);
      return;
    }
    const name =
      String(playerName ?? "").trim().slice(0, MAX_NAME_LENGTH) || "Player";
    const spawn = this.pickSpawnPoint();
    const state: PlayerState = {
      id: socket.id,
      name,
      position: { ...spawn },
      rotationY: 0,
    };
    this.players.set(socket.id, state);

    socket.emit("welcome", socket.id, [...this.players.values()]);
    socket.emit("balance", this.currency.getBalance(socket.id));
    socket.broadcast.emit("playerJoined", state);
    console.log(`[hub] ${name} (${socket.id}) joined, ${this.players.size} online`);
  }

  private movePlayer(socket: IoSocket, transform: PlayerTransform): void {
    const state = this.players.get(socket.id);
    if (!state) {
      return;
    }
    state.position = transform.position;
    state.rotationY = transform.rotationY;
    socket.broadcast.emit("playerMoved", socket.id, transform);
  }

  private relayChat(socket: IoSocket, message: string): void {
    const state = this.players.get(socket.id);
    if (!state) {
      return;
    }
    const trimmed = String(message ?? "").trim().slice(0, MAX_CHAT_LENGTH);
    if (!trimmed) {
      return;
    }
    this.io.emit("chat", state.name, trimmed);
  }

  private removePlayer(socket: IoSocket): void {
    const state = this.players.get(socket.id);
    if (!state) {
      return;
    }
    this.players.delete(socket.id);
    socket.broadcast.emit("playerLeft", socket.id);
    console.log(`[hub] ${state.name} (${socket.id}) left, ${this.players.size} online`);
  }

  /** Belohnt Rundensieger und pusht die neuen Kontostände (Reward-Fluss ab Phase 2). */
  rewardWinners(winnerIds: string[], amountPerWinner: number): void {
    for (const id of winnerIds) {
      const newBalance = this.currency.grant(id, amountPerWinner);
      this.io.to(id).emit("balance", newBalance);
    }
  }

  private pickSpawnPoint(): Vector3State {
    const index = Math.floor(Math.random() * SPAWN_POINTS.length);
    return SPAWN_POINTS[index] ?? { x: 0, y: 1.0, z: 0 };
  }
}
