extends PanelContainer

@onready var inventory_value: ItemList = $HUDMargin/HUDStack/InventoryValue


func _ready() -> void:
	GameState.hud_changed.connect(refresh)
	refresh()


func refresh() -> void:
	inventory_value.clear()
	for item_id: String in GameState.inventory:
		inventory_value.add_item(item_id)
	if GameState.inventory.is_empty():
		inventory_value.add_item("Empty")
