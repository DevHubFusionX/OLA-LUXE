'use client';

export default function ProductSkeleton() {
    return (
        <div className="animate-pulse flex flex-col h-full bg-bg-soft-cream rounded-lg overflow-hidden border border-anchor-espresso/5 shadow-soft">
            {/* Image placeholder */}
            <div className="aspect-square bg-bg-warm-beige" />
            <div className="p-5 flex flex-col flex-1 space-y-4">
                {/* Product name */}
                <div className="h-2 w-3/4 rounded-full bg-bg-warm-beige" />
                {/* Price */}
                <div className="h-3 w-1/2 rounded-full bg-bg-warm-beige" />
                {/* Button */}
                <div className="mt-auto h-10 w-full rounded-lg bg-anchor-espresso/5" />
            </div>
        </div>
    );
}
