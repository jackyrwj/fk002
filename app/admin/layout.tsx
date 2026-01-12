import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { requireAuth } from '@/lib/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAuth();

  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
