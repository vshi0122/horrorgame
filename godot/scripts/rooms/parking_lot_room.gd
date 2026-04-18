extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "parking_lot",
		"title": "停车场",
		"hint": "雨后的地面泛着冷光，车就停在你身后，公寓入口在前方。",
		"background": "res://godot/asserts/images/parkinglot.jpg",
		"interactions": [
			{
				"id": "trunk",
				"label": "打开后备箱",
				"requires_item": "车钥匙",
				"requires_flag_false": "trunk_opened",
				"gives_item": "番茄酱",
				"sets_flag": "trunk_opened",
				"objective": "去公寓门口。",
				"message": "你打开后备箱，从杂物袋里翻出那瓶番茄酱。",
				"hotspot_rect": Rect2(0.0, 0.5303, 0.3263, 0.225)
			},
			{
				"id": "to-entrance",
				"label": "前往公寓门口",
				"message": "你穿过停车场，朝公寓入口走去。",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.5765, 0.0815, 0.3151, 0.3821)
			},
			{
				"id": "back-car",
				"label": "回车里",
				"message": "你回头看向自己的车，潮湿而封闭的空气还困在里面。",
				"goto_room": "car_closeup",
				"hotspot_rect": Rect2(0.3748, 0.4797, 0.2333, 0.4356)
			}
		]
	}
