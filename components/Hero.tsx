
import React from 'react';
import { ArrowRight, Mountain } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPlanner = (e: React.MouseEvent) => {
    e.preventDefault();
    const plannerSection = document.getElementById('planner');
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGear = (e: React.MouseEvent) => {
    e.preventDefault();
    const gearSection = document.getElementById('gear');
    if (gearSection) {
      gearSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000&auto=format&fit=crop" 
          alt="Camping under the stars"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 backdrop-blur-md rounded-full text-cream text-sm font-medium mb-6">
          <Mountain className="w-4 h-4 text-tan" />
          <span>Estd. 2019 • Premium Gear Rentals</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
          Your journey begins <br />
          <span className="text-tan">beyond the pavement.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium camping equipment rentals delivered to your door. From ultralight solo kits to full family basecamps, we have everything you need to explore with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToGear}
            className="w-full sm:w-auto px-8 py-4 bg-sage text-cream font-bold rounded-full hover:bg-sage-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Rent Gear Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollToPlanner}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center"
          >
            Plan My Trip
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs uppercase tracking-widest font-bold">Scroll to explore</span>
        <div className="w-px h-12 bg-white/20" />
      </div>
    </section>
  );
};

export default Hero;
