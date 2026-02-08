
import React from 'react';
import { Users, Clock, ShoppingCart } from 'lucide-react';
import { PACKAGES } from '../constants';
import { Package } from '../types';

interface ProductsProps {
  onSelect: (pkg: Package) => void;
}

const Products: React.FC<ProductsProps> = ({ onSelect }) => {
  return (
    <section id="gear" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-sage font-bold tracking-widest text-xs uppercase">Curated Collections</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Rental Packages</h2>
        <div className="w-20 h-1.5 bg-tan mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-sage/5">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                <span className="text-sage-dark font-bold">${pkg.price}</span>
                <span className="text-sage-dark/60 text-xs ml-1">/trip</span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1 text-[10px] text-sage font-bold uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-sage font-bold uppercase tracking-wider">
                  <Users className="w-3 h-3" />
                  {pkg.capacity}
                </div>
              </div>
              <h3 className="text-xl font-bold text-sage-dark mb-2 group-hover:text-sage transition-colors">{pkg.name}</h3>
              <p className="text-sage-dark/60 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                {pkg.description}
              </p>
              <button 
                onClick={() => onSelect(pkg)}
                className="w-full py-4 bg-sage/10 text-sage font-bold rounded-2xl group-hover:bg-sage group-hover:text-cream transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Book Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
