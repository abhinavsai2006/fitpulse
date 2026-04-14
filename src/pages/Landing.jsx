import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Dumbbell,
  Flame,
  Goal,
  HeartPulse,
  Play,
  Shield,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

/* ─── Animated counter ────────────────────────────────────────── */
function AnimCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Feature card ────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, color, title, description, metric, metricLabel }) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#12121e] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-[#161630] hover:-translate-y-1">
      {/* Subtle corner glow on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: color }}
      />

      <div className="relative">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${color}18`, border: `1px solid ${color}25` }}
        >
          <Icon size={22} strokeWidth={2} style={{ color }} />
        </div>

        <h3 className="text-[1.05rem] font-bold text-[#f0f0f5]">{title}</h3>
        <p className="mt-2 text-[0.85rem] font-medium leading-relaxed text-[#6b7186]">
          {description}
        </p>

        {metric && (
          <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-4">
            <span className="text-lg font-bold" style={{ color }}>{metric}</span>
            <span className="text-xs font-semibold text-[#555b6e]">{metricLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Testimonial card ────────────────────────────────────────── */
function TestimonialCard({ name, role, text, avatar, color, metric }) {
  return (
    <div className="flex flex-col justify-between rounded-[22px] border border-white/[0.06] bg-[#12121e] p-6 transition-all duration-300 hover:border-white/[0.1]">
      {/* Rating */}
      <div>
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill="#FBBF24" stroke="none" />
          ))}
        </div>
        <p className="text-[0.9rem] font-medium leading-relaxed text-[#9ca0b0]">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            {avatar}
          </div>
          <div>
            <p className="text-sm font-bold text-[#e8e8f0]">{name}</p>
            <p className="text-xs font-semibold text-[#555b6e]">{role}</p>
          </div>
        </div>
        {metric && (
          <span
            className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
          >
            {metric}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Phone Preview ───────────────────────────────────────────── */
function PhonePreview() {
  const bars = [38, 62, 55, 85, 42, 90, 58];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIdx = 4; // Friday

  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* Glow */}
      <div className="absolute inset-x-4 bottom-0 h-32 rounded-full bg-[#FF6B47] opacity-[0.12] blur-[60px]" />
      <div className="absolute inset-x-12 top-8 h-32 rounded-full bg-[#8B5CF6] opacity-[0.08] blur-[60px]" />

      {/* Phone */}
      <div
        className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0c0c14] shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
        style={{ aspectRatio: '9/19.5' }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[9px] font-bold text-[#555b6e]">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="text-[8px]">●●●●</span>
            <span>100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#555b6e]">Good morning</p>
              <p className="text-sm font-bold text-[#e8e8f0]">Alex Rivera</p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] flex items-center justify-center text-xs font-bold text-white">
              AR
            </div>
          </div>

          {/* Hero stat */}
          <div className="rounded-2xl p-4 mb-3" style={{ background: 'linear-gradient(135deg, #FF6B47, #FF8A5C)' }}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">Today&apos;s Burn</p>
            <p className="text-3xl font-bold text-white leading-none">1,883</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/20">
              <div className="h-full w-[67%] rounded-full bg-white" />
            </div>
            <p className="mt-1 text-[9px] font-semibold text-white/50">67% of daily goal</p>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[
              { label: 'Steps', value: '8.4k', color: '#34D399' },
              { label: 'Active', value: '48m', color: '#FF6B47' },
              { label: 'HR', value: '72', color: '#FB7185' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[8px] font-semibold text-[#555b6e]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly bar chart */}
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#555b6e] mb-2">Weekly Activity</p>
            <div className="flex items-end gap-1 h-14">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === todayIdx
                        ? 'linear-gradient(180deg, #FF8A5C, #FF6B47)'
                        : 'rgba(255,255,255,0.08)',
                      minHeight: 4,
                      borderRadius: 4,
                    }}
                  />
                  <span className={`text-[7px] font-bold ${i === todayIdx ? 'text-[#FF6B47]' : 'text-[#3a3f52]'}`}>
                    {days[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around py-2 px-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { icon: '⌂', label: 'Home', active: true },
            { icon: '🏋', label: 'Train', active: false },
            { icon: '📊', label: 'Stats', active: false },
            { icon: '🎯', label: 'Goals', active: false },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-0.5">
              <span className="text-sm">{item.icon}</span>
              <span className={`text-[7px] font-bold ${item.active ? 'text-[#FF6B47]' : 'text-[#3a3f52]'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="absolute -right-3 top-20 fp-glass rounded-2xl px-3 py-2 animate-[fpFloat_6s_ease-in-out_infinite]">
        <div className="flex items-center gap-1.5">
          <Flame size={13} className="text-[#FF6B47]" strokeWidth={2.4} />
          <div>
            <p className="text-[9px] font-bold text-[#555b6e]">Streak</p>
            <p className="text-sm font-bold text-[#e8e8f0]">24 days</p>
          </div>
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <div className="absolute -left-5 bottom-24 fp-glass rounded-2xl px-3 py-2 animate-[fpFloat_7.2s_ease-in-out_1s_infinite]">
        <div className="flex items-center gap-1.5">
          <HeartPulse size={13} className="text-[#FB7185]" strokeWidth={2.4} />
          <div>
            <p className="text-[9px] font-bold text-[#555b6e]">Heart Rate</p>
            <p className="text-sm font-bold text-[#e8e8f0]">72 bpm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Landing Page ────────────────────────────────────────────── */
export default function Landing() {
  const { navigate } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const testimonials = [
    {
      name: 'Maya Chen',
      role: 'Marathon Runner',
      avatar: 'MC',
      text: 'FitPulse completely changed how I train. The analytics showed me I was overtraining — a mistake I\'d made for two years. My marathon time dropped by 8 minutes.',
      metric: '−8 min',
      color: '#FF6B47',
    },
    {
      name: 'Marcus Johnson',
      role: 'Powerlifter',
      avatar: 'MJ',
      text: 'The progressive overload tracking is insane. I\'ve hit 12 PRs in 3 months using the AI recommendations. This app thinks like a serious coach.',
      metric: '12 PRs',
      color: '#8B5CF6',
    },
    {
      name: 'Sofia Rodriguez',
      role: 'CrossFit Coach',
      avatar: 'SR',
      text: 'I recommend FitPulse to all my athletes. The workout builder and periodization tools are better than most professional coaching software.',
      metric: '47 athletes',
      color: '#34D399',
    },
  ];

  return (
    <div className="fp-app-bg min-h-screen overflow-x-hidden">

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08080d]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] shadow-[0_4px_16px_rgba(255,107,71,0.3)]">
              <Dumbbell size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-base font-bold text-[#f0f0f5] font-display">FitPulse</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {['Features', 'Analytics', 'Pricing'].map((item) => (
              <button
                key={item}
                type="button"
                className="text-sm font-semibold text-[#6b7186] transition-colors hover:text-[#f0f0f5]"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('auth')}
              className="hidden sm:inline-flex text-sm font-semibold text-[#888ea0] transition-colors hover:text-[#f0f0f5]"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('auth')}
              className="fp-primary-btn text-sm px-5 py-2.5"
            >
              Start Free
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 md:pt-28">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#FF6B47] opacity-[0.03] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[400px] w-[400px] rounded-full bg-[#8B5CF6] opacity-[0.04] blur-[100px]" />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 pb-20 md:grid-cols-2 md:items-center md:pb-24 lg:pb-28">
          {/* Text */}
          <div className="order-2 md:order-1 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FF6B47]">
              <Sparkles size={12} strokeWidth={2.5} />
              AI-Powered Fitness
            </div>

            <h1 className="mt-6 font-display text-[2.8rem] font-bold leading-[1.06] tracking-tight text-[#f0f0f5] sm:text-[3.5rem] lg:text-[4.2rem]">
              Train{' '}
              <span className="fp-text-gradient">Smarter.</span>
              <br />
              Track{' '}
              <span className="fp-text-gradient-green">Clearer.</span>
              <br />
              Recover{' '}
              <span className="fp-text-gradient-violet">Faster.</span>
            </h1>

            <p className="mt-6 max-w-[440px] text-base leading-relaxed text-[#6b7186] sm:text-lg">
              FitPulse unifies workouts, nutrition, analytics, and social accountability — built for athletes who mean it.
            </p>

            {/* CTA group */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('auth')}
                className="fp-primary-btn gap-2 px-7 py-4 text-[0.95rem]"
              >
                <Play size={16} strokeWidth={2.4} fill="white" />
                Get Started Free
              </button>
              <button
                type="button"
                onClick={() => navigate('auth')}
                className="fp-secondary-btn gap-2 px-6 py-4 text-[0.95rem]"
              >
                See Dashboard
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3.5">
              <div className="flex -space-x-2">
                {['#FF6B47', '#8B5CF6', '#34D399', '#FB7185'].map((c, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-[#08080d] flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: c }}
                  >
                    {['A', 'J', 'K', 'P'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#FBBF24" stroke="none" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#555b6e]">
                  Trusted by <span className="font-bold text-[#f0f0f5]">50,000+</span> athletes
                </p>
              </div>
            </div>
          </div>

          {/* Phone mock */}
          <div className="order-1 flex justify-center md:order-2 animate-fade-up stagger-2">
            <PhonePreview />
          </div>
        </div>
      </section>

      {/* ── Stats banner ─────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-0 px-5 md:grid-cols-4">
          {[
            { value: 50000, suffix: '+', label: 'Active Athletes', icon: Users, color: '#FF6B47' },
            { value: 200, suffix: '+', label: 'Workout Programs', icon: Dumbbell, color: '#8B5CF6' },
            { value: 4.9, suffix: '★', label: 'App Store Rating', icon: Star, color: '#FBBF24' },
            { value: 98, suffix: '%', label: 'Goal Completion', icon: Trophy, color: '#34D399' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-4 px-5 py-8 ${
                  i < 3 ? 'border-b md:border-b-0 md:border-r border-white/[0.06]' : ''
                }`}
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}20` }}
                >
                  <Icon size={18} strokeWidth={2.2} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#f0f0f5] font-display">
                    {Number.isInteger(s.value)
                      ? <AnimCounter end={s.value} suffix={s.suffix} />
                      : `${s.value}${s.suffix}`
                    }
                  </p>
                  <p className="text-xs font-semibold text-[#555b6e]">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:py-24">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8B5CF6]">
            <Zap size={12} strokeWidth={2.5} />
            Everything you need
          </div>
          <h2 className="mt-5 font-display text-[2.2rem] font-bold tracking-tight text-[#f0f0f5] sm:text-[2.8rem]">
            Built for athletes who{' '}
            <span className="fp-text-gradient">mean it</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-base text-[#6b7186]">
            Every feature is purpose-built to help you train harder, track smarter, and recover faster.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={BarChart3} color="#FF6B47"
            title="Performance Analytics"
            description="Strength scores, cardio zones, VO₂ max trends — all in one intelligent dashboard with 6-week progress graphs."
            metric="82" metricLabel="Strength Score"
          />
          <FeatureCard
            icon={Goal} color="#FBBF24"
            title="Goal Roadmap"
            description="Set milestones, track progress with real data, and receive AI-suggested adjustments to keep you on track."
            metric="56%" metricLabel="Avg Progress"
          />
          <FeatureCard
            icon={Dumbbell} color="#8B5CF6"
            title="Workout Library"
            description="200+ expert-designed programs across strength, cardio, HIIT, yoga, and more — with full exercise breakdowns."
            metric="200+" metricLabel="Programs"
          />
          <FeatureCard
            icon={HeartPulse} color="#FB7185"
            title="Live Heart Rate Zones"
            description="Real-time HR monitoring with zone-based training guidance to maximize fat burn and cardiovascular gains."
            metric="72 bpm" metricLabel="Resting HR"
          />
          <FeatureCard
            icon={TrendingUp} color="#34D399"
            title="Progress Trends"
            description="Visualise strength PRs, weight changes, and endurance improvements over 1-week, 1-month, and 6-month periods."
            metric="+10 lbs" metricLabel="Bench PR"
          />
          <FeatureCard
            icon={Shield} color="#38BDF8"
            title="Privacy First"
            description="Your health data stays yours. End-to-end encryption, granular sharing controls, and full data export at any time."
          />
        </div>
      </section>

      {/* ── Dashboard Preview ────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#34D399]">
              <Activity size={12} strokeWidth={2.5} />
              Live Dashboard
            </div>
            <h2 className="mt-5 font-display text-[2.2rem] font-bold tracking-tight text-[#f0f0f5] sm:text-[2.6rem]">
              Your health, at a glance
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-sm text-[#6b7186]">
              A calm, data-rich overview of your fitness day — without the noise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Flame, color: '#FF6B47', value: '1,883', unit: 'kcal', label: 'Calories', delta: '+12%', pct: 67 },
              { icon: Activity, color: '#8B5CF6', value: '8,412', unit: 'steps', label: 'Steps', delta: '84%', pct: 84 },
              { icon: Timer, color: '#34D399', value: '48', unit: 'min', label: 'Active', delta: '✓ Goal', pct: 96 },
              { icon: HeartPulse, color: '#FB7185', value: '72', unit: 'bpm', label: 'Heart Rate', delta: 'Optimal', pct: 72 },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="group rounded-[22px] border border-white/[0.06] bg-[#12121e] p-5 transition-all duration-300 hover:border-white/[0.1] hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${card.color}15`, border: `1px solid ${card.color}20` }}
                    >
                      <Icon size={18} strokeWidth={2.2} style={{ color: card.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-[#3a3f52] uppercase tracking-wide">Today</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#555b6e]">{card.label}</p>
                  <div className="mt-1 flex items-end gap-1">
                    <span className="text-2xl font-bold text-[#f0f0f5] font-display">{card.value}</span>
                    <span className="mb-0.5 text-xs font-semibold text-[#555b6e]">{card.unit}</span>
                  </div>
                  <div className="mt-3 fp-bar-track">
                    <div className="h-full rounded-full transition-all" style={{ width: `${card.pct}%`, background: card.color }} />
                  </div>
                  <p className="mt-2 text-[11px] font-bold" style={{ color: card.color }}>{card.delta}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-5 py-20 md:py-24">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FBBF24]">
            <Star size={12} strokeWidth={2.5} fill="#FBBF24" />
            What athletes say
          </div>
          <h2 className="mt-5 font-display text-[2.2rem] font-bold tracking-tight text-[#f0f0f5] sm:text-[2.6rem]">
            Loved by 50,000+ athletes
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-5 pb-20">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[32px] p-12 text-center" style={{
          background: 'linear-gradient(135deg, rgba(255,107,71,0.12), rgba(139,92,246,0.08))',
          border: '1px solid rgba(255,107,71,0.15)',
        }}>
          {/* Decorative */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#FF6B47] opacity-[0.06] blur-[60px]" />
          <div className="pointer-events-none absolute -right-8 -bottom-12 h-36 w-36 rounded-full bg-[#8B5CF6] opacity-[0.06] blur-[60px]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FF6B47]">
              <Sparkles size={12} strokeWidth={2.5} />
              Start your journey
            </div>
            <h2 className="mt-5 font-display text-[2.2rem] font-bold leading-tight tracking-tight text-[#f0f0f5] sm:text-[2.8rem]">
              Your best performance<br />starts now
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-base text-[#6b7186]">
              Join thousands of athletes already training smarter. No credit card required.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('auth')}
                className="fp-primary-btn px-8 py-4 text-[0.95rem]"
              >
                Get Started — It&apos;s Free
              </button>
              <button
                type="button"
                onClick={() => navigate('auth')}
                className="fp-secondary-btn px-7 py-4 text-[0.95rem]"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-5 py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 text-center md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C]">
              <Dumbbell size={13} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold text-[#f0f0f5] font-display">FitPulse</span>
          </div>
          <p className="text-xs font-semibold text-[#3a3f52]">
            © 2025 FitPulse · All rights reserved · Built for athletes who mean it.
          </p>
          <div className="flex gap-5 text-xs font-semibold text-[#555b6e]">
            <button type="button" className="hover:text-[#f0f0f5] transition-colors">Privacy</button>
            <button type="button" className="hover:text-[#f0f0f5] transition-colors">Terms</button>
            <button type="button" className="hover:text-[#f0f0f5] transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
