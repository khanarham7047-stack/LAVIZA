import React from 'react';
import { ROASTERY_IMAGE } from '../data/cafeData';
import { Flame, Compass, Leaf, Award } from 'lucide-react';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#181411] text-[#FAF7F2] border-b border-[#2A221C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Showcase Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={ROASTERY_IMAGE}
                alt="Artisan inspecting freshly roasted coffee beans beside a vintage drum roaster"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181411]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#181411]/90 backdrop-blur-md p-3.5 rounded border border-white/10 text-xs">
                <p className="font-semibold text-white">Roastmaster's Daily Cupping</p>
                <p className="text-[11px] text-[#EFE8DC]/70 mt-0.5">
                  Batch No. 842 · Washed Yirgacheffe & Estate Monsooned Malabar
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E29C56] block mb-2">
                Our Sourcing Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Slow Roasting, Direct Partnerships & Honest Terroir
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#EFE8DC]/80 font-light leading-relaxed">
              We started Velvet & Bean with a quiet conviction: coffee shouldn't be rushed or burnt into bitter uniformity. We partner directly with multigenerational coffee farmers in the misty Western Ghats of Chikmagalur, Araku Valley, and Ethiopia’s high plateaus.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Compass className="w-5 h-5 text-[#E29C56] mb-2" />
                <h4 className="font-medium text-sm text-white">Direct-Trade Transparency</h4>
                <p className="text-xs text-[#EFE8DC]/70 mt-1 font-light leading-relaxed">
                  We pay 45% above Fair Trade minimums directly to farm cooperatives, supporting soil regeneration.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Flame className="w-5 h-5 text-[#E29C56] mb-2" />
                <h4 className="font-medium text-sm text-white">Cast-Iron Micro Roasting</h4>
                <p className="text-xs text-[#EFE8DC]/70 mt-1 font-light leading-relaxed">
                  Roasted in gentle 5kg micro-batches to preserve delicate citric acidity and floral aromatics.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Leaf className="w-5 h-5 text-[#E29C56] mb-2" />
                <h4 className="font-medium text-sm text-white">Circular Grounds Program</h4>
                <p className="text-xs text-[#EFE8DC]/70 mt-1 font-light leading-relaxed">
                  100% of spent espresso grinds are composted with local urban gardens and botanical sanctuaries.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Award className="w-5 h-5 text-[#E29C56] mb-2" />
                <h4 className="font-medium text-sm text-white">The 14-Day Freshness Rule</h4>
                <p className="text-xs text-[#EFE8DC]/70 mt-1 font-light leading-relaxed">
                  Every bean on bar is rested for 5 days and brewed within 14 days of roast date for peak aromatics.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
