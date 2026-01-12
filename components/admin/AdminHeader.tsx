'use client';

interface AdminHeaderProps {
  username: string;
  role: string;
}

export default function AdminHeader({ username, role }: AdminHeaderProps) {
  return (
    <header className="card-memphis" style={{ marginBottom: '2rem', padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Welcome back, <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{username}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className={`badge ${role === 'super_admin' ? 'badge-processing' : 'badge-pending'}`}>
            {role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
          </span>
        </div>
      </div>
    </header>
  );
}
