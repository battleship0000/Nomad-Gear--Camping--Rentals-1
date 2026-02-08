
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Products from './components/Products.tsx';
import GearPlanner from './components/GearPlanner.tsx';
import Destinations from './components/Destinations.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import LiveSupport from './components/LiveSupport.tsx';
import BookingModal from './components/BookingModal.tsx';
import Sustainability from './components/Sustainability.tsx';
import CampgroundFinder from './components/CampgroundFinder.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import { Quote, Star, Tent, Compass, Mountain } from 'lucide-react';
import { TESTIMONIALS } from './constants.tsx';
import { Package } from './types.ts';

const App: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Value Prop Section */}
        <section className="py-16 bg-white border-y border-sage/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-sage/5 rounded-full flex items-center justify-center text-sage mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-sage-dark">Premium Quality</h3>
              <p className="text-sage-dark/60 text-sm px-4">We only rent industry-leading brands like North Face, Patagonia, and MSR.</p>
            </div>
            <div className="flex flex-col items-center text-center border-y md:border-y-0 md:border-x border-sage/5 py-12 md:py-0">
              <div className="w-12 h-12 bg-sage/5 rounded-full flex items-center justify-center text-sage mb-4">
                <Tent className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-sage-dark">Doorstep Delivery</h3>
              <p className="text-sage-dark/60 text-sm px-4">Gear arrives cleaned and inspected right at your home or your destination.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-sage/5 rounded-full flex items-center justify-center text-sage mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-sage-dark">Expert Advice</h3>
              <p className="text-sage-dark/60 text-sm px-4">Our team of wilderness guides is available to help you plan your route.</p>
            </div>
          </div>
        </section>

        <HowItWorks />

        <Products onSelect={handleSelectPackage} />

        <Sustainability />

        <GearPlanner onSelectPackage={handleSelectPackage} />
        
        <CampgroundFinder />

        <Destinations />

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sage font-bold tracking-widest text-xs uppercase">Community Love</span>
              <h2 className="text-4xl font-bold mt-2 text-sage-dark">Happy Campers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-cream/40 p-10 rounded-[2.5rem] relative shadow-sm border border-sage/5 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-10 h-10 text-sage/10 group-hover:text-sage/20 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-tan fill-tan" />
                    ))}
                  </div>
                  <p className="text-sage-dark/80 italic mb-8 relative z-10 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-sage/10" />
                    <div>
                      <h4 className="font-bold text-sage-dark">{t.name}</h4>
                      <p className="text-xs text-sage-dark/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        {/* Newsletter / CTA */}
        <section className="py-24 bg-sage-dark text-cream relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tan rounded-full blur-[120px]" />
           </div>
           
           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <div className="w-16 h-16 bg-tan/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
               <Mountain className="w-8 h-8 text-tan" />
             </div>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Adventure Club</h2>
             <p className="text-cream/60 text-lg mb-10 max-w-xl mx-auto">
               Subscribe to get seasonal gear tips, early access to new collections, and <span className="text-tan font-bold">10% off</span> your first rental.
             </p>
             <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Your email address" 
                 className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all"
               />
               <button className="px-8 py-4 bg-tan text-sage-dark font-bold rounded-full hover:bg-cream transition-all shadow-lg active:scale-95">
                 Join Now
               </button>
             </form>
           </div>
        </section>
      </main>

      <Footer />
      
      <LiveSupport />
      {selectedPackage && (
        <BookingModal 
          pkg={selectedPackage} 
          onClose={() => setSelectedPackage(null)} 
        />
      )}
    </div>
  );
};

export default App;
