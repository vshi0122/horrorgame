extends Control

@onready var room_name_label: Label = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TitleColumn/RoomName
@onready var room_hint_label: RichTextLabel = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomHint
@onready var background_texture: TextureRect = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisual/RoomVisualFrame/RoomVisualLayer/BackgroundTexture
@onready var hotspot_layer: Control = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisual/RoomVisualFrame/RoomVisualLayer/HotspotLayer
@onready var interaction_list: VBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/InteractionList
@onready var message_label: RichTextLabel = $RootMargin/Layout/CenterColumn/MessagePanel/MessageMargin/MessageValue
@onready var documents_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/DocumentsButton
@onready var objective_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/ObjectiveButton
@onready var documents_overlay: ColorRect = $DocumentsOverlay
@onready var documents_list: ItemList = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentsList
@onready var document_title_label: Label = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentTitle
@onready var document_source_label: Label = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentSource
@onready var document_text_label: RichTextLabel = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentText
@onready var documents_close_button: Button = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsHeader/DocumentsCloseButton
@onready var objective_overlay: ColorRect = $ObjectiveOverlay
@onready var objective_value_label: RichTextLabel = $ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveValue
@onready var objective_close_button: Button = $ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveHeader/ObjectiveCloseButton

var selected_document_index: int = -1


func _ready() -> void:
	GameState.room_changed.connect(_refresh_room)
	GameState.hud_changed.connect(_refresh_hud)
	hotspot_layer.resized.connect(_rebuild_hotspots)
	documents_button.pressed.connect(_show_documents_overlay)
	objective_button.pressed.connect(_show_objective_overlay)
	documents_close_button.pressed.connect(_hide_documents_overlay)
	objective_close_button.pressed.connect(_hide_objective_overlay)
	documents_list.item_selected.connect(_on_document_selected)
	_refresh_room(GameState.current_room_id)
	_refresh_hud()


func _refresh_room(room_id: String) -> void:
	var room: Dictionary = SceneRouter.get_room(room_id)
	room_name_label.text = room.get("title", "Unknown Room")
	room_hint_label.text = room.get("hint", "")
	_apply_background(room.get("background", ""))

	for child: Node in interaction_list.get_children():
		child.queue_free()

	for interaction: Dictionary in SceneRouter.get_interactions(room_id):
		if not SceneRouter.is_interaction_available(interaction):
			continue
		var button := Button.new()
		button.text = interaction.get("label", "Interact")
		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		button.focus_mode = Control.FOCUS_NONE
		button.pressed.connect(_on_interaction_requested.bind(interaction.get("id", "")))
		interaction_list.add_child(button)

	_rebuild_hotspots()


func _refresh_hud() -> void:
	message_label.text = GameState.message_text
	objective_value_label.text = GameState.objective_text
	_refresh_documents_list()


func _on_interaction_requested(interaction_id: String) -> void:
	_on_interaction_pressed(interaction_id)


func _on_interaction_pressed(interaction_id: String) -> void:
	SceneRouter.apply_interaction(interaction_id)
	_refresh_room(GameState.current_room_id)
	_refresh_hud()


func _apply_background(texture_path: String) -> void:
	if texture_path == "":
		background_texture.texture = null
		return
	background_texture.texture = load(texture_path)


