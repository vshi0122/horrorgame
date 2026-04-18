extends Node

const START_ROOM_ID := "car_closeup"
const SAVE_PATH := "user://progress.cfg"

var current_room_id: String = START_ROOM_ID
var objective_text: String = ""
var message_text: String = ""
var inventory: Array[String] = []
var unlocked_documents: Array[Dictionary] = []
var archived_documents: Array[Dictionary] = []
var unlocked_endings: Array[String] = []
var ending_counters: Dictionary = {}
var flags: Dictionary = {}

signal room_changed(room_id: String)
signal hud_changed


func _ready() -> void:
	_load_archive_progress()
	reset()


func reset() -> void:
	current_room_id = START_ROOM_ID
	objective_text = "先在驾驶座拿钥匙串，然后下车去停车场打开后备箱取出番茄酱。"
	message_text = "你在驾驶座上猛地惊醒，公寓楼正静静立在挡风玻璃前。"
	inventory.clear()
	unlocked_documents.clear()
	flags = {
		"woke_up": false,
		"found_keys": false,
		"flee_prompt_shown": false,
		"trunk_opened": false,
		"mailbox_opened": false,
		"code_discovered": false,
		"building_entered": false,
		"entrance_notice_read": false,
		"second_floor_notice_read": false,
		"gate_unlocked": false,
		"stairwell_footprints_checked": false,
		"intercom_checked": false,
		"third_floor_visited": false,
		"residential_unlocked": false,
		"corpse_examined": false,
		"creature_examined": false,
		"home_door_examined": false,
		"creature_alerted": false,
		"dinner_ketchup_given": false
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


func add_items(item_ids: Array) -> void:
	var added_any := false
	for item_id_variant in item_ids:
		var item_id := String(item_id_variant)
		if item_id == "" or inventory.has(item_id):
			continue
		inventory.append(item_id)
		added_any = true
	if added_any:
		emit_signal("hud_changed")


func has_item(item_id: String) -> bool:
	return inventory.has(item_id)


func remove_item(item_id: String) -> void:
	if not inventory.has(item_id):
		return
	inventory.erase(item_id)
	emit_signal("hud_changed")


func unlock_document(document: Dictionary) -> void:
	var added_to_session := false
	for existing: Dictionary in unlocked_documents:
		if existing.get("id", "") == document.get("id", ""):
			_archive_document(document)
			emit_signal("hud_changed")
			return
	unlocked_documents.append(document)
	added_to_session = true
	var changed_archive := _archive_document(document)
	if added_to_session or changed_archive:
		emit_signal("hud_changed")


func unlock_documents(documents: Array) -> void:
	var changed_any := false
	for document_variant in documents:
		var document: Dictionary = document_variant
		var already_unlocked := false
		for existing: Dictionary in unlocked_documents:
			if existing.get("id", "") == document.get("id", ""):
				already_unlocked = true
				break
		if not already_unlocked:
			unlocked_documents.append(document)
			changed_any = true
		if _archive_document(document):
			changed_any = true
	if changed_any:
		emit_signal("hud_changed")


func record_ending(ending_id: String) -> void:
	if ending_id == "":
		return
	if not unlocked_endings.has(ending_id):
		unlocked_endings.append(ending_id)
	ending_counters[ending_id] = int(ending_counters.get(ending_id, 0)) + 1
	_save_archive_progress()
	emit_signal("hud_changed")


func get_ending_trigger_count(ending_id: String) -> int:
	return int(ending_counters.get(ending_id, 0))


func _archive_document(document: Dictionary) -> bool:
	var existing_index := -1
	for index in range(archived_documents.size()):
		if archived_documents[index].get("id", "") == document.get("id", ""):
			existing_index = index
			break

	var changed := false
	if existing_index == -1:
		archived_documents.push_front(document)
		changed = true
	else:
		var existing_document: Dictionary = archived_documents[existing_index]
		var unchanged: bool = (
			existing_document.get("title", "") == document.get("title", "")
			and existing_document.get("source", "") == document.get("source", "")
			and existing_document.get("body", "") == document.get("body", "")
		)
		if not unchanged:
			archived_documents.remove_at(existing_index)
			archived_documents.push_front(document)
			changed = true

	if changed:
		_save_archive_progress()
	return changed


func _load_archive_progress() -> void:
	archived_documents.clear()
	unlocked_endings.clear()
	ending_counters.clear()

	var config := ConfigFile.new()
	if config.load(SAVE_PATH) != OK:
		return

	var documents_variant = config.get_value("archive", "documents", [])
	if documents_variant is Array:
		for document_variant in documents_variant:
			if document_variant is Dictionary:
				archived_documents.append(document_variant)

	var endings_variant = config.get_value("archive", "endings", [])
	if endings_variant is Array:
		for ending_variant in endings_variant:
			var ending_id := String(ending_variant)
			if ending_id != "":
				unlocked_endings.append(ending_id)

	var counters_variant = config.get_value("archive", "ending_counters", {})
	if counters_variant is Dictionary:
		for key_variant in counters_variant.keys():
			ending_counters[String(key_variant)] = int(counters_variant[key_variant])


func _save_archive_progress() -> void:
	var config := ConfigFile.new()
	config.set_value("archive", "documents", archived_documents)
	config.set_value("archive", "endings", unlocked_endings)
	config.set_value("archive", "ending_counters", ending_counters)
	config.save(SAVE_PATH)
