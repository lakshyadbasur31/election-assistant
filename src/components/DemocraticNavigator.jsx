import React, { useState } from 'react';
import { UserPlus, MapPin, CheckCircle2, AlertCircle, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const DemocraticNavigator = () => {
  const [step, setStep] = useState(1);
  const [voterType, setVoterType] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [pincode, setPincode] = useState('');
  const [pinError, setPinError] = useState('');
  const [isPinVerified, setIsPinVerified] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const validatePin = (val) => {
    setPincode(val);
    if (val.length === 0) {
      setPinError('');
      setIsPinVerified(false);
    } else if (val.length === 6) {
      setPinError('');
      setIsPinVerified(true);
    } else {
      setPinError('Error: PIN code must be exactly 6 digits');
      setIsPinVerified(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">Step 1: Voter Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['New Voter', 'Existing Voter', 'Shifting/Correction', 'NRI'].map((type) => (
                <button
                  key={type}
                  onClick={() => setVoterType(type)}
                  className={cn(
                    "p-6 border-4 font-black uppercase text-left transition-all",
                    voterType === type 
                      ? "bg-neon-yellow text-hc-black border-neon-yellow shadow-[8px_8px_0px_0px_#fff]" 
                      : "bg-hc-black text-hc-white border-hc-white hover:border-neon-cyan"
                  )}
                >
                  <div className="flex justify-between items-center">
                    {type}
                    {voterType === type && <CheckCircle2 size={24} />}
                  </div>
                </button>
              ))}
            </div>
            <button 
              disabled={!voterType}
              onClick={handleNext}
              className="w-full bg-hc-white text-hc-black py-4 font-black uppercase tracking-widest hover:bg-neon-cyan transition-colors disabled:opacity-30 border-4 border-hc-black"
            >
              Continue
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-cyan">Step 2: Location</h3>
            <div className="space-y-4">
              <label className="block font-black uppercase text-xs tracking-widest opacity-60">Select Your State / UT</label>
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-hc-black text-hc-white border-4 border-hc-white p-6 font-black uppercase outline-none focus:border-neon-cyan appearance-none cursor-pointer"
              >
                <option value="" disabled>Choose State...</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back</button>
              <button 
                disabled={!selectedState}
                onClick={handleNext}
                className="flex-[2] bg-neon-cyan text-hc-black p-4 font-black uppercase hover:bg-hc-white transition-colors disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">Step 3: PIN Verification</h3>
            <div className="space-y-6">
              <div>
                <label className="block font-black uppercase text-xs tracking-widest mb-2">Enter 6-Digit PIN Code</label>
                <input 
                  type="number"
                  value={pincode}
                  onChange={(e) => validatePin(e.target.value)}
                  placeholder="e.g. 560001"
                  className={cn(
                    "w-full bg-hc-black text-hc-white border-4 p-6 font-black text-3xl outline-none transition-colors",
                    pinError ? "border-red-500" : isPinVerified ? "border-neon-yellow" : "border-hc-white"
                  )}
                />
              </div>
              
              {pinError && (
                <div className="bg-red-500 text-white p-4 flex items-center gap-3 animate-pulse">
                  <AlertCircle size={24} />
                  <span className="font-black uppercase text-xs">{pinError}</span>
                </div>
              )}
              
              {isPinVerified && (
                <div className="bg-neon-yellow text-hc-black p-4 flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span className="font-black uppercase text-xs">PIN Verified Successfully</span>
                </div>
              )}

              {isPinVerified && (
                <div className="border-4 border-hc-white h-64 bg-hc-black relative overflow-hidden">
                  <iframe
                    title="Polling Booth Locator"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }}
                    src={`https://www.google.com/maps?q=${pincode}+polling+booth&output=embed`}
                  />
                  <div className="absolute bottom-2 right-2 bg-hc-black text-[10px] px-2 py-1 font-bold text-neon-cyan uppercase">
                    Dynamic Map Integrated
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back</button>
              <button 
                disabled={!isPinVerified}
                onClick={handleNext}
                className="flex-[2] bg-neon-yellow text-hc-black p-4 font-black uppercase hover:bg-hc-white transition-colors disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-cyan">Step 4: Procedural Guide</h3>
            <div className="relative pl-12 space-y-12">
              <div className="absolute left-4 top-2 bottom-2 w-1 bg-neon-cyan/30" />
              
              {[
                { title: 'Gather Documents', desc: 'Aadhar Card, Address Proof, and Age Proof.' },
                { title: 'Fill Form 6', desc: 'Submit the application online at ECI portal.' },
                { title: 'BLO Field Visit', desc: 'Booth Level Officer will verify your residence.' }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[44px] top-0 w-8 h-8 bg-neon-cyan text-hc-black flex items-center justify-center font-black rounded-full border-4 border-hc-black">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-1">{item.title}</h4>
                  <p className="font-bold opacity-70 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href="https://voters.eci.gov.in" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-hc-white text-hc-black p-6 font-black uppercase text-center flex items-center justify-center gap-3 hover:bg-neon-cyan transition-all border-4 border-hc-black"
              >
                Link to ECI Portal <ExternalLink size={24} />
              </a>
              <button onClick={handleBack} className="w-full border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back to Start</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-hc-black border-[12px] border-hc-white p-8 md:p-12 shadow-[20px_20px_0px_0px_#f00,20px_20px_0px_4px_#fff]">
      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={cn(
                "w-12 h-2",
                i <= step ? "bg-neon-yellow shadow-[0_0_10px_#fbf00]" : "bg-hc-white/20"
              )} 
            />
          ))}
        </div>
        <span className="text-xs font-black uppercase tracking-tighter opacity-50">India Election Flow v2.0</span>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default DemocraticNavigator;
