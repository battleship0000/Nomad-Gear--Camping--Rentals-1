
import React, { useState } from 'react';
import { X, Calendar, MapPin, CreditCard, CheckCircle, Package } from 'lucide-react';
import { Package as PackageType } from '../types';

interface BookingModalProps {
  pkg: PackageType | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ pkg, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!pkg) return null;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-sage-dark/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-cream rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-sage/5 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6 text-sage-dark" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/3 bg-sage p-8 text-cream">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Review Order</span>
              <h3 className="text-2xl font-bold mt-2">Rental Summary</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-bold">{pkg.name}</p>
                  <p className="text-xs opacity-60">{pkg.capacity}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-bold">{pkg.duration}</p>
                  <p className="text-xs opacity-60">Flexible start dates</p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-6 border-t border-cream/10">
              <div className="flex justify-between items-end">
                <span className="text-sm opacity-60">Total</span>
                <span className="text-3xl font-bold">${pkg.price}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-10 bg-white">
            {step === 1 && (
              <div className="animate-fade-up">
                <h4 className="text-xl font-bold mb-6">Adventure Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none focus:ring-2 focus:ring-sage focus:outline-none" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2">Delivery Address</label>
                    <input type="text" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none focus:ring-2 focus:ring-sage focus:outline-none" placeholder="123 Wilderness Lane" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2">Start Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none focus:ring-2 focus:ring-sage focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2">End Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none focus:ring-2 focus:ring-sage focus:outline-none" />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-8 py-4 bg-sage text-cream font-bold rounded-2xl hover:bg-sage-dark transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-up">
                <h4 className="text-xl font-bold mb-6">Payment Method</h4>
                <div className="p-4 border-2 border-sage rounded-2xl flex items-center gap-4 mb-4">
                  <CreditCard className="w-6 h-6 text-sage" />
                  <span className="font-medium flex-1">Credit or Debit Card</span>
                  <div className="w-4 h-4 rounded-full border-4 border-sage" />
                </div>
                <div className="space-y-4">
                  <input type="text" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none" placeholder="Card Number" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none" placeholder="MM/YY" />
                    <input type="text" className="w-full px-4 py-3 bg-sage/5 rounded-xl border-none" placeholder="CVC" />
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full mt-8 py-4 bg-tan text-white font-bold rounded-2xl hover:bg-brown transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirm Booking'}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-12 animate-fade-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-sage-dark mb-4">Adventure Confirmed!</h4>
                <p className="text-sage-dark/60 mb-8">
                  We've sent a confirmation email to your inbox. Your gear will arrive 24 hours before your start date.
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-sage text-cream font-bold rounded-2xl"
                >
                  Great, thanks!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
