import { AdvancedDynamicTexture, Control, TextBlock } from "@babylonjs/gui";

/**
 * Phase-2-Stub: HUD-Einblendung oben mittig während einer Minigame-Runde
 * (Countdown, Rundenstatus, Sieger). Wird von den Arena-Szenen
 * (client/scenes/arenas/) über MinigameBase angesteuert.
 */
export class MinigameHUD {
  private readonly statusText: TextBlock;

  constructor(gui: AdvancedDynamicTexture) {
    this.statusText = new TextBlock("minigameStatus", "");
    this.statusText.color = "white";
    this.statusText.fontSize = 28;
    this.statusText.outlineColor = "black";
    this.statusText.outlineWidth = 4;
    this.statusText.height = "60px";
    this.statusText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.statusText.paddingTop = "20px";
    this.statusText.isVisible = false;
    gui.addControl(this.statusText);
  }

  show(text: string): void {
    this.statusText.text = text;
    this.statusText.isVisible = true;
  }

  hide(): void {
    this.statusText.isVisible = false;
  }
}
