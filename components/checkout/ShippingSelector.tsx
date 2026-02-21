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
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-xl shadow-gray-900/20">
                    <Truck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-gray-900 italic tracking-tighter uppercase">Delivery Method</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select your location</p>
                </div>
            </div>

            {isLoading && (
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Loading delivery zones...
                </div>
            )}

            {errorMessage && !isLoading && (
                <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-xs font-semibold uppercase tracking-widest text-red-500">
                    {errorMessage}
                </div>
            )}

            {/* Mobile View: Dropdown Selection */}
            <div className="md:hidden space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Choose Location</label>
                <div className="relative">
                    <select
                        className="w-full bg-gray-50 border-2 border-[#00a651] rounded-lg py-4 px-6 text-sm font-bold text-gray-900 appearance-none outline-none"
                        value={selectedZone?.name || ''}
                        onChange={(e) => {
                            const zone = deliveryZones.find(z => z.name === e.target.value);
                            if (zone) onZoneChange(zone);
                        }}
                    >
                        {deliveryZones.length === 0 ? (
                            <option value="" disabled>
                                No delivery zones available
                            </option>
                        ) : (
                            deliveryZones.map((zone) => (
                                <option key={zone.name} value={zone.name}>
                                    {zone.name} - ₦{zone.fee.toLocaleString()}
                                </option>
                            ))
                        )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-[#00a651] rotate-90" />
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
                            className={`p-6 rounded-xl border-2 text-left transition-all ${selectedZone?.name === zone.name
                                ? 'border-[#00a651] bg-green-50 shadow-xl shadow-green-900/5'
                                : 'border-gray-50 bg-white hover:border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedZone?.name === zone.name ? 'text-[#00a651]' : 'text-gray-400'}`}>
                                    {zone.name}
                                </span>
                                {selectedZone?.name === zone.name && (
                                    <div className="w-4 h-4 bg-[#00a651] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm font-black text-gray-900">₦{zone.fee.toLocaleString()}</p>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
}
