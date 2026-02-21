'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categorySlug = typeof params.category === 'string' ? params.category : '';

    const { data: categoriesData, isLoading: isCatsLoading } = useCategories();

    // Find category by slug (case-insensitive)
    const category = categoriesData?.find(
        (c) => c.slug.toLowerCase() === categorySlug.toLowerCase() || c.name.toLowerCase() === categorySlug.toLowerCase()
    );

    const categoryName = category?.name || 'All';
    const { data: products, isLoading: isProductsLoading, isError, error } = useProducts(categoryName);

    const isLoading = isCatsLoading || isProductsLoading;

    return (
        <main className="min-h-screen bg-white pb-20 pt-28">
            <Header
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Back Link / Breadcrumb */}
                <button
                    onClick={() => router.push('/products')}
                    className="flex items-center gap-2 text-gray-400 hover:text-black mb-10 transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> All Products
                </button>

                <div className="mb-16">
                    {category ? (
                        <>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight uppercase">
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                                    {category.description}
                                </p>
                            )}
                        </>
                    ) : !isLoading ? (
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight uppercase">
                            {categorySlug}
                        </h1>
                    ) : (
                        <div className="h-12 w-64 bg-gray-50 animate-pulse rounded" />
                    )}
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
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                            No products found in the "{categoryName}" category.
                        </p>
                    </div>
                )}
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </main>
    );
}
