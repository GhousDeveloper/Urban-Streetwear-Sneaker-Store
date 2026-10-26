'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, CategoryItem } from '@/lib/store-data';

interface CategorySectionProps {
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export default function CategorySection({
  activeCategory,
  onSelectCategory,
}: CategorySectionProps) {
  const handleSelect = (slug: string) => {
    onSelectCategory(slug);
    const el = document.querySelector('#new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      className="bg-[#F0EFED] text-[#0A0A0A] py-10 sm:py-12 lg:py-14 border-b border-black/10"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Row */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-7">
          <div>
            <h2 className="font-display text-2xl sm:text-[28px] uppercase tracking-[-0.01em] text-[#0A0A0A] leading-none">
              SHOP BY CATEGORY
            </h2>
            <div className="w-12 h-[3px] bg-[#F4511E] -rotate-[1.5deg] mt-1.5 rounded-full" />
          </div>

          <button
            type="button"
            onClick={() => handleSelect('All')}
            className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#0A0A0A] hover:text-[#F4511E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>VIEW ALL CATEGORIES</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F4511E]" />
          </button>
        </div>

        {/* 4-Column Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((category: CategoryItem) => {
            const isSelected = activeCategory === category.slug;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelect(category.slug)}
                className={`group relative aspect-[160/136] w-full rounded-[10px] overflow-hidden bg-[#141416] text-left cursor-pointer shadow-md transition-all focus:outline-none ${
                  isSelected ? 'ring-2 ring-[#F4511E]' : 'hover:shadow-xl'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Bottom Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                {/* Lower-Left Category Label & CTA */}
                <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-end justify-between">
                  <div>
                    <h3 className="font-condensed font-bold text-lg sm:text-[20px] uppercase tracking-[0.03em] text-white leading-none">
                      {category.name}
                    </h3>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#F4511E] group-hover:translate-x-0.5 transition-transform">
                      <span>Shop Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
