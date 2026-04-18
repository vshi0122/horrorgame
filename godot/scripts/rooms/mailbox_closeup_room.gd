extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "mailbox_closeup",
		"title": "信箱前",
		"hint": "一排老旧信箱挂在潮湿的墙边。",
		"background": "res://godot/asserts/images/letterbox.jpg",
		"interactions": [
			{
				"id": "open-mailbox",
				"label": "打开并取件",
				"requires_item": "信箱钥匙",
				"requires_flag_false": "mailbox_opened",
				"sets_flags": ["mailbox_opened", "code_discovered"],
				"objective": "你已经拿到通知，可以返回入口输入密码。",
				"message": "你打开信箱，从宣传单下面抽出物业通知和一页折过的旧报纸。",
				"sound": "doc",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304),
				"documents": [
					{
						"id": "notice-door-code",
						"title": "物业门禁通知",
						"source": "1 号楼一层信箱",
						"body": "各位住户：\n\n1 号楼门禁密码已统一更换为 [b]0327[/b]。\n如遇全楼停电，门禁将临时重置为 [b]0000[/b] 以便住户疏散。\n\n公寓物业管理处"
					},
					{
						"id": "newspaper-clipping",
						"title": "旧报纸剪页",
						"source": "1 号楼一层信箱",
						"body": "《河岸晚报》社会版\n\n老城区近日连续出现住户失踪事件，目击者称失踪前常能在楼道中听见异常敲门声。\n报道末尾被圈出一句奇怪广告：\n\n[i]当你看见黑白的标志时，记得醒来。[/i]"
					}
				]
			},
			{
				"id": "open-mailbox",
				"label": "查看已取出的通知",
				"requires_flag_true": "mailbox_opened",
				"message": "你又看了一遍通知，上面的数字仍是 0327。",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304),
				"documents": [
					{
						"id": "notice-door-code",
						"title": "物业门禁通知",
						"source": "1 号楼一层信箱",
						"body": "各位住户：\n\n1 号楼门禁密码已统一更换为 [b]0327[/b]。\n如遇全楼停电，门禁将临时重置为 [b]0000[/b] 以便住户疏散。\n\n公寓物业管理处"
					},
					{
						"id": "newspaper-clipping",
						"title": "旧报纸剪页",
						"source": "1 号楼一层信箱",
						"body": "《河岸晚报》社会版\n\n老城区近日连续出现住户失踪事件，目击者称失踪前常能在楼道中听见异常敲门声。\n报道末尾被圈出一句奇怪广告：\n\n[i]当你看见黑白的标志时，记得醒来。[/i]"
					}
				]
			},
			{
				"id": "open-mailbox",
				"label": "尝试打开信箱",
				"requires_missing_item": "信箱钥匙",
				"message": "信箱锁着。你得先找到钥匙。",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304)
			},
			{
				"id": "back-entrance",
				"label": "返回入口",
				"message": "你让信箱门慢慢弹回去，重新看向入口旁的密码锁。",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.3856, 0.8598, 0.2194, 0.1357),
				"ui_style": "corner_back"
			}
		]
	}
