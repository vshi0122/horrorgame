extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_cloth_boxes",
		"title": "Room 2 - Boxes",
		"hint": "",
		"background": "res://godot/asserts/images/room2/cloth/boxes.png",
		"interactions": [
			{
				"id": "back",
				"label": "v",
				"message": "",
				"goto_room": "room2_board",
				"hotspot_rect": Rect2(0.04, 0.86, 0.12, 0.10),
				"ui_style": "corner_back"
			}
		]
	}
