# Project Guidelines & Rules

## Styling & Design Constraints
- **Uniform Icon Drop Shadows**: All control icons across all buttons (play/pause, seek backward/forward, volume/mute, captions, settings, fullscreen, PiP, center buffering/play) and across all themes MUST have a uniform, standard drop shadow: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))`. Do not introduce disparate colored glows, oversized neon blurs, or remove icon drop shadows on a per-theme basis.
- **Settings Popup Single Card**: The settings menu popup container (`[data-part="popup"]` / `div[popover]`) must remain transparent with 0 padding and no border, so only the inner card (`[role="menu"]`) renders background and border.
- **Frame Border Opacity**: Video frame border opacity is strictly 33.33% (`rgba(..., 0.3333)`).
- **Disappearing Title**: Video title appears on video start for 4s, fades out, and reappears on hover.
- **Elapsed Time Display**: Video progress timestamp counts up from 0 (`type="current"`, e.g. `0:00`), never negative remaining time.
- **Typography & Font Restriction**: NEVER use "Comic Sans" (or Comic Sans MS) anywhere in the UI under any circumstances.

