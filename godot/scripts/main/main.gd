extends Control

const MENU_ENDING_TOTAL := 10
const MENU_DOCUMENT_TOTAL := 34
const MENU_ENDING_CATALOG := [
	{"id": "bad_ending", "order": "1/10", "name": "Trapped", "teaser": "You lingered in the residential corridor too long and never made it back out."},
	{"id": "failed_escape_ending", "order": "2/10", "name": "Outside the Door", "teaser": "You reached the first floor, but not in a way that let you leave."},
	{"id": "normal_ending", "order": "3/10", "name": "Leave", "teaser": "You escaped alive, but the truth did not leave with you."},
	{"id": "good_ending_question", "order": "4/10", "name": "Wake Up?", "teaser": "You reached the deepest layer, but it is still unclear whether you woke up or sank further in."},
	{"id": "flee_ending", "order": "5/10", "name": "Flee", "teaser": "You chose not to enter the building at all."},
	{"id": "chapter2_uneasy_reunion", "order": "6/10", "name": "Uneasy Reunion", "teaser": "Locked in Godot for now."},
	{"id": "chapter2_wait_wife", "order": "7/10", "name": "Wait", "teaser": "Locked in Godot for now."},
	{"id": "chapter2_blood_cradle", "order": "8/10", "name": "Blood Cradle", "teaser": "Locked in Godot for now."},
	{"id": "chapter2_monster_return", "order": "9/10", "name": "Old Shadow", "teaser": "Locked in Godot for now."},
	{"id": "chapter2_gun", "order": "10/10", "name": "Gun", "teaser": "Locked in Godot for now."}
]
const MENU_CREDITS := [
	{"role": "Created By", "names": ["prophet"]},
	{"role": "Story", "names": ["prophet"]},
	{"role": "Art & Asset Integration", "names": ["prophet"]},
	{"role": "Programming", "names": ["prophet"]},
	{"role": "Playtesting", "names": ["lyl", "Matthew Sakitis"]},
	{"role": "Special Thanks", "names": ["Everyone who stepped into this nightmare."]}
]

const AUDIO_SOURCES := {
	"bgm": preload("res://godot/sounds/bgm.wav"),
	"eating": preload("res://godot/sounds/eating.mp3"),
	"footstep": preload("res://godot/sounds/footstep.wav"),
	"car": preload("res://godot/sounds/car.mp3"),
	"correct_password": preload("res://godot/sounds/correct password.wav"),
	"wrong_password": preload("res://godot/sounds/wrong.wav"),
	"key": preload("res://godot/sounds/key.mp3"),
	"doc": preload("res://godot/sounds/doc.wav"),
	"cry": preload("res://godot/sounds/cry.wav"),
	"jumpscare": preload("res://godot/sounds/jumpscare.wav"),
	"roar": preload("res://godot/sounds/roar.wav"),
	"ending2": preload("res://godot/sounds/ending2.wav"),
	"scream": preload("res://godot/sounds/scream.wav"),
	"open_something": preload("res://godot/sounds/open something.mp3"),
	"open_room": preload("res://godot/sounds/openroom.mp3")
}

@onready var room_name_label: Label = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TitleColumn/RoomName
@onready var room_hint_label: RichTextLabel = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomHint
@onready var background_texture: TextureRect = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisual/RoomVisualFrame/RoomVisualLayer/BackgroundTexture
@onready var hotspot_layer: Control = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisual/RoomVisualFrame/RoomVisualLayer/HotspotLayer
@onready var interaction_list: VBoxContainer = $RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/InteractionList
@onready var message_label: RichTextLabel = $RootMargin/Layout/CenterColumn/MessagePanel/MessageMargin/MessageValue
@onready var documents_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/DocumentsButton
@onready var objective_button: Button = $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/ObjectiveButton
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

@onready var bgm_player: AudioStreamPlayer = $BGMPlayer
@onready var eating_ambient_player: AudioStreamPlayer = $EatingAmbientPlayer
@onready var footstep_ambient_player: AudioStreamPlayer = $FootstepAmbientPlayer
@onready var transition_player: AudioStreamPlayer = $TransitionPlayer
@onready var ui_sound_player: AudioStreamPlayer = $UISoundPlayer

