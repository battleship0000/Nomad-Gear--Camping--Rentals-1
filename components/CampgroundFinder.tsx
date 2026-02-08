
import React, { useState } from 'react';
import { MapPin, Search, Loader2, ExternalLink, Compass, Navigation } from 'lucide-react';
import { searchCampgrounds } from '../services/geminiService.ts';

const CampgroundFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string; links: any[] } | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const data = await searchCampgrounds(query);
      setResults(data);
    } catch (err) {
      setError('Unable to fetch campsites. Please try searching for a different area.');
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latLng = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          const data = await searchCampgrounds("my current location", latLng);
          setResults(data);
          setQuery("Nearby your location");
        } catch (err) {
          setError('Unable to find campsites near your current location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied. Please type a destination manually.');
        setLoading(false);
      }
    );
  };

  return (
    <section id="explorer" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <span className="text-sage font-bold tracking-widest text-xs uppercase flex items-center gap-2 mb-4">
              <Navigation className="w-3 h-3" />
              Real-world Explorer
            </span>
            <h2 className="text-4xl font-bold text-sage-dark mb-6 leading-tight">Find your next <br /><span className="text-tan">basecamp.</span></h2>
            <p className="text-sage-dark/60 mb-8">
              Tell us where you want to go, and we'll find the best campsites and trailheads in that area using real-time data from Google Maps.
            </p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage/40" />
                <input
                  type="text"
                  placeholder="Enter a city or park..."
                  className="w-full pl-12 pr-4 py-4 bg-sage/5 rounded-2xl border-2 border-transparent focus:border-sage focus:outline-none transition-all font-medium"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-sage text-cream font-bold rounded-2xl hover:bg-sage-dark transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  Find Spots
                </button>
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={loading}
                  title="Use my location"
                  className="px-4 py-4 bg-tan text-white font-bold rounded-2xl hover:bg-brown transition-all"
                >
                  <Compass className="w-6 h-6" />
                </button>
              </div>
            </form>
            
            {error && <p className="mt-4 text-red-500 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </p>}
          </div>

          <div className="lg:w-2/3 w-full">
            {!results && !loading && (
              <div className="h-full min-h-[400px] border-4 border-dashed border-sage/5 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-sage/5 rounded-full flex items-center justify-center text-sage/20 mb-6">
                  <MapPin className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-sage-dark/30">Your search results will appear here</h3>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[400px] bg-sage/5 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center animate-pulse">
                <Loader2 className="w-12 h-12 text-sage animate-spin mb-4" />
                <p className="text-sage font-medium">Scanning the map for adventure...</p>
              </div>
            )}

            {results && !loading && (
              <div className="bg-cream/30 p-10 rounded-[3rem] border border-sage/5 animate-fade-up">
                <div className="prose prose-sage max-w-none">
                  <div className="text-sage-dark/80 whitespace-pre-wrap leading-relaxed mb-10">
                    {results.text}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-sage/40 mb-4">Direct Map Links</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.links.map((chunk: any, i: number) => {
                      if (chunk.maps) {
                        return (
                          <a
                            key={i}
                            href={chunk.maps.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-sage/10 hover:border-tan hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-tan/10 rounded-xl flex items-center justify-center text-tan">
                                <MapPin className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-sage-dark text-sm truncate max-w-[150px]">
                                {chunk.maps.title || "View Spot"}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-sage/20 group-hover:text-tan transition-colors" />
                          </a>
                        );
                      }
                      if (chunk.web) {
                         return (
                          <a
                            key={i}
                            href={chunk.web.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-sage/10 hover:border-sage-light hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-sage/5 rounded-xl flex items-center justify-center text-sage">
                                <Search className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-sage-dark text-sm truncate max-w-[150px]">
                                {chunk.web.title || "Learn More"}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-sage/20 group-hover:text-sage-light transition-colors" />
                          </a>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampgroundFinder;
