extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "good_ending_question",
		"title": "醒来？",
		"hint": "那个标志比整个房间都更亮，像属于这场夜晚的另一层。",
		"background": "res://godot/asserts/images/home.jpg",
		"ending_data": {
			"variant": "good",
			"order": "4/10",
			"name": "醒来？",
			"summary": "你抵达了最深的一层。至于这意味着醒来，还是陷得更深，还没有答案。"
		},
		"interactions": [
			{
				"id": "ending_reflect",
				"label": "黑白标志",
				"message": "有那么一瞬间，你分不清自己究竟是在醒来、重新循环，还是正走进某个早就等着你的东西里。",
				"hotspot_rect": Rect2(0.3, 0.22, 0.4, 0.28)
			},
			{
				"id": "restart",
				"label": "再次醒来",
				"message": "你又一次在驾驶座上惊醒，仿佛整栋楼从没打算放你离开这个循环。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.68, 0.24, 0.14)
			}
		]
	}
