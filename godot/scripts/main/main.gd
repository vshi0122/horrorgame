extends Control

const MENU_ENDING_TOTAL := 5
const MENU_DOCUMENT_TOTAL := 35
const MENU_ENDING_CATALOG := [
	{"id": "bad_ending", "order": "1/5", "name": "失陷", "teaser": "你在居民区停留得太久，最终没能活着离开。"},
	{"id": "failed_escape_ending", "order": "2/5", "name": "门外", "teaser": "你抵达了一楼，却没能以正确的方式离开。"},
	{"id": "normal_ending", "order": "3/5", "name": "离开", "teaser": "你活着逃出了公寓，但真相没有跟着你一起出去。"},
	{"id": "good_ending_question", "order": "4/5", "name": "醒来？", "teaser": "你抵达了最深的一层。至于这是醒来，还是陷得更深，还没有答案。"},
	{"id": "flee_ending", "order": "5/5", "name": "逃离", "teaser": "你选择没有进入那栋楼。"}
]
const MENU_CREDITS := [
	{"role": "Created By", "names": ["prophet"]},
	{"role": "Story", "names": ["prophet"]},
	{"role": "Art & Asset Integration", "names": ["prophet"]},
	{"role": "Programming", "names": ["prophet"]},
	{"role": "Playtesting", "names": ["lyl", "Matthew Sakitis"]},
	{"role": "Special Thanks", "names": ["Everyone who stepped into this nightmare."]}
]
const MENU_BACKDROP := preload("res://godot/asserts/images/parkinglot.jpg")
const JUMPSCARE_IMAGE := preload("res://godot/asserts/images/js.jpg")
const DISPLAY_FONT := preload("res://godot/asserts/font/Colorfiction - Messy.otf")
const ACCENT_FONT := preload("res://godot/asserts/font/Colorfiction - Messy.otf")
const ROOM_STAGE_REFERENCE_SIZE := Vector2(1120, 692)
const LEFT_RAIL_WIDTH := 220.0
const RIGHT_RAIL_WIDTH := 176.0
const RAIL_GAP := 26.0
const IN_SCENE_MENU_SIZE := Vector2(320, 42)
const IN_SCENE_MESSAGE_HEIGHT := 72.0
const SCREEN_MARGIN := Vector2(28, 18)
const FLASHLIGHT_ROOMS := [
	"back_stairwell",
	"fake_third",
	"smell_room",
	"third_floor_hall",
	"third_floor_residential",
	"third_floor_run",
	"escape_stairwell"
]

@onready var room_name_label: Label = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TitleColumn/RoomName
@onready var room_hint_bar: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame/RoomHintBar
@onready var room_hint_label: RichTextLabel = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame/RoomHintBar/RoomHintMargin/RoomHint
@onready var root_layout: VBoxContainer = $RootMargin/Layout
@onready var center_column: VBoxContainer = $RootMargin/Layout/CenterColumn
@onready var top_bar: PanelContainer = $RootMargin/Layout/CenterColumn/TopBar
@onready var title_column: VBoxContainer = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TitleColumn
@onready var top_actions: HBoxContainer = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions
@onready var room_viewport: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport
@onready var room_content: MarginContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent
@onready var room_stack: VBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack
@onready var room_visual_row: HBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow
@onready var room_visual: AspectRatioContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual
@onready var room_visual_frame: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame
@onready var room_visual_layer: Control = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame/RoomVisualLayer
@onready var background_texture: TextureRect = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame/RoomVisualLayer/BackgroundTexture
@onready var hotspot_layer: Control = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RoomVisual/RoomVisualFrame/RoomVisualLayer/HotspotLayer
@onready var interaction_list: VBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/InteractionList
@onready var message_panel: PanelContainer = $RootMargin/Layout/CenterColumn/MessagePanel
@onready var message_label: RichTextLabel = $RootMargin/Layout/CenterColumn/MessagePanel/MessageMargin/MessageValue
@onready var documents_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/DocumentsButton
@onready var objective_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/ObjectiveButton
@onready var right_rail: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail
@onready var hud_stack: VBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack
@onready var inventory_section: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/InventorySection
@onready var inventory_title_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/InventorySection/InventoryMargin/InventoryStack/InventoryHeader/InventoryTitle
@onready var inventory_notice_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/InventorySection/InventoryMargin/InventoryStack/InventoryHeader/InventoryNotice
@onready var inventory_list: ItemList = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/InventorySection/InventoryMargin/InventoryStack/InventoryValue
@onready var rail_documents_section: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection
@onready var rail_documents_title_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentsHeaderRail/DocumentsTitleRail
@onready var rail_documents_notice_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentsHeaderRail/DocumentsNotice
@onready var rail_documents_list: ItemList = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentsValueRail
@onready var rail_document_preview_panel: PanelContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentPreviewPanel
@onready var rail_document_title_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentPreviewPanel/DocumentPreviewMargin/DocumentPreviewStack/DocumentPreviewTitle
@onready var rail_document_source_label: Label = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentPreviewPanel/DocumentPreviewMargin/DocumentPreviewStack/DocumentPreviewSource
@onready var rail_document_body_label: RichTextLabel = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisualRow/RightRail/HUDMargin/HUDStack/DocumentsSection/DocumentsMarginRail/DocumentsStackRail/DocumentPreviewPanel/DocumentPreviewMargin/DocumentPreviewStack/DocumentPreviewBody
@onready var inspect_overlay: ColorRect = $InspectOverlay
@onready var inspect_title_label: Label = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectTitle
@onready var inspect_image: TextureRect = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectImageFrame/InspectImage
@onready var inspect_body_label: RichTextLabel = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectBody
@onready var inspect_sub_actions: VBoxContainer = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectSubActions
@onready var inspect_close_button: Button = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectActions/InspectCloseButton
@onready var inspect_confirm_button: Button = $InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectActions/InspectConfirmButton
@onready var code_overlay: ColorRect = $CodeOverlay
@onready var code_prompt_label: RichTextLabel = $CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodePrompt
@onready var code_input: LineEdit = $CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeInput
@onready var code_feedback_label: Label = $CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeFeedback
@onready var code_cancel_button: Button = $CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeActions/CodeCancelButton
@onready var code_confirm_button: Button = $CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeActions/CodeConfirmButton
@onready var blink_overlay: Control = $BlinkOverlay
@onready var blink_flash: ColorRect = $BlinkOverlay/Flash
@onready var documents_overlay: ColorRect = $DocumentsOverlay
@onready var documents_list: ItemList = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentsList
@onready var document_title_label: Label = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentTitle
@onready var document_source_label: Label = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentSource
@onready var document_text_label: RichTextLabel = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer/DocumentViewerMargin/DocumentViewerStack/DocumentText
@onready var documents_close_button: Button = $DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsHeader/DocumentsCloseButton
@onready var objective_overlay: ColorRect = $ObjectiveOverlay
@onready var objective_value_label: RichTextLabel = $ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveValue
@onready var objective_close_button: Button = $ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveHeader/ObjectiveCloseButton
@onready var gameplay_root: MarginContainer = $RootMargin
@onready var top_menu_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/MenuButton
@onready var top_restart_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/RestartButton

var selected_document_index: int = -1
var active_inspect_data: Dictionary = {}
var active_code_interaction_id: String = ""
var active_code_data: Dictionary = {}
var scene_keypad_input: String = ""
var hotspot_edit_mode: bool = false
var is_room_sequence_locked: bool = false
var hotspot_editor_overlay: Control
var hotspot_editor_panel: PanelContainer
var hotspot_editor_status_label: Label
var hotspot_editor_detail_label: RichTextLabel
var hotspot_editor_selected_target: Dictionary = {}
var hotspot_editor_drag_mode: String = ""
var hotspot_editor_drag_start_mouse: Vector2 = Vector2.ZERO
var hotspot_editor_drag_start_rect: Rect2 = Rect2()
var is_transitioning: bool = false
var ending_overlay: ColorRect
var ending_card: PanelContainer
var ending_name_label: Label
var ending_summary_label: RichTextLabel
var ending_order_value_label: Label
var ending_endings_value_label: Label
var ending_documents_value_label: Label
var ending_restart_button: Button
var ending_menu_button: Button
var pause_overlay: ColorRect
var pause_continue_button: Button
var pause_save_button: Button
var pause_main_menu_button: Button
var room_effect_overlay: Control
var room_blackout_cover: ColorRect
var room_flashlight_darkness: ColorRect
var room_flashlight_glow: TextureRect
var room_flashlight_material: ShaderMaterial
var jumpscare_overlay: Control
var jumpscare_flash: ColorRect
var jumpscare_image: TextureRect
var main_menu_overlay: ColorRect
var main_menu_content: VBoxContainer
var main_menu_title_label: Label
var main_menu_body_label: RichTextLabel
var main_menu_stats_label: Label
var main_menu_nav: HBoxContainer
var main_menu_scroll: ScrollContainer
var main_menu_body_stack: VBoxContainer
var main_menu_close_button: Button
var main_menu_shell: PanelContainer
var main_menu_home_panel: PanelContainer
var main_menu_home_actions: VBoxContainer
var main_menu_footer: HBoxContainer
var main_menu_endings_stat_value: Label
var main_menu_documents_stat_value: Label
var is_main_menu_open: bool = true
var current_menu_tab: String = "home"
var selected_menu_document_id: String = ""
var last_recorded_ending_room_id: String = ""
var has_started_run: bool = false
var inventory_notice_tween: Tween
var documents_notice_tween: Tween
var inventory_highlight_tween: Tween
var documents_highlight_tween: Tween
var fixed_game_layer: Control
var left_documents_rail: PanelContainer
var message_popup_tween: Tween


func _ready() -> void:
	GameState.room_changed.connect(_refresh_room)
	GameState.hud_changed.connect(_refresh_hud)
	hotspot_layer.resized.connect(_rebuild_hotspots)
	set_process(true)
	top_menu_button.pressed.connect(_show_main_menu_home)
	top_restart_button.pressed.connect(_restart_from_topbar)
	documents_button.pressed.connect(_show_documents_overlay)
	objective_button.pressed.connect(_show_objective_overlay)
	documents_close_button.pressed.connect(_hide_documents_overlay)
	objective_close_button.pressed.connect(_hide_objective_overlay)
	documents_list.item_selected.connect(_on_document_selected)
	inventory_list.allow_reselect = true
	inventory_list.item_clicked.connect(_on_inventory_item_clicked)
	rail_documents_list.allow_reselect = true
	rail_documents_list.item_selected.connect(_on_rail_document_selected)
	inspect_close_button.pressed.connect(_hide_inspect_overlay)
	inspect_confirm_button.pressed.connect(_on_inspect_confirm_pressed)
	code_cancel_button.pressed.connect(_hide_code_overlay)
	code_confirm_button.pressed.connect(_submit_code_input)
	code_input.text_submitted.connect(_on_code_text_submitted)
	
	# Start BGM
	SoundManager.play_bgm()
	_sync_scene_ambient(GameState.current_room_id)
	_apply_rust_lake_layout()
	_build_web_ui_overlays()
	_apply_web_ui_theme()
	_apply_static_translations()
	_refresh_room(GameState.current_room_id)
	_refresh_hud()
	_show_main_menu_home()


func _process(_delta: float) -> void:
	_sync_fixed_game_layout()
	_update_flashlight_position()


func _apply_rust_lake_layout() -> void:
	gameplay_root.offset_left = 0
	gameplay_root.offset_top = 0
	gameplay_root.offset_right = 0
	gameplay_root.offset_bottom = 0
	root_layout.add_theme_constant_override("separation", 0)
	center_column.add_theme_constant_override("separation", 0)
	room_stack.add_theme_constant_override("separation", 0)
	room_visual_row.add_theme_constant_override("separation", 26)
	center_column.alignment = BoxContainer.ALIGNMENT_CENTER
	room_stack.alignment = BoxContainer.ALIGNMENT_CENTER
	room_visual_row.alignment = BoxContainer.ALIGNMENT_CENTER
	room_viewport.size_flags_vertical = Control.SIZE_EXPAND_FILL
	room_content.add_theme_constant_override("margin_left", 0)
	room_content.add_theme_constant_override("margin_top", 0)
	room_content.add_theme_constant_override("margin_right", 0)
	room_content.add_theme_constant_override("margin_bottom", 0)

	fixed_game_layer = _ensure_fixed_game_layer()
	title_column.visible = false
	documents_button.visible = false
	top_actions.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	top_actions.alignment = BoxContainer.ALIGNMENT_END
	room_hint_bar.visible = false
	message_label.scroll_active = false

	var left_rail: PanelContainer = _ensure_left_documents_rail()
	if rail_documents_section.get_parent() != left_rail:
		rail_documents_section.reparent(left_rail, false)

	if top_bar.get_parent() != fixed_game_layer:
		top_bar.reparent(fixed_game_layer, false)
	if left_rail.get_parent() != fixed_game_layer:
		left_rail.reparent(fixed_game_layer, false)
	if room_visual.get_parent() != fixed_game_layer:
		room_visual.reparent(fixed_game_layer, false)
	if right_rail.get_parent() != fixed_game_layer:
		right_rail.reparent(fixed_game_layer, false)
	if message_panel.get_parent() != fixed_game_layer:
		message_panel.reparent(fixed_game_layer, false)

	root_layout.visible = false
	top_bar.visible = true
	left_rail.visible = true
	room_visual.visible = true
	right_rail.visible = true
	message_panel.visible = false
	message_panel.modulate = Color(1, 1, 1, 0)

	room_visual.ratio = ROOM_STAGE_REFERENCE_SIZE.x / ROOM_STAGE_REFERENCE_SIZE.y
	room_visual.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	room_visual.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	rail_documents_section.size_flags_vertical = Control.SIZE_EXPAND_FILL
	rail_documents_section.size_flags_horizontal = Control.SIZE_FILL
	inventory_section.size_flags_horizontal = Control.SIZE_FILL
	inventory_section.size_flags_vertical = Control.SIZE_SHRINK_BEGIN
	inventory_list.custom_minimum_size = Vector2(0, 360)
	rail_documents_list.custom_minimum_size = Vector2(0, 210)
	rail_document_preview_panel.custom_minimum_size = Vector2(0, 260)
	_stabilize_side_rail_text()
	_sync_fixed_game_layout()


