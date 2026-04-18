extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "picture_room",
		"title": "合影",
		"hint": "你的脸还留在照片里，妻子的脸却被整块涂黑了。",
		"background": "res://godot/asserts/images/picture.jpg",
		"interactions": [
			{
				"id": "back",
				"label": "返回",
				"message": "你放下照片，重新看向那间被封死的楼梯间。",
				"goto_room": "back_stairwell",
				"hotspot_rect": Rect2(0.34, 0.78, 0.32, 0.12)
			}
		]
	}
