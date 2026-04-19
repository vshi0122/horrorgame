extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "back_stairwell",
		"title": "Blocked Stairwell",
		"hint": "The way back is gone. A wall covered in writing now stands where the stairs should be.",
		"background": "res://godot/asserts/images/back.jpg",
		"interactions": [
			{
				"id": "wall",
				"label": "Blood Writing",
				"message": "The same sentence is written over and over until it stops feeling like a warning and starts sounding like an order.",
				"hotspot_rect": Rect2(0.18, 0.18, 0.64, 0.46)
			},
			{
				"id": "photo",
				"label": "Photo in the Corner",
				"message": "The back of the photo reads J & M. Your face is still there, but the other one has been painted over in black.",
				"sound": "doc",
				"hotspot_rect": Rect2(0.08, 0.72, 0.18, 0.14),
				"document": {
					"id": "jm-photo",
					"title": "J & M Photo",
					"source": "Corner of the blocked stairwell",
					"body": "The back of the photo reads [b]J & M[/b].\nYour face is still there, but the other one has been painted over in black."
				}
			},
			{
				"id": "to-3f",
				"label": "Keep Going Up",
				"message": "There is nowhere left to go except farther up.",
				"objective": "Keep going and find out what the third floor became after the blackout.",
				"goto_room": "fake_third",
				"hotspot_rect": Rect2(0.64, 0.16, 0.2, 0.2)
			}
		]
	}
