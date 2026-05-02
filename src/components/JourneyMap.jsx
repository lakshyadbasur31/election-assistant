import React, { useState } from 'react';
import { UserPlus, Search, Vote, BarChart3, ChevronRight, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const steps = [
  {
    id: 'registration',
    title: 'Voter Registration',
    icon: UserPlus,
    description: 'The first step is ensuring you are registered to vote. Check your status and deadlines in your state.',
    action: 'Check Registration',
  },
  {
    id: 'research',
    title: 'Research',
    icon: Search,
    description: 'Research the candidates and ballot measures. Look for non-partisan voter guides to understand the impact of your vote.',
    action: 'Find Voter Guides',
  },
  {
    id: 'voting',
    title: 'Voting',
    icon: Vote,
    description: 'Know when and where to vote. Early voting, mail-in ballots, or in-person on Election Day are all options.',
    action: 'Find Polling Place',
  },
  {
    id: 'results',
    title: 'Results',
    icon: BarChart3,
    description: 'After the polls close, stay informed on the results. Certified results may take time to finalize.',
    action: 'View Live Results',
  },
];

const JourneyMap = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-black uppercase mb-12 text-center text-neon-cyan italic">Voter Journey Map</h2>
      
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-hc-white -translate-y-1/2 hidden md:block" />
        
        <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "flex flex-col items-center group transition-all duration-300",
                  "focus:outline-none"
                )}
              >
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                  isActive ? "bg-neon-yellow border-neon-yellow text-hc-black scale-110 shadow-[0_0_20px_rgba(251,255,0,0.5)]" : 
                  isCompleted ? "bg-hc-white border-hc-white text-hc-black" : 
                  "bg-hc-black border-hc-white text-hc-white hover:border-neon-cyan hover:text-neon-cyan"
                )}>
                  <Icon size={32} strokeWidth={3} />
                </div>
                <span className={cn(
                  "mt-4 font-bold uppercase text-xs tracking-widest transition-colors",
                  isActive ? "text-neon-yellow" : "text-hc-white"
                )}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-16 bg-hc-white text-hc-black p-8 border-l-[12px] border-neon-cyan shadow-[12px_12px_0px_0px_rgba(0,251,255,1)]">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-black uppercase italic">{steps[activeStep].title}</h3>
          <span className="bg-hc-black text-hc-white px-3 py-1 text-xs font-bold uppercase tracking-tighter">
            Step {activeStep + 1} of 4
          </span>
        </div>
        <p className="text-xl leading-relaxed mb-8 font-medium">
          {steps[activeStep].description}
        </p>
        <button className="bg-hc-black text-hc-white px-8 py-4 font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-hc-black transition-colors border-2 border-hc-black">
          {steps[activeStep].action}
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
          className="p-3 border-4 border-hc-white hover:bg-neon-yellow hover:text-hc-black disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <button 
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
          className="p-3 border-4 border-hc-white hover:bg-neon-yellow hover:text-hc-black disabled:opacity-30 transition-all"
        >
          <ChevronRight size={32} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
};

export default JourneyMap;
