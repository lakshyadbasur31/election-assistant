import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

const mockStations = {
  '560001': {
    name: 'Bangalore General Post Office',
    address: 'Raj Bhavan Road, Bangalore, KA 560001',
    distance: '0.5 miles away',
    hours: '8:00 AM - 6:00 PM',
  },
  '570029': {
    name: 'Mysore Palace North Gate',
    address: 'Sayyaji Rao Road, Mysore, KA 570029',
    distance: '1.2 miles away',
    hours: '7:30 AM - 7:30 PM',
  },
  '90210': {
    name: 'Beverly Hills Community Center',
    address: '455 N Rexford Dr, Beverly Hills, CA 90210',
    distance: '0.3 miles away',
    hours: '7:00 AM - 8:00 PM',
  }
};

const PollingLocator = () => {
  const [zipCode, setZipCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!zipCode) return;
    
    setIsSearching(true);
    setLocation(null);
    setError(false);

    // Simulate API delay
    setTimeout(() => {
      const result = mockStations[zipCode];
      if (result) {
        setLocation(result);
      } else {
        setError(true);
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-20 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1 bg-hc-white text-hc-black p-8 border-4 border-hc-white">
          <h2 className="text-3xl font-black uppercase mb-6 italic">Polling Station Locator</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="zip" className="block text-xs font-black uppercase tracking-widest mb-2">Enter Zip Code (560001, 570029, 90210)</label>
              <div className="flex gap-2">
                <input
                  id="zip"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="e.g. 90210"
                  className="flex-1 bg-hc-black text-hc-white border-4 border-hc-black p-4 font-bold focus:border-neon-yellow outline-none transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-hc-black text-neon-yellow p-4 hover:bg-neon-yellow hover:text-hc-black transition-colors disabled:opacity-50"
                >
                  <Search size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 min-h-[160px]">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center h-full animate-pulse">
                <div className="w-12 h-12 border-8 border-hc-black border-t-neon-cyan rounded-full animate-spin mb-4" />
                <p className="font-black uppercase text-xs tracking-[0.2em]">Searching Database...</p>
              </div>
            ) : location ? (
              <div className="bg-neon-cyan/10 border-4 border-neon-cyan p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                  <MapPin size={120} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">{location.name}</h3>
                <p className="font-bold text-lg mb-1">{location.address}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="bg-hc-black text-hc-white px-3 py-1 text-xs font-bold uppercase">{location.distance}</span>
                  <span className="bg-neon-yellow text-hc-black px-3 py-1 text-xs font-bold uppercase">{location.hours}</span>
                </div>
                <button className="mt-6 flex items-center gap-2 bg-hc-black text-hc-white px-6 py-3 font-black uppercase text-sm tracking-wider hover:bg-hc-white hover:text-hc-black border-2 border-hc-black transition-all">
                  <Navigation size={18} strokeWidth={3} />
                  Get Directions
                </button>
              </div>
            ) : error ? (
              <div className="border-4 border-neon-yellow p-8 text-center bg-hc-black text-hc-white">
                <p className="font-black uppercase mb-4">No local results found for {zipCode}</p>
                <button className="bg-neon-yellow text-hc-black px-6 py-3 font-black uppercase tracking-widest hover:bg-hc-white transition-colors">
                  Search Statewide
                </button>
              </div>
            ) : (
              <div className="border-4 border-dashed border-hc-black/20 p-8 text-center">
                <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold uppercase text-hc-black/40">Enter your zip code to find nearby polling stations</p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Map View */}
        <div className="flex-1 bg-hc-black border-4 border-hc-white relative min-h-[400px] overflow-hidden">
          {location ? (
            <iframe
              title="Google Maps Polling Locator"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) invert(100%)' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${zipCode}+polling+station&output=embed`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 border-4 border-hc-white/20 rounded-full flex items-center justify-center mb-6">
                <MapPin size={48} className="text-hc-white/20" />
              </div>
              <p className="text-hc-white/40 font-black uppercase tracking-widest">
                Waiting for Location Data...
              </p>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4 bg-hc-black/90 backdrop-blur-md p-4 border-2 border-neon-cyan z-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan opacity-80">Mock Google Maps API Integration (v4.2.0)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingLocator;
