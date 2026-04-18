extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "car_closeup",
		"title": "车里",
		"hint": "雨刚停，挡风玻璃上还残着水痕。",
		"background": "res://godot/asserts/images/car.jpg",
		"interactions": [
			{
				"id": "seat",
				"label": "驾驶座",
				"requires_flag_true": "found_keys",
				"sets_flag": "woke_up",
				"message": "仪表盘早就熄火了，车里安静得只剩你自己的呼吸。",
				"hotspot_rect": Rect2(0.0244, 0.648, 0.4189, 0.3482)
			},
			{
				"id": "seat",
				"label": "钥匙串",
				"requires_flag_false": "found_keys",
				"gives_items": ["车钥匙", "信箱钥匙"],
				"sets_flags": ["found_keys", "woke_up"],
				"objective": "下车，穿过停车场去公寓门口。",
				"message": "你从驾驶座缝隙里摸出钥匙串，金属冷得有些不正常。",
				"sound": "key",
				"hotspot_rect": Rect2(0.0244, 0.648, 0.4189, 0.3482)
			},
			{
				"id": "exit-car",
				"label": "下车",
				"message": "你推开车门，重新站回湿冷的停车场。",
				"goto_room": "parking_lot",
				"transition_sound": "car",
				"hotspot_rect": Rect2(0.5668, 0.0687, 0.4141, 0.8953)
			},
			{
				"id": "flee-engine",
				"label": "发动引擎逃离",
				"requires_flag_true": "woke_up",
				"requires_flag_false": "flee_prompt_shown",
				"sets_flag": "flee_prompt_shown",
				"message": "自动车灯闪了一下。你真的要现在就开车走吗？你的妻子还在那栋楼里。",
				"hotspot_rect": Rect2(0.28, 0.74, 0.44, 0.12)
			},
			{
				"id": "flee-confirm",
				"label": "确认，立刻开走",
				"requires_flag_true": "flee_prompt_shown",
				"message": "你发动引擎，在那栋楼把你拖回去之前驶离了这里。",
				"goto_room": "flee_ending",
				"hotspot_rect": Rect2(0.14, 0.74, 0.33, 0.12)
			},
			{
				"id": "flee-cancel",
				"label": "不，我得进去",
				"requires_flag_true": "flee_prompt_shown",
				"message": "你重新关掉引擎。不管那栋楼里有什么，你还是得上去。",
				"clears_flags": ["flee_prompt_shown"],
				"hotspot_rect": Rect2(0.53, 0.74, 0.33, 0.12)
			}
		]
	}
