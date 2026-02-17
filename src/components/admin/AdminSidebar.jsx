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
        fixed top-16 my-4 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-white to-pink-50/30 border-r border-pink-100 overflow-y-auto
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
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${isActive(item.href)
                ? 'bg-gradient-to-r from-[#E13C6C] to-[#FF6B9D] text-white shadow-md shadow-pink-200'
                : 'text-gray-700 hover:bg-pink-50 hover:text-[#E13C6C]'
              }
            `}
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-pink-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#E13C6C] hover:bg-pink-50 w-full transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}