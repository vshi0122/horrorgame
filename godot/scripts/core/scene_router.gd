extends Node

const ROOM_SOURCES := [
	preload("res://godot/scripts/rooms/parking_lot_room.gd"),
	preload("res://godot/scripts/rooms/apartment_entrance_room.gd"),
	preload("res://godot/scripts/rooms/stairwell_room.gd"),
	preload("res://godot/scripts/rooms/car_closeup_room.gd"),
	preload("res://godot/scripts/rooms/notice_closeup_room.gd"),
	preload("res://godot/scripts/rooms/mailbox_closeup_room.gd"),
	preload("res://godot/scripts/rooms/hallway_room.gd"),
	preload("res://godot/scripts/rooms/pin_room.gd"),
	preload("res://godot/scripts/rooms/second_floor_hall_room.gd"),
	preload("res://godot/scripts/rooms/upper_stairwell_room.gd"),
	preload("res://godot/scripts/rooms/back_stairwell_room.gd"),
	preload("res://godot/scripts/rooms/picture_room.gd"),
	preload("res://godot/scripts/rooms/fake_third_room.gd"),
	preload("res://godot/scripts/rooms/smell_room.gd"),
	preload("res://godot/scripts/rooms/third_floor_hall_room.gd"),
	preload("res://godot/scripts/rooms/third_floor_residential_room.gd"),
	preload("res://godot/scripts/rooms/third_floor_run_room.gd"),
	preload("res://godot/scripts/rooms/escape_stairwell_room.gd"),
	preload("res://godot/scripts/rooms/hallway_normal_room.gd"),
	preload("res://godot/scripts/rooms/stairwell_normal_room.gd"),
	preload("res://godot/scripts/rooms/second_floor_hall_normal_room.gd"),
	preload("res://godot/scripts/rooms/upper_stairwell_normal_room.gd"),
	preload("res://godot/scripts/rooms/third_floor_hall_normal_room.gd"),
	preload("res://godot/scripts/rooms/third_floor_residential_normal_room.gd"),
	preload("res://godot/scripts/rooms/dinner_table_room.gd"),
	preload("res://godot/scripts/rooms/good_ending_question_room.gd"),
	preload("res://godot/scripts/rooms/flee_ending_room.gd"),
	preload("res://godot/scripts/rooms/bad_ending_room.gd"),
	preload("res://godot/scripts/rooms/failed_escape_ending_room.gd"),
	preload("res://godot/scripts/rooms/normal_ending_room.gd")
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
	var first_match: Dictionary = {}
	for interaction: Dictionary in get_interactions(room_id):
		if interaction.get("id", "") != interaction_id:
			continue
		if first_match.is_empty():
			first_match = interaction
		if is_interaction_available(interaction):
			return interaction
	return first_match
	


func is_interaction_available(interaction: Dictionary) -> bool:
	var requires_item: String = interaction.get("requires_item", "")
	if requires_item != "" and not GameState.has_item(requires_item):
		return false

	var requires_missing_item: String = interaction.get("requires_missing_item", "")
	if requires_missing_item != "" and GameState.has_item(requires_missing_item):
		return false

	var requires_flag_true: String = interaction.get("requires_flag_true", "")
	if requires_flag_true != "" and not GameState.flags.get(requires_flag_true, false):
		return false

	var requires_flag_false: String = interaction.get("requires_flag_false", "")
	if requires_flag_false != "" and GameState.flags.get(requires_flag_false, false):
		return false

	return true


func apply_interaction(interaction_id: String) -> void:
	var first_match: Dictionary = {}
	for interaction: Dictionary in get_interactions(GameState.current_room_id):
		if interaction.get("id", "") != interaction_id:
			continue
		if first_match.is_empty():
			first_match = interaction
		if not is_interaction_available(interaction):
			GameState.set_message("That does not seem possible yet.")
			continue

		var next_flag: String = interaction.get("sets_flag", "")
		if next_flag != "":
			GameState.flags[next_flag] = true

		for next_flag_variant in interaction.get("sets_flags", []):
			var flag_name := String(next_flag_variant)
			if flag_name == "":
				continue
			GameState.flags[flag_name] = true

		var item_id: String = interaction.get("gives_item", "")
		if item_id != "":
			GameState.add_item(item_id)

		var item_ids: Array = interaction.get("gives_items", [])
		if not item_ids.is_empty():
			GameState.add_items(item_ids)

		var removed_item: String = interaction.get("removes_item", "")
		if removed_item != "":
			GameState.remove_item(removed_item)

		var clears_flags: Array = interaction.get("clears_flags", [])
		for clear_flag_variant in clears_flags:
			var clear_flag_name := String(clear_flag_variant)
			if clear_flag_name == "":
				continue
			GameState.flags[clear_flag_name] = false

		var next_objective: String = interaction.get("objective", "")
		if next_objective != "":
			GameState.set_objective(next_objective)

		var document: Dictionary = interaction.get("document", {})
		if not document.is_empty():
			GameState.unlock_document(document)

		var documents: Array = interaction.get("documents", [])
		if not documents.is_empty():
			GameState.unlock_documents(documents)

		var conditional_flags: Array = interaction.get("if_flags_all_true_then_set_flags", [])
		var can_apply_conditionals := true
		for flag_variant in interaction.get("if_flags_all_true", []):
			var flag_name := String(flag_variant)
			if flag_name == "" or not GameState.flags.get(flag_name, false):
				can_apply_conditionals = false
				break
		if can_apply_conditionals:
			for next_conditional_flag_variant in conditional_flags:
				var next_conditional_flag := String(next_conditional_flag_variant)
				if next_conditional_flag == "":
					continue
				GameState.flags[next_conditional_flag] = true

			var conditional_objective: String = interaction.get("if_flags_all_true_then_objective", "")
			if conditional_objective != "":
				GameState.set_objective(conditional_objective)

			var conditional_message: String = interaction.get("if_flags_all_true_then_message", "")
			if conditional_message != "":
				GameState.set_message(conditional_message)

			var conditional_room: String = interaction.get("if_flags_all_true_then_goto_room", "")
			if conditional_room != "":
				GameState.set_room(conditional_room)
				return

		var next_room: String = interaction.get("goto_room", "")
		if next_room != "":
			GameState.set_room(next_room)

		if interaction.get("resets_game", false):
			GameState.reset()

		if not can_apply_conditionals or interaction.get("if_flags_all_true_then_message", "") == "":
			GameState.set_message(interaction.get("message", "You notice nothing new."))
		return

	if not first_match.is_empty():
		GameState.set_message("That does not seem possible yet.")
