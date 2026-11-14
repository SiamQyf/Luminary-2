import {
  CheckIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  FilmIcon,
} from '@heroicons/react/16/solid';
import { useEffect, useRef, useState } from 'react';

import { LAYOUT_OPTIONS, type PlayerLayout } from '@/video/shared/layout-mode';

export const DEVICE_OPTIONS = [
  { id: 'desktop', label: 'Desktop', width: 896 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'mobile', label: 'Mobile', width: 384 },
] as const;

export type DeviceType = (typeof DEVICE_OPTIONS)[number]['id'];

export interface VideoBarProps {
  currentSrc?: string;
  currentTheme: string;
  currentLayout: PlayerLayout;
  currentDevice: DeviceType;
  onVideoChange: (src: string) => void;
  onThemeChange: (theme: string) => void;
  onLayoutChange: (layout: PlayerLayout) => void;
  onDeviceChange: (device: DeviceType) => void;
}

export interface SandboxVideo {
  id: string;
  title: string;
  subtitle: string;
  label: string;
  src: string;
}

export const SANDBOX_VIDEOS: readonly SandboxVideo[] = [
  {
    id: 'hls-1',
    title: 'Big Buck Bunny',
    subtitle: 'Blender Foundation • 1080p HLS',
    label: 'Big Buck Bunny (HLS)',
    src: 'https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8',
  },
  {
    id: 'hls-2',
    title: 'Elephants Dream',
    subtitle: 'Blender Open Movie • 1080p HLS',
    label: 'Elephants Dream (HLS)',
    src: 'https://stream.mux.com/Sc89iWAyNkhJ3P1rQ02nrEdCFTnfT01CZ2KmaEcxXfB008.m3u8',
  },
  {
    id: 'hls-5',
    title: 'Mad Max: Fury Road',
    subtitle: 'Official Teaser Trailer • HLS',
    label: 'Mad Max Trailer (HLS)',
    src: 'https://stream.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ.m3u8',
  },
  {
    id: 'hls-4',
    title: 'View From A Blue Moon',
    subtitle: 'John John Florence & Brain Farm • 4K HLS',
    label: 'View From A Blue Moon (HLS)',
    src: 'https://stream.mux.com/lyrKpPcGfqyzeI00jZAfW6MvP6GNPrkML.m3u8',
  },
  {
    id: 'nasa',
    title: 'Cosmic Dawn',
    subtitle: 'NASA James Webb Space Telescope • Chapters',
    label: 'Cosmic Dawn (HLS + Chapters)',
    src: 'https://stream.mux.com/83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s.m3u8',
  },
  {
    id: 'hls-3',
    title: 'Dancing Dude',
    subtitle: 'Universal Video Showcase • HLS',
    label: 'Dancing Dude (HLS)',
    src: 'https://stream.mux.com/lhnU49l1VGi3zrTAZhDm9LUUxSjpaPW9BL4jY25Kwo4.m3u8',
  },
  {
    id: 'hls-6',
    title: 'Tailwind Vertical',
    subtitle: '9:16 Vertical Mobile Video • HLS',
    label: 'Tailwind Vertical (HLS)',
    src: 'https://stream.mux.com/vth873zxidmhBVVRWBKcPTxnSQ302QqUm.m3u8',
  },
  {
    id: 'hls-7',
    title: 'Dahlback Golf RSI',
    subtitle: 'Track Day & Performance Test • HLS',
    label: 'Dahlback Golf RSI (HLS)',
    src: 'https://stream.mux.com/yH00b01Lj2z023hUQdEf6EpURPROSsvE1qWPnR8ShnbnI8.m3u8',
  },
  {
    id: 'hls-4k',
    title: 'Short 4K UHD',
    subtitle: 'Ultra High Definition Nature Stream • HLS',
    label: 'Short 4K UHD (HLS)',
    src: 'https://stream.mux.com/SfAaZ9InpM8FMfky7DkNBuTpxEDqU8Jchpa49urOWcs.m3u8',
  },
  {
    id: 'hls-live',
    title: 'Live Stream Bunny',
    subtitle: 'Simulated 24/7 Live Stream • HLS',
    label: 'Live Stream Bunny (HLS)',
    src: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
  },
  {
    id: 'hls-multi-audio',
    title: 'Multi-Language Audio',
    subtitle: 'Multiple Audio & Commentary Tracks • HLS',
    label: 'Multi-language Audio (HLS)',
    src: 'https://stream.mux.com/s41JYeqIpBMBzE4OzxDyGR2yrp2hD1CQ6gJN9SlVGDQ.m3u8',
  },
  {
    id: 'mp4-1',
    title: 'Dancing Dude',
    subtitle: 'Progressive MP4 High Quality Video',
    label: 'Dancing Dude (MP4)',
    src: 'https://stream.mux.com/lhnU49l1VGi3zrTAZhDm9LUUxSjpaPW9BL4jY25Kwo4/highest.mp4',
  },
] as const;

