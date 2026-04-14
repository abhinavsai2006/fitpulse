import { Apple, ChevronDown, ChevronUp, Droplets, Flame, Plus, Salad, Scale, Search, Sunrise, Utensils, X } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { macroData, meals, user } from '../data/mockData';

const totalCalories = meals.reduce((s, m) => s + m.totalCalories, 0);
const totalProtein = meals.reduce((s, m) => s + m.totalProtein, 0);
const totalCarbs = meals.reduce((s, m) => s + m.totalCarbs, 0);
const totalFat = meals.reduce((s, m) => s + m.totalFat, 0);

function MacroBar({ label, value, target, color }) {
  const pct = Math.min(Math.round((value / target) * 100), 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-[#555b6e]">{label}</span>
        <span style={{ color }}>{value}g<span className="text-[#3a3f52] ml-0.5">/ {target}g</span></span>
      </div>
      <div className="fp-bar-track"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} /></div>
      <p className="text-[10px] font-semibold text-[#3a3f52]">{pct}% of target</p>
    </div>
  );
}

function MealTypeIcon({ type }) {
  const p = { size: 15, strokeWidth: 2.4 };
  if (type === 'Breakfast') return <Sunrise {...p} />;
  if (type === 'Lunch') return <Salad {...p} />;
  if (type === 'Snack') return <Apple {...p} />;
  return <Utensils {...p} />;
}

