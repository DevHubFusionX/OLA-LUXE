'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import Hero from '@/components/home/Hero';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const { data: categoriesData } = useCategories();
  const { data: products, isLoading, isError, error } = useProducts(activeCategory);

  const displayCategories = ['All', ...(categoriesData?.map(c => c.name) || [])];

  return (
    <main className="min-h-screen pb-20">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <Hero />

      {/* Category Filter Space (Clean Spacer) */}
      <div className="h-4 bg-gray-50/50 w-full mb-8" />

      {/* Product Grid */}
      <section className="container mx-auto px-4">
        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <p className="text-red-400 font-medium">
              {error?.message || 'Failed to load products. Please try again.'}
            </p>
          </div>
        )}

        {/* Loading Skeleton Grid */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && !isError && products?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-stone/50 italic">No products found in this category.</p>
          </div>
        )}
      </section>

      <WhatsAppFAB />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
