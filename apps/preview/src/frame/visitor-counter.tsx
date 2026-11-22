import { useEffect, useState } from 'react';

const COUNTER_KEY = 'luminary_skin_prod_v10_views';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

/**
 * Production Visitor Counter:
 * - Local development (localhost, 127.0.0.1, http, custom ports) is strictly READ-ONLY and will NEVER increment.
 * - Visiting with `?owner`, `?admin`, or `?no-count` on production permanently marks the browser as owner via localStorage (never increments).
 * - Only real visitors on live production (HTTPS, no owner flag) trigger a hit (deduplicated per browser session).
 */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      // 1. Detect any local or dev environment strictly
      const isLocalOrDev =
        window.location.protocol !== 'https:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.') ||
        window.location.hostname.endsWith('.local') ||
        window.location.port !== '';

      // 2. Detect owner flag in URL or parent window
      const searchParams = new URLSearchParams(window.location.search);
      let isOwnerQuery =
        searchParams.has('owner') || searchParams.has('admin') || searchParams.has('no-count');

      try {
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

      // 3. If local/dev OR owner: strictly READ-ONLY (never hit)
      if (isLocalOrDev || isOwner) {
        fetch(`${API_BASE}/get/${COUNTER_KEY}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && typeof data.value === 'number') {
              setCount(data.value);
            } else if (data?.error === 'Key not found') {
              setCount(0);
            }
          })
          .catch(() => {
            setCount(0);
          });
        return;
      }

      // 4. Real visitor on live production site
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
        .catch(() => {});
    } catch {
      // Graceful fallback
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
