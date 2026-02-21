import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { productKeys } from './useProducts';
import { Product } from '@/lib/schemas';

// ── Mutation functions ─────────────────────────────────────────

async function createProduct(product: Omit<Product, 'id'>) {
  const { data } = await apiClient.post('/products', product);
  return data.data;
}

async function updateProduct({ id, ...updates }: Partial<Product> & { id: string }) {
  const { data } = await apiClient.put(`/products/${id}`, updates);
  return data.data;
}

async function deleteProduct(id: string) {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data.data;
}

// ── Hooks ──────────────────────────────────────────────────────

export function useProductMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  return {
    createProduct: createMutation,
    updateProduct: updateMutation,
    deleteProduct: deleteMutation,
  };
}
