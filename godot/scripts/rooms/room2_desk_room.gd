extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_desk",
		"title": "房间 2 - 桌子",
		"hint": "桌面上放着这间房最想被读懂的部分。",
		"background": "res://godot/asserts/images/room2 desk.jpg",
		"interactions": [
			{
				"id": "mind-poster",
				"label": "海报",
				"message": "海报上写着 THE HUMAN MIND。那颗被剖开的脑袋看起来太安静了。",
				"goto_room": "room2_desk_book",
				"hotspot_rect": Rect2(0.24, 0.18, 0.12, 0.26)
			},
			{
				"id": "clock",
				"label": "钟表",
				"message": "钟表的指针停在一个过于端正的位置，像是在等你确认时间。",
				"goto_room": "room2_desk_clock",
				"hotspot_rect": Rect2(0.48, 0.16, 0.08, 0.12)
			},
			{
				"id": "certificate",
				"label": "右侧奖状",
				"message": "奖状被挂在门旁边。字迹小得像是故意不让你轻易读完。",
				"goto_room": "room2_desk_book",
				"hotspot_rect": Rect2(0.62, 0.26, 0.09, 0.12)
			},
			{
				"id": "medical-record",
				"label": "桌上的病历单",
				"message": "病历单被夹在板上，边角压得很平。上面的记录不像第一次被人翻看。",
				"goto_room": "room2_desk_med",
				"hotspot_rect": Rect2(0.29, 0.59, 0.13, 0.08)
			},
			{
				"id": "medicine-bottles",
				"label": "四个药瓶",
				"message": "四个药瓶排成一列，标签颜色各不相同，像某种顺序。",
				"goto_room": "room2_desk_med",
				"hotspot_rect": Rect2(0.52, 0.56, 0.14, 0.09)
			},
			{
				"id": "desk-box",
				"label": "桌右下角的箱子",
				"message": "箱子上有四位数字锁。它被放在桌子右下角，离门很近。",
				"goto_room": "room2_desk_box",
				"hotspot_rect": Rect2(0.77, 0.80, 0.17, 0.16)
			},
			{
				"id": "to-bed",
				"label": "v",
				"message": "你从桌前退回房间中央。",
				"goto_room": "room2_sleep",
				"hotspot_rect": Rect2(0.03, 0.82, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-board",
				"label": "<",
				"message": "板子上的某些痕迹似乎能和桌面对应起来。",
				"goto_room": "room2_board",
				"hotspot_rect": Rect2(0.03, 0.44, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-painting",
				"label": ">",
				"message": "离开桌子时，你总觉得那幅画的位置变了。",
				"goto_room": "room2_painting",
				"hotspot_rect": Rect2(0.91, 0.44, 0.06, 0.10),
				"ui_style": "scene_arrow"
			}
		]
	}
