import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import { Button } from '@preview/shell/components/ui/button';
import { Input } from '@preview/shell/components/ui/input';
import { Label } from '@preview/shell/components/ui/label';
import { SheetTitle } from '@preview/shell/components/ui/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@preview/shell/components/ui/sidebar';
import { Slider } from '@preview/shell/components/ui/slider';
import { useId, useRef, useState, type ReactNode } from 'react';

import { defaultWidth, locales } from './config';
import {
  ASPECT_RATIOS,
  COLOR_SCHEMES,
  hasAspectRatio,
  localeLabel,
  PLAYER_WIDTH,
  TEXT_DIRECTIONS,
  type AspectRatio,
  type ColorScheme,
  type Locale,
  type TextDirection,
  type WorkbenchParams,
} from './params';
import { type Preferences } from './preferences';
import { SelectField } from './select';

const DIRECTION_LABELS: Record<TextDirection, string> = {
  auto: 'Auto (Language)',
  ltr: 'Left to right (LTR)',
  rtl: 'Right to left (RTL)',
};

const WIDTH_PRESETS = [
  { label: 'Mobile', width: 384, icon: DevicePhoneMobileIcon },
  { label: 'Tablet', width: 672, icon: DeviceTabletIcon },
  { label: 'Desktop', width: 1140, icon: ComputerDesktopIcon },
  { label: 'Wide', width: 1440, icon: ComputerDesktopIcon },
] as const;

const SHORTCUTS = [
  { key: 'Space / K', action: 'Play / Pause' },
  { key: 'J / L', action: 'Seek ±10 seconds' },
  { key: '← / →', action: 'Seek ±5 seconds' },
  { key: 'F', action: 'Toggle Fullscreen' },
  { key: 'M', action: 'Mute / Unmute' },
  { key: 'C', action: 'Toggle Captions' },
] as const;

/** English first, then sorted by language name. */
const LOCALE_OPTIONS = [...locales]
  .map((value) => ({ value, label: localeLabel(value) }))
  .sort((a, b) => (a.value === 'en' ? -1 : b.value === 'en' ? 1 : a.label.localeCompare(b.label, 'en')));

export type OptionsPanelProps = {
  id: string;
  params: WorkbenchParams;
  onParamsChange: (value: Partial<WorkbenchParams>) => void;
  preferences?: Preferences;
};

