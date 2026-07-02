/**
 * Phase-2-Stub: pro Minigame-Runde dynamisch instanzierter Raum.
 * Bekommt beim Ausbau: Socket.IO-Room-Namespace, Teilnehmerliste aus dem
 * HubRoom, Runden-Lifecycle (Start/Ende) und den Reward-Fluss zurück in
 * die Currency (HubRoom.rewardWinners). Client-Gegenstück ist
 * client/scenes/MinigameBase.ts.
 */
export class ArenaRoom {
  readonly playerIds = new Set<string>();
  isRunning = false;

  constructor(readonly arenaId: string) {}
}
