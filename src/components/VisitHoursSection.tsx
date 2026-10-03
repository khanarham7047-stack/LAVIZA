import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Dog, Car, Coffee, Send, Check } from 'lucide-react';

export const VisitHoursSection: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section id="visit" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C88242] block mb-2">
            Sanctuary & Flagships
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181411]">
            Visit Velvet & Bean
          </h2>
          <p className="mt-2 text-sm text-[#5A4F46] font-light">
            Designed as quiet urban sanctuaries with natural botanical light, high-speed connectivity, and warm acoustic jazz.
          </p>
        </div>

        {/* 2 Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Location 1 */}
          <div className="bg-white border border-[#E8DFC9] rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C88242] mb-2">
                <MapPin className="w-4 h-4" />
                Delhi Roastery & Conservatory
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181411]">Connaught Place, Inner Circle</h3>
              <p className="text-xs sm:text-sm text-[#5A4F46] mt-2 font-light leading-relaxed">
                Block D, Regal Colonnade, Inner Circle, Connaught Place, New Delhi 110001
              </p>

              {/* Operating Hours */}
              <div className="mt-6 pt-4 border-t border-[#F1EBDD] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#181411]">
                  <span className="text-[#8C7E72] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C88242]" />
                    Monday – Friday
                  </span>
                  <span className="font-semibold tabular-nums">07:30 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-[#181411]">
                  <span className="text-[#8C7E72] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C88242]" />
                    Saturday & Sunday
                  </span>
                  <span className="font-semibold tabular-nums">07:00 AM – 11:30 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F1EBDD] flex items-center justify-between">
              <span className="text-xs text-[#8C7E72]">Phone: +91 11 4982 3011</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#181411] hover:text-[#C88242] underline underline-offset-4 decoration-[#C88242]"
              >
                Directions on Map →
              </a>
            </div>
          </div>

          {/* Location 2 */}
          <div className="bg-white border border-[#E8DFC9] rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C88242] mb-2">
                <MapPin className="w-4 h-4" />
                Mumbai Botanical Espresso Bar
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#181411]">Pali Hill, Bandra West</h3>
              <p className="text-xs sm:text-sm text-[#5A4F46] mt-2 font-light leading-relaxed">
                14 Union Park, Off Carter Road, Bandra West, Mumbai, Maharashtra 400052
              </p>

              {/* Operating Hours */}
              <div className="mt-6 pt-4 border-t border-[#F1EBDD] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#181411]">
                  <span className="text-[#8C7E72] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C88242]" />
                    Monday – Friday
                  </span>
                  <span className="font-semibold tabular-nums">07:00 AM – 11:30 PM</span>
                </div>
                <div className="flex justify-between items-center text-[#181411]">
                  <span className="text-[#8C7E72] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C88242]" />
                    Saturday & Sunday
                  </span>
                  <span className="font-semibold tabular-nums">07:00 AM – Midnight</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F1EBDD] flex items-center justify-between">
              <span className="text-xs text-[#8C7E72]">Phone: +91 22 2640 8820</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#181411] hover:text-[#C88242] underline underline-offset-4 decoration-[#C88242]"
              >
                Directions on Map →
              </a>
            </div>
          </div>

        </div>

        {/* Cafe Amenities Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#EFE8DC]/50 rounded-xl border border-[#E0D7C4] text-[#181411] mb-16">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-[#C88242] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">350 Mbps Fibre</p>
              <p className="text-[11px] text-[#5A4F46]">Work-friendly tables</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dog className="w-5 h-5 text-[#C88242] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">Pet Friendly</p>
              <p className="text-[11px] text-[#5A4F46]">Garden terrace with water bowls</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-[#C88242] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">Valet Parking</p>
              <p className="text-[11px] text-[#5A4F46]">Complimentary for guests</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Coffee className="w-5 h-5 text-[#C88242] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">Fresh Bean Counter</p>
              <p className="text-[11px] text-[#5A4F46]">Custom grind for V60/French Press</p>
            </div>
          </div>
        </div>

        {/* Roasted Bean Drops Newsletter */}
        <div className="bg-[#181411] text-white p-8 rounded-xl border border-[#2A221C] text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#E29C56] block mb-2">
            The Roaster's Ledger
          </span>
          <h3 className="font-serif text-2xl font-normal">Receive First Access to Rare Microlot Drops</h3>
          <p className="text-xs sm:text-sm text-[#EFE8DC]/70 max-w-md mx-auto mt-2 font-light">
            Subscribe for cupping invitations, harvest updates, and 10% off your first bean bag order.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs text-white bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E29C56] placeholder-white/40"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#181411] bg-[#FAF7F2] hover:bg-white rounded-md transition-colors shrink-0 inline-flex items-center justify-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-green-700" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#C88242]" />
                  Join Ledger
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
