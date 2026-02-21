'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Thumbnails (Hidden on mobile, vertical for desktop) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`aspect-square relative rounded-lg border transition-all duration-300 ${activeImageIndex === idx ? 'border-brand-soft-coral shadow-soft' : 'border-anchor-espresso/5 opacity-60 hover:opacity-100 bg-bg-warm-beige'}`}
                    >
                        <Image src={img} alt="" fill className="object-cover rounded-lg" sizes="80px" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="lg:col-span-10 relative">
                <div className="aspect-square relative bg-white border border-anchor-espresso/5 rounded-2xl overflow-hidden group shadow-soft">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImageIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[activeImageIndex]}
                                alt={name}
                                fill
                                priority
                                className="object-contain p-8"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setActiveImageIndex(prev => (prev - 1 + images.length) % images.length)}
                            className="p-3 bg-white/95 hover:bg-white rounded-lg shadow-soft text-text-deep-charcoal transition-all border border-anchor-espresso/5"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveImageIndex(prev => (prev + 1) % images.length)}
                            className="p-3 bg-white/95 hover:bg-white rounded-lg shadow-soft text-text-deep-charcoal transition-all border border-anchor-espresso/5"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <button className="absolute bottom-6 right-6 p-3 bg-white/95 hover:bg-white rounded-lg shadow-soft text-text-warm-gray/40 border border-anchor-espresso/5 transition-all">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Mobile Thumbnails */}
                <div className="flex lg:hidden gap-3 mt-6 overflow-x-auto pb-2 px-1">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-20 h-20 flex-shrink-0 relative rounded-lg border transition-all duration-300 ${activeImageIndex === idx ? 'border-brand-soft-coral shadow-soft' : 'border-anchor-espresso/5 bg-bg-warm-beige'}`}
                        >
                            <Image src={img} alt="" fill className="object-cover rounded-lg" sizes="80px" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
