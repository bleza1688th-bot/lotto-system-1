// ============================================
// Application Constants
// ============================================

export const APP_NAME = 'LottoThai';
export const APP_NAME_THAI = 'ล็อตโต้ไทย';
export const APP_DESCRIPTION = 'ซื้อหวยออนไลน์ ถูกกฎหมาย ปลอดภัย มั่นใจได้ 100%';

// ---- API ----
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 30000;

// ---- Pagination ----
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

// ---- Lottery ----
export const LOTTERY_NUMBER_LENGTH = 6;
export const MAX_QUANTITY_PER_TICKET = 100;
export const MIN_QUANTITY_PER_TICKET = 1;
export const MAX_CART_ITEMS = 50;

// ---- Price ----
export const MIN_TICKET_PRICE = 80;
export const MAX_TICKET_PRICE = 100;

// ---- Auth ----
export const TOKEN_KEY = 'lotto_token';
export const REFRESH_TOKEN_KEY = 'lotto_refresh_token';
export const USER_KEY = 'lotto_user';
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// ---- Routes ----
export const ROUTES = {
  HOME: '/',
  LOTTO: '/lotto',
  LOTTO_DETAIL: (id: string) => `/lotto/${id}`,
  RESULTS: '/results',
  RESULT_DETAIL: (id: string) => `/results/${id}`,
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  WALLET: '/wallet',
  CART: '/cart',
  CHECKOUT: '/checkout',
} as const;

// ---- Thai Lottery Types ----
export const LOTTERY_TYPES = [
  { value: 'government', label: 'หวยรัฐบาล', icon: '🏛️', description: 'หวยรัฐบาลไทย ออกรางวัลทุกวันที่ 1 และ 16' },
  { value: 'thai_shared', label: 'หวยชุดไทย', icon: '🎫', description: 'หวยชุดไทย เลขชุดละ 5 ใบ' },
  { value: 'laos', label: 'หวยลาว', icon: '🇱🇦', description: 'หวยพัฒนา ลาว ออกรางวัลทุกวัน' },
  { value: 'vietnam', label: 'หวยเวียดนาม', icon: '🇻🇳', description: 'หวยเวียดนาม ออกรางวัลทุกวัน' },
  { value: 'china', label: 'หวยจีน', icon: '🇨🇳', description: 'หวยหุ้นจีน ออกรางวัลตามรอบเวลา' },
] as const;

// ---- Bank Accounts for Payment ----
export const BANK_ACCOUNTS = [
  {
    bank: 'ธนาคารกรุงเทพ',
    accountName: 'บจก. ล็อตโต้ไทย',
    accountNumber: '123-4-56789-0',
    color: 'bg-blue-600',
  },
  {
    bank: 'ธนาคารกสิกรไทย',
    accountName: 'บจก. ล็อตโต้ไทย',
    accountNumber: '987-6-54321-0',
    color: 'bg-green-600',
  },
  {
    bank: 'ธนาคารไทยพาณิชย์',
    accountName: 'บจก. ล็อตโต้ไทย',
    accountNumber: '456-7-89012-3',
    color: 'bg-purple-600',
  },
] as const;

// ---- Contact Info ----
export const CONTACT = {
  phone: '02-123-4567',
  line: '@lottothai',
  facebook: 'lottothai',
  email: 'support@lottothai.com',
} as const;

// ---- SEO ----
export const SEO = {
  TITLE_TEMPLATE: `%s | ${APP_NAME_THAI}`,
  DEFAULT_TITLE: `${APP_NAME_THAI} - ซื้อหวยออนไลน์ถูกกฎหมาย`,
  DESCRIPTION: APP_DESCRIPTION,
} as const;

// ---- Validation Rules ----
export const VALIDATION = {
  PHONE: {
    pattern: /^0[0-9]{9}$/,
    message: 'เบอร์โทรศัพท์ต้องเป็น 10 หลัก เริ่มต้นด้วย 0',
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 50,
    pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
    message: 'รหัสผ่านต้องมีตัวอักษรและตัวเลขอย่างน้อย 1 ตัว',
  },
  NAME: {
    minLength: 2,
    maxLength: 100,
    message: 'ชื่อต้องมีความยาว 2-100 ตัวอักษร',
  },
  LOTTERY_NUMBER: {
    pattern: /^[0-9]{6}$/,
    message: 'เลขหวยต้องเป็นตัวเลข 6 หลัก',
  },
} as const;
