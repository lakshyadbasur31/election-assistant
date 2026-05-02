import React, { useState } from 'react';
import { Calendar, Bell, Check, Clock } from 'lucide-react';

const ElectionReminder = () => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddCalendar = () => {
    setIsAdded(true);
    // In a real app, this would use the Google Calendar API
    setTimeout(() => setIsAdded(false), 5000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="bg-neon-yellow p-10 border-8 border-hc-black shadow-[16px_16px_0px_0px_rgba(251,255,0,0.3)] flex flex-col md:flex-row items-center gap-10">
        <div className="bg-hc-black text-neon-yellow p-6 rotate-3 shadow-[8px_8px_0px_0px_#fff]">
          <Calendar size={80} strokeWidth={2.5} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-black uppercase text-hc-black italic leading-none mb-4">Never Miss Election Day</h2>
          <p className="text-hc-black font-bold text-lg max-w-xl">
            Sync the upcoming election schedule directly to your Google Calendar. Get reminders for voter registration deadlines and poll times.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={handleAddCalendar}
              disabled={isAdded}
              className={`
                flex items-center gap-3 px-8 py-5 font-black uppercase tracking-widest text-lg transition-all border-4
                ${isAdded 
                  ? 'bg-hc-black text-hc-white border-hc-black' 
                  : 'bg-hc-black text-neon-yellow border-hc-black hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] active:translate-y-0'}
              `}
            >
              {isAdded ? (
                <>
                  <Check size={28} strokeWidth={4} />
                  Added to Calendar
                </>
              ) : (
                <>
                  <Bell size={28} strokeWidth={3} />
                  Election Reminder
                </>
              )}
            </button>
            
            <div className="flex items-center gap-2 bg-hc-black/10 px-4 py-2 border-2 border-hc-black/20">
              <Clock size={20} className="text-hc-black" />
              <span className="text-xs font-black uppercase text-hc-black">Sync Frequency: Live</span>
            </div>
          </div>
        </div>
      </div>
      
      {isAdded && (
        <div className="mt-6 animate-bounce">
          <div className="bg-hc-white text-hc-black p-4 inline-block border-4 border-neon-cyan font-black uppercase text-sm italic">
            Success! Simulated Google Calendar Event Created for Nov 3, 2026
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionReminder;
