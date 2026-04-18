extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "upper_stairwell_normal",
		"title": "二楼楼梯间",
		"hint": "二楼和三楼之间的楼梯间正常得让人不安。",
		"background": "res://godot/asserts/images/1 passing.jpg",
		"interactions": [
			{
				"id": "to-3f",
				"label": "前往三楼",
				"message": "你继续往家那一层走去。",
				"goto_room": "third_floor_hall_normal",
				"hotspot_rect": Rect2(0.62, 0.18, 0.22, 0.28)
			},
			{
				"id": "back",
				"label": "回二楼大厅",
				"message": "你重新回到二楼大厅。",
				"goto_room": "second_floor_hall_normal",
				"hotspot_rect": Rect2(0.18, 0.72, 0.22, 0.14)
			}
		]
	}
