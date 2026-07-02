import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  PlayerState,
  PlayerTransform,
  ServerToClientEvents,
} from "../../shared/types";

type GameSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

/**
 * Dünner, typisierter Wrapper um den Socket.IO-Client. Die eigentliche
 * Spiellogik hängt sich über die on*-Callbacks an (PlayerSync, ChatOverlay,
 * LobbyMenu, CurrencyManager).
 */
export class NetworkClient {
  playerName = "Player";

  onConnected?: () => void;
  onConnectError?: (message: string) => void;
  onDisconnected?: () => void;
  onWelcome?: (selfId: string, players: PlayerState[]) => void;
  onPlayerJoined?: (player: PlayerState) => void;
  onPlayerLeft?: (playerId: string) => void;
  onPlayerMoved?: (playerId: string, transform: PlayerTransform) => void;
  onChat?: (senderName: string, message: string) => void;
  onBalance?: (newAmount: number) => void;

  private socket: GameSocket | null = null;

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  connect(serverUrl: string, playerName: string): void {
    this.disconnect();
    this.playerName = playerName;

    const socket: GameSocket = io(serverUrl, { reconnection: false });
    this.socket = socket;

    socket.on("connect", () => {
      socket.emit("join", playerName);
      this.onConnected?.();
    });
    socket.on("connect_error", (error) => {
      this.socket = null;
      this.onConnectError?.(error.message);
    });
    socket.on("disconnect", () => {
      this.socket = null;
      this.onDisconnected?.();
    });

    socket.on("welcome", (selfId, players) => this.onWelcome?.(selfId, players));
    socket.on("playerJoined", (player) => this.onPlayerJoined?.(player));
    socket.on("playerLeft", (playerId) => this.onPlayerLeft?.(playerId));
    socket.on("playerMoved", (playerId, transform) =>
      this.onPlayerMoved?.(playerId, transform),
    );
    socket.on("chat", (senderName, message) => this.onChat?.(senderName, message));
    socket.on("balance", (newAmount) => this.onBalance?.(newAmount));
  }

  sendMove(transform: PlayerTransform): void {
    this.socket?.emit("move", transform);
  }

  sendChat(message: string): void {
    this.socket?.emit("chat", message);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
