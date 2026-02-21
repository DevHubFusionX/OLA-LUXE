'use client';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Package, X, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useProductMutations } from '@/hooks/useProductMutations';
import Modal from '@/components/Modal';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/lib/schemas';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const { data: categories, error: categoriesError } = useCategories();
  const { data: products, isLoading, error: productsError } = useProducts(category);
  const { createProduct, updateProduct, deleteProduct } = useProductMutations();

  const filtered = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const isMutating = createProduct.isPending || updateProduct.isPending || deleteProduct.isPending;

  const handleCreate = async (data: any) => {
    await createProduct.mutateAsync(data);
    setIsFormOpen(false);
  };

  const handleUpdate = async (data: any) => {
    if (!editing) return;
    await updateProduct.mutateAsync({ ...data, id: editing.id });
    setEditing(null);
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteProduct.mutateAsync(deleting.id);
    setDeleting(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {isMutating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 mx-4">
            <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 animate-spin" />
            <p className="font-bold text-sm md:text-base">Processing...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Products</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">{products?.length || 0} total products</p>
        </div>
        <button
          onClick={() => { setEditing(null); setIsFormOpen(true); }}
          disabled={isMutating}
          className="bg-emerald-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50 text-sm md:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-slate-50 border-none rounded-lg font-medium focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', ...(categories?.map(c => c.name) || [])].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap ${
                category === cat ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {productsError || categoriesError ? (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
          <p className="text-rose-600 font-bold">Failed to load products</p>
          <p className="text-sm text-rose-500 mt-1">{(productsError || categoriesError as any)?.message || 'Please try again'}</p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border overflow-hidden animate-pulse">
              <div className="aspect-square bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-square bg-slate-100 relative">
                {p.images[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(p); setIsFormOpen(true); }}
                    disabled={isMutating}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleting(p)}
                    disabled={isMutating}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-rose-500 hover:text-white disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm md:text-base line-clamp-1">{p.name}</h3>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold rounded whitespace-nowrap">{p.category}</span>
                </div>
                <p className="text-xl md:text-2xl font-black text-emerald-600">₦{p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-dashed p-8 md:p-12 text-center">
          <Package className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-2">No products found</h3>
          <p className="text-sm md:text-base text-slate-500">{search ? 'Try adjusting your search' : 'Add your first product'}</p>
        </div>
      )}

      <Modal isOpen={isFormOpen} onClose={() => !isMutating && setIsFormOpen(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        <ProductForm initialData={editing || undefined} onSubmit={editing ? handleUpdate : handleCreate} isLoading={isMutating} />
      </Modal>

      <Modal isOpen={!!deleting} onClose={() => !isMutating && setDeleting(null)} title="Delete Product">
        <div className="text-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Delete "{deleting?.name}"?</h3>
            <p className="text-sm md:text-base text-slate-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setDeleting(null)} disabled={isMutating} className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 disabled:opacity-50 text-sm md:text-base">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={isMutating} className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 text-sm md:text-base">
              {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
