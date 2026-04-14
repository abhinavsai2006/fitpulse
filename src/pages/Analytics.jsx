import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from '../components/Layout';
import { heartRateData, monthlyProgress, weeklyActivity } from '../data/mockData';

const metricOptions = [
  { id: 'strength', label: 'Strength', color: '#8B5CF6' },
  { id: 'cardio', label: 'Cardio', color: '#FF6B47' },
  { id: 'weight', label: 'Weight', color: '#FBBF24' },
];

const recordRows = [
  { name: 'Bench Press', value: '205 lbs', change: '+10 lbs', up: true },
  { name: 'Back Squat', value: '285 lbs', change: '+15 lbs', up: true },
  { name: 'Deadlift', value: '335 lbs', change: '+10 lbs', up: true },
  { name: '5K Pace', value: '24:30', change: '−45s', up: false },
];

function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="fp-glass px-3 py-2 text-xs">
      <p className="font-bold text-[#555b6e]">{label}</p>
      {payload.map((entry) => (<p key={entry.dataKey} className="mt-0.5 font-bold" style={{ color: entry.color }}>{entry.value}{unit}</p>))}
    </div>
  );
}

function HeartRateZone({ label, range, color, pct }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs font-semibold mb-1">
          <span className="text-[#888ea0]">{label}</span><span className="text-[#555b6e]">{range}</span>
        </div>
        <div className="fp-bar-track"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} /></div>
      </div>
      <span className="text-xs font-bold flex-shrink-0" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function Analytics() {
  const [metric, setMetric] = useState('strength');
  const activeMetric = metricOptions.find((m) => m.id === metric) || metricOptions[0];

  const hrZones = [
    { label: 'Recovery', range: '< 100 bpm', color: '#34D399', pct: 12 },
    { label: 'Fat Burn', range: '100–140 bpm', color: '#FBBF24', pct: 28 },
    { label: 'Cardio', range: '140–170 bpm', color: '#FF6B47', pct: 42 },
    { label: 'Peak', range: '170+ bpm', color: '#FB7185', pct: 18 },
  ];

  return (
    <Layout>
      <section className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Strength Score', value: 82, change: '+6', color: '#8B5CF6', unit: '' },
            { label: 'Cardio Score', value: 75, change: '+4', color: '#FF6B47', unit: '' },
            { label: 'Recovery', value: 70, change: '=', color: '#34D399', unit: '' },
            { label: 'VO2 Max', value: 56, change: '+2', color: '#FBBF24', unit: ' ml' },
          ].map((score) => (
            <article key={score.label} className="fp-panel animate-fade-up p-4 rounded-[18px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">{score.label}</p>
              <p className="mt-1 text-3xl font-bold font-display" style={{ color: score.color }}>{score.value}<span className="text-base text-[#555b6e]">{score.unit}</span></p>
              <p className="mt-0.5 text-xs font-bold" style={{ color: score.change === '=' ? '#555b6e' : '#34D399' }}>{score.change === '=' ? 'stable this month' : `${score.change} this month`}</p>
              <div className="mt-2 fp-bar-track"><div className="h-full rounded-full" style={{ width: `${score.value}%`, background: score.color }} /></div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <article className="fp-panel animate-fade-up stagger-2 p-5 md:p-6 rounded-[18px]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">6 Weeks</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Progress Trend</h3></div>
              <div className="flex gap-2">{metricOptions.map((item) => (
                <button key={item.id} type="button" onClick={() => setMetric(item.id)} className="fp-pill transition-all" style={metric === item.id ? { background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` } : undefined}>{item.label}</button>
              ))}</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyProgress} margin={{ top: 12, right: 8, left: -24, bottom: 0 }}>
                <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={activeMetric.color} stopOpacity={0.25} /><stop offset="100%" stopColor={activeMetric.color} stopOpacity={0.02} /></linearGradient></defs>
                <XAxis dataKey="week" tick={{ fill: '#555b6e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#555b6e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey={metric} stroke={activeMetric.color} strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: activeMetric.color, strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: activeMetric.color }} />
              </AreaChart>
            </ResponsiveContainer>
          </article>

          <article className="fp-panel animate-fade-up stagger-3 p-5 md:p-6 rounded-[18px]">
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">All Time</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Personal Records</h3></div>
            <div className="space-y-2.5">{recordRows.map((record) => (
              <div key={record.name} className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between p-3.5">
                <div><p className="text-sm font-bold text-[#e8e8f0]">{record.name}</p><p className="text-[11px] font-semibold text-[#555b6e]">best set</p></div>
                <div className="text-right"><p className="text-sm font-bold text-[#e8e8f0]">{record.value}</p><p className="text-xs font-bold" style={{ color: record.up ? '#34D399' : '#FBBF24' }}>{record.change}</p></div>
              </div>
            ))}</div>
          </article>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="fp-panel animate-fade-up stagger-4 p-5 md:p-6 rounded-[18px]">
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">This Week</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Daily Volume</h3></div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fill: '#555b6e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#555b6e', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip unit=" kcal" />} />
                <Bar dataKey="calories" radius={[6, 6, 0, 0]}>{weeklyActivity.map((_, index) => (<Cell key={`bar-${index}`} fill={index === 3 ? '#FF6B47' : 'rgba(255,255,255,0.06)'} />))}</Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 grid grid-cols-3 gap-2">{[
              { label: 'Peak Day', value: weeklyActivity.reduce((a,b) => a.calories > b.calories ? a : b).day },
              { label: 'Total Kcal', value: weeklyActivity.reduce((s,d) => s + d.calories, 0).toLocaleString() },
              { label: 'Active Days', value: weeklyActivity.filter(d => d.calories > 200).length + '/7' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-2 text-center"><p className="text-sm font-bold text-[#e8e8f0] font-display">{s.value}</p><p className="text-[10px] font-semibold text-[#3a3f52]">{s.label}</p></div>
            ))}</div>
          </article>

          <article className="fp-panel animate-fade-up stagger-5 p-5 md:p-6 rounded-[18px]">
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Last Session</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Heart Rate</h3></div>
            <ResponsiveContainer width="100%" height={110}>
              <LineChart data={heartRateData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <defs><linearGradient id="hrGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8B5CF6" /><stop offset="50%" stopColor="#FB7185" /><stop offset="100%" stopColor="#FBBF24" /></linearGradient></defs>
                <XAxis dataKey="time" tick={{ fill: '#555b6e', fontSize: 9 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fill: '#555b6e', fontSize: 9 }} axisLine={false} tickLine={false} domain={[60, 180]} />
                <Tooltip content={<ChartTooltip unit=" bpm" />} />
                <Line type="monotone" dataKey="bpm" stroke="url(#hrGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#FB7185' }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2.5"><p className="text-xs font-bold uppercase tracking-wider text-[#555b6e]">Time in Zones</p>
              {hrZones.map((zone) => (<HeartRateZone key={zone.label} {...zone} />))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
