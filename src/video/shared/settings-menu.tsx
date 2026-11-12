/** @jsxImportSource react */
import { audioText, captionsText, qualityText, settingsText, speedText } from '@videojs/core/i18n/text/menu';
import { Text as TextPrimitive } from '@videojs/react';
import { Menu } from '@videojs/react';
import {
  ChevronIcon as ChevronIconPrimitive,
  SwitchesIcon as SwitchesIconPrimitive,
  SpeechIcon as SpeechIconPrimitive,
  SpeedIcon as SpeedIconPrimitive,
} from '@videojs/react/icons/scaffold';
import { AudioTrackRadioGroup } from '@videojs/react/ui/audio-track-radio-group';
import { CaptionsRadioGroup } from '@videojs/react/ui/captions-radio-group';
import { PlaybackRateRadioGroup } from '@videojs/react/ui/playback-rate-radio-group';
import { QualityRadioGroup } from '@videojs/react/ui/quality-radio-group';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/resolve-class-name';

import { Button } from './button';
import { RoundedCaptionsOffIcon } from './captions-button';
import { LAYOUT_OPTIONS, type PlayerLayout, useLayoutMode } from './layout-mode';
import { RadioItem } from './menu-item';
import { ButtonTooltip } from './tooltip';

export const THEME_STYLES = [
  { id: 'translucent', label: 'Translucent Glass' },
  { id: 'linear-ticks', label: 'Linear Ticks' },
  { id: 'crystal', label: 'Crystal' },
  { id: 'dot-matrix', label: 'Dot Matrix' },
  { id: 'gta-vi', label: 'GTA VI' },
  { id: 'cyber-neon', label: 'Cyber Neon' },
  { id: 'synthwave-80s', label: '80s Synthwave' },
  { id: 'cyberpunk-2077', label: 'Cyberpunk 2077' },
  { id: 'sakura-blossom', label: 'Sakura Blossom' },
  { id: 'cosmic-nebula', label: 'Cosmic Nebula' },
  { id: 'retro-terminal', label: 'Retro Terminal' },
  { id: 'obsidian-gold', label: 'Obsidian Gold' },
  { id: 'timber', label: 'Timber' },
  { id: 'molten-magma', label: 'Molten Magma' },
  { id: 'pencil-sketch', label: 'Pencil Sketch' },
  { id: 'gamepad', label: 'Gamepad' },
  { id: 'gamepad-white', label: 'Gamepad White' },
  { id: 'news-magazine', label: 'News Magazine' },
  { id: 'vinyl-turntable', label: 'Vinyl Turntable' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'frutiger-aero', label: 'Frutiger Aero' },
  { id: 'art-deco', label: 'Art Deco' },
  { id: 'clay-pastel', label: 'Clay Pastel' },
  { id: 'tactical-hud', label: 'Tactical HUD' },
  { id: 'matcha-zen', label: 'Matcha Zen' },
  { id: 'bauhaus', label: 'Bauhaus' },
  { id: 'swiss-intl', label: 'Swiss Braun' },
  { id: 'ukiyo-e', label: 'Ukiyo-e Woodblock' },
  { id: 'bioluminescent', label: 'Bioluminescent' },
  { id: 'steampunk', label: 'Steampunk Brass' },
  { id: 'candy-pop', label: 'Candy Pop' },
  { id: 'polaroid-film', label: '35mm Film' },
  { id: 'nordic-frost', label: 'Nordic Frost' },
  { id: 'crimson-cinema', label: 'Criterion Cinema' },
  { id: 'pixel-8bit', label: '8-Bit Pixel' },
  { id: 'plain', label: 'Plain White' },
] as const;

/** Settings Menu Content styling: matching rounded player aesthetic (18px) with comfortable padding (8px) */
const menuContentClass = cn(
  'absolute max-h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-none outline-hidden rounded-[18px]',
  'flex flex-col gap-0.5 p-2 not-data-submenu:inset-x-0 not-data-submenu:top-0',
  'not-data-submenu:data-child-open:transform-[translateX(-100%)]',
  'not-data-submenu:data-child-open:rtl:transform-[translateX(100%)]',
  'not-data-submenu:data-child-open:[clip-path:inset(0_0_0_100%)] not-data-submenu:data-child-open:rtl:[clip-path:inset(0_100%_0_0)]',
  'data-submenu:inset-x-0 data-submenu:top-0 data-submenu:z-10',
  'data-submenu:not-data-open:hidden'
);

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
    </svg>
  );
}