var selected_document_index: int = -1
var active_inspect_data: Dictionary = {}
var active_code_interaction_id: String = ""
var active_code_data: Dictionary = {}
var is_transitioning: bool = false
var ending_overlay: ColorRect
var ending_card: PanelContainer
var ending_name_label: Label
var ending_summary_label: RichTextLabel
var ending_order_value_label: Label
var ending_endings_value_label: Label
var ending_documents_value_label: Label
var main_menu_overlay: ColorRect
var main_menu_content: VBoxContainer
var main_menu_title_label: Label
var main_menu_body_label: RichTextLabel
var main_menu_stats_label: Label
var main_menu_nav: HBoxContainer
var main_menu_scroll: ScrollContainer
var main_menu_body_stack: VBoxContainer
var main_menu_close_button: Button
var is_main_menu_open: bool = true
var current_menu_tab: String = "home"
var selected_menu_document_id: String = ""
var last_recorded_ending_room_id: String = ""
var has_started_run: bool = false


func _ready() -> void:
	GameState.room_changed.connect(_refresh_room)
	GameState.hud_changed.connect(_refresh_hud)
	hotspot_layer.resized.connect(_rebuild_hotspots)
	documents_button.pressed.connect(_show_documents_overlay)
	objective_button.pressed.connect(_show_objective_overlay)
	documents_close_button.pressed.connect(_hide_documents_overlay)
	objective_close_button.pressed.connect(_hide_objective_overlay)
	documents_list.item_selected.connect(_on_document_selected)
	inspect_close_button.pressed.connect(_hide_inspect_overlay)
	inspect_confirm_button.pressed.connect(_on_inspect_confirm_pressed)
	code_cancel_button.pressed.connect(_hide_code_overlay)
	code_confirm_button.pressed.connect(_submit_code_input)
	code_input.text_submitted.connect(_on_code_text_submitted)
	
	# Start BGM
	bgm_player.play()
	_sync_scene_ambient(GameState.current_room_id)
	_build_web_ui_overlays()
	_apply_web_ui_theme()
	_apply_static_translations()
	_refresh_room(GameState.current_room_id)
	_refresh_hud()
	_show_main_menu_home()


func _text(data: Dictionary, field: String, fallback: String = "") -> String:
	return I18n.text_from(data, field, fallback)


func _document_text(data: Dictionary, field: String, fallback: String = "") -> String:
	return I18n.text_from(data, field, fallback)


func _apply_static_translations() -> void:
	$RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TitleColumn/Title.text = I18n.t("game.title")
	$RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/MenuButton.text = I18n.t("ui.top.menu")
	$RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions/RestartButton.text = I18n.t("ui.top.restart")
	objective_button.text = I18n.t("ui.top.goal")
	documents_button.text = I18n.t("ui.top.files")
	$RootMargin/Layout/RightRail/HUDMargin/HUDStack/InventoryTitle.text = I18n.t("ui.inventory.title")
	$DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsHeader/DocumentsTitle.text = I18n.t("ui.documents.title")
	documents_close_button.text = I18n.t("ui.menu.close")
	$ObjectiveOverlay/ObjectiveCenter/ObjectivePanel/ObjectiveMargin/ObjectiveStack/ObjectiveHeader/ObjectiveTitle.text = I18n.t("ui.objective.title")
	objective_close_button.text = I18n.t("ui.menu.close")
	inspect_close_button.text = I18n.t("ui.inspect.close")
	inspect_confirm_button.text = I18n.t("ui.inspect.continue")
	$CodeOverlay/CodeCenter/CodePanel/CodeMargin/CodeStack/CodeTitle.text = I18n.t("ui.code.title")
	code_cancel_button.text = I18n.t("ui.code.cancel")
	code_confirm_button.text = I18n.t("ui.code.confirm")


func _refresh_room(room_id: String) -> void:
	var room: Dictionary = SceneRouter.get_room(room_id)
	room_name_label.text = _text(room, "title", I18n.t("ui.room.unknown"))
	room_hint_label.text = _text(room, "hint", "")
	_apply_background(room.get("background", ""))
	_track_ending_unlock(room_id, room)
	_sync_scene_ambient(room_id)
	
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
	elif room_id == "thirdFloorHallBlackout":
		_play_feedback_sound("cry", 0.92)
		# Add other logic if needed
	elif room_id == "thirdFloorHallFlashlight":
		_play_feedback_sound("scream", 0.96)
	elif room_id == "blockedStairwellPhoto":
		_play_feedback_sound("jumpscare", 0.95)

	for child: Node in interaction_list.get_children():
		child.queue_free()

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


