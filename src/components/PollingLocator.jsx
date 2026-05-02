import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

const PollingLocator = () => {
  const [zipCode, setZipCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!zipCode) return;
    
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setLocation({
        name: 'Central High School Gym',
        address: '123 Democracy Ave, Liberty City',
        distance: '0.8 miles away',
        hours: '7:00 AM - 8:00 PM',
      });
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
              <label htmlFor="zip" className="block text-xs font-black uppercase tracking-widest mb-2">Enter Zip Code</label>
              <div className="flex gap-2">
                <input
                  id="zip"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="e.g. 10001"
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
            ) : (
              <div className="border-4 border-dashed border-hc-black/20 p-8 text-center">
                <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold uppercase text-hc-black/40">Enter your zip code to find nearby polling stations</p>
              </div>
            )}
          </div>
        </div>

        {/* Mock Map View */}
        <div className="flex-1 bg-[#1a1a1a] border-4 border-hc-white relative min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png')] bg-cover bg-center grayscale contrast-150" />
          <div className="absolute inset-0 bg-gradient-to-t from-hc-black to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            {location && (
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neon-cyan text-hc-black px-4 py-2 font-black uppercase text-xs whitespace-nowrap shadow-[4px_4px_0px_0px_#000]">
                  YOU ARE HERE
                </div>
                <div className="w-8 h-8 bg-neon-cyan rounded-full border-4 border-hc-black animate-bounce" />
                <div className="w-8 h-2 bg-hc-black/50 rounded-full scale-x-150 blur-sm mt-1" />
              </div>
            )}
            
            {location && (
              <div className="absolute top-1/3 left-1/4">
                <div className="w-8 h-8 text-neon-yellow animate-pulse">
                  <MapPin size={32} strokeWidth={3} />
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-hc-black/80 backdrop-blur-md p-4 border-2 border-neon-cyan">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan opacity-80">Mock Google Maps API Integration (v4.2.0)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingLocator;
