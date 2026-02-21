'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileMenu from '@/components/MobileMenu';
import { sendWhatsAppOrder } from '@/utils/whatsapp-service';
import apiClient from '@/lib/axios';
import { toast } from 'react-hot-toast';
import EmptyBagState from '@/components/checkout/EmptyBagState';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ShippingSelector from '@/components/checkout/ShippingSelector';
import PaymentSection from '@/components/checkout/PaymentSection';
import { useDeliveryZones } from '@/hooks/useDeliveryZones';
import { DeliveryZone } from '@/lib/schemas';

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOrderPlacing, setIsOrderPlacing] = useState(false);
    const { data: deliveryZones = [], isLoading: isDeliveryZonesLoading, error: deliveryZonesError } = useDeliveryZones();

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phone: string;
        address: string;
        notes: string;
        deliveryZone: DeliveryZone | null;
    }>({
        name: '',
        email: user?.email || '',
        phone: '',
        address: '',
        notes: '',
        deliveryZone: null
    });

    useEffect(() => {
        if (!formData.deliveryZone && deliveryZones.length > 0) {
            setFormData(prev => ({ ...prev, deliveryZone: deliveryZones[0] }));
        }
    }, [deliveryZones, formData.deliveryZone]);


    const handleWhatsAppOrder = async () => {
        setIsOrderPlacing(true);
        try {
            if (!formData.deliveryZone) {
                toast.error('Please select a delivery zone.');
                return;
            }

            const orderData = {
                customerName: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                notes: formData.notes,
                deliveryZone: formData.deliveryZone.name,
                items: cart.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    selectedVariation: item.selectedVariation
                })),
                deliveryFee: formData.deliveryZone.fee,
                totalPrice: totalPrice + formData.deliveryZone.fee,
                status: 'pending'
            };

            await apiClient.post('/orders', orderData);

            // Send WhatsApp message
            sendWhatsAppOrder(cart, {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                notes: formData.notes,
                deliveryZone: formData.deliveryZone
            }, totalPrice);

            clearCart();
            router.push('/checkout/success');
        } catch (error) {
            console.error('Order creation failed:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsOrderPlacing(false);
        }
    };



    return (
        <div className="min-h-screen bg-white">
            <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {cart.length === 0 && !isOrderPlacing ? (
                <EmptyBagState />
            ) : (
                <>
                    {/* Banner Section */}
                    <div className="relative h-[300px] w-full mt-16 md:mt-20 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1515562141207-7a88fb0ce335?q=80&w=2070&auto=format&fit=crop"
                            alt="Checkout"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">Checkout</h1>
                            <div className="flex items-center gap-2 mt-4 text-white/80 text-[10px] font-black uppercase tracking-widest">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight className="w-4 h-4" />
                                <Link href="/cart" className="hover:text-white transition-colors">Bag</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>

                    <main className="container mx-auto px-4 py-20">
                        <div className="grid lg:grid-cols-12 gap-16 items-start">
                            {/* Left: Form Sections */}
                            <div className="lg:col-span-7 space-y-16">
                                <CheckoutForm formData={formData} setFormData={setFormData} />

                                <div className="h-px bg-gray-50" />

                                <ShippingSelector
                                    deliveryZones={deliveryZones}
                                    selectedZone={formData.deliveryZone}
                                    onZoneChange={(zone) => setFormData({ ...formData, deliveryZone: zone })}
                                    isLoading={isDeliveryZonesLoading}
                                    errorMessage={deliveryZonesError?.message}
                                />

                                <div className="h-px bg-gray-50" />

                                <PaymentSection
                                    isOrderPlacing={isOrderPlacing}
                                    onWhatsAppOrder={handleWhatsAppOrder}
                                />
                            </div>

                            {/* Right: Order Summary */}
                            <div className="lg:col-span-5">
                                <OrderSummary totalPrice={totalPrice} deliveryFee={formData.deliveryZone?.fee || 0} />
                            </div>
                        </div>
                    </main>
                </>
            )}
       </div>
    );
}
