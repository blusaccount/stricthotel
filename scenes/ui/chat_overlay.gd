extends CanvasLayer
## Bottom-left chat: press Enter to open the input, Enter again to send.
## Standard client -> server -> broadcast RPC relay pattern.

@onready var _log: RichTextLabel = $Panel/VBoxContainer/Log
@onready var _input: LineEdit = $Panel/VBoxContainer/Input


func _ready() -> void:
	_input.visible = false
	_input.text_submitted.connect(_on_text_submitted)


func _unhandled_input(event: InputEvent) -> void:
	if _input.visible:
		return
	if event.is_action_pressed("chat_toggle"):
		_input.visible = true
		_input.grab_focus()
		get_viewport().set_input_as_handled()


func _on_text_submitted(text: String) -> void:
	_input.text = ""
	_input.visible = false
	var trimmed := text.strip_edges()
	if trimmed.is_empty():
		return
	if multiplayer.is_server():
		_broadcast_chat_message.rpc(GameState.local_player_name, trimmed)
	else:
		_submit_chat_message.rpc_id(1, GameState.local_player_name, trimmed)


@rpc("any_peer", "reliable")
func _submit_chat_message(sender_name: String, message: String) -> void:
	if not multiplayer.is_server():
		return
	_broadcast_chat_message.rpc(sender_name, message)


@rpc("authority", "call_local", "reliable")
func _broadcast_chat_message(sender_name: String, message: String) -> void:
	_log.text += "[b]%s:[/b] %s\n" % [sender_name.xml_escape(), message.xml_escape()]
