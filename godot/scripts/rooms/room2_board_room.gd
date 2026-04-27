extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "room2_board",
		"title": "房间 2 - 板子",
		"hint": "板子上贴满了碎片，像是专门留给你拼起来的。",
		"background": "res://godot/asserts/images/room2 board.jpg",
		"interactions": [
			{
				"id": "vent",
				"label": "通风口",
				"message": "通风口里只有一层冷风，像是从更深的房间吹出来。",
				"hotspot_rect": Rect2(0.25, 0.08, 0.14, 0.14)
			},
			{
				"id": "left-wall-board",
				"label": "左侧板子",
				"message": "左边的证明板被端正地挂着，纸面上的字像是被刻意留给你看的。",
				"hotspot_rect": Rect2(0.10, 0.24, 0.13, 0.25)
			},
			{
				"id": "middle-wall-board",
				"label": "中间板子",
				"message": "中间的板子上钉着几张纸。每一张都像缺了一点上下文。",
				"hotspot_rect": Rect2(0.29, 0.26, 0.22, 0.25)
			},
			{
				"id": "right-wall-board",
				"label": "右侧符号板",
				"message": "符号和数字被写得很清楚：太阳、月亮、药片和文件。",
				"hotspot_rect": Rect2(0.60, 0.24, 0.13, 0.27)
			},
			{
				"id": "box",
				"label": "箱子",
				"message": "箱子被锁扣扣住。它看起来不重，但不该被随便打开。",
				"hotspot_rect": Rect2(0.63, 0.57, 0.11, 0.10)
			},
			{
				"id": "cabinet",
				"label": "柜子",
				"message": "箱子下面的柜门合得很紧，门把手上没有灰。",
				"hotspot_rect": Rect2(0.58, 0.64, 0.20, 0.29)
			},
			{
				"id": "clothes",
				"label": "右侧衣服",
				"message": "衣服沉沉地挂在架子上，布料里像藏着一截没有说完的话。",
				"hotspot_rect": Rect2(0.84, 0.29, 0.08, 0.45)
			},
			{
				"id": "to-bed",
				"label": "v",
				"message": "你从板子前退开。",
				"goto_room": "room2_sleep",
				"hotspot_rect": Rect2(0.03, 0.82, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-desk",
				"label": ">",
				"message": "桌子上也许有缺失的顺序。",
				"goto_room": "room2_desk",
				"hotspot_rect": Rect2(0.91, 0.68, 0.06, 0.10),
				"ui_style": "scene_arrow"
			},
			{
				"id": "to-painting",
				"label": "^",
				"message": "板子上的一个形状让你想起那幅画。",
				"goto_room": "room2_painting",
				"hotspot_rect": Rect2(0.91, 0.24, 0.06, 0.10),
				"ui_style": "scene_arrow"
			}
		]
	}
