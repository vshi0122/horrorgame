extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "waking_room",
		"title": "醒来的房间",
		"hint": "左墙挂着拼图，右墙嵌着开关，中间的时钟守着出口。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "left-wall-puzzle",
				"label": "左墙：拼图",
				"message": "左墙上的九块拼图被打乱了。每一块背面都有一个很浅的数字。",
				"requires_flag_false": "ending_puzzle_solved",
				"ending_puzzle": "puzzle",
				"hotspot_rect": Rect2(0.06, 0.18, 0.26, 0.42)
			},
			{
				"id": "left-wall-puzzle-solved",
				"label": "左墙：拼图已复原",
				"message": "拼图已经复原。完整图案像一间被从外面锁住的房间。",
				"requires_flag_true": "ending_puzzle_solved",
				"hotspot_rect": Rect2(0.06, 0.18, 0.26, 0.42)
			},
			{
				"id": "right-wall-switches",
				"label": "右墙：开关谜题",
				"message": "四枚开关从左到右排列，下面刻着一行小字：亮、暗、亮、亮。",
				"requires_flag_false": "ending_switch_solved",
				"ending_puzzle": "switch",
				"hotspot_rect": Rect2(0.68, 0.18, 0.26, 0.42)
			},
			{
				"id": "right-wall-switches-solved",
				"label": "右墙：开关已接通",
				"message": "开关保持在正确的位置。右墙深处传来稳定的电流声。",
				"requires_flag_true": "ending_switch_solved",
				"hotspot_rect": Rect2(0.68, 0.18, 0.26, 0.42)
			},
			{
				"id": "center-clock",
				"label": "中间：时钟谜题",
				"message": "时钟的长短针都松了，表盘下方刻着一串细小的划痕。",
				"requires_flag_false": "ending_clock_solved",
				"ending_puzzle": "clock",
				"hotspot_rect": Rect2(0.38, 0.16, 0.24, 0.28)
			},
			{
				"id": "center-clock-solved",
				"label": "中间：时钟已校准",
				"message": "时钟停在 10:30，秒针不再前进。",
				"requires_flag_true": "ending_clock_solved",
				"hotspot_rect": Rect2(0.38, 0.16, 0.24, 0.28)
			},
			{
				"id": "exit-locked",
				"label": "中间：出口",
				"message": "出口还锁着。左墙、右墙和时钟必须全部解开。",
				"requires_not_all_flags_true": ["ending_puzzle_solved", "ending_switch_solved", "ending_clock_solved"],
				"hotspot_rect": Rect2(0.36, 0.56, 0.28, 0.32)
			},
			{
				"id": "exit",
				"label": "中间：出口",
				"message": "三道机构同时归位。出口打开，门外不再是那辆车。",
				"requires_flags_true": ["ending_puzzle_solved", "ending_switch_solved", "ending_clock_solved"],
				"goto_room": "waking_room_exit",
				"hotspot_rect": Rect2(0.36, 0.56, 0.28, 0.32)
			},
			{
				"id": "sleep",
				"label": "入睡",
				"message": "你闭上眼，任由这间房间远去。雨声重新落在车窗上。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.04, 0.74, 0.22, 0.14)
			}
		]
	}