func _refresh_hud() -> void:
	message_label.text = GameState.message_text
	objective_value_label.text = GameState.objective_text
	_refresh_documents_list()
	if ending_overlay != null and ending_overlay.visible:
		ending_documents_value_label.text = I18n.t("ui.files.count_short", {"count": GameState.unlocked_documents.size()})
	if is_main_menu_open and main_menu_overlay != null and main_menu_overlay.visible:
		_refresh_main_menu_view()


func _on_interaction_requested(interaction_id: String) -> void:
	_on_interaction_pressed(interaction_id)


func _on_interaction_pressed(interaction_id: String) -> void:
	if is_main_menu_open:
		return
	if is_transitioning:
		return

	var interaction: Dictionary = SceneRouter.get_interaction(GameState.current_room_id, interaction_id)
	if interaction.is_empty():
		return
	if not SceneRouter.is_interaction_ready(interaction):
		GameState.set_message(SceneRouter.get_interaction_block_message(interaction))
		_refresh_hud()
		return

	var inspect_data: Dictionary = interaction.get("inspect", {})
	if not inspect_data.is_empty():
		SceneRouter.apply_interaction(interaction_id)
		_refresh_room(GameState.current_room_id)
		_refresh_hud()
		_show_inspect_overlay(inspect_data)
		return

	var code_input_data: Dictionary = interaction.get("code_input", {})
	if not code_input_data.is_empty():
		active_code_interaction_id = interaction_id
		active_code_data = code_input_data
		GameState.set_message(_text(interaction, "message", GameState.message_text))
		_refresh_hud()
		_show_code_overlay(code_input_data)
		return

	if interaction.get("goto_room", "") != "":
		var transition_audio = interaction.get("transition_sound", "footstep")
		await _play_blink_transition(func():
			SceneRouter.apply_interaction(interaction_id)
			_refresh_room(GameState.current_room_id)
			_play_scene_transition_sound(transition_audio)
		)

	
	else:
		SceneRouter.apply_interaction(interaction_id)
		GameState.set_message(_text(interaction, "message", ""))
		_refresh_room(GameState.current_room_id)
	

	_refresh_hud()
	
	# Play UI sounds based on interaction
	var sound_kind = interaction.get("sound", "")
	if sound_kind != "":
		_play_ui_sound(sound_kind)
	
	# Legacy hardcoded sounds
	if interaction_id == "trunk":
		_play_ui_sound("key")
	elif interaction_id == "mailbox":
		_play_ui_sound("doc")
	elif interaction_id in ["door", "elevator"]:
		_play_ui_sound("open")


func _sync_scene_ambient(room_id: String) -> void:
	var should_play_eating = room_id == "thirdFloorResidential"
	var should_play_footsteps = GameState.flags.get("stairwellPhotoFootstepsActive", false) and not ["thirdFloorHall", "thirdFloorResidential"].has(room_id)
	
	if not should_play_eating:
		eating_ambient_player.stop()
	else:
		if not eating_ambient_player.playing:
			eating_ambient_player.play()
	
	if not should_play_footsteps:
		footstep_ambient_player.stop()
	else:
		if not footstep_ambient_player.playing:
			footstep_ambient_player.play()

func _play_ui_sound(kind: String) -> void:
	var stream: AudioStream
	match kind:
		"key":
			stream = AUDIO_SOURCES["key"]
			ui_sound_player.volume_db = linear_to_db(0.5)
		"doc":
			stream = AUDIO_SOURCES["doc"]
			ui_sound_player.volume_db = linear_to_db(0.46)
		"open":
			stream = AUDIO_SOURCES["open_something"]
			ui_sound_player.volume_db = linear_to_db(0.46)
		_:
			return
	ui_sound_player.stream = stream
	ui_sound_player.play()

