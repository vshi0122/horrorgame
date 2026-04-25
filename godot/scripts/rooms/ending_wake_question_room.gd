extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "ending_wake_question",
		"title": "陌生房间",
		"hint": "你在一间陌生的房间里醒来。有人在黑暗里等你回答。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "first-question",
				"label": "回答第一个问题",
				"message": "那个声音问：照片背后的字母是什么？",
				"code_input": {
					"prompt": "第一个问题：照片背后的字母是什么？",
					"solution": "JM",
					"case_sensitive": false,
					"failure_message": "回答错了。陌生房间像被人关掉一样消失。",
					"failure_resets_game": true
				},
				"goto_room": "ending_wake_second_question",
				"hotspot_rect": Rect2(0.28, 0.3, 0.44, 0.2)
			},
			{
				"id": "give-up",
				"label": "闭上眼",
				"message": "你拒绝回答。下一秒，你又回到那辆车里。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.7, 0.24, 0.12)
			}
		]
	}
