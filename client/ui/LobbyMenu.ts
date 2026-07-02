import {
  AdvancedDynamicTexture,
  Button,
  Control,
  InputText,
  Rectangle,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";
import { DEFAULT_SERVER_PORT } from "../../shared/types";
import type { NetworkClient } from "../net/NetworkClient";

/**
 * Verbindungs-Screen über dem Hub beim Start (Port des Godot lobby_menu.gd).
 * Statt Host/Join gibt es mit dediziertem Socket.IO-Server nur noch
 * "Verbinden" — lokal hosten heißt jetzt: `npm run dev:server` starten.
 * Blendet sich bei erfolgreicher Verbindung aus, kommt bei Fehlern wieder.
 */
export class LobbyMenu {
  private readonly root: Rectangle;
  private readonly nameInput: InputText;
  private readonly addressInput: InputText;
  private readonly statusLabel: TextBlock;

  constructor(
    gui: AdvancedDynamicTexture,
    private readonly network: NetworkClient,
  ) {
    this.root = new Rectangle("lobbyMenu");
    this.root.width = "340px";
    this.root.height = "300px";
    this.root.background = "#1c1c28ee";
    this.root.cornerRadius = 10;
    this.root.thickness = 0;
    gui.addControl(this.root);

    const panel = new StackPanel("lobbyPanel");
    panel.width = "300px";
    panel.spacing = 10;
    this.root.addControl(panel);

    const title = new TextBlock("lobbyTitle", "Hangout Game (Arbeitstitel)");
    title.color = "white";
    title.fontSize = 20;
    title.height = "40px";
    panel.addControl(title);

    this.nameInput = new InputText("nameInput");
    this.nameInput.width = 1;
    this.nameInput.height = "36px";
    this.nameInput.color = "white";
    this.nameInput.background = "#00000066";
    this.nameInput.focusedBackground = "#00000099";
    this.nameInput.placeholderText = "Spielername";
    this.nameInput.placeholderColor = "#999999";
    panel.addControl(this.nameInput);

    this.addressInput = new InputText("addressInput");
    this.addressInput.width = 1;
    this.addressInput.height = "36px";
    this.addressInput.color = "white";
    this.addressInput.background = "#00000066";
    this.addressInput.focusedBackground = "#00000099";
    this.addressInput.text = defaultServerAddress();
    panel.addControl(this.addressInput);

    const connectButton = Button.CreateSimpleButton("connectButton", "Verbinden");
    connectButton.width = 1;
    connectButton.height = "40px";
    connectButton.color = "white";
    connectButton.background = "#3a7d3a";
    connectButton.cornerRadius = 6;
    connectButton.thickness = 0;
    panel.addControl(connectButton);

    this.statusLabel = new TextBlock("lobbyStatus", "");
    this.statusLabel.color = "#ff9999";
    this.statusLabel.fontSize = 14;
    this.statusLabel.height = "40px";
    this.statusLabel.textWrapping = true;
    this.statusLabel.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.addControl(this.statusLabel);

    connectButton.onPointerClickObservable.add(() => this.connect());

    network.onConnected = () => {
      this.root.isVisible = false;
    };
    network.onConnectError = (message) => {
      this.statusLabel.text = `Verbindung fehlgeschlagen: ${message}`;
      this.root.isVisible = true;
    };
    network.onDisconnected = () => {
      this.statusLabel.text = "Verbindung getrennt.";
      this.root.isVisible = true;
    };
  }

  private connect(): void {
    const playerName = this.nameInput.text.trim() || "Player";
    const address = this.addressInput.text.trim() || defaultServerAddress();
    const url = /^https?:\/\//.test(address)
      ? address
      : `${window.location.protocol}//${address}`;
    this.statusLabel.text = "Verbinde…";
    this.network.connect(url, playerName);
  }
}

function defaultServerAddress(): string {
  // Im Vite-Dev-Setup läuft der Socket.IO-Server separat auf DEFAULT_SERVER_PORT;
  // im Produktions-Deploy (Render.com) liefert derselbe Origin Client und Server.
  return import.meta.env.DEV
    ? `${window.location.hostname}:${DEFAULT_SERVER_PORT}`
    : window.location.host;
}
