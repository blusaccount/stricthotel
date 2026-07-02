extends Node
## Autoload singleton. Wraps all GodotSteam calls so the rest of the game
## never touches the Steam singleton directly.
##
## The addons/godotsteam GDExtension is not installed yet (Phase 4 of the
## roadmap), so every call here is guarded and falls back to a no-op.

const STEAM_APP_ID := 0  # Set once the Steamworks app ID is issued.

var steam_enabled: bool = false
var steam_id: int = 0
var steam_username: String = ""


func _ready() -> void:
	if not Engine.has_singleton("Steam"):
		print("SteamManager: GodotSteam addon not installed, running without Steam.")
		return
	_init_steam()


func _init_steam() -> void:
	var steam := Engine.get_singleton("Steam")
	var result: Dictionary = steam.steamInit()
	steam_enabled = result.get("status", 1) == 0
	if not steam_enabled:
		push_warning("SteamManager: steamInit failed: %s" % result.get("verbal", "unknown error"))
		return
	steam_id = steam.getSteamID()
	steam_username = steam.getPersonaName()


func unlock_achievement(achievement_id: String) -> void:
	if not steam_enabled:
		return
	var steam := Engine.get_singleton("Steam")
	steam.setAchievement(achievement_id)
	steam.storeStats()
