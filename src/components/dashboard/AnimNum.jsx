import { useEffect, useState } from 'react';

export default function AnimNum({ end, duration = 900 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{val.toLocaleString()}</span>;
}
