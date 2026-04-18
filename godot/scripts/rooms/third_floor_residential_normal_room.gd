extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_residential_normal",
		"title": "三楼居民区",
		"hint": "你家门缝下漏出暖黄的灯光。",
		"background": "res://godot/asserts/images/3rd resident good.jpg",
		"interactions": [
			{
				"id": "home-door",
				"label": "你家",
				"message": "你朝自己家的门走去，抬手把门推开。",
				"goto_room": "dinner_table",
				"transition_sound": "open_room",
				"hotspot_rect": Rect2(0.42, 0.18, 0.18, 0.48)
			},
			{
				"id": "back",
				"label": "回三楼",
				"message": "你在走廊里多停了一会儿，然后才转身回去。",
				"goto_room": "third_floor_hall_normal",
				"hotspot_rect": Rect2(0.38, 0.78, 0.2, 0.12)
			}
		]
	}