const mealColors = {
  Breakfast: { color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
  Lunch: { color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
  Snack: { color: '#FF6B47', bg: 'rgba(255,107,71,0.12)' },
  Dinner: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
};

const quickFoods = [
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (100g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Whole Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: 'Greek Yogurt (170g)', calories: 100, protein: 17, carbs: 6, fat: 0.7 },
];

function QuickAddModal({ mealType, onClose, onAdd }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = quickFoods.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fp-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="fp-modal-card fp-panel w-full max-w-[420px] p-5 space-y-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Adding to {mealType}</p><h3 className="text-xl font-bold text-[#f0f0f5] font-display">Quick Add Food</h3></div>
          <button type="button" className="fp-icon-btn h-9 w-9" onClick={onClose}><X size={16} strokeWidth={2.4} /></button>
        </div>
        <label className="fp-panel flex items-center gap-2 px-3 py-2.5 rounded-xl">
          <Search size={14} strokeWidth={2.4} className="text-[#555b6e]" />
          <input className="w-full border-0 bg-transparent text-sm text-[#e8e8f0] outline-none placeholder:text-[#3a3f52]" placeholder="Search food…" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
        </label>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filtered.map((food) => (
            <button key={food.name} type="button" onClick={() => setSelected(food)} className="fp-panel w-full p-3 text-left rounded-xl transition-all" style={selected?.name === food.name ? { borderColor: 'rgba(255,107,71,0.5)', boxShadow: '0 0 0 2px rgba(255,107,71,0.15)' } : undefined}>
              <div className="flex items-center justify-between"><p className="text-sm font-bold text-[#e8e8f0]">{food.name}</p><span className="text-xs font-bold text-[#FF6B47]">{food.calories} kcal</span></div>
              <div className="mt-1 flex gap-3 text-[10px] font-semibold text-[#555b6e]"><span>P: {food.protein}g</span><span>C: {food.carbs}g</span><span>F: {food.fat}g</span></div>
            </button>
          ))}
          {filtered.length === 0 && <p className="py-8 text-center text-sm font-semibold text-[#555b6e]">No results for &quot;{search}&quot;</p>}
        </div>
        <button type="button" className="fp-primary-btn w-full" disabled={!selected} onClick={() => { onAdd(selected); onClose(); }} style={{ opacity: selected ? 1 : 0.55 }}>
          <Plus size={15} strokeWidth={2.6} />Add {selected ? `"${selected.name.split('(')[0].trim()}"` : 'Food'}
        </button>
      </div>
    </div>
  );
}

export default function Nutrition() {
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [expandedMeal, setExpandedMeal] = useState(meals[0].id);
  const [mealList, setMealList] = useState(meals);
  const [addToMeal, setAddToMeal] = useState(null);

  const goal = user.goals.dailyCalories;
  const currentCals = mealList.reduce((s, m) => s + m.totalCalories, 0);
  const remainingCals = Math.max(goal - currentCals, 0);
  const caloriePct = Math.min(Math.round((currentCals / goal) * 100), 100);
  const proteinPct = currentCals > 0 ? Math.round((totalProtein * 4 / currentCals) * 100) : 0;

  const handleQuickAdd = (mealId, food) => {
    setMealList((prev) => prev.map((meal) => {
      if (meal.id !== mealId) return meal;
      return { ...meal, items: [...meal.items, { name: food.name, calories: food.calories, protein: food.protein, carbs: food.carbs, fat: food.fat }], totalCalories: meal.totalCalories + food.calories, totalProtein: meal.totalProtein + food.protein, totalCarbs: meal.totalCarbs + food.carbs, totalFat: meal.totalFat + food.fat };
    }));
  };

  return (
    <Layout>
      {addToMeal && <QuickAddModal mealType={mealList.find((m) => m.id === addToMeal)?.type || ''} onClose={() => setAddToMeal(null)} onAdd={(food) => handleQuickAdd(addToMeal, food)} />}
      <section className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="fp-panel animate-fade-up p-5 md:p-6 rounded-[18px]">
            <div className="flex items-start justify-between gap-2 mb-1"><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Calorie Budget</p><span className={`fp-chip-${caloriePct >= 90 ? 'info' : 'success'}`}>{caloriePct}%</span></div>
            <p className="text-4xl font-bold text-[#f0f0f5] font-display">{currentCals.toLocaleString()}</p>
            <p className="text-sm font-semibold text-[#555b6e]">of {goal.toLocaleString()} kcal goal</p>
            <div className="mt-4 fp-bar-track"><div className="fp-bar-fill transition-all duration-700" style={{ width: `${caloriePct}%`, background: caloriePct > 95 ? 'linear-gradient(90deg,#FB7185,#FF6B47)' : 'linear-gradient(90deg,#34D399,#6EE7B7)' }} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[{ icon: Flame, color: '#FB7185', v: currentCals.toLocaleString(), l: 'eaten' }, { icon: Scale, color: '#8B5CF6', v: `${proteinPct}%`, l: 'protein' }, { icon: Droplets, color: '#38BDF8', v: `${waterGlasses}/10`, l: 'glasses' }].map(s => { const I = s.icon; return (
                <div key={s.l} className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3 text-center"><I size={14} className="mx-auto" style={{ color: s.color }} /><p className="mt-1 text-sm font-bold text-[#e8e8f0]">{s.v}</p><p className="text-[10px] font-semibold text-[#555b6e]">{s.l}</p></div>
              ); })}
            </div>
            <div className="mt-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between p-3.5">
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#555b6e]">Remaining budget</p><p className="mt-0.5 text-lg font-bold text-[#e8e8f0] font-display">{remainingCals.toLocaleString()} kcal left</p></div>
              {remainingCals === 0 && <span className="fp-chip-success">Goal met!</span>}
            </div>
          </article>

          <article className="fp-panel animate-fade-up stagger-1 p-5 md:p-6 rounded-[18px]">
            <h3 className="text-lg font-bold text-[#f0f0f5] font-display">Macro Tracking</h3>
            <div className="mt-4 space-y-4">
              <MacroBar label="Protein" value={totalProtein} target={macroData[0].target} color="#8B5CF6" />
              <MacroBar label="Carbs" value={totalCarbs} target={macroData[1].target} color="#38BDF8" />
              <MacroBar label="Fat" value={totalFat} target={macroData[2].target} color="#34D399" />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <svg width="72" height="72" viewBox="0 0 72 72" className="flex-shrink-0">
                {(() => { const total = totalProtein * 4 + totalCarbs * 4 + totalFat * 9; const segs = [{ pct: (totalProtein * 4 / total) * 100, c: '#8B5CF6' }, { pct: (totalCarbs * 4 / total) * 100, c: '#38BDF8' }, { pct: (totalFat * 9 / total) * 100, c: '#34D399' }]; const r = 28; const circ = 2 * Math.PI * r; let off = 0; return segs.map((seg, i) => { const d = (seg.pct / 100) * circ; const el = (<circle key={i} cx="36" cy="36" r={r} fill="none" stroke={seg.c} strokeWidth="10" strokeDasharray={`${d} ${circ - d}`} strokeDashoffset={-off} transform="rotate(-90 36 36)" style={{ transition: 'stroke-dasharray 700ms ease' }} />); off += d; return el; }); })()}
              </svg>
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" /><span className="text-[#888ea0]">Protein {totalProtein}g</span></div>
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" /><span className="text-[#888ea0]">Carbs {totalCarbs}g</span></div>
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" /><span className="text-[#888ea0]">Fat {totalFat}g</span></div>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5">
              <div className="flex items-center justify-between mb-2"><p className="text-xs font-bold uppercase tracking-wider text-[#555b6e]">Hydration</p><span className="text-xs font-bold text-[#38BDF8]">{waterGlasses} / 10 glasses</span></div>
              <div className="grid grid-cols-10 gap-1">{Array.from({ length: 10 }).map((_, idx) => (
                <button key={idx} type="button" onClick={() => setWaterGlasses(idx + 1 === waterGlasses ? idx : idx + 1)} className="h-8 rounded-lg transition-all hover:scale-110" style={{ background: idx < waterGlasses ? 'linear-gradient(180deg,#7dd3fc,#38BDF8)' : 'rgba(255,255,255,0.06)', border: idx < waterGlasses ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(255,255,255,0.04)' }} />
              ))}</div>
            </div>
          </article>
        </div>

        <article className="fp-panel animate-fade-up stagger-2 p-5 md:p-6 rounded-[18px]">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#555b6e]">Today</p><h3 className="text-lg font-bold text-[#f0f0f5] font-display">Meals</h3></div>
            <button type="button" className="fp-primary-btn px-3 py-2 text-xs" onClick={() => setAddToMeal(mealList[0].id)}><Plus size={13} strokeWidth={2.7} />Add Food</button>
          </div>
          <div className="space-y-2.5">{mealList.map((meal) => { const mc = mealColors[meal.type] || mealColors.Dinner; const isOpen = expandedMeal === meal.id; return (
            <div key={meal.id} className="fp-panel overflow-hidden rounded-xl transition-all" style={isOpen ? { borderColor: `${mc.color}30` } : undefined}>
              <button type="button" onClick={() => setExpandedMeal(isOpen ? null : meal.id)} className="flex w-full items-center justify-between p-3.5 text-left">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0" style={{ background: mc.bg, color: mc.color }}><MealTypeIcon type={meal.type} /></span><span><span className="block text-sm font-bold text-[#e8e8f0]">{meal.type}</span><span className="text-xs font-semibold text-[#555b6e]">{meal.time} · {meal.items.length} items</span></span></div>
                <div className="flex items-center gap-3"><span className="text-sm font-bold text-[#e8e8f0]">{meal.totalCalories} kcal</span>{isOpen ? <ChevronUp size={15} className="text-[#555b6e]" /> : <ChevronDown size={15} className="text-[#555b6e]" />}</div>
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.06] px-3.5 pb-3.5 pt-3">
                  <div className="space-y-2">{meal.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 text-xs"><span className="truncate font-semibold text-[#888ea0]">{item.name}</span><div className="flex items-center gap-3 flex-shrink-0 text-[#555b6e] font-semibold"><span>P:{item.protein}g</span><span className="font-bold text-[#e8e8f0]">{item.calories} kcal</span></div></div>
                  ))}</div>
                  <button type="button" className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/[0.1] py-2 text-xs font-bold text-[#555b6e] transition-colors hover:bg-white/[0.04]" onClick={() => setAddToMeal(meal.id)}>
                    <Plus size={11} strokeWidth={2.8} />Add food to {meal.type}
                  </button>
                </div>
              )}
            </div>
          ); })}</div>
        </article>
      </section>
    </Layout>
  );
}
