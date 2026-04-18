extends PanelContainer

@onready var inventory_value: ItemList = $HUDMargin/HUDStack/InventoryValue


func _ready() -> void:
	GameState.hud_changed.connect(refresh)
	inventory_value.allow_reselect = true
	inventory_value.item_clicked.connect(_on_inventory_item_clicked)
	refresh()


func refresh() -> void:
	inventory_value.clear()
	for item_id: String in GameState.inventory:
		inventory_value.add_item(I18n.item_name(item_id))
	if GameState.inventory.is_empty():
		inventory_value.add_item("-")
		inventory_value.deselect_all()
		return

	if GameState.selected_inventory_item == "":
		inventory_value.deselect_all()
		return

	var selected_index := GameState.inventory.find(GameState.selected_inventory_item)
	if selected_index >= 0:
		inventory_value.select(selected_index)
	else:
		inventory_value.deselect_all()


func _on_inventory_item_clicked(index: int, _at_position: Vector2, mouse_button_index: int) -> void:
	if mouse_button_index != MOUSE_BUTTON_LEFT:
		return
	if index < 0 or index >= GameState.inventory.size():
		return

	var item_id := GameState.inventory[index]
	var was_selected := GameState.is_item_selected(item_id)
	GameState.toggle_selected_item(item_id)
	if was_selected:
		GameState.set_message(I18n.t("ui.unselected_item", {"item": I18n.item_name(item_id)}))
	else:
		GameState.set_message(I18n.t("ui.selected_item", {"item": I18n.item_name(item_id)}))
