extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "notice_closeup",
		"title": "Notice Board",
		"hint": "The paper has been handled so often that the corners feel greasy.",
		"background": "res://js/images/letterbox.jpg",
		"interactions": [
			{
				"id": "notice_read_handwriting",
				"label": "Study the handwriting",
				"message": "The ink digs into the paper. Whoever wrote the warning pressed hard enough to nearly tear through it.",
				"hotspot_rect": Rect2(0.28, 0.34, 0.32, 0.18)
			},
			{
				"id": "notice",
				"label": "Record the warning",
				"requires_flag_false": "entrance_notice_read",
				"sets_flag": "entrance_notice_read",
				"message": "The notice warns residents not to answer knocks after midnight. A handwritten line has been added underneath: 'If she is humming, do not let her in.'",
				"hotspot_rect": Rect2(0.22, 0.22, 0.44, 0.38),
				"document": {
					"id": "night_notice",
					"title": "Night Shift Notice",
					"source": "Entrance notice board",
					"body": "Residents are advised not to answer unexpected knocking after 12:00 AM. Maintenance will not visit at night. Handwritten below in darker ink: If she is humming, do not let her in."
				}
			},
			{
				"id": "notice_closeup_back",
				"label": "↙",
				"message": "You step back from the board. The entrance suddenly feels smaller.",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.03, 0.84, 0.1, 0.12),
				"ui_style": "corner_back"
			}
		]
	}
