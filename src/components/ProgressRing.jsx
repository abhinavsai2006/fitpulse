import { useEffect, useState } from 'react';

export default function ProgressRing({
  progress = 0,
  size = 80,
  strokeWidth = 6,
  color = '#FF6B47',
  trackColor = 'rgba(255,255,255,0.06)',
  label,
  value,
  unit,
  animate = true,
}) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (currentProgress / 100) * circumference;

  useEffect(() => {
    if (!animate) { setCurrentProgress(progress); return; }
    const timer = setTimeout(() => setCurrentProgress(progress), 200);
    return () => clearTimeout(timer);
  }, [progress, animate]);

  return (
    <div className="relative inline-flex flex-shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{
            transition: animate ? 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none',
            filter: `drop-shadow(0 0 6px ${color}55)`,
          }}
        />
      </svg>
      {(value !== undefined || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {value !== undefined && (
            <span className="leading-none text-[#f0f0f5] font-display" style={{ fontSize: size * 0.2, fontWeight: 700 }}>
              {value}
              {unit && <span style={{ fontSize: size * 0.12, color: '#555b6e' }}>{unit}</span>}
            </span>
          )}
          {label && (
            <span className="mt-0.5 leading-none text-[#555b6e]" style={{ fontSize: size * 0.11 }}>{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
