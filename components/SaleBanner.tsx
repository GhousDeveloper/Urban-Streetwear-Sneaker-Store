'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SaleBannerProps {
  onShopSale: () => void;
}

export default function SaleBanner({ onShopSale }: SaleBannerProps) {
  return (
    <section
      id="sale-banner"
      className="relative w-full bg-[#F4511E] overflow-hidden border-y border-black/30 select-none"
    >
      {/* Distressed Grunge Texture & Black Right Splatter Layer */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_22%_50%,rgba(255,140,66,0.45)_0%,transparent_55%),linear-gradient(90deg,#E64A19_0%,#F4511E_46%,#180804_62%,#080808_100%)]
        "
      />

      {/* SVG Grunge Halftone / Distress Speckles Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 pointer-events-none mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grunge-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 9 -4"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grunge-noise)" />
      </svg>

      {/* Main Banner Content Row */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:h-[168px] flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-4">
        {/* Left + Center-Left: LIMITED TIME ONLY + UP TO 40% OFF */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-4 sm:gap-7">
          {/* Tilted Acid-Lime Graffiti Text */}
          <div className="-rotate-[13deg] text-center leading-[0.95] shrink-0">
            <span className="block font-graffiti text-[#B4FF00] text-lg sm:text-xl md:text-[23px] tracking-wider uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.65)]">
              LIMITED TIME
            </span>
            <span className="block font-graffiti text-[#B4FF00] text-xl sm:text-2xl md:text-[26px] tracking-wider uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.65)]">
              ONLY
            </span>
          </div>

          {/* Huge UP TO 40% OFF Black Distressed Lockup */}
          <div className="flex items-start gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center font-display uppercase text-[#090909] leading-none pt-1">
              <span className="text-3xl sm:text-4xl md:text-[44px] tracking-tighter">UP</span>
              <span className="flex flex-col text-[13px] sm:text-[15px] leading-[0.85] font-extrabold ml-0.5">
                <span>T</span>
                <span>O</span>
              </span>
            </div>

            <div className="font-display italic uppercase text-[#080808] text-[56px] sm:text-[74px] md:text-[88px] lg:text-[96px] leading-[0.8] tracking-[-0.03em] drop-shadow-[0_2px_0_rgba(255,255,255,0.08)]">
              40% OFF
            </div>
          </div>
        </div>

        {/* Right Side: ON SELECT STYLES + CTA + Acid Smiley */}
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full lg:w-auto">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <p className="font-display italic uppercase text-white text-lg sm:text-xl md:text-[23px] tracking-[0.04em] leading-none">
              ON SELECT STYLES
            </p>
            <button
              type="button"
              onClick={onShopSale}
              className="mt-3 bg-[#0B0B0D]/90 hover:bg-[#F4511E] text-white hover:text-black border border-white/40 hover:border-black text-[10.5px] font-extrabold uppercase tracking-[0.09em] px-4 py-2 rounded-[3px] inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>SHOP THE SALE</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
            </button>
          </div>

          {/* Right Acid-Green Grunge Smiley Graphic */}
          <div className="relative w-[120px] sm:w-[155px] lg:w-[185px] h-[95px] sm:h-[125px] lg:h-[155px] shrink-0 flex items-center justify-center">
            <img
              src="/images/sale-smiley.jpg"
              alt="Neon acid green streetwear grunge smiley emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain mix-blend-lighten scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
