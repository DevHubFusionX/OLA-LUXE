'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProduct } from '@/hooks/useProducts';

export default function ProductPage() {
    const params = useParams();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const productId = typeof params.id === 'string' ? params.id : '';
    const { data: product, isLoading, isError, error } = useProduct(productId);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-bg-warm-beige/30">
                <Header />
                <div className="container mx-auto px-4 pt-32">
                    <ProductSkeleton />
                </div>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="min-h-screen bg-bg-warm-beige/30 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center pt-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-black mb-4 font-outfit text-text-deep-charcoal italic">{error?.message || 'Piece not found'}</h1>
                        <Link href="/" className="text-brand-soft-coral hover:underline font-outfit uppercase tracking-widest text-xs font-black">Back to Atelier</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg-warm-beige/30 pb-20">
            <Header />

            <div className="container mx-auto px-4 pt-28 pb-8">
                <Breadcrumbs
                    items={[
                        { label: 'Shop', href: '/products' },
                        { label: product.name }
                    ]}
                />

                <div className="mt-12 grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} />
                    </div>

                    <div className="lg:col-span-5">
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Details Section */}
                <div className="mt-24 border-t border-anchor-espresso/5 pt-16">
                    <div className="inline-block border-b-2 border-brand-soft-coral pb-2 mb-10">
                        <h2 className="text-[10px] font-black text-text-deep-charcoal uppercase tracking-[0.4em] font-outfit">
                            Product Details
                        </h2>
                    </div>
                    <div className="prose prose-sm max-w-4xl text-text-warm-gray leading-relaxed font-medium font-outfit">
                        {product.description}
                    </div>
                </div>
            </div>

            <WhatsAppFAB />

        </main>
    );
}
