import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [days, setDays] = useState(0);
  const electionDate = new Date('2026-11-03T00:00:00');

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const difference = electionDate.getTime() - now.getTime();
      const d = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDays(d);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-hc-white text-hc-black p-6 rounded-lg border-4 border-neon-yellow shadow-[8px_8px_0px_0px_rgba(251,255,0,1)] inline-block">
      <h2 className="text-2xl font-bold uppercase tracking-tighter mb-2">Days Until Election</h2>
      <div className="text-6xl font-black tabular-nums">
        {days > 0 ? days : 0}
      </div>
      <p className="mt-2 font-bold uppercase text-sm">Make Your Voice Heard</p>
    </div>
  );
};

export default Countdown;
