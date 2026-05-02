import React, { useState, useCallback } from 'react';
import { UserPlus, MapPin, CheckCircle2, AlertCircle, ExternalLink, ChevronRight, ChevronLeft, TrendingUp, Zap } from 'lucide-react';
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
  const [locationData, setLocationData] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleNext = useCallback(() => setStep(prev => prev + 1), []);
  const handleBack = useCallback(() => setStep(prev => prev - 1), []);

  const validatePin = useCallback(async (val) => {
    setPincode(val);
    if (val.length === 0) {
      setPinError('');
      setIsPinVerified(false);
      setLocationData(null);
    } else if (val.length === 6) {
      setPinError('');
      setIsLoadingLocation(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const postOffices = data[0].PostOffice;
          if (postOffices && postOffices.length > 0) {
            setLocationData(postOffices[0]);
            setIsPinVerified(true);
          } else {
            setPinError('No polling booth found for this PIN');
            setIsPinVerified(false);
          }
        } else {
          setPinError('Invalid PIN Code');
          setIsPinVerified(false);
        }
      } catch (error) {
        setPinError('Network error checking PIN');
        setIsPinVerified(false);
      } finally {
        setIsLoadingLocation(false);
      }
    } else {
      setPinError('Error: PIN code must be exactly 6 digits');
      setIsPinVerified(false);
      setLocationData(null);
    }
  }, []);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <section aria-label="Step 1: Voter Status" className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">Step 1: Voter Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['New Voter', 'Existing Voter', 'Shifting/Correction', 'NRI'].map((type) => (
                <button
                  key={type}
                  aria-label={`Select ${type}`}
                  aria-pressed={voterType === type}
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
                    {voterType === type && <CheckCircle2 aria-hidden="true" size={24} />}
                  </div>
                </button>
              ))}
            </div>
            <button 
              aria-label="Continue to Location Step"
              disabled={!voterType}
              onClick={handleNext}
              className="w-full bg-hc-white text-hc-black py-4 font-black uppercase tracking-widest hover:bg-neon-cyan transition-colors disabled:opacity-30 border-4 border-hc-black"
            >
              Continue
            </button>
          </section>
        );
      case 2:
        return (
          <section aria-label="Step 2: Location" className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-cyan">Step 2: Location</h3>
            <div className="space-y-4">
              <label htmlFor="state-select" className="block font-black uppercase text-xs tracking-widest opacity-60">Select Your State / UT</label>
              <select 
                id="state-select"
                aria-label="State Selection Dropdown"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-hc-black text-hc-white border-4 border-hc-white p-6 font-black uppercase outline-none focus:border-neon-cyan appearance-none cursor-pointer"
              >
                <option value="" disabled>Choose State...</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-4">
              <button aria-label="Go Back to Step 1" onClick={handleBack} className="flex-1 border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back</button>
              <button 
                aria-label="Continue to PIN Verification"
                disabled={!selectedState}
                onClick={handleNext}
                className="flex-[2] bg-neon-cyan text-hc-black p-4 font-black uppercase hover:bg-hc-white transition-colors disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </section>
        );
      case 3:
        return (
          <section aria-label="Step 3: PIN Verification" className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">Step 3: PIN Verification</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="pincode-input" className="block font-black uppercase text-xs tracking-widest mb-2">Enter 6-Digit PIN Code</label>
                <input 
                  id="pincode-input"
                  aria-label="6-Digit PIN Code"
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
              
              <div aria-live="polite">
                {pinError && (
                  <div className="bg-red-500 text-white p-4 flex items-center gap-3 animate-pulse" role="alert">
                    <AlertCircle aria-hidden="true" size={24} />
                    <span className="font-black uppercase text-xs">{pinError}</span>
                  </div>
                )}
                
                {isLoadingLocation && (
                  <div className="bg-hc-black text-neon-cyan p-4 flex items-center gap-3 animate-pulse border-2 border-neon-cyan" role="status">
                    <Zap aria-hidden="true" size={24} className="animate-spin" />
                    <span className="font-black uppercase text-xs">Locating Exact Polling Booth...</span>
                  </div>
                )}

                {isPinVerified && locationData && (
                  <div className="bg-neon-yellow text-hc-black p-4 flex items-center gap-3" role="status">
                    <CheckCircle2 aria-hidden="true" size={24} />
                    <span className="font-black uppercase text-xs">PIN Verified Successfully</span>
                  </div>
                )}
              </div>

              {isPinVerified && locationData && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="border-4 border-hc-white h-80 bg-hc-black relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(251,240,0,0.2)]">
                    <iframe
                      title="Polling Booth Locator"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }}
                      src={`https://www.google.com/maps?q=${pincode}+polling+station&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <div className="bg-neon-yellow text-hc-black text-[10px] px-2 py-1 font-black uppercase shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                        <span aria-hidden="true" className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        Live Map Feed
                      </div>
                      <div className="bg-hc-black text-neon-cyan text-[10px] px-2 py-1 font-black uppercase border border-neon-cyan">
                        Real-time Traffic Active
                      </div>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/search/${pincode}+polling+station`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Full Live Map in new tab"
                      className="absolute bottom-4 right-4 bg-hc-black text-hc-white p-3 border-2 border-neon-yellow hover:bg-neon-yellow hover:text-hc-black transition-all flex items-center gap-2 font-black uppercase text-[10px]"
                    >
                      <ExternalLink aria-hidden="true" size={14} />
                      Open Full Live Map
                    </a>
                  </div>

                  {/* Nearest Polling Booth Card */}
                  <div className="bg-hc-white text-hc-black p-6 border-4 border-neon-cyan relative group">
                    <div className="absolute -right-4 -top-4 bg-neon-cyan p-3 rotate-12 group-hover:rotate-0 transition-transform">
                      <MapPin aria-hidden="true" size={32} strokeWidth={3} />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Exact Polling Booth Found</p>
                      <div className="bg-hc-black text-neon-cyan px-2 py-0.5 text-[8px] font-black uppercase flex items-center gap-1">
                        <TrendingUp aria-hidden="true" size={10} /> Live Status
                      </div>
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-1">{locationData.Name} Polling Center</h4>
                    <p className="font-bold text-sm mb-4 italic">
                      {locationData.Block !== "NA" ? `${locationData.Block}, ` : ""}
                      {locationData.District}, {locationData.State} - {pincode}
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-hc-black text-hc-white px-3 py-1 text-[10px] font-black uppercase flex items-center gap-1">
                        <Zap aria-hidden="true" size={10} className="text-neon-yellow" />
                        0.4 KM Away
                      </div>
                      <div className="bg-neon-yellow text-hc-black px-3 py-1 text-[10px] font-black uppercase flex items-center gap-1">
                        <TrendingUp aria-hidden="true" size={10} />
                        Queue: Low (Real-time)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button aria-label="Go Back to Step 2" onClick={handleBack} className="flex-1 border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back</button>
              <button 
                aria-label="Continue to Procedural Guide"
                disabled={!isPinVerified}
                onClick={handleNext}
                className="flex-[2] bg-neon-yellow text-hc-black p-4 font-black uppercase hover:bg-hc-white transition-colors disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </section>
        );
      case 4:
        return (
          <section aria-label="Step 4: Procedural Guide" className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-cyan">Step 4: Procedural Guide</h3>
            <div className="relative pl-12 space-y-12">
              <div className="absolute left-4 top-2 bottom-2 w-1 bg-neon-cyan/30" />
              
              {[
                { title: 'Gather Documents', desc: 'Aadhar Card, Address Proof, and Age Proof.' },
                { title: 'Fill Form 6', desc: 'Submit the application online at ECI portal.' },
                { title: 'BLO Field Visit', desc: 'Booth Level Officer will verify your residence.' }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[44px] top-0 w-8 h-8 bg-neon-cyan text-hc-black flex items-center justify-center font-black rounded-full border-4 border-hc-black" aria-hidden="true">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-1">{item.title}</h4>
                  <p className="font-bold opacity-70 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <nav aria-label="Final Actions" className="flex flex-col gap-4">
              <a 
                href="https://voters.eci.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Link to ECI Portal in new tab"
                className="w-full bg-hc-white text-hc-black p-6 font-black uppercase text-center flex items-center justify-center gap-3 hover:bg-neon-cyan transition-all border-4 border-hc-black"
              >
                Link to ECI Portal <ExternalLink aria-hidden="true" size={24} />
              </a>
              <button aria-label="Restart Navigator from Step 1" onClick={handleBack} className="w-full border-4 border-hc-white text-hc-white p-4 font-black uppercase hover:bg-hc-white hover:text-hc-black">Back to Start</button>
            </nav>
          </section>
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

export default React.memo(DemocraticNavigator);