func _sync_fixed_game_layout() -> void:
	if fixed_game_layer == null:
		return
	var viewport_size: Vector2 = get_viewport_rect().size
	var ratio: float = ROOM_STAGE_REFERENCE_SIZE.x / ROOM_STAGE_REFERENCE_SIZE.y
	var available_width: float = maxf(640.0, viewport_size.x - SCREEN_MARGIN.x * 2.0 - LEFT_RAIL_WIDTH - RIGHT_RAIL_WIDTH - RAIL_GAP * 2.0)
	var available_height: float = maxf(420.0, viewport_size.y - SCREEN_MARGIN.y * 2.0)
	var stage_height: float = minf(available_height, available_width / ratio)
	var stage_width: float = stage_height * ratio
	var stage_size: Vector2 = Vector2(floorf(stage_width), floorf(stage_height))
	var total_width: float = LEFT_RAIL_WIDTH + RAIL_GAP + stage_size.x + RAIL_GAP + RIGHT_RAIL_WIDTH
	var total_height: float = stage_size.y
	var origin: Vector2 = Vector2(
		floorf((viewport_size.x - total_width) * 0.5),
		floorf((viewport_size.y - total_height) * 0.5)
	)
	var stage_y: float = origin.y
	var stage_x: float = origin.x + LEFT_RAIL_WIDTH + RAIL_GAP
	var left_rail: PanelContainer = _ensure_left_documents_rail()

	_pin_control(top_bar, Vector2(stage_x + stage_size.x - IN_SCENE_MENU_SIZE.x - 18.0, stage_y + 14.0), IN_SCENE_MENU_SIZE)
	_pin_control(left_rail, Vector2(origin.x, stage_y), Vector2(LEFT_RAIL_WIDTH, stage_size.y))
	_pin_control(room_visual, Vector2(stage_x, stage_y), stage_size)
	_pin_control(right_rail, Vector2(stage_x + stage_size.x + RAIL_GAP, stage_y), Vector2(RIGHT_RAIL_WIDTH, stage_size.y))
	_pin_control(message_panel, Vector2(stage_x + 28.0, stage_y + stage_size.y - IN_SCENE_MESSAGE_HEIGHT - 24.0), Vector2(stage_size.x - 56.0, IN_SCENE_MESSAGE_HEIGHT))


func _pin_control(control: Control, target_position: Vector2, target_size: Vector2) -> void:
	control.set_anchors_preset(Control.PRESET_TOP_LEFT)
	control.position = target_position
	control.size = target_size
	control.custom_minimum_size = target_size


func _ensure_fixed_game_layer() -> Control:
	var existing_layer: Node = gameplay_root.get_node_or_null("FixedGameLayer")
	if existing_layer is Control:
		return existing_layer as Control

	var layer := Control.new()
	layer.name = "FixedGameLayer"
	layer.set_anchors_preset(Control.PRESET_FULL_RECT)
	layer.mouse_filter = Control.MOUSE_FILTER_PASS
	gameplay_root.add_child(layer)
	return layer


func _ensure_left_documents_rail() -> PanelContainer:
	if left_documents_rail != null and is_instance_valid(left_documents_rail):
		return left_documents_rail

	if fixed_game_layer != null:
		var existing_fixed_rail: Node = fixed_game_layer.get_node_or_null("LeftDocumentsRail")
		if existing_fixed_rail is PanelContainer:
			left_documents_rail = existing_fixed_rail as PanelContainer
			return left_documents_rail

	var existing_left_rail: Node = room_visual_row.get_node_or_null("LeftDocumentsRail")
	if existing_left_rail is PanelContainer:
		left_documents_rail = existing_left_rail as PanelContainer
		return left_documents_rail

	var left_rail := PanelContainer.new()
	left_rail.name = "LeftDocumentsRail"
	left_rail.mouse_filter = Control.MOUSE_FILTER_PASS
	room_visual_row.add_child(left_rail)
	room_visual_row.move_child(left_rail, 0)
	left_documents_rail = left_rail
	return left_documents_rail


func _stabilize_side_rail_text() -> void:
	inventory_notice_label.visible = false
	inventory_notice_label.text = ""
	inventory_notice_label.custom_minimum_size = Vector2.ZERO
	rail_documents_notice_label.visible = false
	rail_documents_notice_label.text = ""
	rail_documents_notice_label.custom_minimum_size = Vector2.ZERO
	inventory_title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	rail_documents_title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	inventory_list.max_columns = 1
	rail_documents_list.max_columns = 1


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo:
		if event.keycode == KEY_ESCAPE:
			_toggle_pause_menu()
			get_viewport().set_input_as_handled()
			return
		if event.keycode == KEY_F2:
			_toggle_hotspot_edit_mode()
			get_viewport().set_input_as_handled()
			return
		if hotspot_edit_mode and event.ctrl_pressed and event.keycode == KEY_C:
			_copy_selected_hotspot_rect()
			get_viewport().set_input_as_handled()
			return


func _text(data: Dictionary, field: String, fallback: String = "") -> String:
	return I18n.text_from(data, field, fallback)


func _document_text(data: Dictionary, field: String, fallback: String = "") -> String:
	return I18n.text_from(data, field, fallback)


func _apply_static_translations() -> void:
	var title_label := title_column.get_node("Title") as Label
	title_label.text = I18n.t("game.title")
	top_menu_button.text = I18n.t("ui.top.menu")
	top_restart_button.text = I18n.t("ui.top.restart")
	objective_button.text = I18n.t("ui.top.goal")
	documents_button.text = I18n.t("ui.top.files")
	inventory_title_label.text = I18n.t("ui.inventory.title")
	rail_documents_title_label.text = I18n.t("ui.documents.title")
	inventory_notice_label.text = " "
	rail_documents_notice_label.text = " "
	inventory_notice_label.modulate = Color(1, 1, 1, 0)
	rail_documents_notice_label.modulate = Color(1, 1, 1, 0)
	$DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsHeader/DocumentsTitle.text = I18n.t("ui.documents.title")
	documents_close_button.text = I18n.t("ui.menu.close")
	$ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveHeader/ObjectiveTitle.text = I18n.t("ui.objective.title")
	objective_close_button.text = I18n.t("ui.menu.close")
	inspect_close_button.text = I18n.t("ui.inspect.close")
	inspect_confirm_button.text = I18n.t("ui.inspect.continue")
	$CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeTitle.text = I18n.t("ui.code.title")
	code_cancel_button.text = I18n.t("ui.code.cancel")
	code_confirm_button.text = I18n.t("ui.code.confirm")
	_set_rail_document_empty_state()


func _refresh_room(room_id: String) -> void:
	var room: Dictionary = SceneRouter.get_room(room_id)
	if room_id == "hallway_normal":
		_end_flashlight_sequence()
	if ["third_floor_hall", "third_floor_residential"].has(room_id):
		GameState.flags["stairwell_photo_footsteps_active"] = false
	room_name_label.text = _text(room, "title", I18n.t("ui.room.unknown"))
	room_hint_label.text = _text(room, "hint", "")
	_apply_background(_resolve_background_path(room_id, room))
	_track_ending_unlock(room_id, room)
	_sync_scene_ambient(room_id)
	_update_room_effects(room_id)
	
	# Handle special room entries
	if room_id == "monsterCaughtIntro":
		_play_feedback_sound("roar", 0.82)
		await get_tree().create_timer(3.0).timeout
		GameState.set_room("badEnding")
		return
	elif room_id == "failedEscapeIntro":
		_play_feedback_sound("ending2", 0.82)
		await get_tree().create_timer(3.0).timeout
		GameState.set_room("failedEscapeEnding")
		return

	for child: Node in interaction_list.get_children():
		child.queue_free()

	if _has_scene_keypad(room):
		var keypad_interaction := _get_scene_keypad_interaction(room)
		if not keypad_interaction.is_empty():
			active_code_interaction_id = String(keypad_interaction.get("id", ""))
			active_code_data = keypad_interaction.get("code_input", {})
			scene_keypad_input = ""

	for interaction: Dictionary in SceneRouter.get_interactions(room_id):
		if not SceneRouter.is_interaction_available(interaction):
			continue
		var button := Button.new()
		button.text = _text(interaction, "label", I18n.t("ui.interaction.default"))
		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		button.focus_mode = Control.FOCUS_NONE
		button.pressed.connect(_on_interaction_requested.bind(interaction.get("id", "")))
		interaction_list.add_child(button)

	_rebuild_hotspots()
	_refresh_ending_overlay(room)
	if room_id == "fake_third":
		await _maybe_play_fake_third_blackout_intro()


func _end_flashlight_sequence() -> void:
	GameState.flags["third_floor_flashlight_enabled"] = false


func _refresh_hud() -> void:
	message_label.text = GameState.message_text
	objective_value_label.text = GameState.objective_text
	_refresh_inventory_list()
	_refresh_documents_list()
	if ending_overlay != null and ending_overlay.visible:
		ending_documents_value_label.text = I18n.t("ui.files.count_short", {"count": GameState.unlocked_documents.size()})
	if is_main_menu_open and main_menu_overlay != null and main_menu_overlay.visible:
		_refresh_main_menu_view()


func _refresh_hud_with_message(duration: float = 3.2) -> void:
	_refresh_hud()
	_show_message_popup(duration)


func _show_message_popup(duration: float = 3.2) -> void:
	if GameState.message_text.strip_edges() == "":
		_hide_message_popup()
		return
	if message_popup_tween != null:
		message_popup_tween.kill()

	message_panel.visible = true
	message_panel.modulate = Color(1, 1, 1, 0)
	message_popup_tween = create_tween()
	message_popup_tween.tween_property(message_panel, "modulate", Color(1, 1, 1, 1), 0.12)
	message_popup_tween.tween_interval(duration)
	message_popup_tween.tween_property(message_panel, "modulate", Color(1, 1, 1, 0), 0.28)
	message_popup_tween.finished.connect(func() -> void:
		message_panel.visible = false
	)


func _hide_message_popup() -> void:
	if message_popup_tween != null:
		message_popup_tween.kill()
	message_panel.visible = false
	message_panel.modulate = Color(1, 1, 1, 0)


func _on_interaction_requested(interaction_id: String) -> void:
	_on_interaction_pressed(interaction_id)


func _on_interaction_pressed(interaction_id: String) -> void:
	if is_main_menu_open:
		return
	if is_transitioning:
		return
	if is_room_sequence_locked:
		return

	var interaction: Dictionary = SceneRouter.get_interaction(GameState.current_room_id, interaction_id)
	if interaction.is_empty():
		return
	if not SceneRouter.is_interaction_ready(interaction):
		GameState.set_message(SceneRouter.get_interaction_block_message(interaction))
		_refresh_hud_with_message()
		return

	if GameState.current_room_id == "back_stairwell" and interaction_id == "photo":
		await _handle_back_stairwell_photo(interaction)
		return
	if GameState.current_room_id == "back_stairwell" and interaction_id == "to-3f":
		await _handle_back_stairwell_to_third_floor(interaction)
		return

	var inspect_data: Dictionary = interaction.get("inspect", {})
	if not inspect_data.is_empty():
		SceneRouter.apply_interaction(interaction_id)
		_refresh_room(GameState.current_room_id)
		_refresh_hud_with_message()
		_show_inspect_overlay(inspect_data)
		return

	var code_input_data: Dictionary = interaction.get("code_input", {})
	if not code_input_data.is_empty():
		active_code_interaction_id = interaction_id
		active_code_data = code_input_data
		GameState.set_message(_text(interaction, "message", GameState.message_text))
		_refresh_hud_with_message()
		_show_code_overlay(code_input_data)
		return

	var inventory_before := _capture_inventory_ids()
	var document_ids_before := _capture_document_ids()

	if interaction.get("goto_room", "") != "":
		var transition_audio: String = String(interaction.get("transition_sound", "footstep"))
		await _play_blink_transition(func():
			SceneRouter.apply_interaction(interaction_id)
			_refresh_room(GameState.current_room_id)
			_play_scene_transition_sound(transition_audio)
		)

	
	else:
		SceneRouter.apply_interaction(interaction_id)
		GameState.set_message(_text(interaction, "message", ""))
		_refresh_room(GameState.current_room_id)
	

	_refresh_hud_with_message()
	var new_items := _collect_new_entries(inventory_before, _capture_inventory_ids())
	var new_documents := _collect_new_entries(document_ids_before, _capture_document_ids())
	var gained_new_document := not new_documents.is_empty()
	
	# Play UI sounds based on interaction
	var sound_kind: String = String(interaction.get("sound", ""))
	if sound_kind == "doc":
		if gained_new_document:
			_play_ui_sound(sound_kind)
	elif sound_kind != "":
		_play_ui_sound(sound_kind)
	
	# Legacy hardcoded sounds
	if interaction_id == "mailbox" and gained_new_document:
		_play_ui_sound("doc")

	_announce_rail_updates(new_items, new_documents)


func _sync_scene_ambient(room_id: String) -> void:
	SoundManager.sync_scene_ambient(room_id)

func _play_ui_sound(kind: String) -> void:
	SoundManager.play_ui_sound(kind)

