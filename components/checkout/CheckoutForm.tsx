import { User, Phone, Mail, MapPin, FileText } from 'lucide-react';

interface CheckoutFormProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CheckoutForm({ formData, setFormData }: CheckoutFormProps) {
    return (
        <div className="space-y-12">
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-xl shadow-gray-900/20">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 italic tracking-tighter uppercase">Personal Info</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tell us who you are</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#00a651] transition-colors" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-gray-900 outline-none transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#00a651] transition-colors" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-gray-900 outline-none transition-all"
                                placeholder="e.g., 08123456789"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#00a651] transition-colors" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-gray-900 outline-none transition-all"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-xl shadow-gray-900/20">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 italic tracking-tighter uppercase">Delivery Destination</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Where should we ship it?</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Shipping Address</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-300 group-focus-within:text-[#00a651] transition-colors" />
                        <textarea
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-gray-900 outline-none transition-all resize-none"
                            placeholder="Enter your complete home or work address"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Order Note (Optional)</label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-300 group-focus-within:text-[#00a651] transition-colors" />
                        <textarea
                            rows={2}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00a651] focus:bg-white rounded-lg py-4 pl-12 pr-6 text-sm font-bold text-gray-900 outline-none transition-all resize-none"
                            placeholder="Any special instructions (e.g., color preferences, landmarks)"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
