'use client';

import React, { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, MapPin, Phone, User, Notebook } from 'lucide-react';
import Image from 'next/image';
import { useCart, CartItem } from '@/context/CartContext';
import { useDeliveryZones } from '@/hooks/useDeliveryZones';
import { DeliveryZone } from '@/lib/schemas';
import { sendWhatsAppOrder } from '@/utils/whatsapp-service';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
    // No props needed after globalizing cart state
}

export default function CartDrawer({ }: CartDrawerProps) {
    const {
        cart,
        addToCart,
        removeFromCart,
        removeItem,
        totalPrice,
        totalItems,
        isCartOpen,
        setIsCartOpen
    } = useCart();
    const onClose = () => setIsCartOpen(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const { data: deliveryZones = [] } = useDeliveryZones();
    const [formData, setFormData] = useState<{
        name: string;
        address: string;
        phone: string;
        notes: string;
        deliveryZone: DeliveryZone | null;
    }>({
        name: '',
        address: '',
        phone: '',
        notes: '',
        deliveryZone: null
    });

    useEffect(() => {
        if (!formData.deliveryZone && deliveryZones.length > 0) {
            setFormData(prev => ({ ...prev, deliveryZone: deliveryZones[0] }));
        }
    }, [deliveryZones, formData.deliveryZone]);

    const handleIncrease = (item: CartItem) => {
        const { quantity, ...productOnly } = item;
        addToCart(productOnly, item.selectedVariation, item.selectedImage);
    };

    const handleDecrease = (item: any) => {
        removeFromCart(item.id, item.selectedVariation);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'deliveryZone') {
            const zone = deliveryZones.find(z => z.name === value) || null;
            setFormData(prev => ({ ...prev, deliveryZone: zone }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.deliveryZone) return;
        sendWhatsAppOrder(
            cart,
            {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                notes: formData.notes,
                deliveryZone: formData.deliveryZone,
            },
            totalPrice
        );
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                                    {isCheckout ? 'Checkout' : 'Your Bag'}
                                    <span className="text-xs font-medium text-gray-400 normal-case tracking-normal">({totalItems} items)</span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {!isCheckout ? (
                                <>
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center px-6">
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                                                <ShoppingBag className="w-10 h-10 text-gray-200" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Your bag is empty</h3>
                                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                                Seems like you haven't added anything to your bag yet.
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="w-full bg-[#00a651] text-white py-4 rounded-lg text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#008c44] transition-colors"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <AnimatePresence>
                                                {cart.map((item, idx) => (
                                                    <motion.div
                                                        key={item.id + (item.selectedVariation || '')}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="flex gap-4 group"
                                                    >
                                                        <div className="w-24 h-24 bg-gray-50 rounded-lg border border-gray-100 relative overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={item.selectedImage || item.images?.[0] || ''}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                sizes="96px"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex flex-col pt-1">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <h3 className="font-bold text-gray-900 truncate text-sm leading-tight hover:text-[#00a651] transition-colors cursor-pointer capitalize">
                                                                    {item.name}
                                                                </h3>
                                                                <button
                                                                    onClick={() => removeItem(item.id, item.selectedVariation)}
                                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>

                                                            {item.selectedVariation && (
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Size: {item.selectedVariation}</p>
                                                            )}

                                                            <div className="mt-auto flex items-center justify-between">
                                                                <p className="text-sm font-bold text-[#00a651]">
                                                                    ₦{item.price.toLocaleString()}
                                                                </p>

                                                                <div className="flex items-center border border-gray-100 rounded-sm bg-gray-50 h-8">
                                                                    <button
                                                                        onClick={() => handleDecrease(item)}
                                                                        className="px-2.5 h-full text-gray-400 hover:text-[#00a651] transition-colors"
                                                                    >
                                                                        <Minus className="w-3 h-3" />
                                                                    </button>
                                                                    <span className="w-8 text-center text-xs font-bold text-gray-900 border-x border-gray-100 h-full flex items-center justify-center bg-white">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handleIncrease(item)}
                                                                        className="px-2.5 h-full text-gray-400 hover:text-[#00a651] transition-colors"
                                                                    >
                                                                        <Plus className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    id="checkout-form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                                <User className="w-3 h-3 text-[#00a651]" /> Full Name
                                            </label>
                                            <input
                                                required
                                                name="name"
                                                placeholder="Jane Doe"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 padx-4 text-sm outline-none focus:ring-1 focus:ring-gray-200 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                                <Phone className="w-3 h-3 text-[#00a651]" /> Phone Number
                                            </label>
                                            <input
                                                required
                                                name="phone"
                                                placeholder="080 1234 5678"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 padx-4 text-sm outline-none focus:ring-1 focus:ring-gray-200 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                                <MapPin className="w-3 h-3 text-[#00a651]" /> Delivery Address
                                            </label>
                                            <textarea
                                                required
                                                name="address"
                                                placeholder="123 Street, Area, City"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 padx-4 text-sm outline-none focus:ring-1 focus:ring-gray-200 transition-all font-medium min-h-[100px] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                                <MapPin className="w-3 h-3 text-[#00a651]" /> Delivery Location
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="deliveryZone"
                                                    value={formData.deliveryZone?.name || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 padx-4 text-sm outline-none focus:ring-1 focus:ring-gray-200 transition-all font-medium appearance-none"
                                                >
                                                    {deliveryZones.length === 0 ? (
                                                        <option value="" disabled>
                                                            No delivery zones available
                                                        </option>
                                                    ) : (
                                                        deliveryZones.map(zone => (
                                                            <option key={zone.name} value={zone.name}>
                                                                {zone.name} (₦{zone.fee.toLocaleString()})
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                                <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 rotate-45" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                                <Notebook className="w-3 h-3 text-[#00a651]" /> Delivery Notes
                                            </label>
                                            <input
                                                name="notes"
                                                placeholder="Apartment number, landmark, etc."
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 padx-4 text-sm outline-none focus:ring-1 focus:ring-gray-200 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </motion.form>
                            )}
                        </div>

                        {/* Footer / Summary */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="space-y-2 px-2">
                                    <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span>₦{totalPrice.toLocaleString()}</span>
                                    </div>
                                    {isCheckout && (
                                        <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Delivery Fee</span>
                                            <span>₦{(formData.deliveryZone?.fee || 0).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900">
                                        <span className="text-sm uppercase tracking-widest">Total</span>
                                        <span className="text-xl">₦{(totalPrice + (isCheckout ? (formData.deliveryZone?.fee || 0) : 0)).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    {!isCheckout ? (
                                        <Link
                                            href="/checkout"
                                            onClick={onClose}
                                            className="w-full bg-brand-soft-coral text-white py-4 rounded-lg text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-soft-coral/90 transition-all transform hover:translate-y-[-1px] shadow-lg shadow-brand-soft-coral/10 font-outfit"
                                        >
                                            Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsCheckout(false)}
                                                className="flex-1 bg-white border border-gray-100 py-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-gray-50 transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                form="checkout-form"
                                                type="submit"
                                                className="flex-[2] bg-cta-whatsapp text-white py-4 rounded-lg text-xs font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-cta-whatsapp/90 transition-all shadow-lg shadow-cta-whatsapp/10 font-outfit"
                                            >
                                                <Image
                                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                                    alt=""
                                                    width={16}
                                                    height={16}
                                                    className="brightness-0 invert"
                                                />
                                                Complete via WhatsApp
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[9px] text-center text-gray-400 font-medium px-4">
                                    By proceeding, you agree to our terms of service and privacy policy.
                                    Your order will be completed via WhatsApp.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
