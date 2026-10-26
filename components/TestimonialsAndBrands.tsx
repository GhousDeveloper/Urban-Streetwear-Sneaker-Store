'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { BRANDS, TESTIMONIALS } from '@/lib/store-data';

interface TestimonialsAndBrandsProps {
  onSelectBrand: (brandName: string) => void;
}

export default function TestimonialsAndBrands({
  onSelectBrand,
}: TestimonialsAndBrandsProps) {
  return (
    <section
      id="brands"
      className="bg-[#F0EFED] text-[#0A0A0A] pt-11 sm:pt-14 pb-8 border-b border-black/10"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Heading Left + 3 Review Cards Right */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Column Heading */}
          <div className="w-full lg:w-[210px] shrink-0 pt-1">
            <h2 className="font-display uppercase text-2xl sm:text-[29px] leading-[0.94] tracking-[-0.01em] text-[#0A0A0A]">
              <span className="block">WHAT OUR</span>
              <span className="block">CUSTOMERS SAY</span>
            </h2>
            <div className="w-14 h-[3.5px] bg-[#F4511E] -rotate-[2deg] mt-1.5 rounded-full" />
          </div>

          {/* Right 3 Review Cards */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {TESTIMONIALS.map((review) => (
              <article
                key={review.id}
                className="bg-white rounded-[8px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-black/[0.06] flex flex-col justify-between"
              >
                <div>
                  {/* Orange Double Quote Mark */}
                  <div
                    aria-hidden="true"
                    className="font-display text-[28px] leading-[0.8] text-[#F4511E] select-none"
                  >
                    &ldquo;
                  </div>

                  {/* Customer Review Quote */}
                  <p className="mt-1 text-[11.5px] sm:text-[12px] text-neutral-800 font-medium leading-[1.55]">
                    {review.quote}
                  </p>
                </div>

                <div className="mt-3.5">
                  {/* 5 Small Orange Stars */}
                  <div className="flex items-center gap-0.5 mb-3" aria-label="5 out of 5 stars">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3 h-3 fill-[#F4511E] text-[#F4511E]"
                      />
                    ))}
                  </div>

                  {/* Customer Portrait & Name */}
                  <div className="flex items-center gap-2.5">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-black/10 shrink-0"
                    />
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#0A0A0A] leading-none">
                        {review.author}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Row: Fictional Streetwear Brand Strip matching screenshot visual cadence */}
        <div className="mt-10 pt-4 border-t border-black/[0.06]">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 px-2">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => onSelectBrand(brand.name)}
                className="group opacity-65 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
                title={`Filter by ${brand.name}`}
              >
                {brand.style === 'swoosh-italic' && (
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-display italic text-lg sm:text-xl tracking-tighter text-neutral-700 group-hover:text-black">
                      {brand.name}
                    </span>
                    <span className="w-12 h-[3px] bg-neutral-700 group-hover:bg-[#F4511E] -rotate-[6deg] rounded-full -mt-0.5 transition-colors" />
                  </div>
                )}

                {brand.style === 'jump-silhouette' && (
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-display text-xl sm:text-2xl tracking-tight text-neutral-700 group-hover:text-black">
                      ▲
                    </span>
                    <span className="text-[9px] font-extrabold tracking-[0.18em] text-neutral-700 uppercase -mt-1">
                      {brand.name}
                    </span>
                  </div>
                )}

                {brand.style === 'trefoil-crown' && (
                  <div className="flex flex-col items-center leading-none">
                    <div className="flex items-end gap-0.5 mb-0.5">
                      <span className="w-1.5 h-2.5 bg-neutral-600 rounded-t-full -rotate-12" />
                      <span className="w-1.5 h-3.5 bg-neutral-600 rounded-t-full" />
                      <span className="w-1.5 h-2.5 bg-neutral-600 rounded-t-full rotate-12" />
                    </div>
                    <span className="font-sans-body font-extrabold text-xs tracking-tight text-neutral-700 lowercase">
                      {brand.name}
                    </span>
                  </div>
                )}

                {brand.style === 'slanted-mono' && (
                  <div className="flex items-center gap-0.5">
                    <div className="flex flex-col gap-[2px] mr-0.5">
                      <span className="w-2.5 h-[2px] bg-neutral-600" />
                      <span className="w-3 h-[2px] bg-neutral-600" />
                      <span className="w-2 h-[2px] bg-neutral-600" />
                    </div>
                    <span className="font-display italic text-xl sm:text-2xl tracking-tighter text-neutral-700 group-hover:text-black leading-none">
                      {brand.name}
                    </span>
                  </div>
                )}

                {brand.style === 'box-logo' && (
                  <div className="bg-neutral-600 group-hover:bg-[#F4511E] transition-colors px-2.5 py-0.5">
                    <span className="font-sans-body font-black italic text-xs sm:text-sm tracking-tight text-white">
                      {brand.name}
                    </span>
                  </div>
                )}

                {brand.style === 'graffiti-tag' && (
                  <span className="font-graffiti text-base sm:text-lg tracking-wider text-neutral-700 group-hover:text-black -rotate-3 inline-block">
                    {brand.name}
                  </span>
                )}

                {brand.style === 'stacked-minimal' && (
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-condensed font-bold text-sm sm:text-base tracking-[0.14em] text-neutral-700 group-hover:text-black">
                      {brand.name}
                    </span>
                    <span className="text-[7px] font-bold tracking-[0.22em] text-neutral-500 mt-0.5">
                      {brand.subtext}
                    </span>
                  </div>
                )}

                {brand.style === 'crest-badge' && (
                  <div className="border-2 border-neutral-600 group-hover:border-black rounded-full px-2.5 py-0.5 flex items-center justify-center">
                    <span className="font-display text-[11px] tracking-wider text-neutral-700 group-hover:text-black">
                      {brand.name}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
