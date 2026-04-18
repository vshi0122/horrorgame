extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "bad_ending",
		"title": "结局 - 失陷",
		"hint": "你没能逃出去。",
		"background": "res://godot/asserts/images/bad ending.jpg",
		"ending_data": {
			"variant": "bad",
			"order": "1/10",
			"name": "失陷",
			"summary": "你在居民区停留得太久，最终没能活着离开。"
		},
		"interactions": [
			{
				"id": "restart",
				"label": "再次醒来",
				"message": "黑暗重新折回那辆车里，这一夜又从头开始了。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.68, 0.24, 0.14)
			}
		]
	}
