import type { Scene } from "@babylonjs/core";

/**
 * Basisklasse, von der jede Minigame-Arena (AmpelRennen, Wackelbruecke, ...)
 * erbt. Kapselt den gemeinsamen Start/Ende/Reward-Lifecycle, sodass eine
 * konkrete Arena nur ihre eigenen Regeln in onStart()/onRoundOver()
 * implementiert. Die Runden-Autorität liegt beim Server (ArenaRoom, Phase 2);
 * start/endRound werden dann von dessen Events getrieben, der Reward-Fluss
 * läuft über HubRoom.rewardWinners.
 */
export abstract class MinigameBase {
  rewardPerWinner = 10;
  isRunning = false;

  onRoundStarted?: () => void;
  onRoundEnded?: (winnerIds: string[]) => void;

  constructor(protected readonly scene: Scene) {}

  startRound(): void {
    this.isRunning = true;
    this.onRoundStarted?.();
    this.onStart();
  }

  endRound(winnerIds: string[]): void {
    this.isRunning = false;
    this.onRoundEnded?.(winnerIds);
    this.onRoundOver(winnerIds);
  }

  /** In der konkreten Arena überschreiben. */
  protected abstract onStart(): void;

  /** In der konkreten Arena überschreiben. */
  protected abstract onRoundOver(winnerIds: string[]): void;
}
