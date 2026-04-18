extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "second_floor_hall",
		"title": "二楼大厅",
		"hint": "布局和一楼一样，只是这里更黑，气氛也更紧。",
		"background": "res://godot/asserts/images/2nd floor.jpg",
		"interactions": [
			{
				"id": "notice",
				"label": "被涂抹的告示",
				"requires_flag_false": "second_floor_notice_read",
				"sets_flag": "second_floor_notice_read",
				"message": "那片红色越看越不像颜料。",
				"hotspot_rect": Rect2(0.08, 0.18, 0.18, 0.48),
				"document": {
					"id": "arrival-notice-2f",
					"title": "被涂抹的告示",
					"source": "二楼大厅左侧墙面",
					"body": "物业提醒：\n\n住户请提前准备迎接 [color=red]降临之日[/color]。\n告示下半部分被大片暗红色痕迹覆盖。\n\n你无法判断那到底是血还是别的什么。"
				}
			},
			{
				"id": "stairs",
				"label": "楼梯口",
				"message": "你离开二楼大厅，走进通往三楼的楼梯间。",
				"objective": "继续往三楼走。",
				"goto_room": "upper_stairwell",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "residential",
				"label": "居民区入口",
				"message": "右侧是二楼居民区入口，但此刻没有任何声音。",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.48)
			},
			{
				"id": "back",
				"label": "回楼梯间",
				"message": "你转身回到一楼与二楼之间的楼梯平台。",
				"goto_room": "stairwell_landing",
				"hotspot_rect": Rect2(0.4, 0.78, 0.2, 0.12)
			}
		]
	}
