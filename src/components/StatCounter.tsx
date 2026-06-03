'use client';

import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export function StatCounter({ target, suffix = '', prefix = '', label, duration = 2000, className = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-none">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-white/60 text-sm font-medium mt-2">{label}</p>
    </div>
  );
}
