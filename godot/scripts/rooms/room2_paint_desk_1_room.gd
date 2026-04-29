extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_paint_desk_1",
		"title": "Room 2 - Left Desk",
		"hint": "",
		"background": "res://godot/asserts/images/room2/paint/desk-1.png",
		"interactions": [
			{
				"id": "back",
				"label": "v",
				"message": "",
				"goto_room": "room2_painting",
				"hotspot_rect": Rect2(0.04, 0.86, 0.12, 0.10),
				"ui_style": "corner_back"
			}
		]
	}
