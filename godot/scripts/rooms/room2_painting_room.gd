extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_painting",
		"title": "房间 2 - 画",
		"hint": "画本身没有动，但它周围的房间开始变得不那么确定。",
		"background": "res://godot/asserts/images/room2 painting.jpg",
		"interactions": [
			{
				"id": "left-frame",
				"label": "左侧画框",
				"message": "左侧画框里一片空白，像是有什么东西还没有被放回去。",
				"goto_room": "room2_paint_3paints",
				"hotspot_rect": Rect2(0.33, 0.23, 0.13, 0.25)
			},
			{
				"id": "middle-frame",
				"label": "中间画框",
				"message": "中间画框正对着你。空白比图案更像答案。",
				"goto_room": "room2_paint_3paints",
				"hotspot_rect": Rect2(0.48, 0.23, 0.13, 0.25)
			},
			{
				"id": "right-frame",
				"label": "右侧画框",
				"message": "右侧画框挂得很稳，底边却像刚被人碰过。",
				"goto_room": "room2_paint_3paints",
				"hotspot_rect": Rect2(0.63, 0.23, 0.13, 0.25)
			},
			{
				"id": "small-device",
				"label": "下方的小机关",
				"message": "画框下方的小机关刻着几个符号，旁边有一个加号。",
				"goto_room": "room2_paint_table",
				"hotspot_rect": Rect2(0.50, 0.50, 0.07, 0.05)
			},
			{
				"id": "left-table",
				"label": "左边的桌子",
				"message": "小桌上的书被合上了，抽屉把手露在阴影里。",
				"goto_room": "room2_paint_desk_1",
				"hotspot_rect": Rect2(0.09, 0.59, 0.15, 0.30)
			},
			{
				"id": "right-cabinet",
				"label": "右侧的小柜子",
				"message": "右侧小柜子上摆着雕像和纸巾盒，柜门后面像是空的，又不像。",
				"goto_room": "room2_paint_desk_2",
				"hotspot_rect": Rect2(0.74, 0.62, 0.20, 0.28)
			},
			{
				"id": "to-bed",
				"label": "v",
				"message": "你回到房间中央。",
				"goto_room": "room2_sleep",
				"hotspot_rect": Rect2(0.03, 0.82, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-desk",
				"label": ">",
				"message": "现在只有桌子像是还能被触碰的东西。",
				"goto_room": "room2_desk",
				"hotspot_rect": Rect2(0.91, 0.68, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-board",
				"label": "<",
				"message": "板子也许能解释这幅画为什么会在这里。",
				"goto_room": "room2_board",
				"hotspot_rect": Rect2(0.03, 0.44, 0.06, 0.10),
				"ui_style": "scene_arrow"
			}
		]
	}
