extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "hallway",
		"title": "一楼楼道",
		"hint": "左边是消防通道入口，右边是贴着告示的墙，中间是上楼楼梯。",
		"background": "res://godot/asserts/images/1st floor.jpg",
		"interactions": [
			{
				"id": "fire-exit",
				"label": "消防通道入口",
				"message": "消防通道平常锁着，门缝里只有绿色安全出口在黑里闪。",
				"hotspot_rect": Rect2(0.08, 0.22, 0.18, 0.48)
			},
			{
				"id": "notice",
				"label": "物业告示",
				"requires_flag_false": "entrance_notice_read",
				"sets_flag": "entrance_notice_read",
				"message": "告示写得像整栋楼都在准备某个仪式。",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.42),
				"document": {
					"id": "arrival-notice-1f",
					"title": "降临之日告示",
					"source": "一楼楼道右侧墙面",
					"body": "物业提醒：\n\n住户请提前准备迎接 [color=red]降临之日[/color]。\n如听见陌生声音呼唤姓名，请勿回应。"
				}
			},
			{
				"id": "stairs",
				"label": "上楼楼梯",
				"message": "你离开一楼，朝更高处走去。",
				"objective": "去楼上看看。",
				"goto_room": "stairwell_landing",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "back-outside",
				"label": "回门口",
				"message": "你回头朝门口走去，密码锁的冷光还亮着。",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.38, 0.82, 0.24, 0.1)
			}
		]
	}
