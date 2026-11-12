import { useEffect, useState } from 'react';

/**
 * Hook to detect whether the user is on a mobile device in portrait orientation
 * (or preview simulator with Mobile device mode selected).
 */
export function useIsMobilePortrait(): boolean {
  const [isMobilePortrait, setIsMobilePortrait] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isDocMobile = document.documentElement.dataset.device === 'mobile';
    const isDocPortrait = document.documentElement.dataset.portrait === 'true';
    const isPortraitOrient = window.innerHeight >= window.innerWidth;
    const isNarrow = window.innerWidth <= 768;
    return isDocMobile || (isNarrow && isPortraitOrient) || isDocPortrait;
  });

  useEffect(() => {
    const check = () => {
      if (typeof window === 'undefined') return;
      const isDocMobile = document.documentElement.dataset.device === 'mobile';
      const isDocPortrait = document.documentElement.dataset.portrait === 'true';
      const isPortraitOrient = window.innerHeight >= window.innerWidth;
      const isNarrow = window.innerWidth <= 768;
      setIsMobilePortrait(isDocMobile || (isNarrow && isPortraitOrient) || isDocPortrait);
    };

    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);

    const observer = new MutationObserver(() => check());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-device', 'data-portrait'],
    });

    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
      observer.disconnect();
    };
  }, []);

  return isMobilePortrait;
}

