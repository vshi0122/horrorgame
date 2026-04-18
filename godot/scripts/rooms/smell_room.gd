extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "smell_room",
		"title": "气味",
		"hint": "空气里混着腐烂和消毒水的味道，像医院和坟墓被硬塞进了同一层楼。",
		"background": "res://godot/asserts/images/smell.jpg",
		"interactions": [
			{
				"id": "breathe",
				"label": "那股味道",
				"message": "味道黏在喉咙深处，站着不动只会让它更明显。",
				"hotspot_rect": Rect2(0.18, 0.2, 0.64, 0.46)
			},
			{
				"id": "back-to-third-question",
				"label": "回三楼？",
				"message": "你从那股味道里退开，但下方的空气也已经不再干净了。",
				"goto_room": "fake_third",
				"hotspot_rect": Rect2(0.18, 0.76, 0.26, 0.12)
			},
			{
				"id": "to-real-third-floor",
				"label": "继续往上",
				"message": "你顶着那股味道继续往上走，直到走廊终于重新拼回真正的三楼。",
				"goto_room": "third_floor_hall",
				"hotspot_rect": Rect2(0.56, 0.74, 0.22, 0.14)
			}
		]
	}
