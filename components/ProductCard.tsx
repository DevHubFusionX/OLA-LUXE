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
            className="flex flex-col h-full group"
        >
            <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="aspect-square relative overflow-hidden bg-gray-100 mb-3">
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
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                            <div className="bg-white border border-gray-200 px-4 py-2 rounded-sm shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-sm bg-gray-300" />
                                <span className="text-xs font-medium text-gray-500">Out of Stock</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1 px-1">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight italic line-clamp-2 mb-1 group-hover:text-[#00a651] transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm font-black text-gray-900 mb-4 italic tracking-tighter">
                        ₦{product.price.toLocaleString()}
                    </p>

                    <div className="mt-auto">
                        {isOutOfStock ? (
                            <div className="w-full flex items-center justify-center gap-2 border border-gray-100 text-gray-300 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                                Out of Stock
                            </div>
                        ) : (
                            <div
                                className="w-full bg-gray-50 group-hover:bg-[#00a651] group-hover:text-white text-gray-900 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 text-center shadow-sm group-hover:shadow-lg group-hover:shadow-green-900/10"
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
