'use client';

import Link from 'next/link';
import { useAuth } from '@/store/auth-context';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-amber-600 font-medium transition-colors"
            >
              หน้าแรก
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  ออกจากระบบ
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    สมัครสมาชิก
                  </Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
