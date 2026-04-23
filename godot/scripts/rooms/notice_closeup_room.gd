extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "notice_closeup",
		"title_key": "room.notice_closeup.title",
		"hint_key": "room.notice_closeup.hint",
		"background": "res://godot/asserts/images/messageboard.png",
		"interactions": [
			{
				"id": "arrival_notice",
				"label_key": "room.notice_closeup.arrival_notice.label",
				"requires_flag_false": "entrance_notice_read",
				"sets_flag": "entrance_notice_read",
				"message_key": "room.notice_closeup.arrival_notice.message",
				"hotspot_rect": Rect2(0.14, 0.14, 0.28, 0.52),
				"document": {
					"id": "arrival-notice-1f",
					"title_key": "doc.arrival_notice_1f.title",
					"source_key": "doc.arrival_notice_1f.source",
					"body_key": "doc.arrival_notice_1f.body"
				}
			},
			{
				"id": "arrival_notice_reread",
				"label_key": "room.notice_closeup.arrival_notice_reread.label",
				"requires_flag_true": "entrance_notice_read",
				"message_key": "room.notice_closeup.arrival_notice_reread.message",
				"hotspot_rect": Rect2(0.14, 0.14, 0.28, 0.52)
			},
			{
				"id": "power_notice",
				"label_key": "room.notice_closeup.power_notice.label",
				"requires_flag_false": "entrance_power_notice_read",
				"sets_flag": "entrance_power_notice_read",
				"message_key": "room.notice_closeup.power_notice.message",
				"hotspot_rect": Rect2(0.67, 0.66, 0.12, 0.16),
				"document": {
					"id": "voltage-notice-1f",
					"title_key": "doc.voltage_notice_1f.title",
					"source_key": "doc.voltage_notice_1f.source",
					"body_key": "doc.voltage_notice_1f.body"
				}
			},
			{
				"id": "power_notice_reread",
				"label_key": "room.notice_closeup.power_notice_reread.label",
				"requires_flag_true": "entrance_power_notice_read",
				"message_key": "room.notice_closeup.power_notice_reread.message",
				"hotspot_rect": Rect2(0.67, 0.66, 0.12, 0.16)
			},
			{
				"id": "notice_board_glance",
				"label_key": "room.notice_closeup.glance.label",
				"message_key": "room.notice_closeup.glance.message",
				"hotspot_rect": Rect2(0.52, 0.25, 0.34, 0.40)
			},
			{
				"id": "notice_closeup_back",
				"label_key": "room.notice_closeup.back.label",
				"message_key": "room.notice_closeup.back.message",
				"goto_room": "hallway",
				"hotspot_rect": Rect2(0.04, 0.86, 0.12, 0.1),
				"ui_style": "corner_back"
			}
		]
	}