func _play_feedback_sound(audio_key: String, volume: float = 0.42, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	await SoundManager.play_feedback_sound(audio_key, volume, wait_for_completion, wait_ms)

func _play_scene_transition_sound(audio_key: String = "footstep", volume: float = 0.38, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	await SoundManager.play_scene_transition_sound(audio_key, volume, wait_for_completion, wait_ms)


func _handle_back_stairwell_to_third_floor(interaction: Dictionary) -> void:
	var should_skip_fake_third := bool(GameState.flags.get("first_fake_third_floor_seen", false))
	var target_room: String = "third_floor_hall" if should_skip_fake_third else String(interaction.get("goto_room", "fake_third"))
	var transition_audio: String = String(interaction.get("transition_sound", "footstep"))
	await _play_blink_transition(func():
		GameState.set_objective(_text(interaction, "objective", GameState.objective_text))
		GameState.set_message(_text(interaction, "message", GameState.message_text))
		GameState.set_room(target_room)
		_refresh_room(GameState.current_room_id)
		_play_scene_transition_sound(transition_audio)
	)
	_refresh_hud_with_message()


func _handle_back_stairwell_photo(_interaction: Dictionary) -> void:
	var inventory_before := _capture_inventory_ids()
	var document_ids_before := _capture_document_ids()
	SceneRouter.apply_interaction("photo")
	var new_items := _collect_new_entries(inventory_before, _capture_inventory_ids())
	var new_documents := _collect_new_entries(document_ids_before, _capture_document_ids())
	var gained_new_document := not new_documents.is_empty()
	if gained_new_document:
		_play_ui_sound("doc")

	var should_play_jumpscare := not bool(GameState.flags.get("stairwell_photo_jumpscare_played", false))
	GameState.flags["stairwell_photo_footsteps_active"] = true
	if should_play_jumpscare:
		GameState.flags["stairwell_photo_jumpscare_played"] = true
		GameState.flags["stairwell_photo_reaction_pending"] = true
		await _play_photo_jumpscare()

	GameState.flags["stairwell_photo_reaction_pending"] = false
	GameState.set_message("刚才那是什么……？照片里那张被涂黑的脸，好像动了一下。")
	_refresh_room(GameState.current_room_id)
	_refresh_hud_with_message()
	_announce_rail_updates(new_items, new_documents)


func _play_photo_jumpscare() -> void:
	if jumpscare_overlay == null:
		return

	is_room_sequence_locked = true
	jumpscare_overlay.visible = true
	jumpscare_image.texture = JUMPSCARE_IMAGE
	jumpscare_image.modulate = Color(1, 1, 1, 0)
	jumpscare_flash.color = Color(1, 1, 1, 0)

	await get_tree().create_timer(0.22).timeout
	_play_feedback_sound("jumpscare", 0.95)

	var image_in_tween := create_tween()
	image_in_tween.set_trans(Tween.TRANS_SINE)
	image_in_tween.set_ease(Tween.EASE_OUT)
	image_in_tween.tween_property(jumpscare_image, "modulate", Color(1, 1, 1, 1), 0.05)
	await image_in_tween.finished

	for _index in range(2):
		jumpscare_flash.color = Color(1, 1, 1, 0)
		var flash_tween := create_tween()
		flash_tween.tween_property(jumpscare_flash, "color", Color(1, 1, 1, 0.92), 0.06)
		flash_tween.tween_property(jumpscare_flash, "color", Color(1, 1, 1, 0), 0.10)
		await flash_tween.finished
		await get_tree().create_timer(0.08).timeout

	await get_tree().create_timer(0.12).timeout
	jumpscare_overlay.visible = false
	is_room_sequence_locked = false


func _maybe_play_fake_third_blackout_intro() -> void:
	var intro_already_played := bool(GameState.flags.get("third_floor_blackout_intro_played", false))
	var flashlight_enabled := bool(GameState.flags.get("third_floor_flashlight_enabled", false))
	var photo_route_active := bool(GameState.flags.get("stairwell_photo_jumpscare_played", false))
	if intro_already_played or flashlight_enabled or not photo_route_active:
		_update_room_effects(GameState.current_room_id)
		return

	is_room_sequence_locked = true
	GameState.flags["third_floor_blackout_intro_played"] = true
	GameState.flags["first_fake_third_floor_seen"] = true
	GameState.flags["third_floor_flashlight_enabled"] = false
	_update_room_effects("fake_third")
	_play_feedback_sound("cry", 0.92)
	GameState.set_message("")
	_refresh_hud()
	_hide_message_popup()

	await get_tree().create_timer(0.9).timeout
	GameState.set_message("The whole building suddenly loses power. A baby is crying somewhere in the dark, so you switch on your phone flashlight.")
	_refresh_hud_with_message(4.2)

	await get_tree().create_timer(0.9).timeout
	GameState.flags["third_floor_flashlight_enabled"] = true
	is_room_sequence_locked = false
	_update_room_effects(GameState.current_room_id)
	_refresh_hud_with_message(2.8)


func _update_room_effects(room_id: String) -> void:
	if room_effect_overlay == null:
		return

	var flashlight_enabled := bool(GameState.flags.get("third_floor_flashlight_enabled", false))
	var show_blackout_cover := room_id == "fake_third" and not flashlight_enabled and bool(GameState.flags.get("third_floor_blackout_intro_played", false))
	var show_flashlight := flashlight_enabled and FLASHLIGHT_ROOMS.has(room_id)

	room_effect_overlay.visible = show_blackout_cover or show_flashlight
	room_blackout_cover.visible = show_blackout_cover
	room_flashlight_darkness.visible = show_flashlight
	room_flashlight_glow.visible = false
	if show_flashlight:
		_update_flashlight_position()


func _update_flashlight_position() -> void:
	if room_effect_overlay == null or room_flashlight_material == null:
		return
	if not room_flashlight_darkness.visible:
		return

	var overlay_size := room_visual_layer.size
	if overlay_size == Vector2.ZERO:
		return

	var local_mouse := room_visual_layer.get_local_mouse_position()
	local_mouse.x = clampf(local_mouse.x, 0.0, overlay_size.x)
	local_mouse.y = clampf(local_mouse.y, 0.0, overlay_size.y)

	var normalized := Vector2(
		local_mouse.x / overlay_size.x,
		local_mouse.y / overlay_size.y
	)
	room_flashlight_material.set_shader_parameter("light_pos", normalized)
	room_flashlight_glow.position = local_mouse - (room_flashlight_glow.size * 0.5)

func _apply_background(texture_path: String) -> void:
	if texture_path == "":
		background_texture.texture = null
		return
	background_texture.texture = load(texture_path)


func _resolve_background_path(room_id: String, room: Dictionary) -> String:
	if room_id == "mailbox_closeup":
		if bool(GameState.flags.get("mailbox_opened", false)):
			return "res://godot/asserts/images/letterbox open.png"
		return String(room.get("background", ""))

	if room_id == "trunk_closeup":
		var letter_taken := bool(GameState.flags.get("trunk_letter_taken", false))
		var ketchup_taken := bool(GameState.flags.get("trunk_ketchup_taken", false))
		if letter_taken and ketchup_taken:
			return "res://godot/asserts/images/truck 3.jpg"
		if letter_taken:
			return "res://godot/asserts/images/truck 1.jpg"
		if ketchup_taken:
			return "res://godot/asserts/images/truck 2.jpg"
		return "res://godot/asserts/images/truck.jpg"

	return String(room.get("background", ""))

func _build_web_ui_overlays() -> void:
	var grain_overlay := ColorRect.new()
	grain_overlay.name = "GrainOverlay"
	grain_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	grain_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	grain_overlay.color = Color(1, 1, 1, 0.03)
	add_child(grain_overlay)
	move_child(grain_overlay, 1)

	room_effect_overlay = Control.new()
	room_effect_overlay.name = "RoomEffectOverlay"
	room_effect_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	room_effect_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	room_effect_overlay.visible = false
	room_visual_layer.add_child(room_effect_overlay)

	room_blackout_cover = ColorRect.new()
	room_blackout_cover.name = "BlackoutCover"
	room_blackout_cover.set_anchors_preset(Control.PRESET_FULL_RECT)
	room_blackout_cover.mouse_filter = Control.MOUSE_FILTER_IGNORE
	room_blackout_cover.color = Color(0, 0, 0, 0.96)
	room_effect_overlay.add_child(room_blackout_cover)

	room_flashlight_darkness = ColorRect.new()
	room_flashlight_darkness.name = "FlashlightDarkness"
	room_flashlight_darkness.set_anchors_preset(Control.PRESET_FULL_RECT)
	room_flashlight_darkness.mouse_filter = Control.MOUSE_FILTER_IGNORE
	room_flashlight_darkness.color = Color(0, 0, 0, 0.76)
	var flashlight_shader := Shader.new()
	flashlight_shader.code = """
shader_type canvas_item;

uniform vec2 light_pos = vec2(0.5, 0.5);
uniform float radius = 0.18;
uniform float softness = 0.12;
uniform float darkness_alpha = 0.92;

void fragment() {
	float dist = distance(UV, light_pos);
	float alpha = smoothstep(radius, radius + softness, dist) * darkness_alpha;
	COLOR = vec4(0.0, 0.0, 0.0, alpha);
}
"""
	room_flashlight_material = ShaderMaterial.new()
	room_flashlight_material.shader = flashlight_shader
	room_flashlight_darkness.material = room_flashlight_material
	room_effect_overlay.add_child(room_flashlight_darkness)

	var flashlight_gradient := Gradient.new()
	flashlight_gradient.colors = PackedColorArray([
		Color(1, 1, 1, 0.96),
		Color(1, 1, 1, 0.34),
		Color(1, 1, 1, 0.0)
	])
	flashlight_gradient.offsets = PackedFloat32Array([0.0, 0.42, 1.0])

	var flashlight_texture := GradientTexture2D.new()
	flashlight_texture.width = 1024
	flashlight_texture.height = 1024
	flashlight_texture.fill = GradientTexture2D.FILL_RADIAL
	flashlight_texture.gradient = flashlight_gradient

	room_flashlight_glow = TextureRect.new()
	room_flashlight_glow.name = "FlashlightGlow"
	room_flashlight_glow.texture = flashlight_texture
	room_flashlight_glow.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	room_flashlight_glow.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	room_flashlight_glow.mouse_filter = Control.MOUSE_FILTER_IGNORE
	room_flashlight_glow.custom_minimum_size = Vector2(520, 520)
	room_flashlight_glow.size = Vector2(520, 520)
	room_flashlight_glow.modulate = Color(0.92, 0.97, 1.0, 0.16)
	room_effect_overlay.add_child(room_flashlight_glow)

	jumpscare_overlay = Control.new()
	jumpscare_overlay.name = "JumpscareOverlay"
	jumpscare_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	jumpscare_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	jumpscare_overlay.visible = false
	add_child(jumpscare_overlay)
	move_child(jumpscare_overlay, get_child_count() - 1)

	jumpscare_image = TextureRect.new()
	jumpscare_image.name = "Image"
	jumpscare_image.set_anchors_preset(Control.PRESET_FULL_RECT)
	jumpscare_image.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	jumpscare_image.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
	jumpscare_image.mouse_filter = Control.MOUSE_FILTER_IGNORE
	jumpscare_overlay.add_child(jumpscare_image)

	jumpscare_flash = ColorRect.new()
	jumpscare_flash.name = "Flash"
	jumpscare_flash.set_anchors_preset(Control.PRESET_FULL_RECT)
	jumpscare_flash.mouse_filter = Control.MOUSE_FILTER_IGNORE
	jumpscare_flash.color = Color(1, 1, 1, 0)
	jumpscare_overlay.add_child(jumpscare_flash)

	ending_overlay = ColorRect.new()
	ending_overlay.name = "EndingOverlay"
	ending_overlay.visible = false
	ending_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	ending_overlay.color = Color(0.02, 0.025, 0.035, 0.42)
	ending_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(ending_overlay)
	move_child(ending_overlay, get_child_count() - 1)

	var ending_center := CenterContainer.new()
	ending_center.set_anchors_preset(Control.PRESET_FULL_RECT)
	ending_overlay.add_child(ending_center)

	ending_card = PanelContainer.new()
	ending_card.custom_minimum_size = Vector2(500, 0)
	ending_center.add_child(ending_card)

	var ending_margin := MarginContainer.new()
	ending_margin.add_theme_constant_override("margin_left", 24)
	ending_margin.add_theme_constant_override("margin_top", 24)
	ending_margin.add_theme_constant_override("margin_right", 24)
	ending_margin.add_theme_constant_override("margin_bottom", 24)
	ending_card.add_child(ending_margin)

	var ending_stack := VBoxContainer.new()
	ending_stack.add_theme_constant_override("separation", 14)
	ending_margin.add_child(ending_stack)

	var kicker := Label.new()
	kicker.text = "ENDING"
	kicker.add_theme_font_override("font", ACCENT_FONT)
	kicker.add_theme_font_size_override("font_size", 12)
	kicker.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	ending_stack.add_child(kicker)

	ending_name_label = Label.new()
	ending_name_label.text = "Ending"
	ending_name_label.add_theme_font_size_override("font_size", 34)
	ending_name_label.add_theme_color_override("font_color", Color(0.95, 0.95, 0.94, 1))
	ending_stack.add_child(ending_name_label)

	ending_summary_label = RichTextLabel.new()
	ending_summary_label.bbcode_enabled = true
	ending_summary_label.fit_content = true
	ending_summary_label.scroll_active = false
	ending_summary_label.text = ""
	ending_summary_label.add_theme_color_override("default_color", Color(0.93, 0.94, 0.96, 0.92))
	ending_stack.add_child(ending_summary_label)

	var stats := HBoxContainer.new()
	stats.add_theme_constant_override("separation", 12)
	ending_stack.add_child(stats)

	var stat1 := _build_ending_stat("Current Ending")
	ending_order_value_label = stat1.get_node("Margin/Stack/Value") as Label
	stats.add_child(stat1)

	var stat2 := _build_ending_stat("Unlocked Endings")
	ending_endings_value_label = stat2.get_node("Margin/Stack/Value") as Label
	stats.add_child(stat2)

	var stat3 := _build_ending_stat(I18n.t("ui.ending.documents"))
	ending_documents_value_label = stat3.get_node("Margin/Stack/Value") as Label
	stats.add_child(stat3)

	var ending_actions := HBoxContainer.new()
	ending_actions.add_theme_constant_override("separation", 10)
	ending_stack.add_child(ending_actions)

	ending_restart_button = Button.new()
	ending_restart_button.text = "再次醒来"
	ending_restart_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	ending_restart_button.custom_minimum_size = Vector2(0, 48)
	ending_restart_button.pressed.connect(_restart_from_ending)
	ending_actions.add_child(ending_restart_button)

	ending_menu_button = Button.new()
	ending_menu_button.text = "回主界面"
	ending_menu_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	ending_menu_button.custom_minimum_size = Vector2(0, 48)
	ending_menu_button.pressed.connect(_show_main_menu_home)
	ending_actions.add_child(ending_menu_button)

	pause_overlay = ColorRect.new()
	pause_overlay.name = "PauseOverlay"
	pause_overlay.visible = false
	pause_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	pause_overlay.color = Color(0, 0, 0, 0.54)
	pause_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(pause_overlay)
	move_child(pause_overlay, get_child_count() - 1)

	var pause_center := CenterContainer.new()
	pause_center.set_anchors_preset(Control.PRESET_FULL_RECT)
	pause_overlay.add_child(pause_center)

	var pause_card := PanelContainer.new()
	pause_card.custom_minimum_size = Vector2(360, 0)
	pause_center.add_child(pause_card)

	var pause_margin := MarginContainer.new()
	pause_margin.add_theme_constant_override("margin_left", 24)
	pause_margin.add_theme_constant_override("margin_top", 22)
	pause_margin.add_theme_constant_override("margin_right", 24)
	pause_margin.add_theme_constant_override("margin_bottom", 22)
	pause_card.add_child(pause_margin)

	var pause_stack := VBoxContainer.new()
	pause_stack.add_theme_constant_override("separation", 12)
	pause_margin.add_child(pause_stack)

	var pause_title := Label.new()
	pause_title.text = "PAUSED"
	pause_title.add_theme_font_override("font", ACCENT_FONT)
	pause_title.add_theme_font_size_override("font_size", 28)
	pause_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	pause_stack.add_child(pause_title)

	pause_continue_button = Button.new()
	pause_continue_button.text = "继续"
	pause_continue_button.custom_minimum_size = Vector2(0, 48)
	pause_continue_button.pressed.connect(_hide_pause_menu)
	pause_stack.add_child(pause_continue_button)

	pause_save_button = Button.new()
	pause_save_button.text = "保存"
	pause_save_button.custom_minimum_size = Vector2(0, 48)
	pause_save_button.pressed.connect(_save_from_pause_menu)
	pause_stack.add_child(pause_save_button)

	pause_main_menu_button = Button.new()
	pause_main_menu_button.text = "主菜单"
	pause_main_menu_button.custom_minimum_size = Vector2(0, 48)
	pause_main_menu_button.pressed.connect(_return_to_main_menu_from_pause)
	pause_stack.add_child(pause_main_menu_button)

	main_menu_overlay = ColorRect.new()
	main_menu_overlay.name = "MainMenuOverlay"
	main_menu_overlay.visible = false
	main_menu_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	main_menu_overlay.color = Color(0.01, 0.015, 0.02, 1.0)
	add_child(main_menu_overlay)
	move_child(main_menu_overlay, get_child_count() - 1)

	var menu_backdrop := TextureRect.new()
	menu_backdrop.name = "Backdrop"
	menu_backdrop.set_anchors_preset(Control.PRESET_FULL_RECT)
	menu_backdrop.texture = MENU_BACKDROP
	menu_backdrop.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	menu_backdrop.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
	main_menu_overlay.add_child(menu_backdrop)

	var menu_scrim := ColorRect.new()
	menu_scrim.name = "Scrim"
	menu_scrim.set_anchors_preset(Control.PRESET_FULL_RECT)
	menu_scrim.color = Color(0.02, 0.025, 0.035, 0.72)
	main_menu_overlay.add_child(menu_scrim)

	var menu_margin := MarginContainer.new()
	menu_margin.set_anchors_preset(Control.PRESET_FULL_RECT)
	menu_margin.add_theme_constant_override("margin_left", 28)
	menu_margin.add_theme_constant_override("margin_top", 28)
	menu_margin.add_theme_constant_override("margin_right", 28)
	menu_margin.add_theme_constant_override("margin_bottom", 28)
	main_menu_overlay.add_child(menu_margin)

	var menu_layout := HBoxContainer.new()
	menu_layout.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	menu_layout.size_flags_vertical = Control.SIZE_EXPAND_FILL
	menu_layout.alignment = BoxContainer.ALIGNMENT_CENTER
	menu_layout.add_theme_constant_override("separation", 24)
	menu_margin.add_child(menu_layout)

	main_menu_home_panel = PanelContainer.new()
	main_menu_home_panel.custom_minimum_size = Vector2(580, 0)
	main_menu_home_panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
	main_menu_home_panel.size_flags_horizontal = Control.SIZE_FILL
	menu_layout.add_child(main_menu_home_panel)

	var hero_margin := MarginContainer.new()
	hero_margin.add_theme_constant_override("margin_left", 26)
	hero_margin.add_theme_constant_override("margin_top", 28)
	hero_margin.add_theme_constant_override("margin_right", 26)
	hero_margin.add_theme_constant_override("margin_bottom", 28)
	main_menu_home_panel.add_child(hero_margin)

	main_menu_content = VBoxContainer.new()
	main_menu_content.add_theme_constant_override("separation", 18)
	main_menu_content.alignment = BoxContainer.ALIGNMENT_CENTER
	hero_margin.add_child(main_menu_content)

	var menu_kicker := Label.new()
	menu_kicker.text = "A POINT & CLICK HORROR"
	menu_kicker.add_theme_font_override("font", ACCENT_FONT)
	menu_kicker.add_theme_font_size_override("font_size", 12)
	menu_kicker.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.84))
	menu_kicker.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	main_menu_content.add_child(menu_kicker)

	main_menu_title_label = Label.new()
	main_menu_title_label.text = "Day Of Arrival"
	main_menu_title_label.add_theme_font_override("font", DISPLAY_FONT)
	main_menu_title_label.add_theme_font_size_override("font_size", 62)
	main_menu_title_label.add_theme_color_override("font_color", Color(0.97, 0.96, 0.92, 1))
	main_menu_title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	main_menu_content.add_child(main_menu_title_label)

	main_menu_body_label = RichTextLabel.new()
	main_menu_body_label.bbcode_enabled = true
	main_menu_body_label.fit_content = true
	main_menu_body_label.scroll_active = false
	main_menu_body_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_menu_body_label.add_theme_color_override("default_color", Color(0.74, 0.78, 0.84, 0.96))
	main_menu_content.add_child(main_menu_body_label)

	var divider := ColorRect.new()
	divider.custom_minimum_size = Vector2(1, 44)
	divider.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	divider.color = Color(0.85, 0.76, 0.60, 0.24)
	main_menu_content.add_child(divider)

	main_menu_home_actions = VBoxContainer.new()
	main_menu_home_actions.custom_minimum_size = Vector2(252, 0)
	main_menu_home_actions.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	main_menu_home_actions.add_theme_constant_override("separation", 10)
	main_menu_content.add_child(main_menu_home_actions)

	main_menu_footer = HBoxContainer.new()
	main_menu_footer.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	main_menu_footer.alignment = BoxContainer.ALIGNMENT_CENTER
	main_menu_footer.add_theme_constant_override("separation", 0)
	main_menu_content.add_child(main_menu_footer)

	var ending_stat := _build_menu_footer_stat()
	main_menu_endings_stat_value = ending_stat.get_node("Value") as Label
	var ending_stat_label := ending_stat.get_node("Label") as Label
	ending_stat_label.text = "UNLOCKED ENDINGS"
	main_menu_footer.add_child(ending_stat)

	var footer_sep := ColorRect.new()
	footer_sep.custom_minimum_size = Vector2(1, 30)
	footer_sep.color = Color(1, 1, 1, 0.10)
	main_menu_footer.add_child(footer_sep)

	var document_stat := _build_menu_footer_stat()
	main_menu_documents_stat_value = document_stat.get_node("Value") as Label
	var document_stat_label := document_stat.get_node("Label") as Label
	document_stat_label.text = "ARCHIVED TEXTS"
	main_menu_footer.add_child(document_stat)

	main_menu_stats_label = Label.new()
	main_menu_stats_label.visible = false
	main_menu_content.add_child(main_menu_stats_label)

	main_menu_shell = PanelContainer.new()
	main_menu_shell.custom_minimum_size = Vector2(760, 560)
	main_menu_shell.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_menu_shell.size_flags_vertical = Control.SIZE_EXPAND_FILL
	menu_layout.add_child(main_menu_shell)

	var shell_margin := MarginContainer.new()
	shell_margin.add_theme_constant_override("margin_left", 24)
	shell_margin.add_theme_constant_override("margin_top", 24)
	shell_margin.add_theme_constant_override("margin_right", 24)
	shell_margin.add_theme_constant_override("margin_bottom", 24)
	main_menu_shell.add_child(shell_margin)

	var shell_stack := VBoxContainer.new()
	shell_stack.add_theme_constant_override("separation", 18)
	shell_margin.add_child(shell_stack)

	var menu_nav_row := HBoxContainer.new()
	menu_nav_row.add_theme_constant_override("separation", 10)
	shell_stack.add_child(menu_nav_row)

	main_menu_nav = HBoxContainer.new()
	main_menu_nav.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_menu_nav.alignment = BoxContainer.ALIGNMENT_BEGIN
	main_menu_nav.add_theme_constant_override("separation", 10)
	menu_nav_row.add_child(main_menu_nav)

	main_menu_close_button = Button.new()
	main_menu_close_button.text = I18n.t("ui.menu.close")
	main_menu_close_button.pressed.connect(_close_main_menu)
	menu_nav_row.add_child(main_menu_close_button)

	main_menu_scroll = ScrollContainer.new()
	main_menu_scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	main_menu_scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	shell_stack.add_child(main_menu_scroll)

	var scroll_margin := MarginContainer.new()
	scroll_margin.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll_margin.add_theme_constant_override("margin_left", 2)
	scroll_margin.add_theme_constant_override("margin_top", 2)
	scroll_margin.add_theme_constant_override("margin_right", 2)
	scroll_margin.add_theme_constant_override("margin_bottom", 2)
	main_menu_scroll.add_child(scroll_margin)

	main_menu_body_stack = VBoxContainer.new()
	main_menu_body_stack.name = "MenuBodyStack"
	main_menu_body_stack.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_menu_body_stack.add_theme_constant_override("separation", 14)
	scroll_margin.add_child(main_menu_body_stack)

	hotspot_editor_overlay = Control.new()
	hotspot_editor_overlay.name = "HotspotEditorOverlay"
	hotspot_editor_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	hotspot_editor_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	hotspot_editor_overlay.visible = false
	hotspot_layer.add_child(hotspot_editor_overlay)

	hotspot_editor_panel = PanelContainer.new()
	hotspot_editor_panel.name = "HotspotEditorPanel"
	hotspot_editor_panel.visible = false
	hotspot_editor_panel.position = Vector2(28, 28)
	hotspot_editor_panel.size = Vector2(360, 140)
	add_child(hotspot_editor_panel)
	move_child(hotspot_editor_panel, get_child_count() - 1)

	var editor_margin := MarginContainer.new()
	editor_margin.add_theme_constant_override("margin_left", 14)
	editor_margin.add_theme_constant_override("margin_top", 12)
	editor_margin.add_theme_constant_override("margin_right", 14)
	editor_margin.add_theme_constant_override("margin_bottom", 12)
	hotspot_editor_panel.add_child(editor_margin)

	var editor_stack := VBoxContainer.new()
	editor_stack.add_theme_constant_override("separation", 8)
	editor_margin.add_child(editor_stack)

	hotspot_editor_status_label = Label.new()
	hotspot_editor_status_label.add_theme_color_override("font_color", Color(0.95, 0.90, 0.76, 1))
	editor_stack.add_child(hotspot_editor_status_label)

	hotspot_editor_detail_label = RichTextLabel.new()
	hotspot_editor_detail_label.bbcode_enabled = true
	hotspot_editor_detail_label.fit_content = true
	hotspot_editor_detail_label.scroll_active = false
	editor_stack.add_child(hotspot_editor_detail_label)


