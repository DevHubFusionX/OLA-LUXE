'use client';

import { MessageSquare, ShieldCheck } from 'lucide-react';

interface PaymentSectionProps {
    isOrderPlacing: boolean;
    onWhatsAppOrder: () => void;
}

export default function PaymentSection({
    isOrderPlacing,
    onWhatsAppOrder
}: PaymentSectionProps) {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-xl shadow-gray-900/20">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-gray-900 italic tracking-tighter uppercase">Order & Payment</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Complete your order via WhatsApp</p>
                </div>
            </div>

            <div className="bg-green-50/50 border-2 border-green-100 rounded-xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-4 text-[#00a651]">
                    <div className="w-10 h-10 bg-[#00a651] text-white rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold leading-relaxed">
                        After clicking the button below, your order will be sent to us on WhatsApp.
                        We will confirm your order and provide payment details there.
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
                <button
                    onClick={onWhatsAppOrder}
                    disabled={isOrderPlacing}
                    className="w-full bg-[#00a651] text-white h-20 rounded-xl text-sm font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-green-900/20 hover:bg-[#008c44] active:scale-[0.98] disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-4 italic"
                >
                    {isOrderPlacing ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <MessageSquare className="w-5 h-5" />
                            <span>Order on WhatsApp</span>
                        </>
                    )}
                </button>
                <p className="text-center mt-6 text-[9px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                    By placing your order, you agree to our <br />
                    <span className="text-gray-400 underline cursor-pointer">Terms of Service</span> and <span className="text-gray-400 underline cursor-pointer">Privacy Policy</span>
                </p>
            </div>
        </section>
    );
}
