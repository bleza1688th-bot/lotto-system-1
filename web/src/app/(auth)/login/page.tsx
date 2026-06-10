'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/store/auth-context';
import { loginApi } from '@/services/auth-service';
import { isValidThaiPhone } from '@/lib/utils';

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'กรุณากรอกเบอร์โทรศัพท์')
    .refine((val) => isValidThaiPhone(val), {
      message: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)',
    }),
  password: z
    .string()
    .min(1, 'กรุณากรอกรหัสผ่าน')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response = await loginApi({
        phone: data.phone,
        password: data.password,
      });
      login(response.token, response.user);
      toast.success('เข้าสู่ระบบสำเร็จ!', {
        description: `ยินดีต้อนรับกลับ ${response.user.name}`,
      });
      router.push('/');
    } catch (error) {
      toast.error('เข้าสู่ระบบไม่สำเร็จ', {
        description: error instanceof Error ? error.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#010B26]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #010B26 0%, #02133B 50%, #031B57 100%)' }} />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, rgba(10, 61, 204, 0.15) 25%, rgba(10, 61, 204, 0.05) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
            animation: 'wave-drift 8s ease-in-out infinite alternate',
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent 10%, rgba(4, 42, 122, 0.2) 30%, rgba(3, 27, 87, 0.3) 50%, transparent 70%)',
            backgroundSize: '300% 100%',
            animation: 'wave-drift 12s ease-in-out infinite alternate-reverse',
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, rgba(192, 197, 210, 0.08) 30%, transparent 60%)',
            backgroundSize: '100% 300%',
            animation: 'wave-rise 10s ease-in-out infinite alternate',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(248, 251, 255, 0.5) 30%, rgba(248, 251, 255, 0.3) 50%, transparent 80%)',
            backgroundSize: '200% 100%',
            animation: 'light-sweep 6s ease-in-out infinite',
          }}
        />
        
        {/* Blue light streaks - edges only, not overlapping content */}
        <div className="absolute top-[8%] left-[5%] w-[1px] h-24 bg-gradient-to-b from-transparent via-blue-400/25 to-transparent" style={{ animation: 'streak-fall 4s ease-in-out infinite', transform: 'rotate(20deg)' }} />
        <div className="absolute top-[5%] right-[8%] w-[1px] h-20 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" style={{ animation: 'streak-fall 4.5s ease-in-out infinite 1s', transform: 'rotate(-15deg)' }} />
        <div className="absolute bottom-[15%] left-[8%] w-[1px] h-24 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" style={{ animation: 'streak-fall 5s ease-in-out infinite 2s', transform: 'rotate(-10deg)' }} />
        <div className="absolute bottom-[20%] right-[5%] w-[1px] h-20 bg-gradient-to-b from-transparent via-blue-400/25 to-transparent" style={{ animation: 'streak-fall 3.5s ease-in-out infinite 0.5s', transform: 'rotate(15deg)' }} />
        <div className="absolute top-[12%] left-[45%] w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-400/15 to-transparent" style={{ animation: 'streak-fall 6s ease-in-out infinite 3s', transform: 'rotate(5deg)' }} />
        <div className="absolute top-[78%] left-[50%] w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-400/15 to-transparent" style={{ animation: 'streak-fall 5.5s ease-in-out infinite 1.5s', transform: 'rotate(-5deg)' }} />

        {/* Silver sparkles */}
        <div className="absolute w-1 h-1 rounded-full bg-white/40" style={{ top: '20%', left: '15%', animation: 'sparkle 3s ease-in-out infinite' }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/30" style={{ top: '35%', left: '75%', animation: 'sparkle 4s ease-in-out infinite 0.5s' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-white/20" style={{ top: '55%', left: '25%', animation: 'sparkle 3.5s ease-in-out infinite 1s' }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/35" style={{ top: '70%', left: '60%', animation: 'sparkle 2.5s ease-in-out infinite 1.5s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-white/25" style={{ top: '45%', left: '50%', animation: 'sparkle 4.5s ease-in-out infinite 2s' }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/30" style={{ top: '80%', left: '80%', animation: 'sparkle 3s ease-in-out infinite 0.8s' }} />

        {/* Diamond particles */}
        <div className="absolute diamond-particle" style={{ top: '18%', left: '30%', animation: 'diamond-float 6s ease-in-out infinite' }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="rgba(192, 197, 210, 0.3)">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
        </div>
        <div className="absolute diamond-particle" style={{ top: '65%', right: '20%', animation: 'diamond-float 7s ease-in-out infinite 1.5s' }}>
          <svg width="6" height="6" viewBox="0 0 24 24" fill="rgba(192, 197, 210, 0.2)">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
        </div>
        <div className="absolute diamond-particle" style={{ top: '40%', left: '60%', animation: 'diamond-float 8s ease-in-out infinite 3s' }}>
          <svg width="5" height="5" viewBox="0 0 24 24" fill="rgba(192, 197, 210, 0.25)">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
        </div>
        <div className="absolute diamond-particle" style={{ top: '75%', left: '40%', animation: 'diamond-float 5.5s ease-in-out infinite 2s' }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="rgba(192, 197, 210, 0.15)">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
        </div>
        <div className="absolute diamond-particle" style={{ top: '30%', left: '85%', animation: 'diamond-float 6.5s ease-in-out infinite 0.5s' }}>
          <svg width="4" height="4" viewBox="0 0 24 24" fill="rgba(192, 197, 210, 0.2)">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
        </div>

        {/* Diamond center glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(192, 197, 210, 0.04) 0%, rgba(248, 251, 255, 0.02) 30%, transparent 70%)',
            animation: 'diamond-glow 4s ease-in-out infinite',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" style={{ animation: 'float-glow 5s ease-in-out infinite' }} />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" style={{ animation: 'float-glow 7s ease-in-out infinite 1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center -mt-48 mb-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-blue-400/20 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <Image
                  src="/logo/image.webp"
                  alt="Logo"
                  width={220}
                  height={220}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Announcement Bar */}
          <div 
            className="relative mb-6 overflow-hidden rounded-xl"
            style={{ 
              width: '100%',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.05)',
            }}
          >
            <div className="absolute top-0 left-4 right-4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)' }} />
            <div className="flex items-center gap-2 px-3 py-2.5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-amber-400/20 blur-sm rounded-full" />
                <svg className="w-6 h-6 text-amber-400 relative animate-wiggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">ประกาศ</span>
              <div className="w-[1px] h-3 bg-amber-400/20" />
              <div className="overflow-hidden flex-1">
                <div className="inline-flex whitespace-nowrap marquee-text">
                  <span className="mr-8 text-xs font-medium text-amber-200/80">เงินล้าน เว็บหวยออนไลน์มาแรงที่สุดตอนนี้ จ่ายจริง มั่นคง ปลอดภัย</span>
                  <span className="mr-8 text-xs font-medium text-amber-200/80">เงินล้าน เว็บหวยออนไลน์มาแรงที่สุดตอนนี้ จ่ายจริง มั่นคง ปลอดภัย</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div
            className="relative rounded-2xl p-6 overflow-hidden"
            style={{
              background: 'rgba(15, 25, 60, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '2px solid rgba(212, 165, 69, 0.6)',
              boxShadow: '0 0 25px rgba(10, 61, 204, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              className="absolute top-0 left-8 right-8 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)' }}
            />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-20 bg-blue-500/10 blur-3xl rounded-full" />

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10">
              <div className="space-y-4">


                {/* Phone - inside bordered box */}
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 69, 0.5)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 165, 69, 0.08), inset 0 1px 0 rgba(212, 165, 69, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-3 px-3.5 py-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 165, 69, 0.12)', boxShadow: 'inset 0 1px 0 rgba(212, 165, 69, 0.1)' }}>
                      <svg className="w-4 h-4 text-[#D4A545]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-xs text-[#C0C5D2]/60 tracking-wide flex-shrink-0 font-medium">เบอร์โทรศัพท์</span>
                      <input
                        type="tel"
                        placeholder=""
                        className="flex-1 bg-transparent text-sm text-[#F8FBFF] placeholder-[#C0C5D2]/30 outline-none border-none text-right font-medium tracking-wide"
                        {...register('phone')}
                      />
                    </div>
                  </div>
                  {errors.phone?.message && (
                    <p className="text-[11px] text-red-400/80 px-3.5 pb-2.5">{errors.phone.message}</p>
                  )}
                </div>

                {/* Password - inside bordered box */}
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 69, 0.5)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 165, 69, 0.08), inset 0 1px 0 rgba(212, 165, 69, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-3 px-3.5 py-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(212, 165, 69, 0.12)', boxShadow: 'inset 0 1px 0 rgba(212, 165, 69, 0.1)' }}>
                      <svg className="w-4 h-4 text-[#D4A545]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-xs text-[#C0C5D2]/60 tracking-wide flex-shrink-0 font-medium">รหัสผ่าน</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder=""
                        className="flex-1 bg-transparent text-sm text-[#F8FBFF] placeholder-[#C0C5D2]/30 outline-none border-none text-right font-medium tracking-wide"
                        {...register('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#C0C5D2]/40 hover:text-[#D4A545] hover:bg-[rgba(212,165,69,0.1)] transition-all duration-200"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password?.message && (
                    <p className="text-[11px] text-red-400/80 px-3.5 pb-2.5">{errors.password.message}</p>
                  )}
                </div>










                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between py-0.5">


                  <label className="group flex items-center gap-2.5 cursor-pointer select-none">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"

                        className="peer absolute opacity-0 w-0 h-0"
                        {...register('rememberMe')}
                      />
                      <div
                        className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all duration-300 peer-checked:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1.5px solid rgba(192, 197, 210, 0.2)',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}





























                      >

                        {/* Checkmark SVG - peer checked */}
                        <svg 
                          className="w-[10px] h-[10px] opacity-0 peer-checked:opacity-100 transition-all duration-300"
                          viewBox="0 0 12 12" 
                          fill="none"
                          style={{ filter: 'drop-shadow(0 0 3px rgba(212, 165, 69, 0.4))' }}
                        >
                          <path d="M2 6L5 9L10 2.5" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                    </div>





                    <span className="relative text-xs tracking-wide text-[#D4A545]/70 group-hover:text-[#D4A545] transition-all duration-200 font-semibold drop-shadow-[0_0_8px_rgba(212,165,69,0.2)]">
                      จดจำฉันไว้
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-gradient-to-r from-[#D4A545] to-transparent group-hover:w-full transition-all duration-300 ease-out" />
                    </span>
                  </label>


                  <Link 
                    href="/forgot-password" 
                    className="group relative text-xs font-medium transition-all duration-300"
                    style={{ color: 'rgba(212, 165, 69, 0.6)' }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'rgba(212, 165, 69, 0.8)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'rgba(192, 197, 210, 0.45)';
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <svg 

                        className="w-3 h-3 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                        <circle cx="12" cy="16" r="1"/>
                      </svg>
                      <span className="relative">
                        ลืมรหัสผ่าน?

                        <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-gradient-to-r from-[#D4A545] to-transparent group-hover:w-full transition-all duration-300 ease-out" />
                      </span>
                    </span>
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-3 px-6 rounded-xl font-semibold text-white text-sm tracking-wide overflow-hidden transition-all duration-500 btn-pulse-glow"
                  style={{
                    background: 'linear-gradient(135deg, #0A3DCC, #042A7A)',
                    boxShadow: '0 4px 25px rgba(10, 61, 204, 0.3)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1a5ae0, #0A3DCC)';
                    e.currentTarget.style.boxShadow = '0 6px 35px rgba(10, 61, 204, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #0A3DCC, #042A7A)';
                    e.currentTarget.style.boxShadow = '0 4px 25px rgba(10, 61, 204, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Shine overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        transform: 'skewX(-20deg) translateX(-100%)',
                        animation: 'shine 2s ease-in-out infinite',
                      }}
                    />
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-xl btn-pulse-ring" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        กำลังเข้าสู่ระบบ...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        เข้าสู่ระบบ
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            <div className="relative my-5">
              <div className="w-full border-t" style={{ borderColor: 'rgba(192, 197, 210, 0.08)' }} />
            </div>

            {/* Register Buttons - side by side */}
            <div className="flex gap-3">
              <Link href="/register" className="flex-1">
                <button
                  type="button"
                  className="group w-full py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #0A3DCC, #1a5ae0)',
                    border: 'none',
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(10, 61, 204, 0.3)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1a5ae0, #2a7af0)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(10, 61, 204, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #0A3DCC, #1a5ae0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(10, 61, 204, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    สมัครสมาชิก
                  </span>
                </button>
              </Link>

              <Link href="/register-admin" className="flex-1">
                <button
                  type="button"
                  className="group w-full py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #D4A545, #C9952E)',
                    border: 'none',
                    color: '#1A1A2E',
                    boxShadow: '0 4px 15px rgba(212, 165, 69, 0.25)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E4B555, #D4A545)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(212, 165, 69, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4A545, #C9952E)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 165, 69, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    ติดต่อแอดมิน
                  </span>
                </button>
              </Link>
            </div>


          </div>
        </div>
      </div>

   </div>
  );
}