func _build_ending_stat(title: String) -> PanelContainer:
	var panel := PanelContainer.new()
	panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var margin := MarginContainer.new()
	margin.name = "Margin"
	margin.add_theme_constant_override("margin_left", 14)
	margin.add_theme_constant_override("margin_top", 12)
	margin.add_theme_constant_override("margin_right", 14)
	margin.add_theme_constant_override("margin_bottom", 12)
	panel.add_child(margin)

	var stack := VBoxContainer.new()
	stack.name = "Stack"
	stack.add_theme_constant_override("separation", 4)
	margin.add_child(stack)

	var label := Label.new()
	label.name = "Label"
	label.text = title
	label.add_theme_font_size_override("font_size", 11)
	label.add_theme_color_override("font_color", Color(0.60, 0.65, 0.71, 0.95))
	stack.add_child(label)

	var value := Label.new()
	value.name = "Value"
	value.text = "-"
	value.add_theme_font_override("font", DISPLAY_FONT)
	value.add_theme_font_size_override("font_size", 24)
	value.add_theme_color_override("font_color", Color(0.95, 0.93, 0.88, 1))
	stack.add_child(value)

	return panel


func _build_menu_footer_stat() -> VBoxContainer:
	var stack := VBoxContainer.new()
	stack.name = "Stack"
	stack.custom_minimum_size = Vector2(136, 0)
	stack.alignment = BoxContainer.ALIGNMENT_CENTER
	stack.add_theme_constant_override("separation", 5)

	var value := Label.new()
	value.name = "Value"
	value.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	value.add_theme_font_override("font", DISPLAY_FONT)
	value.add_theme_font_size_override("font_size", 22)
	value.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.98))
	stack.add_child(value)

	var label := Label.new()
	label.name = "Label"
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.add_theme_font_size_override("font_size", 11)
	label.add_theme_color_override("font_color", Color(0.74, 0.78, 0.84, 0.86))
	stack.add_child(label)

	return stack


