import React from 'react';
import Countdown from './components/Countdown';
import JourneyMap from './components/JourneyMap';
import PollingLocator from './components/PollingLocator';
import ElectionReminder from './components/ElectionReminder';
import { Vote, ShieldCheck, HelpCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-hc-black text-hc-white selection:bg-neon-yellow selection:text-hc-black">
      {/* Navigation / Header */}
      <header className="border-b-8 border-hc-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-neon-yellow text-hc-black px-4 py-1 font-black uppercase text-sm italic tracking-tighter">
              <ShieldCheck size={20} />
              Official Civic Education Tool
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.85] text-shadow-hc">
              ELECTION<br />
              <span className="text-neon-yellow">ASSISTANT</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold max-w-xl text-hc-white/80 uppercase tracking-widest leading-none">
              Empowering voters through digital civic education and interactive process management.
            </p>
          </div>
          <Countdown />
        </div>
      </header>

      <main>
        {/* Journey Map Section */}
        <section className="py-24 bg-gradient-to-b from-hc-black to-[#0a0a0a]">
          <JourneyMap />
        </section>

        {/* Tools Section */}
        <section className="py-24 bg-hc-white text-hc-black border-y-[20px] border-hc-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-6xl md:text-8xl font-black uppercase mb-16 italic tracking-tighter">
              CIVIC TOOLS
            </h2>
            <PollingLocator />
            <ElectionReminder />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-32 bg-neon-cyan text-hc-black">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-5xl font-black uppercase italic leading-none">Why Voting Matters?</h2>
              <p className="text-xl font-bold leading-relaxed">
                Voting is the fundamental way citizens participate in government. Your vote decides who will lead our communities and what policies will be implemented.
              </p>
              <div className="flex gap-4">
                <div className="bg-hc-black text-neon-cyan p-4 font-black uppercase text-4xl shadow-[8px_8px_0px_0px_#fff]">
                  100%
                </div>
                <p className="font-bold uppercase self-center">Commitment to accessibility and democratic participation.</p>
              </div>
            </div>
            <div className="border-8 border-hc-black p-8 bg-hc-white flex flex-col justify-between">
              <HelpCircle size={48} className="mb-4" />
              <p className="text-2xl font-black uppercase mb-8">Need more help or specialized voter information?</p>
              <button className="w-full bg-hc-black text-hc-white py-6 font-black uppercase tracking-widest text-xl hover:bg-hc-white hover:text-hc-black border-4 border-hc-black transition-all">
                Access Resource Hub
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-hc-black py-20 border-t-8 border-hc-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 opacity-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-hc-white text-hc-black rounded-full">
              <Vote size={32} />
            </div>
            <span className="text-2xl font-black uppercase tracking-widest italic">DEMOCRACY V1.0</span>
          </div>
          <div className="text-center md:text-right font-bold uppercase tracking-widest text-sm">
            Built for the Civic Education Challenge 2026<br />
            Designed for Extreme High Contrast & Accessibility
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
