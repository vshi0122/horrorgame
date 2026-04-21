extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "back_stairwell",
		"title": "封死的楼梯间",
		"hint": "回去的路不见了。原本应该是楼梯的位置，立着一面写满字的墙。",
		"background": "res://godot/asserts/images/back.jpg",
		"interactions": [
			{
				"id": "wall",
				"label": "血字",
				"message": "同一句话被反复写满整面墙。看久了，它不再像警告，更像命令。",
				"hotspot_rect": Rect2(0.18, 0.18, 0.64, 0.46)
			},
			{
				"id": "photo",
				"label": "角落里的照片",
				"message": "照片背面写着 J & M。你的脸还在，另一张脸却被黑色颜料反复涂掉了。",
				"sound": "doc",
				"hotspot_rect": Rect2(0.08, 0.72, 0.18, 0.14),
				"document": {
					"id": "jm-photo",
					"title": "J & M 合照",
					"source": "封死楼梯间的角落",
					"body": "照片背面写着 [b]J & M[/b]。\n你的脸还在，另一张脸却被黑色颜料反复涂掉了。"
				}
			},
			{
				"id": "to-3f",
				"label": "继续往上",
				"message": "已经没有别的路了，你只能继续往上。",
				"objective": "继续往上，看看停电后的三楼变成了什么。",
				"goto_room": "fake_third",
				"hotspot_rect": Rect2(0.64, 0.16, 0.2, 0.2)
			}
		]
	}
