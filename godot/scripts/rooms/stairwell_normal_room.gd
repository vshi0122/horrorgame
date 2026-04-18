extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "stairwell_normal",
		"title": "楼梯间",
		"hint": "墙面干干净净，像什么都没发生过。",
		"background": "res://godot/asserts/images/1 passing.jpg",
		"interactions": [
			{
				"id": "to-1f",
				"label": "回一楼",
				"message": "你回到一楼楼道。",
				"goto_room": "hallway_normal",
				"hotspot_rect": Rect2(0.16, 0.54, 0.22, 0.18)
			},
			{
				"id": "to-2f",
				"label": "前往二楼",
				"message": "你继续往上，一切看起来仍然很正常。",
				"goto_room": "second_floor_hall_normal",
				"hotspot_rect": Rect2(0.62, 0.18, 0.22, 0.28)
			}
		]
	}
