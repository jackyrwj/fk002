'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { productsApi, inquiriesApi, adminApi, Product, Inquiry } from '@/lib/api';
import { showNotification } from '@/components/admin/Notification';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({ username: '', role: '' });
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setUser({
      username: localStorage.getItem('admin_username') || 'Admin',
      role: localStorage.getItem('admin_role') || 'admin'
    });

    fetchData();
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      setLoading(false);
      // Fetch stats
      const statsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      if (statsData.success) setStats(statsData.data);

      // Fetch products
      const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const productsData = await productsResponse.json();
      if (productsData.success) setProducts(productsData.data || []);

      // Fetch inquiries
      const inquiriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const inquiriesData = await inquiriesResponse.json();
      if (inquiriesData.success) setInquiries(inquiriesData.data || []);
    } catch (error) {
      showNotification('Failed to load data', 'error');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const isSuperAdmin = user.role === 'super_admin';

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} userRole={user.role} />

      <main className="admin-content">
        <AdminHeader username={user.username} role={user.role} />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content active">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #FF71CE 0%, #FFB3E6 100%)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.875rem', opacity: 0.9 }}>📦 Total Products</h3>
                    <div className="stat-value" style={{ color: 'white', fontSize: '3rem' }}>
                      {stats?.products?.total || products.length || 0}
                    </div>
                  </div>
                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #86CCCA 0%, #B3E0DF 100%)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.875rem', opacity: 0.9 }}>💬 Total Inquiries</h3>
                    <div className="stat-value" style={{ color: 'white', fontSize: '3rem' }}>
                      {stats?.inquiries?.total || inquiries.length || 0}
                    </div>
                  </div>
                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #FFCE5C 0%, #FFE08A 100%)', color: 'white' }}>
                    <h3 style={{ fontSize: '0.875rem', opacity: 0.9 }}>⏳ Pending</h3>
                    <div className="stat-value" style={{ color: 'white', fontSize: '3rem' }}>
                      {stats?.inquiries?.pending || inquiries.filter(i => i.status === 'pending').length || 0}
                    </div>
                  </div>
                </div>

                <div className="card-memphis">
                  <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>📋 Recent Inquiries</h2>
                  </div>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((inquiry) => (
                          <tr key={inquiry.id}>
                            <td style={{ fontWeight: '600' }}>{inquiry.name}</td>
                            <td>{inquiry.email}</td>
                            <td>
                              <span className={`badge badge-${inquiry.status}`}>
                                {inquiry.status}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.875rem', color: '#4A4A6A' }}>
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="tab-content active">
                <div className="card-memphis">
                  <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>📦 Products</h2>
                    {isSuperAdmin && (
                      <a
                        href="/admin/products/new"
                        className="btn-memphis"
                        style={{ background: '#FF71CE', color: 'white', textDecoration: 'none' }}
                      >
                        ➕ Add Product
                      </a>
                    )}
                  </div>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Featured</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>#{product.id}</td>
                            <td style={{ fontWeight: '600' }}>{product.name}</td>
                            <td>
                              <span className="badge" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                                {product.category}
                              </span>
                            </td>
                            <td>{product.is_featured ? '⭐' : '—'}</td>
                            <td>
                              <span className={`badge ${product.is_active ? 'badge-completed' : 'badge-pending'}`}>
                                {product.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div className="tab-content active">
                <div className="card-memphis">
                  <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>💬 Inquiries</h2>
                  </div>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.map((inquiry) => (
                          <tr key={inquiry.id}>
                            <td style={{ fontWeight: '600' }}>{inquiry.name}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.company || '—'}</td>
                            <td>
                              <span className={`badge badge-${inquiry.status}`}>
                                {inquiry.status}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.875rem', color: '#4A4A6A' }}>
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="tab-content active">
                <div className="card-memphis">
                  <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>⚙️ Website Settings</h2>
                  </div>
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#4A4A6A' }}>
                    <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>⚠️ Access Restricted</p>
                    <p>
                      {isSuperAdmin
                        ? 'Settings management will be available in the next update.'
                        : 'Only Super Admins can modify website settings.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
