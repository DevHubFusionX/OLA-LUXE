import { Truck, ChevronRight } from 'lucide-react';
import { DeliveryZone } from '@/lib/schemas';

interface ShippingSelectorProps {
    deliveryZones: DeliveryZone[];
    selectedZone: DeliveryZone | null;
    onZoneChange: (zone: DeliveryZone) => void;
    isLoading?: boolean;
    errorMessage?: string;
}

export default function ShippingSelector({
    deliveryZones,
    selectedZone,
    onZoneChange,
    isLoading,
    errorMessage
}: ShippingSelectorProps) {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-anchor-espresso text-white rounded-lg flex items-center justify-center shadow-soft">
                    <Truck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-text-deep-charcoal italic tracking-tighter uppercase font-outfit">Delivery Method</h2>
                    <p className="text-[10px] text-text-warm-gray font-black uppercase tracking-[0.2em] font-outfit">Location Selector</p>
                </div>
            </div>

            {isLoading && (
                <div className="rounded-lg border border-anchor-espresso/5 bg-bg-soft-cream p-4 text-[10px] font-black uppercase tracking-widest text-text-warm-gray font-outfit">
                    Detecting zones...
                </div>
            )}

            {errorMessage && !isLoading && (
                <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-xs font-semibold uppercase tracking-widest text-red-500">
                    {errorMessage}
                </div>
            )}

            {/* Mobile View: Dropdown Selection */}
            <div className="md:hidden space-y-3">
                <label className="text-[10px] font-black text-text-warm-gray uppercase tracking-[0.2em] px-1 font-outfit">Choose Location</label>
                <div className="relative">
                    <select
                        className="w-full bg-bg-soft-cream border border-brand-sage-green/30 rounded-lg py-4 px-6 text-sm font-bold text-text-deep-charcoal appearance-none outline-none font-outfit"
                        value={selectedZone?.name || ''}
                        onChange={(e) => {
                            const zone = deliveryZones.find(z => z.name === e.target.value);
                            if (zone) onZoneChange(zone);
                        }}
                    >
                        {deliveryZones.length === 0 ? (
                            <option value="" disabled>
                                No options available
                            </option>
                        ) : (
                            deliveryZones.map((zone) => (
                                <option key={zone.name} value={zone.name}>
                                    {zone.name} • ₦{zone.fee.toLocaleString()}
                                </option>
                            ))
                        )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-brand-sage-green rotate-90" />
                    </div>
                </div>
            </div>

            {/* Desktop View: Grid Selection */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliveryZones.length === 0 ? (
                    <div className="col-span-full rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        No delivery zones available yet.
                    </div>
                ) : (
                    deliveryZones.map((zone) => (
                        <button
                            key={zone.name}
                            onClick={() => onZoneChange(zone)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${selectedZone?.name === zone.name
                                ? 'border-brand-sage-green/50 bg-bg-soft-cream shadow-soft'
                                : 'border-anchor-espresso/5 bg-transparent hover:border-anchor-espresso/20'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-outfit ${selectedZone?.name === zone.name ? 'text-brand-sage-green' : 'text-text-warm-gray'}`}>
                                    {zone.name}
                                </span>
                                {selectedZone?.name === zone.name && (
                                    <div className="w-4 h-4 bg-brand-sage-green rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm font-black text-text-deep-charcoal font-outfit">₦{zone.fee.toLocaleString()}</p>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
}
