'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full pt-16">
            <div className="relative w-full aspect-[21/9] md:aspect-[32/9] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 tracking-tight uppercase italic">
                            Welcome to
                        </h1>
                        <p className="text-lg md:text-2xl font-black text-white/90 tracking-widest italic uppercase">
                            Olaluxe.ng
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
