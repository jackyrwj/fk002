'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAdminAuth } from '@/lib/admin';
import { useState, useEffect } from 'react';

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const userCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin_user='))
        ?.split('=')[1];

      if (userCookie) {
        try {
          setUser(JSON.parse(decodeURIComponent(userCookie)));
        } catch (e) {
          console.error('Error parsing user cookie:', e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/inquiries', label: 'Inquiries', icon: '📧' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              BlueTech Admin
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-slate-800 text-white'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm">
                <span className="text-gray-400">Welcome,</span>{' '}
                <span className="font-medium">{user.username}</span>
                <span className="ml-2 text-xs bg-slate-800 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
