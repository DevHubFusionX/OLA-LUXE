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
        <div className="bg-white rounded-xl border border-gray-50 shadow-2xl shadow-gray-200/50 p-8 lg:p-10 sticky top-32">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 italic tracking-tighter uppercase">Order Summary</h2>
                <span className="bg-gray-50 text-gray-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
                </span>
            </div>

            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedVariation}`} className="flex gap-4 group">
                        <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                            <Image
                                src={item.selectedImage || item.images?.[0] || '/placeholder.png'}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight truncate pr-4">
                                    {item.name}
                                </h3>
                                <button
                                    onClick={() => removeItem(item.id, item.selectedVariation)}
                                    className="text-gray-300 hover:text-rose-500 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                            <p className="text-[10px] font-bold text-[#00a651] uppercase tracking-widest mb-3">
                                {item.selectedVariation || 'No Variation'}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedVariation)}
                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-[10px] font-black text-gray-900">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item, item.selectedVariation, item.selectedImage)}
                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                <p className="text-xs font-black text-gray-900 tracking-tighter">
                                    ₦{(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Delivery Fee</span>
                    <span className="text-[#00a651]">
                        {deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Free'}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-gray-900/5">
                    <span className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] italic">Total</span>
                    <span className="text-2xl font-black text-[#00a651] italic tracking-tighter">
                        ₦{(totalPrice + deliveryFee).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