export const STYLE_OPTIONS = [
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
  { id: 'liquid-mercury', label: 'Liquid Mercury' },
  { id: 'aurora-borealis', label: 'Aurora Borealis' },
  { id: 'solar-flare', label: 'Solar Flare' },
  { id: 'amethyst-geode', label: 'Amethyst Geode' },
  { id: 'cyber-deck', label: 'Cyber Deck' },
  { id: 'porcelain-cobalt', label: 'Porcelain & Cobalt' },
  { id: 'emerald-vault', label: 'Emerald Vault' },
  { id: 'vaporwave-sunset', label: 'Vaporwave Sunset' },
  { id: 'carbon-stealth', label: 'Carbon Stealth' },
  { id: 'holo-prism', label: 'Holo Prism' },
  { id: 'deep-abyss', label: 'Deep Abyss' },
  { id: 'velvet-opera', label: 'Velvet Opera' },
  { id: 'water-droplet', label: 'Water Droplet' },
  { id: 'glacial-permafrost', label: 'Glacial Permafrost' },
  // E-Learning, EdTech & Universities
  { id: 'oxford-academe', label: 'Oxford Academe', subtitle: 'Collegiate Heritage & Ivy Gold' },
  { id: 'chalk-blackboard', label: 'Chalk Blackboard', subtitle: 'MIT Lecture Hall & Slate Chalk' },
  { id: 'code-syntax', label: 'Code Syntax', subtitle: 'CS Lab IDE & Monaco Dark' },
  { id: 'quantum-lab', label: 'Quantum Lab', subtitle: 'STEM Telemetry & Oscilloscope' },
  { id: 'papyrus-vellum', label: 'Papyrus Vellum', subtitle: 'Archival Library & Gold Leaf' },
] as const;

interface FlatOption<T extends string> {
  id: T;
  label: string;
  subtitle?: string;
}

interface FlatSelectProps<T extends string> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value: T;
  options: readonly FlatOption<T>[];
  onChange: (value: T) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menuMinWidth?: number | string;
  menuAlign?: 'left' | 'right';
}

