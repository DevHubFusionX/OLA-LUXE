'use client';

import React from 'react';
import { X, ShoppingBag, Instagram, Send, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { data: categories } = useCategories();
    const { isAuthenticated, logout } = useAuth();

    const menuItems = [
        { label: 'All Collection', href: '/products' },
        ...(categories?.map(cat => ({
            label: cat.name,
            href: `/products/${cat.slug || cat.name.toLowerCase()}`
        })) || [])
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 h-full w-full max-w-[280px] bg-brand-cream z-[70] soft-shadow flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-brand-peach">
                            <span className="text-xl font-black tracking-tighter text-brand-stone">
                                OLALUXE<span className="text-brand-accent">.NG</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-brand-peach rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <nav className="space-y-6">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="block text-2xl font-bold text-brand-stone hover:text-brand-accent transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Auth Section */}
                            <div className="mt-8 pt-8 border-t border-brand-peach space-y-6">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            href="/account"
                                            onClick={onClose}
                                            className="flex items-center gap-4 text-xl font-bold text-brand-stone hover:text-brand-accent transition-colors"
                                        >
                                            <User className="w-6 h-6" />
                                            Account
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                onClose();
                                            }}
                                            className="flex items-center gap-4 text-xl font-bold text-red-500 hover:text-red-700 transition-colors w-full text-left"
                                        >
                                            <LogOut className="w-6 h-6" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={onClose}
                                        className="flex items-center gap-4 text-xl font-bold text-brand-stone hover:text-brand-accent transition-colors"
                                    >
                                        <User className="w-6 h-6" />
                                        Login
                                    </Link>
                                )}
                            </div>

                            <div className="mt-12 pt-12 border-t border-brand-peach">
                                <p className="text-xs font-bold text-brand-stone uppercase tracking-widest mb-4 opacity-50">
                                    Connect with us
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="p-3 bg-white rounded-lg text-brand-stone hover:text-brand-accent transition-all hover:scale-110 shadow-sm border border-brand-peach">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-white rounded-lg text-brand-stone hover:text-brand-accent transition-all hover:scale-110 shadow-sm border border-brand-peach">
                                        <Send className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
