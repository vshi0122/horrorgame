extends Node

const AUDIO_SOURCES := {
	"bgm": preload("res://godot/sounds/bgm.wav"),
	"eating": preload("res://godot/sounds/eating.mp3"),
	"footstep": preload("res://godot/sounds/footstep.wav"),
	"car": preload("res://godot/sounds/car.mp3"),
	"correct_password": preload("res://godot/sounds/correct password.wav"),
	"wrong_password": preload("res://godot/sounds/wrong.wav"),
	"key": preload("res://godot/sounds/key.mp3"),
	"doc": preload("res://godot/sounds/doc.wav"),
	"cry": preload("res://godot/sounds/cry.wav"),
	"jumpscare": preload("res://godot/sounds/jumpscare.wav"),
	"roar": preload("res://godot/sounds/roar.wav"),
	"ending2": preload("res://godot/sounds/ending2.wav"),
	"scream": preload("res://godot/sounds/scream.wav"),
	"open_something": preload("res://godot/sounds/open something.mp3"),
	"open_room": preload("res://godot/sounds/openroom.mp3")
}

var bgm_player: AudioStreamPlayer
var eating_ambient_player: AudioStreamPlayer
var footstep_ambient_player: AudioStreamPlayer
var transition_player: AudioStreamPlayer
var ui_sound_player: AudioStreamPlayer


func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	bgm_player = _create_player("BGMPlayer", -8.0)
	eating_ambient_player = _create_player("EatingAmbientPlayer", -7.8)
	footstep_ambient_player = _create_player("FootstepAmbientPlayer", -6.6)
	transition_player = _create_player("TransitionPlayer", 0.0)
	ui_sound_player = _create_player("UISoundPlayer", 0.0)
	bgm_player.stream = AUDIO_SOURCES["bgm"]
	eating_ambient_player.stream = AUDIO_SOURCES["eating"]
	footstep_ambient_player.stream = AUDIO_SOURCES["footstep"]
	bgm_player.finished.connect(_on_bgm_finished)


func _create_player(name: String, volume_db: float) -> AudioStreamPlayer:
	var player := AudioStreamPlayer.new()
	player.name = name
	player.bus = &"Master"
	player.volume_db = volume_db
	add_child(player)
	return player


func _on_bgm_finished() -> void:
	if bgm_player.stream != null:
		bgm_player.play()


func play_bgm() -> void:
	if bgm_player.stream == null:
		bgm_player.stream = AUDIO_SOURCES["bgm"]
	if not bgm_player.playing:
		bgm_player.play()


func stop_bgm() -> void:
	bgm_player.stop()


func sync_scene_ambient(room_id: String) -> void:
	var should_play_eating := room_id == "thirdFloorResidential"
	var footsteps_active := bool(GameState.flags.get("stairwellPhotoFootstepsActive", false))
	var should_play_footsteps := footsteps_active and not ["thirdFloorHall", "thirdFloorResidential"].has(room_id)

	if should_play_eating:
		if not eating_ambient_player.playing:
			eating_ambient_player.play()
	else:
		eating_ambient_player.stop()

	if should_play_footsteps:
		if not footstep_ambient_player.playing:
			footstep_ambient_player.play()
	else:
		footstep_ambient_player.stop()


func play_ui_sound(kind: String) -> void:
	var stream: AudioStream
	match kind:
		"key":
			stream = AUDIO_SOURCES["key"]
			ui_sound_player.volume_db = linear_to_db(0.5)
		"doc":
			stream = AUDIO_SOURCES["doc"]
			ui_sound_player.volume_db = linear_to_db(0.46)
		"open":
			stream = AUDIO_SOURCES["open_something"]
			ui_sound_player.volume_db = linear_to_db(0.46)
		_:
			return
	ui_sound_player.stream = stream
	ui_sound_player.play()


func play_feedback_sound(audio_key: String, volume: float = 0.42, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	var stream: AudioStream = AUDIO_SOURCES.get(audio_key)
	if stream == null:
		return
	transition_player.stream = stream
	transition_player.volume_db = linear_to_db(volume)
	transition_player.play()
	if wait_for_completion:
		await get_tree().create_timer(wait_ms).timeout


func play_scene_transition_sound(audio_key: String = "footstep", volume: float = 0.38, wait_for_completion: bool = false, wait_ms: float = 6.0) -> void:
	var stream: AudioStream = AUDIO_SOURCES.get(audio_key)
	if stream == null:
		return

	transition_player.stream = stream
	transition_player.volume_db = linear_to_db(volume)

	if audio_key == "footstep":
		transition_player.play()
		await get_tree().create_timer(0.26).timeout
		transition_player.play()
		await get_tree().create_timer(0.26).timeout
		transition_player.play()
	elif audio_key == "open_room":
		transition_player.play()
	else:
		transition_player.play()
		if wait_for_completion:
			await get_tree().create_timer(wait_ms).timeout
