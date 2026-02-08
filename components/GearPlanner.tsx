
import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { getGearRecommendation } from '../services/geminiService.ts';
import { PACKAGES } from '../constants.tsx';
import { Package } from '../types.ts';

interface GearPlannerProps {
  onSelectPackage: (pkg: Package) => void;
}

const GearPlanner: React.FC<GearPlannerProps> = ({ onSelectPackage }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [error, setError] = useState('');

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    try {
      const result = await getGearRecommendation(input);
      setRecommendation(result);
    } catch (err) {
      setError('Could not get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRecommended = () => {
    if (!recommendation) return;
    const pkg = PACKAGES.find(p => p.name.toLowerCase() === recommendation.recommendedPackage.toLowerCase());
    if (pkg) {
      onSelectPackage(pkg);
    }
  };

  return (
    <section id="planner" className="py-24 bg-sage-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tan/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-tan/20 text-tan rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3 h-3" />
          AI Powered
        </div>
        <h2 className="text-4xl font-bold text-cream mb-6">AI Trip Planner</h2>
        <p className="text-cream/70 mb-10 max-w-2xl mx-auto">
          Not sure what you need? Describe your trip details and our AI will suggest the perfect gear package based on destination, weather, and group size.
        </p>

        <form onSubmit={handlePlanTrip} className="mb-12">
          <div className="relative group">
            <textarea
              className="w-full bg-cream/10 border border-cream/20 rounded-3xl p-6 text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-tan/50 transition-all resize-none h-32"
              placeholder="e.g. Going to Yosemite for a 3-day hike with 2 friends in late October. It might be cold."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 px-6 py-3 bg-tan text-sage-dark font-bold rounded-full hover:bg-cream transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Generate Plan
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-200 flex items-center gap-3 justify-center mb-8">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {recommendation && (
          <div className="bg-cream rounded-3xl p-8 text-left shadow-2xl animate-fade-up">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-sage-dark text-xs font-bold uppercase tracking-widest mb-2">Recommended Package</h3>
                <p className="text-3xl font-bold text-sage-dark mb-4">{recommendation.recommendedPackage}</p>
                <p className="text-sage-dark/70 mb-6 leading-relaxed">
                  {recommendation.explanation}
                </p>
                <button 
                  onClick={handleBookRecommended}
                  className="inline-block px-8 py-4 bg-sage text-cream font-bold rounded-full hover:bg-sage-dark transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Book This Package
                </button>
              </div>
              <div className="w-full md:w-72 bg-sage/5 rounded-2xl p-6 border border-sage/10">
                <h4 className="text-sage-dark font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  Adventure Tips
                </h4>
                <ul className="space-y-4">
                  {recommendation.tips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-sage-dark/80 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-tan shrink-0 mt-1.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GearPlanner;
