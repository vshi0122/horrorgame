extends RefCounted


var host: Node
var documents_button: Button
var documents_overlay: ColorRect
var documents_panel: PanelContainer
var documents_list: ItemList
var document_title_label: Label
var document_source_label: Label
var document_text_label: RichTextLabel
var rail_document_title_label: Label
var rail_document_source_label: Label
var rail_document_body_label: RichTextLabel
var new_document_overlay: ColorRect
var new_document_panel: PanelContainer
var new_document_title_label: Label
var new_document_source_label: Label
var new_document_body_label: RichTextLabel

var selected_document_index: int = -1
var documents_overlay_tween: Tween
var new_document_tween: Tween


func setup(main_host: Node, refs: Dictionary) -> void:
	host = main_host
	documents_button = refs["documents_button"]
	documents_overlay = refs["documents_overlay"]
	documents_panel = refs["documents_panel"]
	documents_list = refs["documents_list"]
	document_title_label = refs["document_title_label"]
	document_source_label = refs["document_source_label"]
	document_text_label = refs["document_text_label"]
	rail_document_title_label = refs["rail_document_title_label"]
	rail_document_source_label = refs["rail_document_source_label"]
	rail_document_body_label = refs["rail_document_body_label"]
	new_document_overlay = refs["new_document_overlay"]
	new_document_panel = refs["new_document_panel"]
	new_document_title_label = refs["new_document_title_label"]
	new_document_source_label = refs["new_document_source_label"]
	new_document_body_label = refs["new_document_body_label"]


func show_documents_overlay() -> void:
	refresh_documents_list()
	refresh_documents_button()
	if documents_overlay_tween != null:
		documents_overlay_tween.kill()
	documents_overlay.visible = true
	documents_overlay.color = Color(0.01, 0.015, 0.02, 0.0)
	documents_panel.modulate = Color(1, 1, 1, 0.0)
	documents_panel.scale = Vector2(0.92, 0.98)
	documents_panel.rotation_degrees = -1.0

	documents_overlay_tween = host.create_tween()
	documents_overlay_tween.set_parallel(true)
	documents_overlay_tween.set_trans(Tween.TRANS_CUBIC)
	documents_overlay_tween.set_ease(Tween.EASE_OUT)
	documents_overlay_tween.tween_property(documents_overlay, "color", Color(0.01, 0.015, 0.02, 0.72), 0.18)
	documents_overlay_tween.tween_property(documents_panel, "modulate", Color(1, 1, 1, 1), 0.14)
	documents_overlay_tween.tween_property(documents_panel, "scale", Vector2(1.0, 1.0), 0.22)
	documents_overlay_tween.tween_property(documents_panel, "rotation_degrees", 0.0, 0.20)


func hide_documents_overlay(immediate: bool = false) -> void:
	if documents_overlay_tween != null:
		documents_overlay_tween.kill()

	if immediate:
		documents_overlay.visible = false
		documents_overlay.color = Color(0.01, 0.015, 0.02, 0.0)
		documents_panel.modulate = Color(1, 1, 1, 1)
		documents_panel.scale = Vector2(1.0, 1.0)
		documents_panel.rotation_degrees = 0.0
		return

	if not documents_overlay.visible:
		return

	documents_overlay_tween = host.create_tween()
	documents_overlay_tween.set_parallel(true)
	documents_overlay_tween.set_trans(Tween.TRANS_CUBIC)
	documents_overlay_tween.set_ease(Tween.EASE_IN)
	documents_overlay_tween.tween_property(documents_overlay, "color", Color(0.01, 0.015, 0.02, 0.0), 0.14)
	documents_overlay_tween.tween_property(documents_panel, "modulate", Color(1, 1, 1, 0.0), 0.10)
	documents_overlay_tween.tween_property(documents_panel, "scale", Vector2(0.98, 0.99), 0.14)
	documents_overlay_tween.finished.connect(func() -> void:
		documents_overlay.visible = false
		documents_panel.modulate = Color(1, 1, 1, 1)
		documents_panel.scale = Vector2(1.0, 1.0)
		documents_panel.rotation_degrees = 0.0
	)