func _play_feedback_sound(audio_key: String, volume: float = 0.42, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	var stream = AUDIO_SOURCES.get(audio_key)
	if stream:
		transition_player.stream = stream
		transition_player.volume_db = linear_to_db(volume)
		transition_player.play()
		if wait_for_completion:
			await get_tree().create_timer(wait_ms).timeout

func _play_scene_transition_sound(audio_key: String = "footstep", volume: float = 0.38, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	var stream = AUDIO_SOURCES.get(audio_key)
	if not stream:
		return
	
	if audio_key == "footstep":
		# Play three times with offsets
		transition_player.stream = stream
		transition_player.volume_db = linear_to_db(volume)
		transition_player.play()
		await get_tree().create_timer(0.26).timeout
		transition_player.play()
		await get_tree().create_timer(0.26).timeout
		transition_player.play()
	else:
		transition_player.stream = stream
		transition_player.volume_db = linear_to_db(volume)
		transition_player.play()
		if wait_for_completion:
			await get_tree().create_timer(wait_ms).timeout

func _apply_background(texture_path: String) -> void:
	if texture_path == "":
		background_texture.texture = null
		return
	background_texture.texture = load(texture_path)

func _build_web_ui_overlays() -> void:
	var grain_overlay := ColorRect.new()
	grain_overlay.name = "GrainOverlay"
	grain_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	grain_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	grain_overlay.color = Color(1, 1, 1, 0.03)
	add_child(grain_overlay)
	move_child(grain_overlay, 1)

	ending_overlay = ColorRect.new()
	ending_overlay.name = "EndingOverlay"
	ending_overlay.visible = false
	ending_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	ending_overlay.color = Color(0.02, 0.025, 0.035, 0.42)
	ending_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
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

	main_menu_overlay = ColorRect.new()
	main_menu_overlay.name = "MainMenuOverlay"
	main_menu_overlay.visible = false
	main_menu_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	main_menu_overlay.color = Color(0.02, 0.025, 0.035, 0.94)
	add_child(main_menu_overlay)
	move_child(main_menu_overlay, get_child_count() - 1)

	var menu_center := CenterContainer.new()
	menu_center.set_anchors_preset(Control.PRESET_FULL_RECT)
	main_menu_overlay.add_child(menu_center)

	var menu_shell := PanelContainer.new()
	menu_shell.custom_minimum_size = Vector2(760, 560)
	menu_center.add_child(menu_shell)

	var menu_margin := MarginContainer.new()
	menu_margin.add_theme_constant_override("margin_left", 28)
	menu_margin.add_theme_constant_override("margin_top", 28)
	menu_margin.add_theme_constant_override("margin_right", 28)
	menu_margin.add_theme_constant_override("margin_bottom", 28)
	menu_shell.add_child(menu_margin)

	main_menu_content = VBoxContainer.new()
	main_menu_content.add_theme_constant_override("separation", 18)
	menu_margin.add_child(main_menu_content)

	var menu_kicker := Label.new()
	menu_kicker.text = "A Point & Click Horror Game"
	menu_kicker.add_theme_font_size_override("font_size", 12)
	menu_kicker.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.84))
	main_menu_content.add_child(menu_kicker)

	main_menu_title_label = Label.new()
	main_menu_title_label.text = "Day Of Arrival"
	main_menu_title_label.add_theme_font_size_override("font_size", 48)
	main_menu_title_label.add_theme_color_override("font_color", Color(0.97, 0.96, 0.92, 1))
	main_menu_content.add_child(main_menu_title_label)

	main_menu_body_label = RichTextLabel.new()
	main_menu_body_label.bbcode_enabled = true
	main_menu_body_label.fit_content = true
	main_menu_body_label.scroll_active = false
	main_menu_body_label.add_theme_color_override("default_color", Color(0.74, 0.78, 0.84, 0.96))
	main_menu_content.add_child(main_menu_body_label)

	var divider := ColorRect.new()
	divider.custom_minimum_size = Vector2(0, 1)
	divider.color = Color(0.85, 0.76, 0.60, 0.24)
	main_menu_content.add_child(divider)

	main_menu_stats_label = Label.new()
	main_menu_stats_label.add_theme_font_size_override("font_size", 14)
	main_menu_stats_label.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	main_menu_content.add_child(main_menu_stats_label)

	var menu_nav_row := HBoxContainer.new()
	menu_nav_row.add_theme_constant_override("separation", 10)
	main_menu_content.add_child(menu_nav_row)

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
	main_menu_content.add_child(main_menu_scroll)

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
	value.add_theme_font_size_override("font_size", 24)
	value.add_theme_color_override("font_color", Color(0.95, 0.93, 0.88, 1))
	stack.add_child(value)

	return panel


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
	$Background.color = Color(0.03, 0.04, 0.06, 1)
	$RootMargin/Layout/CenterColumn/TopBar.add_theme_stylebox_override("panel", _build_panel_style(Color(0.06, 0.08, 0.11, 0.88), Color(0.73, 0.84, 1.0, 0.12), 24))
	$RootMargin/Layout/CenterColumn/RoomViewport.add_theme_stylebox_override("panel", _build_panel_style(Color(0.06, 0.08, 0.11, 0.88), Color(0.73, 0.84, 1.0, 0.12), 24))
	$RootMargin/Layout/CenterColumn/MessagePanel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.08, 0.10, 0.14, 0.96), Color(0.85, 0.76, 0.60, 0.42), 18))
	$RootMargin/Layout/RightRail.add_theme_stylebox_override("panel", _build_panel_style(Color(0.06, 0.08, 0.11, 0.88), Color(0.73, 0.84, 1.0, 0.12), 24))
	$RootMargin/Layout/CenterColumn/RoomViewport/RoomContent/RoomStack/RoomVisual/RoomVisualFrame.add_theme_stylebox_override("panel", _build_panel_style(Color(0.03, 0.04, 0.05, 0.96), Color(0.73, 0.84, 1.0, 0.08), 22))

	room_name_label.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 1))
	room_hint_label.add_theme_color_override("default_color", Color(0.59, 0.64, 0.71, 1))
	message_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
	objective_value_label.add_theme_color_override("default_color", Color(0.93, 0.95, 0.97, 0.96))
	document_text_label.add_theme_color_override("default_color", Color(0.94, 0.93, 0.88, 0.98))

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

	_style_overlay_panel($InspectOverlay/InspectCenter/InspectPanel)
	_style_overlay_panel($CodeOverlay/CodeCenter/CodePanel)
	_style_overlay_panel($DocumentsOverlay/DocumentsCenter/DocumentsPanel)
	_style_overlay_panel($ObjectiveOverlay/ObjectiveCenter/ObjectivePanel)
	_style_overlay_panel($DocumentsOverlay/DocumentsCenter/DocumentsPanel/DocumentsMargin/DocumentsStack/DocumentsBody/DocumentViewer)
	_style_overlay_panel($InspectOverlay/InspectCenter/InspectPanel/InspectMargin/InspectStack/InspectImageFrame, 18)
	_style_overlay_panel(main_menu_overlay.get_child(0).get_child(0), 26)

	documents_list.add_theme_stylebox_override("panel", _build_panel_style(Color(0.04, 0.05, 0.07, 0.72), Color(0.73, 0.84, 1.0, 0.08), 14))
	$RootMargin/Layout/RightRail/HUDMargin/HUDStack/InventoryValue.add_theme_stylebox_override("panel", _build_panel_style(Color(0.04, 0.05, 0.07, 0.72), Color(0.73, 0.84, 1.0, 0.08), 14))
	code_input.add_theme_stylebox_override("normal", _build_panel_style(Color(0.04, 0.05, 0.07, 0.92), Color(0.85, 0.76, 0.60, 0.34), 12))
	code_input.add_theme_stylebox_override("focus", _build_panel_style(Color(0.05, 0.06, 0.08, 0.96), Color(0.85, 0.76, 0.60, 0.58), 12))
	code_input.add_theme_color_override("font_color", Color(0.96, 0.96, 0.95, 1))
	code_input.add_theme_color_override("placeholder_color", Color(0.59, 0.64, 0.71, 0.9))


