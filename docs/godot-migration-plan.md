# Godot Migration Plan

## Goal

Transform the current web prototype into a Godot-first, room-based horror puzzle game with a stronger Rusty Lake style:

- room-by-room navigation
- dense object interactions
- inventory-driven puzzle chains
- unsettling documents and symbolic narrative beats
- tighter audiovisual pacing than the browser version

## Current Web Prototype Assets We Can Reuse

### Systems already proven

- scene progression
- hotspot interaction design
- inventory collection
- note and document discovery
- branching flags and endings
- atmosphere through text, audio, and jumpscare timing

### Assets already present

- background images in [js/images](/D:/工作相关/game2/js/images)
- audio in [js/sounds](/D:/工作相关/game2/js/sounds)
- scene flow reference in [js/scenes](/D:/工作相关/game2/js/scenes) and [js/en/scenes.js](/D:/工作相关/game2/js/en/scenes.js)
- state flags and unlock logic in [js/state.js](/D:/工作相关/game2/js/state.js)

## Recommended Godot Structure

```text
godot/
  scenes/
    main/
    rooms/
    ui/
  scripts/
    core/
    rooms/
    ui/
  assets/
    backgrounds/
    audio/
    ui/
  data/
    rooms/
    items/
    documents/
```

## Mapping From Web To Godot

### Web scene

One HTML/JS scene today becomes one of these in Godot:

- one room scene
- one modal inspection scene
- one short scripted sequence
- one ending scene

### Hotspot

One hotspot becomes:

- a clickable `Area2D` or `Button`-driven interaction node
- a data entry with conditions and outcomes
- optionally an inspect zoom-in scene

### State flags

Current boolean flags should move into a global state service:

- room progress
- item ownership
- puzzle solved state
- route and ending markers
- chapter unlocks

### Documents

Documents should become data resources with:

- `id`
- `title`
- `source`
- `body`
- unlock conditions
- optional image or voice attachment

## Vertical Slice Plan

### Slice 1

Rebuild the opening as one playable Godot loop:

- parking lot
- car inspection
- key pickup
- gate unlock
- simple inventory display
- one document unlock
- one transition target for the apartment entrance

### Slice 2

Add the first interior room and one real puzzle chain:

- apartment lobby
- mailbox or keypad interaction
- one document-based clue
- one item combination or ordered puzzle

### Slice 3

Push mood and presentation toward the target style:

- room transitions
- close-up inspection views
- animated object feedback
- ambient audio zones
- stronger UI art direction

## Design Direction For The Rusty Lake Feel

We should not copy Rusty Lake directly. The target is a similar interaction rhythm:

- fewer broad scenes, more dense rooms
- every room contains 3 to 7 meaningful objects
- objects react in layered ways over time
- symbolism appears inside puzzle outcomes, not only in text
- documents are short, strange, and high-signal

## Immediate Engineering Priorities

1. Establish a Godot project and autoload state.
2. Convert one room into data-driven interactions.
3. Build a reusable HUD for objective, inventory, and documents.
4. Move images and audio into Godot-friendly asset folders.
5. Replace web scene functions with room data plus scripted events.

## Notes

- Keep the web prototype for reference during migration instead of deleting it immediately.
- The English version should wait until the Chinese Godot flow is stable.
- Art can stay placeholder for the first playable slice; interaction architecture matters more right now.
