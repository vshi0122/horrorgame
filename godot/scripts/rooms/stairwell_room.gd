extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "stairwell_landing",
		"title": "楼梯间",
		"hint": "这里连通一楼和二楼。",
		"background": "res://godot/asserts/images/1 passing.jpg",
		"interactions": [
			{
				"id": "to-1f",
				"label": "回一楼",
				"message": "你从平台回身，重新回到一楼楼道。",
				"goto_room": "hallway",
				"hotspot_rect": Rect2(0.16, 0.54, 0.22, 0.18)
			},
			{
				"id": "to-2f",
				"label": "前往二楼",
				"message": "你继续往上走，二楼正在上方等着你。",
				"objective": "继续往二楼走。",
				"goto_room": "second_floor_hall",
				"hotspot_rect": Rect2(0.62, 0.18, 0.22, 0.28)
			}
		]
	}
