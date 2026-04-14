import { Bell, Menu, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

function formatToday() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

export default function TopBar({ title, subtitle }) {
  const { userData, notifications, setNotifications, navigate, setSidebarOpen } = useApp();

  const lastScrollRef = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById('app-main');
    if (!el) return undefined;

    const onScroll = () => {
      const current = el.scrollTop;
      const delta = current - lastScrollRef.current;

      if (current <= 12) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastScrollRef.current = current;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-20 border-b border-white/[0.06] px-4 py-3.5 backdrop-blur-md md:px-6 md:py-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
        background: 'rgba(18,18,30,0.92)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Hamburger — mobile */}
        <button
          type="button"
          className="fp-icon-btn flex-shrink-0 md:hidden"
          aria-label="Open navigation"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={17} strokeWidth={2.3} />
        </button>

        {/* Title block */}
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3a3f52]">
            {formatToday()}
          </p>
          <h1 className="truncate text-[1.1rem] font-bold leading-snug tracking-[-0.01em] text-[#f0f0f5] sm:text-[1.2rem] font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-[11px] font-medium text-[#555b6e]">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#888ea0] hover:bg-white/[0.06] hover:text-[#f0f0f5] transition-colors"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Search size={14} />
            <span className="text-[11px] font-semibold">Search</span>
            <span className="ml-1 flex items-center justify-center rounded px-1.5 py-0.5 border border-white/[0.1] bg-white/[0.04] text-[9px] font-bold">⌘K</span>
          </button>
          
          <button
            type="button"
            className="md:hidden fp-icon-btn"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Search size={15} />
          </button>

          <button
            type="button"
            className="fp-icon-btn relative"
            aria-label={`Notifications${notifications > 0 ? ` (${notifications} unread)` : ''}`}
            onClick={() => setNotifications(0)}
          >
            <Bell size={15} strokeWidth={2.3} />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF6B47] px-1 text-[9px] font-bold leading-none text-white shadow-[0_2px_8px_rgba(255,107,71,0.4)]">
                {notifications}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('profile')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(255,107,71,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_18px_rgba(255,107,71,0.4)]"
            aria-label="Open profile"
          >
            {userData.initials}
          </button>
        </div>
      </div>
    </header>
  );
}
