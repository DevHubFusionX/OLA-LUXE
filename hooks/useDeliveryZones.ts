import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { ApiResponseSchema, DeliveryZoneSchema, DeliveryZone } from '@/lib/schemas';
import { z } from 'zod';

export function useDeliveryZones() {
  return useQuery<DeliveryZone[], Error>({
    queryKey: ['delivery-zones'],
    queryFn: async () => {
      const { data } = await apiClient.get('/delivery-zones');
      const parsed = ApiResponseSchema(z.array(DeliveryZoneSchema)).safeParse(data);
      if (!parsed.success) {
        throw new Error('Invalid delivery zones response from API');
      }
      return parsed.data.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
