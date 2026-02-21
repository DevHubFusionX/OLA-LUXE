'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EmptyBagState() {
    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 max-w-md mx-auto"
            >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto relative">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#00a651] rounded-full border-2 border-white"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter uppercase">Your Bag is Empty</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Looking for something special? Explore our latest collection and find the perfect piece for your style.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/products"
                        className="w-full sm:w-auto bg-[#00a651] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-green-900/10 hover:bg-[#008c44] transition-all"
                    >
                        Shop Collections
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-50 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
