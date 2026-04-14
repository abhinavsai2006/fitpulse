import {
  Bike,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  PersonStanding,
  Star,
  Waves,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const categoryMeta = {
  strength:  { Icon: Dumbbell,       gradient: 'linear-gradient(145deg, #4c1d95, #7c3aed)', accent: '#a78bfa' },
  hiit:      { Icon: Zap,            gradient: 'linear-gradient(145deg, #991b1b, #ef4444)', accent: '#fca5a5' },
  cardio:    { Icon: HeartPulse,     gradient: 'linear-gradient(145deg, #9a3412, #FF6B47)', accent: '#FF8A5C' },
  yoga:      { Icon: PersonStanding, gradient: 'linear-gradient(145deg, #064e3b, #10b981)', accent: '#6ee7b7' },
  cycling:   { Icon: Bike,           gradient: 'linear-gradient(145deg, #0c4a6e, #0284c7)', accent: '#7dd3fc' },
  swimming:  { Icon: Waves,          gradient: 'linear-gradient(145deg, #134e4a, #0d9488)', accent: '#5eead4' },
};

function StarFill({ color = '#facc15', size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PlayArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function MiniSparkline({ color = 'rgba(255,255,255,0.4)' }) {
  const bars = [30, 55, 42, 78, 50, 88, 62, 45, 70, 95, 58, 74];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-[2px] h-5">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-[2px]" style={{ height: `${Math.round((h / max) * 100)}%`, background: color, opacity: 0.4 + (i / bars.length) * 0.6 }} />
      ))}
    </div>
  );
}

export default function WorkoutCard({ workout, onSelect, actionLabel = 'Start' }) {
  const { navigate } = useApp();
  const meta = categoryMeta[workout.category] || categoryMeta.strength;
  const { Icon } = meta;

  const handleCard = () => (onSelect ? onSelect(workout) : navigate('workouts'));
  const handleCta = (e) => { e.stopPropagation(); handleCard(); };

  return (
    <article
      onClick={handleCard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCard()}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#12121e] shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B47]/40"
    >
      {/* Gradient header */}
      <div className="relative flex flex-col justify-between overflow-hidden px-5 pb-5 pt-4" style={{ background: meta.gradient, minHeight: '148px' }}>
        <div className="pointer-events-none absolute -right-3 -top-2 flex items-center justify-center opacity-[0.1]" aria-hidden="true">
          <Icon size={110} strokeWidth={1.2} className="text-white" />
        </div>

        <div className="relative flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/[0.15] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-white/90">
            {workout.difficulty?.toUpperCase() || 'INTERMEDIATE'}
          </span>
          <div className="flex items-center gap-1">
            <StarFill color="#facc15" size={10} />
            <span className="text-[11px] font-bold text-white/90">{workout.rating}</span>
            <span className="text-[10px] text-white/50">({(workout.reviews / 1000).toFixed(1)}k)</span>
          </div>
        </div>

        <div className="relative mt-3">
          <MiniSparkline />
          <h3 className="mt-2 text-[1.1rem] font-extrabold leading-tight text-white">{workout.title}</h3>
          <p className="mt-0.5 text-[12px] font-semibold text-white/55">{workout.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-4 pt-4">
        <div className="flex items-center gap-4 border-b border-white/[0.06] pb-3.5">
          <div className="flex items-center gap-1.5">
            <Clock3 size={13} strokeWidth={2.2} className="text-[#555b6e]" />
            <span className="text-[13px] font-bold text-[#e8e8f0]">{workout.duration}</span>
            <span className="text-[11px] font-semibold text-[#555b6e]">min</span>
          </div>
          <div className="h-3 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-1.5">
            <Flame size={13} strokeWidth={2.2} className="text-[#555b6e]" />
            <span className="text-[13px] font-bold text-[#e8e8f0]">{workout.calories}</span>
            <span className="text-[11px] font-semibold text-[#555b6e]">kcal</span>
          </div>
          <div className="h-3 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-1.5">
            <Dumbbell size={13} strokeWidth={2.2} className="text-[#555b6e]" />
            <span className="text-[13px] font-bold text-[#e8e8f0]">{workout.exercises}</span>
            <span className="text-[11px] font-semibold text-[#555b6e]">moves</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {workout.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-[3px] text-[10px] font-semibold text-[#555b6e]">{tag}</span>
          ))}
        </div>

        <p className="mt-3 flex-1 text-[12px] font-medium leading-relaxed text-[#555b6e]">{workout.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFill key={i} size={10} color={i < Math.floor(workout.rating) ? '#facc15' : '#2a2f42'} />
              ))}
            </div>
            <span className="ml-1 text-[11px] font-semibold text-[#555b6e]">{workout.reviews.toLocaleString()}</span>
          </div>

          <button
            type="button"
            onClick={handleCta}
            aria-label={`${actionLabel} ${workout.title}`}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-bold text-white transition-all duration-200 group-hover:scale-[1.04] group-hover:shadow-lg"
            style={{ background: meta.gradient, boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }}
          >
            {actionLabel}
            <PlayArrow />
          </button>
        </div>
      </div>
    </article>
  );
}
