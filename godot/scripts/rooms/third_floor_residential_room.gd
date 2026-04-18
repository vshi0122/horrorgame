extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_residential",
		"title": "三楼居民区",
		"hint": "狭窄的走廊里，你家的门还虚掩着。",
		"background": "res://godot/asserts/images/3rd resident.jpg",
		"interactions": [
			{
				"id": "escape",
				"label": "安全通道入口",
				"requires_flag_true": "creature_alerted",
				"message": "那东西已经发现你了，左边的安全通道是唯一还能走的路。",
				"objective": "别回头，立刻冲进安全通道。",
				"goto_room": "escape_stairwell",
				"hotspot_rect": Rect2(0.08, 0.2, 0.18, 0.54)
			},
			{
				"id": "corpse",
				"requires_flag_false": "corpse_examined",
				"label": "门口的尸体",
				"message": "尸体像被撕开过，衣服和地面都被血浸透了。",
				"sets_flag": "corpse_examined",
				"if_flags_all_true": ["corpse_examined", "creature_examined", "home_door_examined"],
				"if_flags_all_true_then_set_flags": ["creature_alerted"],
				"if_flags_all_true_then_objective": "那身影已经发现你了，快逃进安全通道。",
				"if_flags_all_true_then_message": "尸体像被撕开过，衣服和地面都被血浸透了。\n\n那道正在进食的身影猛地回过头，它发现你了。快跑。",
				"if_flags_all_true_then_goto_room": "third_floor_run",
				"hotspot_rect": Rect2(0.38, 0.58, 0.24, 0.14)
			},
			{
				"id": "creature",
				"requires_flag_false": "creature_examined",
				"label": "啃食的身影",
				"message": "它的肩背像被强行掰弯，每一个动作都错得让眼睛难以接受。",
				"sets_flag": "creature_examined",
				"if_flags_all_true": ["corpse_examined", "creature_examined", "home_door_examined"],
				"if_flags_all_true_then_set_flags": ["creature_alerted"],
				"if_flags_all_true_then_objective": "那身影已经发现你了，快逃进安全通道。",
				"if_flags_all_true_then_message": "它的肩背像被强行掰弯，每一个动作都错得让眼睛难以接受。\n\n它突然停下啃食，转头看向你。快跑。",
				"if_flags_all_true_then_goto_room": "third_floor_run",
				"hotspot_rect": Rect2(0.58, 0.34, 0.14, 0.28)
			},
			{
				"id": "home-door",
				"requires_flag_false": "home_door_examined",
				"label": "虚掩的家门",
				"message": "你家门缝里只有纯黑，没有灯，也没有任何可以相信的声音。",
				"sets_flag": "home_door_examined",
				"if_flags_all_true": ["corpse_examined", "creature_examined", "home_door_examined"],
				"if_flags_all_true_then_set_flags": ["creature_alerted"],
				"if_flags_all_true_then_objective": "那身影已经发现你了，快逃进安全通道。",
				"if_flags_all_true_then_message": "你家门缝里只有纯黑，没有灯，也没有任何可以相信的声音。\n\n身后的啃食声停了。快跑。",
				"if_flags_all_true_then_goto_room": "third_floor_run",
				"hotspot_rect": Rect2(0.74, 0.2, 0.16, 0.46)
			},
			{
				"id": "back",
				"requires_flag_false": "creature_alerted",
				"label": "退回三楼",
				"message": "你从居民区退回去，但外面的走廊已经不再更安全。",
				"goto_room": "third_floor_hall",
				"hotspot_rect": Rect2(0.38, 0.78, 0.2, 0.12)
			}
		]
	}
