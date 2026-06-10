// ============================================
// Auth Service - Mock implementation for frontend
// ============================================

import type { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types';
import { delay, generateId } from '@/lib/utils';

const MOCK_USER: User = {
  id: 'usr_001',
  phone: '0812345678',
  name: 'สมชาย ใจดี',
  email: 'somchai@email.com',
  role: 'user',
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock database
let mockUsers: (User & { password: string })[] = [
  {
    ...MOCK_USER,
    password: 'password123',
  },
];

export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
  // Simulate API call
  await delay(1000);

  const user = mockUsers.find(
    (u) => u.phone === data.phone && u.password === data.password
  );

  if (!user) {
    throw new Error('เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: 'mock_token_' + generateId(),
    refreshToken: 'mock_refresh_' + generateId(),
  };
}

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
  await delay(1000);

  // Check if phone already exists
  const existingUser = mockUsers.find((u) => u.phone === data.phone);
  if (existingUser) {
    throw new Error('เบอร์โทรศัพท์นี้ถูกลงทะเบียนแล้ว');
  }

  const newUser: User & { password: string } = {
    id: 'usr_' + generateId(),
    phone: data.phone,
    name: data.name,
    role: 'user',
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    password: data.password,
  };

  mockUsers.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
    token: 'mock_token_' + generateId(),
    refreshToken: 'mock_refresh_' + generateId(),
  };
}
