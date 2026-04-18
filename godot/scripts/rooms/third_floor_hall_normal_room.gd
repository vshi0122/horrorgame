extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_hall_normal",
		"title": "三楼",
		"hint": "红灯、符号和血迹全都不见了，这里看起来只是普通走廊。",
		"background": "res://godot/asserts/images/3rd floor good.jpg",
		"interactions": [
			{
				"id": "stairs",
				"label": "回楼梯间",
				"message": "你回头看了眼已经恢复正常的楼梯间。",
				"goto_room": "upper_stairwell_normal",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "residential",
				"label": "居民区入口",
				"message": "居民区的大门开着，家就在那后面。",
				"goto_room": "third_floor_residential_normal",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.48)
			},
			{
				"id": "wall",
				"label": "普通墙面",
				"message": "这里只剩墙漆和时间留下的细小裂痕。",
				"hotspot_rect": Rect2(0.08, 0.18, 0.18, 0.48)
			}
		]
	}
