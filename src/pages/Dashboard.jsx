import {
  Activity,
  ArrowRight,
  Bike,
  Dumbbell,
  Flame,
  HeartPulse,
  Moon,
  PersonStanding,
  Play,
  Timer,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProgressRing from '../components/ProgressRing';
import { useApp } from '../context/AppContext';
import { recentActivities, user, weeklyActivity, featuredWorkouts } from '../data/mockData';
import AnimNum from '../components/dashboard/AnimNum';
import LiveHeartRate from '../components/dashboard/LiveHeartRate';
import WeeklyBar from '../components/dashboard/WeeklyBar';
import QuickWorkoutCard from '../components/dashboard/QuickWorkoutCard';

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
const typeIcons = {
  strength: Dumbbell,
  cardio:   HeartPulse,
  hiit:     Zap,
  yoga:     PersonStanding,
  cycling:  Bike,
};

export default function Dashboard() {
  const { navigate, userData } = useApp();

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const calGoal = user.goals.dailyCalories;
  const calBurned = 1883;
  const calPct = Math.min(Math.round((calBurned / calGoal) * 100), 100);
  const stepGoal = user.goals.dailySteps;
  const steps = 8412;
  const stepPct = Math.min(Math.round((steps / stepGoal) * 100), 100);
  const activeMin = 48;
  const activePct = Math.min(Math.round((activeMin / 60) * 100), 100);

  const topWorkouts = featuredWorkouts.slice(0, 4);
  const recentThree = recentActivities.slice(0, 3);

  return (
    <Layout>
      <section className="space-y-5">

        {/* ── Welcome row ────────────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-3 animate-fade-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#555b6e]">{greeting}</p>
            <h2 className="text-2xl font-bold text-[#f0f0f5] font-display sm:text-3xl">{userData.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="fp-pill bg-[#FF6B47]/10 text-[#FF6B47] border-[#FF6B47]/20">
              🔥 {userData.streak}-day streak
            </span>
            <LiveHeartRate />
          </div>
        </div>

        {/* ── Hero stat card row ──────────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-3 animate-fade-up stagger-1">

          {/* Calories (hero) */}
          <div className="sm:col-span-2 rounded-[22px] p-5 md:p-6 relative overflow-hidden" style={{
            background: 'linear-gradient(145deg, rgba(255,107,71,0.12), rgba(255,107,71,0.04))',
            border: '1px solid rgba(255,107,71,0.12)',
          }}>
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#FF6B47] opacity-[0.06] blur-[40px]" />
            <div className="relative flex flex-wrap items-center gap-6">
              <ProgressRing
                progress={calPct}
                size={100}
                strokeWidth={8}
                color="#FF6B47"
                trackColor="rgba(255,255,255,0.06)"
                value={calPct}
                unit="%"
                label="burned"
                animate
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Calories Burned</p>
                <p className="mt-1 text-4xl font-bold text-[#f0f0f5] font-display leading-none">
                  <AnimNum end={calBurned} />
                </p>
                <p className="mt-1 text-sm font-semibold text-[#555b6e]">of {calGoal.toLocaleString()} kcal goal</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="fp-chip-success text-[10px]">
                    <TrendingUp size={10} strokeWidth={2.4} />
                    +12% vs last week
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini stats stacked */}
          <div className="flex flex-col gap-3">
            <div className="flex-1 fp-panel p-4 rounded-[18px]">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} strokeWidth={2.3} className="text-[#8B5CF6]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Steps</span>
              </div>
              <p className="text-2xl font-bold text-[#f0f0f5] font-display leading-none"><AnimNum end={steps} /></p>
              <div className="mt-2 fp-bar-track">
                <div className="h-full rounded-full" style={{ width: `${stepPct}%`, background: '#8B5CF6', transition: 'width 700ms ease' }} />
              </div>
              <p className="mt-1 text-[10px] font-semibold text-[#555b6e]">{stepPct}% of {stepGoal.toLocaleString()}</p>
            </div>
            <div className="flex-1 fp-panel p-4 rounded-[18px]">
              <div className="flex items-center gap-2 mb-2">
                <Timer size={14} strokeWidth={2.3} className="text-[#34D399]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Active</span>
              </div>
              <p className="text-2xl font-bold text-[#f0f0f5] font-display leading-none">{activeMin}<span className="text-sm text-[#555b6e] ml-0.5">min</span></p>
              <div className="mt-2 fp-bar-track">
                <div className="h-full rounded-full" style={{ width: `${activePct}%`, background: '#34D399', transition: 'width 700ms ease' }} />
              </div>
              <p className="mt-1 text-[10px] font-semibold text-[#555b6e]">{activePct}% of 60 min</p>
            </div>
          </div>
        </div>

        {/* ── Weekly Activity Chart ──────────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr] animate-fade-up stagger-2">
          <div className="fp-panel rounded-[18px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">This Week</p>
                <h3 className="text-base font-bold text-[#f0f0f5] font-display">Activity Overview</h3>
              </div>
              <span className="fp-pill text-[10px]">
                {weeklyActivity.reduce((s, d) => s + d.calories, 0).toLocaleString()} kcal
              </span>
            </div>
            <WeeklyBar data={weeklyActivity} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: 'Active Days', value: weeklyActivity.filter(d => d.calories > 200).length + '/7' },
                { label: 'Peak Day', value: weeklyActivity.reduce((a,b) => a.calories > b.calories ? a : b).day },
                { label: 'Avg Kcal', value: Math.round(weeklyActivity.reduce((s,d) => s + d.calories, 0) / 7) },
              ].map(s => (
                <div key={s.label} className="text-center rounded-xl bg-white/[0.03] border border-white/[0.04] p-2.5">
                  <p className="text-sm font-bold text-[#e8e8f0] font-display">{s.value}</p>
                  <p className="text-[9px] font-semibold text-[#3a3f52]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary cards */}
          <div className="flex flex-col gap-3">
            {/* Body metrics */}
            <div className="fp-panel rounded-[18px] p-4 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e] mb-3">Body Snapshot</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Weight', value: `${user.stats.weight} ${user.stats.weightUnit}`, color: '#FBBF24' },
                  { label: 'Body Fat', value: `${user.stats.bodyFat}%`, color: '#FB7185' },
                  { label: 'Resting HR', value: `${user.stats.rhr} bpm`, color: '#38BDF8' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#555b6e]">{row.label}</span>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition summary */}
            <div className="fp-panel rounded-[18px] p-4 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Utensils size={13} strokeWidth={2.3} className="text-[#FBBF24]" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Today&apos;s Nutrition</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Protein', value: '124g', color: '#8B5CF6' },
                  { label: 'Carbs', value: '198g', color: '#38BDF8' },
                  { label: 'Fat', value: '58g', color: '#34D399' },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <p className="text-sm font-bold" style={{ color: m.color }}>{m.value}</p>
                    <p className="text-[9px] font-semibold text-[#3a3f52]">{m.label}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate('nutrition')}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] py-2 text-[11px] font-bold text-[#555b6e] transition-colors hover:bg-white/[0.06] hover:text-[#888ea0]"
              >
                <Utensils size={11} strokeWidth={2.4} />
                Log a Meal
              </button>
            </div>
          </div>
        </div>

        {/* ── Quick Workouts ─────────────────────────────────── */}
        <div className="animate-fade-up stagger-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base font-bold text-[#f0f0f5]">Quick Start</h3>
            <button
              type="button"
              onClick={() => navigate('workouts')}
              className="flex items-center gap-1 text-xs font-bold text-[#FF6B47] hover:text-[#FF8A5C] transition-colors"
            >
              Browse All
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:grid sm:grid-cols-4">
            {topWorkouts.map(w => (
              <QuickWorkoutCard key={w.id} workout={w} onStart={() => navigate('workouts')} />
            ))}
          </div>
        </div>

        {/* ── Recent Activity ────────────────────────────────── */}
        <div className="fp-panel rounded-[18px] p-5 animate-fade-up stagger-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold text-[#f0f0f5]">Recent Activity</h3>
            <button
              type="button"
              onClick={() => navigate('activity')}
              className="flex items-center gap-1 text-xs font-bold text-[#FF6B47] hover:text-[#FF8A5C] transition-colors"
            >
              View All
              <ArrowRight size={13} strokeWidth={2.4} />
            </button>
          </div>
          <div className="space-y-2">
            {recentThree.map(a => {
              const Icon = typeIcons[a.type] || Activity;
              const typeColors = {
                strength: '#8B5CF6', cardio: '#FF6B47', hiit: '#FB7185', yoga: '#34D399', cycling: '#38BDF8'
              };
              const color = typeColors[a.type] || '#8B5CF6';
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 transition-colors hover:bg-white/[0.04]">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}15`, border: `1px solid ${color}20` }}
                  >
                    <Icon size={16} strokeWidth={2.2} style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#e8e8f0] truncate">{a.workout}</p>
                    <p className="text-[11px] font-semibold text-[#555b6e]">{a.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color }}>{a.duration}m</p>
                    <p className="text-[10px] font-semibold text-[#3a3f52]">{a.calories} kcal</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Motivational footer ────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 py-3 animate-fade-up stagger-5">
          <Moon size={13} strokeWidth={2} className="text-[#3a3f52]" />
          <p className="text-xs font-semibold text-[#3a3f52]">Get 7+ hours of sleep for optimal recovery</p>
        </div>

      </section>
    </Layout>
  );
}