function FlatSelect<T extends string>({
  id,
  label,
  icon,
  value,
  options,
  onChange,
  isOpen,
  onOpenChange,
  menuMinWidth,
  menuAlign = 'left',
}: FlatSelectProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.id === value) || options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenChange(!isOpen);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        onOpenChange(true);
      } else {
        const currentIndex = options.findIndex((o) => o.id === value);
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex].id);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        onOpenChange(true);
      } else {
        const currentIndex = options.findIndex((o) => o.id === value);
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange(options[prevIndex].id);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flat-select-wrapper ${isOpen ? 'is-open' : ''}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        id={id}
        className="flat-select-trigger"
        onClick={() => onOpenChange(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && <span className="flat-select-icon">{icon}</span>}
        <span className="flat-select-label">{label}</span>
        <span className="flat-select-value">{selectedOption?.label}</span>
        <ChevronDownIcon
          width={14}
          height={14}
          className={`flat-select-chevron ${isOpen ? 'rotate-180' : ''}`}
          style={{ width: '14px', height: '14px', minWidth: '14px', maxWidth: '14px' }}
        />
      </button>

      {isOpen && (
        <div
          className={`flat-select-menu ${menuAlign === 'right' ? 'align-right' : 'align-left'}`}
          role="listbox"
          aria-labelledby={id}
          style={menuMinWidth ? { minWidth: menuMinWidth } : undefined}
        >
          {options.map((option) => {
            const isSelected = option.id === value;
            return (
              <div
                key={option.id}
                role="option"
                aria-selected={isSelected}
                className={`flat-select-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.id);
                  onOpenChange(false);
                }}
              >
                <div className="flat-select-option-text">
                  <span className="flat-select-option-label">{option.label}</span>
                  {option.subtitle && (
                    <span className="flat-select-option-subtitle">{option.subtitle}</span>
                  )}
                </div>
                {isSelected && (
                  <CheckIcon
                    width={14}
                    height={14}
                    className="flat-select-check"
                    style={{ width: '14px', height: '14px', minWidth: '14px', maxWidth: '14px' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function VideoBar({
  currentSrc,
  currentTheme,
  currentLayout,
  currentDevice,
  onVideoChange,
  onThemeChange,
  onLayoutChange,
  onDeviceChange,
}: VideoBarProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Find if currentSrc matches one of the sandbox presets
  const matchedPreset = SANDBOX_VIDEOS.find((v) => v.src === currentSrc);
  const selectedPresetId = matchedPreset ? matchedPreset.id : SANDBOX_VIDEOS[0].id;

  const handlePresetSelect = (id: string) => {
    const found = SANDBOX_VIDEOS.find((v) => v.id === id);
    if (found) {
      onVideoChange(found.src);
    }
  };

  return (
    <div className="video-bar-container">
      {/* 1. Flat dropdown to choose from official sandbox videos */}
      <FlatSelect
        id="video-preset-select"
        label="Videos:"
        icon={
          <FilmIcon
            width={15}
            height={15}
            style={{ width: '15px', height: '15px', minWidth: '15px', maxWidth: '15px', opacity: 0.7, flexShrink: 0 }}
          />
        }
        value={selectedPresetId}
        options={SANDBOX_VIDEOS}
        onChange={handlePresetSelect}
        isOpen={openId === 'videos'}
        onOpenChange={(open) => setOpenId(open ? 'videos' : null)}
        menuMinWidth="280px"
      />

      {/* 2. Flat dropdown to choose styles */}
      <FlatSelect
        id="style-select"
        label="Styles:"
        value={currentTheme}
        options={STYLE_OPTIONS}
        onChange={onThemeChange}
        isOpen={openId === 'styles'}
        onOpenChange={(open) => setOpenId(open ? 'styles' : null)}
        menuMinWidth="230px"
      />

      {/* 3. Flat dropdown to switch between Expanded and Simple bar layouts */}
      <FlatSelect
        id="layout-select"
        label="Layout:"
        value={currentLayout}
        options={LAYOUT_OPTIONS}
        onChange={(val) => onLayoutChange(val as PlayerLayout)}
        isOpen={openId === 'layout'}
        onOpenChange={(open) => setOpenId(open ? 'layout' : null)}
        menuMinWidth="160px"
      />

      {/* 4. Flat dropdown to choose device type */}
      <FlatSelect
        id="device-select"
        label="Device:"
        icon={
          currentDevice === 'mobile' ? (
            <DevicePhoneMobileIcon
              width={15}
              height={15}
              style={{ width: '15px', height: '15px', minWidth: '15px', maxWidth: '15px', opacity: 0.7, flexShrink: 0 }}
            />
          ) : currentDevice === 'tablet' ? (
            <DeviceTabletIcon
              width={15}
              height={15}
              style={{ width: '15px', height: '15px', minWidth: '15px', maxWidth: '15px', opacity: 0.7, flexShrink: 0 }}
            />
          ) : (
            <ComputerDesktopIcon
              width={15}
              height={15}
              style={{ width: '15px', height: '15px', minWidth: '15px', maxWidth: '15px', opacity: 0.7, flexShrink: 0 }}
            />
          )
        }
        value={currentDevice}
        options={DEVICE_OPTIONS}
        onChange={(val) => onDeviceChange(val as DeviceType)}
        isOpen={openId === 'device'}
        onOpenChange={(open) => setOpenId(open ? 'device' : null)}
        menuMinWidth="170px"
        menuAlign="right"
      />
    </div>
  );
}
