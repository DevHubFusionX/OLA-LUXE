'use client';

interface CategoryFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({ categories, activeCategory, onCategoryChange }: CategoryFiltersProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-6 py-2.5 rounded text-[11px] font-black uppercase tracking-[0.15em] transition-all border ${activeCategory === cat
                        ? 'bg-[#00a651] text-white border-[#00a651] shadow-xl shadow-green-900/10'
                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
