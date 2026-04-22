extends RefCounted


var host: Node
var room_visual_layer: Control
var inventory_list: ItemList
var inventory_section: PanelContainer
var inventory_gain_layer: Control
var screen_margin: Vector2 = Vector2.ZERO
var flash_rooms: Array = []

var room_effect_overlay: Control
var room_vignette_overlay: ColorRect
var room_blackout_cover: ColorRect
var room_flashlight_darkness: ColorRect
var room_flashlight_glow: TextureRect
var room_flashlight_material: ShaderMaterial
var jumpscare_overlay: Control
var jumpscare_flash: ColorRect
var jumpscare_image: TextureRect
var jumpscare_texture: Texture2D
var inventory_slot_texture: Texture2D
var inventory_highlight_tween: Tween
var pending_inventory_gain_origin: Vector2 = Vector2(-10000, -10000)


func setup(main_host: Node, refs: Dictionary) -> void:
	host = main_host
	room_visual_layer = refs["room_visual_layer"]
	inventory_list = refs["inventory_list"]
	inventory_section = refs["inventory_section"]
	inventory_gain_layer = refs["inventory_gain_layer"]
	room_effect_overlay = refs["room_effect_overlay"]
	room_vignette_overlay = refs["room_vignette_overlay"]
	room_blackout_cover = refs["room_blackout_cover"]
	room_flashlight_darkness = refs["room_flashlight_darkness"]
	room_flashlight_glow = refs["room_flashlight_glow"]
	room_flashlight_material = refs["room_flashlight_material"]
	jumpscare_overlay = refs["jumpscare_overlay"]
	jumpscare_flash = refs["jumpscare_flash"]
	jumpscare_image = refs["jumpscare_image"]
	jumpscare_texture = refs["jumpscare_texture"]
	screen_margin = refs.get("screen_margin", Vector2.ZERO)
	flash_rooms = refs.get("flash_rooms", [])


func set_room_vignette_overlay(overlay: ColorRect) -> void:
	room_vignette_overlay = overlay


func set_pending_inventory_gain_origin(origin: Vector2) -> void:
	pending_inventory_gain_origin = origin


func set_pending_inventory_gain_origin_from_control(control: Control) -> void:
	if control == null:
		return
	var control_rect := control.get_global_rect()
	set_pending_inventory_gain_origin(control_rect.position + control_rect.size * 0.5)


func update_room_vignette(current_room_id: String) -> void:
	if room_vignette_overlay == null:
		return
	if room_vignette_overlay.material == null:
		return

	var overlay_size := room_visual_layer.size
	if overlay_size.x <= 0.0 or overlay_size.y <= 0.0:
		return

	var vignette_material := room_vignette_overlay.material as ShaderMaterial
	if vignette_material == null:
		return

	var aspect := overlay_size.x / maxf(overlay_size.y, 1.0)
	var intensity := 0.18
	var inner_radius := 0.54

	if bool(GameState.flags.get("third_floor_flashlight_enabled", false)) and flash_rooms.has(current_room_id):
		intensity = 0.26
		inner_radius = 0.48

	vignette_material.set_shader_parameter("aspect", aspect)
	vignette_material.set_shader_parameter("intensity", intensity)
	vignette_material.set_shader_parameter("inner_radius", inner_radius)


func update_room_effects(room_id: String) -> void:
	if room_effect_overlay == null:
		return

	var flashlight_enabled := bool(GameState.flags.get("third_floor_flashlight_enabled", false))
	var show_blackout_cover := room_id == "fake_third" and not flashlight_enabled and bool(GameState.flags.get("third_floor_blackout_intro_played", false))
	var show_flashlight := flashlight_enabled and flash_rooms.has(room_id)

	room_effect_overlay.visible = show_blackout_cover or show_flashlight
	room_blackout_cover.visible = show_blackout_cover
	room_flashlight_darkness.visible = show_flashlight
	room_flashlight_glow.visible = false
	if show_flashlight:
		update_flashlight_position()


func update_flashlight_position() -> void:
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


