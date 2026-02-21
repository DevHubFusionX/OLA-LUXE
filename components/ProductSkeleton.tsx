'use client';

export default function ProductSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            {/* Image placeholder */}
            <div className="aspect-square rounded-[2rem] bg-gray-100 mb-4" />
            <div className="space-y-3 px-2">
                {/* Product name */}
                <div className="h-4 w-3/4 rounded-full bg-gray-100" />
                {/* Price */}
                <div className="h-4 w-1/2 rounded-full bg-gray-100" />
                {/* Button */}
                <div className="h-10 w-full rounded-2xl bg-gray-50 mt-4" />
            </div>
        </div>
    );
}
