'use client';

import { useState, useEffect } from 'react';
import { inquiriesApi, Inquiry } from '@/lib/api';
import { getAuthToken } from '@/lib/admin';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : undefined;
      const response = await inquiriesApi.getList(token, params);

      if (response.success) {
        setInquiries(response.data || []);
      }
    } catch (err) {
      setError('Failed to load inquiries');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      await inquiriesApi.updateStatus(id, newStatus, token);
      setInquiries(
        inquiries.map((i) =>
          i.id === id ? { ...i, status: newStatus as Inquiry['status'] } : i
        )
      );
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter((i) => i.status === filter);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage customer inquiries and messages
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(['all', 'pending', 'processing', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`${
                filter === status
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {status}
              {status !== 'all' && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                  {inquiries.filter((i) => i.status === status).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Inquiries List */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {inquiry.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Email:</span>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </div>

                  {inquiry.company && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Company:</span> {inquiry.company}
                    </div>
                  )}

                  {inquiry.phone && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {inquiry.phone}
                    </div>
                  )}

                  {inquiry.country && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Country:</span> {inquiry.country}
                    </div>
                  )}

                  {inquiry.product_name && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Product:</span>
                      <span className="ml-2">{inquiry.product_name}</span>
                      {inquiry.product_image && (
                        <img
                          src={inquiry.product_image}
                          alt={inquiry.product_name}
                          className="ml-2 h-8 w-8 rounded object-cover"
                        />
                      )}
                    </div>
                  )}

                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="ml-4 flex flex-col space-y-2">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>

                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-sm text-blue-600 hover:text-blue-800 text-center"
                >
                  Reply
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No inquiries found
          </div>
        )}
      </div>
    </div>
  );
}
