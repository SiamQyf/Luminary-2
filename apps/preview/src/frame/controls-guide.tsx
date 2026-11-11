import React from 'react';

interface Shortcut {
  keys: string[];
  label: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ['Space'], label: 'Play / Pause' },
  { keys: ['←', '→'], label: 'Seek 10s' },
  { keys: ['↑', '↓'], label: 'Volume' },
  { keys: ['M'], label: 'Mute' },
  { keys: ['C'], label: 'Captions' },
  { keys: ['F'], label: 'Fullscreen' },
  { keys: ['P'], label: 'PiP' },
  { keys: ['0–9'], label: 'Seek %' },
];

export function ControlsGuide() {
  return (
    <div
      aria-label="Keyboard shortcuts"
      className="shortcuts-strip box-border w-full mt-4 mb-5 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 px-5 py-2.5 rounded-2xl sm:rounded-full select-none transition-colors"
      style={{ maxWidth: 'calc(896px * 0.98)' }}
    >
      {SHORTCUTS.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {s.keys.map((k) => (
              <kbd key={k} className="shortcut-kbd">
                {k}
              </kbd>
            ))}
          </div>
          <span className="shortcut-action">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
