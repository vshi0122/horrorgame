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
		"interactions": []
	}
