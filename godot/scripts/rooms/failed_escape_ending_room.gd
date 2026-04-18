extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "failed_escape_ending",
		"title": "结局 - 门外",
		"hint": "那扇门没有为你打开。",
		"background": "res://godot/asserts/images/badending2.jpg",
		"ending_data": {
			"variant": "failed",
			"order": "2/10",
			"name": "门外",
			"summary": "你抵达了一楼，却没能以正确的方式离开。"
		},
		"interactions": [
			{
				"id": "restart",
				"label": "再次醒来",
				"message": "输错的密码、门边伸来的影子和那道门一起坍缩回了夜晚的开头。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.68, 0.24, 0.14)
			}
		]
	}
