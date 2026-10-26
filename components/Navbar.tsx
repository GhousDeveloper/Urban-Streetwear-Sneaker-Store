'use client';

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  activeCategory: string;
  onSelectNav: (navItem: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

const NAV_ITEMS = [
  { label: 'NEW ARRIVALS', value: 'All', href: '#new-arrivals' },
  { label: 'SNEAKERS', value: 'Sneakers', href: '#new-arrivals' },
  { label: 'APPAREL', value: 'Hoodies', href: '#new-arrivals' },
  { label: 'ACCESSORIES', value: 'Accessories', href: '#new-arrivals' },
  { label: 'BRANDS', value: 'Brands', href: '#brands' },
  { label: 'SALE', value: 'Sale', href: '#sale-banner', isSale: true },
];

export default function Navbar({
  activeCategory,
  onSelectNav,
  wishlistCount,
  cartCount,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    onSelectNav(item.value);
    setMobileMenuOpen(false);
    const el = document.querySelector(item.href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[68px] flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 -ml-1.5 text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <BrandLogo
            size="md"
            onClick={() => {
              onSelectNav('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7 xl:gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.value && item.value !== 'All';
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-1 text-[11px] xl:text-[12px] font-bold tracking-[0.09em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer group ${
                  item.isSale
                    ? 'text-[#F4511E] hover:text-[#ff6a3d]'
                    : isActive
                    ? 'text-white'
                    : 'text-neutral-200 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#F4511E] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1 text-neutral-200 hover:text-[#F4511E] transition-colors cursor-pointer"
            aria-label="Search store"
          >
            <Search className="w-[19px] h-[19px] stroke-[1.8]" />
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            className="p-1 text-neutral-200 hover:text-[#F4511E] transition-colors cursor-pointer"
            aria-label="Account"
          >
            <User className="w-[19px] h-[19px] stroke-[1.8]" />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            className="relative p-1 text-neutral-200 hover:text-[#F4511E] transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-[19px] h-[19px] stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F4511E] text-white text-[9px] font-extrabold flex items-center justify-center tabular-nums shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-1 text-neutral-200 hover:text-[#F4511E] transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-[19px] h-[19px] stroke-[1.8]" />
            <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F4511E] text-white text-[9px] font-extrabold flex items-center justify-center tabular-nums shadow">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E0E10] border-b border-white/10 px-4 pt-3 pb-5 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`w-full text-left py-2.5 px-3 rounded text-xs font-bold tracking-[0.1em] uppercase flex items-center justify-between ${
                item.isSale
                  ? 'text-[#F4511E] bg-[#F4511E]/10'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-neutral-500">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
