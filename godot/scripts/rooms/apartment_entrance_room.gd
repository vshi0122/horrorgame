extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "apartment_entrance",
		"title": "公寓门口",
		"hint": "公寓门上栓了密码锁，面板在夜里泛着冷光。",
		"background": "res://godot/asserts/images/gate.jpg",
		"interactions": [
			{
				"id": "mailbox",
				"label": "查看信箱",
				"message": "门禁密码显然被换过了，信箱里也许留着通知。",
				"hotspot_rect": Rect2(0.0146, 0.3044, 0.18, 0.26),
				"goto_room": "mailbox_closeup"
			},
			{
				"id": "door",
				"label": "查看大门密码锁",
				"message": "数字面板亮着，但你还得先确认正确密码。",
				"hotspot_rect": Rect2(0.4709, 0.1242, 0.22, 0.56),
				"goto_room": "pin_room"
			},
			{
				"id": "back-parking",
				"label": "回停车场",
				"message": "你从门口退开，身后停车场里还残着雨水滴落的声音。",
				"goto_room": "parking_lot",
				"hotspot_rect": Rect2(0.2302, 0.7836, 0.6085, 0.211)
			}
		]
	}
