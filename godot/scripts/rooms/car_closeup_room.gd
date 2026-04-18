extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "car_closeup",
		"title_key": "room.car_closeup.title",
		"hint_key": "room.car_closeup.hint",
		"background": "res://godot/asserts/images/car.jpg",
		"interactions": [
			{
				"id": "seat",
				"label_key": "room.car_closeup.seat.label",
				"requires_flag_true": "found_keys",
				"sets_flag": "woke_up",
				"message_key": "room.car_closeup.seat.message",
				"hotspot_rect": Rect2(0.0244, 0.648, 0.4189, 0.3482)
			},
			{
				"id": "seat",
				"label_key": "room.car_closeup.keyring.label",
				"requires_flag_false": "found_keys",
				"gives_items": ["car_key", "mailbox_key"],
				"sets_flags": ["found_keys", "woke_up"],
				"objective_key": "room.car_closeup.keyring.objective",
				"message_key": "room.car_closeup.keyring.message",
				"sound": "key",
				"hotspot_rect": Rect2(0.0244, 0.648, 0.4189, 0.3482)
			},
			{
				"id": "exit-car",
				"label_key": "room.car_closeup.exit.label",
				"message_key": "room.car_closeup.exit.message",
				"goto_room": "parking_lot",
				"transition_sound": "car",
				"hotspot_rect": Rect2(0.5668, 0.0687, 0.4141, 0.8953)
			},
			{
				"id": "flee-engine",
				"label_key": "room.car_closeup.flee_engine.label",
				"requires_flag_true": "woke_up",
				"requires_flag_false": "flee_prompt_shown",
				"sets_flag": "flee_prompt_shown",
				"message_key": "room.car_closeup.flee_engine.message",
				"hotspot_rect": Rect2(0.28, 0.74, 0.44, 0.12)
			},
			{
				"id": "flee-confirm",
				"label_key": "room.car_closeup.flee_confirm.label",
				"requires_flag_true": "flee_prompt_shown",
				"message_key": "room.car_closeup.flee_confirm.message",
				"goto_room": "flee_ending",
				"hotspot_rect": Rect2(0.14, 0.74, 0.33, 0.12)
			},
			{
				"id": "flee-cancel",
				"label_key": "room.car_closeup.flee_cancel.label",
				"requires_flag_true": "flee_prompt_shown",
				"message_key": "room.car_closeup.flee_cancel.message",
				"clears_flags": ["flee_prompt_shown"],
				"hotspot_rect": Rect2(0.53, 0.74, 0.33, 0.12)
			}
		]
	}
