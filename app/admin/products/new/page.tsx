'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsApi } from '@/lib/api';
import { getAuthToken } from '@/lib/admin';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    detailed_description: '',
    specifications: '',
    image_url: '',
    category: '',
    price: '',
    compare_price: '',
    sku: '',
    stock_quantity: '0',
    is_featured: false,
    is_active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await productsApi.create(
        {
          ...formData,
          price: parseFloat(formData.price) || undefined,
          compare_price: parseFloat(formData.compare_price) || undefined,
          stock_quantity: parseInt(formData.stock_quantity),
        },
        token
      );

      if (response.success) {
        router.push('/admin/products');
      } else {
        setError(response.error || 'Failed to create product');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug *
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select category</option>
                  <option value="VerdantWay">VerdantWay</option>
                  <option value="GreenHarvest">GreenHarvest</option>
                  <option value="Verde Plant">Verde Plant</option>
                  <option value="Herbal Craft">Herbal Craft</option>
                </select>
              </div>

              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Descriptions</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="detailed_description" className="block text-sm font-medium text-gray-700">
                  Detailed Description
                </label>
                <textarea
                  id="detailed_description"
                  name="detailed_description"
                  rows={5}
                  value={formData.detailed_description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
                  Specifications (JSON format)
                </label>
                <textarea
                  id="specifications"
                  name="specifications"
                  rows={3}
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder='{"weight": "500g", "dimensions": "10x10x10cm"}'
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="compare_price" className="block text-sm font-medium text-gray-700">
                  Compare Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="compare_price"
                    name="compare_price"
                    step="0.01"
                    value={formData.compare_price}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Main Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formData.image_url && (
                <div className="mt-2">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="is_featured"
                  name="is_featured"
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                  Featured product
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="is_active"
                  name="is_active"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active (visible on website)
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link
              href="/admin/products"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
