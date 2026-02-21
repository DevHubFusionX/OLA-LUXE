import { z } from 'zod';

// ── Variation Schema ──────────────────────────────────────────
export const VariationSchema = z.object({
  type: z.string(),
  options: z.array(z.string()),
});

// ── Category Schema ───────────────────────────────────────────
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string(),
  description: z.string().optional(),
});

// ── Product Schema ────────────────────────────────────────────
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: z.number().min(0, 'Price cannot be negative'),
  images: z.array(z.string()).min(1, 'At least one image is required').max(6, 'Maximum 6 images allowed'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  variations: z.array(VariationSchema).optional(),
  inStock: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// ── Delivery Zone Schema ──────────────────────────────────────
export const DeliveryZoneSchema = z.object({
  name: z.string(),
  fee: z.number(),
});

// ── Generic API Response Wrapper ──────────────────────────────
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
  });

// ── Inferred Types (use these instead of hand-written interfaces) ──
export type Product = z.infer<typeof ProductSchema>;
export type Variation = z.infer<typeof VariationSchema>;
export type DeliveryZone = z.infer<typeof DeliveryZoneSchema>;
