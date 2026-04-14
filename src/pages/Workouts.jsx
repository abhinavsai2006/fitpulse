import {
  Bike, Clock3, Dumbbell, Flame, HeartPulse, PersonStanding, Play, Search, Star, Timer, Waves, X, Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import Layout from '../components/Layout';
import { featuredWorkouts, workoutCategories } from '../data/mockData';

const categoryIcons = { strength: Dumbbell, cardio: HeartPulse, hiit: Zap, yoga: PersonStanding, cycling: Bike, swimming: Waves };

function WorkoutTimer({ workout, onStop }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const i = setInterval(() => setSeconds((s) => s + 1), 1000); return () => clearInterval(i); }, []);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = Math.min((seconds / (workout.duration * 60)) * 100, 100);

  return (
    <div className="fixed bottom-[88px] left-3 right-3 z-40 md:bottom-6 md:left-6 md:right-auto md:w-[340px] animate-slide-up">
      <div className="fp-glass p-4" style={{ background: `linear-gradient(145deg, ${workout.gradient[0]}18, rgba(18,18,30,0.95))` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="fp-live-dot" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Active</p>
              <p className="text-sm font-bold text-[#f0f0f5]">{workout.title}</p>
            </div>
          </div>
          <button type="button" className="fp-secondary-btn px-2 py-1.5 text-xs" onClick={onStop}>
            <X size={12} strokeWidth={2.6} /> End
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-[#f0f0f5] tabular-nums font-display">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          <span className="text-xs font-semibold text-[#555b6e]">{workout.duration}m goal</span>
        </div>
        <div className="fp-bar-track">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${workout.gradient[0]}, ${workout.gradient[1]})` }} />
        </div>
      </div>
    </div>
  );
}

function WorkoutModal({ workout, onClose, onStart }) {
  useEffect(() => {
    if (!workout) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKeyDown); };
  }, [workout, onClose]);
  if (!workout) return null;

  const sampleExercises = [
    { name: 'Barbell Squat', sets: '4 × 8', rest: '90s' },
    { name: 'Romanian Deadlift', sets: '3 × 10', rest: '75s' },
    { name: 'Leg Press', sets: '3 × 12', rest: '60s' },
    { name: 'Leg Curl', sets: '3 × 12', rest: '60s' },
    { name: 'Calf Raises', sets: '4 × 15', rest: '45s' },
  ].slice(0, workout.exercises > 5 ? 5 : workout.exercises);

  return (
    <div className="fp-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="fp-modal-card fp-panel w-full max-w-[500px] animate-slide-up" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 text-white relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${workout.gradient[0]}, ${workout.gradient[1]})` }}>
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <button type="button" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white" onClick={onClose}><X size={15} strokeWidth={2.5} /></button>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">Session Ready</p>
          <h3 className="mt-1 text-2xl font-bold">{workout.title}</h3>
          <p className="mt-0.5 text-sm font-medium text-white/80">{workout.subtitle}</p>
          <div className="mt-3 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} fill={i < Math.floor(workout.rating) ? '#fff' : 'transparent'} stroke="#fff" strokeWidth={1.5} />))}
            <span className="ml-1 text-xs font-bold text-white/90">{workout.rating}</span>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[{ icon: Clock3, label: 'Duration', v: `${workout.duration} min` }, { icon: Flame, label: 'Calories', v: `${workout.calories} kcal` }, { icon: Dumbbell, label: 'Exercises', v: `${workout.exercises} moves` }].map((s) => { const I = s.icon; return (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                <I size={14} className="mx-auto text-[#FF6B47]" strokeWidth={2.4} />
                <p className="mt-1 text-sm font-bold text-[#e8e8f0]">{s.v}</p>
                <p className="text-[10px] font-semibold text-[#555b6e]">{s.label}</p>
              </div>
            ); })}
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
            <p className="text-xs font-medium leading-relaxed text-[#555b6e]">{workout.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {workout.tags.map((tag) => (<span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-[#555b6e]">{tag}</span>))}
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#555b6e]">Exercise Breakdown</p>
            <div className="space-y-1.5">
              {sampleExercises.map((ex, i) => (
                <div key={ex.name} className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3 px-3 py-2.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B47] text-[10px] font-bold text-white">{i + 1}</span>
                  <span className="flex-1 text-sm font-semibold text-[#e8e8f0]">{ex.name}</span>
                  <span className="text-xs font-bold text-[#FF6B47]">{ex.sets}</span>
                  <span className="text-[10px] font-semibold text-[#555b6e]">{ex.rest}</span>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="fp-primary-btn w-full" style={{ background: `linear-gradient(145deg, ${workout.gradient[0]}, ${workout.gradient[1]})`, boxShadow: `0 12px 24px ${workout.gradient[0]}44` }} onClick={() => onStart(workout)}>
            <Play size={15} strokeWidth={2.5} /> Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Workouts() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);

  const workouts = featuredWorkouts
    .filter((w) => { const c = activeCategory === 'all' || w.category === activeCategory; const t = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || w.subtitle.toLowerCase().includes(searchQuery.toLowerCase()); return c && t; })
    .sort((a, b) => { if (sortBy === 'duration') return a.duration - b.duration; if (sortBy === 'calories') return b.calories - a.calories; if (sortBy === 'rating') return b.rating - a.rating; return b.completions - a.completions; });

  const handleStart = (w) => { setSelectedWorkout(null); setActiveWorkout(w); };

  return (
    <Layout>
      <WorkoutModal workout={selectedWorkout} onClose={() => setSelectedWorkout(null)} onStart={handleStart} />
      {activeWorkout && <WorkoutTimer workout={activeWorkout} onStop={() => setActiveWorkout(null)} />}
      <section className="space-y-4">
        {activeWorkout && (
          <div className="fp-panel flex items-center gap-3 p-4 animate-fade-up rounded-xl" style={{ borderColor: `${activeWorkout.gradient[0]}44`, background: `${activeWorkout.gradient[0]}08` }}>
            <span className="fp-live-dot" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#555b6e]">Now playing</p>
              <p className="text-sm font-bold text-[#f0f0f5] truncate">{activeWorkout.title}</p>
            </div>
            <button type="button" className="fp-secondary-btn px-3 py-1.5 text-xs" onClick={() => setActiveWorkout(null)}>End</button>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="fp-panel flex flex-1 items-center gap-2.5 px-3.5 py-3 rounded-xl transition-shadow focus-within:border-[rgba(255,107,71,0.4)] focus-within:shadow-[0_0_0_2px_rgba(255,107,71,0.16)]">
            <Search size={15} strokeWidth={2.4} className="flex-shrink-0 text-[#555b6e]" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search workouts…" className="w-full border-0 bg-transparent text-sm font-medium text-[#e8e8f0] outline-none placeholder:text-[#3a3f52]" />
            {searchQuery ? (
              <button type="button" onClick={() => setSearchQuery('')} className="flex-shrink-0 text-[#555b6e] hover:text-[#FF6B47] transition-colors"><X size={13} strokeWidth={2.4} /></button>
            ) : (
              <span className="flex-shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-[#555b6e]">{workouts.length}</span>
            )}
          </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="fp-panel h-[46px] rounded-xl border border-white/[0.06] bg-[#16162a] px-3 text-sm font-semibold text-[#888ea0] outline-none focus:border-[rgba(255,107,71,0.4)] sm:w-[190px]">
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="duration">Shortest First</option>
            <option value="calories">Highest Calories</option>
          </select>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setActiveCategory('all')}
            className={`fp-pill flex-shrink-0 transition-all ${activeCategory === 'all' ? 'bg-[#FF6B47]/15 text-[#FF6B47] border-[#FF6B47]/30' : ''}`}>
            All ({featuredWorkouts.length})
          </button>
          {workoutCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Dumbbell;
            const count = featuredWorkouts.filter((w) => w.category === cat.id).length;
            return (
              <button key={cat.id} type="button" onClick={() => setActiveCategory(cat.id)}
                className={`fp-pill flex-shrink-0 gap-1.5 transition-all ${activeCategory === cat.id ? 'bg-[#FF6B47]/15 text-[#FF6B47] border-[#FF6B47]/30' : ''}`}>
                <Icon size={12} strokeWidth={2.5} /> {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {workouts.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {workouts.map((w) => (<WorkoutCard key={w.id} workout={w} onSelect={(v) => setSelectedWorkout(v)} actionLabel={activeWorkout?.id === w.id ? 'Active ✓' : 'Start'} />))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Dumbbell size={40} className="mx-auto text-[#3a3f52]" strokeWidth={1.5} />
            <p className="mt-4 text-base font-bold text-[#555b6e]">No workouts found</p>
            <p className="mt-1 text-sm font-medium text-[#3a3f52]">Try a different search or category</p>
            <button type="button" className="fp-secondary-btn mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>Clear filters</button>
          </div>
        )}
      </section>
    </Layout>
  );
}
