import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-3 text-[10px] text-text-warm-gray uppercase tracking-[0.3em] font-outfit">
            <Link href="/" className="hover:text-text-deep-charcoal flex items-center gap-1 transition-colors">
                <Home className="w-3.5 h-3.5" />
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-3 h-3 text-brand-soft-coral/30" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-text-deep-charcoal font-black transition-colors uppercase">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-text-deep-charcoal font-black truncate max-w-[150px] md:max-w-none uppercase">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}

import React from 'react';
