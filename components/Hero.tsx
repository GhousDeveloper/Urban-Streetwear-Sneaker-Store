'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onShopNewArrivals: () => void;
  onExploreLooks: () => void;
}

const HERO_SLIDES = [
  {
    id: '01',
    kicker: 'OWN THE STREETS',
    line1: 'BUILT FOR',
    line2: 'MOVEMENT',
    description: 'Exclusive sneakers and streetwear\nfor the culture. For the bold. For you.',
  },
  {
    id: '02',
    kicker: 'FRIDAY DROP LIVE NOW',
    line1: 'SHADOW 2.0',
    line2: 'ARCHIVE PACK',
    description: 'Limited-edition full-grain leather high-tops\nand 520GSM heavyweight fleece essentials.',
  },
  {
    id: '03',
    kicker: 'UNDERGROUND CERTIFIED',
    line1: 'DEFINE YOUR',
    line2: 'DISTRICT',
    description: 'Engineered for concrete sessions, late nights,\nand uncompromising street rotation.',
  },
];

export default function Hero({ onShopNewArrivals, onExploreLooks }: HeroProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[slideIndex];

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full bg-[#08080A] overflow-hidden border-b border-white/10">
      {/* Main Hero Container */}
      <div className="relative max-w-[1440px] mx-auto min-h-[470px] sm:min-h-[510px] lg:h-[555px] flex items-center">
        {/* Photographic Campaign Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-campaign.jpg"
            alt="Streetwear model crouching on an urban concrete ledge wearing black oversized hoodie, cargo pants, and orange high-top sneakers at night"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[72%_center] sm:object-[65%_center] lg:object-center select-none"
          />
          {/* Mobile/Tablet readability scrim; subtle on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/80 to-transparent lg:via-[#08080A]/30 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080A]/90 via-[#08080A]/30 to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="max-w-[540px]">
            {/* Handwritten Lime Green Kicker */}
            <motion.p
              key={`kicker-${activeSlide.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-graffiti text-[#A3E635] text-sm sm:text-base md:text-[18px] tracking-[0.08em] uppercase -rotate-[1.5deg] origin-left mb-1 drop-shadow-[0_2px_8px_rgba(163,230,53,0.3)]"
            >
              {activeSlide.kicker}
            </motion.p>

            {/* Huge Condensed Editorial Headline */}
            <motion.h1
              key={`title-${activeSlide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="font-display uppercase tracking-[-0.01em] leading-[0.88] select-none"
            >
              <span className="block text-white text-[52px] sm:text-[68px] md:text-[76px] lg:text-[86px]">
                {activeSlide.line1}
              </span>
              <span className="block text-[#F4511E] text-[52px] sm:text-[68px] md:text-[76px] lg:text-[86px] mt-0.5">
                {activeSlide.line2}
              </span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              key={`desc-${activeSlide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="mt-3.5 text-neutral-200 text-xs sm:text-[13.5px] leading-[1.55] whitespace-pre-line max-w-[340px] font-medium"
            >
              {activeSlide.description}
            </motion.p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={onShopNewArrivals}
                className="bg-[#F4511E] hover:bg-[#e04312] active:scale-[0.99] text-white text-[11px] sm:text-xs font-extrabold tracking-[0.08em] uppercase px-5 py-3 rounded-[4px] inline-flex items-center gap-2 transition-all cursor-pointer shadow-[0_6px_20px_rgba(244,81,30,0.35)] whitespace-nowrap shrink-0"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onExploreLooks}
                className="bg-black/55 hover:bg-white/10 active:scale-[0.99] border border-white/45 hover:border-white text-white text-[11px] sm:text-xs font-extrabold tracking-[0.08em] uppercase px-5 py-3 rounded-[4px] inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>EXPLORE LOOKS</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] text-[#F4511E]" />
              </button>
            </div>

            {/* 3 Compact Trust Benefits */}
            <div className="mt-8 pt-2 flex flex-wrap items-center gap-5 sm:gap-7">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-white/25 bg-black/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F4511E]" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-white">
                    100% AUTHENTIC
                  </p>
                  <p className="text-[10px] text-neutral-400">Guaranteed</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-white/25 bg-black/40 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 text-[#F4511E]" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-white">
                    EASY RETURNS
                  </p>
                  <p className="text-[10px] text-neutral-400">14-Day Policy</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-white/25 bg-black/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F4511E]" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-white">
                    SECURE CHECKOUT
                  </p>
                  <p className="text-[10px] text-neutral-400">Shop with Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Right Slide Indicator matching screenshot: 01 --- 03 */}
        <div className="absolute bottom-5 right-5 sm:right-8 z-20 flex items-center gap-2.5 select-none">
          <button
            type="button"
            onClick={handleNextSlide}
            className="group inline-flex items-center gap-2.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label="Next hero campaign slide"
          >
            <span className="font-condensed italic font-bold text-sm tracking-wider tabular-nums">
              {activeSlide.id}
            </span>
            <span className="w-8 h-[1.5px] bg-white/60 group-hover:bg-[#F4511E] transition-colors relative overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-[#F4511E] transition-all duration-300"
                style={{ width: `${((slideIndex + 1) / HERO_SLIDES.length) * 100}%` }}
              />
            </span>
            <span className="font-condensed italic font-bold text-sm tracking-wider text-white/70 tabular-nums">
              03
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
