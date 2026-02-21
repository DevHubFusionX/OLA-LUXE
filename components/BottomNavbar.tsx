'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Search, User, LayoutGrid } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomNavbar() {
    const pathname = usePathname();
    const { totalItems, setIsCartOpen } = useCart();

    const navItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Shop', href: '/products', icon: LayoutGrid },
        { label: 'Search', href: '/search', icon: Search },
        { label: 'Cart', onClick: () => setIsCartOpen(true), icon: ShoppingBag, isCart: true },
        { label: 'Account', href: '/account', icon: User },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-brand-muted-peach/20 px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    const content = (
                        <div className="flex flex-col items-center gap-1 relative px-3 py-1">
                            <Icon
                                className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-brand-sage-green' : 'text-text-warm-gray'
                                    }`}
                            />
                            <span className={`text-[10px] font-bold font-outfit uppercase tracking-tighter transition-colors duration-300 ${isActive ? 'text-brand-sage-green' : 'text-text-warm-gray'
                                }`}>
                                {item.label}
                            </span>

                            {item.isCart && totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 right-2 bg-brand-sage-green text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white"
                                >
                                    {totalItems}
                                </motion.span>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 w-1 h-1 bg-brand-sage-green rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </div>
                    );

                    if (item.onClick) {
                        return (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className="focus:outline-none"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.href || '/'}
                            className="focus:outline-none"
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
