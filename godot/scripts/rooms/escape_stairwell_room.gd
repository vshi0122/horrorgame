extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "escape_stairwell",
		"title": "安全通道",
		"hint": "整栋楼都陷进了黑暗，你脑子里只剩一个念头：往下跑。",
		"background": "res://godot/asserts/images/ladder.jpg",
		"interactions": [
			{
				"id": "run",
				"label": "继续往下跑",
				"message": "你听见身后有什么东西在咆哮，只能一直往下，直到楼梯把你重新吐回一楼。",
				"objective": "大楼似乎恢复正常了。离开，或者再上去看看。",
				"goto_room": "hallway_normal",
				"hotspot_rect": Rect2(0.34, 0.54, 0.3, 0.18)
			}
		]
	}
