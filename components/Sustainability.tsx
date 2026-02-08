
import React from 'react';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';

const Sustainability: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop" 
                alt="Beautiful forest" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-tan rounded-full flex items-center justify-center p-8 text-center animate-float">
              <p className="text-sage-dark font-bold text-sm leading-tight">1% of every rental goes to Forest Preservation</p>
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-sage/5 rounded-full blur-3xl -z-10" />
          </div>

          <div className="lg:w-1/2">
            <span className="text-sage font-bold tracking-widest text-xs uppercase block mb-4">Our Commitment</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-sage-dark">Explore more, <br/><span className="text-sage">leave nothing behind.</span></h2>
            
            <p className="text-sage-dark/60 text-lg mb-12 leading-relaxed">
              We believe the best gear is the gear that's shared. By renting instead of buying, we collectively reduce waste and ensure high-quality equipment stays in use longer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage shrink-0">
                  <Recycle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sage-dark mb-1">Circular Gear</h4>
                  <p className="text-xs text-sage-dark/60">Professional maintenance extends gear life by 5x compared to typical usage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sage-dark mb-1">Eco-Cleaning</h4>
                  <p className="text-xs text-sage-dark/60">We use biodegradable, phosphate-free detergents for all gear maintenance.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sage-dark mb-1">Zero Plastic</h4>
                  <p className="text-xs text-sage-dark/60">Our shipping containers are reusable and 100% plastic-free.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sage-dark mb-1">Park Support</h4>
                  <p className="text-xs text-sage-dark/60">Proud partners of the National Park Foundation since 2021.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
