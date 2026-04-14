import { Bike, Dumbbell, HeartPulse, PersonStanding, Play, Zap } from 'lucide-react';

const typeIcons = {
  strength: Dumbbell,
  cardio:   HeartPulse,
  hiit:     Zap,
  yoga:     PersonStanding,
  cycling:  Bike,
};

export default function QuickWorkoutCard({ workout, onStart }) {
  const Icon = typeIcons[workout.category] || Dumbbell;
  return (
    <button
      type="button"
      onClick={() => onStart(workout)}
      className="group flex flex-col min-w-[160px] sm:min-w-0 sm:flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04] hover:-translate-y-0.5"
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${workout.gradient[0]}20` }}
      >
        <Icon size={17} strokeWidth={2.2} style={{ color: workout.gradient[0] }} />
      </div>
      <p className="text-sm font-bold text-[#e8e8f0] truncate">{workout.title}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-[#555b6e] truncate">
        {workout.duration}m · {workout.calories} kcal
      </p>
      <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#FF6B47] opacity-0 group-hover:opacity-100 transition-opacity">
        <Play size={10} fill="#FF6B47" strokeWidth={0} />
        Start
      </div>
    </button>
  );
}
