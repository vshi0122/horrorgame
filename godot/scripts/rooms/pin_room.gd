extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "pin_room",
		"title": "密码锁前",
		"hint": "金属按键磨损得很严重，冷光照在门框边。",
		"background": "res://godot/asserts/images/pin.jpg",
		"interactions": [
			{
				"id": "use-keypad",
				"label": "输入密码",
				"message": "你稳住呼吸，把手伸向数字面板。",
				"objective": "输入正确密码进入大楼。",
				"goto_room": "hallway",
				"sets_flag": "building_entered",
				"hotspot_rect": Rect2(0.499, 0.1518, 0.171, 0.4661),
				"code_input": {
					"prompt": "请输入大楼门禁密码",
					"solution": "0327",
					"failure_message": "密码锁发出一声冷冰冰的提示音，拒绝了这个输入。",
					"failure_room": "failed_escape_ending"
				}
			},
			{
				"id": "back-entrance",
				"label": "返回入口",
				"message": "你把手从数字键盘上收回来，重新站回门口。",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.8116, 0.4438, 0.187, 0.5464),
				"ui_style": "corner_back"
			}
		]
	}
