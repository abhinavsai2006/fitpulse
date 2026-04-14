import { Bell, ChevronRight, Globe, HeartPulse, Info, Lock, LogOut, Moon, Palette, Ruler, Shield, Smartphone, Sun, Trash2, User, Vibrate, Zap } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

function SectionHeading({ children }) {
  return <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#3a3f52]">{children}</p>;
}

function SettingRow({ icon: Icon, color = '#FF6B47', bg = 'rgba(255,107,71,0.12)', label, sublabel, children, onClick, danger }) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper type={onClick ? 'button' : undefined} onClick={onClick}
      className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all ${onClick ? danger ? 'cursor-pointer hover:bg-[#FB7185]/10 active:scale-[0.99]' : 'cursor-pointer hover:bg-white/[0.04] active:scale-[0.99]' : ''}`}>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: bg }}><Icon size={16} strokeWidth={2.3} style={{ color }} /></span>
      <div className="min-w-0 flex-1 text-left"><p className={`text-sm font-semibold leading-tight ${danger ? 'text-[#FB7185]' : 'text-[#e8e8f0]'}`}>{label}</p>{sublabel && <p className="mt-0.5 text-[11px] font-medium text-[#555b6e]">{sublabel}</p>}</div>
      {children ? <div className="flex-shrink-0">{children}</div> : onClick ? <ChevronRight size={15} strokeWidth={2.4} className={danger ? 'text-[#FB7185]/40' : 'text-[#3a3f52]'} /> : null}
    </Wrapper>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-[#FF6B47]' : 'bg-white/[0.1]'}`}>
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function SettingCard({ children }) {
  return <div className="fp-panel overflow-hidden rounded-xl divide-y divide-white/[0.06]">{children}</div>;
}

