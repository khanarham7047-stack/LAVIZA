import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { MenuItem, Currency } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface InteractiveBrewFinderProps {
  currency: Currency;
  onSelectRecommended: (item: MenuItem) => void;
}

export const InteractiveBrewFinder: React.FC<InteractiveBrewFinderProps> = ({
  currency,
  onSelectRecommended,
}) => {
  const [texture, setTexture] = useState<string>('milky');
  const [flavor, setFlavor] = useState<string>('nutty');
  const [caffeine, setCaffeine] = useState<string>('high');

  // Match logic based on choices
  const getRecommendation = (): MenuItem => {
    if (caffeine === 'decaf') {
      return MENU_ITEMS.find((m) => m.id === 'cascara-rose-tonic') || MENU_ITEMS[0];
    }
    if (texture === 'chilled') {
      return MENU_ITEMS.find((m) => m.id === 'spanish-iced-latte') || MENU_ITEMS[1];
    }
    if (texture === 'clean' || flavor === 'fruity') {
      return MENU_ITEMS.find((m) => m.id === 'ethiopia-yirgacheffe-v60') || MENU_ITEMS[4];
    }
    if (texture === 'bold') {
      return MENU_ITEMS.find((m) => m.id === 'cortado-caramelized') || MENU_ITEMS[3];
    }
    return MENU_ITEMS.find((m) => m.id === 'cappuccino-artisan') || MENU_ITEMS[0];
  };

  const matched = getRecommendation();

  return (
    <section id="brew-finder" className="py-20 bg-[#F5EFE6] border-b border-[#E8DFC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C88242] block mb-2">
            The Sensory Palette
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181411]">
            Find Your Signature Brew
          </h2>
          <p className="mt-2 text-sm text-[#5A4F46] font-light">
            Tell us how you like your coffee today and our sensory algorithm will recommend your ideal single-origin roast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quiz Selector Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E0D7C4] shadow-sm space-y-6">
            
            {/* Step 1: Preferred Style */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2.5">
                1. Cup Texture & Style
              </label>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {[
                  { id: 'milky', label: 'Silky & Micro-Foamed', desc: 'Steamed milk or plant base' },
                  { id: 'clean', label: 'Clean & Floral Drip', desc: 'Clarity & tea-like body' },
                  { id: 'bold', label: 'Short & Punchy', desc: 'Dense espresso & cortado' },
                  { id: 'chilled', label: 'Chilled Over Ice', desc: 'Slow-drip or shaken iced' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTexture(opt.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      texture === opt.id
                        ? 'border-[#C88242] bg-[#FAF3EA] text-[#181411] ring-1 ring-[#C88242]'
                        : 'border-[#E8DFC9] bg-white text-[#5A4F46] hover:border-[#8C7E72]'
                    }`}
                  >
                    <span className="font-semibold block">{opt.label}</span>
                    <span className="text-[11px] text-[#8C7E72] mt-0.5 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2.5">
                2. Flavor Preference
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'nutty', label: 'Chocolate & Hazelnut', hint: 'Warm & Comforting' },
                  { id: 'fruity', label: 'Citrus, Jasmine & Peach', hint: 'Bright & Crisp' },
                  { id: 'caramel', label: 'Molasses & Caramel', hint: 'Rich Sweetness' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlavor(f.id)}
                    className={`p-2.5 text-left border rounded-lg transition-all ${
                      flavor === f.id
                        ? 'border-[#C88242] bg-[#FAF3EA] text-[#181411] ring-1 ring-[#C88242]'
                        : 'border-[#E8DFC9] bg-white text-[#5A4F46] hover:border-[#8C7E72]'
                    }`}
                  >
                    <span className="font-semibold block">{f.label}</span>
                    <span className="text-[10px] text-[#8C7E72] mt-0.5 block">{f.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Intensity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2.5">
                3. Caffeine & Mood
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'high', label: 'High Kick (Double Shot)' },
                  { id: 'medium', label: 'Gentle & Balanced' },
                  { id: 'decaf', label: 'Low / Decaf Botanical' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCaffeine(c.id)}
                    className={`p-2.5 text-center border rounded-lg transition-all ${
                      caffeine === c.id
                        ? 'border-[#181411] bg-[#181411] text-white font-semibold'
                        : 'border-[#E8DFC9] bg-white text-[#5A4F46] hover:border-[#8C7E72]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Matched Brew Output Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#181411] text-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between border border-[#2A221C]">
            <div>
              <div className="flex items-center gap-2 text-[#E29C56] text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                Your Barista Match
              </div>

              <h3 className="font-serif text-2xl font-normal text-[#FAF7F2] mb-2">
                {matched.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#EFE8DC]/80 font-light leading-relaxed mb-4">
                {matched.description}
              </p>

              {matched.origin && (
                <div className="py-2.5 px-3 bg-white/5 border border-white/10 rounded-lg text-xs text-[#EFE8DC] mb-4">
                  <span className="text-[#E29C56] font-medium block text-[11px]">Origin Terroir:</span>
                  <span>{matched.origin}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#EFE8DC]/90 mb-4">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-[#8C7E72]">Aroma Notes</span>
                  <span className="font-medium text-white">{matched.flavorNotes.join(' · ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-[#8C7E72]">Roast Profile</span>
                  <span className="font-medium text-white">{matched.roastLevel || 'Artisan Medium'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8C7E72]">Price</span>
                  <span className="font-bold text-white tabular-nums text-sm">
                    {currency === 'INR' ? `₹${matched.priceINR}` : `$${matched.priceUSD.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <button
                type="button"
                onClick={() => onSelectRecommended(matched)}
                className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#181411] bg-[#FAF7F2] hover:bg-white rounded-md transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Select & Customize This Brew</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C88242]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
