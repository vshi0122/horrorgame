extends ColorRect

signal puzzle_solved(flag_name: String, message: String)

const SWITCH_TARGET := [true, false, true, true]
const PUZZLE_TARGET := [1, 2, 3, 4, 5, 6, 7, 8, 9]
const CLOCK_TARGET_HOUR := 10
const CLOCK_TARGET_MINUTE := 30

var puzzle_kind := ""
var puzzle_tiles := [1, 6, 3, 4, 2, 9, 7, 5, 8]
var selected_puzzle_index := -1
var puzzle_buttons: Array[Button] = []
var switches := [false, true, false, false]
var switch_buttons: Array[Button] = []
var clock_hour := 7
var clock_minute := 0

var title_label: Label
var hint_label: RichTextLabel
var body: VBoxContainer
var status_label: Label


func _ready() -> void:
	name = "EndingWakePuzzleOverlay"
	color = Color(0.0, 0.0, 0.0, 0.72)
	mouse_filter = Control.MOUSE_FILTER_STOP
	set_anchors_preset(Control.PRESET_FULL_RECT)
	visible = false
	_build_shell()


func open(kind: String) -> void:
	puzzle_kind = kind
	puzzle_tiles = [1, 6, 3, 4, 2, 9, 7, 5, 8]
	selected_puzzle_index = -1
	switches = [false, true, false, false]
	clock_hour = 7
	clock_minute = 0
	visible = true
	_rebuild_body()


func close() -> void:
	visible = false


func _build_shell() -> void:
	var center := CenterContainer.new()
	center.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(center)

	var panel := PanelContainer.new()
	panel.custom_minimum_size = Vector2(640, 500)
	var style := StyleBoxFlat.new()
	style.bg_color = Color(0.045, 0.05, 0.055, 0.98)
	style.border_color = Color(0.72, 0.66, 0.52, 0.44)
	style.set_border_width_all(1)
	style.set_corner_radius_all(10)
	panel.add_theme_stylebox_override("panel", style)
	center.add_child(panel)

	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 24)
	margin.add_theme_constant_override("margin_top", 20)
	margin.add_theme_constant_override("margin_right", 24)
	margin.add_theme_constant_override("margin_bottom", 22)
	panel.add_child(margin)

	var stack := VBoxContainer.new()
	stack.add_theme_constant_override("separation", 14)
	margin.add_child(stack)

	var header := HBoxContainer.new()
	header.add_theme_constant_override("separation", 12)
	stack.add_child(header)

	title_label = Label.new()
	title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	title_label.add_theme_font_size_override("font_size", 30)
	title_label.add_theme_color_override("font_color", Color(0.95, 0.92, 0.84, 1.0))
	header.add_child(title_label)

	var close_button := Button.new()
	close_button.text = "关闭"
	close_button.custom_minimum_size = Vector2(96, 42)
	close_button.pressed.connect(close)
	header.add_child(close_button)

	hint_label = RichTextLabel.new()
	hint_label.bbcode_enabled = true
	hint_label.fit_content = true
	hint_label.scroll_active = false
	hint_label.add_theme_color_override("default_color", Color(0.78, 0.84, 0.82, 1.0))
	stack.add_child(hint_label)

	body = VBoxContainer.new()
	body.size_flags_vertical = Control.SIZE_EXPAND_FILL
	body.add_theme_constant_override("separation", 12)
	stack.add_child(body)

	status_label = Label.new()
	status_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	status_label.add_theme_font_size_override("font_size", 18)
	status_label.add_theme_color_override("font_color", Color(0.86, 0.82, 0.70, 1.0))
	stack.add_child(status_label)


func _rebuild_body() -> void:
	for child in body.get_children():
		child.queue_free()
	puzzle_buttons.clear()
	switch_buttons.clear()

	match puzzle_kind:
		"puzzle":
			_build_puzzle_body()
		"switch":
			_build_switch_body()
		"clock":
			_build_clock_body()
		_:
			title_label.text = "谜题"
			hint_label.text = "这里什么也没有。"
			status_label.text = ""


func _build_puzzle_body() -> void:
	title_label.text = "左墙：拼图"
	hint_label.text = "点击两块拼图交换位置。把九块拼图按 1 到 9 的顺序复原。"
	status_label.text = "拼图还没有对齐。"

	var grid := GridContainer.new()
	grid.columns = 3
	grid.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	grid.add_theme_constant_override("h_separation", 10)
	grid.add_theme_constant_override("v_separation", 10)
	body.add_child(grid)

	for index in range(9):
		var button := Button.new()
		button.custom_minimum_size = Vector2(128, 84)
		button.add_theme_font_size_override("font_size", 22)
		button.pressed.connect(_select_or_swap_puzzle_piece.bind(index))
		puzzle_buttons.append(button)
		grid.add_child(button)
	_refresh_puzzle_buttons()