func _add_hotspot_button(interaction: Dictionary) -> void:
	var hotspot_rect: Rect2 = interaction.get("hotspot_rect", Rect2())
	if hotspot_rect.size == Vector2.ZERO:
		return

	var button := Button.new()
	button.text = interaction.get("label", "Interact")
	button.tooltip_text = interaction.get("label", "Interact")
	button.focus_mode = Control.FOCUS_NONE
	button.flat = false
	var ui_style: String = interaction.get("ui_style", "")
	button.modulate = Color(1, 1, 1, 1)
	button.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	button.clip_text = true
	button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	button.alignment = HORIZONTAL_ALIGNMENT_CENTER
	button.vertical_icon_alignment = VERTICAL_ALIGNMENT_CENTER
	if ui_style == "corner_back":
		button.flat = true
		button.modulate = Color(1, 1, 1, 1)
		button.add_theme_stylebox_override("normal", _build_hotspot_style(Color(0.12, 0.12, 0.14, 0.45), Color(0.96, 0.9, 0.78, 0.45), 16))
		button.add_theme_stylebox_override("hover", _build_hotspot_style(Color(0.2, 0.18, 0.15, 0.72), Color(1, 0.96, 0.84, 0.9), 16))
		button.add_theme_stylebox_override("pressed", _build_hotspot_style(Color(0.28, 0.22, 0.18, 0.82), Color(1, 0.96, 0.84, 1.0), 16))
		button.add_theme_stylebox_override("focus", _build_hotspot_style(Color(0.2, 0.18, 0.15, 0.72), Color(1, 0.96, 0.84, 0.9), 16))
		button.add_theme_font_size_override("font_size", 28)
		button.add_theme_color_override("font_color", Color(0.05, 0.05, 0.06, 0.98))
		button.add_theme_color_override("font_hover_color", Color(0.02, 0.02, 0.03, 1.0))
		button.add_theme_color_override("font_pressed_color", Color(0.0, 0.0, 0.0, 1.0))
		button.add_theme_color_override("font_focus_color", Color(0.02, 0.02, 0.03, 1.0))
	else:
		button.add_theme_stylebox_override("normal", _build_hotspot_style(Color(0.78, 0.2, 0.18, 0.24), Color(1, 0.9, 0.84, 0.5)))
		button.add_theme_stylebox_override("hover", _build_hotspot_style(Color(0.88, 0.28, 0.2, 0.34), Color(1, 0.96, 0.84, 0.82)))
		button.add_theme_stylebox_override("pressed", _build_hotspot_style(Color(0.96, 0.36, 0.22, 0.42), Color(1, 0.96, 0.84, 0.95)))
		button.add_theme_stylebox_override("focus", _build_hotspot_style(Color(0.88, 0.28, 0.2, 0.34), Color(1, 0.96, 0.84, 0.82)))
		button.add_theme_font_size_override("font_size", 14)
		button.add_theme_color_override("font_color", Color(1, 0.98, 0.92, 0.94))
		button.add_theme_color_override("font_hover_color", Color(1, 0.98, 0.92, 1.0))
		button.add_theme_color_override("font_pressed_color", Color(1, 0.98, 0.92, 1.0))
		button.add_theme_color_override("font_focus_color", Color(1, 0.98, 0.92, 1.0))
	button.pressed.connect(_on_interaction_requested.bind(interaction.get("id", "")))

	var parent_size := hotspot_layer.size
	if parent_size == Vector2.ZERO:
		parent_size = hotspot_layer.get_rect().size

	button.position = Vector2(hotspot_rect.position.x * parent_size.x, hotspot_rect.position.y * parent_size.y)
	button.size = Vector2(hotspot_rect.size.x * parent_size.x, hotspot_rect.size.y * parent_size.y)
	hotspot_layer.add_child(button)


func _rebuild_hotspots() -> void:
	for child: Node in hotspot_layer.get_children():
		child.queue_free()

	for interaction: Dictionary in SceneRouter.get_interactions(GameState.current_room_id):
		if not SceneRouter.is_interaction_available(interaction):
			continue
		_add_hotspot_button(interaction)


func _show_documents_overlay() -> void:
	_refresh_documents_list()
	documents_overlay.visible = true


func _hide_documents_overlay() -> void:
	documents_overlay.visible = false


func _show_objective_overlay() -> void:
	objective_value_label.text = GameState.objective_text
	objective_overlay.visible = true


func _hide_objective_overlay() -> void:
	objective_overlay.visible = false


func _refresh_documents_list() -> void:
	documents_list.clear()
	for document: Dictionary in GameState.unlocked_documents:
		documents_list.add_item(document.get("title", "Untitled"))

	if GameState.unlocked_documents.is_empty():
		selected_document_index = -1
		document_title_label.text = "No files yet"
		document_source_label.text = "Find notes and files in the world to read them here."
		document_text_label.text = ""
		return

	if selected_document_index < 0 or selected_document_index >= GameState.unlocked_documents.size():
		selected_document_index = GameState.unlocked_documents.size() - 1

	documents_list.select(selected_document_index)
	_show_document(selected_document_index)


func _on_document_selected(index: int) -> void:
	selected_document_index = index
	_show_document(index)


func _show_document(index: int) -> void:
	if index < 0 or index >= GameState.unlocked_documents.size():
		return

	var document: Dictionary = GameState.unlocked_documents[index]
	document_title_label.text = document.get("title", "Untitled")
	document_source_label.text = document.get("source", "")
	document_text_label.text = document.get("body", "")


func _build_hotspot_style(background_color: Color, border_color: Color, corner_radius: int = 8) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = background_color
	style.border_width_left = 1
	style.border_width_top = 1
	style.border_width_right = 1
	style.border_width_bottom = 1
	style.border_color = border_color
	style.corner_radius_top_left = corner_radius
	style.corner_radius_top_right = corner_radius
	style.corner_radius_bottom_right = corner_radius
	style.corner_radius_bottom_left = corner_radius
	style.content_margin_left = 8
	style.content_margin_top = 8
	style.content_margin_right = 8
	style.content_margin_bottom = 8
	return style
