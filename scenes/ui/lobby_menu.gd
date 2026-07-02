extends CanvasLayer
## Host/Join screen shown on top of the hub at startup. Hides itself once a
## connection attempt succeeds; reappears if the connection then fails.

@onready var _name_input: LineEdit = $Panel/VBoxContainer/NameInput
@onready var _address_input: LineEdit = $Panel/VBoxContainer/AddressInput
@onready var _host_button: Button = $Panel/VBoxContainer/HostButton
@onready var _join_button: Button = $Panel/VBoxContainer/JoinButton
@onready var _status_label: Label = $Panel/VBoxContainer/StatusLabel
@onready var _network_manager: Node = $"../NetworkManager"


func _ready() -> void:
	_host_button.pressed.connect(_on_host_pressed)
	_join_button.pressed.connect(_on_join_pressed)
	_network_manager.connection_failed.connect(_on_connection_failed)


func _on_host_pressed() -> void:
	GameState.local_player_name = _player_name()
	var err := _network_manager.host_game(GameState.local_player_name)
	if err == OK:
		visible = false
	else:
		_status_label.text = "Could not start server (err %d)." % err


func _on_join_pressed() -> void:
	GameState.local_player_name = _player_name()
	var address := _address_input.text if not _address_input.text.is_empty() else "127.0.0.1"
	var err := _network_manager.join_game(address, GameState.local_player_name)
	if err == OK:
		visible = false
	else:
		_status_label.text = "Could not connect (err %d)." % err


func _on_connection_failed() -> void:
	_status_label.text = "Connection failed."
	visible = true


func _player_name() -> String:
	return _name_input.text if not _name_input.text.is_empty() else "Player"
