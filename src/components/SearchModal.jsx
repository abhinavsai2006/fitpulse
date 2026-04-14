import { useState, useEffect } from 'react';
import { Search, Calculator, User, Activity, X, Dumbbell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { featuredWorkouts } from '../data/mockData';

export default function SearchModal({ isOpen, onClose }) {
  const { navigate } = useApp();
  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K mapping is in Layout, but we can also handle Escape here
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'My Profile', icon: User, path: 'profile' },
    { label: 'Activity Log', icon: Activity, path: 'activity' },
    { label: 'Calculate Macros', icon: Calculator, path: 'nutrition' },
  ];

  const results = featuredWorkouts.filter((w) =>
    w.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 animate-fade-in bg-[#08080d]/80 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-[560px] bg-[#16162a] border border-white/[0.08] rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-slide-up">
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-white/[0.06]">
          <Search size={20} className="text-[#888ea0]" aria-hidden="true" />
          <input
            id="search-modal-title"
            autoFocus
            type="text"
            className="flex-1 bg-transparent border-none text-base text-[#f0f0f5] px-4 focus:outline-none placeholder:text-[#555b6e]"
            placeholder="Search workouts, meals, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
          />
          <button onClick={onClose} className="text-[#555b6e] hover:text-[#f0f0f5] bg-white/[0.04] p-1 rounded-md text-[10px] uppercase font-bold tracking-wider" aria-label="Close search">
            Esc
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar pb-2">
          {!query && (
            <div className="p-4 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Quick Actions</p>
              <div className="grid grid-cols-1 gap-1">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-left"
                    onClick={() => {
                      navigate(link.path);
                      onClose();
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#e8e8f0]">
                      <link.icon size={16} />
                    </div>
                    <span className="text-sm font-semibold text-[#f0f0f5]">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e] mb-2">Workouts</p>
              {results.map((w) => (
                <button
                  key={w.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-left"
                  onClick={() => {
                    navigate('workouts');
                    onClose();
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: w.gradient[0] }}>
                    <Dumbbell size={16} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-[#f0f0f5]">{w.title}</span>
                    <span className="block text-xs text-[#555b6e]">{w.duration} min • {w.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm font-bold text-[#888ea0]">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#555b6e] mt-1">Try searching for a workout like &quot;Strength&quot; or &quot;Yoga&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
