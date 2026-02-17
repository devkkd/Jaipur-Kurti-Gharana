'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAdmin();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFE5ED] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Brand Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 group">
              <img src="/images/avantalogo.png" alt="Avanta" className="h-6 md:h-8 lg:h-10 w-auto object-contain" />
              <img src="/images/line.png" alt="separator" className="h-5 md:h-7 lg:h-9 w-auto object-contain" />
              <img src="/images/jkg.png" alt="Jaipur Kurti Gharana" className="h-6 md:h-8 lg:h-6 w-auto object-contain" />
            </div>
          </div>
          {/* <div className="w-32 h-px bg-[#E13C6C]/30 mx-auto "></div> */}
          {/* <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">
            Admin Portal
          </p> */}
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-pink-100 border border-pink-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-500">
              Sign in to access your dashboard
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/30 focus:border-[#E13C6C] transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E13C6C]/30 focus:border-[#E13C6C] transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E13C6C] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#E13C6C] to-[#FF6B9D] text-white py-4 px-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-pink-200 focus:outline-none focus:ring-2 focus:ring-[#E13C6C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
              <Lock size={14} />
              Secure admin access only
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">
            © 2026 Jaipur Kurti Gharana. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}