'use client';

import { useEffect, useState } from 'react';

interface Sakura {
  id: number;
  left: number;
  delay: number;
  size: number;
  rotation: number;
}

export default function SakuraEffect() {
  const [sakuras, setSakuras] = useState<Sakura[]>([]);

  useEffect(() => {
    const createSakura = () => {
      const newSakura: Sakura = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
      };
      setSakuras((prev) => [...prev, newSakura]);
      setTimeout(() => {
        setSakuras((prev) => prev.filter((s) => s.id !== newSakura.id));
      }, 10000);
    };

    const interval = setInterval(createSakura, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tw-fixed tw-inset-0 tw-pointer-events-none tw-z-50">
      {sakuras.map((sakura) => (
        <div
          key={sakura.id}
          className="tw-absolute tw-animate-sakura-fall"
          style={{
            left: `${sakura.left}%`,
            animationDelay: `${sakura.delay}s`,
            transform: `rotate(${sakura.rotation}deg)`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
