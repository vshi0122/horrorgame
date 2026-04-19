extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "trunk_closeup",
		"title_key": "room.trunk_closeup.title",
		"hint_key": "room.trunk_closeup.hint",
		"background": "res://godot/asserts/images/truck.jpg",
		"interactions": [
			{
				"id": "take-letter",
				"label_key": "room.trunk_closeup.letter.label",
				"requires_flag_false": "trunk_letter_taken",
				"sets_flag": "trunk_letter_taken",
				"message_key": "room.trunk_closeup.letter.message",
				"sound": "doc",
				"hotspot_rect": Rect2(0.4028, 0.595, 0.191, 0.146),
				"documents": [
					{
						"id": "trunk-letter",
						"title_key": "doc.trunk_letter.title",
						"source_key": "doc.trunk_letter.source",
						"body_key": "doc.trunk_letter.body"
					}
				]
			},
			{
				"id": "take-letter",
				"label_key": "room.trunk_closeup.letter.review.label",
				"requires_flag_true": "trunk_letter_taken",
				"message_key": "room.trunk_closeup.letter.review.message",
				"hotspot_rect": Rect2(0.4028, 0.595, 0.191, 0.146),
				"documents": [
					{
						"id": "trunk-letter",
						"title_key": "doc.trunk_letter.title",
						"source_key": "doc.trunk_letter.source",
						"body_key": "doc.trunk_letter.body"
					}
				]
			},
			{
				"id": "take-ketchup",
				"label_key": "room.trunk_closeup.ketchup.label",
				"requires_flag_false": "trunk_ketchup_taken",
				"gives_item": "ketchup",
				"sets_flag": "trunk_ketchup_taken",
				"objective_key": "room.trunk_closeup.ketchup.objective",
				"message_key": "room.trunk_closeup.ketchup.message",
				"hotspot_rect": Rect2(0.635, 0.332, 0.182, 0.373)
			},
			{
				"id": "back-parking",
				"label_key": "room.trunk_closeup.back.label",
				"message_key": "room.trunk_closeup.back.message",
				"goto_room": "parking_lot",
				"hotspot_rect": Rect2(0.334, 0.854, 0.332, 0.133),
				"ui_style": "corner_back"
			}
		]
	}