func play_photo_jumpscare() -> void:
	if jumpscare_overlay == null:
		return

	host.is_room_sequence_locked = true
	jumpscare_overlay.visible = true
	jumpscare_image.texture = jumpscare_texture
	jumpscare_image.modulate = Color(1, 1, 1, 0)
	jumpscare_flash.color = Color(1, 1, 1, 0)

	await host.get_tree().create_timer(0.22).timeout
	host._play_feedback_sound("jumpscare", 0.95)

	var image_in_tween := host.create_tween()
	image_in_tween.set_trans(Tween.TRANS_SINE)
	image_in_tween.set_ease(Tween.EASE_OUT)
	image_in_tween.tween_property(jumpscare_image, "modulate", Color(1, 1, 1, 1), 0.05)
	await image_in_tween.finished

	for _index in range(2):
		jumpscare_flash.color = Color(1, 1, 1, 0)
		var flash_tween := host.create_tween()
		flash_tween.tween_property(jumpscare_flash, "color", Color(1, 1, 1, 0.92), 0.06)
		flash_tween.tween_property(jumpscare_flash, "color", Color(1, 1, 1, 0), 0.10)
		await flash_tween.finished
		await host.get_tree().create_timer(0.08).timeout

	await host.get_tree().create_timer(0.12).timeout
	jumpscare_overlay.visible = false
	host.is_room_sequence_locked = false


func maybe_play_fake_third_blackout_intro(current_room_id: String) -> void:
	var intro_already_played := bool(GameState.flags.get("third_floor_blackout_intro_played", false))
	var flashlight_enabled := bool(GameState.flags.get("third_floor_flashlight_enabled", false))
	var photo_route_active := bool(GameState.flags.get("stairwell_photo_jumpscare_played", false))
	if intro_already_played or flashlight_enabled or not photo_route_active:
		update_room_effects(current_room_id)
		return

	host.is_room_sequence_locked = true
	GameState.flags["third_floor_blackout_intro_played"] = true
	GameState.flags["first_fake_third_floor_seen"] = true
	GameState.flags["third_floor_flashlight_enabled"] = false
	update_room_effects("fake_third")
	host._play_feedback_sound("cry", 0.92)
	GameState.set_message("")
	host._refresh_hud()
	host._hide_message_popup()

	await host.get_tree().create_timer(0.9).timeout
	GameState.set_message("The whole building suddenly loses power. A baby is crying somewhere in the dark, so you switch on your phone flashlight.")
	host._refresh_hud_with_message(4.2)

	await host.get_tree().create_timer(0.9).timeout
	GameState.flags["third_floor_flashlight_enabled"] = true
	host.is_room_sequence_locked = false
	update_room_effects(current_room_id)
	host._refresh_hud_with_message(2.8)


func ensure_inventory_slot_texture() -> Texture2D:
	if inventory_slot_texture != null:
		return inventory_slot_texture

	var image := Image.create(112, 112, false, Image.FORMAT_RGBA8)
	image.fill(Color(0.11, 0.12, 0.14, 0.06))
	image.fill_rect(Rect2i(4, 4, 104, 104), Color(0.03, 0.04, 0.06, 0.58))
	image.fill_rect(Rect2i(8, 8, 96, 96), Color(0.07, 0.08, 0.10, 0.82))
	image.fill_rect(Rect2i(14, 14, 84, 84), Color(0.95, 0.95, 0.94, 0.05))
	image.fill_rect(Rect2i(14, 86, 84, 12), Color(0.95, 0.95, 0.94, 0.08))

	for x: int in range(4, 108):
		image.set_pixel(x, 4, Color(0.88, 0.80, 0.65, 0.52))
		image.set_pixel(x, 107, Color(0.0, 0.0, 0.0, 0.36))

	for y: int in range(4, 108):
		image.set_pixel(4, y, Color(0.88, 0.80, 0.65, 0.52))
		image.set_pixel(107, y, Color(0.0, 0.0, 0.0, 0.36))

	inventory_slot_texture = ImageTexture.create_from_image(image)
	return inventory_slot_texture


func inventory_icon_for_item(_item_id: String) -> Texture2D:
	return ensure_inventory_slot_texture()


