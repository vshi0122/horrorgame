extends RefCounted


static func build() -> Dictionary:
	return {
		"id": "stairwell_landing",
		"title": "Stairwell Landing",
		"hint": "The fluorescent light stutters. Wet footprints continue upward, but only from a single pair of shoes.",
		"background": "res://js/images/1st floor.jpg",
		"interactions": [
			{
				"id": "footprints",
				"label": "Inspect the footprints",
				"requires_flag_false": "stairwell_footprints_checked",
				"sets_flag": "stairwell_footprints_checked",
				"message": "The wet marks stop halfway up the stairs, as if whoever made them vanished mid-step.",
				"hotspot_rect": Rect2(0.18, 0.66, 0.22, 0.18),
				"inspect": {
					"title": "Wet Footprints",
					"body": "The prints are fresh. Each step is narrow, careful, almost hesitant. Halfway up, they simply end.",
					"image": "res://js/images/1st floor.jpg",
					"confirm_label": "Step back",
					"actions": [
						{
							"label": "Follow the trail with your eyes",
							"type": "text",
							"body": "There should be another mark near the top step, but there isn't. The absence feels staged, like the stairwell wants you to notice it."
						},
						{
							"label": "Commit this detail to memory",
							"type": "confirm"
						}
					]
				},
				"document": {
					"id": "stairwell_footprints",
					"title": "Footprint Note",
					"source": "First stairwell landing",
					"body": "A single set of wet footprints climbed the stairs and stopped in the middle of the flight. No return trail. No second person."
				}
			},
			{
				"id": "intercom",
				"label": "Check the dead intercom",
				"requires_flag_false": "intercom_checked",
				"sets_flag": "intercom_checked",
				"message": "The intercom is dead, but apartment 302 has been scratched so many times the metal looks bruised.",
				"hotspot_rect": Rect2(0.67, 0.3, 0.12, 0.22),
				"inspect": {
					"title": "Building Intercom",
					"body": "Most apartment buttons are untouched. [b]302[/b] has been scored over and over by the same impatient nail.",
					"image": "res://js/images/pin.jpg",
					"confirm_label": "Leave the intercom",
					"actions": [
						{
							"label": "Study apartment 302",
							"type": "text",
							"body": "The repeated scratches over 302 match the hospital slip downstairs. Someone was obsessing over that room long before you arrived."
						}
					]
				}
			},
			{
				"id": "go_up",
				"label": "Climb toward the second floor",
				"requires_flag_true": "stairwell_footprints_checked",
				"message": "You move upward with the missing footsteps in mind. The second floor should be next.",
				"objective": "Build the second-floor hall next, using room 302 and the missing footsteps as the puzzle thread.",
				"hotspot_rect": Rect2(0.48, 0.08, 0.18, 0.42)
			}
		]
	}
