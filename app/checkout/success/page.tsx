'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header onCartClick={() => { }} onMenuClick={() => { }} />

            <main className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-[#00a651]/10 rounded-full flex items-center justify-center mb-8"
                >
                    <CheckCircle className="w-12 h-12 text-[#00a651]" />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 italic">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-500 max-w-md mx-auto mb-12 font-medium">
                        Thank you for shopping with Olaluxe.ng. Your order has been received and is being processed.
                        You will receive an email confirmation shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products"
                            className="bg-[#00a651] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#008c44] transition-all shadow-xl shadow-[#00a651]/20"
                        >
                            <ShoppingBag className="w-4 h-4" /> Continue Shopping
                        </Link>
                        <Link
                            href="/account"
                            className="bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                            Track Order <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
