extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "hallway",
		"title_key": "room.hallway.title",
		"hint_key": "room.hallway.hint",
		"background": "res://godot/asserts/images/1st floor.jpg",
		"interactions": [
			{
				"id": "fire-exit",
				"label_key": "room.hallway.fire_exit.label",
				"message_key": "room.hallway.fire_exit.message",
				"hotspot_rect": Rect2(0.08, 0.22, 0.18, 0.48)
			},
			{
				"id": "notice",
				"label_key": "room.hallway.notice.label",
				"message_key": "room.hallway.notice.message",
				"goto_room": "notice_closeup",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.42)
			},
			{
				"id": "stairs",
				"label_key": "room.hallway.stairs.label",
				"message_key": "room.hallway.stairs.message",
				"objective_key": "room.hallway.stairs.objective",
				"goto_room": "stairwell_landing",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "back-outside",
				"label_key": "room.hallway.back_outside.label",
				"message_key": "room.hallway.back_outside.message",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.38, 0.82, 0.24, 0.1)
			}
		]
	}
