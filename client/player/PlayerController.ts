import {
  Mesh,
  MeshBuilder,
  Ray,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";
import type { PlayerTransform } from "../../shared/types";

const SPEED = 5.0;
const JUMP_VELOCITY = 4.5;
const MOUSE_SENSITIVITY = 0.003;
const GRAVITY = 9.8;
const MAX_PITCH = 1.2;

const CAPSULE_HEIGHT = 1.8;
const CAPSULE_RADIUS = 0.35;
const GROUND_RAY_EXTRA = 0.08;

/**
 * Walk-and-look-Controller für den lokalen Spieler (Port des Godot
 * player_controller.gd). Phase 0 nutzt bewusst noch kein Havok, sondern
 * Babylons einfaches Collision-System (moveWithCollisions) plus manuelle
 * Gravitation — Havok kommt mit der Ragdoll-Arbeit (RagdollPhysics.ts).
 * Remote-Spieler bekommen keinen Controller; sie werden von
 * net/PlayerSync.ts rein aus Netzwerk-Transforms interpoliert.
 */
export class PlayerController {
  readonly body: Mesh;
  /** false, solange z.B. der Chat-Input offen ist. */
  inputEnabled = true;

  private readonly cameraPivot: TransformNode;
  private readonly pressedKeys = new Set<string>();
  private verticalVelocity = 0;

  constructor(
    private readonly scene: Scene,
    canvas: HTMLCanvasElement,
  ) {
    this.body = MeshBuilder.CreateCapsule(
      "localPlayer",
      { height: CAPSULE_HEIGHT, radius: CAPSULE_RADIUS },
      scene,
    );
    this.body.position = new Vector3(0, CAPSULE_HEIGHT / 2 + 0.1, 0);
    this.body.rotationQuaternion = null;
    this.body.ellipsoid = new Vector3(
      CAPSULE_RADIUS,
      CAPSULE_HEIGHT / 2,
      CAPSULE_RADIUS,
    );

    this.cameraPivot = new TransformNode("cameraPivot", scene);
    this.cameraPivot.parent = this.body;
    this.cameraPivot.position = new Vector3(0, 0.7, 0);

    const camera = new UniversalCamera(
      "playerCamera",
      new Vector3(0, 0, -4),
      scene,
    );
    camera.parent = this.cameraPivot;
    camera.minZ = 0.1;
    scene.activeCamera = camera;

    canvas.addEventListener("click", () => {
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock();
      }
    });
    window.addEventListener("mousemove", (event) => {
      if (document.pointerLockElement !== canvas) {
        return;
      }
      this.body.rotation.y += event.movementX * MOUSE_SENSITIVITY;
      this.cameraPivot.rotation.x += event.movementY * MOUSE_SENSITIVITY;
      this.cameraPivot.rotation.x = Math.min(
        MAX_PITCH,
        Math.max(-MAX_PITCH, this.cameraPivot.rotation.x),
      );
    });
    window.addEventListener("keydown", (event) => this.pressedKeys.add(event.code));
    window.addEventListener("keyup", (event) => this.pressedKeys.delete(event.code));
    window.addEventListener("blur", () => this.pressedKeys.clear());

    scene.onBeforeRenderObservable.add(() => this.update());
  }

  getTransform(): PlayerTransform {
    return {
      position: {
        x: this.body.position.x,
        y: this.body.position.y,
        z: this.body.position.z,
      },
      rotationY: this.body.rotation.y,
    };
  }

  setTransform(transform: PlayerTransform): void {
    this.body.position.set(
      transform.position.x,
      transform.position.y,
      transform.position.z,
    );
    this.body.rotation.y = transform.rotationY;
    this.verticalVelocity = 0;
  }

  private update(): void {
    const dt = this.scene.getEngine().getDeltaTime() / 1000;
    if (dt <= 0) {
      return;
    }

    const grounded = this.isGrounded();
    if (grounded && this.verticalVelocity <= 0) {
      this.verticalVelocity = 0;
      if (this.inputEnabled && this.pressedKeys.has("Space")) {
        this.verticalVelocity = JUMP_VELOCITY;
      }
    } else {
      this.verticalVelocity -= GRAVITY * dt;
    }

    const inputX =
      (this.isPressed("KeyD") ? 1 : 0) - (this.isPressed("KeyA") ? 1 : 0);
    const inputZ =
      (this.isPressed("KeyW") ? 1 : 0) - (this.isPressed("KeyS") ? 1 : 0);

    const forward = this.body.getDirection(Vector3.Forward());
    forward.y = 0;
    forward.normalize();
    const right = this.body.getDirection(Vector3.Right());
    right.y = 0;
    right.normalize();

    const horizontal = right.scale(inputX).add(forward.scale(inputZ));
    if (horizontal.lengthSquared() > 0) {
      horizontal.normalize().scaleInPlace(SPEED);
    }

    const displacement = horizontal
      .scale(dt)
      .add(new Vector3(0, this.verticalVelocity * dt, 0));
    this.body.moveWithCollisions(displacement);
  }

  private isPressed(code: string): boolean {
    return this.inputEnabled && this.pressedKeys.has(code);
  }

  private isGrounded(): boolean {
    const ray = new Ray(
      this.body.position,
      Vector3.Down(),
      CAPSULE_HEIGHT / 2 + GROUND_RAY_EXTRA,
    );
    const hit = this.scene.pickWithRay(
      ray,
      (mesh) => mesh.checkCollisions && mesh !== this.body,
    );
    return hit?.hit ?? false;
  }
}
