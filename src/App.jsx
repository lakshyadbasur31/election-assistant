import React from 'react';
import DemocraticNavigator from './components/DemocraticNavigator';
import { Vote, ShieldCheck, TrendingUp, Calendar, Zap, ChevronRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-hc-black text-hc-white selection:bg-neon-yellow selection:text-hc-black font-sans">
      {/* Header */}
      <header className="border-b-[12px] border-hc-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-yellow/10 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-neon-yellow text-hc-black px-6 py-2 font-black uppercase text-sm italic tracking-tighter shadow-[4px_4px_0px_0px_#fff]">
              <ShieldCheck size={20} strokeWidth={3} />
              India Election Navigator 2026
            </div>
            <h1 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.8] text-shadow-hc">
              DEMOCRATIC<br />
              <span className="text-neon-cyan">NAVIGATOR</span>
            </h1>
          </div>
          
          {/* Voter Intelligence Dashboard */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-hc-white text-hc-black p-6 border-4 border-hc-black shadow-[8px_8px_0px_0px_#00fbfb]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} strokeWidth={3} />
                <span className="text-xs font-black uppercase tracking-widest">Turnout</span>
              </div>
              <p className="text-4xl font-black italic">60.5%</p>
              <p className="text-[10px] font-bold uppercase opacity-60">Avg. Tracker</p>
            </div>
            <div className="bg-hc-black text-hc-white p-6 border-4 border-hc-white shadow-[8px_8px_0px_0px_#fbff00]">
              <div className="flex items-center gap-2 mb-2 text-neon-yellow">
                <Calendar size={20} strokeWidth={3} />
                <span className="text-xs font-black uppercase tracking-widest">Election</span>
              </div>
              <p className="text-4xl font-black italic text-neon-yellow">2026</p>
              <p className="text-[10px] font-bold uppercase opacity-60">Cycle Year</p>
            </div>
          </div>
        </div>
      </header>

      <main className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Main Interaction Area */}
          <div className="lg:col-span-7">
            <DemocraticNavigator />
          </div>

          {/* Sidebar / Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-neon-cyan text-hc-black p-10 border-8 border-hc-black shadow-[16px_16px_0px_0px_#fff]">
              <Zap size={48} fill="currentColor" className="mb-6" />
              <h2 className="text-4xl font-black uppercase italic leading-none mb-6">Why Your Vote Matters?</h2>
              <p className="text-xl font-bold leading-tight uppercase mb-8">
                Every single vote contributes to the collective mandate of the world's largest democracy. Your participation defines the governance of tomorrow.
              </p>
              <div className="p-4 border-4 border-hc-black bg-hc-white font-black uppercase text-sm">
                Next General Election Cycle: 2026
              </div>
            </div>

            <div className="border-8 border-hc-white p-10 space-y-8">
              <h3 className="text-3xl font-black uppercase italic">Quick Resources</h3>
              <div className="space-y-4">
                {[
                  { label: 'Official ECI Portal', link: 'https://voters.eci.gov.in' },
                  { label: 'Search Name in Roll', link: 'https://electoralsearch.eci.gov.in' },
                  { label: 'Know Your Candidate', link: 'https://affidavit.eci.gov.in' }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center p-4 border-4 border-hc-white hover:bg-neon-yellow hover:text-hc-black transition-all group"
                  >
                    <span className="font-black uppercase text-sm">{item.label}</span>
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t-[12px] border-hc-white py-20 px-6 opacity-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-hc-white text-hc-black rounded-full">
              <Vote size={32} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter">India Democracy v2.0</span>
          </div>
          <p className="text-sm font-black uppercase text-center md:text-right">
            Civic Education Challenge 2026<br />
            Built for Extreme Accessibility
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
