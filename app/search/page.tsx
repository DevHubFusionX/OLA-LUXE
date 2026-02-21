'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { Search as SearchIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    // Fetch all products to perform client-side filtering
    const { data: products, isLoading, isError } = useProducts('All');

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ) || [];

    return (
        <main className="min-h-screen bg-bg-warm-beige/30 pb-20">
            <Header />

            <div className="container mx-auto px-4 pt-28 pb-8">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Search', href: '/search' }
                    ]}
                />

                <div className="mt-8 mb-12">
                    <h1 className="text-3xl font-black font-outfit text-text-deep-charcoal italic flex items-center gap-3">
                        <SearchIcon className="w-8 h-8 text-brand-muted-peach" />
                        {query ? `Search Results for "${query}"` : 'Search Our Collection'}
                    </h1>
                    <p className="text-text-warm-gray mt-2 font-medium">
                        {isLoading ? 'Searching...' : `${filteredProducts.length} items found`}
                    </p>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-red-100 shadow-sm">
                        <p className="text-red-500 font-medium italic">Failed to search products. Please try again.</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Results Grid */}
                {!isLoading && !isError && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && filteredProducts.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-3xl border border-[#4A3F35]/5 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <SearchIcon className="w-10 h-10 text-gray-200" />
                        </div>
                        <h2 className="text-xl font-black font-outfit text-text-deep-charcoal italic mb-2">No pieces found</h2>
                        <p className="text-text-warm-gray max-w-md mx-auto px-4">
                            We couldn&apos;t find any items matching your search. Try checking your spelling or using more general terms.
                        </p>
                    </div>
                )}
            </div>

        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-warm-beige/30 pt-32 text-center">
                <div className="animate-pulse text-brand-muted-peach font-black font-outfit italic">Searching...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
