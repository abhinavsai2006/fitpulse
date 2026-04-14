import {
  Activity,
  BarChart3,
  CircleUserRound,
  Dumbbell,
  Goal,
  House,
  LogOut,
  Salad,
  Settings,
  X,
} from 'lucide-react';
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard',       icon: House,           section: 'main' },
  { id: 'workouts',  label: 'Workout Library',  icon: Dumbbell,       section: 'main' },
  { id: 'activity',  label: 'Activity Timeline',icon: Activity,       section: 'main' },
  { id: 'nutrition', label: 'Nutrition',        icon: Salad,          section: 'main' },
  { id: 'analytics', label: 'Performance',      icon: BarChart3,      section: 'main' },
  { id: 'goals',     label: 'Goals',            icon: Goal,           section: 'main' },
  { id: 'profile',   label: 'Profile',          icon: CircleUserRound,section: 'account' },
  { id: 'settings',  label: 'Settings',         icon: Settings,       section: 'account' },
];

const mainItems    = navItems.filter((n) => n.section === 'main');
const accountItems = navItems.filter((n) => n.section === 'account');

function NavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      key={item.id}
      type="button"
      onClick={() => onClick(item.id)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-[#FF6B47]/10 text-[#FF6B47]'
          : 'text-[#555b6e] hover:bg-white/[0.04] hover:text-[#888ea0]'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
          active ? 'bg-[#FF6B47]/15' : ''
        }`}
      >
        <Icon size={15} strokeWidth={active ? 2.4 : 2} />
      </span>
      <span className="flex-1 text-left">{item.label}</span>
      {active && (
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF6B47] shadow-[0_0_6px_rgba(255,107,71,0.5)]" />
      )}
    </button>
  );
}

function SidebarContent({ onNavigate, currentPage, userData, logout, onClose }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 pb-3">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left flex-1 hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-white shadow-[0_4px_16px_rgba(255,107,71,0.25)]">
            <Dumbbell size={17} strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#f0f0f5] font-display">FitPulse</p>
            <p className="text-[10px] font-semibold text-[#555b6e]">Athlete Suite</p>
          </div>
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 fp-icon-btn h-9 w-9 flex-shrink-0"
            aria-label="Close menu"
          >
            <X size={16} strokeWidth={2.4} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="no-scrollbar flex-1 space-y-0.5 overflow-y-auto px-3 pb-2" aria-label="Primary navigation">
        <p className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#3a3f52]">Main</p>
        {mainItems.map((item) => (
          <NavButton key={item.id} item={item} active={currentPage === item.id} onClick={onNavigate} />
        ))}

        <p className="mb-1.5 mt-4 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#3a3f52]">Account</p>
        {accountItems.map((item) => (
          <NavButton key={item.id} item={item} active={currentPage === item.id} onClick={onNavigate} />
        ))}
      </nav>

      {/* User card */}
      <div className="px-3 pb-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex w-full items-center gap-2.5">
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
              onClick={() => onNavigate('profile')}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-sm font-bold text-white">
                {userData.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#f0f0f5]">{userData.name}</p>
                <p className="truncate text-[11px] font-semibold text-[#555b6e]">{userData.level}</p>
              </div>
            </button>

            <button
              type="button"
              onClick={logout}
              className="fp-icon-btn h-9 w-9 flex-shrink-0"
              title="Log out"
              aria-label="Log out"
            >
              <LogOut size={14} strokeWidth={2.3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { currentPage, navigate, userData, logout, sidebarOpen, setSidebarOpen } = useApp();

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen, setSidebarOpen]);

  const handleNavigate = (page) => {
    navigate(page);
    setSidebarOpen(false);
  };

  const sharedProps = {
    onNavigate: handleNavigate,
    currentPage,
    userData,
    logout,
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fp-panel hidden w-[240px] flex-shrink-0 md:flex md:flex-col overflow-hidden">
        <SidebarContent {...sharedProps} />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog" aria-label="Navigation menu">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0c0c14] shadow-[6px_0_40px_rgba(0,0,0,0.6)] animate-[fpSlideRight_280ms_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ borderRadius: '0 20px 20px 0' }}
          >
            <SidebarContent {...sharedProps} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
