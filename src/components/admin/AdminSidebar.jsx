'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  FolderOpen,
  Tags,
  LogOut,
  MessageSquare,
  FileText,
  Upload
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: FolderOpen
  },
  {
    title: 'Subcategories',
    href: '/admin/subcategories',
    icon: Tags
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package
  },
  {
    title: 'Bulk Upload',
    href: '/admin/products/bulk-upload',
    icon: Upload
  },
  {
    title: 'Inquiries',
    href: '/admin/inquiries',
    icon: MessageSquare
  },
  {
    title: 'Customer Inquiries',
    href: '/admin/customer-inquiries',
    icon: FileText
  },
];

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdmin();

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    try {
      // Call logout from AdminContext (this will call API and clear cookies)
      await logout();
      // Redirect to login page
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      router.push('/admin/login');
    }
  };

  return (
    <aside 
      className={`
        fixed top-16 my-4 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
              ${isActive(item.href)
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}