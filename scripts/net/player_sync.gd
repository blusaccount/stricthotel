extends Node3D
## Attached to the hub_world.tscn root. Spawns and despawns the
## per-peer player_character.tscn instances under the "Players" node.
## Actual position/rotation replication is handled by the
## MultiplayerSynchronizer inside player_character.tscn itself.

const PLAYER_SCENE := preload("res://scenes/player/player_character.tscn")

@onready var _players_root: Node3D = $Players
@onready var _spawn_points: Node3D = $SpawnPoints


func _ready() -> void:
	multiplayer.peer_connected.connect(_on_peer_connected)
	multiplayer.peer_disconnected.connect(_on_peer_disconnected)
	if multiplayer.is_server():
		_spawn_player(multiplayer.get_unique_id())


func _on_peer_connected(id: int) -> void:
	if multiplayer.is_server():
		_spawn_player(id)


func _on_peer_disconnected(id: int) -> void:
	if not multiplayer.is_server():
		return
	var node := _players_root.get_node_or_null(str(id))
	if node:
		node.queue_free()


func _spawn_player(id: int) -> void:
	var player := PLAYER_SCENE.instantiate()
	player.name = str(id)
	_players_root.add_child(player, true)
	player.set_multiplayer_authority(id)
	var point := _pick_spawn_point()
	if point:
		player.global_position = point.global_position


func _pick_spawn_point() -> Node3D:
	if _spawn_points.get_child_count() == 0:
		return null
	return _spawn_points.get_child(randi() % _spawn_points.get_child_count())
