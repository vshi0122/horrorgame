extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "back_stairwell",
		"title": "被封死的二楼楼梯间",
		"hint": "退路消失了，原本该有楼梯的位置只剩一面写满字的墙。",
		"background": "res://godot/asserts/images/back.jpg",
		"interactions": [
			{
				"id": "wall",
				"label": "血字墙面",
				"message": "鲜血在墙上反复叠成同一句话，已经不像提醒，更像命令：她在等你。",
				"hotspot_rect": Rect2(0.18, 0.18, 0.64, 0.46)
			},
			{
				"id": "photo",
				"label": "角落里的合影",
				"message": "刚才那是什么……？照片里被涂黑的脸像动了一下，J & M 这几个字母像在提醒你什么。",
				"goto_room": "picture_room",
				"hotspot_rect": Rect2(0.08, 0.72, 0.18, 0.14),
				"document": {
					"id": "jm-photo",
					"title": "J & M 合影",
					"source": "被封死的二楼楼梯间角落",
					"body": "照片背后写着 [b]J & M[/b]。\n你的脸还留在照片里，她的脸却被整块涂黑了。"
				}
			},
			{
				"id": "to-3f",
				"label": "往上走",
				"message": "这里已经没有回头路了，唯一还开着的方向只剩更高处。",
				"goto_room": "fake_third",
				"hotspot_rect": Rect2(0.64, 0.16, 0.2, 0.2)
			}
		]
	}
