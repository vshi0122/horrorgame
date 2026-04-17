extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "mailbox_closeup",
		"title": "Mailbox 302",
		"hint": "One compartment hangs open as if it was left that way in a hurry.",
		"background": "res://js/images/letterbox.jpg",
		"interactions": [
			{
				"id": "mailbox_label_detail",
				"label": "Check the peeled label",
				"message": "The name has been peeled away, but the adhesive stain still outlines a long surname. Someone wanted 302 to become anonymous.",
				"hotspot_rect": Rect2(0.16, 0.22, 0.28, 0.16)
			},
			{
				"id": "mailboxes",
				"label": "Take the hospital slip",
				"requires_flag_false": "mailbox_checked",
				"sets_flag": "mailbox_checked",
				"message": "Most of the boxes are empty, except for one folded prescription slip tucked into box 302.",
				"hotspot_rect": Rect2(0.3, 0.36, 0.2, 0.18),
				"document": {
					"id": "prescription_slip",
					"title": "Prescription Slip",
					"source": "Mailbox 302",
					"body": "Patient initials: M. Diagnosis withheld. Sedation increased after recurring episodes of dissociation, auditory fixation, and night-return behavior."
				}
			},
			{
				"id": "mailbox_closeup_back",
				"label": "↙",
				"message": "You let the mailbox door swing shut and listen to the sound echo through the entrance.",
				"goto_room": "apartment_entrance",
				"hotspot_rect": Rect2(0.03, 0.84, 0.1, 0.12),
				"ui_style": "corner_back"
			}
		]
	}
