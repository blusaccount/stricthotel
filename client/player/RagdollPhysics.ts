import type { Skeleton } from "@babylonjs/core";

/**
 * Ragdoll-Stub. Die echte Ragdoll-Comedy (Ampel-Rennen, Tauziehen, ...)
 * braucht ein gerigtes Charaktermodell (Skeleton + Havok-PhysicsAggregate
 * pro Bone), was von der noch offenen Art-Style-Entscheidung abhängt
 * (PROJECT_PLAN.md, Abschnitt 8). Sobald das Modell existiert: Havok hier
 * initialisieren (HavokPlugin + @babylonjs/havok-WASM) und die Bones in die
 * Simulation schicken.
 */
export class RagdollPhysics {
  isRagdolled = false;

  private skeleton: Skeleton | null = null;

  setSkeleton(skeleton: Skeleton): void {
    this.skeleton = skeleton;
  }

  enableRagdoll(): void {
    if (this.skeleton === null) {
      return;
    }
    // TODO(Havok): PhysicsAggregates pro Bone starten.
    this.isRagdolled = true;
  }

  disableRagdoll(): void {
    if (this.skeleton === null) {
      return;
    }
    // TODO(Havok): Simulation stoppen, Bones zurück an die Animation geben.
    this.isRagdolled = false;
  }
}
