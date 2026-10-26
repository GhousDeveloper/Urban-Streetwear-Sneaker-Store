'use client';

import React, { useState } from 'react';
import { Truck, Flame, MapPin, HelpCircle, ChevronDown } from 'lucide-react';
import { CURRENCIES, CurrencyCode } from '@/lib/store-data';

interface AnnouncementBarProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenStoreLocator: () => void;
  onOpenHelp: () => void;
}

export default function AnnouncementBar({
  currency,
  onCurrencyChange,
  onOpenStoreLocator,
  onOpenHelp,
}: AnnouncementBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const current = CURRENCIES[currency];
  const freeShippingThreshold = Math.round(150 * current.rate);

  return (
    <div className="bg-[#040404] border-b border-white/[0.08] text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] uppercase text-neutral-300 relative z-40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-2">
        {/* Left: Free Shipping */}
        <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
          <Truck className="w-3.5 h-3.5 text-[#9EFF00] shrink-0" />
          <span>
            FREE SHIPPING ON ORDERS OVER{' '}
            <span className="text-[#F4511E] font-extrabold tabular-nums">
              {current.symbol}
              {freeShippingThreshold}
            </span>
          </span>
        </div>

        {/* Center: New Drops */}
        <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap shrink-0 text-white">
          <Flame className="w-3.5 h-3.5 text-[#F4511E] fill-[#F4511E] shrink-0" />
          <span className="font-bold tracking-[0.08em]">NEW DROPS EVERY FRIDAY</span>
        </div>

        {/* Right: Utility Links & Currency */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap shrink-0">
          <button
            type="button"
            onClick={onOpenStoreLocator}
            className="hidden sm:inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>STORE LOCATOR</span>
          </button>

          <span className="hidden sm:inline text-white/20" aria-hidden="true">
            |
          </span>

          <button
            type="button"
            onClick={onOpenHelp}
            className="hidden sm:inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-neutral-400" />
            <span>HELP</span>
          </button>

          <span className="hidden sm:inline text-white/20" aria-hidden="true">
            |
          </span>

          {/* Currency Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 text-neutral-200 hover:text-white transition-colors cursor-pointer py-0.5"
              aria-label="Select currency"
            >
              <span className="text-xs leading-none">{current.flag}</span>
              <span className="font-bold">{current.code}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-28 bg-[#141416] border border-white/15 rounded shadow-xl py-1 z-50">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                    const item = CURRENCIES[code];
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          onCurrencyChange(code);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-[11px] flex items-center justify-between hover:bg-white/10 transition-colors ${
                          currency === code ? 'text-[#F4511E] font-bold' : 'text-neutral-200'
                        }`}
                      >
                        <span>
                          {item.flag} {item.code}
                        </span>
                        <span className="text-neutral-400">{item.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
