extends RefCounted


class CursorOverlay:
	extends Control

	var cursor_style: String = "default"
	var pulse_amount: float = 0.0

	func _init() -> void:
		mouse_filter = Control.MOUSE_FILTER_IGNORE
		set_anchors_preset(Control.PRESET_TOP_LEFT)
		size = Vector2(44, 44)
		custom_minimum_size = size
		z_index = 200

	func set_cursor_style(next_style: String) -> void:
		if cursor_style == next_style:
			return
		cursor_style = next_style
		queue_redraw()

	func set_pulse(amount: float) -> void:
		pulse_amount = amount
		queue_redraw()

	func _draw() -> void:
		var center := size * 0.5
		var pulse_scale := 1.0 + pulse_amount * 0.34
		var dot_radius := 3.2 * pulse_scale
		var ring_radius := 13.0 * pulse_scale
		var ring_width := 2.4
		var ring_color := Color(0.0, 0.0, 0.0, 1.0)
		var dot_color := Color(0.0, 0.0, 0.0, 1.0)

		match cursor_style:
			"hover":
				ring_radius = 17.0 * pulse_scale
				ring_width = 2.8
			"back":
				ring_radius = 17.0 * pulse_scale
				ring_width = 2.8
			"document":
				ring_radius = 17.0 * pulse_scale
				ring_width = 2.8
				dot_color = Color(0.0, 0.0, 0.0, 0.0)

		draw_circle(center, dot_radius, dot_color)
		draw_arc(center, ring_radius, 0.0, TAU, 48, ring_color, ring_width)

		if cursor_style == "back":
			var arrow_color := Color(0.0, 0.0, 0.0, 0.98)
			draw_line(center + Vector2(7, 0), center + Vector2(-6, 0), arrow_color, 2.6)
			draw_line(center + Vector2(-6, 0), center + Vector2(-1, -5), arrow_color, 2.6)
			draw_line(center + Vector2(-6, 0), center + Vector2(-1, 5), arrow_color, 2.6)
		elif cursor_style == "document":
			var paper_color := Color(0.0, 0.0, 0.0, 0.98)
			draw_rect(Rect2(center + Vector2(-5, -6), Vector2(10, 12)), paper_color, false, 2.0)
			draw_line(center + Vector2(-3, -1), center + Vector2(3, -1), paper_color, 1.8)
			draw_line(center + Vector2(-3, 3), center + Vector2(3, 3), paper_color, 1.8)


var host: Node
var custom_cursor: CursorOverlay
var current_cursor_style: String = "default"
var cursor_pulse_tween: Tween


func setup(main_host: Node) -> void:
	host = main_host
	Input.set_mouse_mode(Input.MOUSE_MODE_HIDDEN)


func build_overlay() -> Control:
	custom_cursor = CursorOverlay.new()
	set_cursor_style("default")
	return custom_cursor


func set_cursor_style(next_style: String) -> void:
	current_cursor_style = next_style
	if custom_cursor != null:
		custom_cursor.set_cursor_style(next_style)


func pulse_cursor(amount: float = 1.0, duration: float = 0.22) -> void:
	if custom_cursor == null:
		return
	if cursor_pulse_tween != null:
		cursor_pulse_tween.kill()
	custom_cursor.set_pulse(amount)
	cursor_pulse_tween = host.create_tween()
	cursor_pulse_tween.tween_method(func(value: float) -> void:
		if custom_cursor != null:
			custom_cursor.set_pulse(value)
	, amount, 0.0, duration)


func update_custom_cursor() -> void:
	if custom_cursor == null:
		return
	var mouse_position := host.get_viewport().get_mouse_position()
	custom_cursor.position = mouse_position - (custom_cursor.size * 0.5)


func cursor_style_for_interaction(interaction: Dictionary) -> String:
	if not interaction.get("documents", []).is_empty():
		return "document"
	if String(interaction.get("ui_style", "")) == "corner_back":
		return "back"
	var interaction_id := String(interaction.get("id", ""))
	if interaction_id.begins_with("back") or interaction_id.contains("back"):
		return "back"
	return "hover"


func on_hotspot_hover_entered(interaction: Dictionary, button: Button) -> void:
	host._animate_hotspot_hover(button, true)
	set_cursor_style(cursor_style_for_interaction(interaction))
	pulse_cursor(0.55, 0.18)


func on_hotspot_hover_exited(button: Button) -> void:
	host._animate_hotspot_hover(button, false)
	set_cursor_style("default")
