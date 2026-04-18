extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "dinner_table",
		"title": "晚餐桌前",
		"hint": "灯光和饭菜的热气让这里几乎像真正的家。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "wife-give-ketchup",
				"label_key": "room.dinner_table.wife.label",
				"requires_item": "ketchup",
				"sets_flag": "dinner_ketchup_given",
				"removes_item": "ketchup",
				"message_key": "room.dinner_table.wife.give_ketchup.message",
				"hotspot_rect": Rect2(0.313, 0.208, 0.374, 0.53)
			},
			{
				"id": "wife-needs-ketchup",
				"label_key": "room.dinner_table.wife.label",
				"requires_missing_item": "ketchup",
				"requires_flag_false": "dinner_ketchup_given",
				"message_key": "room.dinner_table.wife.ask_ketchup.message",
				"hotspot_rect": Rect2(0.313, 0.208, 0.374, 0.53)
			},
			{
				"id": "wife-after-ketchup",
				"label": "妻子",
				"requires_flag_true": "dinner_ketchup_given",
				"message": "她笑得很自然，像是完全看不见墙上的异样。",
				"hotspot_rect": Rect2(0.313, 0.208, 0.374, 0.53)
			},
			{
				"id": "food",
				"label": "饭菜",
				"message": "热气从饭菜上缓缓升起，真实得让人不敢怀疑。",
				"hotspot_rect": Rect2(0.044, 0.63, 0.548, 0.245)
			},
			{
				"id": "symbol",
				"label": "黑白标志",
				"requires_flag_true": "dinner_ketchup_given",
				"message": "那个标志把你的视线牢牢扯过去，直到房间、餐桌和你的呼吸都像一起坠了下去。",
				"goto_room": "good_ending_question",
				"hotspot_rect": Rect2(0.655, 0.107, 0.197, 0.233)
			},
			{
				"id": "back-hall",
				"label": "回走廊",
				"message": "你退回走廊，房间里的暖意却仍比外面的公寓更像现实。",
				"goto_room": "third_floor_residential_normal",
				"hotspot_rect": Rect2(0.0, 0.176, 0.219, 0.692)
			}
		]
	}
