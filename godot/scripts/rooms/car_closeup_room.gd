extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "car_closeup",
		"title": "Driver's Seat",
		"hint": "The stale air inside the car feels heavier than the rain outside.",
		"background": "res://js/images/car.jpg",
		"interactions": [
			{
				"id": "car_mirror_detail",
				"label": "Check the mirror",
				"message": "For a second, the mirror shows the apartment entrance behind you. Then your own tired face returns, pale and alone.",
				"hotspot_rect": Rect2(0.42, 0.08, 0.16, 0.12)
			},
			{
				"id": "keys",
				"label": "Take the keys",
				"requires_flag_false": "found_keys",
				"gives_item": "Car Keys",
				"sets_flag": "found_keys",
				"message": "You pick up the keys. Their weight makes the night feel more real.",
				"hotspot_rect": Rect2(0.56, 0.72, 0.12, 0.12)
			},
			{
				"id": "car_closeup_back",
				"label": "↙",
				"message": "You pull back from the driver's seat and look out toward the apartment again.",
				"goto_room": "parking_lot",
				"hotspot_rect": Rect2(0.03, 0.84, 0.1, 0.12),
				"ui_style": "corner_back"
			}
		]
	}
