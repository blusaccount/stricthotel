import {
  AdvancedDynamicTexture,
  Control,
  InputText,
  Rectangle,
  ScrollViewer,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";
import type { NetworkClient } from "../net/NetworkClient";

const MAX_LOG_LINES = 100;

/**
 * Chat unten links (Port des Godot chat_overlay.gd): Enter öffnet den Input,
 * Enter sendet, Escape schließt. Nachrichten laufen Client -> Server ->
 * Broadcast an alle (server/rooms/HubRoom.ts).
 */
export class ChatOverlay {
  /** Wird gefeuert, wenn der Input auf/zu geht — main.ts pausiert damit die Spielereingabe. */
  onTypingChanged?: (typing: boolean) => void;

  private readonly log: TextBlock;
  private readonly input: InputText;
  private readonly scroll: ScrollViewer;
  private lines: string[] = [];

  constructor(
    private readonly gui: AdvancedDynamicTexture,
    private readonly network: NetworkClient,
  ) {
    const panel = new StackPanel("chatPanel");
    panel.width = "360px";
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    panel.paddingLeft = "12px";
    panel.paddingBottom = "12px";
    panel.isHitTestVisible = false;
    gui.addControl(panel);

    const logBackground = new Rectangle("chatLogBackground");
    logBackground.height = "180px";
    logBackground.thickness = 0;
    logBackground.background = "#00000066";
    logBackground.cornerRadius = 6;
    panel.addControl(logBackground);

    this.scroll = new ScrollViewer("chatScroll");
    this.scroll.thickness = 0;
    this.scroll.barSize = 10;
    logBackground.addControl(this.scroll);

    this.log = new TextBlock("chatLog", "");
    this.log.textWrapping = true;
    this.log.resizeToFit = true;
    this.log.color = "white";
    this.log.fontSize = 14;
    this.log.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.log.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.log.paddingLeft = "8px";
    this.log.paddingRight = "8px";
    this.scroll.addControl(this.log);

    this.input = new InputText("chatInput");
    this.input.width = 1;
    this.input.height = "32px";
    this.input.color = "white";
    this.input.background = "#000000aa";
    this.input.focusedBackground = "#000000cc";
    this.input.placeholderText = "Nachricht…";
    this.input.placeholderColor = "#bbbbbb";
    this.input.isVisible = false;
    panel.addControl(this.input);

    this.input.onFocusObservable.add(() => this.onTypingChanged?.(true));
    this.input.onBlurObservable.add(() => {
      this.input.isVisible = false;
      this.onTypingChanged?.(false);
    });
    this.input.onKeyboardEventProcessedObservable.add((event) => {
      if (event.key === "Enter") {
        this.submit();
      } else if (event.key === "Escape") {
        this.closeInput();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.code === "Enter" && !this.input.isVisible) {
        this.openInput();
        event.preventDefault();
      }
    });

    network.onChat = (senderName, message) => {
      this.appendLine(`${senderName}: ${message}`);
    };
  }

  private openInput(): void {
    this.input.isVisible = true;
    this.gui.moveFocusToControl(this.input);
  }

  private closeInput(): void {
    this.input.isVisible = false;
    this.gui.focusedControl = null;
  }

  private submit(): void {
    const message = this.input.text.trim();
    this.input.text = "";
    this.closeInput();
    if (!message) {
      return;
    }
    if (this.network.isConnected) {
      this.network.sendChat(message);
    } else {
      this.appendLine("(nicht verbunden)");
    }
  }

  private appendLine(line: string): void {
    this.lines.push(line);
    if (this.lines.length > MAX_LOG_LINES) {
      this.lines = this.lines.slice(-MAX_LOG_LINES);
    }
    this.log.text = this.lines.join("\n");
    // Ans Ende scrollen, sobald das Layout die neue Zeile kennt.
    this.scroll.verticalBar.value = 1;
  }
}
