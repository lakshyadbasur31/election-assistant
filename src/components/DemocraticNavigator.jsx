import React, { useState, useCallback, useEffect, memo } from 'react';
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

const DemocraticNavigator = ({ lang = 'EN' }) => {
  const [step, setStep] = useState(1);
  const [voterType, setVoterType] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [pincode, setPincode] = useState('');
  const [pinError, setPinError] = useState('');
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Reset PIN data if state changes to maintain data integrity
  useEffect(() => {
    setPincode('');
    setIsPinVerified(false);
    setLocationData(null);
    setPinError('');
  }, [selectedState]);

  const handleNext = useCallback(() => setStep(prev => prev + 1), []);
  const handleBack = useCallback(() => setStep(prev => prev - 1), []);

  const validatePin = useCallback(async (val) => {
    setPincode(val);
    if (val.length === 6) {
      setPinError('');
      setIsLoadingLocation(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const postOffices = data[0].PostOffice;
          // Filter to ensure the PIN actually belongs to the selected state (Logical Validation)
          const stateMatch = postOffices.find(po => po.State.toLowerCase() === selectedState.toLowerCase());
          
          if (stateMatch) {
            setLocationData(stateMatch);
            setIsPinVerified(true);
          } else {
            setPinError(`This PIN does not belong to ${selectedState}`);
            setIsPinVerified(false);
          }
        } else {
          setPinError('Invalid PIN Code');
          setIsPinVerified(false);
        }
      } catch (error) {
        setPinError('Network error. Check connection.');
        setIsPinVerified(false);
      } finally {
        setIsLoadingLocation(false);
      }
    } else {
      setIsPinVerified(false);
      setLocationData(null);
    }
  }, [selectedState]);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">
              {lang === 'EN' ? 'Step 1: Voter Status' : 'चरण 1: मतदाता स्थिति'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['New Voter', 'Existing Voter', 'Correction', 'NRI'].map((type) => (
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
              className="w-full bg-hc-white text-hc-black py-4 font-black uppercase tracking-widest hover:bg-neon-cyan transition-colors disabled:opacity-30 border-4 border-hc-black shadow-[4px_4px_0px_0px_#00fbfb]"
            >
              Continue
            </button>
          </section>
        );
      case 2:
        return (
          <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
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
                className="flex-[2] bg-neon-cyan text-hc-black p-4 font-black uppercase hover:bg-hc-white transition-colors disabled:opacity-30 border-4 border-hc-black shadow-[4px_4px_0px_0px_#fff]"
              >
                Next
              </button>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-yellow">Step 3: Verification</h3>
            <div className="space-y-6">
              <div>
                <label className="block font-black uppercase text-xs tracking-widest mb-2">Enter 6-Digit PIN Code for {selectedState}</label>
                <input 
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => validatePin(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 110001"
                  className={cn(
                    "w-full bg-hc-black text-hc-white border-4 p-6 font-black text-3xl outline-none transition-colors",
                    pinError ? "border-red-500" : isPinVerified ? "border-neon-yellow" : "border-hc-white"
                  )}
                />
              </div>
              
              <div aria-live="assertive">
                {pinError && (
                  <div className="bg-red-600 text-white p-4 flex items-center gap-3 border-4 border-hc-black shadow-[4px_4px_0px_0px_#fff]">
                    <AlertCircle size={24} />
                    <span className="font-black uppercase text-xs">{pinError}</span>
                  </div>
                )}
                
                {isLoadingLocation && (
                  <div className="bg-hc-black text-neon-cyan p-4 flex items-center gap-3 border-2 border-neon-cyan animate-pulse">
                    <Zap size={24} className="animate-spin" />
                    <span className="font-black uppercase text-xs">Locating Polling Station...</span>
                  </div>
                )}

                {isPinVerified && locationData && (
                  <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="border-4 border-hc-white h-64 bg-hc-black relative overflow-hidden shadow-[8px_8px_0px_0px_#fbff00]">
                      <iframe
                        title="Google Maps Locator"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ border: 0, filter: 'grayscale(1) invert(1)' }}
                        src={`https://www.google.com/maps?q=polling+station+in+${locationData.Name}+${locationData.District}+${locationData.State}&output=embed`}
                      />
                    </div>

                    <div className="bg-hc-white text-hc-black p-6 border-4 border-neon-cyan relative">
                       <MapPin className="absolute top-4 right-4 text-neon-cyan" size={32} />
                       <h4 className="text-xl font-black uppercase leading-tight">{locationData.Name} Zone</h4>
                       <p className="font-bold text-sm italic opacity-70">{locationData.District}, {locationData.State}</p>
                       <div className="mt-4 inline-block bg-hc-black text-neon-yellow px-3 py-1 text-[10px] font-black uppercase">
                         Verified Center
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 border-4 border-hc-white text-hc-white p-4 font-black uppercase">Back</button>
              <button 
                disabled={!isPinVerified}
                onClick={handleNext}
                className="flex-[2] bg-neon-yellow text-hc-black p-4 font-black uppercase border-4 border-hc-black shadow-[4px_4px_0px_0px_#fff]"
              >
                Get Guide
              </button>
            </div>
          </section>
        );
      case 4:
        return (
          <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-3xl font-black uppercase italic text-neon-cyan">Step 4: Final Guide</h3>
            <div className="space-y-6">
              {[
                { t: 'Forms', d: voterType === 'New Voter' ? 'Fill Form 6 for registration.' : 'Fill Form 8 for corrections.' },
                { t: 'Docs', d: 'Keep Aadhar and proof of residence ready.' },
                { t: 'Visit', d: 'Verification will be done by BLO.' }
              ].map((item, i) => (
                <div key={i} className="border-l-8 border-neon-cyan pl-6 py-2">
                  <h4 className="font-black uppercase text-neon-cyan">{item.t}</h4>
                  <p className="text-sm font-bold uppercase">{item.d}</p>
                </div>
              ))}
            </div>
            <nav className="flex flex-col gap-4">
              <a 
                href="https://voters.eci.gov.in" 
                target="_blank" 
                className="w-full bg-hc-white text-hc-black p-6 font-black uppercase text-center flex items-center justify-center gap-3 border-4 border-hc-black hover:bg-neon-yellow transition-all"
              >
                Official ECI Portal <ExternalLink size={20} />
              </a>
              <button onClick={() => setStep(1)} className="text-xs font-black uppercase underline opacity-50 hover:opacity-100">Restart Process</button>
            </nav>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-hc-black border-[12px] border-hc-white p-8 md:p-12 shadow-[20px_20px_0px_0px_#f00]">
      <div className="flex justify-between items-center mb-12">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={cn("w-12 h-2", i <= step ? "bg-neon-yellow shadow-[0_0_10px_#fbf00]" : "bg-hc-white/20")} />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase opacity-50">Secure API Polling Active</span>
      </div>
      {renderStep()}
    </div>
  );
};

export default memo(DemocraticNavigator);
