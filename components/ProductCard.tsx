'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/lib/schemas';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const isOutOfStock = product.inStock === false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="flex flex-col h-full group bg-bg-soft-cream rounded-lg overflow-hidden transition-all duration-300 hover:shadow-soft border border-anchor-espresso/5"
        >
            <Link href={`/product/${product.id}`} className="flex flex-col h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                <div className="aspect-square relative overflow-hidden bg-bg-warm-beige/50">
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                            No Image
                        </div>
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-bg-warm-beige/60 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="bg-white/80 border border-anchor-espresso/10 px-4 py-2 rounded-lg shadow-soft flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-text-warm-gray" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-text-warm-gray">Out of Stock</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-[10px] font-black text-text-deep-charcoal uppercase tracking-[0.1em] font-outfit line-clamp-2 mb-2 group-hover:text-brand-soft-coral transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm font-black text-text-deep-charcoal mb-4 font-outfit tracking-tighter">
                        ₦{product.price.toLocaleString()}
                    </p>

                    <div className="mt-auto">
                        {isOutOfStock ? (
                            <div className="w-full flex items-center justify-center gap-2 border border-anchor-espresso/5 text-text-warm-gray/40 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-not-allowed bg-anchor-espresso/5">
                                Out of Stock
                            </div>
                        ) : (
                            <div
                                className="w-full bg-brand-muted-peach/10 group-hover:bg-brand-soft-coral text-brand-soft-coral group-hover:text-white py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 text-center font-outfit"
                            >
                                View Piece
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
