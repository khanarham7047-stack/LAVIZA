import React, { useState } from 'react';
import { X, Check, Coffee } from 'lucide-react';
import { MenuItem, Currency, CartItemOption } from '../types/cafe';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CartItemOption, quantity: number) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeverage = item.category === 'espresso' || item.category === 'manual-brew' || item.category === 'signature-cold' || item.category === 'teas-botanicals';

  const [size, setSize] = useState<CartItemOption['size']>('Regular (240ml)');
  const [milk, setMilk] = useState<CartItemOption['milk']>('Whole Milk');
  const [sweetness, setSweetness] = useState<CartItemOption['sweetness']>('No Sugar');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    item.category === 'signature-cold' ? 'Iced' : 'Hot'
  );
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate extra cost for milk/size
  const calculateExtra = () => {
    let extraINR = 0;
    let extraUSD = 0;

    if (size === 'Large (350ml)') {
      extraINR += 50;
      extraUSD += 0.8;
    }

    if (milk === 'Oat Milk (+₹40)') {
      extraINR += 40;
      extraUSD += 0.5;
    } else if (milk === 'Almond Milk (+₹50)') {
      extraINR += 50;
      extraUSD += 0.65;
    } else if (milk === 'Pistachio Cream (+₹60)') {
      extraINR += 60;
      extraUSD += 0.85;
    }

    return { extraINR, extraUSD };
  };

  const { extraINR, extraUSD } = calculateExtra();
  const currentUnitPriceINR = item.priceINR + extraINR;
  const currentUnitPriceUSD = item.priceUSD + extraUSD;
  const totalPrice = currency === 'INR' 
    ? `₹${currentUnitPriceINR * quantity}` 
    : `$${(currentUnitPriceUSD * quantity).toFixed(2)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(
      item,
      {
        size,
        milk,
        sweetness,
        temperature,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#DDD3BF] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C88242]">Customise Preparation</span>
            <h3 className="font-serif text-xl font-bold text-[#181411]">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7E72] hover:text-[#181411] rounded-full hover:bg-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {isBeverage && (
            <>
              {/* Cup Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181411] mb-2">
                  Serving Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Regular (240ml)', 'Large (350ml)'] as const).map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSize(s)}
                      className={`p-3 text-left border rounded-lg transition-all ${
                        size === s
                          ? 'border-[#C88242] bg-[#FAF3EA] text-[#181411] ring-1 ring-[#C88242]'
                          : 'border-[#DDD3BF] bg-white text-[#5A4F46] hover:border-[#8C7E72]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{s}</span>
                      <span className="block text-[11px] text-[#8C7E72] mt-0.5">
                        {s.includes('Large') ? (currency === 'INR' ? '+₹50' : '+$0.80') : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181411] mb-2">
                  Brew Temperature
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Hot', 'Iced'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTemperature(t)}
                      className={`py-2.5 px-4 text-center text-xs font-semibold border rounded-lg transition-colors ${
                        temperature === t
                          ? 'border-[#181411] bg-[#181411] text-white'
                          : 'border-[#DDD3BF] bg-white text-[#5A4F46] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {t === 'Hot' ? '☕ Fresh Steamed Hot' : '🧊 Shaken Over Artisanal Ice'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181411] mb-2">
                  Milk or Plant Base
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {([
                    'Whole Milk',
                    'Oat Milk (+₹40)',
                    'Almond Milk (+₹50)',
                    'Pistachio Cream (+₹60)',
                    'No Milk (Black)'
                  ] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`p-2.5 text-left border rounded-md transition-all flex items-center justify-between ${
                        milk === m
                          ? 'border-[#C88242] bg-[#FAF3EA] text-[#181411] font-semibold ring-1 ring-[#C88242]'
                          : 'border-[#DDD3BF] bg-white text-[#5A4F46] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="truncate">{m}</span>
                      {milk === m && <Check className="w-3.5 h-3.5 text-[#C88242] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#181411] mb-2">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {(['No Sugar', '50% Subtle', 'Standard', 'Organic Jaggery / Maple'] as const).map((sw) => (
                    <button
                      type="button"
                      key={sw}
                      onClick={() => setSweetness(sw)}
                      className={`p-2 text-center border rounded-md transition-all ${
                        sweetness === sw
                          ? 'border-[#C88242] bg-[#FAF3EA] text-[#181411] font-semibold'
                          : 'border-[#DDD3BF] bg-white text-[#5A4F46] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Special Barista Request */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#181411] mb-1.5">
              Special Request / Allergy Note
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, decaf shot, extra cinnamon powder..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
            />
          </div>

          {/* Quantity Stepper & Add to Order Bar */}
          <div className="pt-4 border-t border-[#E8DFC9] flex items-center justify-between gap-4">
            <div className="flex items-center border border-[#DDD3BF] rounded-md bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm font-bold text-[#5A4F46] hover:text-[#181411]"
              >
                -
              </button>
              <span className="px-3 py-1.5 text-xs font-bold text-[#181411] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-sm font-bold text-[#5A4F46] hover:text-[#181411]"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              className="flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#181411] hover:bg-[#C88242] rounded-md transition-colors shadow flex items-center justify-between"
            >
              <span>Add to Order Bag</span>
              <span className="tabular-nums font-bold">{totalPrice}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
