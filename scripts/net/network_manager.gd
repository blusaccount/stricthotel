extends Node
## Attached to the "NetworkManager" node in hub_world.tscn.
## Owns the ENet connection lifecycle (host/join) and the roster of
## connected players. Actual player-node spawning lives in player_sync.gd.

const DEFAULT_PORT := 7777
const MAX_PLAYERS := 16

signal player_list_changed
signal connection_failed
signal server_disconnected

var players: Dictionary = {}  # peer_id (int) -> player_name (String)

var _pending_player_name: String = "Player"


func _ready() -> void:
	multiplayer.peer_disconnected.connect(_on_peer_disconnected)
	multiplayer.connected_to_server.connect(_on_connected_to_server)
	multiplayer.connection_failed.connect(_on_connection_failed)
	multiplayer.server_disconnected.connect(_on_server_disconnected)


func host_game(player_name: String, port: int = DEFAULT_PORT) -> Error:
	var peer := ENetMultiplayerPeer.new()
	var err := peer.create_server(port, MAX_PLAYERS)
	if err != OK:
		push_error("NetworkManager: failed to host on port %d (%d)" % [port, err])
		return err
	multiplayer.multiplayer_peer = peer
	players[multiplayer.get_unique_id()] = player_name
	player_list_changed.emit()
	return OK


func join_game(address: String, player_name: String, port: int = DEFAULT_PORT) -> Error:
	var peer := ENetMultiplayerPeer.new()
	var err := peer.create_client(address, port)
	if err != OK:
		push_error("NetworkManager: failed to connect to %s:%d (%d)" % [address, port, err])
		return err
	multiplayer.multiplayer_peer = peer
	_pending_player_name = player_name
	return OK


func disconnect_game() -> void:
	if multiplayer.multiplayer_peer:
		multiplayer.multiplayer_peer.close()
	multiplayer.multiplayer_peer = null
	players.clear()
	player_list_changed.emit()


func _on_peer_disconnected(id: int) -> void:
	players.erase(id)
	player_list_changed.emit()


func _on_connected_to_server() -> void:
	_announce_player.rpc_id(1, multiplayer.get_unique_id(), _pending_player_name)


func _on_connection_failed() -> void:
	multiplayer.multiplayer_peer = null
	connection_failed.emit()


func _on_server_disconnected() -> void:
	multiplayer.multiplayer_peer = null
	players.clear()
	server_disconnected.emit()


@rpc("any_peer", "reliable")
func _announce_player(id: int, player_name: String) -> void:
	if not multiplayer.is_server():
		return
	players[id] = player_name
	player_list_changed.emit()
	_sync_players.rpc(players)


@rpc("authority", "reliable")
func _sync_players(server_players: Dictionary) -> void:
	players = server_players
	player_list_changed.emit()
