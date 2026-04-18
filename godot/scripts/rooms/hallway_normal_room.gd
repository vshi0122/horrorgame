extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "hallway_normal",
		"title": "一楼楼道",
		"hint": "一切都恢复成普通公寓楼的样子了，本该让人安心，但并没有。",
		"background": "res://godot/asserts/images/1st floor.jpg",
		"interactions": [
			{
				"id": "stairs",
				"label": "上楼楼梯",
				"message": "灯光重新稳定下来，楼里正常得足以让你再次上去。",
				"goto_room": "stairwell_normal",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "wall",
				"label": "告示板",
				"message": "墙上只剩普通的物业通知和送货提醒。",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.42)
			},
			{
				"id": "leave",
				"label": "离开公寓",
				"message": "门外已经打开，你现在就可以离开。",
				"goto_room": "normal_ending",
				"hotspot_rect": Rect2(0.38, 0.82, 0.24, 0.1)
			}
		]
	}
