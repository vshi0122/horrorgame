extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "ending_wake_second_question",
		"title": "陌生房间",
		"hint": "第一个答案落下后，房间里多出一把椅子的影子。",
		"background": "res://godot/asserts/images/home.jpg",
		"interactions": [
			{
				"id": "second-question",
				"label": "回答第二个问题",
				"message": "那个声音继续问：停电后的出口密码是什么？",
				"code_input": {
					"prompt": "第二个问题：停电后的出口密码是什么？",
					"solution": "0000",
					"failure_message": "回答错了。椅子的影子碎开，你被送回最开始的地方。",
					"failure_resets_game": true
				},
				"goto_room": "waking_room",
				"hotspot_rect": Rect2(0.28, 0.3, 0.44, 0.2)
			},
			{
				"id": "give-up",
				"label": "闭上眼",
				"message": "你拒绝继续回答。下一秒，你又回到那辆车里。",
				"resets_game": true,
				"hotspot_rect": Rect2(0.38, 0.7, 0.24, 0.12)
			}
		]
	}
