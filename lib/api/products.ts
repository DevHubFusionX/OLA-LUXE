import apiClient from '@/lib/axios';
import { ProductSchema, ApiResponseSchema, Product } from '@/lib/schemas';
import { z } from 'zod';

// ── Fetch all products, with optional category filter ─────────
export async function fetchProducts(category?: string): Promise<Product[]> {
  const params = category && category !== 'All' ? { category } : {};
  const { data } = await apiClient.get('/products', { params });

  const parsed = ApiResponseSchema(z.array(ProductSchema)).safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid products response from API');
  }

  return parsed.data.data;
}

// ── Fetch a single product by ID ──────────────────────────────
export async function fetchProductById(id: string): Promise<Product> {
  const { data } = await apiClient.get(`/products/${id}`);

  const parsed = ApiResponseSchema(ProductSchema).safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid product response from API');
  }

  return parsed.data.data;
}
