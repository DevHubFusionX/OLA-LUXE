'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    User,
    Package,
    LogOut,
    ChevronRight,
    Mail,
    Calendar,
    ArrowRight,
    ShoppingBag,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useMyOrders } from '@/hooks/useMyOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileMenu from '@/components/MobileMenu';
import { format } from 'date-fns';

export default function AccountPage() {
    const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
    const { data: orders, isLoading: ordersLoading } = useMyOrders();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#00a651] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white">
                <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
                <main className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                        <User className="w-8 h-8 text-gray-200" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-4 italic">Sign In</h1>
                    <p className="text-gray-500 mb-10 max-w-sm font-medium">Please sign in to view your order history and manage your account settings.</p>
                    <Link
                        href="/login"
                        className="bg-[#00a651] text-white px-12 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#008c44] transition-all shadow-xl shadow-green-900/10"
                    >
                        Sign In
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const totalSpent = orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;

    return (
        <div className="min-h-screen bg-white">
            <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Banner Section */}
            <div className="relative h-[240px] w-full mt-16 md:mt-20 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                    alt="Account"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">My Account</h1>
                    <div className="flex items-center gap-2 mt-4 text-white/70 text-xs font-bold uppercase tracking-widest">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span>Account</span>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                {/* Profile Summary Strip */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center font-black text-gray-300 text-xl border border-gray-100">
                            {user?.email.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight lowercase">
                                {user?.email.split('@')[0]}
                            </h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Orders</p>
                            <p className="text-xl font-black text-gray-900 italic">{orders?.length || 0}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime</p>
                            <p className="text-xl font-black text-[#00a651] italic">₦{totalSpent.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-all"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Orders Content */}
                <div className="mt-16 space-y-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight italic">Order History</h3>
                        {orders && orders.length > 0 && (
                            <span className="text-[10px] font-black text-[#00a651] uppercase tracking-widest bg-[#00a651]/5 px-3 py-1 rounded-full">
                                {orders.length} Orders
                            </span>
                        )}
                    </div>

                    {ordersLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-28 w-full bg-gray-50 rounded-xl animate-pulse flex items-center px-8 border border-gray-100">
                                    <div className="flex items-center gap-5 flex-1">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                                        <div className="space-y-2">
                                            <div className="h-3 w-32 bg-gray-100 rounded-full" />
                                            <div className="h-3 w-20 bg-gray-100 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="w-24 h-4 bg-gray-100 rounded-full" />
                                </div>
                            ))}
                        </div>
                    ) : !orders || orders.length === 0 ? (
                        <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-xl">
                            <Package className="w-12 h-12 text-gray-100 mx-auto mb-6" />
                            <h4 className="text-xl font-black text-gray-900 italic mb-2">No orders found</h4>
                            <p className="text-gray-400 font-medium mb-8">You haven't placed any orders yet.</p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
                            >
                                Shop Trends <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center font-black text-gray-400 italic text-sm border border-gray-100 group-hover:bg-white group-hover:border-[#00a651]/20 transition-colors">
                                                #{order.id.slice(-4).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">Order No. {order.id.slice(-4).toUpperCase()}</p>
                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                        order.status === 'cancelled' ? 'bg-rose-50 text-rose-600' :
                                                            'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    <p className="text-[10px] font-bold uppercase tracking-widest">
                                                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-12">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Products</p>
                                                <p className="text-xs font-black text-gray-900 italic">{order.items.length} Items</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Amount</p>
                                                <p className="text-lg font-black text-gray-900 italic tracking-tight">₦{order.totalPrice.toLocaleString()}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#00a651] group-hover:text-white transition-all transform group-hover:translate-x-1">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Account Actions */}
                <div className="mt-24 pt-10 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left group">
                        <div>
                            <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-0.5 italic">Account Settings</p>
                            <p className="text-[10px] font-bold text-gray-400">Update your email and preferences</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                    </button>
                    <Link href="/products" className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left group">
                        <div>
                            <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-0.5 italic">Continue Shopping</p>
                            <p className="text-[10px] font-bold text-gray-400">Explore new arrivals and collections</p>
                        </div>
                        <ShoppingBag className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
