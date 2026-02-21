'use client';

import { Minus, Plus, Star, Twitter, Facebook, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/schemas';
import { useCart } from '@/context/CartContext';

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        const variationString = Object.values(selectedVariations).join(', ');

        // Use first image if index isn't passed (keeping it simple for now)
        setTimeout(() => {
            addToCart(product, variationString || undefined, product.images[0], quantity);
            setIsAdding(false);
        }, 600);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight tracking-tighter italic uppercase">
                    {product.name}
                </h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#00a651] fill-current" />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">( 0 ratings )</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                    <p className="text-3xl font-black text-[#00a651] italic tracking-tighter">
                        ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-lg font-bold text-gray-300 line-through">
                        ₦{(product.price * 1.5).toLocaleString()}
                    </p>
                </div>
                <p className="text-[#00a651] text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full w-fit border border-green-100">
                    In Stock
                </p>
            </div>

            <div className="space-y-6">
                {product.variations && product.variations.length > 0 && (
                    <div className="space-y-4">
                        {product.variations.map((variation) => (
                            <div key={variation.type} className="space-y-3">
                                <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest block">
                                    {variation.type}:
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-2xl py-4 px-6 text-xs font-bold text-gray-900 appearance-none outline-none transition-all"
                                        onChange={(e) => setSelectedVariations({ ...selectedVariations, [variation.type]: e.target.value })}
                                        value={selectedVariations[variation.type] || ''}
                                    >
                                        <option value="">Choose {variation.type.toLowerCase()}</option>
                                        {variation.options.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center border-2 border-gray-50 rounded-[2rem] bg-gray-50 h-16 w-full sm:w-auto overflow-hidden">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-6 h-full hover:text-[#00a651] transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-16 text-center text-sm font-black text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-6 h-full hover:text-[#00a651] transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="w-full sm:flex-1 bg-[#00a651] text-white h-16 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-900/10 hover:bg-[#008c44] active:scale-[0.98] disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2"
                        >
                            {isAdding ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Add to Bag'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-50 space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share this Masterpiece</p>
                <div className="flex items-center gap-3">
                    {[Twitter, Facebook].map((Icon, idx) => (
                        <button key={idx} className="w-12 h-12 rounded-2xl border-2 border-gray-50 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-900">
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                    <button className="w-12 h-12 rounded-2xl border-2 border-gray-50 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
