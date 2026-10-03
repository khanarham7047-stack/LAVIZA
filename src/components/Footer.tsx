import React from 'react';
import { Coffee, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181411] text-[#EFE8DC] border-t border-[#2A221C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              VELVET & BEAN
            </span>
            <p className="text-xs text-[#EFE8DC]/70 font-light leading-relaxed">
              An artisanal roastery & botanical café committed to single-origin integrity, slow living, and hospitality.
            </p>
            <div className="pt-2 text-xs text-[#E29C56] font-medium">
              Estate Coffee · In-House Bakery · Direct Trade
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">The Café</h4>
            <ul className="space-y-2 text-[#EFE8DC]/70">
              <li><a href="#menu" className="hover:text-white transition-colors">Daily Roastery Menu</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Direct-Trade Coffee Farmers</a></li>
              <li><a href="#brew-finder" className="hover:text-white transition-colors">Sensory Brew Recommender</a></li>
              <li><a href="#reservation" className="hover:text-white transition-colors">Reserve Conservatory Table</a></li>
            </ul>
          </div>

          {/* Offerings */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Specialty Offerings</h4>
            <ul className="space-y-2 text-[#EFE8DC]/70">
              <li>Single-Origin Whole Bean Tins</li>
              <li>Viennoiserie French Bakery Boxes</li>
              <li>18-Hour Kyoto Slow-Drip Cold Brew</li>
              <li>Barista Workshops & Cupping Sessions</li>
            </ul>
          </div>

          {/* Flagships */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Flagships</h4>
            <div className="text-[#EFE8DC]/70 space-y-2">
              <p>
                <strong className="text-white">Connaught Place:</strong> Regal Colonnade, Inner Circle, New Delhi
              </p>
              <p>
                <strong className="text-white">Bandra West:</strong> 14 Union Park, Off Carter Road, Mumbai
              </p>
              <p className="text-[#E29C56] pt-1">
                Open Daily: 07:30 AM – 11:30 PM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFE8DC]/50 gap-4">
          <p>© {new Date().getFullYear()} Velvet & Bean Roasters Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>SCA Certified Specialty Coffee</span>
            <span>Zero Single-Use Plastic</span>
            <span>A2 Dairy & Vegan Friendly</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
