'use client';

import React, { useState } from 'react';
import { Search, X, ArrowRight, Flame } from 'lucide-react';
import { CURRENCIES, CurrencyCode, Product } from '@/lib/store-data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
}

const TRENDING_TERMS = ['Retro High OG', 'Hoodie', 'Slide', 'Runner', 'Black', 'Cap'];

export default function SearchOverlay({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCIES[currency];
  const formatPrice = (usd: number) => {
    const val = usd * curr.rate;
    return currency === 'JPY'
      ? `${curr.symbol}${Math.round(val).toLocaleString()}`
      : `${curr.symbol}${val.toFixed(2)}`;
  };

  const results = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col">
      <div className="max-w-[960px] w-full mx-auto px-4 sm:px-6 pt-8 pb-12 flex-1 overflow-y-auto">
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b-2 border-[#F4511E] pb-3">
          <Search className="w-5 h-5 text-[#F4511E] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, hoodies, colorways, or SKU..."
            className="flex-1 bg-transparent text-white text-base sm:text-lg font-medium placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Trending Terms */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
            <Flame className="w-3.5 h-3.5 text-[#F4511E]" />
            Trending:
          </span>
          {TRENDING_TERMS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="text-xs font-semibold text-neutral-300 hover:text-[#F4511E] bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="mt-7">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
            {query ? `Matching Results (${results.length})` : 'Featured Drop Rotation'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group bg-[#18181B] hover:bg-[#222226] border border-white/10 rounded-[8px] p-3 flex items-center gap-3.5 text-left transition-colors cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded bg-[#242428] object-contain p-1 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F4511E]">
                    {product.brand}
                  </p>
                  <h4 className="text-xs font-bold text-white truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {product.subtitle}
                  </p>
                  <p className="mt-1 text-xs font-extrabold text-white tabular-nums flex items-center justify-between">
                    <span>{formatPrice(product.price)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F4511E]" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
