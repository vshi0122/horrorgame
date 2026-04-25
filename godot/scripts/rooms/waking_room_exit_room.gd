extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "waking_room_exit",
		"title": "门外",
		"hint": "你离开了醒来的房间。正常流程从这里继续。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "look-back",
				"label": "回头",
				"message": "门还在身后，但房间里的床、拼图、开关和时钟都像隔着一层雾。",
				"goto_room": "waking_room",
				"hotspot_rect": Rect2(0.16, 0.58, 0.2, 0.2)
			},
			{
				"id": "continue",
				"label": "继续向前",
				"message": "你向门外走去。这里会接上后续的正常流程。",
				"hotspot_rect": Rect2(0.42, 0.22, 0.24, 0.54)
			},
			{
				"id": "sleep",
				"label": "入睡",
				"message": "你闭上眼，雨声重新落在车窗上。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.72, 0.72, 0.2, 0.14)
			}
		]
	}
