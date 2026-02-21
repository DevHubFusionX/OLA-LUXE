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
            <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-black text-text-deep-charcoal leading-tight tracking-tighter italic uppercase font-outfit">
                    {product.name}
                </h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-brand-soft-coral fill-current" />
                        ))}
                    </div>
                    <span className="text-[9px] font-black text-text-warm-gray/60 uppercase tracking-[0.2em] font-outfit">( 0 collection ratings )</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-baseline gap-4">
                    <p className="text-4xl font-black text-text-deep-charcoal italic tracking-tighter font-outfit">
                        ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-lg font-black text-text-warm-gray/20 line-through font-outfit">
                        ₦{(product.price * 1.5).toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center gap-2.5 text-brand-sage-green text-[9px] font-black uppercase tracking-[0.3em] bg-brand-sage-green/5 px-4 py-2 rounded-lg w-fit border border-brand-sage-green/10 font-outfit">
                    <div className="w-1.5 h-1.5 bg-brand-sage-green rounded-full animate-pulse" />
                    Atelier Exclusive piece
                </div>
            </div>

            <div className="space-y-6">
                {product.variations && product.variations.length > 0 && (
                    <div className="space-y-4">
                        {product.variations.map((variation) => (
                            <div key={variation.type} className="space-y-3">
                                <label className="text-[10px] font-black text-text-deep-charcoal uppercase tracking-[0.2em] block font-outfit">
                                    {variation.type}:
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-lg py-4 px-6 text-[10px] font-black text-text-deep-charcoal appearance-none outline-none transition-all font-outfit uppercase tracking-widest"
                                        onChange={(e) => setSelectedVariations({ ...selectedVariations, [variation.type]: e.target.value })}
                                        value={selectedVariations[variation.type] || ''}
                                    >
                                        <option value="">Select {variation.type}</option>
                                        {variation.options.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight className="w-4 h-4 text-text-warm-gray/40 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-5 pt-4">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div className="flex items-center border border-anchor-espresso/10 rounded-lg bg-bg-soft-cream h-16 w-full sm:w-auto overflow-hidden">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-6 h-full hover:text-brand-soft-coral transition-colors text-text-warm-gray"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-16 text-center text-xs font-black text-text-deep-charcoal font-outfit">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-6 h-full hover:text-brand-soft-coral transition-colors text-text-warm-gray"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="w-full sm:flex-1 bg-brand-soft-coral text-white h-16 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-brand-soft-coral/10 hover:bg-brand-soft-coral/90 active:scale-[0.98] disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2 font-outfit"
                        >
                            {isAdding ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Add to Collection'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Trust & Quality Section */}
            <div className="grid grid-cols-2 gap-4 py-8 border-y border-anchor-espresso/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-anchor-espresso/5 flex items-center justify-center text-brand-sage-green shadow-sm">
                        <Star className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-deep-charcoal font-outfit">Certified Quality</p>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-text-warm-gray/60 font-outfit">Hand-selected pieces</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-anchor-espresso/5 flex items-center justify-center text-brand-sage-green shadow-sm">
                        <Twitter className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-deep-charcoal font-outfit">Direct Artisan</p>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-text-warm-gray/60 font-outfit">No middle men</p>
                    </div>
                </div>
            </div>

            <div className="pt-2 space-y-5">
                <p className="text-[10px] font-black text-text-warm-gray/40 uppercase tracking-[0.3em] font-outfit">Share Masterpiece</p>
                <div className="flex items-center gap-3">
                    {[Twitter, Facebook].map((Icon, idx) => (
                        <button key={idx} className="w-12 h-12 rounded-lg border border-anchor-espresso/10 flex items-center justify-center hover:bg-bg-soft-cream transition-all text-text-deep-charcoal shadow-sm">
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                    <button className="w-12 h-12 rounded-lg border border-anchor-espresso/10 flex items-center justify-center hover:bg-bg-soft-cream transition-all shadow-sm">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            width={22}
                            height={22}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
