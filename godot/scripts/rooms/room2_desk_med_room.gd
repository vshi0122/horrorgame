extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_desk_med",
		"title": "Room 2 - Medicine",
		"hint": "",
		"background": "res://godot/asserts/images/room2/desk/desk-med.png",
		"interactions": [
			{
				"id": "back",
				"label": "v",
				"message": "",
				"goto_room": "room2_desk",
				"hotspot_rect": Rect2(0.04, 0.86, 0.12, 0.10),
				"ui_style": "corner_back"
			}
		]
	}