func _style_overlay_panel(panel: PanelContainer, radius: int = 20) -> void:
	panel.add_theme_stylebox_override("panel", _build_panel_style(Color(0.05, 0.07, 0.10, 0.96), Color(0.85, 0.76, 0.60, 0.22), radius))


func _add_menu_button() -> void:
	var top_actions := $RootMargin/Layout/CenterColumn/TopBar/TopBarMargin/TopBarLayout/TopActions
	if top_actions.has_node("MenuButton"):
		return
	var menu_button := Button.new()
	menu_button.name = "MenuButton"
	menu_button.text = I18n.t("ui.top.menu")
	menu_button.pressed.connect(_show_main_menu_home)
	top_actions.add_child(menu_button)
	top_actions.move_child(menu_button, 0)
	_style_button(menu_button, false)


func _clear_main_menu_content() -> void:
	if main_menu_nav == null or main_menu_body_stack == null:
		return
	for child: Node in main_menu_nav.get_children():
		child.queue_free()
	for child: Node in main_menu_body_stack.get_children():
		child.queue_free()


func _show_main_menu_home() -> void:
	current_menu_tab = "home"
	is_main_menu_open = true
	main_menu_overlay.visible = true
	main_menu_close_button.visible = _can_resume_game()
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.home.title")
	main_menu_body_label.text = I18n.t("ui.menu.home.body")
	main_menu_stats_label.text = I18n.t("ui.menu.home.stats", {
		"endings": GameState.unlocked_endings.size(),
		"ending_total": MENU_ENDING_TOTAL,
		"documents": GameState.archived_documents.size(),
		"document_total": MENU_DOCUMENT_TOTAL
	})

	var actions: Array[Dictionary] = []
	if _can_resume_game():
		actions.append({"label": I18n.t("ui.menu.action.continue"), "call": "_close_main_menu", "accent": true})
	else:
		actions.append({"label": I18n.t("ui.menu.action.start"), "call": "_close_main_menu", "accent": true})
	actions.append({"label": I18n.t("ui.menu.action.restart"), "call": "_restart_from_menu", "accent": false})
	actions.append({"label": I18n.t("ui.menu.action.endings"), "call": "_show_main_menu_endings", "accent": false})
	actions.append({"label": I18n.t("ui.menu.action.documents"), "call": "_show_main_menu_documents", "accent": false})
	actions.append({"label": I18n.t("ui.menu.action.credits"), "call": "_show_main_menu_credits", "accent": false})

	for action in actions:
		var button := Button.new()
		button.text = action["label"]
		button.pressed.connect(Callable(self, String(action["call"])))
		_style_button(button, bool(action["accent"]))
		main_menu_body_stack.add_child(button)


