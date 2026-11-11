# Liquid Glass Video.js v10 Skin — Design Thinking Statement

## 1. Design Concept & Philosophy
The **Liquid Glass Skin** bridges futuristic optical realism with the high-performance media architecture of **Video.js v10**. 

Inspired by Lucas Romero's macOS Liquid Glass design system and srdavo's optical refraction engine, each interactive control behaves like an authentic physical lens suspended above the video stream:
- **Optical Refraction via Vector Displacement:** Rather than a simple flat blur, controls generate a coordinate-mapped displacement map (Red channel for X deflection, Green channel for Y deflection, neutral `#808080` center) applied via SVG `<feDisplacementMap>`. The video frames warp realistically along the curved perimeter of each disk and pill.
- **Physical Chromatic Aberration:** True to physical optical dispersion (prism edge fringing), the filter performs a 3-pass channel split (`scale(32)` for Red, `scale(30)` for Green, `scale(28)` for Blue) recombined via `screen` blending.
- **Dual-Rim Specular Illumination:** Opposing dual-inset specular highlights (`inset 1px 1px 1.5px rgba(255,255,255,0.75)` and `inset -1px -1px 1.5px rgba(255,255,255,0.75)`) catch the light on both the leading and trailing beveled edges of the glass.
- **Atmospheric Scrim:** The controls rest on a subtle gradient scrim (`from-[rgba(8,9,13,0.75)] to-transparent`), ensuring absolute legibility against bright video content without obstructing visual storytelling.

---

## 2. Interface Architecture & Layout (1:1 Figma Match)
The interface reproduces the exact component hierarchy and vector geometry from Figma (`node-id=1804-16426`):
- **Top Bar:**
  - **Show Branding:** Bold title (`Minions`, 31.68px) and subtitle (`Season 3 episode 6`, 21.12px light).
  - **Cast / AirPlay:** Exact vector glyph (`16.5px × 12.8px`) inside a 32px liquid glass button.
  - **Picture-in-Picture:** Exact vector glyph (`16.8px × 14px`) inside a 32px liquid glass button.
- **Timeline & Scrubber:**
  - 2px baseline track with 20% white buffer and pure white progress fill.
  - Tabular countdown remaining time (`-0:26`, 13.26px) on the left, duration (`1:26`, 13.26px) on the right.
  - Hidden thumb during playback that appears fluidly on hover/drag.
- **Bottom Left Controls:**
  - **Skip Backward 10s:** Exact vector path from Figma node `1804:17193` in 32px liquid glass.
  - **Skip Forward 10s:** Exact vector path from Figma node `1804:17190` in 32px liquid glass.
  - **Play / Pause:** Exact vector path from Figma node `1804:17186` in 32px liquid glass.
  - **Volume Pill:** 112px × 32px pill with speaker icon (`14.13px × 14px`) and 65px horizontal volume track.
- **Bottom Right Controls:**
  - **Settings Menu:** 32px liquid glass button with exact Figma gear glyph, opening a multi-tier drawer for playback rate, quality selector, and audio/captions.
  - **Fullscreen Button:** Exact vector glyph from Figma node `1804:17101` in 32px liquid glass.

---

## 3. Accessibility & Technical Compliance
- **Full Keyboard Navigation:** Compliant with WAI-ARIA player guidelines; every button features explicit focus rings (`focus-visible:outline-white`) and arrow-key seek shortcuts.
- **Graceful Cross-Browser Degradation:** Automatically handles browsers with differing SVG backdrop filter support (Chromium gets full optical displacement + chromatic aberration; Safari/Firefox receive clean frosted-glass blur with specular rim reflections).
- **Responsive Across Form Factors:** Adapts automatically to desktop fine pointers and mobile touch (`pointer-coarse`).
- **Mux Streaming Integration:** Powered natively by `@videojs/react/media/mux-video` with adaptive bitrate HLS streaming and dynamic WebP poster generation.