func _select_or_swap_puzzle_piece(index: int) -> void:
	if selected_puzzle_index == -1:
		selected_puzzle_index = index
		status_label.text = "已选中一块拼图，再点另一块进行交换。"
		_refresh_puzzle_buttons()
		return

	if selected_puzzle_index == index:
		selected_puzzle_index = -1
		status_label.text = "选择已取消。"
		_refresh_puzzle_buttons()
		return

	var previous_value: int = int(puzzle_tiles[selected_puzzle_index])
	puzzle_tiles[selected_puzzle_index] = puzzle_tiles[index]
	puzzle_tiles[index] = previous_value
	selected_puzzle_index = -1
	if puzzle_tiles == PUZZLE_TARGET:
		status_label.text = "拼图复原了。"
		puzzle_solved.emit("ending_puzzle_solved", "左墙拼图复原，墙内传来锁舌松开的声音。")
		close()
		return
	status_label.text = "两块拼图换了位置。"
	_refresh_puzzle_buttons()


func _refresh_puzzle_buttons() -> void:
	for index in range(puzzle_buttons.size()):
		var button := puzzle_buttons[index]
		button.text = "Piece\n%d" % int(puzzle_tiles[index])
		button.modulate = Color(0.92, 0.80, 0.54, 1.0) if selected_puzzle_index == index else Color(1, 1, 1, 1)


func _build_switch_body() -> void:
	title_label.text = "右墙：开关谜题"
	hint_label.text = "四枚开关从左到右排列。让它们变成亮、暗、亮、亮。"
	status_label.text = "墙里的继电器还没有接通。"

	var row := HBoxContainer.new()
	row.alignment = BoxContainer.ALIGNMENT_CENTER
	row.add_theme_constant_override("separation", 14)
	body.add_child(row)

	for index in range(4):
		var button := Button.new()
		button.custom_minimum_size = Vector2(112, 82)
		button.add_theme_font_size_override("font_size", 22)
		button.pressed.connect(_toggle_switch.bind(index))
		switch_buttons.append(button)
		row.add_child(button)
	_refresh_switch_buttons()


func _toggle_switch(index: int) -> void:
	switches[index] = not bool(switches[index])
	if switches == SWITCH_TARGET:
		status_label.text = "开关接通了。"
		puzzle_solved.emit("ending_switch_solved", "右墙开关全部归位，稳定的电流声填满房间。")
		close()
		return
	status_label.text = "开关发出一声轻响。"
	_refresh_switch_buttons()


func _refresh_switch_buttons() -> void:
	for index in range(switch_buttons.size()):
		var button := switch_buttons[index]
		var enabled := bool(switches[index])
		button.text = "开关 %d\n%s" % [index + 1, "亮" if enabled else "暗"]
		button.modulate = Color(0.72, 1.0, 0.72, 1.0) if enabled else Color(1.0, 0.72, 0.72, 1.0)


func _build_clock_body() -> void:
	title_label.text = "中间：时钟谜题"
	hint_label.text = "调整时针和分针，让时钟停在正确时间。"
	status_label.text = "目标时间藏在这间房的节奏里。"

	var time_label := Label.new()
	time_label.name = "TimeLabel"
	time_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	time_label.add_theme_font_size_override("font_size", 48)
	time_label.add_theme_color_override("font_color", Color(0.92, 0.90, 0.78, 1.0))
	body.add_child(time_label)

	var hour_row := HBoxContainer.new()
	hour_row.alignment = BoxContainer.ALIGNMENT_CENTER
	hour_row.add_theme_constant_override("separation", 12)
	body.add_child(hour_row)
	hour_row.add_child(_build_clock_button("时针 -1", _nudge_clock.bind(-1, 0)))
	hour_row.add_child(_build_clock_button("时针 +1", _nudge_clock.bind(1, 0)))

	var minute_row := HBoxContainer.new()
	minute_row.alignment = BoxContainer.ALIGNMENT_CENTER
	minute_row.add_theme_constant_override("separation", 12)
	body.add_child(minute_row)
	minute_row.add_child(_build_clock_button("分针 -5", _nudge_clock.bind(0, -5)))
	minute_row.add_child(_build_clock_button("分针 +5", _nudge_clock.bind(0, 5)))

	var check_button := Button.new()
	check_button.text = "确认时间"
	check_button.custom_minimum_size = Vector2(220, 56)
	check_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	check_button.pressed.connect(_check_clock)
	body.add_child(check_button)
	_refresh_clock_time()


func _build_clock_button(label: String, callback: Callable) -> Button:
	var button := Button.new()
	button.text = label
	button.custom_minimum_size = Vector2(132, 52)
	button.pressed.connect(callback)
	return button


func _nudge_clock(hour_delta: int, minute_delta: int) -> void:
	var hour_index := 0 if clock_hour == 12 else clock_hour
	var total_minutes := hour_index * 60 + clock_minute + hour_delta * 60 + minute_delta
	total_minutes = ((total_minutes % 720) + 720) % 720
	var next_hour_index := int(total_minutes / 60)
	clock_hour = 12 if next_hour_index == 0 else next_hour_index
	clock_minute = total_minutes % 60
	status_label.text = "指针转动到 %02d:%02d。" % [clock_hour, clock_minute]
	_refresh_clock_time()


func _refresh_clock_time() -> void:
	var time_label := body.get_node_or_null("TimeLabel") as Label
	if time_label != null:
		time_label.text = "%02d:%02d" % [clock_hour, clock_minute]


func _check_clock() -> void:
	if clock_hour == CLOCK_TARGET_HOUR and clock_minute == CLOCK_TARGET_MINUTE:
		puzzle_solved.emit("ending_clock_solved", "时钟停在 10:30，中间出口的锁响了一下。")
		close()
		return
	status_label.text = "这个时间不对，出口没有反应。"
