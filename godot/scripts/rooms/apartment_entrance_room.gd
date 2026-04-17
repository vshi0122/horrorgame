extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "apartment_entrance",
		"title": "Apartment Entrance",
		"hint": "The lobby smells of wet concrete and old paper. Someone has pinned a notice crookedly beside the mailboxes.",
		"background": "res://js/images/gate.jpg",
		"interactions": [
			{
				"id": "notice",
				"label": "Inspect the notice board",
				"message": "You step closer to the board, where one handwritten warning stands out from the rest.",
				"hotspot_rect": Rect2(0.15, 0.25, 0.18, 0.22),
				"goto_room": "notice_closeup"
			},
			{
				"id": "mailboxes",
				"label": "Inspect the mailboxes",
				"message": "One mailbox hangs slightly open. Something pale is folded inside.",
				"hotspot_rect": Rect2(0.36, 0.3, 0.18, 0.28),
				"goto_room": "mailbox_closeup"
			},
			{
				"id": "stairs",
				"label": "Head for the stairwell",
				"requires_flag_true": "entrance_notice_read",
				"message": "You leave the entrance with two fragments in mind: midnight knocking and someone named M.",
				"objective": "Search the stairwell for the next sign of room 302 and the woman who hums after midnight.",
				"goto_room": "stairwell_landing",
				"hotspot_rect": Rect2(0.68, 0.15, 0.2, 0.56)
			}
		]
	}
