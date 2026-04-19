extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "parking_lot",
		"title_key": "room.parking_lot.title",
		"hint_key": "room.parking_lot.hint",
		"background": "res://godot/asserts/images/parkinglot.jpg",
		"interactions": [
			{
				"id": "trunk",
				"label_key": "room.parking_lot.trunk.label",
				"requires_item": "car_key",
				"requires_flag_false": "trunk_opened",
				"sets_flag": "trunk_opened",
				"message_key": "room.parking_lot.trunk.message",
				"goto_room": "trunk_closeup",
				"hotspot_rect": Rect2(0.0, 0.5303, 0.3263, 0.225)
			},
			{
				"id": "trunk",
				"label_key": "room.parking_lot.trunk.revisit.label",
				"requires_flag_true": "trunk_opened",
				"message_key": "room.parking_lot.trunk.revisit.message",
				"goto_room": "trunk_closeup",
				"hotspot_rect": Rect2(0.0, 0.5303, 0.3263, 0.225)
			},
			{
				"id": "to-entrance",
				"label_key": "room.parking_lot.entrance.label",
				"message_key": "room.parking_lot.entrance.message",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.5765, 0.0815, 0.3151, 0.3821)
			},
			{
				"id": "back-car",
				"label_key": "room.parking_lot.back_car.label",
				"message_key": "room.parking_lot.back_car.message",
				"goto_room": "car_closeup",
				"hotspot_rect": Rect2(0.3748, 0.4797, 0.2333, 0.4356)
			}
		]
	}
