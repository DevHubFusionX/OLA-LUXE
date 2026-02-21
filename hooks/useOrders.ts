import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariation?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  deliveryZone: string;
  deliveryFee: number;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export function useOrders() {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await apiClient.get('/orders');
      return data.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5,    // 5 minutes
  });
}
