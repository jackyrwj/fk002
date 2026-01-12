// API Client for BlueTech Shop Backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data?: T[];
  pagination?: Pagination;
}

// Products API
export const productsApi = {
  // Get all products with pagination
  getList: async (params?: { category?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const response = await fetch(`${API_BASE}/api/products?${searchParams}`);
    return response.json() as Promise<PaginatedResponse<Product>>;
  },

  // Get featured products
  getFeatured: async () => {
    const response = await fetch(`${API_BASE}/api/products/featured`);
    return response.json() as Promise<ApiResponse<Product[]>>;
  },

  // Get single product by ID
  getById: async (id: string | number) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    return response.json() as Promise<ApiResponse<Product>>;
  },

  // Get product by slug
  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_BASE}/api/products/slug/${slug}`);
    return response.json() as Promise<ApiResponse<Product>>;
  },

  // Create product (requires auth)
  create: async (data: Partial<Product>, token: string) => {
    const response = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<ApiResponse<Product>>;
  },

  // Update product (requires auth)
  update: async (id: string | number, data: Partial<Product>, token: string) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<ApiResponse<Product>>;
  },

  // Delete product (requires auth)
  delete: async (id: string | number, token: string) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json() as Promise<ApiResponse>;
  },
};

// Inquiries API
export const inquiriesApi = {
  // Submit inquiry (public)
  submit: async (data: {
    product_id?: number;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    country?: string;
    message: string;
  }) => {
    const response = await fetch(`${API_BASE}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<ApiResponse<Inquiry>>;
  },

  // Get all inquiries (requires auth)
  getList: async (token: string, params?: { status?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const response = await fetch(
      `${API_BASE}/api/inquiries?${searchParams}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
    return response.json() as Promise<PaginatedResponse<Inquiry>>;
  },

  // Get single inquiry (requires auth)
  getById: async (id: string | number, token: string) => {
    const response = await fetch(`${API_BASE}/api/inquiries/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json() as Promise<ApiResponse<Inquiry>>;
  },

  // Update inquiry status (requires auth)
  updateStatus: async (id: string | number, status: string, token: string) => {
    const response = await fetch(`${API_BASE}/api/inquiries/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return response.json() as Promise<ApiResponse<Inquiry>>;
  },

  // Get inquiry statistics (requires auth)
  getStats: async (token: string) => {
    const response = await fetch(`${API_BASE}/api/inquiries/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json() as Promise<ApiResponse<InquiryStats>>;
  },
};

// Admin API
export const adminApi = {
  // Login
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json() as Promise<ApiResponse<{ token: string; admin: AdminUser }>>;
  },

  // Verify token
  verify: async (token: string) => {
    const response = await fetch(`${API_BASE}/api/admin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return response.json() as Promise<ApiResponse<AdminUser>>;
  },

  // Get dashboard statistics (requires auth)
  getStats: async (token: string) => {
    const response = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json() as Promise<ApiResponse<DashboardStats>>;
  },
};

// Settings API
export const settingsApi = {
  // Get all settings
  getAll: async () => {
    const response = await fetch(`${API_BASE}/api/settings`);
    return response.json() as Promise<ApiResponse<Record<string, string>>>;
  },

  // Update settings (requires auth)
  update: async (data: Record<string, string>, token: string) => {
    const response = await fetch(`${API_BASE}/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<ApiResponse<Record<string, string>>>;
  },
};

// Upload API
export const uploadApi = {
  // Upload image (requires auth)
  uploadImage: async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/api/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json() as Promise<ApiResponse<{ filename: string; url: string }>>;
  },
};

// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  detailed_description?: string;
  specifications?: string;
  image_url: string;
  gallery_images?: string[];
  category: string;
  price?: number;
  compare_price?: number;
  sku?: string;
  stock_quantity?: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: number;
  product_id?: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  message: string;
  status: 'pending' | 'processing' | 'completed';
  created_at: string;
  updated_at: string;
  product_name?: string;
  product_image?: string;
}

export interface InquiryStats {
  pending: number;
  processing: number;
  completed: number;
  total: number;
  recent: number;
}

export interface AdminUser {
  id: number;
  username: string;
  email?: string;
  role: 'super_admin' | 'admin';
}

export interface DashboardStats {
  products: {
    total: number;
    featured: number;
  };
  inquiries: {
    total: number;
    pending: number;
    recent: number;
  };
  orders: {
    recent: number;
  };
}
