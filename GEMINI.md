# Project Guidelines & Rules

## Styling & Design Constraints
- **Zero Icon Drop Shadows**: All control icons across all buttons (play/pause, seek backward/forward, volume/mute, captions, settings, fullscreen, PiP, center buffering/play) across all styles and themes have zero icon drop shadows (`filter: none !important; drop-shadow: none !important;`) for clean, flat, crisp rendering.
- **Settings Popup Single Card**: The settings menu popup container (`[data-part="popup"]` / `div[popover]`) must remain transparent with 0 padding and no border, so only the inner card (`[role="menu"]`) renders background and border.
- **Frame Border Opacity**: Video frame border opacity is strictly 33.33% (`rgba(..., 0.3333)`).
- **Disappearing Title**: Video title appears on video start for 4s, fades out, and reappears on hover.
- **Elapsed Time Display**: Video progress timestamp counts up from 0 (`type="current"`, e.g. `0:00`), never negative remaining time.
- **Typography & Font Restriction**: NEVER use "Comic Sans" (or Comic Sans MS) anywhere in the UI under any circumstances.
- **Volume Seekbar Spacing**: All volume seekbars (the horizontal volume slider track) are positioned visually 2px away from the volume horn icon across all styles and themes (left: -3.5px !important; margin-left: 0 !important; / -left-[3.5px] ml-0).
- **Volume Slider Knob Edge Clamping**: The horizontal volume slider knob (thumb) is clamped (`left: clamp(calc(var(--volume-thumb-size, 8px) / 2), var(--media-slider-fill, 0%), calc(100% - var(--volume-thumb-size, 8px) / 2)) !important;`) across all styles and themes so that at minimum volume (0%) it never hangs off or goes past the rounded left track cap, and at maximum volume (100%) it never overhangs past the right track cap.
- **Theme Ordering & Top Styles**: 'Classic White' is theme #1 at the top of the list, followed immediately by its exact opposite 'Classic Dark' at #2 (pure black buttons/backgrounds with pure white icons/text), 'Basic' at #3 (flat, no background under icons, crisp white icons, primary blue accent), with 'Translucent Glass' at #4.
- **Control Icon Sizing**: Volume button icon, caption button icon, and screencast button icon are strictly 1.05× larger (icon only) across all styles and themes.
