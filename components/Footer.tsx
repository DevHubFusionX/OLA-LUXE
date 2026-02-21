'use client';

import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-anchor-espresso text-bg-warm-beige pt-20 pb-12 grain-texture">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Contact Us */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 font-outfit text-brand-muted-peach">Contact Us</h3>
                        <div className="space-y-5 text-sm text-bg-warm-beige/60">
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4" />
                                <span>08104978486</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span>Lekki, Lagos Nigeria, Lekki, Lagos, Nigeria</span>
                            </div>
                        </div>
                    </div>

                    {/* Empty Space for Grid alignment like in image */}
                    <div className="hidden lg:block"></div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 font-outfit text-brand-muted-peach">Newsletter</h3>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Email or phone number"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:ring-1 focus:ring-brand-muted-peach/50 outline-none w-full transition-all placeholder:text-white/30"
                            />
                            <button className="bg-brand-sage-green hover:bg-brand-sage-green/90 text-white py-3.5 px-8 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-soft self-start lg:self-auto lg:w-max">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-2">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5 text-bg-warm-beige/60">
                            <Instagram className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5 text-bg-warm-beige/60">
                            <Facebook className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-bg-warm-beige/60">
                            <Twitter className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-white/10 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                        Powered by Bumpa
                    </div>
                </div>
            </div>
        </footer>
    );
}
