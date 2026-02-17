'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  User, 
  LogOut,
  Menu,
  X,
  Package,
  Users,
  Clock
} from 'lucide-react';

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCounts, setNotificationCounts] = useState({ total: 0 });
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const { admin, logout } = useAdmin();
  const router = useRouter();

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await fetch('/api/admin/notifications');
      const result = await response.json();
      
      if (result.success) {
        setNotifications(result.data);
        setNotificationCounts(result.counts);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Fetch notifications on mount and every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    
    // Listen for manual refresh events
    const handleRefresh = () => {
      console.log('Manual notification refresh triggered');
      fetchNotifications();
    };
    
    window.addEventListener('refreshNotifications', handleRefresh);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('refreshNotifications', handleRefresh);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.notification-dropdown') && !e.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-button')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/30 focus:border-[#E13C6C] text-sm"
          />
        </div>
      </div> */}

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="notification-button relative p-2 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCounts.total > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E13C6C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {notificationCounts.total > 9 ? '9+' : notificationCounts.total}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-pink-100 z-50 max-h-[500px] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-4 py-3 border-b border-pink-100 bg-linear-to-r from-pink-50 to-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                  {notificationCounts.total > 0 && (
                    <span className="text-xs bg-[#E13C6C] text-white px-2 py-1 rounded-full font-medium">
                      {notificationCounts.total} pending
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {notificationCounts.customerInquiries || 0} Wholesale
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={12} />
                    {notificationCounts.productInquiries || 0} Product
                  </span>
                </div>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto flex-1">
                {loadingNotifications ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#E13C6C]"></div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <Bell size={32} className="mb-2 opacity-30" />
                    <p className="text-sm">No pending notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-pink-50">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.link}
                        onClick={() => setShowNotifications(false)}
                        className="block px-4 py-3 hover:bg-pink-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            notification.type === 'customer_inquiry' 
                              ? 'bg-purple-100 text-purple-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.type === 'customer_inquiry' ? (
                              <Users size={16} />
                            ) : (
                              <Package size={16} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 truncate mt-0.5">
                              {notification.message}
                            </p>
                            {notification.data.productName && (
                              <p className="text-xs text-gray-500 truncate mt-0.5">
                                Product: {notification.data.productName}
                              </p>
                            )}
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                              <Clock size={10} />
                              {new Date(notification.timestamp).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-pink-100 bg-gray-50">
                  <div className="flex gap-2">
                    <Link
                      href="/admin/customer-inquiries"
                      onClick={() => setShowNotifications(false)}
                      className="flex-1 text-center text-xs text-[#E13C6C] hover:text-[#c12f5a] font-medium py-1"
                    >
                      View Wholesale
                    </Link>
                    <Link
                      href="/admin/inquiries"
                      onClick={() => setShowNotifications(false)}
                      className="flex-1 text-center text-xs text-[#E13C6C] hover:text-[#c12f5a] font-medium py-1"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="profile-button flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <div className="w-8 h-8 bg-linear-to-br from-[#E13C6C] to-[#FF6B9D] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{admin?.username || 'Admin'}</p>
              <p className="text-xs text-gray-500 capitalize">{admin?.role || 'Administrator'}</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-pink-100 py-2 z-50">
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