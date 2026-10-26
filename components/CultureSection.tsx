'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ShoppingBag } from 'lucide-react';
import { EDITORIAL_GALLERY, EditorialItem } from '@/lib/store-data';

interface CultureSectionProps {
  onJoinDistrict: () => void;
  onSelectEditorialOutfit: (productId: string) => void;
}

export default function CultureSection({
  onJoinDistrict,
  onSelectEditorialOutfit,
}: CultureSectionProps) {
  const [items, setItems] = useState<EditorialItem[]>(EDITORIAL_GALLERY);

  const handleCycleGallery = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section
      id="culture"
      className="bg-[#08080A] text-white py-11 sm:py-14 border-b border-white/5"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-7">
          {/* Left Column (~21% width on desktop matching reference) */}
          <div className="w-full lg:w-[235px] shrink-0">
            <h2 className="font-display uppercase text-[26px] sm:text-[30px] leading-[0.94] tracking-[-0.01em]">
              <span className="block text-white">MORE THAN</span>
              <span className="block text-white">A BRAND.</span>
              <span className="block text-[#F4511E]">IT&apos;S A CULTURE.</span>
            </h2>

            <p className="mt-3 text-[11.5px] text-neutral-400 leading-[1.55]">
              Street District is built on passion, creativity, and community. Tag us in
              your fits <span className="text-neutral-200 font-semibold">#StreetDistrict</span>{' '}
              to be featured.
            </p>

            <button
              type="button"
              onClick={onJoinDistrict}
              className="mt-5 bg-transparent hover:bg-white/10 border border-white/35 hover:border-white text-white text-[10.5px] font-extrabold uppercase tracking-[0.08em] px-4 py-2.5 rounded-[4px] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>JOIN THE DISTRICT</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4511E]" />
            </button>
          </div>

          {/* Right Area: 5 Editorial Streetwear Photographs + Circular Next Control */}
          <div className="relative flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectEditorialOutfit(item.outfitProductId)}
                  className="group relative aspect-[98/126] w-full rounded-[6px] overflow-hidden bg-[#18181A] cursor-pointer border border-white/[0.08]"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} by ${item.handle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Subtle Hover Overlay with Shop the Fit */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                    <span className="text-[10px] font-bold text-[#F4511E] tracking-wide">
                      {item.handle}
                    </span>
                    <span className="text-[11px] font-semibold text-white leading-tight mt-0.5">
                      {item.title}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-200">
                      <ShoppingBag className="w-3 h-3 text-[#F4511E]" />
                      <span>Shop the Fit</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Far-Right Circular Next Button matching reference */}
            <button
              type="button"
              onClick={handleCycleGallery}
              aria-label="Next editorial photos"
              className="flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#141416]/95 border border-white/30 hover:border-[#F4511E] text-white items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
