'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function BrandLogo({ size = 'md', onClick }: BrandLogoProps) {
  const mainClasses =
    size === 'lg'
      ? 'text-[30px] leading-[0.82]'
      : size === 'sm'
      ? 'text-[20px] leading-[0.82]'
      : 'text-[25px] leading-[0.82]';

  const scriptClasses =
    size === 'lg'
      ? 'text-[17px] -mt-2 ml-4'
      : size === 'sm'
      ? 'text-[11px] -mt-1.5 ml-2.5'
      : 'text-[14px] -mt-2 ml-3';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex flex-col items-start text-left select-none focus:outline-none whitespace-nowrap shrink-0"
      aria-label="Street District Home"
    >
      <span
        className={`font-display uppercase italic tracking-[-0.03em] text-white transition-transform duration-150 group-hover:scale-[1.02] ${mainClasses}`}
      >
        STREET
      </span>
      <span
        className={`font-graffiti uppercase tracking-[0.04em] text-[#F4511E] -rotate-[4deg] drop-shadow-[0_2px_6px_rgba(244,81,30,0.45)] ${scriptClasses}`}
      >
        DISTRICT
      </span>
    </button>
  );
}
