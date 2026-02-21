'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileMenu from '@/components/MobileMenu';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { requestOTP, login, isAuthenticated } = useAuth();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.endsWith('@gmail.com')) {
            setError('Please use a valid Gmail address.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await requestOTP(email);
            setStep('otp');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('Please enter a 6-digit code.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const userData = await login(email, otp);
            // Redirect admin users to admin dashboard
            const savedUser = localStorage.getItem('auth_user');
            const user = savedUser ? JSON.parse(savedUser) : null;
            router.push(user?.isAdmin ? '/admin' : '/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header
                onCartClick={() => setIsCartOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
            />

            <div className="container mx-auto px-4 pt-40 pb-20">
                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-none border border-gray-100 p-8 md:p-12 shadow-sm"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-block mb-6">
                                <Image
                                    src="/logo1.svg"
                                    alt="Olaluxe.ng"
                                    width={80}
                                    height={80}
                                    className="h-16 w-auto mx-auto"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
                                {step === 'email' ? 'Welcome' : 'Verify Email'}
                            </h1>
                            <p className="text-gray-500 text-sm font-medium">
                                {step === 'email'
                                    ? 'Enter your Gmail to login or register'
                                    : `We've sent a 6-digit code to ${email}`}
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 p-4 bg-red-50 text-red-600 text-xs rounded-sm border border-red-100 font-medium"
                            >
                                {error}
                            </motion.div>
                        )}

                        {step === 'email' ? (
                            <form onSubmit={handleSendOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                                        Gmail Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@gmail.com"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-sm p-4 text-sm focus:bg-white focus:ring-1 focus:ring-[#00a651] outline-none transition-all pl-11"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#00a651] hover:bg-[#008c44] text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
                                >
                                    {isLoading ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Send Login Code
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-sm p-4 text-center text-3xl tracking-[0.5em] font-bold focus:bg-white focus:ring-1 focus:ring-[#00a651] outline-none transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-300"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#00a651] hover:bg-[#008c44] text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
                                >
                                    {isLoading ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Verify & Login
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors py-2"
                                >
                                    Change Email
                                </button>
                            </form>
                        )}

                        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] leading-relaxed">
                                Secure login with Gmail OTP.<br />
                                One account for everything.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </main>
    );
}
