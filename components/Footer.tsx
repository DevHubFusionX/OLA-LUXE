'use client';

import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Contact Us */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Contact Us</h3>
                        <div className="space-y-4 text-sm text-gray-400">
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
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Sign up for discounts & updates</h3>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Enter your phone number or email address"
                                className="bg-gray-800 border-none rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-gray-600 outline-none w-full"
                            />
                            <button className="bg-[#00a651] hover:bg-[#008c44] text-white py-3 px-6 rounded-sm text-sm font-bold uppercase transition-colors self-start lg:self-auto lg:w-max">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Instagram className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Facebook className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Twitter className="w-5 h-5 text-gray-400" />
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
