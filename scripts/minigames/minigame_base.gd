class_name MinigameBase
extends Node3D
## Base class every minigame arena script (Ampel-Rennen, Wackelbruecke, ...)
## should extend. Handles the shared start/end/reward lifecycle so each
## arena only implements its own rules in _on_start() / _on_round_over().

signal round_started
signal round_ended(winners: Array)

@export var reward_per_winner: int = 10

var is_running: bool = false


func start_round() -> void:
	if not multiplayer.is_server():
		return
	is_running = true
	round_started.emit()
	_on_start()


func end_round(winners: Array) -> void:
	if not multiplayer.is_server():
		return
	is_running = false
	round_ended.emit(winners)
	_on_round_over(winners)


func _on_start() -> void:
	pass  # Override in the concrete minigame script.


func _on_round_over(_winners: Array) -> void:
	pass  # Override in the concrete minigame script.
