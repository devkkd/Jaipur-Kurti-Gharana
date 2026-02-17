'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { admin, logout } = useAdmin();
  const router = useRouter();

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-pink-100 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu - Mobile/Tablet */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
        >
          {sidebarOpen ? (
            <X size={24} className="text-[#E13C6C]" />
          ) : (
            <Menu size={24} className="text-[#E13C6C]" />
          )}
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/mainlogo.png" 
            alt="Jaipur Kurti Gharana" 
            className="h-8 md:h-10 w-auto"
          />
          <div className="hidden sm:block border-l border-pink-200 pl-3">
            <h1 className="text-lg md:text-xl font-playfair font-semibold text-[#E13C6C]">Admin Panel</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Center - Search (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/30 focus:border-[#E13C6C] text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-pink-50 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-[#E13C6C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#E13C6C] to-[#FF6B9D] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{admin?.username || 'Admin'}</p>
              <p className="text-xs text-gray-500 capitalize">{admin?.role || 'Administrator'}</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-pink-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-pink-100">
                <p className="text-sm font-medium text-gray-800">{admin?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">{admin?.email || 'admin@avanta.com'}</p>
              </div>              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-[#E13C6C] hover:bg-pink-50 flex items-center gap-2 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}