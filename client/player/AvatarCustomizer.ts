import { Color3, StandardMaterial } from "@babylonjs/core";
import type { Mesh } from "@babylonjs/core";

export interface AvatarConfig {
  bodyColor: string;
}

/**
 * Phase-1-Stub für den 3D-Avatar-Baukasten (Farbe, Form, Accessoires).
 * Offene Frage: Persistenz clientseitig (localStorage) oder serverseitig
 * (DB, wie StrictHotel) — siehe PROJECT_PLAN.md Abschnitt 8.
 */
export class AvatarCustomizer {
  applyTo(mesh: Mesh, config: AvatarConfig): void {
    const material =
      mesh.material instanceof StandardMaterial
        ? mesh.material
        : new StandardMaterial(`${mesh.name}Avatar`, mesh.getScene());
    material.diffuseColor = Color3.FromHexString(config.bodyColor);
    mesh.material = material;
  }
}
