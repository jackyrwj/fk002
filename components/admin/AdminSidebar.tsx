'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole?: string;
}

export default function AdminSidebar({ activeTab, onTabChange, userRole = 'admin' }: AdminSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_username');
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'inquiries', label: 'Inquiries', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div style={{ padding: '2rem 0' }}>
        <h2 style={{ color: '#86CCCA', fontSize: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
          B2B Admin
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>
          {userRole === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
        </p>
      </div>

      <ul className="sidebar-nav">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left ${
                activeTab === item.id ? 'active' : ''
              }`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <span style={{ marginRight: '0.75rem' }}>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
            }}
          >
            <span style={{ marginRight: '0.75rem' }}>🌐</span>
            Preview Site
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <span style={{ marginRight: '0.75rem' }}>🚪</span>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
