import { useEffect, useState } from 'react';

// Fresh production key for the contest launch
const COUNTER_KEY = 'luminary_videojs_live_contest_views';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

/**
 * Production Visitor Counter:
 * - HARD LOCKED: On ANY local server or dev port, strictly displays 0 and never touches the API.
 * - On live production, only real external visitors increment the counter (1x per browser session).
 * - Visiting with `?owner`, `?admin`, or `?no-count` on production permanently exempts the browser from counting.
 */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const hostname = window.location.hostname;
      const port = window.location.port;

      // 1. If running on ANY local server or dev port -> strictly display 0 visits, NEVER touch API
      const isLocalServer =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.endsWith('.local') ||
        port !== '';

      if (isLocalServer) {
        setCount(0);
        return;
      }

      // 2. Check if owner flag is present in URL or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      let isOwner = localStorage.getItem('luminary_is_owner') === 'true';

      if (urlParams.has('owner') || urlParams.has('admin') || urlParams.has('no-count')) {
        localStorage.setItem('luminary_is_owner', 'true');
        isOwner = true;
      }

      try {
        if (window.parent && window.parent !== window) {
          const parentParams = new URLSearchParams(window.parent.location.search);
          if (parentParams.has('owner') || parentParams.has('admin') || parentParams.has('no-count')) {
            localStorage.setItem('luminary_is_owner', 'true');
            isOwner = true;
          }
        }
      } catch {
        // Cross-origin fallback
      }

      // 3. If owner on live site -> Read-only check, NEVER increment
      if (isOwner) {
        fetch(`${API_BASE}/get/${COUNTER_KEY}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            setCount(data?.value ?? 0);
          })
          .catch(() => setCount(0));
        return;
      }

      // 4. Real visitor on live site -> Increment 1 time per browser session
      const counted = sessionStorage.getItem('luminary_v10_counted');
      const endpoint = counted
        ? `${API_BASE}/get/${COUNTER_KEY}`
        : `${API_BASE}/hit/${COUNTER_KEY}`;

      fetch(endpoint)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.value === 'number') {
            setCount(data.value);
            sessionStorage.setItem('luminary_v10_counted', 'true');
          } else {
            setCount(0);
          }
        })
        .catch(() => setCount(0));
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
