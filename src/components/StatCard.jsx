import { useState, useEffect } from 'react';

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) { setDisplay(value); return; }
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{typeof display === 'number' ? display.toLocaleString() : display}</span>;
}

export default function StatCard({
  label, value, unit, change, changePositive, icon, color = '#FF6B47', sparkline, large, animate = true,
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className={`fp-panel ${large ? 'col-span-2' : ''} relative overflow-hidden p-5 rounded-[18px]`}>
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `${color}30` }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#555b6e]">{label}</p>
          {icon && (
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg"
              style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className={`leading-none text-[#f0f0f5] font-display ${large ? 'text-4xl' : 'text-3xl'}`} style={{ fontWeight: 700 }}>
            {animate && visible ? <AnimatedNumber value={value} /> : value}
          </span>
          {unit && <span className="mb-0.5 text-sm text-[#555b6e]">{unit}</span>}
        </div>
        {change && (
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: changePositive !== false ? '#34D399' : '#FB7185' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                {changePositive !== false ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
              </svg>
              {change}
            </span>
            <span className="text-xs text-[#555b6e]">vs last week</span>
          </div>
        )}
        {sparkline && (
          <div className="mt-3 flex items-end gap-0.5 h-8">
            {sparkline.map((v, i) => (
              <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: `${(v / Math.max(...sparkline)) * 100}%`,
                  background: i === sparkline.length - 1 ? color : `${color}30`,
                  minHeight: '4px',
                }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
