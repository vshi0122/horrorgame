extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "smell_room",
		"title_key": "room.smell_room.title",
		"hint_key": "room.smell_room.hint",
		"background": "res://godot/asserts/images/smell.jpg",
		"interactions": [
			{
				"id": "breathe",
				"label_key": "room.smell_room.breathe.label",
				"message_key": "room.smell_room.breathe.message",
				"hotspot_rect": Rect2(0.18, 0.2, 0.64, 0.46)
			},
			{
				"id": "back-to-third-question",
				"label_key": "room.smell_room.back_to_third_question.label",
				"message_key": "room.smell_room.back_to_third_question.message",
				"goto_room": "third_floor_hall",
				"hotspot_rect": Rect2(0.18, 0.76, 0.26, 0.12)
			},
			{
				"id": "to-real-third-floor",
				"label_key": "room.smell_room.to_real_third_floor.label",
				"message_key": "room.smell_room.to_real_third_floor.message",
				"goto_room": "monster_stare",
				"hotspot_rect": Rect2(0.56, 0.74, 0.22, 0.14)
			}
		]
	}
