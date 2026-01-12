'use client';

import { useState } from 'react';

interface ProductModalProps {
  product?: any;
  onSave: (product: any) => Promise<void>;
  onCancel: () => void;
  isSuperAdmin: boolean;
}

export default function ProductModal({ product, onSave, onCancel, isSuperAdmin }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    detailed_description: product?.detailed_description || '',
    specifications: product?.specifications || '',
    image_url: product?.image_url || '',
    is_featured: product?.is_featured || false,
    is_active: product?.is_active !== false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setFormData({ ...formData, image_url: result.data.url });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content-memphis" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#FF71CE' }}>
          {product ? '✏️ Edit Product' : '➕ Add Product'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-memphis"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-memphis"
            >
              <option value="">Select Category</option>
              <option value="VerdantWay">VerdantWay</option>
              <option value="GreenHarvest">GreenHarvest</option>
              <option value="Verde Plant">Verde Plant</option>
              <option value="Herbal Craft">Herbal Craft</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Short Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-memphis"
              rows={2}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Detailed Description</label>
            <textarea
              value={formData.detailed_description}
              onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
              className="input-memphis"
              rows={4}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Specifications (JSON)</label>
            <textarea
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              className="input-memphis"
              rows={2}
              placeholder='{"key": "value"}'
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="input-memphis"
            />
            {uploading && <p style={{ marginTop: '0.5rem', color: '#FF71CE' }}>Uploading...</p>}
            {formData.image_url && (
              <div style={{ marginTop: '1rem' }}>
                <img
                  src={formData.image_url}
                  alt="Preview"
                  style={{ maxWidth: '200px', borderRadius: '0.5rem' }}
                />
              </div>
            )}
            <input
              type="hidden"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                style={{ marginRight: '0.5rem', width: '18px', height: '18px' }}
              />
              <span>Featured Product ⭐</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                style={{ marginRight: '0.5rem', width: '18px', height: '18px' }}
              />
              <span>Active</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn-memphis"
              style={{ background: '#4A4A6A', color: 'white', flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-memphis"
              style={{ background: '#FF71CE', color: 'white', flex: 1 }}
            >
              {loading ? 'Saving...' : '💾 Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
