'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import CollectionHeader from '@/components/products/CollectionHeader';
import CategoryFilters from '@/components/products/CategoryFilters';

export default function ProductsPage() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const { data: categoriesData } = useCategories();
    const { data: products, isLoading, isError, error } = useProducts(activeCategory);

    const displayCategories = ['All', ...(categoriesData?.map(c => c.name) || [])];

    return (
        <main className="min-h-screen bg-white pb-20 pt-28">
            <Header
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Collection Header */}
                <div className="flex flex-col gap-8 mb-16">
                    <CollectionHeader />
                    <CategoryFilters
                        categories={displayCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>

                {/* Error State */}
                {isError && (
                    <div className="text-center py-20 bg-gray-50 rounded border border-gray-100 italic">
                        <p className="text-red-400">
                            {error?.message || 'Failed to load products. Please try again.'}
                        </p>
                    </div>
                )}

                {/* Loading Skeleton Grid */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                {!isLoading && !isError && products && products.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && products?.length === 0 && (
                    <div className="text-center py-32 bg-gray-50 rounded border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">No products found in this category.</p>
                    </div>
                )}
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </main>
    );
}
