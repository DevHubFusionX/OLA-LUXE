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
        <nav className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-black flex items-center gap-1">
                <Home className="w-3 h-3" />
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-black font-semibold">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-500 font-semibold truncate max-w-[150px] md:max-w-none">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}

import React from 'react';
