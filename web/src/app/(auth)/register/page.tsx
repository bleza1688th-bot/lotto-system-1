'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useAuth } from '@/store/auth-context';
import { registerApi } from '@/services/auth-service';
import { isValidThaiPhone } from '@/lib/utils';
import { VALIDATION } from '@/lib/constants';

// ---- Registration Schema ----
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'กรุณากรอกชื่อ-นามสกุล')
      .min(VALIDATION.NAME.minLength, `ชื่อต้องมีอย่างน้อย ${VALIDATION.NAME.minLength} ตัวอักษร`)
      .max(VALIDATION.NAME.maxLength, `ชื่อต้องไม่เกิน ${VALIDATION.NAME.maxLength} ตัวอักษร`),
    phone: z
      .string()
      .min(1, 'กรุณากรอกเบอร์โทรศัพท์')
      .refine((val) => isValidThaiPhone(val), {
        message: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)',
      }),
    email: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: 'รูปแบบอีเมลไม่ถูกต้อง' }
      ),
    password: z
      .string()
      .min(1, 'กรุณากรอกรหัสผ่าน')
      .min(VALIDATION.PASSWORD.minLength, `รหัสผ่านต้องมีอย่างน้อย ${VALIDATION.PASSWORD.minLength} ตัวอักษร`)
      .max(VALIDATION.PASSWORD.maxLength, `รหัสผ่านต้องไม่เกิน ${VALIDATION.PASSWORD.maxLength} ตัวอักษร`),
    confirmPassword: z
      .string()
      .min(1, 'กรุณายืนยันรหัสผ่าน'),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'กรุณายอมรับข้อกำหนดและเงื่อนไข',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ---- Password Strength Checker ----
function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  width: string;
} {
  let score = 0;
  if (password.length >= 6) score += 20;
  if (password.length >= 10) score += 10;
  if (/[a-z]/.test(password)) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;

  if (score <= 20) return { score, label: 'อ่อน', color: 'bg-red-500', width: 'w-1/5' };
  if (score <= 40) return { score, label: 'ปานกลาง', color: 'bg-orange-500', width: 'w-2/5' };
  if (score <= 60) return { score, label: 'ดี', color: 'bg-yellow-500', width: 'w-3/5' };
  if (score <= 80) return { score, label: 'ดีมาก', color: 'bg-lime-500', width: 'w-4/5' };
  return { score, label: 'แข็งแรง', color: 'bg-emerald-500', width: 'w-full' };
}

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const passwordValue = watch('password');
  const passwordStrength = passwordValue ? getPasswordStrength(passwordValue) : null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await registerApi({
        name: data.name,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      login(response.token, response.user);
      toast.success('สมัครสมาชิกสำเร็จ! 🎉', {
        description: `ยินดีต้อนรับ ${response.user.name} สู่ล็อตโต้ไทย`,
      });

      router.push('/');
    } catch (error) {
      toast.error('สมัครสมาชิกไม่สำเร็จ', {
        description: error instanceof Error ? error.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl shadow-lg mb-4">
              <span className="text-white text-3xl font-bold">ล</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              สมัครสมาชิก
            </h1>
            <p className="text-gray-500 mt-1">
              สมัครฟรี! ซื้อหวยออนไลน์ได้ทันที ปลอดภัย 100%
            </p>
          </div>

          {/* Register Form */}
          <Card variant="elevated" padding="lg">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardContent className="space-y-5 pt-0">
                {/* Full Name */}
                <Input
                  label="ชื่อ-นามสกุล"
                  placeholder="สมชาย ใจดี"
                  type="text"
                  required
                  error={errors.name?.message}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  {...register('name')}
                />

                {/* Phone Number */}
                <Input
                  label="เบอร์โทรศัพท์"
                  placeholder="08X-XXX-XXXX"
                  type="tel"
                  required
                  error={errors.phone?.message}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  {...register('phone')}
                />

                {/* Email (Optional) */}
                <Input
                  label="อีเมล (ไม่บังคับ)"
                  placeholder="somchai@email.com"
                  type="email"
                  error={errors.email?.message}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  {...register('email')}
                />

                {/* Password */}
                <div>
                  <Input
                    label="รหัสผ่าน"
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    type={showPassword ? 'text' : 'password'}
                    required
                    error={errors.password?.message}
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    }
                    {...register('password')}
                  />

                  {/* Password Strength Indicator */}
                  {passwordStrength && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        ความปลอดภัย: <span className="font-medium">{passwordStrength.label}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <Input
                  label="ยืนยันรหัสผ่าน"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  error={errors.confirmPassword?.message}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  }
                  {...register('confirmPassword')}
                />

                {/* Password Requirements */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-medium text-amber-800 mb-1.5">
                    ข้อกำหนดรหัสผ่าน:
                  </p>
                  <ul className="text-xs text-amber-700 space-y-0.5">
                    <li className="flex items-center gap-1">
                      <span className={passwordValue?.length >= 6 ? 'text-emerald-500' : 'text-amber-400'}>
                        {passwordValue?.length >= 6 ? '✓' : '○'}
                      </span>
                      อย่างน้อย 6 ตัวอักษร
                    </li>
                    <li className="flex items-center gap-1">
                      <span className={/[a-zA-Z]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-amber-400'}>
                        {/[a-zA-Z]/.test(passwordValue || '') ? '✓' : '○'}
                      </span>
                      มีตัวอักษร (A-Z, a-z)
                    </li>
                    <li className="flex items-center gap-1">
                      <span className={/[0-9]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-amber-400'}>
                        {/[0-9]/.test(passwordValue || '') ? '✓' : '○'}
                      </span>
                      มีตัวเลข (0-9)
                    </li>
                  </ul>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      {...register('acceptTerms')}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      ข้าพเจ้ายอมรับ{' '}
                      <Link href="/terms" className="text-amber-600 hover:text-amber-700 underline">
                        ข้อกำหนดและเงื่อนไข
                      </Link>
                      {' '}และ{' '}
                      <Link href="/privacy" className="text-amber-600 hover:text-amber-700 underline">
                        นโยบายความเป็นส่วนตัว
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500 flex items-center gap-1 ml-7" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="xl"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิกฟรี'}
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex-col gap-4 pt-6">
              {/* Divider */}
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">หรือ</span>
                </div>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-500">
                มีบัญชีอยู่แล้ว?{' '}
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: '🛡️', text: 'ปลอดภัย 100%' },
              { icon: '⚡', text: 'ซื้อง่าย จ่ายไว' },
              { icon: '🎯', text: 'ถูกต้องแม่นยำ' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
