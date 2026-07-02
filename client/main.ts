import { Engine } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { createHubScene } from "./scenes/HubScene";
import { PlayerController } from "./player/PlayerController";
import { NetworkClient } from "./net/NetworkClient";
import { PlayerSync } from "./net/PlayerSync";
import { ChatOverlay } from "./ui/ChatOverlay";
import { LobbyMenu } from "./ui/LobbyMenu";
import { CurrencyManager } from "./economy/CurrencyManager";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = createHubScene(engine);
const localPlayer = new PlayerController(scene, canvas);

const gui = AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);
const network = new NetworkClient();
new CurrencyManager(network);
new PlayerSync(scene, network, localPlayer, gui);
const chat = new ChatOverlay(gui, network);
new LobbyMenu(gui, network);

// Solange der Chat-Input offen ist, keine WASD/Sprung-Eingaben verarbeiten.
chat.onTypingChanged = (typing) => {
  localPlayer.inputEnabled = !typing;
};

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());

// Dev-Hook für automatisierte Smoke-Tests (nur im Vite-Dev-Modus aktiv).
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__game = {
    scene,
    network,
    localPlayer,
  };
}
