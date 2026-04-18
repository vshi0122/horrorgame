extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "fake_third",
		"title": "假三楼",
		"hint": "这里乍看像三楼走廊，但越盯着看越觉得比例不对。",
		"background": "res://godot/asserts/images/fake3rd.jpg",
		"interactions": [
			{
				"id": "left-wall-text",
				"label": "都是你的错",
				"message": "左边墙上的字像刚从墙体里渗出来：都是你的错。",
				"hotspot_rect": Rect2(0.08, 0.22, 0.2, 0.4)
			},
			{
				"id": "right-wall-text",
				"label": "她死了",
				"message": "右边的字更短，也更重：她死了。",
				"hotspot_rect": Rect2(0.72, 0.22, 0.2, 0.4)
			},
			{
				"id": "return-stairwell",
				"label": "回楼梯间",
				"message": "你从这条错误的走廊里退开，回到那间被封死的楼梯间。",
				"goto_room": "back_stairwell",
				"hotspot_rect": Rect2(0.35, 0.77, 0.26, 0.12)
			},
			{
				"id": "upstairs-question",
				"label": "往上走？",
				"message": "你继续往上，前方空气里的味道已经不像楼道，更像某种被处理失败的东西。",
				"goto_room": "smell_room",
				"hotspot_rect": Rect2(0.42, 0.16, 0.18, 0.46)
			}
		]
	}