func _refresh_ending_overlay(room: Dictionary) -> void:
	if ending_overlay == null:
		return
	var ending_data: Dictionary = room.get("ending_data", {})
	if ending_data.is_empty():
		ending_overlay.visible = false
		return

	ending_overlay.visible = true
	ending_name_label.text = ending_data.get("name", room.get("title", "Ending"))
	ending_summary_label.text = ending_data.get("summary", room.get("hint", ""))
	ending_order_value_label.text = ending_data.get("order", "-")
	ending_endings_value_label.text = "%d/%d" % [GameState.unlocked_endings.size(), MENU_ENDING_TOTAL]
	ending_documents_value_label.text = I18n.t("ui.files.count_short", {"count": GameState.archived_documents.size()})

	var variant := String(ending_data.get("variant", "normal"))
	var border := Color(0.847, 0.765, 0.604, 0.30)
	if variant == "bad":
		border = Color(0.705, 0.173, 0.173, 0.42)
	elif variant == "failed":
		border = Color(0.705, 0.173, 0.173, 0.34)
	elif variant == "good":
		border = Color(0.725, 0.839, 1.0, 0.34)
	ending_card.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.96), border, 24))


func _apply_web_ui_theme() -> void:
	var empty_style := StyleBoxEmpty.new()
	var left_rail: PanelContainer = _ensure_left_documents_rail()
	$Background.color = Color(0, 0, 0, 1)
	top_bar.add_theme_stylebox_override("panel", empty_style)
	room_viewport.add_theme_stylebox_override("panel", empty_style)
	message_panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0, 0, 0, 0.58), Color(1, 1, 1, 0.10), 3))
	room_visual_frame.add_theme_stylebox_override("panel", empty_style)
	right_rail.add_theme_stylebox_override("panel", empty_style)
	left_rail.add_theme_stylebox_override("panel", empty_style)
	room_hint_bar.add_theme_stylebox_override("panel", _build_panel_style(Color(0.03, 0.04, 0.05, 0.84), Color(0.73, 0.84, 1.0, 0.03), 10))

	room_name_label.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 1))
	room_hint_label.add_theme_color_override("default_color", Color(0.72, 0.76, 0.82, 0.94))
	message_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
	objective_value_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
	document_text_label.add_theme_color_override("default_color", Color(0.94, 0.93, 0.88, 0.98))
	inventory_title_label.add_theme_color_override("font_color", Color(0.95, 0.95, 0.94, 1))
	rail_documents_title_label.add_theme_color_override("font_color", Color(0.95, 0.95, 0.94, 1))
	inventory_notice_label.add_theme_color_override("font_color", Color(0.85, 0.76, 0.60, 0.98))
	rail_documents_notice_label.add_theme_color_override("font_color", Color(0.73, 0.84, 1.0, 0.98))
	rail_document_title_label.add_theme_color_override("font_color", Color(0.95, 0.95, 0.94, 1))
	rail_document_source_label.add_theme_color_override("font_color", Color(0.85, 0.76, 0.60, 0.92))
	rail_document_body_label.add_theme_color_override("default_color", Color(0.90, 0.93, 0.97, 0.95))

	_style_button(objective_button, false)
	_style_button(documents_button, false)
	_add_menu_button()
	_style_button(documents_close_button, false)
	_style_button(objective_close_button, false)
	_style_button(inspect_close_button, false)
	_style_button(inspect_confirm_button, true)
	_style_button(code_cancel_button, false)
	_style_button(code_confirm_button, true)
	_style_button(main_menu_close_button, false)
	_style_button(ending_restart_button, true)
	_style_button(ending_menu_button, false)
	_style_button(pause_continue_button, true)
	_style_button(pause_save_button, false)
	_style_button(pause_main_menu_button, false)

	_style_overlay_panel($InspectOverlay/InspectCenter/InspectPanel)
	_style_overlay_panel($CodeOverlay/CodeCenter/CodePanel)
	_style_overlay_panel($DocumentsOverlay/DocumentsCenter/DocumentsPanel)
	_style_overlay_panel($ObjectiveOverlay/ObjectiveCenter/ObjectivePanel)
	_style_overlay_panel($DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer)
	_style_overlay_panel($InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectImageFrame, 18)
	_style_overlay_panel(main_menu_shell, 26)
	_style_overlay_panel(pause_overlay.get_child(0).get_child(0) as PanelContainer, 18)
	main_menu_home_panel.add_theme_stylebox_override("panel", StyleBoxEmpty.new())
	hotspot_editor_panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.94), Color(0.95, 0.90, 0.76, 0.32), 16))
	inventory_section.add_theme_stylebox_override("panel", empty_style)
	rail_documents_section.add_theme_stylebox_override("panel", empty_style)
	rail_document_preview_panel.add_theme_stylebox_override("panel", empty_style)

	documents_list.add_theme_stylebox_override("panel", _build_panel_style(Color(0.04, 0.05, 0.07, 0.72), Color(0.73, 0.84, 1.0, 0.08), 14))
	_make_item_list_transparent(inventory_list)
	_make_item_list_transparent(rail_documents_list)
	code_input.add_theme_stylebox_override("normal", _build_panel_style(Color(0.04, 0.05, 0.07, 0.92), Color(0.85, 0.76, 0.60, 0.34), 12))
	code_input.add_theme_stylebox_override("focus", _build_panel_style(Color(0.05, 0.06, 0.08, 0.96), Color(0.85, 0.76, 0.60, 0.58), 12))
	code_input.add_theme_color_override("font_color", Color(0.96, 0.96, 0.95, 1))
	code_input.add_theme_color_override("placeholder_color", Color(0.59, 0.64, 0.71, 0.9))
	hotspot_editor_detail_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
	_refresh_hotspot_editor_panel()


func _style_overlay_panel(panel: PanelContainer, radius: int = 20) -> void:
	panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.96), Color(0.85, 0.76, 0.60, 0.22), radius))


func _make_item_list_transparent(list: ItemList) -> void:
	var empty_style := StyleBoxEmpty.new()
	list.add_theme_stylebox_override("panel", empty_style)
	list.add_theme_stylebox_override("focus", empty_style)
	list.add_theme_stylebox_override("selected", _build_panel_style(Color(0.85, 0.76, 0.60, 0.18), Color(0.85, 0.76, 0.60, 0.0), 2))
	list.add_theme_stylebox_override("selected_focus", _build_panel_style(Color(0.85, 0.76, 0.60, 0.24), Color(0.85, 0.76, 0.60, 0.0), 2))


func _add_menu_button() -> void:
	_style_button(top_menu_button, false)
	_style_button(top_restart_button, false)


func _hide_secondary_overlays() -> void:
	documents_overlay.visible = false
	objective_overlay.visible = false
	inspect_overlay.visible = false
	code_overlay.visible = false
	_hide_pause_menu()


func _set_gameplay_ui_visible(visible: bool) -> void:
	gameplay_root.visible = visible
	if ending_overlay != null:
		ending_overlay.visible = visible and not SceneRouter.get_room(GameState.current_room_id).get("ending_data", {}).is_empty()


func _toggle_pause_menu() -> void:
	if pause_overlay == null:
		return
	if is_main_menu_open or ending_overlay != null and ending_overlay.visible:
		return
	if documents_overlay.visible or objective_overlay.visible or inspect_overlay.visible or code_overlay.visible:
		_hide_secondary_overlays()
		return
	if pause_overlay.visible:
		_hide_pause_menu()
	else:
		_show_pause_menu()


func _show_pause_menu() -> void:
	if pause_overlay == null:
		return
	pause_overlay.visible = true
	_hide_message_popup()


func _hide_pause_menu() -> void:
	if pause_overlay != null:
		pause_overlay.visible = false


func _return_to_main_menu_from_pause() -> void:
	_hide_pause_menu()
	_show_main_menu_home()


func _save_from_pause_menu() -> void:
	var error_code: int = _save_current_run()
	if error_code == OK:
		GameState.set_message("已保存。")
		pause_save_button.text = "已保存"
	else:
		GameState.set_message("保存失败。")
		pause_save_button.text = "保存失败"
	var restore_timer := get_tree().create_timer(1.2)
	restore_timer.timeout.connect(func() -> void:
		if pause_save_button != null:
			pause_save_button.text = "保存"
	)


func _save_current_run() -> int:
	var config := ConfigFile.new()
	config.set_value("run", "current_room_id", GameState.current_room_id)
	config.set_value("run", "objective_text", GameState.objective_text)
	config.set_value("run", "message_text", GameState.message_text)
	config.set_value("run", "inventory", GameState.inventory)
	config.set_value("run", "selected_inventory_item", GameState.selected_inventory_item)
	config.set_value("run", "unlocked_documents", GameState.unlocked_documents)
	config.set_value("run", "flags", GameState.flags)
	config.set_value("run", "has_started_run", has_started_run)
	config.set_value("run", "last_recorded_ending_room_id", last_recorded_ending_room_id)
	return config.save("user://manual_save.cfg")


func _open_main_menu(tab: String) -> void:
	current_menu_tab = tab
	is_main_menu_open = true
	_hide_secondary_overlays()
	_set_gameplay_ui_visible(false)
	main_menu_overlay.visible = true
	main_menu_close_button.visible = _can_resume_game()


func _set_main_menu_view_mode(home_visible: bool) -> void:
	main_menu_home_panel.visible = home_visible
	main_menu_shell.visible = not home_visible


func _clear_main_menu_content() -> void:
	if main_menu_nav == null or main_menu_body_stack == null:
		return
	for child: Node in main_menu_nav.get_children():
		child.queue_free()
	for child: Node in main_menu_body_stack.get_children():
		child.queue_free()
	for child: Node in main_menu_home_actions.get_children():
		child.queue_free()


func _show_main_menu_home() -> void:
	_open_main_menu("home")
	_set_main_menu_view_mode(true)
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.home.title")
	main_menu_body_label.text = I18n.t("ui.menu.home.body")
	main_menu_endings_stat_value.text = "%d / %d" % [GameState.unlocked_endings.size(), MENU_ENDING_TOTAL]
	main_menu_documents_stat_value.text = "%d / %d" % [GameState.archived_documents.size(), MENU_DOCUMENT_TOTAL]

	var actions: Array[Dictionary] = []
	if _can_resume_game():
		actions.append({"label": I18n.t("ui.menu.action.continue"), "call": "_close_main_menu", "accent": true})
	else:
		actions.append({"label": I18n.t("ui.menu.action.start"), "call": "_close_main_menu", "accent": true})
	actions.append({"label": I18n.t("ui.menu.action.endings"), "call": "_show_main_menu_endings", "accent": false})
	actions.append({"label": I18n.t("ui.menu.action.documents"), "call": "_show_main_menu_documents", "accent": false})
	actions.append({"label": I18n.t("ui.menu.action.credits"), "call": "_show_main_menu_credits", "accent": false})

	for action in actions:
		var button := Button.new()
		button.text = action["label"]
		button.custom_minimum_size = Vector2(0, 56)
		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		button.pressed.connect(Callable(self, String(action["call"])))
		_style_menu_action(button, bool(action["accent"]))
		main_menu_home_actions.add_child(button)


func _show_main_menu_endings() -> void:
	_open_main_menu("endings")
	_set_main_menu_view_mode(false)
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.endings.title")
	main_menu_body_label.text = I18n.t("ui.menu.endings.body")
	main_menu_stats_label.text = I18n.t("ui.menu.endings.stats", {"count": GameState.unlocked_endings.size(), "total": MENU_ENDING_TOTAL})
	_add_archive_header(I18n.t("ui.menu.endings.title"), "%d / %d" % [GameState.unlocked_endings.size(), MENU_ENDING_TOTAL])
	main_menu_body_stack.add_child(_build_archive_intro(I18n.t("ui.menu.endings.title"), I18n.t("ui.menu.endings.body")))

	var ending_grid := GridContainer.new()
	ending_grid.columns = 2
	ending_grid.add_theme_constant_override("h_separation", 16)
	ending_grid.add_theme_constant_override("v_separation", 16)
	main_menu_body_stack.add_child(ending_grid)

	for ending in MENU_ENDING_CATALOG:
		var unlocked := GameState.unlocked_endings.has(String(ending["id"]))
		ending_grid.add_child(_build_archive_card(
			String(ending["order"]),
			String(ending["name"]) if unlocked else I18n.t("ui.menu.endings.locked_name"),
			String(ending["teaser"]) if unlocked else I18n.t("ui.menu.endings.locked_body"),
			I18n.t("ui.menu.endings.triggered", {"count": GameState.get_ending_trigger_count(String(ending["id"]))}),
			unlocked
		))


