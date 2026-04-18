extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_run",
		"title": "三楼居民区",
		"hint": "走廊已经被奔跑和血色糊成一片，你眼前只剩安全通道入口。",
		"background": "res://godot/asserts/images/3rd run.jpg",
		"interactions": [
			{
				"id": "escape",
				"label": "安全通道入口",
				"message": "你抢在那东西扑到你之前，朝安全通道门扑了过去。",
				"objective": "别回头，一直往下逃。",
				"goto_room": "escape_stairwell",
				"hotspot_rect": Rect2(0.08, 0.2, 0.18, 0.54)
			},
			{
				"id": "corpse",
				"label": "门口的尸体",
				"message": "你迟疑得太久了，走廊里的东西已经扑到了你身上。",
				"goto_room": "bad_ending",
				"hotspot_rect": Rect2(0.38, 0.58, 0.24, 0.14)
			},
			{
				"id": "creature",
				"label": "啃食的身影",
				"message": "那道身影停下，回头，在你来得及动之前就碰到了你。",
				"goto_room": "bad_ending",
				"hotspot_rect": Rect2(0.58, 0.34, 0.14, 0.28)
			},
			{
				"id": "home-door",
				"label": "虚掩的家门",
				"message": "你回头的那一眼，花掉了最后能逃走的时间。",
				"goto_room": "bad_ending",
				"hotspot_rect": Rect2(0.74, 0.2, 0.16, 0.46)
			},
			{
				"id": "back",
				"label": "退回三楼",
				"message": "你放弃出口，走廊在你迈出下一步之前就先吞掉了你。",
				"goto_room": "bad_ending",
				"hotspot_rect": Rect2(0.38, 0.78, 0.2, 0.12)
			}
		]
	}
