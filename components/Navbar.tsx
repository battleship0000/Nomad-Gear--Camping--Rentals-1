
import React, { useState, useEffect } from 'react';
import { Tent, Menu, X, ShoppingBag, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Gear', href: '#gear' },
    { name: 'AI Planner', href: '#planner' },
    { name: 'Explorer', href: '#explorer' },
    { name: 'Destinations', href: '#destinations' },
  ];

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled 
        ? "w-[95%] max-w-6xl nav-glass shadow-lg rounded-full py-3 px-8" 
        : "w-full max-w-7xl py-6 px-8 bg-transparent"
    }`}>
      <div className="flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => handleNavLinkClick(e, '#home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Tent className="w-5 h-5 text-cream" />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isScrolled ? 'text-sage-dark' : 'text-white'}`}>
            Nomad Gear
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={`text-sm font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-sage-dark' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className={`${isScrolled ? 'text-sage-dark' : 'text-white'}`}>
            <Search className="w-5 h-5" />
          </button>
          <button className={`relative ${isScrolled ? 'text-sage-dark' : 'text-white'}`}>
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brown text-white text-[10px] rounded-full flex items-center justify-center">0</span>
          </button>
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-sage-dark" />
            ) : (
              <Menu className={isScrolled ? 'text-sage-dark' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-cream rounded-2xl p-6 shadow-xl flex flex-col gap-4 animate-fade-up">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="text-sage-dark font-medium py-2 border-b border-sage/10 last:border-0"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
