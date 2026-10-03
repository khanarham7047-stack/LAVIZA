import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MenuItem, Currency } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  currency: Currency;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

type CategoryFilter = 'all' | 'espresso' | 'manual-brew' | 'bakery' | 'signature-cold' | 'teas-botanicals';

export const MenuSection: React.FC<MenuSectionProps> = ({
  currency,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso & Classics' },
    { id: 'manual-brew', label: 'Manual Pour-Overs' },
    { id: 'signature-cold', label: 'Chilled & Cold Drips' },
    { id: 'bakery', label: 'Artisan Bakery & Brunch' },
    { id: 'teas-botanicals', label: 'Teas & Botanicals' },
  ];

  const dietaryOptions = ['all', 'House Specialty', 'Vegan', 'Vegetarian'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary check
      if (selectedDietary !== 'all') {
        if (!item.dietary?.includes(selectedDietary as any)) {
          return false;
        }
      }
      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesNotes = item.flavorNotes.some((n) => n.toLowerCase().includes(query));
        const matchesOrigin = item.origin?.toLowerCase().includes(query) || false;
        return matchesName || matchesDesc || matchesNotes || matchesOrigin;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C88242] block mb-2">
              Daily Roastery & Kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#181411] tracking-tight">
              The Curated Menu
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A4F46] max-w-xl font-light">
              Every coffee is pulled on our custom espresso bar or slow-dripped by hand. Pastries are laminated fresh daily with pure butter in small batches.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E72]" />
            <input
              type="text"
              placeholder="Search beans, notes, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C88242]/30 focus:border-[#C88242] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7E72] hover:text-[#181411]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Functional Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#181411] text-[#FAF7F2] shadow-sm'
                    : 'bg-white/80 text-[#5A4F46] border border-[#E0D7C4] hover:bg-white hover:text-[#181411]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quiet Sub-Filter (Dietary) */}
        <div className="flex items-center gap-4 text-xs text-[#5A4F46] mb-8 pb-4 border-b border-[#E8DFC9]/70 overflow-x-auto">
          <span className="font-semibold text-[#181411] uppercase tracking-wider text-[11px] shrink-0">Filter by:</span>
          {dietaryOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedDietary(opt)}
              className={`transition-colors whitespace-nowrap ${
                selectedDietary === opt
                  ? 'text-[#C88242] font-semibold underline underline-offset-4 decoration-[#C88242]'
                  : 'text-[#6F6358] hover:text-[#181411]'
              }`}
            >
              {opt === 'all' ? 'All Dietary' : opt}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-lg border border-[#E8DFC9] p-8">
            <p className="text-base font-serif text-[#181411]">No matching items found.</p>
            <p className="text-xs text-[#6F6358] mt-1">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#181411] border border-[#DDD3BF] rounded hover:bg-[#FAF7F2]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-[#E8DFC9] rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                {/* Visual Image Slot */}
                {item.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC]/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {item.roastLevel && (
                      <span className="absolute bottom-3 left-3 bg-[#181411]/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded">
                        {item.roastLevel}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F5EFE6] to-[#EAE0D0] p-6 flex flex-col justify-between border-b border-[#E8DFC9]">
                    <div className="flex items-center justify-between text-xs text-[#8C7E72]">
                      <span>{item.category.toUpperCase()}</span>
                      <span>{item.prepTimeMinutes} min prep</span>
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-[#181411]">{item.name}</p>
                      {item.origin && <p className="text-xs text-[#8C7E72] mt-0.5">{item.origin}</p>}
                    </div>
                  </div>
                )}

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Quiet Metadata with typographic separators */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8C7E72] mb-1.5">
                      <span>{item.category.replace('-', ' ').toUpperCase()}</span>
                      {item.origin && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[180px]">{item.origin}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#181411] group-hover:text-[#C88242] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A4F46] font-light leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting Flavor Notes */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-[#5A4F46]">
                      <span className="text-[11px] font-medium text-[#8C7E72]">Notes:</span>
                      {item.flavorNotes.map((note, idx) => (
                        <React.Fragment key={note}>
                          <span className="italic text-[#181411]">{note}</span>
                          {idx < item.flavorNotes.length - 1 && <span aria-hidden="true" className="text-[#C88242]">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Price Baseline and Primary Add CTA */}
                  <div className="pt-4 border-t border-[#F1EBDD] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-[#8C7E72] block">Price</span>
                      <span className="text-lg font-bold text-[#181411] tabular-nums">
                        {currency === 'INR' ? `₹${item.priceINR}` : `$${item.priceUSD.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#5A4F46] hover:text-[#181411] border border-[#DDD3BF] hover:border-[#181411] rounded transition-colors whitespace-nowrap"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => onQuickAdd(item)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#181411] hover:bg-[#C88242] rounded transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
