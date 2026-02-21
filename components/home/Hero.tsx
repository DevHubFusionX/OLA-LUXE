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
                <div className="absolute inset-0 bg-anchor-espresso/20 flex flex-col items-center justify-center text-center px-4 backdrop-blur-[1px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-brand-muted-peach mb-4 font-outfit">
                            Premium Minimalist Jewelry
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase font-outfit italic">
                            Olaluxe.ng
                        </h1>
                        <div className="h-[1px] w-12 bg-white/30" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
