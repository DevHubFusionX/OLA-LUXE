'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, User, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    // No props needed after globalizing cart state
}

export default function Header({ }: HeaderProps) {
    const { totalItems, setIsCartOpen } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 border-b border-[#4A3F35]/5 ${isScrolled
                ? 'py-2 bg-bg-warm-beige/90 backdrop-blur-md shadow-soft'
                : 'py-4 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between gap-8">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo1.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>
                </div>

                {/* Search Bar (Centered) */}
                <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl relative">
                    <input
                        type="text"
                        placeholder="Search for jewelry, accessories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-soft-cream border border-[#4A3F35]/10 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-1 focus:ring-brand-muted-peach/30 transition-all outline-none text-text-deep-charcoal placeholder:text-text-warm-gray"
                    />
                    <button type="submit">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-warm-gray cursor-pointer" />
                    </button>
                </form>

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
                        <span className="text-xs font-bold font-outfit text-text-warm-gray flex items-center gap-0.5 group-hover:text-text-deep-charcoal transition-colors uppercase tracking-wider">
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
                            className="hidden md:flex items-center gap-2 text-xs font-bold font-outfit text-text-warm-gray hover:text-text-deep-charcoal transition-colors uppercase tracking-widest"
                        >
                            Login
                        </Link>
                    )}

                    {/* Cart */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                        <ShoppingBag className="w-6 h-6 text-gray-700" />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-1 -right-1 bg-brand-sage-green text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-bg-warm-beige shadow-sm"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Mobile Search Icon */}
                    <Link href="/search" className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Search className="w-6 h-6 text-gray-700" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
