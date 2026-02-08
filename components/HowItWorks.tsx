
import React from 'react';
import { Search, Package, Map, RefreshCcw } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Browse & Select",
    description: "Use our AI planner or browse our curated collections to find the perfect gear for your adventure."
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "We Deliver",
    description: "Top-tier, cleaned, and inspected gear is delivered directly to your doorstep or your trailhead destination."
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: "Go Adventure",
    description: "Head out with confidence knowing you have the best equipment. Our experts are just a call away if you need help."
  },
  {
    icon: <RefreshCcw className="w-8 h-8" />,
    title: "Easy Return",
    description: "When you're back, just pack it up in the original box. We handle the cleaning and maintenance for you."
  }
];

const HowItWorks: React.FC = () => {
  const scrollToGear = (e: React.MouseEvent) => {
    e.preventDefault();
    const gearSection = document.getElementById('gear');
    if (gearSection) {
      gearSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sage font-bold tracking-widest text-xs uppercase">The Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">How It Works</h2>
          <p className="text-sage-dark/60 mt-4 max-w-xl mx-auto">
            We've simplified camping gear rental so you can focus on the destination, not the preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px border-t border-dashed border-sage/30" />
              )}
              
              <div className="w-24 h-24 bg-white rounded-3xl shadow-soft flex items-center justify-center text-sage mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-sage group-hover:text-cream">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-tan text-white font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-sage-dark mb-4">{step.title}</h3>
              <p className="text-sage-dark/60 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 md:p-12 bg-sage-dark rounded-[3rem] text-center text-cream relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tan/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to start your next adventure?</h3>
          <p className="text-cream/70 mb-8 max-w-lg mx-auto relative z-10">
            Join thousands of explorers who trust Nomad Gear for their wilderness escapes.
          </p>
          <button 
            onClick={scrollToGear}
            className="inline-flex items-center gap-2 px-8 py-4 bg-tan text-sage-dark font-bold rounded-full hover:bg-cream transition-all relative z-10 cursor-pointer transform hover:scale-105 active:scale-95"
          >
            Explore Gear
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
