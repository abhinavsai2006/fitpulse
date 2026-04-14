import { useEffect, useState } from 'react';
import { HeartPulse } from 'lucide-react';

export default function LiveHeartRate() {
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => setBpm(70 + Math.floor(Math.random() * 6)), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <HeartPulse
        size={15}
        strokeWidth={2.4}
        className="text-[#FB7185] animate-[fpShimmer_1.6s_ease-in-out_infinite]"
      />
      <span className="text-lg font-bold tabular-nums text-[#f0f0f5] font-display">{bpm}</span>
      <span className="text-xs font-semibold text-[#555b6e]">bpm</span>
    </div>
  );
}
