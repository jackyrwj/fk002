'use client';

import { useState, useEffect } from 'react';
import { settingsApi } from '@/lib/api';
import { getAuthToken } from '@/lib/admin';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsApi.getAll();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = getAuthToken();
      if (!token) {
        setMessage('Authentication required');
        return;
      }

      const response = await settingsApi.update(settings, token);
      if (response.success) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage(response.error || 'Failed to save settings');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Website Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your website configuration and preferences
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.includes('success')
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">General Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                id="site_name"
                name="site_name"
                value={settings.site_name || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <input
                type="text"
                id="site_description"
                name="site_description"
                value={settings.site_description || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="company_intro" className="block text-sm font-medium text-gray-700">
                Company Introduction
              </label>
              <textarea
                id="company_intro"
                name="company_intro"
                rows={4}
                value={settings.company_intro || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={settings.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={settings.address || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Social Media</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="social_facebook" className="block text-sm font-medium text-gray-700">
                Facebook URL
              </label>
              <input
                type="url"
                id="social_facebook"
                name="social_facebook"
                value={settings.social_facebook || ''}
                onChange={handleChange}
                placeholder="https://facebook.com/your-page"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="social_twitter" className="block text-sm font-medium text-gray-700">
                Twitter URL
              </label>
              <input
                type="url"
                id="social_twitter"
                name="social_twitter"
                value={settings.social_twitter || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/your-handle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700">
                Instagram URL
              </label>
              <input
                type="url"
                id="social_instagram"
                name="social_instagram"
                value={settings.social_instagram || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/your-handle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
