
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I return the gear?",
    answer: "Returning gear is simple. We provide a prepaid shipping label and a reusable box. Just pack the gear back in, drop it off at any authorized shipping center on your return date, and we'll handle the rest."
  },
  {
    question: "Is the gear cleaned between rentals?",
    answer: "Absolutely. We follow a rigorous 5-step sanitization process for all equipment. Tents are air-dried and UV-treated, while sleeping bags are professionally laundered with eco-friendly detergents."
  },
  {
    question: "What happens if I damage something?",
    answer: "Normal wear and tear is expected and covered. For significant damage or loss, we offer an optional 'Adventure Protection' plan for $15 that covers you against accidental tears, broken poles, or stains."
  },
  {
    question: "Do you deliver to camp-sites?",
    answer: "We primarily deliver to residential addresses and hotels. However, we can deliver to select trailhead lockers or partner ranger stations in major National Parks. Check the delivery options at checkout."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-cream/50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-sage mx-auto mb-4 opacity-20" />
          <h2 className="text-4xl font-bold text-sage-dark">Common Questions</h2>
          <p className="text-sage-dark/60 mt-4">Everything you need to know before your first adventure.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl overflow-hidden border border-sage/5 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-sage/5 transition-colors"
              >
                <span className="font-bold text-sage-dark">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full bg-sage/5 flex items-center justify-center text-sage transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-sage-dark/70 text-sm leading-relaxed border-t border-sage/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
