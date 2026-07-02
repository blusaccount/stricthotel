import {
  Color3,
  Mesh,
  MeshBuilder,
  Scalar,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import type { PlayerState, PlayerTransform } from "../../shared/types";
import type { NetworkClient } from "./NetworkClient";
import type { PlayerController } from "../player/PlayerController";

const SEND_INTERVAL = 1 / 20; // 20 Hz Richtung Server
const LERP_SPEED = 12; // Interpolationsfaktor pro Sekunde für Remote-Spieler

interface RemotePlayer {
  mesh: Mesh;
  label: TextBlock;
  target: PlayerTransform;
}

/**
 * Spawnt/despawnt Remote-Spieler-Meshes anhand der Server-Events und
 * interpoliert sie auf die zuletzt empfangene Zieltransform. Schickt
 * umgekehrt die Transform des lokalen Spielers mit fester Rate zum Server.
 */
export class PlayerSync {
  private readonly remotes = new Map<string, RemotePlayer>();
  private sendTimer = 0;

  constructor(
    private readonly scene: Scene,
    private readonly network: NetworkClient,
    private readonly localPlayer: PlayerController,
    private readonly gui: AdvancedDynamicTexture,
  ) {
    network.onWelcome = (selfId, players) => {
      this.clearRemotes();
      for (const player of players) {
        if (player.id === selfId) {
          localPlayer.setTransform(player);
        } else {
          this.spawnRemote(player);
        }
      }
    };
    network.onPlayerJoined = (player) => this.spawnRemote(player);
    network.onPlayerLeft = (playerId) => this.despawnRemote(playerId);
    network.onPlayerMoved = (playerId, transform) => {
      const remote = this.remotes.get(playerId);
      if (remote) {
        remote.target = transform;
      }
    };
    network.onDisconnected = () => this.clearRemotes();

    scene.onBeforeRenderObservable.add(() => this.update());
  }

  private update(): void {
    const dt = this.scene.getEngine().getDeltaTime() / 1000;

    const lerp = Math.min(1, LERP_SPEED * dt);
    for (const remote of this.remotes.values()) {
      const target = remote.target;
      remote.mesh.position = Vector3.Lerp(
        remote.mesh.position,
        new Vector3(target.position.x, target.position.y, target.position.z),
        lerp,
      );
      remote.mesh.rotation.y = Scalar.LerpAngle(
        remote.mesh.rotation.y,
        target.rotationY,
        lerp,
      );
    }

    this.sendTimer += dt;
    if (this.sendTimer >= SEND_INTERVAL && this.network.isConnected) {
      this.sendTimer = 0;
      this.network.sendMove(this.localPlayer.getTransform());
    }
  }

  private spawnRemote(player: PlayerState): void {
    if (this.remotes.has(player.id)) {
      return;
    }
    const mesh = MeshBuilder.CreateCapsule(
      `player-${player.id}`,
      { height: 1.8, radius: 0.35 },
      this.scene,
    );
    mesh.rotationQuaternion = null;
    mesh.position = new Vector3(
      player.position.x,
      player.position.y,
      player.position.z,
    );
    mesh.rotation.y = player.rotationY;

    const material = new StandardMaterial(`player-${player.id}-mat`, this.scene);
    material.diffuseColor = colorFromId(player.id);
    mesh.material = material;

    const label = new TextBlock(`player-${player.id}-label`, player.name);
    label.color = "white";
    label.fontSize = 16;
    label.outlineColor = "black";
    label.outlineWidth = 3;
    this.gui.addControl(label);
    label.linkWithMesh(mesh);
    label.linkOffsetY = -80;

    this.remotes.set(player.id, {
      mesh,
      label,
      target: { position: { ...player.position }, rotationY: player.rotationY },
    });
  }

  private despawnRemote(playerId: string): void {
    const remote = this.remotes.get(playerId);
    if (!remote) {
      return;
    }
    remote.label.dispose();
    remote.mesh.material?.dispose();
    remote.mesh.dispose();
    this.remotes.delete(playerId);
  }

  private clearRemotes(): void {
    for (const playerId of [...this.remotes.keys()]) {
      this.despawnRemote(playerId);
    }
  }
}

/** Deterministische, kräftige Spielerfarbe aus der Socket-Id. */
function colorFromId(id: string): Color3 {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  return Color3.FromHSV(hue, 0.7, 0.9);
}
