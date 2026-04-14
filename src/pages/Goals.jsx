import { Dumbbell, Flame, HeartPulse, Plus, Target, Trophy, TrendingDown, TrendingUp, GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { goals as initialGoals } from '../data/mockData';

const catMeta = {
  strength:    { icon: Dumbbell,   color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', label: 'Strength' },
  cardio:      { icon: HeartPulse, color: '#FF6B47', bg: 'rgba(255,107,71,0.12)', label: 'Cardio' },
  body:        { icon: Flame,      color: '#FB7185', bg: 'rgba(251,113,133,0.12)', label: 'Body' },
  consistency: { icon: Trophy,     color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', label: 'Consistency' },
};

function AddGoalModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', category: 'strength', current: '', target: '', unit: 'lbs', deadline: '' });
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose(); }; const p = document.body.style.overflow; document.body.style.overflow = 'hidden'; window.addEventListener('keydown', k); return () => { document.body.style.overflow = p; window.removeEventListener('keydown', k); }; }, [onClose]);

  const submit = (e) => { e.preventDefault(); const c = Number(form.current) || 0; const t = Number(form.target) || 1; const progress = Math.min(Math.round((c / t) * 100), 100); const meta = catMeta[form.category] || catMeta.strength; onAdd({ id: `goal-${Date.now()}`, ...form, current: c, target: t, progress, trend: 'just added', color: meta.color }); onClose(); };
  const selectedMeta = catMeta[form.category] || catMeta.strength;

  return (
    <div className="fp-modal-overlay animate-fade-in" onClick={onClose}>
      <form className="fp-modal-card fp-panel w-full max-w-[440px] p-5 space-y-4 animate-slide-up" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">New</p><h3 className="text-xl font-bold text-[#f0f0f5] font-display">Create Goal</h3></div><button type="button" className="fp-secondary-btn px-3 py-1.5 text-xs" onClick={onClose}>Cancel</button></div>
        <div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Goal Title</label><input className="fp-input" placeholder="e.g. Bench press 225 lbs" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required autoFocus /></div>
        <div><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Category</label>
          <div className="grid grid-cols-2 gap-2">{Object.entries(catMeta).map(([key, meta]) => { const Icon = meta.icon; const sel = form.category === key; return (
            <button key={key} type="button" onClick={() => setForm((p) => ({ ...p, category: key }))} className="fp-panel flex items-center gap-2 p-2.5 text-left rounded-xl transition-all" style={sel ? { background: meta.bg, borderColor: `${meta.color}30`, color: meta.color } : undefined}>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl flex-shrink-0" style={{ background: sel ? meta.color : 'rgba(255,255,255,0.06)', color: sel ? '#fff' : meta.color }}><Icon size={14} strokeWidth={2.4} /></div>
              <span className="text-xs font-bold">{meta.label}</span>
            </button>
          ); })}</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1"><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Unit</label><input className="fp-input" placeholder="lbs" value={form.unit} onChange={(e) => setForm(p => ({ ...p, unit: e.target.value }))} /></div>
          <div className="col-span-1"><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Current</label><input className="fp-input" type="number" placeholder="0" value={form.current} onChange={(e) => setForm(p => ({ ...p, current: e.target.value }))} /></div>
          <div className="col-span-1"><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Target</label><input className="fp-input" type="number" placeholder="100" value={form.target} onChange={(e) => setForm(p => ({ ...p, target: e.target.value }))} /></div>
        </div>
        <div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Target Date</label><input className="fp-input" type="date" value={form.deadline} onChange={(e) => setForm(p => ({ ...p, deadline: e.target.value }))} /></div>
        {form.current && form.target && (
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#555b6e]">Progress Preview</p>
            <div className="mt-2 fp-bar-track"><div className="h-full rounded-full transition-all" style={{ width: `${Math.min(Math.round((Number(form.current) / Number(form.target)) * 100), 100)}%`, background: selectedMeta.color }} /></div>
            <p className="mt-1 text-xs font-bold" style={{ color: selectedMeta.color }}>{Math.min(Math.round((Number(form.current) / Number(form.target)) * 100), 100)}% complete</p>
          </div>
        )}
        <button type="submit" className="fp-primary-btn w-full" style={{ opacity: form.title.trim() && form.target ? 1 : 0.6 }}><Target size={15} strokeWidth={2.4} />Save Goal</button>
      </form>
    </div>
  );
}