func show_new_document_overlay(document: Dictionary) -> void:
	if document.is_empty() or new_document_overlay == null or new_document_panel == null:
		return

	if new_document_tween != null:
		new_document_tween.kill()

	new_document_title_label.text = _document_text(document, "title", "Untitled")
	new_document_source_label.text = _document_text(document, "source", "")
	new_document_body_label.text = _document_text(document, "body", "")
	new_document_body_label.scroll_to_line(0)

	new_document_overlay.visible = true
	new_document_overlay.color = Color(0.01, 0.015, 0.02, 0.0)
	new_document_panel.modulate = Color(1, 1, 1, 0.0)
	new_document_panel.scale = Vector2(0.08, 1.0)
	new_document_panel.rotation_degrees = -4.0
	var page_height := maxf(new_document_panel.size.y, new_document_panel.custom_minimum_size.y)
	if page_height <= 0.0:
		page_height = 360.0
	new_document_panel.pivot_offset = Vector2(0, page_height * 0.5)

	new_document_tween = host.create_tween()
	new_document_tween.set_parallel(true)
	new_document_tween.set_trans(Tween.TRANS_CUBIC)
	new_document_tween.set_ease(Tween.EASE_OUT)
	new_document_tween.tween_property(new_document_overlay, "color", Color(0.01, 0.015, 0.02, 0.72), 0.18)
	new_document_tween.tween_property(new_document_panel, "modulate", Color(1, 1, 1, 1), 0.14)
	new_document_tween.tween_property(new_document_panel, "scale", Vector2(1.0, 1.0), 0.26)
	new_document_tween.tween_property(new_document_panel, "rotation_degrees", 0.0, 0.24)


func hide_new_document_overlay(immediate: bool = false) -> void:
	if new_document_overlay == null or not new_document_overlay.visible:
		return

	if new_document_tween != null:
		new_document_tween.kill()

	if immediate:
		new_document_overlay.visible = false
		new_document_overlay.color = Color(0.01, 0.015, 0.02, 0.0)
		new_document_panel.modulate = Color(1, 1, 1, 1)
		new_document_panel.scale = Vector2(1.0, 1.0)
		new_document_panel.rotation_degrees = 0.0
		return

	new_document_tween = host.create_tween()
	new_document_tween.set_parallel(true)
	new_document_tween.set_trans(Tween.TRANS_CUBIC)
	new_document_tween.set_ease(Tween.EASE_IN)
	new_document_tween.tween_property(new_document_overlay, "color", Color(0.01, 0.015, 0.02, 0.0), 0.14)
	new_document_tween.tween_property(new_document_panel, "modulate", Color(1, 1, 1, 0.0), 0.12)
	new_document_tween.tween_property(new_document_panel, "scale", Vector2(0.98, 1.0), 0.14)
	new_document_tween.finished.connect(func() -> void:
		new_document_overlay.visible = false
		new_document_panel.modulate = Color(1, 1, 1, 1)
		new_document_panel.scale = Vector2(1.0, 1.0)
		new_document_panel.rotation_degrees = 0.0
	)


func open_archive_from_new_document() -> void:
	hide_new_document_overlay(true)
	show_documents_overlay()


func refresh_documents_list() -> void:
	documents_list.clear()
	for document: Dictionary in GameState.unlocked_documents:
		var title := _document_text(document, "title", "Untitled")
		documents_list.add_item(title)

	if GameState.unlocked_documents.is_empty():
		selected_document_index = -1
		document_title_label.text = I18n.t("ui.documents.empty_title")
		document_source_label.text = I18n.t("ui.documents.empty_source")
		document_text_label.text = ""
		_set_rail_document_empty_state()
		return

	if selected_document_index < 0 or selected_document_index >= GameState.unlocked_documents.size():
		selected_document_index = 0

	documents_list.select(selected_document_index)
	_show_document(selected_document_index)


func on_document_selected(index: int) -> void:
	selected_document_index = index
	_show_document(index)


func on_rail_document_selected(index: int) -> void:
	selected_document_index = index
	documents_list.select(index)
	_show_document(index)


func show_document(index: int) -> void:
	_show_document(index)


func refresh_documents_button() -> void:
	documents_button.text = "⧉"


func reset_documents_selection() -> void:
	selected_document_index = 0


func find_document(document_id: String) -> Dictionary:
	for document: Dictionary in GameState.unlocked_documents:
		if String(document.get("id", "")) == document_id:
			return document
	return {}


func find_document_title(document_id: String) -> String:
	for document: Dictionary in GameState.unlocked_documents:
		if String(document.get("id", "")) == document_id:
			return _document_text(document, "title", "Untitled")
	return "Untitled"


func set_rail_document_empty_state() -> void:
	_set_rail_document_empty_state()


func _show_document(index: int) -> void:
	if index < 0 or index >= GameState.unlocked_documents.size():
		return

	var document: Dictionary = GameState.unlocked_documents[index]
	document_title_label.text = _document_text(document, "title", "Untitled")
	document_source_label.text = _document_text(document, "source", "")
	document_text_label.text = _document_text(document, "body", "")
	rail_document_title_label.text = _document_text(document, "title", "Untitled")
	rail_document_source_label.text = _document_text(document, "source", "")
	rail_document_body_label.text = _document_text(document, "body", "")


func _set_rail_document_empty_state() -> void:
	rail_document_title_label.text = I18n.t("ui.documents.rail.empty_title")
	rail_document_source_label.text = I18n.t("ui.documents.rail.empty_source")
	rail_document_body_label.text = I18n.t("ui.documents.rail.empty_body")


func _document_text(data: Dictionary, field: String, fallback: String = "") -> String:
	return I18n.text_from(data, field, fallback)
