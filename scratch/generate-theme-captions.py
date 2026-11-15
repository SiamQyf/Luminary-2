# generate-theme-captions.py

THEMES = [
    {
        "id": "translucent",
        "name": "Translucent Glass",
        "bg": "rgba(8, 10, 15, 0.72)",
        "border": "1px solid rgba(255, 255, 255, 0.22)",
        "radius": "9999px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        "color": "#ffffff",
        "backdrop": "blur(16px) saturate(160%)",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(0, 0, 0, 0.65)"
    },
    {
        "id": "linear-ticks",
        "name": "Linear Ticks",
        "bg": "rgba(15, 23, 42, 0.90)",
        "border": "1px solid rgba(56, 189, 248, 0.45)",
        "radius": "4px",
        "shadow": "0 3px 12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(56, 189, 248, 0.3)",
        "color": "#e0f2fe",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 6px rgba(56, 189, 248, 0.4)"
    },
    {
        "id": "crystal",
        "name": "Crystal",
        "bg": "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(192, 132, 252, 0.14) 50%, rgba(56, 189, 248, 0.16) 100%)",
        "border": "1.5px solid rgba(255, 255, 255, 0.50)",
        "radius": "16px",
        "shadow": "0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 0 14px rgba(192, 132, 252, 0.25)",
        "color": "#ffffff",
        "backdrop": "blur(20px) saturate(180%)",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.85)"
    },
    {
        "id": "dot-matrix",
        "name": "Dot Matrix",
        "bg": "rgba(9, 13, 19, 0.94)",
        "border": "1px solid rgba(14, 165, 233, 0.38)",
        "radius": "5px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), inset 0 0 8px rgba(14, 165, 233, 0.18)",
        "color": "#7dd3fc",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "letter_spacing": "0.06em",
        "text_shadow": "0 0 8px rgba(14, 165, 233, 0.85), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "cyber-neon",
        "name": "Cyber Neon",
        "bg": "rgba(3, 7, 18, 0.90)",
        "border": "1.5px solid #00f0ff",
        "radius": "8px",
        "shadow": "0 0 16px rgba(0, 240, 255, 0.45), inset 0 0 10px rgba(0, 240, 255, 0.2)",
        "color": "#e0faff",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 0 8px rgba(0, 240, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "synthwave-80s",
        "name": "80s Synthwave",
        "bg": "linear-gradient(135deg, rgba(24, 11, 38, 0.92) 0%, rgba(15, 9, 28, 0.96) 100%)",
        "border": "1.5px solid #f43f5e",
        "radius": "10px",
        "shadow": "0 0 18px rgba(244, 63, 94, 0.45), inset 0 0 10px rgba(168, 85, 247, 0.25)",
        "color": "#fdf4ff",
        "text_shadow": "0 0 8px rgba(244, 63, 94, 0.9), 0 0 16px rgba(168, 85, 247, 0.5)"
    },
    {
        "id": "cyberpunk-2077",
        "name": "Cyberpunk 2077",
        "bg": "rgba(10, 10, 12, 0.95)",
        "border": "1.5px solid #fcee0a",
        "radius": "2px",
        "shadow": "0 0 14px rgba(252, 238, 10, 0.45), inset 0 0 6px rgba(252, 238, 10, 0.15)",
        "color": "#fcee0a",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 0 6px rgba(252, 238, 10, 0.8), 0 1px 2px rgba(0, 0, 0, 1)"
    },
    {
        "id": "sakura-blossom",
        "name": "Sakura Blossom",
        "bg": "rgba(28, 15, 24, 0.85)",
        "border": "1.25px solid rgba(244, 114, 182, 0.45)",
        "radius": "18px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(244, 114, 182, 0.3)",
        "color": "#fce7f3",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.9), 0 0 8px rgba(244, 114, 182, 0.4)"
    },
    {
        "id": "cosmic-nebula",
        "name": "Cosmic Nebula",
        "bg": "linear-gradient(135deg, rgba(14, 12, 34, 0.88) 0%, rgba(26, 16, 50, 0.92) 100%)",
        "border": "1.25px solid rgba(167, 139, 250, 0.42)",
        "radius": "14px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.75), 0 0 14px rgba(167, 139, 250, 0.35)",
        "color": "#ede9fe",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 10px rgba(167, 139, 250, 0.6)"
    },
    {
        "id": "retro-terminal",
        "name": "Retro Terminal",
        "bg": "rgba(4, 18, 8, 0.94)",
        "border": "1.25px solid rgba(74, 222, 128, 0.48)",
        "radius": "3px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), inset 0 0 8px rgba(34, 197, 94, 0.22)",
        "color": "#4ade80",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "letter_spacing": "0.05em",
        "text_shadow": "0 0 8px rgba(74, 222, 128, 0.85), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "obsidian-gold",
        "name": "Obsidian Gold",
        "bg": "linear-gradient(180deg, rgba(20, 16, 12, 0.94) 0%, rgba(10, 8, 6, 0.98) 100%)",
        "border": "1px solid rgba(245, 158, 11, 0.45)",
        "radius": "8px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(254, 240, 138, 0.25), 0 0 12px rgba(245, 158, 11, 0.2)",
        "color": "#fef3c7",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.95), 0 0 8px rgba(245, 158, 11, 0.4)"
    },
    {
        "id": "timber",
        "name": "Timber",
        "bg": "linear-gradient(180deg, rgba(27, 14, 6, 0.92) 0%, rgba(16, 9, 4, 0.96) 100%)",
        "border": "1.25px solid rgba(245, 158, 11, 0.45)",
        "radius": "6px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(251, 191, 36, 0.25)",
        "color": "#fde68a",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "molten-magma",
        "name": "Molten Magma",
        "bg": "rgba(22, 10, 8, 0.92)",
        "border": "1.25px solid rgba(239, 68, 68, 0.45)",
        "radius": "8px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), 0 0 14px rgba(239, 68, 68, 0.35)",
        "color": "#fecaca",
        "text_shadow": "0 0 8px rgba(239, 68, 68, 0.85), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "pencil-sketch",
        "name": "Pencil Sketch",
        "bg": "rgba(24, 24, 27, 0.88)",
        "border": "1.5px dashed rgba(228, 228, 231, 0.45)",
        "radius": "4px",
        "shadow": "0 4px 14px rgba(0, 0, 0, 0.85)",
        "color": "#f4f4f5",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "gamepad",
        "name": "Gamepad",
        "bg": "rgba(15, 19, 28, 0.92)",
        "border": "1.25px solid rgba(0, 229, 163, 0.45)",
        "radius": "10px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), 0 0 10px rgba(0, 229, 163, 0.25)",
        "color": "#d1fae5",
        "text_shadow": "0 0 6px rgba(0, 229, 163, 0.6), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "gamepad-white",
        "name": "Gamepad White",
        "bg": "rgba(248, 250, 252, 0.95)",
        "border": "1.5px solid #090714",
        "radius": "10px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.5)",
        "color": "#090714",
        "font_weight": "700",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "news-magazine",
        "name": "News Magazine",
        "bg": "rgba(250, 247, 240, 0.96)",
        "border": "1.5px solid #141210",
        "radius": "3px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.6)",
        "color": "#141210",
        "font": "Georgia, 'Times New Roman', serif",
        "font_weight": "700",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "vinyl-turntable",
        "name": "Vinyl Turntable",
        "bg": "rgba(18, 15, 13, 0.92)",
        "border": "1.25px solid rgba(249, 115, 22, 0.45)",
        "radius": "6px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), 0 0 10px rgba(249, 115, 22, 0.22)",
        "color": "#ffedd5",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "blueprint",
        "name": "Blueprint",
        "bg": "rgba(10, 30, 68, 0.92)",
        "border": "1.25px solid rgba(56, 189, 248, 0.45)",
        "radius": "3px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), inset 0 0 8px rgba(56, 189, 248, 0.15)",
        "color": "#e0f2fe",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 6px rgba(56, 189, 248, 0.4)"
    },
    {
        "id": "frutiger-aero",
        "name": "Frutiger Aero",
        "bg": "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(14, 165, 233, 0.35) 60%, rgba(2, 132, 199, 0.75) 100%)",
        "border": "1.5px solid rgba(255, 255, 255, 0.65)",
        "radius": "18px",
        "shadow": "0 8px 24px rgba(2, 132, 199, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.85)",
        "color": "#ffffff",
        "backdrop": "blur(16px)",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.9)"
    },
    {
        "id": "art-deco",
        "name": "Art Deco",
        "bg": "linear-gradient(180deg, rgba(14, 30, 24, 0.94) 0%, rgba(6, 18, 14, 0.98) 100%)",
        "border": "1.25px solid rgba(229, 193, 123, 0.55)",
        "radius": "6px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), 0 0 12px rgba(229, 193, 123, 0.25)",
        "color": "#fef3c7",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.95), 0 0 6px rgba(229, 193, 123, 0.35)"
    },
    {
        "id": "clay-pastel",
        "name": "Clay Pastel",
        "bg": "rgba(245, 243, 255, 0.94)",
        "border": "none",
        "radius": "16px",
        "shadow": "0 6px 18px rgba(76, 29, 149, 0.25), inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(124, 58, 237, 0.15)",
        "color": "#2e1065",
        "font_weight": "700",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "tactical-hud",
        "name": "Tactical HUD",
        "bg": "rgba(10, 16, 14, 0.92)",
        "border": "1.25px solid rgba(245, 158, 11, 0.45)",
        "radius": "2px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.85), inset 0 0 6px rgba(245, 158, 11, 0.15)",
        "color": "#fef08a",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 0 6px rgba(245, 158, 11, 0.75), 0 1px 2px rgba(0, 0, 0, 1)"
    },
    {
        "id": "matcha-zen",
        "name": "Matcha Zen",
        "bg": "rgba(18, 24, 18, 0.90)",
        "border": "1.25px solid rgba(167, 201, 155, 0.42)",
        "radius": "12px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.75)",
        "color": "#f2efe4",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "bauhaus",
        "name": "Bauhaus",
        "bg": "rgba(24, 24, 27, 0.94)",
        "border": "2px solid #facc15",
        "radius": "0px",
        "shadow": "3px 3px 0px #b91c1c, 0 4px 16px rgba(0, 0, 0, 0.6)",
        "color": "#ffffff",
        "font_weight": "800",
        "text_shadow": "none"
    },
    {
        "id": "swiss-intl",
        "name": "Swiss Braun",
        "bg": "rgba(245, 245, 244, 0.96)",
        "border": "1.5px solid #1c1917",
        "radius": "4px",
        "shadow": "0 4px 14px rgba(0, 0, 0, 0.3)",
        "color": "#1c1917",
        "font_weight": "700",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "ukiyo-e",
        "name": "Ukiyo-e Woodblock",
        "bg": "rgba(15, 23, 42, 0.92)",
        "border": "1.25px solid rgba(232, 220, 196, 0.55)",
        "radius": "8px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(220, 38, 38, 0.35)",
        "color": "#f3ead8",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "bioluminescent",
        "name": "Bioluminescent",
        "bg": "rgba(6, 20, 28, 0.90)",
        "border": "1.25px solid rgba(45, 212, 191, 0.45)",
        "radius": "16px",
        "shadow": "0 0 16px rgba(45, 212, 191, 0.35), inset 0 0 8px rgba(45, 212, 191, 0.15)",
        "color": "#ccfbf1",
        "text_shadow": "0 0 8px rgba(45, 212, 191, 0.85), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "steampunk",
        "name": "Steampunk Brass",
        "bg": "linear-gradient(180deg, rgba(22, 12, 5, 0.94) 0%, rgba(12, 7, 3, 0.98) 100%)",
        "border": "1.25px solid #ca8a04",
        "radius": "6px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(254, 240, 138, 0.25)",
        "color": "#fde68a",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "candy-pop",
        "name": "Candy Pop",
        "bg": "rgba(28, 14, 30, 0.88)",
        "border": "1.25px solid rgba(244, 114, 182, 0.45)",
        "radius": "20px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(244, 114, 182, 0.3)",
        "color": "#fce7f3",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.9), 0 0 6px rgba(244, 114, 182, 0.4)"
    },
    {
        "id": "polaroid-film",
        "name": "35mm Film",
        "bg": "rgba(248, 245, 238, 0.95)",
        "border": "1.5px solid #27272a",
        "radius": "3px",
        "shadow": "0 4px 14px rgba(0, 0, 0, 0.45)",
        "color": "#18181b",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "nordic-frost",
        "name": "Nordic Frost",
        "bg": "rgba(15, 23, 42, 0.88)",
        "border": "1.25px solid rgba(186, 230, 253, 0.45)",
        "radius": "12px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.75), 0 0 12px rgba(186, 230, 253, 0.25)",
        "color": "#f0f9ff",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 6px rgba(186, 230, 253, 0.4)"
    },
    {
        "id": "crimson-cinema",
        "name": "Criterion Cinema",
        "bg": "rgba(20, 8, 12, 0.94)",
        "border": "1.25px solid rgba(225, 29, 72, 0.45)",
        "radius": "6px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.85), 0 0 12px rgba(225, 29, 72, 0.25)",
        "color": "#ffe4e6",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "pixel-8bit",
        "name": "8-Bit Pixel",
        "bg": "rgba(11, 13, 30, 0.94)",
        "border": "2px solid #818cf8",
        "radius": "0px",
        "shadow": "3px 3px 0px #4338ca, 0 4px 16px rgba(0, 0, 0, 0.8)",
        "color": "#e0e7ff",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "letter_spacing": "0.08em",
        "text_shadow": "none"
    },
    {
        "id": "plain",
        "name": "Plain White",
        "bg": "rgba(0, 0, 0, 0.88)",
        "border": "1px solid rgba(255, 255, 255, 0.25)",
        "radius": "6px",
        "shadow": "0 4px 14px rgba(0, 0, 0, 0.65)",
        "color": "#ffffff",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.9)"
    },
    {
        "id": "liquid-mercury",
        "name": "Liquid Mercury",
        "bg": "linear-gradient(135deg, rgba(30, 41, 59, 0.94) 0%, rgba(15, 23, 42, 0.96) 100%)",
        "border": "1.5px solid rgba(226, 232, 240, 0.55)",
        "radius": "14px",
        "shadow": "0 8px 24px rgba(0, 0, 0, 0.8), inset 0 1px 1px #ffffff, 0 0 14px rgba(226, 232, 240, 0.3)",
        "color": "#f8fafc",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)"
    },
    {
        "id": "aurora-borealis",
        "name": "Aurora Borealis",
        "bg": "linear-gradient(135deg, rgba(6, 28, 24, 0.90) 0%, rgba(18, 12, 38, 0.92) 100%)",
        "border": "1.25px solid rgba(52, 211, 153, 0.45)",
        "radius": "14px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.75), 0 0 16px rgba(52, 211, 153, 0.35)",
        "color": "#d1fae5",
        "text_shadow": "0 0 8px rgba(52, 211, 153, 0.8), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "solar-flare",
        "name": "Solar Flare",
        "bg": "rgba(24, 12, 6, 0.92)",
        "border": "1.25px solid rgba(251, 146, 60, 0.48)",
        "radius": "10px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), 0 0 14px rgba(251, 146, 60, 0.35)",
        "color": "#ffedd5",
        "text_shadow": "0 0 8px rgba(251, 146, 60, 0.75), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "amethyst-geode",
        "name": "Amethyst Geode",
        "bg": "rgba(18, 10, 32, 0.92)",
        "border": "1.25px solid rgba(192, 132, 252, 0.45)",
        "radius": "12px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.8), 0 0 14px rgba(192, 132, 252, 0.35)",
        "color": "#f3e8ff",
        "text_shadow": "0 0 8px rgba(192, 132, 252, 0.75), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "cyber-deck",
        "name": "Cyber Deck",
        "bg": "rgba(12, 8, 2, 0.94)",
        "border": "1.25px solid rgba(245, 158, 11, 0.48)",
        "radius": "3px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.9), inset 0 0 8px rgba(245, 158, 11, 0.18)",
        "color": "#fbbf24",
        "font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "text_shadow": "0 0 8px rgba(245, 158, 11, 0.85), 0 1px 2px rgba(0, 0, 0, 1)"
    },
    {
        "id": "porcelain-cobalt",
        "name": "Porcelain & Cobalt",
        "bg": "rgba(248, 250, 252, 0.95)",
        "border": "1.5px solid #1d4ed8",
        "radius": "10px",
        "shadow": "0 4px 18px rgba(30, 58, 138, 0.3), inset 0 1px 1px #ffffff",
        "color": "#1e3a8a",
        "font_weight": "700",
        "text_shadow": "none",
        "filter": "none"
    },
    {
        "id": "emerald-vault",
        "name": "Emerald Vault",
        "bg": "rgba(6, 24, 16, 0.94)",
        "border": "1.25px solid rgba(52, 211, 153, 0.42)",
        "radius": "8px",
        "shadow": "0 4px 18px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(167, 243, 208, 0.2)",
        "color": "#d1fae5",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(52, 211, 153, 0.35)"
    },
    {
        "id": "vaporwave-sunset",
        "name": "Vaporwave Sunset",
        "bg": "linear-gradient(135deg, rgba(30, 12, 40, 0.92) 0%, rgba(20, 10, 30, 0.96) 100%)",
        "border": "1.5px solid #f472b6",
        "radius": "14px",
        "shadow": "0 0 18px rgba(244, 114, 182, 0.4), 0 4px 16px rgba(0, 0, 0, 0.7)",
        "color": "#fff1f2",
        "text_shadow": "0 0 8px rgba(244, 114, 182, 0.8), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "carbon-stealth",
        "name": "Carbon Stealth",
        "bg": "rgba(18, 18, 20, 0.94)",
        "border": "1.25px solid rgba(239, 68, 68, 0.45)",
        "radius": "4px",
        "shadow": "0 4px 16px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "color": "#f4f4f5",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "holo-prism",
        "name": "Holo Prism",
        "bg": "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(147, 197, 253, 0.18) 50%, rgba(244, 114, 182, 0.18) 100%)",
        "border": "1.25px solid rgba(255, 255, 255, 0.55)",
        "radius": "16px",
        "shadow": "0 8px 28px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.75), 0 0 14px rgba(147, 197, 253, 0.3)",
        "color": "#ffffff",
        "backdrop": "blur(20px) saturate(180%)",
        "text_shadow": "0 1px 2px rgba(0, 0, 0, 0.9)"
    },
    {
        "id": "deep-abyss",
        "name": "Deep Abyss",
        "bg": "rgba(4, 8, 18, 0.94)",
        "border": "1.25px solid rgba(56, 189, 248, 0.38)",
        "radius": "10px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 12px rgba(56, 189, 248, 0.25)",
        "color": "#e0f2fe",
        "text_shadow": "0 0 8px rgba(56, 189, 248, 0.65), 0 1px 2px rgba(0, 0, 0, 0.95)"
    },
    {
        "id": "velvet-opera",
        "name": "Velvet Opera",
        "bg": "linear-gradient(180deg, rgba(28, 8, 14, 0.95) 0%, rgba(16, 4, 8, 0.98) 100%)",
        "border": "1.25px solid rgba(245, 158, 11, 0.45)",
        "radius": "8px",
        "shadow": "0 4px 20px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(254, 240, 138, 0.25)",
        "color": "#fff1f2",
        "font": "Georgia, 'Times New Roman', serif",
        "text_shadow": "0 1px 3px rgba(0, 0, 0, 0.95), 0 0 6px rgba(245, 158, 11, 0.3)"
    },
    {
        "id": "water-droplet",
        "name": "Water Droplet",
        "bg": "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%), linear-gradient(0deg, rgba(255, 255, 255, 0.18) 0%, rgba(186, 230, 253, 0.08) 35%, transparent 70%), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(56, 189, 248, 0.06) 50%, rgba(14, 165, 233, 0.1) 100%)",
        "border": "none",
        "radius": "9999px",
        "shadow": "inset 0 1.25px 2px rgba(255, 255, 255, 0.45), inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.2), 0 0 16px rgba(56, 189, 248, 0.35), 0 2px 6px rgba(56, 189, 248, 0.2)",
        "color": "#ffffff",
        "backdrop": "blur(8px) contrast(115%) brightness(115%) saturate(135%)",
        "text_shadow": "0 0 8px rgba(56, 189, 248, 0.75), 0 1px 2px rgba(0, 0, 0, 0.85)"
    },
    {
        "id": "glacial-permafrost",
        "name": "Glacial Permafrost",
        "bg": "linear-gradient(135deg, rgba(15, 28, 48, 0.92) 0%, rgba(10, 18, 32, 0.96) 100%)",
        "border": "1.25px solid rgba(186, 230, 253, 0.50)",
        "radius": "14px",
        "shadow": "0 4px 22px rgba(0, 0, 0, 0.85), 0 0 16px rgba(186, 230, 253, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
        "color": "#f0f9ff",
        "text_shadow": "0 0 8px rgba(186, 230, 253, 0.8), 0 1px 2px rgba(0, 0, 0, 0.95)"
    }
]

