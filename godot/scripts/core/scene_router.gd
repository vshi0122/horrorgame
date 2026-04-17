extends Node

const ROOM_SOURCES := [
	preload("res://godot/scripts/rooms/parking_lot_room.gd"),
	preload("res://godot/scripts/rooms/apartment_entrance_room.gd"),
	preload("res://godot/scripts/rooms/stairwell_room.gd"),
	preload("res://godot/scripts/rooms/car_closeup_room.gd"),
	preload("res://godot/scripts/rooms/notice_closeup_room.gd"),
	preload("res://godot/scripts/rooms/mailbox_closeup_room.gd")
]

var room_definitions: Dictionary = {}


func _ready() -> void:
	_load_rooms()


func _load_rooms() -> void:
	room_definitions.clear()
	for room_source in ROOM_SOURCES:
		var room_definition: Dictionary = room_source.build()
		var room_id: String = room_definition.get("id", "")
		if room_id == "":
			push_warning("Encountered a room definition without an id.")
			continue
		room_definitions[room_id] = room_definition


func get_room(room_id: String) -> Dictionary:
	return room_definitions.get(room_id, {})


func get_interactions(room_id: String) -> Array:
	var room: Dictionary = get_room(room_id)
	return room.get("interactions", [])


func get_interaction(room_id: String, interaction_id: String) -> Dictionary:
	for interaction: Dictionary in get_interactions(room_id):
		if interaction.get("id", "") == interaction_id:
			return interaction
	return {}


func is_interaction_available(interaction: Dictionary) -> bool:
	var requires_item: String = interaction.get("requires_item", "")
	if requires_item != "" and not GameState.has_item(requires_item):
		return false

	var requires_flag_true: String = interaction.get("requires_flag_true", "")
	if requires_flag_true != "" and not GameState.flags.get(requires_flag_true, false):
		return false

	var requires_flag_false: String = interaction.get("requires_flag_false", "")
	if requires_flag_false != "" and GameState.flags.get(requires_flag_false, false):
		return false

	return true


func apply_interaction(interaction_id: String) -> void:
	for interaction: Dictionary in get_interactions(GameState.current_room_id):
		if interaction.get("id", "") != interaction_id:
			continue
		if not is_interaction_available(interaction):
			GameState.set_message("That does not seem possible yet.")
			return

		var next_flag: String = interaction.get("sets_flag", "")
		if next_flag != "":
			GameState.flags[next_flag] = true

		var item_id: String = interaction.get("gives_item", "")
		if item_id != "":
			GameState.add_item(item_id)

		var next_objective: String = interaction.get("objective", "")
		if next_objective != "":
			GameState.set_objective(next_objective)

		var document: Dictionary = interaction.get("document", {})
		if not document.is_empty():
			GameState.unlock_document(document)

		var next_room: String = interaction.get("goto_room", "")
		if next_room != "":
			GameState.set_room(next_room)

		GameState.set_message(interaction.get("message", "You notice nothing new."))
		return
