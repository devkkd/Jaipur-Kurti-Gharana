'use client';

import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAdmin();
  const isAuthRoute = pathname === '/admin/login' || pathname === '/admin';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && !isAuthRoute) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, isAuthRoute, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on auth route, don't render anything (redirect will happen)
  if (!isAuthenticated && !isAuthRoute) {
    return null;
  }

  return (
    <>
      {!isAuthRoute && (
        <>
          <AdminHeader 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          <AdminSidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      <main className={`min-h-screen bg-gray-50 ${!isAuthRoute ? 'pt-16 lg:pl-64' : ''}`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}