extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "third_floor_run",
		"title_key": "room.third_floor_run.title",
		"hint_key": "room.third_floor_run.hint",
		"background": "res://godot/asserts/images/3rd run.jpg",
		"interactions": [
			{
				"id": "escape",
				"label_key": "room.third_floor_run.escape.label",
				"message_key": "room.third_floor_run.escape.message",
				"objective_key": "room.third_floor_run.escape.objective",
				"goto_room": "escape_stairwell",
				"hotspot_rect": Rect2(0.08, 0.2, 0.18, 0.54)
			},
			{
				"id": "corpse",
				"label_key": "room.third_floor_run.corpse.label",
				"message_key": "room.third_floor_run.corpse.message",
				"goto_room": "bad_ending_intro",
				"hotspot_rect": Rect2(0.38, 0.58, 0.24, 0.14)
			},
			{
				"id": "creature",
				"label_key": "room.third_floor_run.creature.label",
				"message_key": "room.third_floor_run.creature.message",
				"goto_room": "bad_ending_intro",
				"hotspot_rect": Rect2(0.58, 0.34, 0.14, 0.28)
			},
			{
				"id": "home-door",
				"label_key": "room.third_floor_run.home_door.label",
				"message_key": "room.third_floor_run.home_door.message",
				"goto_room": "bad_ending_intro",
				"hotspot_rect": Rect2(0.74, 0.2, 0.16, 0.46)
			},
			{
				"id": "back",
				"label_key": "room.third_floor_run.back.label",
				"message_key": "room.third_floor_run.back.message",
				"goto_room": "bad_ending_intro",
				"hotspot_rect": Rect2(0.38, 0.78, 0.2, 0.12)
			}
		]
	}