func play_inventory_gain_animation(new_items: Array[String]) -> void:
	if inventory_gain_layer == null or new_items.is_empty():
		return

	var base_origin := _consume_inventory_gain_origin()

	for item_id: String in new_items:
		var item_index := GameState.inventory.find(item_id)
		if item_index < 0:
			continue

		var target_rect := _inventory_item_rect(item_index)
		var card := _create_inventory_gain_card(item_id)
		inventory_gain_layer.add_child(card)

		var start_size := Vector2(132, 132)
		var end_size := Vector2(maxf(target_rect.size.x + 6.0, 108.0), maxf(target_rect.size.y + 6.0, 108.0))
		var start_position := base_origin - start_size * 0.5
		start_position.x = clampf(start_position.x, screen_margin.x + 24.0, host.get_viewport_rect().size.x - start_size.x - screen_margin.x - 24.0)
		start_position.y = clampf(start_position.y, screen_margin.y + 24.0, host.get_viewport_rect().size.y - start_size.y - screen_margin.y - 24.0)
		var end_position := target_rect.position + (target_rect.size - end_size) * 0.5

		card.position = start_position
		card.scale = Vector2(1.0, 1.0)
		card.rotation_degrees = -6.0
		card.size = start_size
		card.custom_minimum_size = start_size

		var tween := host.create_tween()
		tween.set_parallel(true)
		tween.set_trans(Tween.TRANS_CUBIC)
		tween.set_ease(Tween.EASE_OUT)
		tween.tween_property(card, "modulate", Color(1, 1, 1, 1), 0.10)
		tween.tween_property(card, "position", end_position, 0.42)
		tween.tween_property(card, "size", end_size, 0.42)
		tween.tween_property(card, "custom_minimum_size", end_size, 0.42)
		tween.tween_property(card, "scale", Vector2(0.88, 0.88), 0.42)
		tween.tween_property(card, "rotation_degrees", 0.0, 0.36)
		await tween.finished

		_pulse_inventory_section()
		var settle_tween := host.create_tween()
		settle_tween.set_parallel(true)
		settle_tween.set_trans(Tween.TRANS_SINE)
		settle_tween.set_ease(Tween.EASE_IN)
		settle_tween.tween_property(card, "modulate", Color(1, 1, 1, 0.0), 0.12)
		settle_tween.tween_property(card, "scale", Vector2(0.78, 0.78), 0.12)
		await settle_tween.finished
		card.queue_free()
		base_origin += Vector2(18.0, -10.0)
		await host.get_tree().create_timer(0.04).timeout


func _consume_inventory_gain_origin() -> Vector2:
	var origin := pending_inventory_gain_origin
	if origin.x <= -9999.0:
		origin = host.get_viewport().get_mouse_position()
	pending_inventory_gain_origin = Vector2(-10000, -10000)
	return origin


func _inventory_item_rect(index: int) -> Rect2:
	if index < 0 or index >= inventory_list.get_item_count():
		return Rect2(inventory_list.global_position, Vector2(inventory_list.fixed_column_width, inventory_list.fixed_column_width))
	var item_rect := inventory_list.get_item_rect(index)
	return Rect2(inventory_list.global_position + item_rect.position, item_rect.size)


func _create_inventory_gain_card(item_id: String) -> PanelContainer:
	var card := PanelContainer.new()
	card.custom_minimum_size = Vector2(124, 124)
	card.size = card.custom_minimum_size
	card.mouse_filter = Control.MOUSE_FILTER_IGNORE
	card.modulate = Color(1, 1, 1, 0.0)
	card.add_theme_stylebox_override("panel", host._build_panel_style(Color(0.05, 0.06, 0.08, 0.96), Color(0.88, 0.80, 0.65, 0.38), 18))

	var margin := MarginContainer.new()
	margin.set_anchors_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 10)
	margin.add_theme_constant_override("margin_top", 10)
	margin.add_theme_constant_override("margin_right", 10)
	margin.add_theme_constant_override("margin_bottom", 10)
	card.add_child(margin)

	var stack := VBoxContainer.new()
	stack.set_anchors_preset(Control.PRESET_FULL_RECT)
	stack.add_theme_constant_override("separation", 8)
	margin.add_child(stack)

	var icon_rect := TextureRect.new()
	icon_rect.texture = inventory_icon_for_item(item_id)
	icon_rect.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	icon_rect.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	icon_rect.custom_minimum_size = Vector2(92, 92)
	icon_rect.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	icon_rect.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	stack.add_child(icon_rect)

	var label := Label.new()
	label.text = I18n.item_name(item_id)
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.clip_text = true
	label.add_theme_font_size_override("font_size", 12)
	label.add_theme_color_override("font_color", Color(0.96, 0.95, 0.93, 0.98))
	stack.add_child(label)

	return card


func _pulse_inventory_section() -> void:
	if inventory_highlight_tween != null:
		inventory_highlight_tween.kill()
	inventory_section.self_modulate = Color(1.0, 0.97, 0.90, 1.0)
	inventory_highlight_tween = host.create_tween()
	inventory_highlight_tween.set_trans(Tween.TRANS_SINE)
	inventory_highlight_tween.set_ease(Tween.EASE_OUT)
	inventory_highlight_tween.tween_property(inventory_section, "self_modulate", Color(1, 1, 1, 1), 0.45)
