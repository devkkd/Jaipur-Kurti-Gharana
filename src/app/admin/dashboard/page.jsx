'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    totalCustomerInquiries: 0,
    totalSubcategories: 0
  });

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const { admin, loading: authLoading, isAuthenticated } = useAdmin();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        /* -------------------------
           1️⃣ TOTAL PRODUCTS
        ------------------------- */
        const productsRes = await fetch('/api/products?limit=1');
        const productsData = await productsRes.json();
        const totalProducts = productsData?.pagination?.total || 0;

        /* -------------------------
           2️⃣ GENERAL INQUIRIES
        ------------------------- */
        const inquiriesRes = await fetch('/api/inquiries');
        const inquiriesData = await inquiriesRes.json();
        const inquiriesList = inquiriesData?.data || [];
        const totalInquiries = inquiriesList.length;

        /* -------------------------
           3️⃣ CUSTOMER INQUIRIES
        ------------------------- */
        const customerRes = await fetch('/api/admin/customer-inquiries?limit=1');
        const customerData = await customerRes.json();
        const totalCustomerInquiries = customerData?.stats?.total || 0;

        /* -------------------------
           4️⃣ SUBCATEGORIES
        ------------------------- */
        const subRes = await fetch('/api/admin/subcategories');
        const subData = await subRes.json();
        const totalSubcategories = subData?.data?.length || 0;

        /* -------------------------
           5️⃣ RECENT 10 INQUIRIES
        ------------------------- */
        const recent = inquiriesList.slice(0, 10);

        setStats({
          totalProducts,
          totalInquiries,
          totalCustomerInquiries,
          totalSubcategories
        });

        setRecentInquiries(recent);

      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Customer Inquiries',
      value: stats.totalCustomerInquiries,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Subcategories',
      value: stats.totalSubcategories,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {admin?.username}!
        </h1>
        <p className="text-gray-600">
          Here’s what’s happening in your system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg shrink-0 ml-3`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Inquiries</h2>
          <button
            onClick={() => router.push('/admin/inquiries')}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {inquiry.fullName}
                      </div>
                      {inquiry.company && (
                        <div className="text-sm text-gray-500">
                          {inquiry.company}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm flex items-center gap-1 text-gray-900">
                        <Mail size={14} className="text-gray-400" />
                        {inquiry.email}
                      </div>
                      <div className="text-sm flex items-center gap-1 text-gray-500 mt-1">
                        <Phone size={14} className="text-gray-400" />
                        {inquiry.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {inquiry.products?.length || 0} Products
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      {formatDate(inquiry.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No inquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
