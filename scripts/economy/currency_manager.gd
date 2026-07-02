extends Node
## Server-authoritative currency ledger, keyed by peer id. Not wired into
## any scene yet (Phase 1: "Currency-System (Grundgerüst)") — add an
## instance of this as a child of hub_world's NetworkManager once the
## economy work starts, and call grant()/spend() from minigame reward
## flows and shop UIs.

var _balances: Dictionary = {}  # peer_id (int) -> balance (int)


func get_balance(peer_id: int) -> int:
	return _balances.get(peer_id, 0)


func grant(peer_id: int, amount: int) -> void:
	if not multiplayer.is_server():
		return
	_balances[peer_id] = get_balance(peer_id) + amount
	_push_balance.rpc_id(peer_id, _balances[peer_id])


func spend(peer_id: int, amount: int) -> bool:
	if not multiplayer.is_server():
		return false
	if get_balance(peer_id) < amount:
		return false
	_balances[peer_id] -= amount
	_push_balance.rpc_id(peer_id, _balances[peer_id])
	return true


@rpc("authority", "reliable")
func _push_balance(new_amount: int) -> void:
	GameState.currency = new_amount
	GameState.currency_changed.emit(new_amount)
