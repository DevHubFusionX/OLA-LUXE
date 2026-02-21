import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const categoryKeys = {
  all: ['categories'] as const,
};

// ── Fetch all categories ───────────────────────────────────────
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: categoryKeys.all,
    queryFn: async () => {
      const { data } = await apiClient.get('/categories');
      return data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// ── Mutations ──────────────────────────────────────────────────
export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (category: { name: string; description?: string }) => {
      const { data } = await apiClient.post('/categories', category);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/categories/${id}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });

  return {
    createCategory: createMutation,
    deleteCategory: deleteMutation,
  };
}
