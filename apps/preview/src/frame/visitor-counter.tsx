import { useEffect, useState } from 'react';

const COUNTER_KEY = 'luminary_videojs_v10_skin_official';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

/**
 * Visitor Counter with strict Owner filtering:
 * - Localhost / 127.0.0.1 is automatically recognized as owner (never increments).
 * - Visiting with `?owner`, `?admin`, or `?no-count` permanently marks browser as owner via localStorage.
 * - For regular visitors, counts 1 visit per session (sessionStorage deduplication) so refreshes don't inflate counts.
 * - Fails silently and unobtrusively if network/API is unavailable.
 */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const isLocal =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.endsWith('.local'));

      // Check URL parameters for owner flag
      const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const hashParams =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.hash.replace(/^#/, '')) : null;

      const hasOwnerFlag =
        searchParams?.has('owner') ||
        searchParams?.has('admin') ||
        searchParams?.has('no-count') ||
        hashParams?.has('owner') ||
        hashParams?.has('admin');

      if (hasOwnerFlag && typeof window !== 'undefined') {
        localStorage.setItem('luminary_is_owner', 'true');
      }

      // Check parent window for owner flag if running in iframe
      try {
        if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
          const parentSearch = new URLSearchParams(window.parent.location.search);
          if (parentSearch.has('owner') || parentSearch.has('admin') || parentSearch.has('no-count')) {
            localStorage.setItem('luminary_is_owner', 'true');
            window.parent.localStorage?.setItem('luminary_is_owner', 'true');
          }
        }
      } catch {
        // Cross-origin iframe fallback
      }

      const ownerStatus =
        isLocal ||
        (typeof window !== 'undefined' && localStorage.getItem('luminary_is_owner') === 'true');

      setIsOwner(ownerStatus);

      if (ownerStatus) {
        // OWNER: Read-only check, NEVER increment
        fetch(`${API_BASE}/get/${COUNTER_KEY}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && typeof data.value === 'number') {
              setCount(data.value);
            }
          })
          .catch(() => {});
      } else {
        // VISITOR: Increment once per session to avoid duplicate counts on refresh
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
      }
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
