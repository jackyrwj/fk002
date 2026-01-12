'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminApi.login(username, password);
      if (response.success && response.data) {
        const { token, admin } = response.data;
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_role', admin.role);
        localStorage.setItem('admin_username', admin.username);
        router.push('/admin/dashboard');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF9F0' }}>
      <div className="card-memphis" style={{ width: '100%', maxWidth: '450px', margin: '2rem' }}>
        <div style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#FF71CE', fontWeight: '700' }}>
              Admin Portal
            </h1>
            <p style={{ color: '#4A4A6A', marginTop: '0.5rem' }}>B2B Website Management</p>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: '600' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-memphis"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-memphis"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-memphis"
              style={{ background: '#FF71CE', color: 'white', fontSize: '1rem', padding: '1rem' }}
            >
              {loading ? 'Signing in...' : '🔐 Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1rem', background: '#FEF3C7', borderRadius: '0.5rem', border: '2px dashed #FFCE5C' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>🔑 Demo Credentials:</p>
            <p style={{ fontSize: '0.875rem', color: '#4A4A6A', lineHeight: '1.6' }}>
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
