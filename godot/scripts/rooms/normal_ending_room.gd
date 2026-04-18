extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "normal_ending",
		"title": "结局 - 离开",
		"hint": "你活着离开了这栋公寓。",
		"background": "",
		"ending_data": {
			"variant": "normal",
			"order": "3/10",
			"name": "离开",
			"summary": "你活着离开了这里，但真相没有跟着你一起出去。"
		},
		"interactions": [
			{
				"id": "restart",
				"label": "再次醒来",
				"message": "这一夜重新倒回你在驾驶座上惊醒的那一刻。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.68, 0.24, 0.14)
			}
		]
	}
