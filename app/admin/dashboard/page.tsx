import { adminApi, DashboardStats } from '@/lib/api';
import { requireAuth } from '@/lib/admin';

async function DashboardStats() {
  const admin = await requireAuth();
  if (!admin) return null;

  const token = admin.username ? 'temp-token' : ''; // Will use proper token from cookie

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data as DashboardStats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
}

export default async function AdminDashboardPage() {
  const admin = await requireAuth();
  if (!admin) {
    return null;
  }

  const stats = await DashboardStats();

  const statCards = stats ? [
    {
      title: 'Total Products',
      value: stats.products.total,
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'Featured Products',
      value: stats.products.featured,
      icon: '⭐',
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Inquiries',
      value: stats.inquiries.total,
      icon: '📧',
      color: 'bg-green-500',
    },
    {
      title: 'Pending Inquiries',
      value: stats.inquiries.pending,
      icon: '⏳',
      color: 'bg-orange-500',
    },
  ] : [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Welcome back, {admin.username}! Here's what's happening with your store today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/admin/products"
                className="relative block bg-white p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-3xl mb-3">📦</div>
                <h3 className="text-lg font-medium text-gray-900">Manage Products</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add, edit, or remove products from your catalog
                </p>
              </a>

              <a
                href="/admin/inquiries"
                className="relative block bg-white p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-lg font-medium text-gray-900">View Inquiries</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Respond to customer inquiries and messages
                </p>
              </a>

              <a
                href="/admin/settings"
                className="relative block bg-white p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="text-lg font-medium text-gray-900">Site Settings</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Update website configuration and preferences
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Preview */}
      {stats && stats.inquiries.recent > 0 && (
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activity
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {stats.inquiries.recent} new inquiries in the last 7 days
              </p>
            </div>
            <a
              href="/admin/inquiries"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
