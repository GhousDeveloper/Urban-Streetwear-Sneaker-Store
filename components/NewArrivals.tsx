'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Plus, Eye } from 'lucide-react';
import { CURRENCIES, CurrencyCode, Product } from '@/lib/store-data';

interface NewArrivalsProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  currency: CurrencyCode;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export default function NewArrivals({
  products,
  activeCategory,
  onSelectCategory,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}: NewArrivalsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({});

  const curr = CURRENCIES[currency];

  // Filter products if a specific category or Sale is selected
  const filteredProducts = products.filter((p) => {
    if (!activeCategory || activeCategory === 'All' || activeCategory === 'Brands') return true;
    if (activeCategory === 'Sale') return Boolean(p.isSale || p.price <= 100);
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const visibleCount = 6;
  const maxStart = Math.max(0, filteredProducts.length - visibleCount);
  const safeStart = Math.min(startIndex, maxStart);

  const displayedProducts = showAllGrid
    ? filteredProducts
    : filteredProducts.slice(safeStart, safeStart + visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const formatPrice = (usd: number) => {
    const converted = usd * curr.rate;
    return currency === 'JPY'
      ? `${curr.symbol}${Math.round(converted).toLocaleString()}`
      : `${curr.symbol}${converted.toFixed(2)}`;
  };

  return (
    <section
      id="new-arrivals"
      className="bg-[#0B0B0D] text-white py-10 sm:py-12 lg:py-14 border-b border-white/5"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Row */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-7">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-[28px] uppercase tracking-[-0.01em] text-white leading-none">
                NEW ARRIVALS
              </h2>
              <div className="w-12 h-[3px] bg-[#F4511E] -rotate-[1.5deg] mt-1.5 rounded-full" />
            </div>

            {/* Interactive Category Filter Indicator */}
            {activeCategory !== 'All' && activeCategory !== 'Brands' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">
                  Filtering: <strong className="text-white uppercase">{activeCategory}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('All');
                    setStartIndex(0);
                  }}
                  className="text-[11px] font-bold text-[#F4511E] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-neutral-200 hover:text-[#F4511E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{showAllGrid ? 'SHOW CAROUSEL' : 'VIEW ALL'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F4511E]" />
          </button>
        </div>

        {/* Product Carousel Wrapper */}
        <div className="relative">
          {/* Left Carousel Arrow */}
          {!showAllGrid && filteredProducts.length > visibleCount && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous products"
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#141416]/95 border border-white/25 hover:border-[#F4511E] text-white items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Product Grid (6 columns on desktop matching reference) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {displayedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const activeSwatchIdx = selectedSwatches[product.id] ?? 0;

              return (
                <div
                  key={product.id}
                  className="group relative bg-[#222224] border border-white/[0.08] hover:border-white/25 rounded-[8px] p-3 flex flex-col justify-between transition-all duration-150"
                >
                  {/* Top Badge & Wishlist Row */}
                  <div className="flex items-center justify-between gap-2 z-10">
                    {product.isNew ? (
                      <span className="bg-[#9EFF00] text-black text-[9px] font-extrabold uppercase tracking-[0.06em] px-1.5 py-[1px] rounded-[2px] leading-tight">
                        NEW
                      </span>
                    ) : product.isSale ? (
                      <span className="bg-[#F4511E] text-white text-[9px] font-extrabold uppercase tracking-[0.06em] px-1.5 py-[1px] rounded-[2px] leading-tight">
                        SALE
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      aria-label={`Toggle ${product.name} in wishlist`}
                      className="text-neutral-300 hover:text-[#F4511E] transition-colors cursor-pointer p-0.5"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted ? 'fill-[#F4511E] text-[#F4511E]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Center Studio Product Image */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative my-2 aspect-[112/88] w-full flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} ${product.subtitle}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* Subtle Hover Action Pill */}
                    <div className="absolute inset-x-1 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product, product.sizes[0]);
                        }}
                        className="bg-[#F4511E] hover:bg-[#e04312] text-white text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>Add</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="bg-black/80 hover:bg-black text-white border border-white/20 text-[9.5px] font-bold uppercase px-2 py-1 rounded shadow inline-flex items-center gap-1 cursor-pointer"
                        aria-label="Quick view"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Product Info */}
                  <div className="pt-1">
                    <div
                      onClick={() => onQuickView(product)}
                      className="cursor-pointer"
                    >
                      <h3 className="text-[11px] font-semibold text-neutral-100 group-hover:text-white leading-snug truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-neutral-400 leading-tight truncate mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Price & Swatches Row */}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12.5px] font-extrabold text-white tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-neutral-500 line-through tabular-nums">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}

                        {/* Optional Color Swatches right next to price like reference */}
                        {product.swatches && product.swatches.length > 0 && (
                          <div className="flex items-center gap-1 ml-1">
                            {product.swatches.map((sw, idx) => (
                              <button
                                key={sw.name}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSwatches((prev) => ({
                                    ...prev,
                                    [product.id]: idx,
                                  }));
                                }}
                                title={sw.name}
                                aria-label={`Select color ${sw.name}`}
                                className={`w-2.5 h-2.5 rounded-full border cursor-pointer transition-transform ${
                                  activeSwatchIdx === idx
                                    ? 'border-white scale-110'
                                    : 'border-white/40 opacity-80'
                                }`}
                                style={{ backgroundColor: sw.hex }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Carousel Arrow */}
          {!showAllGrid && filteredProducts.length > visibleCount && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next products"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#141416]/95 border border-white/25 hover:border-[#F4511E] text-white items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
