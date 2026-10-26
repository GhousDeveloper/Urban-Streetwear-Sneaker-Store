'use client';

import React, { useState } from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenHelpSection: (topic: string) => void;
}

export default function Footer({
  onSelectCategory,
  onOpenHelpSection,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [appToast, setAppToast] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  const handleShopLink = (cat: string) => {
    onSelectCategory(cat);
    const el = document.querySelector('#new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerAppDownload = (storeName: string) => {
    setAppToast(`Street District ${storeName} link sent — check mobile preview.`);
    setTimeout(() => setAppToast(null), 3500);
  };

  return (
    <footer className="bg-[#0B0B0D] text-white pt-11 pb-6 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Zone Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* COLUMN 1: Brand Logo, Description, Social Icons (3 cols) */}
          <div className="lg:col-span-2">
            <BrandLogo
              size="md"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <p className="mt-4 text-[11px] text-neutral-400 leading-[1.6] max-w-[220px]">
              Premium sneakers and streetwear curated for the culture. Worldwide
              shipping. 100% authentic.
            </p>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3 text-neutral-400">
              <button
                type="button"
                onClick={() => onOpenHelpSection('Instagram @StreetDistrict')}
                aria-label="Instagram"
                className="w-7 h-7 rounded bg-white/5 hover:bg-[#F4511E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[11px] font-bold"
              >
                IG
              </button>
              <button
                type="button"
                onClick={() => onOpenHelpSection('TikTok @StreetDistrict')}
                aria-label="TikTok"
                className="w-7 h-7 rounded bg-white/5 hover:bg-[#F4511E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[11px] font-bold"
              >
                TT
              </button>
              <button
                type="button"
                onClick={() => onOpenHelpSection('YouTube Street District TV')}
                aria-label="YouTube"
                className="w-7 h-7 rounded bg-white/5 hover:bg-[#F4511E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[11px] font-bold"
              >
                YT
              </button>
              <button
                type="button"
                onClick={() => onOpenHelpSection('X @StreetDistrict')}
                aria-label="X"
                className="w-7 h-7 rounded bg-white/5 hover:bg-[#F4511E] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[11px] font-bold"
              >
                X
              </button>
            </div>
          </div>

          {/* COLUMN 2: Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              NEWSLETTER
            </h3>
            <p className="mt-2.5 text-[11px] text-neutral-400 leading-[1.55] max-w-[270px]">
              Join the District for early access to drops, exclusive deals, and more.
            </p>

            {subscribed ? (
              <div className="mt-4 p-3 rounded bg-[#9EFF00]/10 border border-[#9EFF00]/30 flex items-center gap-2 text-xs text-[#9EFF00]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You&apos;re on the list for Friday drops!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex items-stretch gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  className="flex-1 min-w-0 bg-[#141416] border border-white/20 focus:border-[#F4511E] rounded-[4px] px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#F4511E] hover:bg-[#e04312] text-white text-[11px] font-extrabold uppercase tracking-[0.06em] px-4 py-2 rounded-[4px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
            {error && <p className="mt-1.5 text-[10.5px] text-[#F4511E]">{error}</p>}
          </div>

          {/* COLUMN 3: Get The App + Smartphone Hardware Mockup (4 cols) */}
          <div className="lg:col-span-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
                GET THE APP
              </h3>
              <p className="mt-2.5 text-[11px] text-neutral-400 leading-[1.55]">
                Exclusive drops, faster checkout, and app-only offers.
              </p>

              {/* App Store & Google Play Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerAppDownload('iOS App Store')}
                  className="bg-[#141416] hover:bg-white/10 border border-white/20 rounded-[4px] px-2.5 py-1.5 text-left transition-colors cursor-pointer"
                >
                  <span className="block text-[7.5px] uppercase tracking-wider text-neutral-400 leading-none">
                    Download on the
                  </span>
                  <span className="block text-[10.5px] font-bold text-white leading-tight mt-0.5">
                    App Store
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerAppDownload('Google Play')}
                  className="bg-[#141416] hover:bg-white/10 border border-white/20 rounded-[4px] px-2.5 py-1.5 text-left transition-colors cursor-pointer"
                >
                  <span className="block text-[7.5px] uppercase tracking-wider text-neutral-400 leading-none">
                    GET IT ON
                  </span>
                  <span className="block text-[10.5px] font-bold text-white leading-tight mt-0.5">
                    Google Play
                  </span>
                </button>
              </div>

              {appToast && (
                <p className="mt-2 text-[10px] text-[#9EFF00] font-medium">{appToast}</p>
              )}
            </div>

            {/* Realistic Smartphone Hardware Mockup showing the Store UI */}
            <div
              onClick={() => triggerAppDownload('Mobile App')}
              className="w-[100px] sm:w-[108px] h-[164px] rounded-[16px] border-[2.5px] border-neutral-600 bg-[#0A0A0C] p-1.5 shadow-2xl flex flex-col justify-between overflow-hidden shrink-0 cursor-pointer group hover:border-[#F4511E] transition-colors"
            >
              {/* Notch */}
              <div className="w-8 h-1 bg-neutral-700 rounded-full mx-auto mb-1" />

              {/* Mini App Header */}
              <div className="px-1 text-center">
                <span className="block font-display italic text-[11px] leading-none text-white tracking-tight">
                  STREET
                </span>
                <span className="block font-graffiti text-[7px] text-[#F4511E] -mt-0.5">
                  DISTRICT
                </span>
              </div>

              {/* NEW DROPS Callout + Sneaker Image */}
              <div className="relative flex-1 mt-1 rounded-[10px] overflow-hidden bg-[#141416] flex flex-col justify-between p-1.5">
                <div className="z-10 leading-none">
                  <span className="block font-display text-[11px] text-[#F4511E] uppercase">
                    NEW
                  </span>
                  <span className="block font-display text-[12px] text-white uppercase">
                    DROPS
                  </span>
                </div>
                <img
                  src="/images/app-sneaker.jpg"
                  alt="Street District mobile app sneaker drop preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-16 object-cover rounded-[6px] group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* COLUMN 4: Shop Links (1.5 cols) */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              SHOP
            </h3>
            <ul className="mt-3 space-y-2 text-[11px] text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleShopLink('All')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleShopLink('Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sneakers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleShopLink('Hoodies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apparel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleShopLink('Accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleShopLink('Sale')}
                  className="text-[#F4511E] hover:underline transition-colors cursor-pointer font-semibold"
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: Help Links (2 cols) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              HELP
            </h3>
            <ul className="mt-3 space-y-2 text-[11px] text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenHelpSection('FAQs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenHelpSection('Shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenHelpSection('Returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenHelpSection('Order Tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenHelpSection('Contact Us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-9 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] text-neutral-400">
          <p>© 2026 Street District. All Rights Reserved.</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenHelpSection('Terms of Service')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-white/20" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenHelpSection('Privacy Policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/20" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenHelpSection('Refund Policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-300">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