function StylesMenu() {
  const [currentStyle, setCurrentStyle] = useState<string>(() => {
    if (typeof window === 'undefined') return 'translucent';
    const urlTheme = new URLSearchParams(window.location.search).get('theme');
    return (
      urlTheme ||
      document.documentElement.dataset.theme ||
      sessionStorage.getItem('luminescence-theme') ||
      sessionStorage.getItem('inescence-theme') ||
      'translucent'
    );
  });

  useEffect(() => {
    const syncFromDom = () => {
      const t = document.documentElement.dataset.theme;
      if (t) setCurrentStyle(t);
    };
    const handleStyleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: string }>;
      if (customEvent.detail?.theme) {
        setCurrentStyle(customEvent.detail.theme);
      }
    };
    syncFromDom();
    window.addEventListener('luminescence-theme-change', handleStyleChange);
    window.addEventListener('inescence-theme-change', handleStyleChange);
    return () => {
      window.removeEventListener('luminescence-theme-change', handleStyleChange);
      window.removeEventListener('inescence-theme-change', handleStyleChange);
    };
  }, []);

  const handleSelectStyle = (styleId: string) => {
    setCurrentStyle(styleId);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('luminescence-theme', styleId);
      sessionStorage.setItem('inescence-theme', styleId);
      document.documentElement.dataset.theme = styleId;
      document.querySelectorAll('.preview-player').forEach((el) => {
        el.setAttribute('data-theme', styleId);
      });
      window.dispatchEvent(new CustomEvent('luminescence-theme-change', { detail: { theme: styleId } }));
      window.dispatchEvent(new CustomEvent('inescence-theme-change', { detail: { theme: styleId } }));
      try {
        window.postMessage({ type: 'THEME_CHANGE', theme: styleId }, '*');
        window.parent?.postMessage({ type: 'THEME_CHANGE', theme: styleId }, '*');
      } catch {}
    }
  };

  const activeStyle = THEME_STYLES.find((s) => s.id === currentStyle) || THEME_STYLES[0];

  return (
    <Menu.Root>
      <Menu.Trigger className={menuItemBtnClass}>
        <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
          <PaletteIcon className="size-[15px]" />
        </span>
        <span className="text-[13.5px] font-medium tracking-tight text-white/95">
          Styles
        </span>
        <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
          <span className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors">
            {activeStyle.label}
          </span>
          <MenuChevron />
        </span>
      </Menu.Trigger>
      <Menu.Content className={menuContentClass}>
        <Menu.Item className={menuBackBtnClass}>
          <MenuChevron back />
          <span>Styles</span>
        </Menu.Item>
        <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
        <Menu.RadioGroup
          value={currentStyle}
          onValueChange={handleSelectStyle}
          className="flex flex-col gap-0.5"
        >
          {THEME_STYLES.map((style) => (
            <RadioItem key={style.id} value={style.id}>
              <span>{style.label}</span>
            </RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  );
}

function LayoutMenu() {
  const [currentLayout, setCurrentLayout] = useLayoutMode();
  const activeLayout = LAYOUT_OPTIONS.find((l) => l.id === currentLayout) || LAYOUT_OPTIONS[0];

  return (
    <Menu.Root>
      <Menu.Trigger className={menuItemBtnClass}>
        <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
          <LayoutIcon className="size-[15px]" />
        </span>
        <span className="text-[13.5px] font-medium tracking-tight text-white/95">
          Layout
        </span>
        <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
          <span className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors">
            {activeLayout.label}
          </span>
          <MenuChevron />
        </span>
      </Menu.Trigger>
      <Menu.Content className={menuContentClass}>
        <Menu.Item className={menuBackBtnClass}>
          <MenuChevron back />
          <span>Layout</span>
        </Menu.Item>
        <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
        <Menu.RadioGroup
          value={currentLayout}
          onValueChange={(value) => setCurrentLayout(value as PlayerLayout)}
          className="flex flex-col gap-0.5"
        >
          {LAYOUT_OPTIONS.map((opt) => (
            <RadioItem key={opt.id} value={opt.id}>
              <span>{opt.label}</span>
            </RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

/** Sleek YouTube/Figma style menu item (clean row with hover background, no permanent pill borders) */
const menuItemBtnClass = cn(
  'group/menu-btn flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-[10px] min-h-[38px] w-full shrink-0 px-2.5 py-1.5 text-start text-[13.5px] leading-snug font-medium text-white/95 select-none',
  // Clean transparent row by default; smooth subtle frosted highlight strictly on actual hover or keyboard focus-visible
  'bg-transparent border-0',
  'hover:bg-white/[0.08] data-focus-visible:bg-white/[0.08]',
  'active:bg-white/[0.14]',
  'transition-colors duration-150 ease-out outline-none',
  'data-[availability=unavailable]:hidden data-[availability=unsupported]:hidden',
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white'
);

/** Submenu back button styling (clean header row with hover highlight) */
const menuBackBtnClass = cn(
  'group/menu-back flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[10px] min-h-[38px] w-full shrink-0 px-2.5 py-1.5 text-start text-[13.5px] leading-snug font-medium text-white select-none',
  'bg-transparent border-0',
  'hover:bg-white/[0.08] data-focus-visible:bg-white/[0.08]',
  'active:bg-white/[0.14]',
  'transition-colors duration-150 ease-out outline-none',
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white'
);

function MenuChevron({ back = false }: { back?: boolean } = {}) {
  return (
    <ChevronIconPrimitive
      className={
        back
          ? 'size-[13px] shrink-0 transform-[rotate(180deg)] rtl:transform-none text-white/40'
          : 'size-[13px] shrink-0 text-white/35 group-hover/menu-btn:text-white/60 group-focus-visible/menu-btn:text-white/60 transition-colors rtl:transform-[scaleX(-1)]'
      }
    />
  );
}

function QualityMenu() {
  return (
    <Menu.Root>
      <QualityRadioGroup.Root>
        <Menu.Trigger className={menuItemBtnClass}>
          <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
            <SwitchesIconPrimitive className="size-[15px]" />
          </span>
          <TextPrimitive className="text-[13.5px] font-medium tracking-tight text-white/95" token={qualityText.key}>
            {qualityText.text}
          </TextPrimitive>
          <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
            <QualityRadioGroup.Value className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors" />
            <MenuChevron />
          </span>
        </Menu.Trigger>
        <Menu.Content className={menuContentClass}>
          <Menu.Item className={menuBackBtnClass}>
            <MenuChevron back />
            <TextPrimitive token={qualityText.key}>{qualityText.text}</TextPrimitive>
          </Menu.Item>
          <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
          <QualityRadioGroup.Options
            className={'flex flex-col gap-0.5'}
            renderItem={(props, item) => (
              <RadioItem {...props}>
                <span>
                  <span>{item.label}</span>
                  {item.tier ? (
                    <sup className={'ps-0.5 pt-px text-media-sm leading-none opacity-70'}>{item.tier}</sup>
                  ) : null}
                </span>
              </RadioItem>
            )}
          ></QualityRadioGroup.Options>
        </Menu.Content>
      </QualityRadioGroup.Root>
    </Menu.Root>
  );
}

function AudioTrackMenu() {
  return (
    <Menu.Root>
      <AudioTrackRadioGroup.Root>
        <Menu.Trigger className={menuItemBtnClass}>
          <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
            <SpeechIconPrimitive className="size-[15px]" />
          </span>
          <TextPrimitive className="text-[13.5px] font-medium tracking-tight text-white/95" token={audioText.key}>
            {audioText.text}
          </TextPrimitive>
          <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
            <AudioTrackRadioGroup.Value className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors" />
            <MenuChevron />
          </span>
        </Menu.Trigger>
        <Menu.Content className={menuContentClass}>
          <Menu.Item className={menuBackBtnClass}>
            <MenuChevron back />
            <TextPrimitive token={audioText.key}>{audioText.text}</TextPrimitive>
          </Menu.Item>
          <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
          <AudioTrackRadioGroup.Options
            className={'flex flex-col gap-0.5'}
            renderItem={(props, item) => (
              <RadioItem {...props}>
                <span>{item.label}</span>
              </RadioItem>
            )}
          ></AudioTrackRadioGroup.Options>
        </Menu.Content>
      </AudioTrackRadioGroup.Root>
    </Menu.Root>
  );
}

function PlaybackRateMenu() {
  return (
    <Menu.Root>
      <PlaybackRateRadioGroup.Root>
        <Menu.Trigger className={menuItemBtnClass}>
          <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
            <SpeedIconPrimitive className="size-[15px]" />
          </span>
          <TextPrimitive className="text-[13.5px] font-medium tracking-tight text-white/95" token={speedText.key}>
            {speedText.text}
          </TextPrimitive>
          <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
            <PlaybackRateRadioGroup.Value className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors" />
            <MenuChevron />
          </span>
        </Menu.Trigger>
        <Menu.Content className={menuContentClass}>
          <Menu.Item className={menuBackBtnClass}>
            <MenuChevron back />
            <TextPrimitive token={speedText.key}>{speedText.text}</TextPrimitive>
          </Menu.Item>
          <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
          <PlaybackRateRadioGroup.Options
            className={'flex flex-col gap-0.5'}
            renderItem={(props, item) => (
              <RadioItem {...props}>
                <span>{item.label}</span>
              </RadioItem>
            )}
          ></PlaybackRateRadioGroup.Options>
        </Menu.Content>
      </PlaybackRateRadioGroup.Root>
    </Menu.Root>
  );
}

function CaptionsMenu() {
  return (
    <Menu.Root>
      <CaptionsRadioGroup.Root>
        <Menu.Trigger className={menuItemBtnClass}>
          <span className="flex size-[20px] shrink-0 items-center justify-center text-white/75 group-hover/menu-btn:text-white group-focus-visible/menu-btn:text-white transition-colors">
            <RoundedCaptionsOffIcon className="size-[15px]" style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }} />
          </span>
          <TextPrimitive className="text-[13.5px] font-medium tracking-tight text-white/95" token={captionsText.key}>
            {captionsText.text}
          </TextPrimitive>
          <span className="ms-auto inline-flex min-w-0 items-center gap-1.5 ps-3 text-white/50">
            <CaptionsRadioGroup.Value className="max-w-28 truncate text-[13px] text-white/50 group-hover/menu-btn:text-white/70 group-focus-visible/menu-btn:text-white/70 font-normal transition-colors" />
            <MenuChevron />
          </span>
        </Menu.Trigger>
        <Menu.Content className={menuContentClass}>
          <Menu.Item className={menuBackBtnClass}>
            <MenuChevron back />
            <TextPrimitive token={captionsText.key}>{captionsText.text}</TextPrimitive>
          </Menu.Item>
          <Menu.Separator className={'my-1 border-t border-white/[0.08]'} />
          <CaptionsRadioGroup.Options
            className={'flex flex-col gap-0.5'}
            renderItem={(props, item) => (
              <RadioItem {...props}>
                <span>{item.label}</span>
              </RadioItem>
            )}
          ></CaptionsRadioGroup.Options>
        </Menu.Content>
      </CaptionsRadioGroup.Root>
    </Menu.Root>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="6 6 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M14.3341 8.3315C14.7357 6.55673 17.2647 6.55561 17.6663 8.3315C17.7265 8.59822 17.8499 8.8466 18.0261 9.05572C18.2023 9.26484 18.4262 9.42859 18.6789 9.53319C18.9316 9.63779 19.2057 9.68019 19.4782 9.6568C19.7507 9.63342 20.0136 9.54495 20.2448 9.39883C21.7838 8.42709 23.5714 10.2165 22.6005 11.7562C21.9705 12.7527 22.5173 14.0731 23.6681 14.334C25.4445 14.7344 25.4434 17.2649 23.6681 17.6653C23.4014 17.7257 23.153 17.8493 22.9438 18.0255C22.7347 18.2018 22.5709 18.4256 22.4662 18.6783C22.3615 18.9309 22.319 19.205 22.3421 19.4775C22.3653 19.7499 22.4535 20.0129 22.5994 20.2442C23.5714 21.7839 21.7838 23.5733 20.2448 22.6005C20.0134 22.4549 19.7505 22.3669 19.4781 22.3438C19.2057 22.3208 18.9317 22.3634 18.6792 22.468C18.4266 22.5727 18.2028 22.7363 18.0266 22.9453C17.8504 23.1542 17.7268 23.4024 17.6663 23.6689C17.2647 25.4437 14.7346 25.4437 14.3341 23.6689C14.2736 23.4024 14.15 23.1542 13.9738 22.9453C13.7976 22.7363 13.5738 22.5727 13.3213 22.468C13.0687 22.3634 12.7947 22.3208 12.5223 22.3438C12.2499 22.3669 11.987 22.4549 11.7556 22.6005C10.2166 23.5722 8.42902 21.7839 9.39989 20.2442C9.54576 20.013 9.63402 19.7501 9.65727 19.4777C9.68051 19.2053 9.63807 18.9313 9.53348 18.6786C9.4289 18.426 9.26524 18.2021 9.05623 18.0258C8.84722 17.8495 8.59895 17.7259 8.33227 17.6653C6.55591 17.2649 6.55591 14.7344 8.33227 14.334C8.59888 14.2735 8.8471 14.15 9.05611 13.9738C9.26512 13.7976 9.42882 13.5739 9.5335 13.3214C9.63818 13.0689 9.68078 12.795 9.65773 12.5227C9.63468 12.2503 9.54664 11.9875 9.40101 11.7562C8.42902 10.2165 10.2166 8.42709 11.7556 9.39883C12.7535 10.0287 14.0742 9.48318 14.3341 8.3315ZM15.9991 12.2376C15.0015 12.2379 14.0449 12.6343 13.3397 13.3397C12.6345 14.0452 12.2385 15.0018 12.2388 15.9991C12.2991 16.9964 12.6357 17.9528 13.3413 18.6578C14.0469 19.3628 15.0037 19.7587 16.0013 19.7584C16.9989 19.7581 17.9555 19.3616 18.6607 18.6562C19.3659 17.9508 19.7619 16.9942 19.7616 15.9968C19.7613 14.9995 19.3647 14.0432 18.6591 13.3382C17.9535 12.6332 16.9967 12.2373 15.9991 12.2376Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SettingsMenu() {
  return (
    <Menu.Root side="top" align="end">
      <ButtonTooltip label={<TextPrimitive token={settingsText.key}>{settingsText.text}</TextPrimitive>}>
        <Menu.Trigger
          render={<Button />}
          className="group/settings relative hover:scale-100 active:scale-100 data-open:scale-100 transition-colors"
        >
          <GearIcon className={'col-start-1 row-start-1 size-[16.1px] text-white'} />
          <TextPrimitive className={'sr-only'} token={settingsText.key}>
            {settingsText.text}
          </TextPrimitive>
        </Menu.Trigger>
      </ButtonTooltip>
      <Menu.Popup
        keepMounted
        className={cn(
          'm-0 overflow-visible border-0 text-inherit',
          'media-transitioning:opacity-0 media-transitioning:blur-media-hidden-popup media-transitioning:scale-media-hidden-popup',
          'data-starting-style:transform-[translate(var(--media-popup-translate-x-distance,0),var(--media-popup-translate-y-distance,0))]',
          'data-ending-style:transform-none',
          'data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left',
          'data-[side=top]:[--media-popup-translate-y-distance:var(--media-popup-translate-distance)]',
          'data-[side=bottom]:[--media-popup-translate-y-distance:calc(var(--media-popup-translate-distance)*-1)]',
          'data-[side=left]:[--media-popup-translate-x-distance:var(--media-popup-translate-distance)]',
          'data-[side=right]:[--media-popup-translate-x-distance:calc(var(--media-popup-translate-distance)*-1)]',
          'before:pointer-events-none before:absolute',
          'data-[side=top]:before:inset-x-0 data-[side=top]:before:top-full',
          'data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:bottom-full',
          'data-[side=left]:before:inset-y-0 data-[side=left]:before:left-full',
          'data-[side=right]:before:inset-y-0 data-[side=right]:before:right-full',
          'data-[side=top]:before:h-(--media-popup-side-offset) data-[side=bottom]:before:h-(--media-popup-side-offset)',
          'data-[side=left]:before:w-(--media-popup-side-offset) data-[side=right]:before:w-(--media-popup-side-offset)',
          // Clean transparent popup positioning surface (content handles the card background)
          'z-20 m-0 w-[264px]! min-w-[248px]! max-w-[272px]! overflow-visible! bg-transparent! border-0! shadow-none! backdrop-blur-none! p-0 text-white',
          '[--media-popover-align-offset:39.3px] rtl:[--media-popover-align-offset:-39.3px] [--media-popover-side-offset:24px] [--media-popup-side-offset:var(--media-popover-side-offset)]',
          'max-h-[min(var(--media-menu-available-height,--spacing(64)),--spacing(64))] overscroll-none',
          'h-(--media-menu-height)'
        )}
      >
        <Menu.Content className={menuContentClass}>
          <StylesMenu />
          <LayoutMenu />
          <QualityMenu />
          <AudioTrackMenu />
          <PlaybackRateMenu />
          <CaptionsMenu />
        </Menu.Content>
      </Menu.Popup>
    </Menu.Root>
  );
}