func _show_main_menu_endings() -> void:
	current_menu_tab = "endings"
	is_main_menu_open = true
	main_menu_overlay.visible = true
	main_menu_close_button.visible = _can_resume_game()
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.endings.title")
	main_menu_body_label.text = I18n.t("ui.menu.endings.body")
	main_menu_stats_label.text = I18n.t("ui.menu.endings.stats", {"count": GameState.unlocked_endings.size(), "total": MENU_ENDING_TOTAL})
	_add_menu_nav_button(I18n.t("ui.menu.nav.home"), _show_main_menu_home, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.endings"), _show_main_menu_endings, true)
	_add_menu_nav_button(I18n.t("ui.menu.nav.documents"), _show_main_menu_documents, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.credits"), _show_main_menu_credits, false)

	for ending in MENU_ENDING_CATALOG:
		var unlocked := GameState.unlocked_endings.has(String(ending["id"]))
		main_menu_body_stack.add_child(_build_archive_card(
			String(ending["order"]),
			String(ending["name"]) if unlocked else I18n.t("ui.menu.endings.locked_name"),
			String(ending["teaser"]) if unlocked else I18n.t("ui.menu.endings.locked_body"),
			I18n.t("ui.menu.endings.triggered", {"count": GameState.get_ending_trigger_count(String(ending["id"]))}),
			unlocked
		))


func _show_main_menu_documents() -> void:
	current_menu_tab = "documents"
	is_main_menu_open = true
	main_menu_overlay.visible = true
	main_menu_close_button.visible = _can_resume_game()
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.documents.title")
	main_menu_body_label.text = I18n.t("ui.menu.documents.body")
	main_menu_stats_label.text = I18n.t("ui.menu.documents.stats", {"count": GameState.archived_documents.size(), "total": MENU_DOCUMENT_TOTAL})
	_add_menu_nav_button(I18n.t("ui.menu.nav.home"), _show_main_menu_home, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.endings"), _show_main_menu_endings, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.documents"), _show_main_menu_documents, true)
	_add_menu_nav_button(I18n.t("ui.menu.nav.credits"), _show_main_menu_credits, false)

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
	current_menu_tab = "credits"
	is_main_menu_open = true
	main_menu_overlay.visible = true
	main_menu_close_button.visible = _can_resume_game()
	_clear_main_menu_content()
	main_menu_title_label.text = I18n.t("ui.menu.credits.title")
	main_menu_body_label.text = I18n.t("ui.menu.credits.body")
	main_menu_stats_label.text = I18n.t("ui.menu.credits.stats")
	_add_menu_nav_button(I18n.t("ui.menu.nav.home"), _show_main_menu_home, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.endings"), _show_main_menu_endings, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.documents"), _show_main_menu_documents, false)
	_add_menu_nav_button(I18n.t("ui.menu.nav.credits"), _show_main_menu_credits, true)

	for entry in MENU_CREDITS:
		main_menu_body_stack.add_child(_build_credit_block(String(entry["role"]), entry["names"]))


