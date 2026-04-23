extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "hallway_normal",
		"title_key": "room.hallway_normal.title",
		"hint_key": "room.hallway_normal.hint",
		"background": "res://godot/asserts/images/1st floor.jpg",
		"interactions": [
			{
				"id": "stairs",
				"label_key": "room.hallway_normal.stairs.label",
				"message_key": "room.hallway_normal.stairs.message",
				"goto_room": "stairwell_normal",
				"hotspot_rect": Rect2(0.42, 0.24, 0.18, 0.48)
			},
			{
				"id": "wall",
				"label_key": "room.hallway_normal.wall.label",
				"message_key": "room.hallway_normal.wall.message",
				"hotspot_rect": Rect2(0.74, 0.18, 0.18, 0.42)
			},
			{
				"id": "leave",
				"label_key": "room.hallway_normal.leave.label",
				"message_key": "room.hallway_normal.leave.message",
				"code_input": {
					"prompt_key": "room.hallway_normal.leave.prompt",
					"solution": "0000",
					"failure_message_key": "room.hallway_normal.leave.failure",
					"failure_room": "failed_escape_intro"
				},
				"goto_room": "normal_ending",
				"hotspot_rect": Rect2(0.38, 0.82, 0.24, 0.1)
			}
		]
	}
