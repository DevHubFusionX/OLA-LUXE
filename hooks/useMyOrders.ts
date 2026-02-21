import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variation?: string;
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
}

export function useMyOrders() {
    return useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const response = await apiClient.get('/orders/my');
            return response.data.data as Order[];
        },
    });
}
