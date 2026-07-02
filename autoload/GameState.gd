extends Node
## Autoload singleton. Holds state that must survive scene changes:
## the local player's identity, currency balance, and which scene is active.

signal currency_changed(new_amount: int)

var local_player_name: String = "Player"
var currency: int = 0
var current_scene_path: String = "res://scenes/hub/hub_world.tscn"


func add_currency(amount: int) -> void:
	currency += amount
	currency_changed.emit(currency)


func spend_currency(amount: int) -> bool:
	if amount > currency:
		return false
	currency -= amount
	currency_changed.emit(currency)
	return true
