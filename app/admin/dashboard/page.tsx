'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductModal from '@/components/admin/ProductModal';
import { productsApi, inquiriesApi, adminApi, settingsApi, Product, Inquiry } from '@/lib/api';
import { showNotification } from '@/components/admin/Notification';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({ username: '', role: '' });
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
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
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) setStats(statsData.data);
      }

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

      // Fetch settings
      const settingsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`);
      const settingsData = await settingsResponse.json();
      if (settingsData.success) setSettings(settingsData.data || {});
    } catch (error) {
      showNotification('Failed to load data', 'error');
    }
  };

  const handleSaveProduct = async (productData: any) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      let response;
      if (editingProduct) {
        response = await productsApi.update(editingProduct.id, productData, token);
      } else {
        response = await productsApi.create(productData, token);
      }

      if (response.success) {
        showNotification(`Product ${editingProduct ? 'updated' : 'created'} successfully`, 'success');
        setShowProductModal(false);
        setEditingProduct(null);
        fetchData();
      } else {
        showNotification(response.error || 'Failed to save product', 'error');
      }
    } catch (error) {
      showNotification('An error occurred', 'error');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await productsApi.delete(id, token);
      showNotification('Product deleted successfully', 'success');
      fetchData();
    } catch (error) {
      showNotification('Failed to delete product', 'error');
    }
  };

  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      await inquiriesApi.updateStatus(id, status, token);
      showNotification('Inquiry status updated', 'success');
      fetchData();
    } catch (error) {
      showNotification('Failed to update status', 'error');
    }
  };

  const handleSaveSettings = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const response = await settingsApi.update(settings, token);
      if (response.success) {
        showNotification('Settings saved successfully', 'success');
      } else {
        showNotification(response.error || 'Failed to save settings', 'error');
      }
    } catch (error) {
      showNotification('An error occurred', 'error');
    }
  };

  const isSuperAdmin = user.role === 'super_admin';
  const filteredInquiries = statusFilter === 'all'
    ? inquiries
    : inquiries.filter(i => i.status === statusFilter);

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} userRole={user.role} />
        <main className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} userRole={user.role} />

      <main className="admin-content">
        <AdminHeader username={user.username} role={user.role} />

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
                  <button
                    onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
                    className="btn-memphis"
                    style={{ background: '#FF71CE', color: 'white' }}
                  >
                    ➕ Add Product
                  </button>
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
                      {isSuperAdmin && <th>Actions</th>}
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
                        {isSuperAdmin && (
                          <td>
                            <button
                              onClick={() => { setEditingProduct(product); setShowProductModal(true); }}
                              style={{ background: '#86CCCA', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', marginRight: '0.5rem', fontWeight: '600' }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              style={{ background: '#EF4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600' }}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        )}
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
              <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>💬 Inquiries</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['all', 'pending', 'processing', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className="btn-memphis"
                      style={{
                        background: statusFilter === status ? '#FF71CE' : '#4A4A6A',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        textTransform: 'capitalize'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td style={{ fontWeight: '600' }}>{inquiry.name}</td>
                        <td>{inquiry.email}</td>
                        <td>{inquiry.company || '—'}</td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {inquiry.message}
                        </td>
                        <td>
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value)}
                            className="input-memphis"
                            style={{ padding: '0.5rem' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
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
              <div style={{ padding: '1.5rem', borderBottom: '2px solid #FF71CE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>⚙️ Website Settings</h2>
                {isSuperAdmin && (
                  <button
                    onClick={handleSaveSettings}
                    className="btn-memphis"
                    style={{ background: '#FF71CE', color: 'white' }}
                  >
                    💾 Save Settings
                  </button>
                )}
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#FF71CE' }}>Basic Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Site Name</label>
                        <input
                          type="text"
                          value={settings.site_name || ''}
                          onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Site Description</label>
                        <input
                          type="text"
                          value={settings.site_description || ''}
                          onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Company Introduction</label>
                        <textarea
                          value={settings.company_intro || ''}
                          onChange={(e) => setSettings({ ...settings, company_intro: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#86CCCA' }}>Contact Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Email</label>
                        <input
                          type="email"
                          value={settings.email || ''}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Phone</label>
                        <input
                          type="text"
                          value={settings.phone || ''}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Address</label>
                        <textarea
                          value={settings.address || ''}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          disabled={!isSuperAdmin}
                          className="input-memphis"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isSuperAdmin && (
                  <div style={{ marginTop: '2rem', padding: '1rem', background: '#FEF3C7', borderRadius: '0.5rem', border: '2px dashed #FFCE5C', textAlign: 'center' }}>
                    <p style={{ fontWeight: '600', color: '#92400E' }}>⚠️ Only Super Admins can modify settings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <ProductModal
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => { setShowProductModal(false); setEditingProduct(null); }}
            isSuperAdmin={isSuperAdmin}
          />
        )}
      </main>
    </div>
  );
}
