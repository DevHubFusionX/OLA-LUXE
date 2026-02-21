'use client';

import { useState } from 'react';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { useCategories, useCategoryMutations } from '@/hooks/useCategories';
import Modal from '@/components/Modal';

export default function AdminCategories() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [deleting, setDeleting] = useState<any>(null);

  const { data: categories, isLoading, error } = useCategories();
  const { createCategory, deleteCategory } = useCategoryMutations();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory.mutateAsync(form);
    setForm({ name: '', description: '' });
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteCategory.mutateAsync(deleting.id);
    setDeleting(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Categories</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          disabled={isLoading}
          className="bg-emerald-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50 text-sm md:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border p-4 md:p-6">
        {error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
            <p className="text-rose-600 font-bold">Failed to load categories</p>
            <p className="text-sm text-rose-500 mt-1">{(error as any)?.message || 'Please try again'}</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 md:p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => setDeleting(cat)}
                    disabled={deleteCategory.isPending}
                    className="p-2 text-slate-300 hover:text-rose-500 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-black text-base md:text-lg mb-1">{cat.name}</h3>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">{cat.slug}</p>
                {cat.description && <p className="mt-2 md:mt-3 text-xs md:text-sm text-slate-500 line-clamp-2">{cat.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm md:text-base text-slate-500 text-center py-8">No categories yet</p>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add Category">
        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Category Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-50 border rounded-lg py-3 px-4 font-medium focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Jewelry"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Description (Optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-50 border rounded-lg py-3 px-4 font-medium focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={4}
              placeholder="Brief description..."
            />
          </div>
          <button
            type="submit"
            disabled={createCategory.isPending}
            className="w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-xl font-bold hover:bg-emerald-600 disabled:opacity-50 text-sm md:text-base"
          >
            {createCategory.isPending ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </Modal>

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Delete Category">
        <div className="text-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Delete "{deleting?.name}"?</h3>
            <p className="text-sm md:text-base text-slate-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setDeleting(null)} disabled={deleteCategory.isPending} className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 disabled:opacity-50 text-sm md:text-base">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={deleteCategory.isPending} className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 disabled:opacity-50 text-sm md:text-base">
              {deleteCategory.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