func _show_main_menu_documents() -> void:
	_open_main_menu("documents")
	_set_main_menu_view_mode(false)
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.documents.title")
	main_menu_body_label.text = I18n.t("ui.menu.documents.body")
	main_menu_stats_label.text = I18n.t("ui.menu.documents.stats", {"count": GameState.archived_documents.size(), "total": MENU_DOCUMENT_TOTAL})
	_add_archive_header(I18n.t("ui.menu.documents.title"), "%d / %d" % [GameState.archived_documents.size(), MENU_DOCUMENT_TOTAL])
	main_menu_body_stack.add_child(_build_archive_intro(I18n.t("ui.menu.documents.title"), I18n.t("ui.menu.documents.body")))

	if GameState.archived_documents.is_empty():
		var empty_panel := _build_archive_card(
			I18n.t("ui.menu.documents.empty_index"),
			I18n.t("ui.menu.documents.empty_title"),
			I18n.t("ui.menu.documents.empty_body"),
			"",
			false
		)
		main_menu_body_stack.add_child(empty_panel)
	else:
		if selected_menu_document_id == "":
			selected_menu_document_id = String(GameState.archived_documents[0].get("id", ""))

		var documents_split := HBoxContainer.new()
		documents_split.size_flags_vertical = Control.SIZE_EXPAND_FILL
		documents_split.add_theme_constant_override("separation", 14)
		main_menu_body_stack.add_child(documents_split)

		var list_panel := PanelContainer.new()
		list_panel.custom_minimum_size = Vector2(240, 0)
		list_panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
		list_panel.size_flags_horizontal = Control.SIZE_FILL
		list_panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.04, 0.05, 0.07, 0.82), Color(0.73, 0.84, 1.0, 0.10), 18))
		documents_split.add_child(list_panel)

		var list_margin := MarginContainer.new()
		list_margin.add_theme_constant_override("margin_left", 12)
		list_margin.add_theme_constant_override("margin_top", 12)
		list_margin.add_theme_constant_override("margin_right", 12)
		list_margin.add_theme_constant_override("margin_bottom", 12)
		list_panel.add_child(list_margin)

		var list_stack := VBoxContainer.new()
		list_stack.add_theme_constant_override("separation", 8)
		list_margin.add_child(list_stack)

		for document in GameState.archived_documents:
			var button := Button.new()
			var document_id := String(document.get("id", ""))
			button.text = _document_text(document, "title", "Untitled")
			button.alignment = HORIZONTAL_ALIGNMENT_LEFT
			button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			button.pressed.connect(_select_menu_document.bind(document_id))
			_style_button(button, document_id == selected_menu_document_id)
			list_stack.add_child(button)

		var selected_document := _get_selected_menu_document()
		var viewer_panel := PanelContainer.new()
		viewer_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		viewer_panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
		viewer_panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.96), Color(0.85, 0.76, 0.60, 0.18), 18))
		documents_split.add_child(viewer_panel)

		var viewer_margin := MarginContainer.new()
		viewer_margin.add_theme_constant_override("margin_left", 18)
		viewer_margin.add_theme_constant_override("margin_top", 18)
		viewer_margin.add_theme_constant_override("margin_right", 18)
		viewer_margin.add_theme_constant_override("margin_bottom", 18)
		viewer_panel.add_child(viewer_margin)

		var viewer_stack := VBoxContainer.new()
		viewer_stack.add_theme_constant_override("separation", 10)
		viewer_margin.add_child(viewer_stack)

		var doc_title := Label.new()
		doc_title.text = _document_text(selected_document, "title", "Untitled")
		doc_title.add_theme_font_size_override("font_size", 24)
		doc_title.add_theme_color_override("font_color", Color(0.96, 0.95, 0.92, 1))
		viewer_stack.add_child(doc_title)

		var doc_source := Label.new()
		doc_source.text = _document_text(selected_document, "source", "")
		doc_source.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		doc_source.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
		viewer_stack.add_child(doc_source)

		var doc_body := RichTextLabel.new()
		doc_body.bbcode_enabled = true
		doc_body.scroll_active = true
		doc_body.size_flags_vertical = Control.SIZE_EXPAND_FILL
		doc_body.text = _document_text(selected_document, "body", "")
		doc_body.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
		viewer_stack.add_child(doc_body)


func _show_main_menu_credits() -> void:
	_open_main_menu("credits")
	_set_main_menu_view_mode(false)
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.credits.title")
	main_menu_body_label.text = I18n.t("ui.menu.credits.body")
	main_menu_stats_label.text = I18n.t("ui.menu.credits.stats")
	_add_archive_header(I18n.t("ui.menu.credits.title"), "Staff Roll")
	main_menu_body_stack.add_child(_build_archive_intro(I18n.t("ui.menu.credits.title"), I18n.t("ui.menu.credits.body")))

	for entry in MENU_CREDITS:
		main_menu_body_stack.add_child(_build_credit_block(String(entry["role"]), entry["names"]))


func _close_main_menu() -> void:
	has_started_run = true
	is_main_menu_open = false
	main_menu_overlay.visible = false
	_set_gameplay_ui_visible(true)
	_refresh_room(GameState.current_room_id)
	_refresh_hud()


func _restart_from_topbar() -> void:
	selected_menu_document_id = ""
	GameState.reset()
	has_started_run = true
	_hide_secondary_overlays()
	main_menu_overlay.visible = false
	is_main_menu_open = false
	_set_gameplay_ui_visible(true)
	_refresh_room(GameState.current_room_id)
	_refresh_hud()


func _restart_from_ending() -> void:
	selected_menu_document_id = ""
	GameState.reset()
	has_started_run = true
	last_recorded_ending_room_id = ""
	_hide_secondary_overlays()
	ending_overlay.visible = false
	main_menu_overlay.visible = false
	is_main_menu_open = false
	_set_gameplay_ui_visible(true)
	_refresh_room(GameState.current_room_id)
	_refresh_hud()


func _style_button(button: Button, accent: bool) -> void:
	var normal_bg := Color(0.08, 0.10, 0.14, 0.92)
	var hover_bg := Color(0.12, 0.15, 0.20, 0.96)
	var pressed_bg := Color(0.16, 0.19, 0.25, 0.98)
	var border := Color(0.73, 0.84, 1.0, 0.16)
	if accent:
		normal_bg = Color(0.18, 0.12, 0.10, 0.98)
		hover_bg = Color(0.24, 0.15, 0.12, 1.0)
		pressed_bg = Color(0.30, 0.18, 0.12, 1.0)
		border = Color(0.85, 0.76, 0.60, 0.44)
	button.add_theme_stylebox_override("normal", _build_panel_style(normal_bg, border, 999))
	button.add_theme_stylebox_override("hover", _build_panel_style(hover_bg, border, 999))
	button.add_theme_stylebox_override("pressed", _build_panel_style(pressed_bg, border, 999))
	button.add_theme_stylebox_override("focus", _build_panel_style(hover_bg, border, 999))
	button.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 1))
	button.add_theme_color_override("font_hover_color", Color(1, 1, 1, 1))
	button.add_theme_color_override("font_pressed_color", Color(1, 1, 1, 1))
	button.add_theme_color_override("font_focus_color", Color(1, 1, 1, 1))
	button.add_theme_constant_override("h_separation", 8)


func _style_menu_action(button: Button, primary: bool) -> void:
	var border := Color(1, 1, 1, 0.10)
	var normal_bg := Color(1, 1, 1, 0.03)
	var hover_bg := Color(1, 1, 1, 0.06)
	var pressed_bg := Color(1, 1, 1, 0.10)
	if primary:
		border = Color(0.847, 0.765, 0.604, 0.50)
		normal_bg = Color(0.847, 0.765, 0.604, 0.16)
		hover_bg = Color(0.847, 0.765, 0.604, 0.24)
		pressed_bg = Color(0.847, 0.765, 0.604, 0.30)

	button.add_theme_stylebox_override("normal", _build_panel_style(normal_bg, border, 5))
	button.add_theme_stylebox_override("hover", _build_panel_style(hover_bg, border, 5))
	button.add_theme_stylebox_override("pressed", _build_panel_style(pressed_bg, border, 5))
	button.add_theme_stylebox_override("focus", _build_panel_style(hover_bg, border, 5))
	button.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 1))
	button.add_theme_color_override("font_hover_color", Color(1, 1, 1, 1))
	button.add_theme_color_override("font_pressed_color", Color(1, 1, 1, 1))
	button.add_theme_color_override("font_focus_color", Color(1, 1, 1, 1))


func _build_panel_style(background_color: Color, border_color: Color, corner_radius: int = 18) -> StyleBoxFlat:
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
	style.shadow_color = Color(0, 0, 0, 0.32)
	style.shadow_size = 18
	style.shadow_offset = Vector2(0, 10)
	style.content_margin_left = 8
	style.content_margin_top = 8
	style.content_margin_right = 8
	style.content_margin_bottom = 8
	return style


func _add_menu_nav_button(label: String, callback: Callable, active: bool) -> void:
	var button := Button.new()
	button.text = label
	button.pressed.connect(callback)
	_style_button(button, active)
	main_menu_nav.add_child(button)


func _add_archive_header(title: String, count_text: String) -> void:
	var breadcrumb := Label.new()
	breadcrumb.text = "%s  >  %s" % [I18n.t("ui.menu.home.title"), title]
	breadcrumb.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	main_menu_nav.add_child(breadcrumb)

	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	main_menu_nav.add_child(spacer)

	var count_label := Label.new()
	count_label.text = count_text
	count_label.add_theme_color_override("font_color", Color(0.74, 0.78, 0.84, 0.92))
	main_menu_nav.add_child(count_label)

	var back_button := Button.new()
	back_button.text = I18n.t("ui.menu.nav.home")
	back_button.pressed.connect(_show_main_menu_home)
	_style_menu_action(back_button, false)
	main_menu_nav.add_child(back_button)


func _build_archive_intro(title_text: String, subtitle_text: String) -> VBoxContainer:
	var stack := VBoxContainer.new()
	stack.add_theme_constant_override("separation", 8)

	var title_label := Label.new()
	title_label.text = title_text
	title_label.add_theme_font_size_override("font_size", 30)
	title_label.add_theme_color_override("font_color", Color(0.96, 0.95, 0.92, 1))
	stack.add_child(title_label)

	var subtitle_label := RichTextLabel.new()
	subtitle_label.bbcode_enabled = true
	subtitle_label.fit_content = true
	subtitle_label.scroll_active = false
	subtitle_label.text = subtitle_text
	subtitle_label.add_theme_color_override("default_color", Color(0.74, 0.78, 0.84, 0.96))
	stack.add_child(subtitle_label)

	return stack


func _build_archive_card(index_text: String, title_text: String, body_text: String, meta_text: String, unlocked: bool) -> PanelContainer:
	var card := PanelContainer.new()
	card.add_theme_stylebox_override(
		"panel",
		_build_panel_style(
			Color(0.06, 0.08, 0.11, 0.92) if unlocked else Color(0.045, 0.05, 0.07, 0.88),
			Color(0.85, 0.76, 0.60, 0.18) if unlocked else Color(0.73, 0.84, 1.0, 0.08),
			18
		)
	)

	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 16)
	margin.add_theme_constant_override("margin_top", 16)
	margin.add_theme_constant_override("margin_right", 16)
	margin.add_theme_constant_override("margin_bottom", 16)
	card.add_child(margin)

	var stack := VBoxContainer.new()
	stack.add_theme_constant_override("separation", 8)
	margin.add_child(stack)

	var index_label := Label.new()
	index_label.text = index_text
	index_label.add_theme_font_size_override("font_size", 12)
	index_label.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	stack.add_child(index_label)

	var title_label := Label.new()
	title_label.text = title_text
	title_label.add_theme_font_size_override("font_size", 22)
	title_label.add_theme_color_override("font_color", Color(0.96, 0.95, 0.92, 1))
	stack.add_child(title_label)

	var body_label := RichTextLabel.new()
	body_label.bbcode_enabled = true
	body_label.fit_content = true
	body_label.scroll_active = false
	body_label.text = body_text
	body_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.92))
	stack.add_child(body_label)

	if meta_text != "":
		var meta_label := Label.new()
		meta_label.text = meta_text
		meta_label.add_theme_color_override("font_color", Color(0.59, 0.64, 0.71, 0.96))
		stack.add_child(meta_label)

	return card


func _build_credit_block(role: String, names: Array) -> PanelContainer:
	var card := PanelContainer.new()
	card.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.96), Color(0.73, 0.84, 1.0, 0.10), 18))
	card.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 16)
	margin.add_theme_constant_override("margin_top", 16)
	margin.add_theme_constant_override("margin_right", 16)
	margin.add_theme_constant_override("margin_bottom", 16)
	card.add_child(margin)

	var stack := VBoxContainer.new()
	stack.alignment = BoxContainer.ALIGNMENT_CENTER
	stack.add_theme_constant_override("separation", 8)
	margin.add_child(stack)

	var role_label := Label.new()
	role_label.text = role
	role_label.add_theme_font_size_override("font_size", 18)
	role_label.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	role_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	stack.add_child(role_label)

	for name_variant in names:
		var name_label := Label.new()
		name_label.text = String(name_variant)
		name_label.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 0.96))
		name_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		stack.add_child(name_label)

	return card


func _track_ending_unlock(room_id: String, room: Dictionary) -> void:
	var ending_data: Dictionary = room.get("ending_data", {})
	if ending_data.is_empty():
		last_recorded_ending_room_id = ""
		return
	if last_recorded_ending_room_id == room_id:
		return
	last_recorded_ending_room_id = room_id
	GameState.record_ending(room_id)


func _can_resume_game() -> bool:
	return has_started_run or GameState.current_room_id != GameState.START_ROOM_ID or not GameState.inventory.is_empty() or not GameState.unlocked_documents.is_empty()


func _restart_from_menu() -> void:
	GameState.reset()
	selected_menu_document_id = ""
	_close_main_menu()


func _select_menu_document(document_id: String) -> void:
	selected_menu_document_id = document_id
	_show_main_menu_documents()


