extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_sleep",
		"title": "房间 2 - 床边",
		"hint": "你在结局之后进入了这间房。桌子、板子和画都像是在等你靠近。",
		"background": "res://godot/asserts/images/room2 sleep.jpg",
		"interactions": [
			{
				"id": "to-desk",
				"label": ">",
				"message": "你靠近桌子。",
				"goto_room": "room2_desk",
				"hotspot_rect": Rect2(0.91, 0.45, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-board",
				"label": "<",
				"message": "墙上的板子把你的视线拉了过去。",
				"goto_room": "room2_board",
				"hotspot_rect": Rect2(0.03, 0.42, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-painting",
				"label": "^",
				"message": "当你直视那幅画时，它看起来和刚才不太一样。",
				"goto_room": "room2_painting",
				"hotspot_rect": Rect2(0.47, 0.04, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "stay-awake",
				"label": "入睡",
				"message": "你闭上眼，任由这间房间远去。雨声重新落在车窗上。",
				"goto_room": "car_closeup",
				"hotspot_rect": Rect2(0.12, 0.60, 0.36, 0.28)
			}
		]
	}
