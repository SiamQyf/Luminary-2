import os

html_content = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Scholarly Press Verification</title>
<link rel="stylesheet" href="../dist/assets/preview-B1rldkYn.css">
<style>
  body {
    background: #18181b;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 40px;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .player-mock {
    width: 860px;
    height: 480px;
    background: #000000;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
</style>
</head>
<body data-theme="scholarly-press">

<div class="preview-player player-mock" data-theme="scholarly-press" data-layout="simple">
  <div class="media-skin relative w-full h-full flex flex-col justify-end">
    <!-- Bottom Controls Dock Island -->
    <div data-part="bottom-controls-bar" data-layout="simple" class="flex flex-row items-center gap-3">
      
      <!-- Left Controls: Play + Volume + Time -->
      <div class="flex items-center gap-[10px] shrink-0">
        <button class="group/play flex items-center justify-center w-[34px] h-[34px] cursor-pointer" aria-label="Play">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        
        <div class="group/vol-pill flex items-center px-2 py-1 gap-2">
          <button class="flex items-center justify-center w-6 h-6 cursor-pointer" aria-label="Volume">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
          <div class="w-14 h-[3.5px] relative flex items-center">
            <div class="w-full bg-white/20 relative">
              <div class="w-3/5 bg-white/90 h-full"></div>
            </div>
            <div class="volume-slider-thumb absolute" style="left: 60%; transform: translateX(-50%);"></div>
          </div>
        </div>

        <div class="inline-flex items-center gap-1 text-[13.5px] tabular-nums select-none">
          <span>0:38</span>
          <span class="opacity-55">/</span>
          <span>0:38</span>
        </div>
      </div>

      <!-- Center: Spindle Seekbar -->
      <div class="flex-1 min-w-[48px] flex items-center">
        <div class="media-slider-smooth group/slider relative flex h-2.5 flex-1 cursor-pointer items-center">
          <div class="media-slider-smooth isolate w-full relative">
            <div class="clip-media-x-[--media-slider-buffer] absolute inset-y-0 w-3/4"></div>
            <div class="clip-media-x-[--media-slider-fill] absolute inset-y-0 w-1/2"></div>
          </div>
          <div class="media-thumb-smooth absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style="left: 50%;"></div>
        </div>
      </div>

      <!-- Right Controls: Captions + Settings + Fullscreen -->
      <div class="flex items-center gap-[12px] shrink-0 ms-auto">
        <button class="group/liquid-btn flex items-center justify-center w-[34px] h-[34px] cursor-pointer" aria-label="Captions">
          <span style="font-weight: 700; font-size: 11px;">CC</span>
        </button>
        <button class="group/liquid-btn flex items-center justify-center w-[34px] h-[34px] cursor-pointer" aria-label="Settings">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <button class="media-fullscreen-button flex items-center justify-center w-[34px] h-[34px] cursor-pointer" aria-label="Fullscreen">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>

    </div>
  </div>
</div>

</body>
</html>
"""

with open(r"d:\video player\skin 2\custom-skin\scratch\verify-scholarly.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Created verify-scholarly.html")