func _get_selected_menu_document() -> Dictionary:
	for document in GameState.archived_documents:
		if document.get("id", "") == selected_menu_document_id:
			return document
	if not GameState.archived_documents.is_empty():
		selected_menu_document_id = String(GameState.archived_documents[0].get("id", ""))
		return GameState.archived_documents[0]
	return {}


func _refresh_main_menu_view() -> void:
	match current_menu_tab:
		"endings":
			_show_main_menu_endings()
		"documents":
			_show_main_menu_documents()
		"credits":
			_show_main_menu_credits()
		_:
			_show_main_menu_home()


func _add_hotspot_button(interaction: Dictionary) -> void:
	var hotspot_rect: Rect2 = interaction.get("hotspot_rect", Rect2())
	if hotspot_rect.size == Vector2.ZERO:
		return

	var button := Button.new()
	button.text = _text(interaction, "label", I18n.t("ui.interaction.default"))
	button.tooltip_text = _text(interaction, "label", I18n.t("ui.interaction.default"))
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
	button.mouse_entered.connect(_animate_hotspot_hover.bind(button, true))
	button.mouse_exited.connect(_animate_hotspot_hover.bind(button, false))
	button.pressed.connect(_animate_hotspot_press.bind(button))
	button.pressed.connect(_on_interaction_requested.bind(interaction.get("id", "")))

	var parent_size := hotspot_layer.size
	if parent_size == Vector2.ZERO:
		parent_size = hotspot_layer.get_rect().size

	button.position = Vector2(hotspot_rect.position.x * parent_size.x, hotspot_rect.position.y * parent_size.y)
	button.size = Vector2(hotspot_rect.size.x * parent_size.x, hotspot_rect.size.y * parent_size.y)
	button.pivot_offset = button.size * 0.5
	hotspot_layer.add_child(button)


func _animate_hotspot_hover(button: Button, hovered: bool) -> void:
	if not is_instance_valid(button):
		return

	var target_scale: Vector2 = Vector2(1.035, 1.035) if hovered else Vector2.ONE
	var target_modulate: Color = Color(1.08, 1.03, 0.95, 1.0) if hovered else Color(1, 1, 1, 1)
	var hover_tween: Tween = create_tween()
	hover_tween.set_trans(Tween.TRANS_SINE)
	hover_tween.set_ease(Tween.EASE_OUT)
	hover_tween.tween_property(button, "scale", target_scale, 0.1)
	hover_tween.parallel().tween_property(button, "modulate", target_modulate, 0.1)


func _animate_hotspot_press(button: Button) -> void:
	if not is_instance_valid(button):
		return

	var press_tween: Tween = create_tween()
	press_tween.set_trans(Tween.TRANS_BACK)
	press_tween.set_ease(Tween.EASE_OUT)
	press_tween.tween_property(button, "scale", Vector2(0.96, 0.96), 0.045)
	press_tween.tween_property(button, "scale", Vector2(1.035, 1.035), 0.12)


func _rebuild_hotspots() -> void:
	for child: Node in hotspot_layer.get_children():
		if child == hotspot_editor_overlay:
			for editor_child: Node in hotspot_editor_overlay.get_children():
				editor_child.queue_free()
			continue
		child.queue_free()

	var room := SceneRouter.get_room(GameState.current_room_id)
	var keypad_interaction_id := ""
	if _has_scene_keypad(room):
		keypad_interaction_id = String(room.get("scene_keypad", {}).get("interaction_id", ""))

	for interaction: Dictionary in SceneRouter.get_interactions(GameState.current_room_id):
		if not SceneRouter.is_interaction_available(interaction):
			continue
		if keypad_interaction_id != "" and String(interaction.get("id", "")) == keypad_interaction_id:
			continue
		_add_hotspot_button(interaction)

	if _has_scene_keypad(room):
		_build_scene_keypad(room)

	if hotspot_editor_overlay.get_parent() != hotspot_layer:
		hotspot_layer.add_child(hotspot_editor_overlay)
	_refresh_hotspot_editor_overlay(room)


func _has_scene_keypad(room: Dictionary) -> bool:
	return room.has("scene_keypad") and room.get("scene_keypad", {}) is Dictionary


func _get_scene_keypad_interaction(room: Dictionary) -> Dictionary:
	if not _has_scene_keypad(room):
		return {}
	var interaction_id := String(room.get("scene_keypad", {}).get("interaction_id", ""))
	if interaction_id == "":
		return {}
	return SceneRouter.get_interaction(room.get("id", ""), interaction_id)


func _build_scene_keypad(room: Dictionary) -> void:
	var keypad_config: Dictionary = room.get("scene_keypad", {})
	var display_rect: Rect2 = keypad_config.get("display_rect", Rect2())

	var parent_size := hotspot_layer.size
	if parent_size == Vector2.ZERO:
		parent_size = hotspot_layer.get_rect().size

	var display_label := Label.new()
	display_label.name = "Display"
	display_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	display_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	display_label.text = scene_keypad_input if scene_keypad_input != "" else "----"
	display_label.add_theme_font_size_override("font_size", 18)
	display_label.add_theme_color_override("font_color", Color(0.90, 0.97, 1.0, 0.98))
	if display_rect.size != Vector2.ZERO:
		display_label.position = Vector2(display_rect.position.x * parent_size.x, display_rect.position.y * parent_size.y)
		display_label.size = Vector2(display_rect.size.x * parent_size.x, display_rect.size.y * parent_size.y)
		hotspot_layer.add_child(display_label)

	var button_rects: Dictionary = keypad_config.get("button_rects", {})
	for key_value in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"]:
		var key_rect: Rect2 = button_rects.get(key_value, Rect2())
		if key_rect.size == Vector2.ZERO:
			continue
		var button := Button.new()
		button.text = key_value
		button.focus_mode = Control.FOCUS_NONE
		button.pressed.connect(_on_scene_keypad_pressed.bind(key_value))
		button.add_theme_stylebox_override("normal", _build_panel_style(Color(0.08, 0.12, 0.16, 0.82), Color(0.82, 0.88, 0.95, 0.18), 8))
		button.add_theme_stylebox_override("hover", _build_panel_style(Color(0.12, 0.16, 0.22, 0.92), Color(0.95, 0.90, 0.76, 0.42), 8))
		button.add_theme_stylebox_override("pressed", _build_panel_style(Color(0.16, 0.22, 0.28, 0.98), Color(0.95, 0.90, 0.76, 0.60), 8))
		button.position = Vector2(key_rect.position.x * parent_size.x, key_rect.position.y * parent_size.y)
		button.size = Vector2(key_rect.size.x * parent_size.x, key_rect.size.y * parent_size.y)
		hotspot_layer.add_child(button)


func _on_scene_keypad_pressed(key_value: String) -> void:
	if is_transitioning or active_code_interaction_id == "":
		return

	match key_value:
		"C":
			scene_keypad_input = ""
		"OK":
			await _submit_code_value(scene_keypad_input)
			return
		_:
			var expected_code := String(active_code_data.get("solution", ""))
			if expected_code == "" or scene_keypad_input.length() >= expected_code.length():
				return
			scene_keypad_input += key_value

	_rebuild_hotspots()


func _toggle_hotspot_edit_mode() -> void:
	hotspot_edit_mode = not hotspot_edit_mode
	hotspot_editor_drag_mode = ""
	hotspot_editor_selected_target = {}
	hotspot_editor_overlay.visible = hotspot_edit_mode
	hotspot_editor_overlay.mouse_filter = Control.MOUSE_FILTER_STOP if hotspot_edit_mode else Control.MOUSE_FILTER_IGNORE
	hotspot_editor_panel.visible = hotspot_edit_mode
	_refresh_hotspot_editor_panel()
	_rebuild_hotspots()


func _refresh_hotspot_editor_panel() -> void:
	if hotspot_editor_status_label == null or hotspot_editor_detail_label == null:
		return
	hotspot_editor_status_label.text = "Hotspot Editor: %s" % ("ON" if hotspot_edit_mode else "OFF")
	if hotspot_editor_selected_target.is_empty():
		hotspot_editor_detail_label.text = "F2: toggle\nLeft drag: move\nRight drag: resize\nCtrl+C: copy selected Rect2"
		return
	var rect := _get_hotspot_rect_for_target(hotspot_editor_selected_target)
	hotspot_editor_detail_label.text = "[b]%s[/b]\nRect2(%.4f, %.4f, %.4f, %.4f)" % [
		String(hotspot_editor_selected_target.get("label", "hotspot")),
		rect.position.x,
		rect.position.y,
		rect.size.x,
		rect.size.y
	]


func _refresh_hotspot_editor_overlay(room: Dictionary) -> void:
	if hotspot_editor_overlay == null:
		return
	for child: Node in hotspot_editor_overlay.get_children():
		child.queue_free()
	if not hotspot_edit_mode:
		return

	for editable in _collect_editable_hotspots(room):
		_add_hotspot_editor_handle(editable)


func _collect_editable_hotspots(room: Dictionary) -> Array:
	var items: Array = []
	var interactions: Array = room.get("interactions", [])
	for index in range(interactions.size()):
		var interaction: Dictionary = interactions[index]
		var rect: Rect2 = interaction.get("hotspot_rect", Rect2())
		if rect.size == Vector2.ZERO:
			continue
		items.append({
			"label": String(interaction.get("id", "interaction")),
			"target": {
				"kind": "interaction",
				"room_id": String(room.get("id", "")),
				"index": index,
				"field": "hotspot_rect",
				"label": String(interaction.get("id", "interaction"))
			},
			"rect": rect
		})

	if _has_scene_keypad(room):
		var keypad_config: Dictionary = room.get("scene_keypad", {})
		for field_name in ["display_rect"]:
			var keypad_rect: Rect2 = keypad_config.get(field_name, Rect2())
			if keypad_rect.size == Vector2.ZERO:
				continue
			items.append({
				"label": "scene_keypad.%s" % field_name,
				"target": {
					"kind": "scene_keypad",
					"room_id": String(room.get("id", "")),
					"field": field_name,
					"label": "scene_keypad.%s" % field_name
				},
				"rect": keypad_rect
			})
		var button_rects: Dictionary = keypad_config.get("button_rects", {})
		for button_key in button_rects.keys():
			var button_rect: Rect2 = button_rects.get(button_key, Rect2())
			if button_rect.size == Vector2.ZERO:
				continue
			items.append({
				"label": "scene_keypad.button_rects.%s" % String(button_key),
				"target": {
					"kind": "scene_keypad_button",
					"room_id": String(room.get("id", "")),
					"field": String(button_key),
					"label": "scene_keypad.button_rects.%s" % String(button_key)
				},
				"rect": button_rect
			})
	return items


func _add_hotspot_editor_handle(editable: Dictionary) -> void:
	var rect: Rect2 = editable.get("rect", Rect2())
	var target: Dictionary = editable.get("target", {})
	var label_text := String(editable.get("label", "hotspot"))
	var frame := PanelContainer.new()
	frame.mouse_filter = Control.MOUSE_FILTER_STOP
	frame.focus_mode = Control.FOCUS_NONE
	frame.set_meta("editor_target", target)
	frame.add_theme_stylebox_override("panel", _build_hotspot_style(Color(0.95, 0.84, 0.26, 0.08), Color(0.95, 0.84, 0.26, 0.92), 6))
	_apply_editor_rect_to_control(frame, rect)
	frame.gui_input.connect(_on_hotspot_editor_handle_input.bind(frame))
	hotspot_editor_overlay.add_child(frame)

	var tag := Label.new()
	tag.text = label_text
	tag.mouse_filter = Control.MOUSE_FILTER_IGNORE
	tag.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	tag.add_theme_font_size_override("font_size", 12)
	tag.add_theme_color_override("font_color", Color(1, 0.98, 0.92, 1))
	tag.set_anchors_preset(Control.PRESET_TOP_WIDE)
	tag.offset_top = -22
	tag.offset_bottom = 0
	frame.add_child(tag)


func _on_hotspot_editor_handle_input(event: InputEvent, frame: Control) -> void:
	if not hotspot_edit_mode:
		return
	var target: Dictionary = frame.get_meta("editor_target", {})
	if target.is_empty():
		return
	if event is InputEventMouseButton:
		var mouse_event := event as InputEventMouseButton
		if mouse_event.pressed:
			hotspot_editor_selected_target = target
			hotspot_editor_drag_start_mouse = mouse_event.global_position
			hotspot_editor_drag_start_rect = _get_hotspot_rect_for_target(target)
			hotspot_editor_drag_mode = "resize" if mouse_event.button_index == MOUSE_BUTTON_RIGHT else "move"
			_refresh_hotspot_editor_panel()
		elif mouse_event.button_index == MOUSE_BUTTON_LEFT or mouse_event.button_index == MOUSE_BUTTON_RIGHT:
			if hotspot_editor_drag_mode != "":
				_rebuild_hotspots()
			hotspot_editor_drag_mode = ""
	elif event is InputEventMouseMotion and hotspot_editor_drag_mode != "":
		var motion_event := event as InputEventMouseMotion
		var parent_size := hotspot_layer.size
		if parent_size == Vector2.ZERO:
			return
		var delta := motion_event.global_position - hotspot_editor_drag_start_mouse
		var delta_rect := Rect2(
			delta.x / parent_size.x,
			delta.y / parent_size.y,
			delta.x / parent_size.x,
			delta.y / parent_size.y
		)
		var next_rect := hotspot_editor_drag_start_rect
		if hotspot_editor_drag_mode == "move":
			next_rect.position += delta_rect.position
		else:
			next_rect.size += delta_rect.size
		next_rect = _normalize_hotspot_rect(next_rect)
		_set_hotspot_rect_for_target(target, next_rect)
		_apply_editor_rect_to_control(frame, next_rect)
		hotspot_editor_selected_target = target
		_refresh_hotspot_editor_panel()


