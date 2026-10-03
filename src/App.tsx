/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Currency, MenuItem, CartItem, CartItemOption } from './types/cafe';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { InteractiveBrewFinder } from './components/InteractiveBrewFinder';
import { ReservationSection } from './components/ReservationSection';
import { RoasteryStory } from './components/RoasteryStory';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitHoursSection } from './components/VisitHoursSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vb_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('vb_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignored
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  // Quick add with default settings
  const handleQuickAdd = (item: MenuItem) => {
    const defaultOptions: CartItemOption = {
      size: 'Regular (240ml)',
      milk: item.category === 'espresso' ? 'Whole Milk' : 'No Milk (Black)',
      sweetness: 'No Sugar',
      temperature: item.category === 'signature-cold' ? 'Iced' : 'Hot',
    };

    handleAddToCart(item, defaultOptions, 1);
  };

  // Add customized item
  const handleAddToCart = (item: MenuItem, options: CartItemOption, quantity: number) => {
    let extraINR = 0;
    let extraUSD = 0;

    if (options.size === 'Large (350ml)') {
      extraINR += 50;
      extraUSD += 0.8;
    }
    if (options.milk === 'Oat Milk (+₹40)') {
      extraINR += 40;
      extraUSD += 0.5;
    } else if (options.milk === 'Almond Milk (+₹50)') {
      extraINR += 50;
      extraUSD += 0.65;
    } else if (options.milk === 'Pistachio Cream (+₹60)') {
      extraINR += 60;
      extraUSD += 0.85;
    }

    const unitPriceINR = item.priceINR + extraINR;
    const unitPriceUSD = item.priceUSD + extraUSD;

    const cartItemId = `${item.id}-${options.size}-${options.milk}-${options.sweetness}-${options.temperature}-${options.specialInstructions || ''}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            menuItem: item,
            quantity,
            selectedOptions: options,
            unitPriceINR,
            unitPriceUSD,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${item.name}" to your order bag`);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181411] flex flex-col font-sans selection:bg-[#C88242] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onReserveTable={() => scrollToSection('reservation')}
          onOpenBrewFinder={() => scrollToSection('brew-finder')}
        />

        <MenuSection
          currency={currency}
          onSelectItem={(item) => setItemToCustomize(item)}
          onQuickAdd={handleQuickAdd}
        />

        <InteractiveBrewFinder
          currency={currency}
          onSelectRecommended={(item) => setItemToCustomize(item)}
        />

        <ReservationSection />

        <RoasteryStory />

        <ReviewsSection />

        <VisitHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customizer Modal */}
      {itemToCustomize && (
        <ItemCustomizeModal
          item={itemToCustomize}
          currency={currency}
          onClose={() => setItemToCustomize(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-out Order Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        currency={currency}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#181411] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-bold text-[#E29C56] hover:underline"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Floating Action Button on Mobile when items in cart */}
      {totalCartItemCount > 0 && !isCartOpen && (
        <div className="sm:hidden fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#181411] text-white rounded-full shadow-2xl border border-white/20 text-xs font-bold"
          >
            <ShoppingBag className="w-4 h-4 text-[#E29C56]" />
            <span>Bag ({totalCartItemCount})</span>
          </button>
        </div>
      )}

    </div>
  );
}
