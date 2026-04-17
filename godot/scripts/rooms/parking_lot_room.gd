extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "parking_lot",
		"title": "Parking Lot",
		"hint": "Rainwater glows under the lamps. The apartment entrance waits ahead.",
		"background": "res://js/images/parkinglot.jpg",
		"interactions": [
			{
				"id": "car",
				"label": "Look inside the car",
				"message": "You lean toward the driver's side and peer into the dim interior.",
				"hotspot_rect": Rect2(0.13, 0.46, 0.22, 0.22),
				"goto_room": "car_closeup"
			},
			{
				"id": "keys",
				"label": "Take the keys",
				"requires_flag_false": "found_keys",
				"gives_item": "Car Keys",
				"sets_flag": "found_keys",
				"message": "You pick up the keys. Their weight makes the night feel more real.",
				"hotspot_rect": Rect2(0.27, 0.58, 0.08, 0.08),
				"visible": false
			},
			{
				"id": "gate",
				"label": "Approach the apartment gate",
				"requires_item": "Car Keys",
				"sets_flag": "gate_unlocked",
				"message": "The lock clicks open. Beyond it is the first true room of the remake.",
				"objective": "Step into the entrance and search for the clue that explains what is wrong with this building.",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.63, 0.28, 0.18, 0.36)
			}
		]
	}