func _apply_editor_rect_to_control(control: Control, rect: Rect2) -> void:
	var parent_size := hotspot_layer.size
	if parent_size == Vector2.ZERO:
		parent_size = hotspot_layer.get_rect().size
	control.position = Vector2(rect.position.x * parent_size.x, rect.position.y * parent_size.y)
	control.size = Vector2(rect.size.x * parent_size.x, rect.size.y * parent_size.y)


func _normalize_hotspot_rect(rect: Rect2) -> Rect2:
	var width := clampf(rect.size.x, 0.02, 1.0)
	var height := clampf(rect.size.y, 0.02, 1.0)
	var x := clampf(rect.position.x, 0.0, 1.0 - width)
	var y := clampf(rect.position.y, 0.0, 1.0 - height)
	return Rect2(x, y, width, height)


func _get_hotspot_rect_for_target(target: Dictionary) -> Rect2:
	var room: Dictionary = SceneRouter.get_room(String(target.get("room_id", "")))
	match String(target.get("kind", "")):
		"interaction":
			var interactions: Array = room.get("interactions", [])
			var index := int(target.get("index", -1))
			if index >= 0 and index < interactions.size():
				return interactions[index].get("hotspot_rect", Rect2())
		"scene_keypad":
			var keypad_config: Dictionary = room.get("scene_keypad", {})
			return keypad_config.get(String(target.get("field", "")), Rect2())
		"scene_keypad_button":
			var keypad_config: Dictionary = room.get("scene_keypad", {})
			var button_rects: Dictionary = keypad_config.get("button_rects", {})
			return button_rects.get(String(target.get("field", "")), Rect2())
	return Rect2()


func _set_hotspot_rect_for_target(target: Dictionary, rect: Rect2) -> void:
	var room_id := String(target.get("room_id", ""))
	var room: Dictionary = SceneRouter.get_room(room_id)
	match String(target.get("kind", "")):
		"interaction":
			var interactions: Array = room.get("interactions", [])
			var index := int(target.get("index", -1))
			if index >= 0 and index < interactions.size():
				var interaction: Dictionary = interactions[index]
				interaction["hotspot_rect"] = rect
				interactions[index] = interaction
				room["interactions"] = interactions
		"scene_keypad":
			var keypad_config: Dictionary = room.get("scene_keypad", {})
			keypad_config[String(target.get("field", ""))] = rect
			room["scene_keypad"] = keypad_config
		"scene_keypad_button":
			var keypad_config: Dictionary = room.get("scene_keypad", {})
			var button_rects: Dictionary = keypad_config.get("button_rects", {})
			button_rects[String(target.get("field", ""))] = rect
			keypad_config["button_rects"] = button_rects
			room["scene_keypad"] = keypad_config
	SceneRouter.room_definitions[room_id] = room


func _copy_selected_hotspot_rect() -> void:
	if hotspot_editor_selected_target.is_empty():
		return
	var rect := _get_hotspot_rect_for_target(hotspot_editor_selected_target)
	DisplayServer.clipboard_set("Rect2(%.4f, %.4f, %.4f, %.4f)" % [
		rect.position.x,
		rect.position.y,
		rect.size.x,
		rect.size.y
	])
	_refresh_hotspot_editor_panel()


func _show_inspect_overlay(inspect_data: Dictionary) -> void:
	active_inspect_data = inspect_data
	inspect_title_label.text = _text(inspect_data, "title", I18n.t("ui.inspect.default_title"))
	inspect_body_label.text = _text(inspect_data, "body", "")
	var image_path := String(inspect_data.get("image", ""))
	inspect_image.texture = load(image_path) if image_path != "" else null
	inspect_confirm_button.text = _text(inspect_data, "confirm_label", I18n.t("ui.inspect.continue"))

	for child: Node in inspect_sub_actions.get_children():
		child.queue_free()

	for action_variant in inspect_data.get("actions", []):
		var action: Dictionary = action_variant
		var action_button := Button.new()
		action_button.text = _text(action, "label", I18n.t("ui.inspect.default_title"))
		action_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		action_button.focus_mode = Control.FOCUS_NONE
		action_button.pressed.connect(_on_inspect_action_pressed.bind(action))
		inspect_sub_actions.add_child(action_button)

	inspect_overlay.visible = true


func _hide_inspect_overlay() -> void:
	active_inspect_data = {}
	inspect_overlay.visible = false


func _on_inspect_action_pressed(action: Dictionary) -> void:
	var action_type := String(action.get("type", "text"))
	match action_type:
		"text":
			inspect_body_label.text = _text(action, "body", inspect_body_label.text)
		"confirm":
			_hide_inspect_overlay()
		_:
			inspect_body_label.text = _text(action, "body", inspect_body_label.text)


func _on_inspect_confirm_pressed() -> void:
	_hide_inspect_overlay()


func _show_code_overlay(code_input_data: Dictionary) -> void:
	scene_keypad_input = ""
	code_prompt_label.text = _text(code_input_data, "prompt", "Enter the code")
	code_feedback_label.text = ""
	code_input.text = ""
	code_overlay.visible = true
	code_input.grab_focus()


func _hide_code_overlay() -> void:
	active_code_interaction_id = ""
	active_code_data = {}
	scene_keypad_input = ""
	code_input.text = ""
	code_feedback_label.text = ""
	code_overlay.visible = false


func _on_code_text_submitted(_text: String) -> void:
	_submit_code_input()


func _submit_code_input() -> void:
	await _submit_code_value(code_input.text.strip_edges().replace(" ", ""))


func _submit_code_value(entered_code: String) -> void:
	if is_transitioning:
		return
	if is_room_sequence_locked:
		return

	var expected_code := String(active_code_data.get("solution", ""))
	if entered_code == expected_code and active_code_interaction_id != "":
		await _play_feedback_sound("correct_password", 0.42, true, 4.0)
		code_overlay.visible = false
		await _play_blink_transition(func():
			SceneRouter.apply_interaction(active_code_interaction_id)
			active_code_interaction_id = ""
			active_code_data = {}
			scene_keypad_input = ""
			_refresh_room(GameState.current_room_id)
		)
		_refresh_hud_with_message()
		return

	var failure_message := _text(active_code_data, "failure_message", "That code does not work.")
	code_feedback_label.text = failure_message
	GameState.set_message(failure_message)
	_refresh_hud_with_message()
	_play_feedback_sound("wrong_password", 0.42)
	var failure_room := String(active_code_data.get("failure_room", ""))
	if failure_room != "":
		code_overlay.visible = false
		await _play_blink_transition(func():
			active_code_interaction_id = ""
			active_code_data = {}
			scene_keypad_input = ""
			GameState.set_room(failure_room)
			_refresh_room(GameState.current_room_id)
		)
		_refresh_hud_with_message()
		return
	scene_keypad_input = ""
	if code_overlay.visible:
		code_input.grab_focus()
		code_input.select_all()
	_rebuild_hotspots()


func _play_blink_transition(callback: Callable = Callable()) -> void:
	if is_transitioning:
		return

	is_transitioning = true
	blink_overlay.visible = true
	blink_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	blink_flash.color = Color(0, 0, 0, 0)

	var flash_in_tween := create_tween()
	flash_in_tween.set_trans(Tween.TRANS_SINE)
	flash_in_tween.set_ease(Tween.EASE_IN_OUT)
	flash_in_tween.tween_property(blink_flash, "color", Color(0, 0, 0, 1), 0.14)
	await flash_in_tween.finished
	if callback.is_valid():
		callback.call()
	await get_tree().create_timer(0.1).timeout

	var flash_out_tween := create_tween()
	flash_out_tween.set_trans(Tween.TRANS_SINE)
	flash_out_tween.set_ease(Tween.EASE_IN_OUT)
	flash_out_tween.tween_property(blink_flash, "color", Color(0, 0, 0, 0), 0.16)
	await flash_out_tween.finished
	blink_overlay.visible = false
	blink_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	is_transitioning = false
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


func _refresh_inventory_list() -> void:
	inventory_list.clear()
	for item_id: String in GameState.inventory:
		inventory_list.add_item(I18n.item_name(item_id))

	if GameState.inventory.is_empty():
		inventory_list.add_item(I18n.t("ui.inventory.empty"))
		inventory_list.deselect_all()
		return

	if GameState.selected_inventory_item == "":
		inventory_list.deselect_all()
		return

	var selected_index := GameState.inventory.find(GameState.selected_inventory_item)
	if selected_index >= 0:
		inventory_list.select(selected_index)
	else:
		inventory_list.deselect_all()


func _on_inventory_item_clicked(index: int, _at_position: Vector2, mouse_button_index: int) -> void:
	if mouse_button_index != MOUSE_BUTTON_LEFT:
		return
	if index < 0 or index >= GameState.inventory.size():
		return

	var item_id := GameState.inventory[index]
	var was_selected := GameState.is_item_selected(item_id)
	GameState.toggle_selected_item(item_id)
	if was_selected:
		GameState.set_message(I18n.t("ui.unselected_item", {"item": I18n.item_name(item_id)}))
	else:
		GameState.set_message(I18n.t("ui.selected_item", {"item": I18n.item_name(item_id)}))
	_refresh_hud_with_message()


func _refresh_documents_list() -> void:
	documents_list.clear()
	rail_documents_list.clear()
	for document: Dictionary in GameState.unlocked_documents:
		var title := _document_text(document, "title", "Untitled")
		documents_list.add_item(title)
		rail_documents_list.add_item(title)

	if GameState.unlocked_documents.is_empty():
		selected_document_index = -1
		document_title_label.text = I18n.t("ui.documents.empty_title")
		document_source_label.text = I18n.t("ui.documents.empty_source")
		document_text_label.text = ""
		rail_documents_list.add_item(I18n.t("ui.documents.empty_title"))
		rail_documents_list.deselect_all()
		_set_rail_document_empty_state()
		return

	if selected_document_index < 0 or selected_document_index >= GameState.unlocked_documents.size():
		selected_document_index = GameState.unlocked_documents.size() - 1

	documents_list.select(selected_document_index)
	rail_documents_list.select(selected_document_index)
	_show_document(selected_document_index)


func _on_document_selected(index: int) -> void:
	selected_document_index = index
	rail_documents_list.select(index)
	_show_document(index)


func _on_rail_document_selected(index: int) -> void:
	selected_document_index = index
	documents_list.select(index)
	_show_document(index)


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


func _capture_inventory_ids() -> Array[String]:
	var ids: Array[String] = []
	for item_id: String in GameState.inventory:
		ids.append(item_id)
	return ids


func _capture_document_ids() -> Array[String]:
	var ids: Array[String] = []
	for document: Dictionary in GameState.unlocked_documents:
		ids.append(String(document.get("id", "")))
	return ids


func _collect_new_entries(before: Array[String], after: Array[String]) -> Array[String]:
	var new_entries: Array[String] = []
	for entry in after:
		if not before.has(entry):
			new_entries.append(entry)
	return new_entries


func _announce_rail_updates(new_items: Array[String], new_documents: Array[String]) -> void:
	if not new_items.is_empty():
		var item_names: Array[String] = []
		for item_id in new_items:
			item_names.append(I18n.item_name(item_id))
		_show_rail_notice(inventory_section, inventory_notice_label, I18n.t("ui.rail.item_notice", {"items": ", ".join(item_names)}), Color(0.86, 0.76, 0.58, 1.0), true)

	if not new_documents.is_empty():
		selected_document_index = GameState.unlocked_documents.size() - 1
		_refresh_documents_list()
		var document_titles: Array[String] = []
		for document_id in new_documents:
			document_titles.append(_find_document_title(document_id))
		_show_rail_notice(rail_documents_section, rail_documents_notice_label, I18n.t("ui.rail.document_notice", {"documents": ", ".join(document_titles)}), Color(0.73, 0.84, 1.0, 1.0), false)


func _find_document_title(document_id: String) -> String:
	for document: Dictionary in GameState.unlocked_documents:
		if String(document.get("id", "")) == document_id:
			return _document_text(document, "title", "Untitled")
	return "Untitled"


func _show_rail_notice(section_panel: PanelContainer, notice_label: Label, text: String, accent: Color, is_inventory_section: bool) -> void:
	notice_label.text = ""
	notice_label.visible = false
	notice_label.modulate = Color(accent.r, accent.g, accent.b, 0.0)
	# Keep the feedback out of layout flow so rail text never shifts.
	if text == "":
		return

	var highlight_color := Color(
		lerp(1.0, accent.r, 0.20),
		lerp(1.0, accent.g, 0.20),
		lerp(1.0, accent.b, 0.20),
		1.0
	)
	section_panel.self_modulate = highlight_color

	var notice_tween := inventory_notice_tween if is_inventory_section else documents_notice_tween
	if notice_tween != null:
		notice_tween.kill()
	notice_tween = create_tween()
	notice_tween.tween_interval(2.1)
	notice_tween.finished.connect(func() -> void:
		notice_label.visible = false
		notice_label.text = ""
		notice_label.modulate = Color(1, 1, 1, 0)
	)
	if is_inventory_section:
		inventory_notice_tween = notice_tween
	else:
		documents_notice_tween = notice_tween

	var highlight_tween := inventory_highlight_tween if is_inventory_section else documents_highlight_tween
	if highlight_tween != null:
		highlight_tween.kill()
	highlight_tween = create_tween()
	highlight_tween.tween_property(section_panel, "self_modulate", Color(1, 1, 1, 1), 0.55)
	if is_inventory_section:
		inventory_highlight_tween = highlight_tween
	else:
		documents_highlight_tween = highlight_tween



func _build_hotspot_style(background_color: Color, border_color: Color, corner_radius: int = 8) -> StyleBoxFlat:
	return _build_panel_style(background_color, border_color, corner_radius)
