export default function WeeklyBar({ data }) {
  const max = Math.max(...data.map((d) => d.calories));
  const today = new Date().getDay();
  const dayMap = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex items-end gap-2" style={{ height: 80 }}>
      {data.map((day, i) => {
        const pct = Math.max((day.calories / max) * 100, 6);
        const isToday = i === (today === 0 ? 6 : today - 1);
        return (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5 group">
            <div className="relative w-full">
              <div
                className="mx-auto rounded-lg transition-all duration-500 group-hover:opacity-80"
                style={{
                  width: '100%',
                  maxWidth: 20,
                  height: `${pct}%`,
                  minHeight: 6,
                  background: isToday
                    ? 'linear-gradient(180deg, #FF8A5C, #FF6B47)'
                    : 'rgba(255,255,255,0.06)',
                  boxShadow: isToday ? '0 4px 12px rgba(255,107,71,0.3)' : 'none',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
              <div style={{ height: 80 }} />
            </div>
            <span className={`text-[10px] font-bold ${isToday ? 'text-[#FF6B47]' : 'text-[#3a3f52]'}`}>
              {dayMap[i === 6 ? 0 : i + 1]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