func _close_main_menu() -> void:
	has_started_run = true
	is_main_menu_open = false
	main_menu_overlay.visible = false


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

	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 16)
	margin.add_theme_constant_override("margin_top", 16)
	margin.add_theme_constant_override("margin_right", 16)
	margin.add_theme_constant_override("margin_bottom", 16)
	card.add_child(margin)

	var stack := VBoxContainer.new()
	stack.add_theme_constant_override("separation", 8)
	margin.add_child(stack)

	var role_label := Label.new()
	role_label.text = role
	role_label.add_theme_font_size_override("font_size", 18)
	role_label.add_theme_color_override("font_color", Color(0.847, 0.765, 0.604, 0.92))
	stack.add_child(role_label)

	for name_variant in names:
		var name_label := Label.new()
		name_label.text = String(name_variant)
		name_label.add_theme_color_override("font_color", Color(0.93, 0.95, 0.97, 0.96))
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
	code_prompt_label.text = _text(code_input_data, "prompt", "Enter the code")
	code_feedback_label.text = ""
	code_input.text = ""
	code_overlay.visible = true
	code_input.grab_focus()


func _hide_code_overlay() -> void:
	active_code_interaction_id = ""
	active_code_data = {}
	code_input.text = ""
	code_feedback_label.text = ""
	code_overlay.visible = false


func _on_code_text_submitted(_text: String) -> void:
	_submit_code_input()


func _submit_code_input() -> void:
	if is_transitioning:
		return

	var entered_code := code_input.text.strip_edges().replace(" ", "")
	var expected_code := String(active_code_data.get("solution", ""))
	if entered_code == expected_code and active_code_interaction_id != "":
		await _play_feedback_sound("correct_password", 0.42, true, 4.0)
		code_overlay.visible = false
		await _play_blink_transition(func():
			SceneRouter.apply_interaction(active_code_interaction_id)
			active_code_interaction_id = ""
			active_code_data = {}
			_refresh_room(GameState.current_room_id)
		)
		_refresh_hud()
		return

	var failure_message := _text(active_code_data, "failure_message", "That code does not work.")
	code_feedback_label.text = failure_message
	GameState.set_message(failure_message)
	_refresh_hud()
	_play_feedback_sound("wrong_password", 0.42)
	var failure_room := String(active_code_data.get("failure_room", ""))
	if failure_room != "":
		code_overlay.visible = false
		await _play_blink_transition(func():
			active_code_interaction_id = ""
			active_code_data = {}
			GameState.set_room(failure_room)
			_refresh_room(GameState.current_room_id)
		)
		_refresh_hud()
		return
	code_input.grab_focus()
	code_input.select_all()


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


func _refresh_documents_list() -> void:
	documents_list.clear()
	for document: Dictionary in GameState.unlocked_documents:
		documents_list.add_item(_document_text(document, "title", "Untitled"))

	if GameState.unlocked_documents.is_empty():
		selected_document_index = -1
		document_title_label.text = I18n.t("ui.documents.empty_title")
		document_source_label.text = I18n.t("ui.documents.empty_source")
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
	document_title_label.text = _document_text(document, "title", "Untitled")
	document_source_label.text = _document_text(document, "source", "")
	document_text_label.text = _document_text(document, "body", "")


func _build_hotspot_style(background_color: Color, border_color: Color, corner_radius: int = 8) -> StyleBoxFlat:
	return _build_panel_style(background_color, border_color, corner_radius)
