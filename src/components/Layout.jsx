import {
  Activity,
  BarChart3,
  CircleUserRound,
  Dumbbell,
  Goal,
  House,
  Salad,
} from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useApp } from '../context/AppContext';
import AIAssistant from './AIAssistant';
import SearchModal from './SearchModal';
import { Bot, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const pageMeta = {
  dashboard:  { title: 'Today Snapshot',       subtitle: 'A calm overview of your health day.' },
  workouts:   { title: 'Workout Library',       subtitle: 'Plan sessions and start instantly.' },
  activity:   { title: 'Activity Timeline',     subtitle: 'Review your recent movement data.' },
  nutrition:  { title: 'Nutrition Board',       subtitle: 'Track meals, macros, and hydration.' },
  analytics:  { title: 'Performance Analytics', subtitle: 'Understand patterns and progress.' },
  goals:      { title: 'Goal Roadmap',          subtitle: 'Set milestones and stay on track.' },
  profile:    { title: 'Athlete Profile',       subtitle: 'Identity, badges, and preferences.' },
  settings:   { title: 'Settings',              subtitle: 'Preferences, privacy, and account.' },
};

const mobileNav = [
  { id: 'dashboard', label: 'Home',  icon: House },
  { id: 'workouts',  label: 'Train', icon: Dumbbell },
  { id: 'activity',  label: 'Moves', icon: Activity },
  { id: 'nutrition', label: 'Fuel',  icon: Salad },
  { id: 'analytics', label: 'Stats', icon: BarChart3 },
  { id: 'goals',     label: 'Goals', icon: Goal },
  { id: 'profile',   label: 'Me',    icon: CircleUserRound },
];

export default function Layout({ children }) {
  const { currentPage, navigate } = useApp();
  const [aiOpen, setAiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const meta = pageMeta[currentPage] || pageMeta.dashboard;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fp-app-bg min-h-screen p-2 md:p-4">
      <div
        className="fp-shell mx-auto flex w-full max-w-[1360px] gap-2 p-2 md:gap-3 md:p-3"
        style={{ minHeight: 'calc(100vh - 16px)' }}
      >
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="fp-surface flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar title={meta.title} subtitle={meta.subtitle} />

          <main
            id="app-main"
            className="no-scrollbar flex-1 overflow-y-auto px-3 pb-28 pt-4 md:px-6 md:pb-6 md:pt-5"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-2 mb-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]/95 shadow-[0_-4px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <nav
            className="flex items-stretch px-1 pt-1.5 pb-1"
            aria-label="Primary mobile navigation"
          >
            {mobileNav.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`fp-nav-btn ${active ? 'active' : ''}`}
                  onClick={() => navigate(item.id)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`Go to ${item.label}`}
                >
                  <span className="fp-nav-icon-wrap">
                    <Icon
                      size={18}
                      strokeWidth={active ? 2.4 : 1.8}
                      style={{ transition: 'stroke-width 200ms ease' }}
                    />
                  </span>
                  <span
                    className="text-[9px] font-bold leading-none"
                    style={{ transition: 'color 200ms ease', letterSpacing: '0.02em' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      {/* AIAssistant Floating Button */}
      <button
        type="button"
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-white shadow-[0_8px_32px_rgba(255,107,71,0.5)] transition-transform hover:scale-110 active:scale-95"
        onClick={() => setAiOpen(!aiOpen)}
        aria-label="Toggle AI Coach"
      >
        <Sparkles size={24} strokeWidth={2} />
      </button>

      {/* AIAssistant Widget */}
      <AIAssistant isOpen={aiOpen} onClose={() => setAiOpen(false)} />

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
