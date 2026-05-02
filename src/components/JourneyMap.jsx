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
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const candidates = [
    { name: 'Alex Rivera', party: 'Progressive', stances: { Education: 'Universal Pre-K', Economy: 'Green New Deal' } },
    { name: 'Jordan Smith', party: 'Conservative', stances: { Education: 'School Choice', Economy: 'Tax Deregulation' } },
    { name: 'Casey Varma', party: 'Independent', stances: { Education: 'Vocational Focus', Economy: 'Balanced Budget' } },
  ];

  const renderStepContent = () => {
    switch (steps[activeStep].id) {
      case 'registration':
        return (
          <div className="space-y-6">
            <p className="text-xl leading-relaxed font-medium">{steps[activeStep].description}</p>
            {!registrationStatus ? (
              <button 
                onClick={() => setRegistrationStatus('Active in California')}
                className="bg-hc-black text-hc-white px-8 py-4 font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-hc-black transition-colors border-2 border-hc-black"
              >
                Check Registration Status
              </button>
            ) : (
              <div className="bg-hc-black text-hc-white p-6 border-4 border-neon-cyan">
                <p className="text-2xl font-black uppercase mb-2">Status: {registrationStatus}</p>
                <p className="font-bold mb-4 opacity-80">You are eligible to vote in the upcoming 2026 Midterms.</p>
                <a href="https://vote.gov" target="_blank" rel="noreferrer" className="text-neon-cyan font-black uppercase underline hover:text-neon-yellow">
                  Visit Vote.gov for Details
                </a>
              </div>
            )}
          </div>
        );
      case 'research':
        return (
          <div className="space-y-6">
            <h4 className="text-2xl font-black uppercase italic mb-4">Candidate Comparison (2026)</h4>
            <div className="space-y-4">
              {candidates.map((c, i) => (
                <div key={i} className="border-4 border-hc-black">
                  <button 
                    onClick={() => setExpandedCandidate(expandedCandidate === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 bg-hc-black text-hc-white hover:bg-neon-yellow hover:text-hc-black transition-all"
                  >
                    <span className="font-black uppercase">{c.name} ({c.party})</span>
                    {expandedCandidate === i ? <ChevronLeft className="-rotate-90" /> : <ChevronRight className="rotate-90" />}
                  </button>
                  {expandedCandidate === i && (
                    <div className="p-4 bg-hc-white text-hc-black grid grid-cols-2 gap-4">
                      {Object.entries(c.stances).map(([topic, stance]) => (
                        <div key={topic}>
                          <p className="text-xs font-black uppercase opacity-60">{topic}</p>
                          <p className="font-bold text-lg">{stance}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'voting':
        return (
          <div className="space-y-6">
            <p className="text-xl leading-relaxed font-medium">{steps[activeStep].description}</p>
            <div className="bg-hc-black text-hc-white p-6 border-4 border-neon-yellow">
              <p className="font-black uppercase mb-2">Pro-Tip: Voting Methods</p>
              <ul className="list-disc list-inside font-bold space-y-2 opacity-80">
                <li>Mail-in ballots must be postmarked by Oct 31.</li>
                <li>Early voting opens Oct 20 at City Hall.</li>
                <li>Polls are open 7 AM - 8 PM on Election Day.</li>
              </ul>
              <button 
                onClick={() => document.getElementById('zip')?.focus()}
                className="mt-6 w-full bg-neon-yellow text-hc-black py-3 font-black uppercase hover:bg-hc-white transition-colors"
              >
                Go to Locator Tool Below
              </button>
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="space-y-8">
            <h4 className="text-2xl font-black uppercase italic">Live Result Tracker Mockup</h4>
            <div className="space-y-6">
              {[
                { name: 'Alex Rivera', votes: '52%', color: 'bg-neon-cyan' },
                { name: 'Jordan Smith', votes: '48%', color: 'bg-neon-yellow' }
              ].map((res, i) => (
                <div key={i}>
                  <div className="flex justify-between font-black uppercase mb-2">
                    <span>{res.name}</span>
                    <span>{res.votes}</span>
                  </div>
                  <div className="h-8 bg-hc-black p-1 border-2 border-hc-black">
                    <div className={cn("h-full transition-all duration-1000", res.color)} style={{ width: res.votes }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase opacity-50 italic">Data source: Mock Election API (Simulation Mode)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-black uppercase mb-12 text-center text-neon-cyan italic">Voter Journey Map</h2>
      
      <div className="relative">
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

      <div className="mt-16 bg-hc-white text-hc-black p-8 border-l-[12px] border-neon-cyan shadow-[12px_12px_0px_0px_rgba(0,251,255,1)] min-h-[400px]">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-black uppercase italic">{steps[activeStep].title}</h3>
          <span className="bg-hc-black text-hc-white px-3 py-1 text-xs font-bold uppercase tracking-tighter">
            Step {activeStep + 1} of 4
          </span>
        </div>
        
        {renderStepContent()}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
          className="p-3 border-4 border-hc-white text-hc-white hover:bg-neon-yellow hover:text-hc-black disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <button 
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
          className="p-3 border-4 border-hc-white text-hc-white hover:bg-neon-yellow hover:text-hc-black disabled:opacity-30 transition-all"
        >
          <ChevronRight size={32} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
};

export default JourneyMap;
