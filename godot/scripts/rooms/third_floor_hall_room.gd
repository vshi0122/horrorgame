extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_hall",
		"title": "三楼",
		"hint": "完全没有灯，只有出口标志的刺眼红光照着墙面。",
		"background": "res://godot/asserts/images/3rd floor.jpg",
		"interactions": [
			{
				"id": "back-stairwell",
				"label": "回楼梯间",
				"sets_flag": "third_floor_visited",
				"message": "你转身回楼梯间，但看过这一层之后，连后路都开始显得陌生。",
				"goto_room": "back_stairwell",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "notice",
				"label": "地上的告示",
				"sets_flag": "third_floor_visited",
				"message": "那张被撕下来的告示上只剩一句话：她在等你。",
				"hotspot_rect": Rect2(0.08, 0.62, 0.2, 0.14),
				"document": {
					"id": "she-waits",
					"title": "撕下来的告示",
					"source": "三楼左侧地面",
					"body": "[color=red]她在等你。[/color]"
				}
			},
			{
				"id": "residential",
				"label": "居民区密码锁",
				"requires_flag_false": "residential_unlocked",
				"sets_flags": ["third_floor_visited", "residential_unlocked"],
				"message": "居民区门后有细碎动静，这层楼里有什么东西还活着，或者正在假装自己活着。",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.48),
				"code_input": {
					"prompt": "请输入居民区入口密码，密码为两个字母。",
					"solution": "JM",
					"failure_message": "密码错误。门锁里传来轻微的金属摩擦声。"
				},
				"objective": "进入居民区，看看门后到底有什么。",
				"goto_room": "third_floor_residential"
			},
			{
				"id": "residential",
				"label": "进入居民区",
				"requires_flag_true": "residential_unlocked",
				"sets_flag": "third_floor_visited",
				"message": "密码锁轻轻跳开了，门后的东西还在等你。",
				"objective": "调查居民区走廊。",
				"goto_room": "third_floor_residential",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.48)
			}
		]
	}
