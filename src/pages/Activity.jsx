import { Bike, Dumbbell, Filter, Flame, HeartPulse, PersonStanding, Plus, Timer, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { recentActivities } from '../data/mockData';

const typeMeta = {
  strength: { icon: Dumbbell, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', label: 'Strength' },
  cardio: { icon: HeartPulse, color: '#FF6B47', bg: 'rgba(255,107,71,0.12)', label: 'Cardio' },
  hiit: { icon: Zap, color: '#FB7185', bg: 'rgba(251,113,133,0.12)', label: 'HIIT' },
  yoga: { icon: PersonStanding, color: '#34D399', bg: 'rgba(52,211,153,0.12)', label: 'Yoga' },
  cycling: { icon: Bike, color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', label: 'Cycling' },
};

const feelingEmoji = ['', '😔', '😐', '🙂', '😊', '🔥'];

function LogActivityModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ type: 'strength', name: '', duration: '', calories: '', feeling: '4', notes: '' });
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose(); }; const p = document.body.style.overflow; document.body.style.overflow = 'hidden'; window.addEventListener('keydown', k); return () => { document.body.style.overflow = p; window.removeEventListener('keydown', k); }; }, [onClose]);

  const submit = (e) => { e.preventDefault(); if (!form.name.trim()) return; onCreate(form); onClose(); };
  const selectedType = typeMeta[form.type] || typeMeta.strength;

  return (
    <div className="fp-modal-overlay animate-fade-in" onClick={onClose}>
      <form className="fp-modal-card fp-panel w-full max-w-[440px] p-5 space-y-4 animate-slide-up" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">New Entry</p><h3 className="text-xl font-bold text-[#f0f0f5] font-display">Log Activity</h3></div>
          <button type="button" className="fp-secondary-btn px-3 py-1.5 text-xs" onClick={onClose}>Cancel</button>
        </div>
        <div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Workout Name</label><input className="fp-input" placeholder="e.g. Morning Run" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required autoFocus /></div>
        <div><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Type</label>
          <div className="flex flex-wrap gap-2">{Object.entries(typeMeta).map(([key, meta]) => { const Icon = meta.icon; const sel = form.type === key; return (<button key={key} type="button" onClick={() => setForm((p) => ({ ...p, type: key }))} className="fp-pill gap-1.5 transition-all" style={sel ? { background: meta.bg, color: meta.color, border: `1.5px solid ${meta.color}44` } : undefined}><Icon size={12} strokeWidth={2.5} />{meta.label}</button>); })}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Duration (min)</label><input className="fp-input" type="number" min="1" placeholder="45" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} /></div>
          <div><label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Calories</label><input className="fp-input" type="number" min="0" placeholder="380" value={form.calories} onChange={(e) => setForm((p) => ({ ...p, calories: e.target.value }))} /></div>
        </div>
        <div><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">How did it feel? {feelingEmoji[form.feeling]}</label>
          <div className="flex gap-2">{[1,2,3,4,5].map(n => (<button key={n} type="button" onClick={() => setForm((p) => ({ ...p, feeling: String(n) }))} className="flex-1 rounded-xl py-2 text-lg transition-all" style={{ background: String(n) === form.feeling ? selectedType.bg : 'rgba(255,255,255,0.04)', transform: String(n) === form.feeling ? 'scale(1.12)' : 'scale(1)' }}>{feelingEmoji[n]}</button>))}</div>
        </div>
        <button type="submit" className="fp-primary-btn w-full" style={{ opacity: form.name.trim() ? 1 : 0.6 }}><Plus size={15} strokeWidth={2.6} />Add Session</button>
      </form>
    </div>
  );
}

function ActivityCard({ activity }) {
  const meta = typeMeta[activity.type] || { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', icon: Timer };
  const Icon = meta.icon;
  return (
    <div className="fp-panel flex items-center gap-3 p-3.5 rounded-xl transition-transform hover:-translate-y-px animate-fade-up">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}><Icon size={17} strokeWidth={2.4} /></div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#e8e8f0]">{activity.workout}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-[#555b6e]">
          <span>{activity.date}</span>
          {activity.heartRate && (<><span>·</span><span className="flex items-center gap-0.5 text-[#FB7185]"><HeartPulse size={10} strokeWidth={2.4} />{activity.heartRate.avg} avg</span></>)}
          {activity.feeling && (<><span>·</span><span>{feelingEmoji[activity.feeling]}</span></>)}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold" style={{ color: meta.color }}>{activity.duration}m</p>
        <p className="text-[11px] font-semibold text-[#555b6e]">{activity.calories} kcal</p>
      </div>
    </div>
  );
}

