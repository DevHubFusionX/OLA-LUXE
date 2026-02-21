import { User, Phone, Mail, MapPin, FileText } from 'lucide-react';

interface CheckoutFormProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CheckoutForm({ formData, setFormData }: CheckoutFormProps) {
    return (
        <div className="space-y-12">
            <section className="space-y-8">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-anchor-espresso text-white rounded-lg flex items-center justify-center shadow-soft">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-text-deep-charcoal italic tracking-tighter uppercase font-outfit">Personal Info</h2>
                        <p className="text-[10px] text-text-warm-gray font-black uppercase tracking-[0.2em] font-outfit">Identification</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-warm-gray/40 group-focus-within:text-brand-soft-coral transition-colors" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-text-deep-charcoal outline-none transition-all placeholder:text-text-warm-gray/30 font-outfit"
                                placeholder="e.g. Jane Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-warm-gray/40 group-focus-within:text-brand-soft-coral transition-colors" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-text-deep-charcoal outline-none transition-all placeholder:text-text-warm-gray/30 font-outfit"
                                placeholder="08123456789"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-warm-gray/40 group-focus-within:text-brand-soft-coral transition-colors" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-text-deep-charcoal outline-none transition-all placeholder:text-text-warm-gray/30 font-outfit"
                            placeholder="jane@example.com"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-anchor-espresso text-white rounded-lg flex items-center justify-center shadow-soft">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-text-deep-charcoal italic tracking-tighter uppercase font-outfit">Delivery</h2>
                        <p className="text-[10px] text-text-warm-gray font-black uppercase tracking-[0.2em] font-outfit">Destination Details</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Full Shipping Address</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-5 w-4 h-4 text-text-warm-gray/40 group-focus-within:text-brand-soft-coral transition-colors" />
                        <textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-text-deep-charcoal outline-none transition-all placeholder:text-text-warm-gray/30 font-outfit resize-none"
                            placeholder="Street address, apartment, suite, etc."
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Order Note (Optional)</label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-5 w-4 h-4 text-text-warm-gray/40 group-focus-within:text-brand-soft-coral transition-colors" />
                        <textarea
                            rows={2}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-bg-soft-cream border border-anchor-espresso/10 focus:border-brand-soft-coral/50 focus:bg-white rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-text-deep-charcoal outline-none transition-all placeholder:text-text-warm-gray/30 font-outfit resize-none"
                            placeholder="Color preferences, landmarks, or special instructions"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
