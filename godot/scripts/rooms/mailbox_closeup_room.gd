extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "mailbox_closeup",
		"title_key": "room.mailbox_closeup.title",
		"hint_key": "room.mailbox_closeup.hint",
		"background": "res://godot/asserts/images/letterbox.jpg",
		"interactions": [
			{
				"id": "open-mailbox",
				"label_key": "room.mailbox_closeup.open.label",
				"requires_item": "mailbox_key",
				"requires_flag_false": "mailbox_opened",
				"sets_flags": ["mailbox_opened", "code_discovered"],
				"objective_key": "room.mailbox_closeup.open.objective",
				"message_key": "room.mailbox_closeup.open.message",
				"sound": "doc",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304),
				"documents": [
					{
						"id": "notice-door-code",
						"title_key": "doc.notice_door_code.title",
						"source_key": "doc.notice_door_code.source",
						"body_key": "doc.notice_door_code.body"
					},
					{
						"id": "newspaper-clipping",
						"title_key": "doc.newspaper_clipping.title",
						"source_key": "doc.newspaper_clipping.source",
						"body_key": "doc.newspaper_clipping.body"
					}
				]
			},
			{
				"id": "open-mailbox",
				"label_key": "room.mailbox_closeup.review.label",
				"requires_flag_true": "mailbox_opened",
				"message_key": "room.mailbox_closeup.review.message",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304),
				"documents": [
					{
						"id": "notice-door-code",
						"title_key": "doc.notice_door_code.title",
						"source_key": "doc.notice_door_code.source",
						"body_key": "doc.notice_door_code.body"
					},
					{
						"id": "newspaper-clipping",
						"title_key": "doc.newspaper_clipping.title",
						"source_key": "doc.newspaper_clipping.source",
						"body_key": "doc.newspaper_clipping.body"
					}
				]
			},
			{
				"id": "open-mailbox",
				"label_key": "room.mailbox_closeup.locked.label",
				"requires_missing_item": "mailbox_key",
				"message_key": "room.mailbox_closeup.locked.message",
				"hotspot_rect": Rect2(0.2774, 0.2675, 0.4782, 0.2304)
			},
			{
				"id": "back-entrance",
				"label_key": "room.mailbox_closeup.back.label",
				"message_key": "room.mailbox_closeup.back.message",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.3856, 0.8598, 0.2194, 0.1357),
				"ui_style": "corner_back"
			}
		]
	}