export default function Activity() {
  const [showLog, setShowLog] = useState(false);
  const [activities, setActivities] = useState(recentActivities);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? activities : activities.filter((item) => item.type === filter);
  const totalCalories = activities.reduce((s, i) => s + i.calories, 0);
  const totalMinutes = activities.reduce((s, i) => s + i.duration, 0);
  const avgCalories = activities.length ? Math.round(totalCalories / activities.length) : 0;

  const createActivity = (form) => {
    setActivities((prev) => [{ id: `new-${Date.now()}`, workout: form.name, type: form.type, date: new Date().toISOString().slice(0,10), duration: Number(form.duration) || 30, calories: Number(form.calories) || 250, heartRate: { avg: 140, max: 172 }, feeling: Number(form.feeling) || 4 }, ...prev]);
  };

  return (
    <Layout>
      {showLog && <LogActivityModal onClose={() => setShowLog(false)} onCreate={createActivity} />}
      <section className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ label: 'Total Sessions', value: activities.length, icon: Dumbbell, color: '#8B5CF6' },
            { label: 'Calories Burned', value: totalCalories.toLocaleString(), icon: Flame, color: '#FB7185' },
            { label: 'Active Time', value: `${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m`, icon: Timer, color: '#38BDF8' },
          ].map((s) => { const Icon = s.icon; return (
            <article key={s.label} className="fp-panel animate-fade-up p-4 rounded-[18px]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${s.color}15`, border: `1px solid ${s.color}20` }}><Icon size={17} strokeWidth={2.3} style={{ color: s.color }} /></div>
                <div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">{s.label}</p><p className="text-xl font-bold text-[#f0f0f5] font-display">{s.value}</p></div>
              </div>
            </article>
          ); })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="fp-panel p-4 animate-fade-up stagger-2 rounded-[18px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Avg per Session</p>
            <div className="mt-2 flex items-end gap-3"><div><p className="text-2xl font-bold text-[#f0f0f5] font-display">{avgCalories}</p><p className="text-xs font-semibold text-[#555b6e]">calories</p></div><div className="mb-0.5"><p className="text-lg font-bold text-[#f0f0f5] font-display">{Math.round(totalMinutes / activities.length)}m</p><p className="text-xs font-semibold text-[#555b6e]">duration</p></div></div>
          </article>
          <article className="fp-panel p-4 animate-fade-up stagger-3 rounded-[18px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Best Effort</p>
            {(() => { const best = [...activities].sort((a, b) => b.calories - a.calories)[0]; const meta = typeMeta[best.type] || { color: '#8B5CF6', icon: Timer }; const BIcon = meta.icon; return (
              <div className="mt-2 flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,${meta.color},${meta.color}aa)` }}><BIcon size={15} /></div><div><p className="text-sm font-bold text-[#e8e8f0]">{best.workout}</p><p className="text-xs font-semibold text-[#555b6e]">{best.calories} kcal · {best.duration}m</p></div></div>
            ); })()}
          </article>
        </div>

        <article className="fp-panel p-5 md:p-6 animate-fade-up stagger-4 rounded-[18px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">History</p><h3 className="text-xl font-bold text-[#f0f0f5] font-display">Activity Feed</h3></div>
            <button type="button" className="fp-primary-btn px-3 py-2 text-xs" onClick={() => setShowLog(true)}><Plus size={13} strokeWidth={2.7} />Log Activity</button>
          </div>

          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
            <button type="button" className={`fp-pill flex-shrink-0 ${filter === 'all' ? 'bg-[#FF6B47]/15 text-[#FF6B47] border-[#FF6B47]/30' : ''}`} onClick={() => setFilter('all')}><Filter size={11} strokeWidth={2.5} />All ({activities.length})</button>
            {Object.entries(typeMeta).map(([key, meta]) => { const Icon = meta.icon; const count = activities.filter((a) => a.type === key).length; if (count === 0) return null; return (
              <button key={key} type="button" className="fp-pill flex-shrink-0 capitalize transition-all" style={filter === key ? { background: meta.bg, color: meta.color, border: `1.5px solid ${meta.color}44` } : undefined} onClick={() => setFilter(key)}><Icon size={11} strokeWidth={2.5} />{meta.label} ({count})</button>
            ); })}
          </div>

          <div className="space-y-2">
            {filtered.length > 0 ? filtered.map((a) => (<ActivityCard key={a.id} activity={a} />)) : (
              <div className="py-12 text-center"><TrendingUp size={32} className="mx-auto text-[#3a3f52]" strokeWidth={1.5} /><p className="mt-3 text-sm font-bold text-[#555b6e]">No {filter} activities yet</p><p className="mt-1 text-xs font-medium text-[#3a3f52]">Log your first one above</p></div>
            )}
          </div>
        </article>
      </section>
    </Layout>
  );
}
