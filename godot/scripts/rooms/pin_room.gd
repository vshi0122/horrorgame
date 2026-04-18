extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "pin_room",
		"title_key": "room.pin_room.title",
		"hint_key": "room.pin_room.hint",
		"background": "res://godot/asserts/images/pin.jpg",
		"scene_keypad": {
			"interaction_id": "use-keypad",
			"display_rect": Rect2(0.519, 0.178, 0.122, 0.048),
			"button_rects": {
				"1": Rect2(0.518, 0.245, 0.034, 0.055),
				"2": Rect2(0.560, 0.245, 0.034, 0.055),
				"3": Rect2(0.602, 0.245, 0.034, 0.055),
				"4": Rect2(0.518, 0.309, 0.034, 0.055),
				"5": Rect2(0.560, 0.309, 0.034, 0.055),
				"6": Rect2(0.602, 0.309, 0.034, 0.055),
				"7": Rect2(0.518, 0.373, 0.034, 0.055),
				"8": Rect2(0.560, 0.373, 0.034, 0.055),
				"9": Rect2(0.602, 0.373, 0.034, 0.055),
				"C": Rect2(0.518, 0.437, 0.034, 0.055),
				"0": Rect2(0.560, 0.437, 0.034, 0.055),
				"OK": Rect2(0.602, 0.437, 0.034, 0.055)
			}
		},
		"interactions": [
			{
				"id": "use-keypad",
				"label_key": "room.pin_room.use_keypad.label",
				"message_key": "room.pin_room.use_keypad.message",
				"objective_key": "room.pin_room.use_keypad.objective",
				"goto_room": "hallway",
				"sets_flag": "building_entered",
				"hotspot_rect": Rect2(0.499, 0.1518, 0.171, 0.4661),
				"code_input": {
					"prompt_key": "room.pin_room.use_keypad.prompt",
					"solution": "0327",
					"failure_message_key": "room.pin_room.use_keypad.failure"
				}
			},
			{
				"id": "back-entrance",
				"label_key": "room.pin_room.back.label",
				"message_key": "room.pin_room.back.message",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.8116, 0.4438, 0.187, 0.5464),
				"ui_style": "corner_back"
			}
		]
	}
