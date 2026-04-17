extends Node

const START_ROOM_ID := "parking_lot"

var current_room_id: String = START_ROOM_ID
var objective_text: String = ""
var message_text: String = ""
var inventory: Array[String] = []
var unlocked_documents: Array[Dictionary] = []
var flags: Dictionary = {}

signal room_changed(room_id: String)
signal hud_changed


func _ready() -> void:
	reset()


func reset() -> void:
	current_room_id = START_ROOM_ID
	objective_text = "Look around the parking lot and establish the first room-based interaction loop."
	message_text = "You wake in the parked car. The apartment building feels familiar, but wrong."
	inventory.clear()
	unlocked_documents.clear()
	flags = {
		"car_checked": false,
		"found_keys": false,
		"gate_unlocked": false
	}
	emit_signal("room_changed", current_room_id)
	emit_signal("hud_changed")


func set_room(room_id: String) -> void:
	if current_room_id == room_id:
		return
	current_room_id = room_id
	emit_signal("room_changed", current_room_id)
	emit_signal("hud_changed")


func set_objective(text: String) -> void:
	objective_text = text
	emit_signal("hud_changed")


func set_message(text: String) -> void:
	message_text = text
	emit_signal("hud_changed")


func add_item(item_id: String) -> void:
	if inventory.has(item_id):
		return
	inventory.append(item_id)
	emit_signal("hud_changed")


func has_item(item_id: String) -> bool:
	return inventory.has(item_id)


func unlock_document(document: Dictionary) -> void:
	for existing: Dictionary in unlocked_documents:
		if existing.get("id", "") == document.get("id", ""):
			return
	unlocked_documents.append(document)
	emit_signal("hud_changed")
