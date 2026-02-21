'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileMenu from '@/components/MobileMenu';
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
            <main className="min-h-screen bg-white">
                <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
                <div className="container mx-auto px-4 pt-32">
                    <ProductSkeleton />
                </div>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="min-h-screen bg-white flex flex-col">
                <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
                <div className="flex-1 flex items-center justify-center pt-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">{error?.message || 'Product not found'}</h1>
                        <Link href="/" className="text-[#00a651] hover:underline">Back to Home</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pb-20">
            <Header
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
            />

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
                <div className="mt-20 border-t border-gray-100 pt-12">
                    <div className="inline-block border-b-4 border-[#00a651] pb-2 mb-8">
                        <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] italic">
                            Product Details
                        </h2>
                    </div>
                    <div className="prose prose-sm max-w-4xl text-gray-600 leading-relaxed font-medium">
                        {product.description}
                    </div>
                </div>
            </div>

            <WhatsAppFAB />

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </main>
    );
}
