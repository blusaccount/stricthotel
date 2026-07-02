extends Node3D
## Ragdoll toggle stub. Real ragdoll comedy (Ampel-Rennen, Tauziehen, etc.)
## needs a rigged character model with a Skeleton3D + PhysicalBone3D setup,
## which depends on the still-open art-style decision (see PROJECT_PLAN.md,
## section 8). Once that model exists, point _skeleton at it and this will
## drive Godot's built-in physical bone simulation.

var _skeleton: Skeleton3D = null
var is_ragdolled: bool = false


func set_skeleton(skeleton: Skeleton3D) -> void:
	_skeleton = skeleton


func enable_ragdoll() -> void:
	if _skeleton == null:
		return
	_skeleton.physical_bones_start_simulation()
	is_ragdolled = true


func disable_ragdoll() -> void:
	if _skeleton == null:
		return
	_skeleton.physical_bones_stop_simulation()
	is_ragdolled = false
