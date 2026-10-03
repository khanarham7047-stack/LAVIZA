import React from 'react';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
  onOpenBrewFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onReserveTable,
  onOpenBrewFinder,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#181411] text-[#FAF7F2]">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Artisanal interior of Velvet & Bean Roastery Cafe with warm lighting, wood and travertine counters"
          className="w-full h-full object-cover object-center brightness-90 scale-[1.02] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181411]/95 via-[#181411]/85 to-[#181411]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181411] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl space-y-6">
          
          {/* Quiet status line without pill boxes */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide uppercase text-[#E29C56]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E29C56] animate-ping" />
            <span className="text-[#FAF7F2]">Open Daily 7:30 AM – 11:00 PM</span>
            <span aria-hidden="true" className="text-[#E29C56]/60">·</span>
            <span className="flex items-center gap-1 text-[#EFE8DC]/80">
              <MapPin className="w-3.5 h-3.5 text-[#E29C56]" />
              Connaught Place & Bandra Heritage Quarter
            </span>
          </div>

          {/* Main Display Headline with text-wrap balance */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-white tracking-tight [text-wrap:balance]">
            Where Artisanal Roasting Meets Slow, Thoughtful Mornings
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-[#EFE8DC]/90 font-light leading-relaxed max-w-2xl">
            Ethically sourced heirloom coffees from high-altitude estates in Chikmagalur and Yirgacheffe, small-batch roasted on vintage cast-iron drums and poured alongside pure French butter Viennoiserie pastries.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3.5 text-sm font-semibold tracking-wide uppercase text-[#181411] bg-[#FAF7F2] hover:bg-white rounded-md transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2 whitespace-nowrap"
            >
              Explore Menu
              <ArrowRight className="w-4 h-4 text-[#C88242]" />
            </button>

            <button
              onClick={onReserveTable}
              className="px-6 py-3.5 text-sm font-semibold tracking-wide uppercase text-[#FAF7F2] bg-[#C88242] hover:bg-[#b57335] rounded-md transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap"
            >
              Book a Table
            </button>

            <button
              onClick={onOpenBrewFinder}
              className="px-5 py-3.5 text-sm font-medium text-[#EFE8DC] hover:text-white border border-[#FAF7F2]/20 hover:border-[#FAF7F2]/60 rounded-md transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#E29C56]" />
              Find Your Ideal Cup
            </button>
          </div>

          {/* Quantitative Rigor & Trust markers */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[#FAF7F2]/15 text-[#EFE8DC]">
            <div>
              <p className="font-serif text-2xl font-bold text-white tabular-nums">100%</p>
              <p className="text-xs text-[#EFE8DC]/70 font-light mt-0.5">Direct-Trade Single Origins</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-white tabular-nums">05:30 AM</p>
              <p className="text-xs text-[#EFE8DC]/70 font-light mt-0.5">Daily In-House Pastry Lamination</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-2xl font-bold text-white tabular-nums">86+ SCA</p>
              <p className="text-xs text-[#EFE8DC]/70 font-light mt-0.5">Specialty Grade Cupping Score</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
