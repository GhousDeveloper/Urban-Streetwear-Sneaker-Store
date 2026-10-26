'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { CURRENCIES, CurrencyCode, Product } from '@/lib/store-data';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCIES[currency];
  const formatPrice = (usd: number) => {
    const val = usd * curr.rate;
    return currency === 'JPY'
      ? `${curr.symbol}${Math.round(val).toLocaleString()}`
      : `${curr.symbol}${val.toFixed(2)}`;
  };

  const subtotalUsd = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountUsd = discountApplied ? subtotalUsd * 0.2 : 0;
  const shippingUsd = subtotalUsd >= 150 || subtotalUsd === 0 ? 0 : 12;
  const totalUsd = Math.max(0, subtotalUsd - discountUsd + shippingUsd);
  const freeShipProgress = Math.min(100, (subtotalUsd / 150) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DISTRICT20' || promoCode.trim().length >= 4) {
      setDiscountApplied(true);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `SD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(randomId);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Slide-Over Panel */}
      <aside className="relative z-10 w-full max-w-[430px] bg-[#101012] border-l border-white/10 text-white h-full flex flex-col justify-between shadow-2xl">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#F4511E]" />
            <h2 className="font-display text-lg uppercase tracking-wide">
              {checkoutStep === 'cart'
                ? `YOUR BAG (${items.reduce((acc, i) => acc + i.quantity, 0)})`
                : checkoutStep === 'shipping'
                ? 'EXPRESS CHECKOUT'
                : 'DROP CONFIRMED'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setCheckoutStep('cart');
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {checkoutStep === 'cart' && (
          <div className="px-5 py-2.5 bg-[#18181B] border-b border-white/10">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="flex items-center gap-1.5 text-neutral-200">
                <Truck className="w-3.5 h-3.5 text-[#9EFF00]" />
                {subtotalUsd >= 150 ? (
                  <span>
                    You unlocked <strong className="text-[#9EFF00]">FREE EXPRESS SHIPPING!</strong>
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <strong className="text-[#F4511E] tabular-nums">
                      {formatPrice(150 - subtotalUsd)}
                    </strong>{' '}
                    more for <strong className="text-white">FREE SHIPPING</strong>
                  </span>
                )}
              </span>
              <span className="text-[10px] text-neutral-400 tabular-nums">
                {Math.round(freeShipProgress)}%
              </span>
            </div>
            <div className="mt-1.5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F4511E] transition-all duration-300"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'confirmed' ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#9EFF00]/15 border border-[#9EFF00]/40 text-[#9EFF00] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                ORDER {orderNumber} CONFIRMED
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Thank you{customerName ? `, ${customerName}` : ''}! Our authentication team
                is preparing your Street District shipment. Tracking details have been
                dispatched.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="mt-4 bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-[4px] cursor-pointer"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : checkoutStep === 'shipping' ? (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jordan Taylor"
                  className="w-full bg-[#18181B] border border-white/15 rounded px-3 py-2.5 text-xs text-white focus:border-[#F4511E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Email for Drop Receipt
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="jordan@streetdistrict.com"
                  className="w-full bg-[#18181B] border border-white/15 rounded px-3 py-2.5 text-xs text-white focus:border-[#F4511E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="142 Mercer St, Apt 4B, New York, NY 10012"
                  className="w-full bg-[#18181B] border border-white/15 rounded px-3 py-2.5 text-xs text-white focus:border-[#F4511E] focus:outline-none"
                />
              </div>
              <div className="p-3 rounded bg-[#18181B] border border-white/10 flex items-center gap-2.5 text-[11px] text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#F4511E] shrink-0" />
                <span>100% Authenticity Verified before dispatch.</span>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="font-display text-lg uppercase text-neutral-300">
                YOUR BAG IS EMPTY
              </p>
              <p className="text-xs text-neutral-500 max-w-[240px] mx-auto">
                Explore our latest sneaker drops and heavyweight streetwear essentials.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="bg-[#18181B] border border-white/[0.08] rounded-[6px] p-3 flex items-center gap-3.5"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded bg-[#222224] object-contain p-1 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10.5px] text-neutral-400">
                        {item.product.subtitle} · Size: <strong className="text-neutral-200">{item.size}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-neutral-500 hover:text-[#F4511E] transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="inline-flex items-center border border-white/15 rounded bg-[#101012]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="px-2 py-1 text-neutral-300 hover:text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="px-2 py-1 text-neutral-300 hover:text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-white tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals & Checkout CTA */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="p-5 bg-[#141417] border-t border-white/10 space-y-3.5">
            {checkoutStep === 'cart' && (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (try DISTRICT20)"
                  className="flex-1 bg-[#1C1C20] border border-white/15 rounded px-3 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4511E]"
                />
                <button
                  type="submit"
                  className="bg-white/10 hover:bg-white/20 text-white text-[10.5px] font-bold uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="tabular-nums text-white font-semibold">
                  {formatPrice(subtotalUsd)}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#9EFF00]">
                  <span>Member Promo (20% Off)</span>
                  <span className="tabular-nums">-{formatPrice(discountUsd)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="tabular-nums text-white">
                  {shippingUsd === 0 ? 'FREE' : formatPrice(shippingUsd)}
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-extrabold text-white">
                <span>Total</span>
                <span className="tabular-nums text-[#F4511E]">
                  {formatPrice(totalUsd)}
                </span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase tracking-[0.08em] py-3.5 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 border border-white/20 rounded-[4px] text-xs font-bold uppercase text-neutral-300 hover:text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 bg-[#F4511E] hover:bg-[#e04312] text-white text-xs font-extrabold uppercase tracking-[0.08em] py-3 rounded-[4px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONFIRM ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
