'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  HelpCircle,
  Heart,
  ShoppingBag,
  User,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import {
  CURRENCIES,
  CurrencyCode,
  Product,
  STORE_LOCATIONS,
} from '@/lib/store-data';

interface UtilityModalsProps {
  activeModal:
    | null
    | 'stores'
    | 'help'
    | 'wishlist'
    | 'account'
    | 'community';
  helpTopic?: string;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: CurrencyCode;
  onRemoveWishlist: (id: string) => void;
  onMoveWishlistToCart: (product: Product) => void;
}

export default function UtilityModals({
  activeModal,
  helpTopic,
  onClose,
  wishlistProducts,
  currency,
  onRemoveWishlist,
  onMoveWishlistToCart,
}: UtilityModalsProps) {
  const [fitHandle, setFitHandle] = useState('');
  const [fitSubmitted, setFitSubmitted] = useState(false);

  if (!activeModal) return null;

  const curr = CURRENCIES[currency];
  const formatPrice = (usd: number) => {
    const val = usd * curr.rate;
    return currency === 'JPY'
      ? `${curr.symbol}${Math.round(val).toLocaleString()}`
      : `${curr.symbol}${val.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[540px] bg-[#141416] border border-white/15 rounded-[10px] p-6 text-white shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
          <div className="flex items-center gap-2">
            {activeModal === 'stores' && <MapPin className="w-4 h-4 text-[#F4511E]" />}
            {activeModal === 'help' && <HelpCircle className="w-4 h-4 text-[#F4511E]" />}
            {activeModal === 'wishlist' && <Heart className="w-4 h-4 text-[#F4511E]" />}
            {activeModal === 'account' && <User className="w-4 h-4 text-[#F4511E]" />}
            {activeModal === 'community' && <Camera className="w-4 h-4 text-[#F4511E]" />}

            <h3 className="font-display text-xl uppercase tracking-wide">
              {activeModal === 'stores' && 'STREET DISTRICT FLAGSHIP STORES'}
              {activeModal === 'help' && (helpTopic || 'CLIENT SERVICES & FAQS')}
              {activeModal === 'wishlist' && `SAVED WISHLIST (${wishlistProducts.length})`}
              {activeModal === 'account' && 'DISTRICT VIP PASS'}
              {activeModal === 'community' && 'JOIN THE #STREETDISTRICT LOOKBOOK'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Locator */}
        {activeModal === 'stores' && (
          <div className="space-y-3">
            {STORE_LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                className="p-3.5 rounded bg-[#1C1C20] border border-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-condensed font-bold text-sm uppercase text-white">
                    {loc.city}
                  </h4>
                  <span className="text-[10px] font-bold text-[#9EFF00]">
                    {loc.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1">{loc.address}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{loc.hours}</p>
              </div>
            ))}
          </div>
        )}

        {/* Help & Support */}
        {activeModal === 'help' && (
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <div className="p-3.5 rounded bg-[#1C1C20] border border-white/10">
              <h4 className="font-bold text-white uppercase mb-1">
                100% Multi-Point Authentication
              </h4>
              <p>
                Every sneaker and garment sold at Street District undergoes physical
                inspection by our in-house specialists before dispatch.
              </p>
            </div>
            <div className="p-3.5 rounded bg-[#1C1C20] border border-white/10">
              <h4 className="font-bold text-white uppercase mb-1">
                Express Worldwide Shipping & 14-Day Returns
              </h4>
              <p>
                Orders over $150 ship free globally via DHL Express / UPS. Unworn items
                with original tags intact can be returned within 14 days of delivery.
              </p>
            </div>
            <div className="p-3.5 rounded bg-[#1C1C20] border border-white/10">
              <h4 className="font-bold text-white uppercase mb-1">
                Direct Support Desk
              </h4>
              <p>
                Email: <strong className="text-white">concierge@streetdistrict.com</strong> · Live
                Drop Support: Mon–Sun 9AM–9PM EST
              </p>
            </div>
          </div>
        )}

        {/* Wishlist Modal */}
        {activeModal === 'wishlist' && (
          <div className="space-y-3">
            {wishlistProducts.length === 0 ? (
              <p className="text-xs text-neutral-400 py-8 text-center">
                No items in your wishlist yet. Tap the heart icon on any drop to save it.
              </p>
            ) : (
              wishlistProducts.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded bg-[#1C1C20] border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded bg-[#242428] object-contain p-1"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <p className="text-[11px] text-neutral-400">{item.subtitle}</p>
                      <p className="text-xs font-extrabold text-[#F4511E] mt-0.5 tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMoveWishlistToCart(item)}
                      className="bg-[#F4511E] hover:bg-[#e04312] text-white text-[10px] font-extrabold uppercase px-3 py-2 rounded inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(item.id)}
                      className="text-xs text-neutral-400 hover:text-white px-2 py-1 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Account Modal */}
        {activeModal === 'account' && (
          <div className="space-y-4">
            <div className="p-4 rounded bg-gradient-to-r from-[#F4511E]/20 to-[#1C1C20] border border-[#F4511E]/40">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4511E]">
                DISTRICT MEMBER TIER · GOLD
              </p>
              <h4 className="font-display text-xl uppercase mt-1">
                EARLY FRIDAY DROP ACCESS ACTIVE
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                Use member code <strong className="text-[#9EFF00]">DISTRICT20</strong> in your bag
                for 20% off eligible archive styles.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase py-3 rounded cursor-pointer"
            >
              CONTINUE TO STORE
            </button>
          </div>
        )}

        {/* Community Fit Submission Modal */}
        {activeModal === 'community' && (
          <div>
            {fitSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#9EFF00] mx-auto" />
                <h4 className="font-display text-lg uppercase">
                  TAGGED IN THE DISTRICT!
                </h4>
                <p className="text-xs text-neutral-400">
                  Our editorial curators review #StreetDistrict submissions every Friday.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFitSubmitted(true);
                }}
                className="space-y-3.5"
              >
                <p className="text-xs text-neutral-300">
                  Submit your Instagram or TikTok handle wearing Street District pieces
                  for a chance to be featured in our homepage Lookbook and win a $250
                  Drop Vault credit.
                </p>
                <input
                  type="text"
                  required
                  value={fitHandle}
                  onChange={(e) => setFitHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full bg-[#1C1C20] border border-white/15 rounded px-3 py-2.5 text-xs text-white focus:border-[#F4511E] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded cursor-pointer"
                >
                  SUBMIT HANDLE TO LOOKBOOK
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
