extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_paint_3paints",
		"title": "Room 2 - Paintings",
		"hint": "",
		"background": "res://godot/asserts/images/room2/paint/3paints.png",
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
