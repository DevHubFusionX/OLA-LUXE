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
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-anchor-espresso text-white rounded-lg flex items-center justify-center shadow-soft">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-text-deep-charcoal italic tracking-tighter uppercase font-outfit">Order & Payment</h2>
                    <p className="text-[10px] text-text-warm-gray font-black uppercase tracking-[0.2em] font-outfit">Secure Verification</p>
                </div>
            </div>

            <div className="bg-brand-sage-green/5 border border-brand-sage-green/10 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-5 text-brand-sage-green">
                    <div className="w-10 h-10 bg-brand-sage-green text-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-black leading-relaxed uppercase tracking-wider font-outfit">
                        Your order will be sent to us on WhatsApp.
                        We will confirm availability and provide payment details immediately.
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
                <button
                    onClick={onWhatsAppOrder}
                    disabled={isOrderPlacing}
                    className="w-full bg-cta-whatsapp text-white h-20 rounded-lg text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-xl shadow-cta-whatsapp/20 hover:bg-cta-whatsapp/90 active:scale-[0.98] disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-4 italic font-outfit ring-4 ring-cta-whatsapp/10"
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
                <p className="text-center mt-8 text-[9px] font-black text-text-warm-gray/40 uppercase tracking-[0.2em] leading-relaxed font-outfit">
                    By placing your order, you agree to our <br />
                    <span className="text-text-warm-gray/60 underline cursor-pointer decoration-text-warm-gray/20">Terms of Service</span> and <span className="text-text-warm-gray/60 underline cursor-pointer decoration-text-warm-gray/20">Privacy Policy</span>
                </p>
            </div>
        </section>
    );
}
