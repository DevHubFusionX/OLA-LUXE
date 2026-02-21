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
                        className={`aspect-square relative rounded border-2 transition-all ${activeImageIndex === idx ? 'border-[#00a651] shadow-lg shadow-green-900/5' : 'border-gray-50 opacity-60 hover:opacity-100'}`}
                    >
                        <Image src={img} alt="" fill className="object-cover rounded" sizes="80px" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="lg:col-span-10 relative">
                <div className="aspect-square relative bg-white border border-gray-50 rounded-[2rem] overflow-hidden group shadow-xl shadow-gray-200/50">
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
                            className="p-3 bg-white/90 hover:bg-white rounded-2xl shadow-xl text-gray-800 transition-all border border-gray-100"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveImageIndex(prev => (prev + 1) % images.length)}
                            className="p-3 bg-white/90 hover:bg-white rounded-2xl shadow-xl text-gray-800 transition-all border border-gray-100"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <button className="absolute bottom-6 right-6 p-3 bg-white/90 hover:bg-white rounded-2xl shadow-xl text-gray-400 border border-gray-100 transition-all">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Mobile Thumbnails */}
                <div className="flex lg:hidden gap-3 mt-6 overflow-x-auto pb-2 px-1">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-20 h-20 flex-shrink-0 relative rounded-2xl border-2 transition-all ${activeImageIndex === idx ? 'border-[#00a651] shadow-lg shadow-green-900/5' : 'border-gray-50'}`}
                        >
                            <Image src={img} alt="" fill className="object-cover rounded-2xl" sizes="80px" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