def generate_css_block():
    out = []
    out.append("/* ==========================================================================")
    out.append("   Dynamic Theme-Dependent Caption Styles (Tailored for All 49 Styles)")
    out.append("   Every theme has a bespoke, harmonized subtitle design matching its identity")
    out.append("   ========================================================================== */\n")
    
    for t in THEMES:
        tid = t["id"]
        tname = t["name"]
        out.append(f"/* {tname} ({tid}) */")
        sel = (
            f'.preview-player[data-theme="{tid}"] [data-part="caption-pill"],\n'
            f':root[data-theme="{tid}"] [data-part="caption-pill"],\n'
            f':where(.media-skin)[data-theme="{tid}"] [data-part="caption-pill"]'
        )
        rules = []
        rules.append(f'  background: {t["bg"]} !important;')
        rules.append(f'  border: {t["border"]} !important;')
        rules.append(f'  border-radius: {t["radius"]} !important;')
        rules.append(f'  box-shadow: {t["shadow"]} !important;')
        rules.append(f'  color: {t["color"]} !important;')
        
        if "font" in t:
            rules.append(f'  font-family: {t["font"]} !important;')
        if "font_weight" in t:
            rules.append(f'  font-weight: {t["font_weight"]} !important;')
        if "letter_spacing" in t:
            rules.append(f'  letter-spacing: {t["letter_spacing"]} !important;')
        if "backdrop" in t:
            rules.append(f'  backdrop-filter: {t["backdrop"]} !important;')
            rules.append(f'  -webkit-backdrop-filter: {t["backdrop"]} !important;')
        if "text_shadow" in t:
            rules.append(f'  text-shadow: {t["text_shadow"]} !important;')
        if "filter" in t:
            rules.append(f'  filter: {t["filter"]} !important;')
            
        block = sel + " {\n" + "\n".join(rules) + "\n}\n"
        out.append(block)
        
    return "\n".join(out)

if __name__ == "__main__":
    css = generate_css_block()
    with open(r'd:\video player\skin 2\custom-skin\scratch\theme-captions.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print(f"Generated CSS for {len(THEMES)} themes successfully!")
