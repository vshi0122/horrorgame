extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "upper_stairwell",
		"title": "二楼楼梯间",
		"hint": "这里连通二楼和三楼，四周布满了红色痕迹。",
		"background": "res://godot/asserts/images/2nd passing.jpg",
		"interactions": [
			{
				"id": "symbols",
				"label": "红色符号",
				"message": "那些痕迹像被人反复描摹，完全看不懂含义。",
				"hotspot_rect": Rect2(0.18, 0.24, 0.18, 0.24)
			},
			{
				"id": "landing",
				"label": "楼梯平台",
				"message": "平台中央留着像拖拽过什么东西的深色痕迹。",
				"hotspot_rect": Rect2(0.4, 0.18, 0.2, 0.18)
			},
			{
				"id": "to-3f",
				"label": "通往三楼",
				"message": "你继续向上，越往高处走，楼里就越像失去了住人的痕迹。",
				"objective": "调查三楼并找到居民区密码。",
				"goto_room": "third_floor_hall",
				"hotspot_rect": Rect2(0.62, 0.18, 0.22, 0.28)
			},
			{
				"id": "back",
				"label": "回二楼大厅",
				"message": "你退回几步，重新回到二楼大厅。",
				"goto_room": "second_floor_hall",
				"hotspot_rect": Rect2(0.18, 0.72, 0.22, 0.14)
			}
		]
	}
