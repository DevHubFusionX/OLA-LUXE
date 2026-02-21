'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface OrderSummaryProps {
    totalPrice: number;
    deliveryFee: number;
}

export default function OrderSummary({ totalPrice, deliveryFee }: OrderSummaryProps) {
    const { cart, addToCart, removeFromCart, removeItem } = useCart();

    return (
        <div className="bg-bg-soft-cream rounded-2xl border border-anchor-espresso/5 shadow-soft p-8 lg:p-10 sticky top-32">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-text-deep-charcoal uppercase tracking-tighter font-outfit italic">Order Summary</h2>
                <span className="bg-anchor-espresso/5 text-text-warm-gray text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
                </span>
            </div>

            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedVariation}`} className="flex gap-5 group">
                        <div className="relative w-20 h-20 bg-bg-warm-beige rounded-xl overflow-hidden flex-shrink-0 border border-anchor-espresso/5">
                            <Image
                                src={item.selectedImage || item.images?.[0] || '/placeholder.png'}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-[10px] font-black text-text-deep-charcoal uppercase tracking-widest truncate pr-4 font-outfit">
                                    {item.name}
                                </h3>
                                <button
                                    onClick={() => removeItem(item.id, item.selectedVariation)}
                                    className="text-text-warm-gray/40 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <p className="text-[9px] font-black text-brand-soft-coral uppercase tracking-[0.2em] mb-3 font-outfit">
                                {item.selectedVariation || 'Standard'}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-bg-warm-beige rounded-full p-1 border border-anchor-espresso/5">
                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedVariation)}
                                        className="w-6 h-6 flex items-center justify-center text-text-warm-gray hover:text-text-deep-charcoal transition-colors"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-[10px] font-black text-text-deep-charcoal font-outfit">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item, item.selectedVariation, item.selectedImage)}
                                        className="w-6 h-6 flex items-center justify-center text-text-warm-gray hover:text-text-deep-charcoal transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <p className="text-xs font-black text-text-deep-charcoal font-outfit">
                                    ₦{(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-anchor-espresso/5">
                <div className="flex justify-between text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] font-outfit">
                    <span>Subtotal</span>
                    <span className="text-text-deep-charcoal">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] font-outfit">
                    <span>Delivery Fee</span>
                    <span className="text-brand-sage-green">
                        {deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Free'}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-anchor-espresso/10">
                    <span className="text-xs font-black text-text-deep-charcoal uppercase tracking-[0.3em] font-outfit italic">Total</span>
                    <span className="text-2xl font-black text-text-deep-charcoal italic tracking-tighter font-outfit">
                        ₦{(totalPrice + deliveryFee).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
