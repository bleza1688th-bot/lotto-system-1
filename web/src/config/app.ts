// ============================================
// Application Configuration
// ============================================

export const appConfig = {
  name: 'LottoThai',
  nameThai: 'ล็อตโต้ไทย',
  description: 'ซื้อหวยออนไลน์ ถูกกฎหมาย ปลอดภัย มั่นใจได้ 100%',

  // URLs
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',

  // Features
  features: {
    darkMode: true,
    notifications: true,
    wallet: true,
    multiLanguage: false,
    maintenance: false,
  },

  // Social
  social: {
    line: '@lottothai',
    facebook: 'lottothai',
    tiktok: '@lottothai',
  },

  // Contact
  contact: {
    phone: '02-123-4567',
    email: 'support@lottothai.com',
    address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
  },

  // Business Info
  business: {
    companyName: 'บริษัท ล็อตโต้ไทย จำกัด',
    taxId: '0123456789012',
    registeredCapital: '5,000,000',
  },

  // Meta
  meta: {
    openGraph: {
      type: 'website',
      locale: 'th_TH',
      siteName: 'LottoThai',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@lottothai',
    },
  },
} as const;

export type AppConfig = typeof appConfig;