function GoalCard({ goal, onDragStart, onDragOver, onDrop }) {
  const meta = catMeta[goal.category] || catMeta.strength;
  const Icon = meta.icon;
  const pct = Math.min(Math.max(goal.progress, 0), 100);
  const isLower = goal.lowerIsBetter;
  const done = pct >= 100;

  return (
    <article
      draggable
      onDragStart={(e) => onDragStart(e, goal.id)}
      onDragOver={(e) => onDragOver(e, goal.id)}
      onDrop={(e) => onDrop(e, goal.id)}
      className="fp-panel overflow-hidden rounded-[18px] transition-transform hover:-translate-y-px animate-fade-up relative cursor-grab active:cursor-grabbing"
      style={done ? { borderColor: `${meta.color}30`, background: meta.bg } : undefined}
    >
      <div className="absolute top-4 right-4 text-[#3a3f52] opacity-50 hover:opacity-100"><GripVertical size={16} /></div>
      <div className="h-1" style={{ background: goal.color }} />
      <div className="p-4 pr-10">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: meta.bg, color: meta.color }}><Icon size={15} strokeWidth={2.4} /></div>
            <h3 className="truncate text-sm font-bold text-[#e8e8f0]">{goal.title}</h3>
          </div>
          {done ? <span className="fp-chip-success flex-shrink-0 text-[10px]"><Trophy size={9} strokeWidth={2.4} />Done!</span> : <span className="flex-shrink-0 text-xs font-bold" style={{ color: goal.color }}>{pct}%</span>}
        </div>
        <div className="fp-bar-track mb-2"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: goal.color }} /></div>
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#555b6e]">
          <span>{goal.current} / {goal.target} {goal.unit}</span>
          <span className="flex items-center gap-0.5">{isLower ? <TrendingDown size={10} strokeWidth={2.4} /> : <TrendingUp size={10} strokeWidth={2.4} />}{goal.trend}</span>
        </div>
        {goal.deadline && <p className="mt-1 text-[10px] font-semibold text-[#3a3f52]">Due: {goal.deadline}</p>}
      </div>
    </article>
  );
}

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const sourceIdx = goals.findIndex((g) => g.id === draggedId);
    const targetIdx = goals.findIndex((g) => g.id === targetId);
    
    if (sourceIdx < 0 || targetIdx < 0) return;

    const newGoals = [...goals];
    const [moved] = newGoals.splice(sourceIdx, 1);
    newGoals.splice(targetIdx, 0, moved);

    setGoals(newGoals);
    setDraggedId(null);
  };

  const filtered = filter === 'all' ? goals : goals.filter((g) => g.category === filter);
  const avgProgress = goals.length ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;
  const completed = goals.filter((g) => g.progress >= 100).length;

  return (
    <Layout>
      {showAdd && <AddGoalModal onClose={() => setShowAdd(false)} onAdd={(goal) => setGoals((prev) => [goal, ...prev])} />}
      <section className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ label: 'Active Goals', value: goals.length, color: '#FF6B47' }, { label: 'Completed', value: completed, color: '#34D399' }, { label: 'Avg Progress', value: `${avgProgress}%`, color: '#FBBF24' }].map((s) => (
            <article key={s.label} className="fp-panel animate-fade-up p-4 rounded-[18px]"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">{s.label}</p><p className="mt-1 text-3xl font-bold font-display" style={{ color: s.color }}>{s.value}</p></article>
          ))}
        </div>

        <article className="fp-panel animate-fade-up stagger-1 p-5 md:p-6 rounded-[18px]">
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg width="88" height="88" viewBox="0 0 88 88"><circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" /><circle cx="44" cy="44" r="36" fill="none" stroke="#FF6B47" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(avgProgress / 100) * 2 * Math.PI * 36} ${2 * Math.PI * 36}`} transform="rotate(-90 44 44)" style={{ transition: 'stroke-dasharray 700ms ease', filter: 'drop-shadow(0 0 6px rgba(255,107,71,0.4))' }} /></svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-bold text-[#f0f0f5] font-display">{avgProgress}%</span><span className="text-[9px] font-bold text-[#555b6e]">avg</span></div>
            </div>
            <div><p className="text-lg font-bold text-[#f0f0f5] font-display">Overall Progress</p><p className="mt-1 text-sm font-medium text-[#555b6e]">{completed} of {goals.length} goals completed.{completed > 0 && ' Great work!'}</p>
              <div className="mt-3 flex flex-wrap gap-2">{Object.entries(catMeta).map(([key, meta]) => { const count = goals.filter((g) => g.category === key).length; if (count === 0) return null; return (<span key={key} className="fp-pill text-[11px] px-2.5 py-1" style={{ background: meta.bg, color: meta.color, borderColor: `${meta.color}30` }}>{meta.label}: {count}</span>); })}</div>
            </div>
          </div>
        </article>

        <article className="fp-panel animate-fade-up stagger-2 p-5 md:p-6 rounded-[18px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              <button type="button" className={`fp-pill flex-shrink-0 ${filter === 'all' ? 'bg-[#FF6B47]/15 text-[#FF6B47] border-[#FF6B47]/30' : ''}`} onClick={() => setFilter('all')}>All ({goals.length})</button>
              {Object.entries(catMeta).map(([key, meta]) => { const Icon = meta.icon; const count = goals.filter((g) => g.category === key).length; if (count === 0) return null; return (
                <button key={key} type="button" className="fp-pill flex-shrink-0 transition-all" style={filter === key ? { background: meta.bg, color: meta.color, borderColor: `${meta.color}30` } : undefined} onClick={() => setFilter(key)}><Icon size={11} strokeWidth={2.4} />{meta.label}</button>
              ); })}
            </div>
            <button type="button" className="fp-primary-btn flex-shrink-0 px-3 py-2 text-xs" onClick={() => setShowAdd(true)}><Plus size={13} strokeWidth={2.6} />New Goal</button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.length > 0 ? filtered.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )) : (
              <div className="col-span-2 py-12 text-center"><Target size={36} className="mx-auto text-[#3a3f52]" strokeWidth={1.5} /><p className="mt-3 text-sm font-bold text-[#555b6e]">No {filter} goals yet</p><button type="button" className="fp-primary-btn mt-4 text-sm" onClick={() => setShowAdd(true)}><Plus size={14} strokeWidth={2.6} />Add {filter === 'all' ? 'a goal' : `a ${filter} goal`}</button></div>
            )}
          </div>
        </article>
      </section>
    </Layout>
  );
}
