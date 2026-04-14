import { Bell, Camera, ChevronRight, LogOut, Settings, Shield, Star, Trophy, User } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { badges, recentActivities, user } from '../data/mockData';

const tabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const rarityMeta = {
  legendary: { label: 'Legendary', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
  epic: { label: 'Epic', color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  rare: { label: 'Rare', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
  common: { label: 'Common', color: '#555b6e', bg: 'rgba(255,255,255,0.04)' },
};

function ToggleSwitch({ enabled, onToggle, label }) {
  return (
    <button type="button" onClick={onToggle} className="fp-panel flex w-full items-center justify-between gap-3 p-3.5 text-left rounded-xl transition-colors hover:bg-white/[0.04]" aria-pressed={enabled}>
      <span className="text-sm font-semibold text-[#888ea0]">{label}</span>
      <span className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 flex-shrink-0" style={{ background: enabled ? '#FF6B47' : 'rgba(255,255,255,0.1)' }}>
        <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
    </button>
  );
}

export default function Profile() {
  const { logout } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [name, setName] = useState(user.name);
  const [preferences, setPreferences] = useState({ units: 'Imperial', weekStart: 'Monday', language: 'English', theme: 'Dark' });
  const [notifications, setNotifications] = useState({ workoutReminders: true, achievementAlerts: true, weeklySummary: true, nutritionReminders: false, friendActivity: true });

  const caloriesTotal = recentActivities.reduce((s, a) => s + a.calories, 0);
  const hoursTotal = Math.round(recentActivities.reduce((s, a) => s + a.duration, 0) / 60);
  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Layout>
      <section className="space-y-4">
        <article className="fp-panel animate-fade-up p-5 md:p-6 rounded-[18px]">
          <div className="flex flex-wrap items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-2xl font-bold text-white shadow-[0_8px_24px_rgba(255,107,71,0.3)]">{user.initials}</div>
              <button type="button" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B47] text-white shadow-md"><Camera size={12} strokeWidth={2.5} /></button>
            </div>
            <div className="min-w-0 flex-1">
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border-0 bg-transparent text-2xl font-bold text-[#f0f0f5] font-display outline-none focus:bg-white/[0.04] focus:px-2 focus:rounded-lg transition-all" />
              <p className="text-sm font-semibold text-[#555b6e] mt-0.5">{user.handle} · {user.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="fp-pill bg-[#FF6B47]/15 text-[#FF6B47] border-[#FF6B47]/20"><Star size={10} fill="#FF6B47" strokeWidth={0} />{user.level}</span>
                <span className="fp-pill">🔥 {user.streak}-day streak</span>
                <span className="fp-pill">{user.totalWorkouts} workouts</span>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[{ label: 'Sessions', value: recentActivities.length }, { label: 'Kcal Tracked', value: caloriesTotal.toLocaleString() }, { label: 'Active Hours', value: `${hoursTotal}h` }].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3 text-center"><p className="text-xl font-bold text-[#e8e8f0] font-display">{s.value}</p><p className="mt-0.5 text-[11px] font-semibold text-[#555b6e]">{s.label}</p></div>
            ))}
          </div>
        </article>

        <div className="no-scrollbar inline-flex max-w-full overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5 gap-1">
          {tabs.map((tab) => { const Icon = tab.icon; const active = tab.id === activeTab; return (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all ${active ? 'bg-[#FF6B47] text-white shadow-[0_4px_12px_rgba(255,107,71,0.3)]' : 'text-[#555b6e] hover:bg-white/[0.04]'}`}><Icon size={12} strokeWidth={2.4} />{tab.label}</button>
          ); })}
        </div>

        {activeTab === 'overview' && (
          <div className="grid gap-4 lg:grid-cols-3 animate-fade-up">
            <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#f0f0f5] font-display"><Shield size={15} strokeWidth={2.3} className="text-[#8B5CF6]" />Body Stats</h3>
              <div className="space-y-2">{[{ label: 'Weight', value: `${user.stats.weight} ${user.stats.weightUnit}` }, { label: 'Height', value: `${user.stats.height} ${user.stats.heightUnit}` }, { label: 'Body Fat', value: `${user.stats.bodyFat}%` }, { label: 'VO2 Max', value: `${user.stats.vo2Max} ml/kg/min` }, { label: 'Resting HR', value: `${user.stats.rhr} bpm` }].map((row) => (
                <div key={row.label} className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between p-3 text-sm"><span className="font-semibold text-[#555b6e]">{row.label}</span><span className="font-bold text-[#e8e8f0]">{row.value}</span></div>
              ))}</div>
            </article>
            <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#f0f0f5] font-display"><Trophy size={15} strokeWidth={2.3} className="text-[#FBBF24]" />Lifetime Activity</h3>
              <div className="space-y-2">{[{ label: 'Total Workouts', value: user.totalWorkouts }, { label: 'Current Streak', value: `${user.streak} days` }, { label: 'Longest Streak', value: '28 days' }, { label: 'Member Since', value: '2023-08-15' }].map((row) => (
                <div key={row.label} className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3"><p className="text-[11px] font-semibold text-[#555b6e]">{row.label}</p><p className="mt-0.5 text-base font-bold text-[#e8e8f0] font-display">{row.value}</p></div>
              ))}</div>
            </article>
            <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#f0f0f5] font-display"><Star size={15} strokeWidth={2.3} className="text-[#34D399]" />Daily Goals</h3>
              <div className="space-y-2">{[{ label: 'Daily Calories', value: user.goals.dailyCalories.toLocaleString(), unit: 'kcal' }, { label: 'Daily Steps', value: user.goals.dailySteps.toLocaleString(), unit: 'steps' }, { label: 'Weekly Workouts', value: user.goals.weeklyWorkouts, unit: 'sessions' }, { label: 'Target Weight', value: user.goals.targetWeight, unit: 'lbs' }].map((row) => (
                <div key={row.label} className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between p-3 text-sm"><span className="font-semibold text-[#555b6e]">{row.label}</span><span className="font-bold text-[#e8e8f0]">{row.value}<span className="ml-0.5 text-[10px] text-[#555b6e]">{row.unit}</span></span></div>
              ))}</div>
            </article>
          </div>
        )}

        {activeTab === 'achievements' && (
          <article className="fp-panel animate-fade-up p-5 md:p-6 rounded-[18px]">
            <div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">{badges.filter((b) => b.earned).length} of {badges.length} unlocked</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Badge Shelf</h3><div className="mt-2 fp-bar-track"><div className="fp-bar-fill" style={{ width: `${Math.round((badges.filter((b) => b.earned).length / badges.length) * 100)}%` }} /></div></div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">{badges.map((badge) => { const rarity = rarityMeta[badge.rarity] || rarityMeta.common; return (
              <div key={badge.id} className="fp-panel p-4 text-center rounded-xl transition-transform hover:-translate-y-0.5" style={{ opacity: badge.earned ? 1 : 0.3, filter: badge.earned ? 'none' : 'grayscale(100%)', borderColor: badge.earned ? `${rarity.color}25` : undefined, background: badge.earned ? rarity.bg : undefined }}>
                <p className="text-4xl">{badge.icon}</p><p className="mt-2 text-xs font-bold text-[#e8e8f0]">{badge.name}</p><p className="text-[10px] font-semibold text-[#555b6e] mt-0.5">{badge.description}</p>
                <span className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: rarity.bg, color: rarity.color }}>{rarity.label}</span>
              </div>
            ); })}</div>
          </article>
        )}

        {activeTab === 'settings' && (
          <div className="grid gap-4 lg:grid-cols-2 animate-fade-up">
            <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 text-base font-bold text-[#f0f0f5] font-display">Preferences</h3>
              <div className="space-y-2">{[{ label: 'Units', key: 'units', opts: ['Imperial', 'Metric'] }, { label: 'Language', key: 'language', opts: ['English', 'Spanish', 'French'] }, { label: 'Week starts', key: 'weekStart', opts: ['Monday', 'Sunday'] }, { label: 'Theme', key: 'theme', opts: ['Dark', 'Light', 'System'] }].map((row) => (
                <label key={row.key} className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-3 p-3.5"><span className="text-sm font-semibold text-[#555b6e]">{row.label}</span>
                  <select className="rounded-lg border border-white/[0.08] bg-[#16162a] px-2.5 py-1.5 text-xs font-bold text-[#FF6B47] outline-none" value={preferences[row.key]} onChange={(e) => setPreferences((prev) => ({ ...prev, [row.key]: e.target.value }))}>{row.opts.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}</select>
                </label>
              ))}</div>
            </article>
            <div className="space-y-4">
              <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#f0f0f5] font-display"><Bell size={14} strokeWidth={2.4} className="text-[#FF6B47]" />Notifications</h3>
                <div className="space-y-2">{[{ key: 'workoutReminders', label: 'Workout reminders' }, { key: 'achievementAlerts', label: 'Achievement alerts' }, { key: 'weeklySummary', label: 'Weekly summary' }, { key: 'nutritionReminders', label: 'Nutrition reminders' }, { key: 'friendActivity', label: 'Friend activity' }].map((item) => (<ToggleSwitch key={item.key} label={item.label} enabled={notifications[item.key]} onToggle={() => toggleNotif(item.key)} />))}</div>
              </article>
              <article className="fp-panel p-5 rounded-[18px]"><h3 className="mb-3 text-base font-bold text-[#f0f0f5] font-display">Account</h3>
                <div className="space-y-2">
                  <button type="button" className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex w-full items-center justify-between p-3.5 text-sm font-semibold text-[#555b6e] hover:bg-white/[0.04]"><span>Privacy Settings</span><ChevronRight size={14} strokeWidth={2.4} /></button>
                  <button type="button" className="rounded-xl bg-white/[0.02] border border-white/[0.04] flex w-full items-center justify-between p-3.5 text-sm font-semibold text-[#555b6e] hover:bg-white/[0.04]"><span>Export My Data</span><ChevronRight size={14} strokeWidth={2.4} /></button>
                  <button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-xl border border-[#FB7185]/20 bg-[#FB7185]/10 p-3.5 text-sm font-bold text-[#FB7185] transition-colors hover:bg-[#FB7185]/15"><LogOut size={15} strokeWidth={2.4} />Sign Out</button>
                </div>
              </article>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
