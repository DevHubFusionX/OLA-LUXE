import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '@/lib/api/products';
import { Product } from '@/lib/schemas';

// ── Query keys ────────────────────────────────────────────────
export const productKeys = {
  all: ['products'] as const,
  list: (category?: string) => [...productKeys.all, 'list', category ?? 'All'] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

// ── Fetch all products (with optional category filter) ────────
export function useProducts(category?: string) {
  return useQuery<Product[], Error>({
    queryKey: productKeys.list(category),
    queryFn: () => fetchProducts(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,   // 10 minutes
    retry: 2,
  });
}

// ── Fetch a single product by ID ──────────────────────────────
export function useProduct(id: string) {
  return useQuery<Product, Error>({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
}
