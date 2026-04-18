extends Node

const DEFAULT_LOCALE := "zh_CN"
const LOCALE_PATHS := {
	"zh_CN": "res://godot/locales/zh_CN.json"
}

var current_locale: String = DEFAULT_LOCALE
var messages: Dictionary = {}


func _ready() -> void:
	load_locale(DEFAULT_LOCALE)


func load_locale(locale: String) -> void:
	var path := str(LOCALE_PATHS.get(locale, ""))
	if path == "":
		push_warning("Missing locale path for %s" % locale)
		return

	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		push_warning("Unable to open locale file: %s" % path)
		return

	var parsed = JSON.parse_string(file.get_as_text())
	if not (parsed is Dictionary):
		push_warning("Locale file is not a dictionary: %s" % path)
		return

	current_locale = locale
	messages = parsed


func t(key: String, params: Dictionary = {}, fallback: String = "") -> String:
	if key == "":
		return fallback

	var template := str(messages.get(key, fallback if fallback != "" else key))
	var safe_params: Dictionary = params if params is Dictionary else {}
	for param_key_variant in safe_params.keys():
		var token := "{%s}" % str(param_key_variant)
		template = template.replace(token, str(safe_params[param_key_variant]))
	return template


func text_from(data: Dictionary, field: String, fallback: String = "") -> String:
	var key_field := "%s_key" % field
	var key := str(data.get(key_field, ""))
	if key != "":
		var params_field := "%s_params" % field
		var params_variant = data.get(params_field, {})
		var params: Dictionary = params_variant if params_variant is Dictionary else {}
		return t(key, params, fallback)

	return str(data.get(field, fallback))


func item_name(item_id: String) -> String:
	if item_id == "":
		return ""
	return t("item.%s.name" % item_id, {}, item_id)
