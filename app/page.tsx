'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import NewArrivals from '@/components/NewArrivals';
import SaleBanner from '@/components/SaleBanner';
import CultureSection from '@/components/CultureSection';
import TestimonialsAndBrands from '@/components/TestimonialsAndBrands';
import Footer from '@/components/Footer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import ProductQuickView from '@/components/ProductQuickView';
import UtilityModals from '@/components/UtilityModals';
import { CurrencyCode, PRODUCTS, Product } from '@/lib/store-data';

export default function StreetDistrictStore() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-3', 'prod-5']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], size: 'US 10', quantity: 1 },
    { product: PRODUCTS[5], size: 'ONE SIZE', quantity: 1 },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [utilityModal, setUtilityModal] = useState<
    null | 'stores' | 'help' | 'wishlist' | 'account' | 'community'
  >(null);
  const [helpTopic, setHelpTopic] = useState<string | undefined>(undefined);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, size?: string) => {
    const chosenSize = size || product.sizes[0];
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === chosenSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size: chosenSize, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white">
      {/* 1. Top Utility Announcement Bar */}
      <AnnouncementBar
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenStoreLocator={() => setUtilityModal('stores')}
        onOpenHelp={() => {
          setHelpTopic('CLIENT SERVICES & FAQS');
          setUtilityModal('help');
        }}
      />

      {/* 2. Main Black Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectNav={(val) => setActiveCategory(val)}
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setUtilityModal('account')}
        onOpenWishlist={() => setUtilityModal('wishlist')}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3 & 4. Streetwear Campaign Hero + Trust Benefits */}
        <Hero
          onShopNewArrivals={() => {
            setActiveCategory('All');
            document.querySelector('#new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreLooks={() => {
            document.querySelector('#culture')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. Shop By Category (Off-White Section) */}
        <CategorySection
          activeCategory={activeCategory}
          onSelectCategory={(slug) => setActiveCategory(slug)}
        />

        {/* 6. New Arrivals 6-Card Product Carousel (Dark Section) */}
        <NewArrivals
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* 7. Large Orange 40% Off Promotional Banner */}
        <SaleBanner
          onShopSale={() => {
            setActiveCategory('Sale');
            document.querySelector('#new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. More Than A Brand / Culture Editorial Gallery (Dark Section) */}
        <CultureSection
          onJoinDistrict={() => setUtilityModal('community')}
          onSelectEditorialOutfit={(prodId) => {
            const found = PRODUCTS.find((p) => p.id === prodId) || PRODUCTS[0];
            setQuickViewProduct(found);
          }}
        />

        {/* 9 & 10. Customer Testimonials & Fictional Brand Strip (Off-White Section) */}
        <TestimonialsAndBrands
          onSelectBrand={() => {
            setActiveCategory('All');
            document.querySelector('#new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* 11. Full Dark Footer */}
      <Footer
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenHelpSection={(topic) => {
          setHelpTopic(topic);
          setUtilityModal('help');
        }}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, size) => handleAddToCart(prod, size)}
      />

      <UtilityModals
        activeModal={utilityModal}
        helpTopic={helpTopic}
        onClose={() => setUtilityModal(null)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveWishlist={handleToggleWishlist}
        onMoveWishlistToCart={(prod) => {
          handleAddToCart(prod, prod.sizes[0]);
          setUtilityModal(null);
        }}
      />
    </div>
  );
}
