'use client';

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CURRENCIES, CurrencyCode, Product } from '@/lib/store-data';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductQuickView({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const activeSize = selectedSize || product.sizes[0];
  const curr = CURRENCIES[currency];
  const formatPrice = (usd: number) => {
    const val = usd * curr.rate;
    return currency === 'JPY'
      ? `${curr.symbol}${Math.round(val).toLocaleString()}`
      : `${curr.symbol}${val.toFixed(2)}`;
  };

  const handleAdd = () => {
    onAddToCart(product, activeSize);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[760px] bg-[#141416] border border-white/15 rounded-[10px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Studio Image Showcase */}
        <div className="bg-[#222224] p-6 sm:p-8 flex flex-col justify-between items-center relative min-h-[280px]">
          <div className="w-full flex items-center justify-between">
            {product.isNew ? (
              <span className="bg-[#9EFF00] text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-[2px]">
                NEW DROP
              </span>
            ) : (
              <span className="text-[10px] font-mono text-neutral-400">
                SKU: {product.sku}
              </span>
            )}
          </div>

          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full max-h-[240px] object-contain my-4"
          />

          <div className="w-full flex items-center justify-between text-[10px] text-neutral-400">
            <span>{product.brand}</span>
            <span>SKU: {product.sku}</span>
          </div>
        </div>

        {/* Right Purchase Module */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#F4511E]">
              {product.category} · {product.brand}
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none">
              {product.name}
            </h2>
            <p className="mt-1 text-xs text-neutral-400 font-medium">
              Colorway: <strong className="text-neutral-200">{product.subtitle}</strong>
            </p>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-xl font-extrabold text-white tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-500 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold uppercase tracking-wider text-neutral-300">
                  Select Size
                </span>
                <span className="text-neutral-400">True to size</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-2 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                      activeSize === sz
                        ? 'bg-[#F4511E] text-white border border-[#F4511E]'
                        : 'bg-[#1E1E22] text-neutral-300 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase tracking-[0.08em] py-3.5 px-5 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {addedFeedback ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG — {formatPrice(product.price)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-[4px] border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#F4511E] bg-[#F4511E]/15 text-[#F4511E]'
                    : 'border-white/20 text-neutral-300 hover:border-white'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#F4511E]' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#9EFF00] shrink-0" />
              <span>100% Authentic Guaranteed · Ships within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
