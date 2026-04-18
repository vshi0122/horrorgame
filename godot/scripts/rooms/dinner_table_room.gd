extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "dinner_table",
		"title": "餐桌",
		"hint": "暖黄色的灯光填满整个房间，饭菜已经摆好了。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "wife",
				"label": "妻子",
				"requires_item": "番茄酱",
				"requires_flag_false": "dinner_ketchup_given",
				"sets_flag": "dinner_ketchup_given",
				"removes_item": "番茄酱",
				"objective": "看向墙上的黑白标志。",
				"message": "她笑着接过番茄酱，叫你坐下。就在那一刻，墙上浮出了一个黑白标志。",
				"hotspot_rect": Rect2(0.72, 0.2, 0.18, 0.36)
			},
			{
				"id": "wife",
				"label": "妻子",
				"requires_missing_item": "番茄酱",
				"requires_flag_false": "dinner_ketchup_given",
				"message": "她看着你，轻声问：番茄酱呢？",
				"hotspot_rect": Rect2(0.72, 0.2, 0.18, 0.36)
			},
			{
				"id": "wife",
				"label": "妻子",
				"requires_flag_true": "dinner_ketchup_given",
				"message": "她笑得很自然，像是完全看不见墙上的异样。",
				"hotspot_rect": Rect2(0.72, 0.2, 0.18, 0.36)
			},
			{
				"id": "dinner",
				"label": "饭菜",
				"message": "热气从饭菜上缓缓升起，真实得让人不敢怀疑。",
				"hotspot_rect": Rect2(0.26, 0.58, 0.34, 0.16)
			},
			{
				"id": "symbol",
				"label": "黑白标志",
				"requires_flag_true": "dinner_ketchup_given",
				"message": "那个标志把你的视线牢牢扯过去，直到房间、餐桌和你的呼吸都像一起坠了下去。",
				"goto_room": "good_ending_question",
				"hotspot_rect": Rect2(0.12, 0.18, 0.14, 0.18)
			},
			{
				"id": "back",
				"label": "回走廊",
				"message": "你退回走廊，房间里的暖意却仍比外面的公寓更像现实。",
				"goto_room": "third_floor_residential_normal",
				"hotspot_rect": Rect2(0.42, 0.78, 0.18, 0.12)
			}
		]
	}
