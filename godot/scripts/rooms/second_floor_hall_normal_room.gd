extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "second_floor_hall_normal",
		"title": "二楼大厅",
		"hint": "二楼也恢复成了普通居民楼的样子。",
		"background": "res://godot/asserts/images/2nd floor good.jpg",
		"interactions": [
			{
				"id": "stairs",
				"label": "楼梯口",
				"message": "你朝通往三楼的楼梯口走去。",
				"goto_room": "upper_stairwell_normal",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "wall",
				"label": "普通墙面",
				"message": "墙很干净，没有符号，也没有血迹。",
				"hotspot_rect": Rect2(0.08, 0.18, 0.18, 0.48)
			},
			{
				"id": "residential",
				"label": "居民区入口",
				"message": "这里只是普通的居民区入口了，安静，但不再异常。",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.48)
			},
			{
				"id": "back",
				"label": "回楼梯间",
				"message": "你转身回到一楼和二楼之间的楼梯间。",
				"goto_room": "stairwell_normal",
				"hotspot_rect": Rect2(0.4, 0.78, 0.2, 0.12)
			}
		]
	}