export function OptionsPanel({ id, params, onParamsChange }: OptionsPanelProps) {
  const { isMobile, setOpen, setOpenMobile } = useSidebar();

  const close = () => {
    if (isMobile) setOpenMobile(false);
    else {
      setOpen(false);
      document.getElementById(`${id}-trigger`)?.focus();
    }
  };

  const resetDefaults = () => {
    onParamsChange({
      width: defaultWidth,
      ratio: '16:9',
      scheme: 'auto',
      dir: 'auto',
      locale: 'en',
    });
  };

  return (
    <Sidebar
      id={id}
      side="right"
      aria-label="Options"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.defaultPrevented) {
          event.preventDefault();
          close();
        }
      }}
      className="top-14 h-[calc(100svh-3.5rem)] border-l border-border/60 bg-sidebar/95 backdrop-blur-md"
    >
      {/* Sleek Header */}
      <SidebarHeader className="h-14 shrink-0 flex-row items-center justify-between border-b border-border/50 px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <AdjustmentsHorizontalIcon className="size-4" aria-hidden="true" />
          </span>
          <div>
            {isMobile ? (
              <SheetTitle className="text-sm font-semibold tracking-tight">Options</SheetTitle>
            ) : (
              <h2 className="text-sm font-semibold tracking-tight">Options</h2>
            )}
            <p className="text-[11px] text-muted-foreground leading-none">Preview workbench</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Reset options to default"
            title="Reset options to default"
            onClick={resetDefaults}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowPathIcon className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            id={`${id}-close`}
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close options"
            onClick={close}
            className="text-muted-foreground hover:text-foreground"
          >
            <XMarkIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-4 p-4 overflow-y-auto">
        {/* Section 1: Viewport & Canvas */}
        <PanelCard title="Player Viewport" icon={<ComputerDesktopIcon className="size-3.5" />}>
          {/* Width Slider & Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-foreground">Width</Label>
              <WidthInput value={params.width} onChange={(width) => onParamsChange({ width })} />
            </div>

            <Slider
              aria-label="Player width in pixels"
              min={PLAYER_WIDTH.min}
              max={PLAYER_WIDTH.max}
              step={1}
              value={params.width}
              onValueChange={(next) => {
                if (typeof next === 'number') onParamsChange({ width: next });
              }}
              className="py-1"
            />

            {/* Quick Width Presets */}
            <div className="grid grid-cols-4 gap-1 pt-1">
              {WIDTH_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const active = Math.abs(params.width - preset.width) <= 16;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => onParamsChange({ width: preset.width })}
                    className={`flex flex-col items-center justify-center gap-1 rounded-md px-1.5 py-1.5 text-[11px] font-medium transition-all cursor-pointer ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-3.5 opacity-80" />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio Chips */}
          {hasAspectRatio && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
              <Label className="text-xs font-medium text-foreground">Aspect Ratio</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {ASPECT_RATIOS.map((ratio) => {
                  const active = params.ratio === ratio;
                  const label = ratio === 'intrinsic' ? 'Auto' : ratio;
                  return (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => onParamsChange({ ratio })}
                      className={`rounded-md py-1.5 text-xs font-medium transition-all text-center cursor-pointer ${
                        active
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </PanelCard>

        {/* Section 2: Color Scheme & Theme */}
        <PanelCard title="Color Scheme" icon={<SunIcon className="size-3.5" />}>
          <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted/60 p-1">
            <button
              type="button"
              onClick={() => onParamsChange({ scheme: 'auto' })}
              className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                params.scheme === 'auto'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ComputerDesktopIcon className="size-3.5" />
              <span>System</span>
            </button>
            <button
              type="button"
              onClick={() => onParamsChange({ scheme: 'light' })}
              className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                params.scheme === 'light'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <SunIcon className="size-3.5" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => onParamsChange({ scheme: 'dark' })}
              className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                params.scheme === 'dark'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MoonIcon className="size-3.5" />
              <span>Dark</span>
            </button>
          </div>
        </PanelCard>

        {/* Section 3: Localization */}
        <PanelCard title="Localization" icon={<LanguageIcon className="size-3.5" />}>
          <div className="flex flex-col gap-3">
            <SelectField
              label="Language"
              value={params.locale}
              onChange={(value) => onParamsChange({ locale: value as Locale })}
              options={LOCALE_OPTIONS}
            />
            <SelectField
              label="Direction"
              value={params.dir}
              onChange={(value) => onParamsChange({ dir: value as TextDirection })}
              options={TEXT_DIRECTIONS.map((value) => ({ value, label: DIRECTION_LABELS[value] }))}
            />
          </div>
        </PanelCard>

        {/* Section 4: Hotkey Reference Cheat Sheet */}
        <PanelCard title="Player Hotkeys" icon={<CommandLineIcon className="size-3.5" />}>
          <div className="flex flex-col gap-2 text-xs">
            {SHORTCUTS.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-muted-foreground text-[11.5px]">{item.action}</span>
                <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>
        </PanelCard>
      </SidebarContent>
    </Sidebar>
  );
}

function PanelCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card/60 p-3.5 shadow-2xs">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/90">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function WidthInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (width: number) =>
    Number.isFinite(width) ? Math.min(PLAYER_WIDTH.max, Math.max(PLAYER_WIDTH.min, Math.round(width))) : value;

  return (
    <div className="flex items-center gap-1 rounded-md border border-input/60 bg-background/80 px-2 py-0.5">
      <Input
        type="number"
        aria-label="Width in pixels"
        min={PLAYER_WIDTH.min}
        max={PLAYER_WIDTH.max}
        step={1}
        value={draft ?? value}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => {
          if (draft !== null) onChange(clamp(e.target.valueAsNumber));
          setDraft(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        className="h-6 w-14 border-0 p-0 text-right text-xs font-medium tabular-nums shadow-none focus-visible:ring-0"
      />
      <span className="text-[11px] text-muted-foreground">px</span>
    </div>
  );
}
