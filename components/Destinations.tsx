
import React from 'react';
import { Star, MapPin, Compass } from 'lucide-react';
import { DESTINATIONS } from '../constants';

const Destinations: React.FC = () => {
  return (
    <section id="destinations" className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-sage font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <Compass className="w-3 h-3" />
            Where to go
          </span>
          <h2 className="text-4xl font-bold mt-2">Adventure Spots</h2>
        </div>
        <p className="text-sage-dark/60 max-w-md">
          Discover hand-picked destinations perfect for testing your gear and finding peace in the wild.
        </p>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 px-6 scrollbar-hide md:px-[calc((100vw-80rem)/2+1.5rem)]">
        {DESTINATIONS.map((dest) => (
          <div key={dest.id} className="shrink-0 w-80 group cursor-pointer">
            <div className="polaroid rounded-sm rotate-0 group-hover:rotate-2 transition-transform duration-500">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3 h-3 text-tan fill-tan" />
                  <span className="text-xs font-bold">{dest.rating}</span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-1 text-sage-dark/40 text-xs mb-1">
                  <MapPin className="w-3 h-3" />
                  {dest.location}
                </div>
                <h3 className="font-bold text-lg text-sage-dark">{dest.name}</h3>
                <p className="text-xs text-sage-dark/60 mt-1 line-clamp-1">{dest.description}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for horizontal scroll */}
        <div className="shrink-0 w-8 md:w-32" />
      </div>
    </section>
  );
};

export default Destinations;
