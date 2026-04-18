extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "flee_ending",
		"title": "结局 - 逃离",
		"hint": "你选择了离开。",
		"background": "res://godot/asserts/images/car.jpg",
		"ending_data": {
			"variant": "bad",
			"order": "5/10",
			"name": "逃离",
			"summary": "你把妻子和真相一起留在了那栋楼里。"
		},
		"interactions": [
			{
				"id": "restart",
				"label": "再次醒来",
				"message": "雨夜和公寓又一次回到眼前，像是什么都还没结束。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.68, 0.24, 0.14)
			}
		]
	}
