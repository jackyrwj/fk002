// Admin utilities for authentication
import { cookies } from 'next/headers';
import { adminApi, AdminUser } from './api';

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_TOKEN_KEY)?.value;

    if (!token) {
      return null;
    }

    const response = await adminApi.verify(token);
    if (response.success && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

export async function requireAuth(): Promise<AdminUser | null> {
  const admin = await getAdminUser();
  return admin;
}

export function setAdminAuth(token: string, user: AdminUser) {
  if (typeof document !== 'undefined') {
    document.cookie = `${ADMIN_TOKEN_KEY}=${token}; path=/; max-age=86400`;
    document.cookie = `${ADMIN_USER_KEY}=${JSON.stringify(user)}; path=/; max-age=86400`;
  }
}

export function clearAdminAuth() {
  if (typeof document !== 'undefined') {
    document.cookie = `${ADMIN_TOKEN_KEY}=; path=/; max-age=0`;
    document.cookie = `${ADMIN_USER_KEY}=; path=/; max-age=0`;
  }
}

export function getAuthToken(): string | null {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp(`(^| )${ADMIN_TOKEN_KEY}=([^;]+)`));
    return match ? match[2] : null;
  }
  return null;
}
