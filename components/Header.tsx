'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, User, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    onCartClick: () => void;
    onMenuClick: () => void;
}

export default function Header({ onCartClick, onMenuClick }: HeaderProps) {
    const { totalItems } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between gap-8">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo1.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>
                </div>

                {/* Search Bar (Centered) */}
                <div className="hidden lg:flex flex-1 max-w-2xl relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-100 border-none rounded-md py-2.5 pl-4 pr-10 text-sm focus:ring-1 focus:ring-gray-200 transition-all outline-none text-gray-700"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-6">
                    {/* Currency Selector */}
                    <div className="hidden md:flex items-center gap-1 cursor-pointer group">
                        <div className="w-5 h-5 relative rounded-sm overflow-hidden border border-gray-100">
                            <Image
                                src="https://flagcdn.com/ng.svg"
                                alt="NGN"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xs font-semibold text-gray-600 flex items-center gap-0.5 group-hover:text-black transition-colors">
                            NGN <ChevronDown className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Login / Account */}
                    {isAuthenticated ? (
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/account"
                                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            >
                                <User className="w-4 h-4" />
                                Account
                            </Link>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            Login
                        </Link>
                    )}

                    {/* Cart */}
                    <button
                        onClick={onCartClick}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                        <ShoppingBag className="w-6 h-6 text-gray-700" />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Mobile Search Icon */}
                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Search className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </header>
    );
}
