import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Volume2, VolumeX } from 'lucide-react';
import { Currency } from '../types/cafe';
import { ambientAudio } from '../utils/ambientAudio';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const nextState = ambientAudio.toggle();
    setIsAudioPlaying(nextState);
  };

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Craft & Story', href: '#story' },
    { label: 'Brew Finder', href: '#brew-finder' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit & Hours', href: '#visit' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-[#181411] hover:text-[#C88242] transition-colors">
          VELVET & BEAN
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A4F46]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#181411] hover:underline underline-offset-8 decoration-[#C88242] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Ambient Sound Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioPlaying ? 'Mute ambient cafe sounds' : 'Play ambient cafe atmosphere'}
            className="p-2 text-[#5A4F46] hover:text-[#181411] transition-colors rounded-md hover:bg-[#EFE8DC]/60"
            aria-label="Toggle ambient coffee shop sound"
          >
            {isAudioPlaying ? <Volume2 className="w-5 h-5 text-[#C88242] animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="px-2.5 py-1 text-xs font-semibold tracking-wider text-[#5A4F46] hover:text-[#181411] border border-[#DDD3BF] rounded hover:bg-[#EFE8DC]/50 transition-colors tabular-nums"
            title="Switch Currency"
          >
            {currency === 'INR' ? '₹ INR' : '$ USD'}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-[#181411] hover:text-[#C88242] transition-colors rounded-lg hover:bg-[#EFE8DC]/60"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-[#C88242] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve Table Primary Button */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-[#181411] hover:bg-[#2A221C] rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E29C56]" />
            Reserve Table
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#181411] hover:text-[#C88242]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFC9] bg-[#FAF7F2] px-6 py-5 space-y-4 shadow-lg animate-in fade-in">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#40352C]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C88242] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E8DFC9] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#181411] rounded-md"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