export default function Settings() {
  const { userData, logout, navigate } = useApp();
  const [notifs, setNotifs] = useState({ workoutReminders: true, goalMilestones: true, weeklyReport: false, friendActivity: true, marketing: false });
  const [prefs, setPrefs] = useState({ theme: 'dark', units: 'imperial', language: 'English', haptics: true, autoStart: false });

  const toggleNotif = (key) => setNotifs((p) => ({ ...p, [key]: !p[key] }));
  const togglePref = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const themeOptions = [{ id: 'light', label: 'Light', icon: Sun }, { id: 'dark', label: 'Dark', icon: Moon }, { id: 'system', label: 'System', icon: Smartphone }];
  const unitOptions = [{ id: 'imperial', label: 'Imperial (lbs, mi)' }, { id: 'metric', label: 'Metric (kg, km)' }];

  return (
    <Layout>
      <div className="mx-auto max-w-[640px] space-y-5 animate-fade-up">
        <div className="fp-panel p-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.04] transition-all rounded-xl" onClick={() => navigate('profile')} role="button" tabIndex={0}>
          <div className="relative flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] text-xl font-bold text-white shadow-[0_8px_20px_rgba(255,107,71,0.3)]">{userData.initials}</div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#34D399] shadow-sm"><span className="text-[9px] font-bold text-white">✓</span></span>
          </div>
          <div className="flex-1 min-w-0"><p className="text-base font-bold text-[#e8e8f0] truncate">{userData.name}</p><p className="text-xs font-semibold text-[#555b6e]">{userData.email}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#FF6B47]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#FF6B47]"><Zap size={9} strokeWidth={2.5} />{userData.level}</span>
          </div>
          <ChevronRight size={18} strokeWidth={2.2} className="text-[#3a3f52] flex-shrink-0" />
        </div>

        <div><SectionHeading>Account</SectionHeading>
          <SettingCard>
            <SettingRow icon={User} color="#8B5CF6" bg="rgba(139,92,246,0.12)" label="Edit Profile" sublabel="Name, photo, bio" onClick={() => navigate('profile')} />
            <SettingRow icon={Lock} color="#FF6B47" bg="rgba(255,107,71,0.12)" label="Password & Security" sublabel="Change password, 2FA" onClick={() => {}} />
            <SettingRow icon={HeartPulse} color="#FB7185" bg="rgba(251,113,133,0.12)" label="Health Data" sublabel="Connect Apple Health, Fitbit" onClick={() => {}} />
            <SettingRow icon={Globe} color="#38BDF8" bg="rgba(56,189,248,0.12)" label="Connected Apps" sublabel="Strava, Garmin, Google Fit" onClick={() => {}} />
          </SettingCard>
        </div>

        <div><SectionHeading>Notifications</SectionHeading>
          <SettingCard>
            <SettingRow icon={Bell} color="#FBBF24" bg="rgba(251,191,36,0.12)" label="Workout Reminders" sublabel="Daily session alerts"><Toggle checked={notifs.workoutReminders} onChange={() => toggleNotif('workoutReminders')} label="Workout Reminders" /></SettingRow>
            <SettingRow icon={Zap} color="#8B5CF6" bg="rgba(139,92,246,0.12)" label="Goal Milestones" sublabel="When you hit a target"><Toggle checked={notifs.goalMilestones} onChange={() => toggleNotif('goalMilestones')} label="Goal Milestones" /></SettingRow>
            <SettingRow icon={Info} color="#34D399" bg="rgba(52,211,153,0.12)" label="Weekly Progress Report" sublabel="Every Sunday evening"><Toggle checked={notifs.weeklyReport} onChange={() => toggleNotif('weeklyReport')} label="Weekly Report" /></SettingRow>
            <SettingRow icon={Vibrate} color="#38BDF8" bg="rgba(56,189,248,0.12)" label="Friend Activity" sublabel="When friends complete workouts"><Toggle checked={notifs.friendActivity} onChange={() => toggleNotif('friendActivity')} label="Friend Activity" /></SettingRow>
            <SettingRow icon={Bell} color="#555b6e" bg="rgba(255,255,255,0.04)" label="Marketing & Tips" sublabel="New features, offers"><Toggle checked={notifs.marketing} onChange={() => toggleNotif('marketing')} label="Marketing" /></SettingRow>
          </SettingCard>
        </div>

        <div><SectionHeading>App Preferences</SectionHeading>
          <div className="fp-panel overflow-hidden rounded-xl mb-3">
            <div className="px-4 py-3.5 flex items-center gap-3.5"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/12"><Palette size={16} strokeWidth={2.3} className="text-[#8B5CF6]" /></span><div className="flex-1"><p className="text-sm font-semibold text-[#e8e8f0]">Theme</p></div></div>
            <div className="px-4 pb-4 grid grid-cols-3 gap-2">{themeOptions.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setPrefs((p) => ({ ...p, theme: id }))} className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-xs font-bold transition-all ${prefs.theme === id ? 'border-[#FF6B47] bg-[#FF6B47]/10 text-[#FF6B47]' : 'border-white/[0.06] bg-white/[0.02] text-[#555b6e] hover:border-white/[0.1]'}`}><Icon size={18} strokeWidth={2.2} />{label}</button>
            ))}</div>
          </div>
          <div className="fp-panel overflow-hidden rounded-xl mb-3">
            <div className="px-4 py-3.5 flex items-center gap-3.5"><span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF6B47]/12"><Ruler size={16} strokeWidth={2.3} className="text-[#FF6B47]" /></span><div className="flex-1"><p className="text-sm font-semibold text-[#e8e8f0]">Units of Measurement</p></div></div>
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">{unitOptions.map(({ id, label }) => (
              <button key={id} type="button" onClick={() => setPrefs((p) => ({ ...p, units: id }))} className={`rounded-xl border-2 py-2.5 text-xs font-bold transition-all ${prefs.units === id ? 'border-[#FF6B47] bg-[#FF6B47]/10 text-[#FF6B47]' : 'border-white/[0.06] bg-white/[0.02] text-[#555b6e] hover:border-white/[0.1]'}`}>{label}</button>
            ))}</div>
          </div>
          <SettingCard>
            <SettingRow icon={Vibrate} color="#38BDF8" bg="rgba(56,189,248,0.12)" label="Haptic Feedback" sublabel="Vibrations on interaction"><Toggle checked={prefs.haptics} onChange={() => togglePref('haptics')} label="Haptics" /></SettingRow>
            <SettingRow icon={Zap} color="#FBBF24" bg="rgba(251,191,36,0.12)" label="Auto-start Timer" sublabel="Timer starts when workout begins"><Toggle checked={prefs.autoStart} onChange={() => togglePref('autoStart')} label="Auto-start" /></SettingRow>
          </SettingCard>
        </div>

        <div><SectionHeading>Privacy &amp; Data</SectionHeading>
          <SettingCard>
            <SettingRow icon={Shield} color="#34D399" bg="rgba(52,211,153,0.12)" label="Privacy Settings" sublabel="Control what data is shared" onClick={() => {}} />
            <SettingRow icon={Info} color="#38BDF8" bg="rgba(56,189,248,0.12)" label="Data Export" sublabel="Download all your fitness data" onClick={() => {}} />
            <SettingRow icon={Trash2} color="#FB7185" bg="rgba(251,113,133,0.12)" label="Delete Account" sublabel="Permanently remove your data" onClick={() => {}} danger />
          </SettingCard>
        </div>

        <div><SectionHeading>About</SectionHeading>
          <SettingCard>
            <SettingRow icon={Info} color="#555b6e" bg="rgba(255,255,255,0.04)" label="App Version" sublabel="FitPulse v2.4.1 (build 241)" />
            <SettingRow icon={Globe} color="#38BDF8" bg="rgba(56,189,248,0.12)" label="Terms of Service" onClick={() => {}} />
            <SettingRow icon={Lock} color="#8B5CF6" bg="rgba(139,92,246,0.12)" label="Privacy Policy" onClick={() => {}} />
          </SettingCard>
        </div>

        <button type="button" onClick={logout} className="fp-panel w-full flex items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold text-[#FB7185] hover:bg-[#FB7185]/10 transition-colors">
          <LogOut size={16} strokeWidth={2.4} />Sign Out
        </button>

        <p className="pb-2 text-center text-[11px] font-semibold text-[#3a3f52]">Made with ❤️ by the FitPulse team · 2025</p>
      </div>
    </Layout>
  );
}
