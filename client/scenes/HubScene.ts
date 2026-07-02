import {
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

/**
 * Persistenter Social-Space, Phase-0-Blockout: eine 40x40-Bodenplatte plus
 * Licht/Himmel — 1:1-Port des früheren Godot-hub_world. Die Spawn-Punkte
 * werden serverseitig zugewiesen (server/rooms/HubRoom.ts).
 */
export function createHubScene(engine: Engine): Scene {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.45, 0.65, 0.95, 1);
  scene.ambientColor = new Color3(1, 1, 1);
  scene.collisionsEnabled = true;

  const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.6;

  const sun = new DirectionalLight("sun", new Vector3(-0.5, -0.75, 0.433), scene);
  sun.position = new Vector3(0, 8, 0);
  sun.intensity = 0.9;
  new ShadowGenerator(1024, sun);

  const ground = MeshBuilder.CreateBox(
    "ground",
    { width: 40, height: 1, depth: 40 },
    scene,
  );
  ground.position.y = -0.5;
  ground.checkCollisions = true;
  ground.receiveShadows = true;

  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new Color3(0.35, 0.55, 0.35);
  ground.material = groundMaterial;

  return scene;
}
