import React, { useState } from 'react';
import { X, Trash2, ArrowRight, CheckCircle, Tag, ShoppingBag, Receipt, MapPin } from 'lucide-react';
import { CartItem, Currency } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  currency,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [diningMode, setDiningMode] = useState<'dine-in' | 'takeaway' | 'curbside'>('takeaway');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);

  // Checkout confirmation state
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    diningMode: string;
    tableNumber?: string;
  } | null>(null);

  if (!isOpen) return null;

  // Pricing calculations
  const rawSubtotal = items.reduce((acc, item) => {
    const price = currency === 'INR' ? item.unitPriceINR : item.unitPriceUSD;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = rawSubtotal * promoDiscountRate;
  const taxableAmount = rawSubtotal - discountAmount;
  const tax = currency === 'INR' ? taxableAmount * 0.05 : taxableAmount * 0.08; // 5% GST
  const finalTotal = taxableAmount + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FIRSTBREW') {
      setAppliedPromo('FIRSTBREW (15% OFF)');
      setPromoDiscountRate(0.15);
    } else {
      alert('Invalid promo code. Use code "FIRSTBREW" for 15% off your first coffee.');
    }
  };

  const handleProceedCheckout = () => {
    if (items.length === 0) return;

    setConfirmedOrder({
      orderId: `VBC-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      subtotal: rawSubtotal,
      discount: discountAmount,
      tax: tax,
      total: finalTotal,
      diningMode,
      tableNumber: diningMode === 'dine-in' ? tableNumber : undefined,
    });
  };

  const handleFinishOrder = () => {
    setConfirmedOrder(null);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E8DFC9] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C88242]" />
            <h3 className="font-serif text-lg font-bold text-[#181411]">Your Order Bag</h3>
            <span className="text-xs text-[#8C7E72] tabular-nums">({items.length} items)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7E72] hover:text-[#181411] rounded-full hover:bg-[#FAF7F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 flex-1 overflow-y-auto space-y-6 text-center">
            <div className="w-14 h-14 bg-[#EAF5EC] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C88242]">Order Accepted</span>
              <h4 className="font-serif text-2xl font-bold text-[#181411] mt-1">Brewing at the Bar</h4>
              <p className="text-xs text-[#5A4F46] mt-1">
                Order Reference: <span className="font-mono font-bold text-[#181411]">{confirmedOrder.orderId}</span>
              </p>
            </div>

            <div className="bg-white border border-[#E8DFC9] rounded-lg p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-[#8C7E72] pb-2 border-b border-[#F1EBDD]">
                <span>Fulfillment Type</span>
                <span className="font-semibold text-[#181411] capitalize">
                  {confirmedOrder.diningMode} {confirmedOrder.tableNumber && `(${confirmedOrder.tableNumber})`}
                </span>
              </div>
              <div className="flex justify-between text-[#8C7E72]">
                <span>Estimated Time</span>
                <span className="font-semibold text-[#C88242]">12 – 15 Minutes</span>
              </div>

              {/* Items summary */}
              <div className="pt-2 border-t border-[#F1EBDD] space-y-1.5">
                {confirmedOrder.items.map((it) => (
                  <div key={it.cartItemId} className="flex justify-between text-[#181411]">
                    <span>
                      {it.quantity}x {it.menuItem.name}
                    </span>
                    <span className="tabular-nums font-semibold">
                      {currency === 'INR' ? `₹${it.unitPriceINR * it.quantity}` : `$${(it.unitPriceUSD * it.quantity).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F1EBDD] flex justify-between font-bold text-sm text-[#181411]">
                <span>Total Paid</span>
                <span className="tabular-nums">
                  {currency === 'INR' ? `₹${confirmedOrder.total.toFixed(0)}` : `$${confirmedOrder.total.toFixed(2)}`}
                </span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#181411] hover:bg-[#C88242] rounded-md transition-colors"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : (
          /* Normal Cart List View */
          <>
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {/* Order Mode Toggle */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#181411] mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-white border border-[#DDD3BF] rounded-lg text-xs">
                  {[
                    { id: 'takeaway', label: 'Takeaway' },
                    { id: 'dine-in', label: 'Dine-In' },
                    { id: 'curbside', label: 'Curbside' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setDiningMode(mode.id as any)}
                      className={`py-1.5 text-center font-medium rounded-md transition-colors ${
                        diningMode === mode.id
                          ? 'bg-[#181411] text-white shadow-sm'
                          : 'text-[#5A4F46] hover:text-[#181411]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {diningMode === 'dine-in' && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-xs text-[#5A4F46]">Table No:</span>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="px-2.5 py-1 text-xs bg-white border border-[#DDD3BF] rounded w-24 text-center font-bold"
                      placeholder="e.g. Table 8"
                    />
                  </div>
                )}
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-16 text-center text-[#8C7E72]">
                  <ShoppingBag className="w-12 h-12 mx-auto text-[#DDD3BF] mb-2" />
                  <p className="font-serif text-base text-[#181411]">Your bag is currently empty</p>
                  <p className="text-xs text-[#8C7E72] mt-1">Explore our handcrafted espresso and bakery treats.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white border border-[#E8DFC9] rounded-lg p-3.5 flex gap-3 justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#181411] truncate">
                            {item.menuItem.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-[#8C7E72] hover:text-red-600 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization details */}
                        <div className="text-[11px] text-[#8C7E72] space-y-0.5 mt-1">
                          <p>{item.selectedOptions.size} · {item.selectedOptions.temperature}</p>
                          <p>{item.selectedOptions.milk} · {item.selectedOptions.sweetness}</p>
                          {item.selectedOptions.specialInstructions && (
                            <p className="italic text-[#C88242]">Note: "{item.selectedOptions.specialInstructions}"</p>
                          )}
                        </div>

                        {/* Price & Steppers */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#181411] tabular-nums">
                            {currency === 'INR'
                              ? `₹${item.unitPriceINR * item.quantity}`
                              : `$${(item.unitPriceUSD * item.quantity).toFixed(2)}`}
                          </span>

                          <div className="flex items-center border border-[#DDD3BF] rounded bg-[#FAF7F2]">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#5A4F46] hover:text-[#181411]"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#5A4F46] hover:text-[#181411]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              {items.length > 0 && (
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C7E72]" />
                      <input
                        type="text"
                        placeholder="Promo code (try: FIRSTBREW)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD3BF] rounded focus:outline-none focus:ring-1 focus:ring-[#C88242] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold text-[#181411] border border-[#DDD3BF] rounded hover:bg-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-green-700 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Applied: {appliedPromo}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Bottom Checkout Action Area */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E8DFC9] bg-white space-y-3">
                <div className="text-xs space-y-1.5 text-[#5A4F46]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-[#181411]">
                      {currency === 'INR' ? `₹${rawSubtotal}` : `$${rawSubtotal.toFixed(2)}`}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Promo Discount (15%)</span>
                      <span className="tabular-nums">
                        -{currency === 'INR' ? `₹${discountAmount.toFixed(0)}` : `$${discountAmount.toFixed(2)}`}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Taxes & Roastery GST</span>
                    <span className="tabular-nums text-[#181411]">
                      {currency === 'INR' ? `₹${tax.toFixed(0)}` : `$${tax.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between font-serif text-base font-bold text-[#181411] pt-2 border-t border-[#F1EBDD]">
                    <span>Total Amount</span>
                    <span className="tabular-nums">
                      {currency === 'INR' ? `₹${finalTotal.toFixed(0)}` : `$${finalTotal.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#181411] hover:bg-[#C88242] rounded-md transition-colors shadow flex items-center justify-between"
                >
                  <span>Place Coffee Order</span>
                  <span className="flex items-center gap-1">
                    <span className="tabular-nums">
                      {currency === 'INR' ? `₹${finalTotal.toFixed(0)}` : `$${finalTotal.toFixed(2)}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
