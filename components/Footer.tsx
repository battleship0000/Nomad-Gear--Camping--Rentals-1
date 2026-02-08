
import React from 'react';
// Added MapPin to the imported icons from lucide-react
import { Tent, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-sage-dark text-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-cream/10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
              <Tent className="w-5 h-5 text-sage-dark" />
            </div>
            <span className="font-bold text-xl text-cream">Nomad Gear</span>
          </div>
          <p className="text-cream/60 max-w-sm leading-relaxed mb-8">
            Making outdoor adventures accessible to everyone since 2019. We provide high-end, reliable gear so you can focus on the memories.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-tan hover:text-sage-dark transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-tan hover:text-sage-dark transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-tan hover:text-sage-dark transition-all">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-cream/60 text-sm">
            <li><a href="#gear" className="hover:text-tan transition-colors">Our Packages</a></li>
            <li><a href="#planner" className="hover:text-tan transition-colors">AI Trip Planner</a></li>
            <li><a href="#destinations" className="hover:text-tan transition-colors">Destinations</a></li>
            <li><a href="#" className="hover:text-tan transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-cream/60 text-sm">
            <li><a href="#" className="hover:text-tan transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-tan transition-colors">Rental Policies</a></li>
            <li><a href="#" className="hover:text-tan transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-tan transition-colors">Partner Program</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4 text-cream/60 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-tan" />
              hello@nomadgear.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-tan" />
              1-800-NOMAD-GEAR
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-tan" />
              Portland, Oregon
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40 uppercase tracking-widest font-bold">
        <span>© {new Date().getFullYear()} Nomad Gear Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-cream transition-colors">Privacy</a>
          <a href="#" className="hover:text-cream transition-colors">Terms</a>
          <a href="#" className="hover:text-cream transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
