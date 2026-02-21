'use client';

import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useOrders } from '@/hooks/useOrders';

export default function AdminDashboard() {
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useOrders();

  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;
  const isLoading = productsLoading || categoriesLoading || ordersLoading;
  const error = productsError || categoriesError || ordersError;

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
        <p className="text-rose-600 font-bold">Failed to load dashboard data</p>
        <p className="text-sm text-rose-500 mt-1">{(error as any)?.message || 'Please try again'}</p>
      </div>
    );
  }

  const stats = [
    { name: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Total Orders', value: orders?.length || 0, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Products', value: products?.length || 0, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Categories', value: categories?.length || 0, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border animate-pulse">
              <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4" />
              <div className="h-4 bg-slate-200 rounded w-20 mb-2" />
              <div className="h-8 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Dashboard</h1>
        <p className="text-sm md:text-base text-slate-600 mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 md:p-6 rounded-xl border shadow-sm">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-3 md:mb-4`}>
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <p className="text-xs md:text-sm text-slate-600 font-medium">{stat.name}</p>
            <h3 className="text-xl md:text-2xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-4 md:p-6">
        <h3 className="font-bold text-base md:text-lg mb-4">Recent Orders</h3>
        {orders && orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base truncate">{order.customerName}</p>
                  <p className="text-xs md:text-sm text-slate-500 truncate">{order.email}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-bold text-sm md:text-base text-emerald-600">₦{order.totalPrice.toLocaleString()}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 uppercase">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm md:text-base text-slate-500 text-center py-8">No orders yet</p>
        )}
      </div>
    </div>
  );
}
