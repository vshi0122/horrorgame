# Godot Rebuild Notes

This repository now contains the first Godot migration scaffold for **Day Of Arrival**.

## What was added

- a Godot 4 project file: [project.godot](/D:/工作相关/game2/project.godot)
- a minimal playable scene: [godot/scenes/main/main.tscn](/D:/工作相关/game2/godot/scenes/main/main.tscn)
- global state and interaction routing:
  - [godot/scripts/core/game_state.gd](/D:/工作相关/game2/godot/scripts/core/game_state.gd)
  - [godot/scripts/core/scene_router.gd](/D:/工作相关/game2/godot/scripts/core/scene_router.gd)
- room definitions split by feature:
  - [godot/scripts/rooms/parking_lot_room.gd](/D:/工作相关/game2/godot/scripts/rooms/parking_lot_room.gd)
  - [godot/scripts/rooms/apartment_entrance_room.gd](/D:/工作相关/game2/godot/scripts/rooms/apartment_entrance_room.gd)
- a first-pass HUD and main controller:
  - [godot/scripts/main/main.gd](/D:/工作相关/game2/godot/scripts/main/main.gd)
  - [godot/scripts/ui/hud.gd](/D:/工作相关/game2/godot/scripts/ui/hud.gd)
- migration blueprint: [docs/godot-migration-plan.md](/D:/工作相关/game2/docs/godot-migration-plan.md)

## What this scaffold does

- opens into a Godot scene instead of the web app
- stores room state in an autoload singleton
- renders a simple room title, room hint, interactions, objective, inventory, and documents
- demonstrates the first migration pattern with a parking-lot room and three interactions

## What it does not do yet

- no imported art or audio in Godot yet
- no actual room-to-room scene transitions
- no close-up inspect views
- no save/load system
- no full chapter conversion

## Next recommended step

Build the apartment entrance as the second room and move one real document from the web prototype into Godot data.

## Structure direction

The intended workflow is:

- `core/` keeps shared runtime systems only
- `rooms/` owns room-specific content and interactions
- each new room should be added as its own file instead of expanding one global script
