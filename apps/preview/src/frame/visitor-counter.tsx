import { useEffect, useState } from 'react';

const COUNTER_KEY = 'luminary_prod_videojs_challenge_v10';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

/**
 * Production Visitor Counter:
 * - HARD LOCKED: Only runs on live deployed domains (e.g. *.netlify.app, *.vercel.app).
 * - Under NO CIRCUMSTANCES will localhost, 127.0.0.1, or local ports ever hit the counter.
 * - On local development, it strictly shows 0 visits (read-only).
 * - Visiting with `?owner`, `?admin`, or `?no-count` on live production permanently exempts the browser.
 */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const hostname = window.location.hostname;
      const protocol = window.location.protocol;

      // Hard check: Is this a live deployed HTTPS domain?
      const isLiveProduction =
        protocol === 'https:' &&
        (hostname.endsWith('.netlify.app') ||
          hostname.endsWith('.vercel.app') ||
          hostname.endsWith('.pages.dev') ||
          (!hostname.includes('localhost') &&
            !hostname.includes('127.0.0.1') &&
            !hostname.startsWith('192.168.') &&
            !hostname.startsWith('10.') &&
            window.location.port === ''));

      // Check owner flag
      let isOwnerQuery = false;
      try {
        const searchParams = new URLSearchParams(window.location.search);
        isOwnerQuery =
          searchParams.has('owner') || searchParams.has('admin') || searchParams.has('no-count');

        if (window.parent && window.parent !== window) {
          const parentSearch = new URLSearchParams(window.parent.location.search);
          if (
            parentSearch.has('owner') ||
            parentSearch.has('admin') ||
            parentSearch.has('no-count')
          ) {
            isOwnerQuery = true;
          }
        }
      } catch {
        // Cross-origin fallback
      }

      if (isOwnerQuery) {
        localStorage.setItem('luminary_is_owner', 'true');
        try {
          window.parent?.localStorage?.setItem('luminary_is_owner', 'true');
        } catch {
          // ignore
        }
      }

      const isOwner = localStorage.getItem('luminary_is_owner') === 'true';

      // IF NOT LIVE PRODUCTION OR IS OWNER -> READ-ONLY (NEVER HIT)
      if (!isLiveProduction || isOwner) {
        fetch(`${API_BASE}/get/${COUNTER_KEY}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && typeof data.value === 'number') {
              setCount(data.value);
            } else {
              setCount(0);
            }
          })
          .catch(() => {
            setCount(0);
          });
        return;
      }

      // ONLY REACHED ON REAL LIVE PRODUCTION BY EXTERNAL VISITORS
      const alreadyCountedSession = sessionStorage.getItem('luminary_counted_session');
      const endpoint = alreadyCountedSession
        ? `${API_BASE}/get/${COUNTER_KEY}`
        : `${API_BASE}/hit/${COUNTER_KEY}`;

      fetch(endpoint)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.value === 'number') {
            setCount(data.value);
            if (!alreadyCountedSession) {
              sessionStorage.setItem('luminary_counted_session', 'true');
            }
          }
        })
        .catch(() => {
          setCount(0);
        });
    } catch {
      setCount(0);
    }
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-tight text-white/40 hover:text-white/70 transition-colors select-none">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
      <span>{count.toLocaleString()} visits</span>
    </div>
  );
}
