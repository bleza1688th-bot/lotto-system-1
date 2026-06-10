import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution
 * Utility for conditionally joining classNames together
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Thai currency format (บาท)
 * @example formatCurrency(123456.78) => "฿123,456.78"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with commas
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('th-TH').format(num);
}

/**
 * Format date to Thai locale
 * @example formatDate("2024-01-15") => "15 ม.ค. 2567"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date with time
 * @example formatDateTime("2024-01-15T14:30:00") => "15 ม.ค. 2567 14:30 น."
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' น.';
}

/**
 * Format time remaining until a date
 */
export function getTimeRemaining(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} {
  const total = new Date(targetDate).getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isExpired: false };
}

/**
 * Generate random lottery number (6 digits)
 */
export function generateLotteryNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate Thai phone number
 */
export function isValidThaiPhone(phone: string): boolean {
  return /^0[0-9]{9}$/.test(phone);
}

/**
 * Validate 6-digit lottery number
 */
export function isValidLotteryNumber(num: string): boolean {
  return /^[0-9]{6}$/.test(num);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Get lottery type display name in Thai
 */
export function getLotteryTypeThai(type: string): string {
  const typeMap: Record<string, string> = {
    government: 'หวยรัฐบาล',
    thai_shared: 'หวยชุดไทย',
    laos: 'หวยลาว',
    vietnam: 'หวยเวียดนาม',
    china: 'หวยจีน',
  };
  return typeMap[type] || type;
}

/**
 * Get status display in Thai with color
 */
export function getLotteryStatusDisplay(status: string): {
  label: string;
  color: string;
  bgColor: string;
} {
  const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
    upcoming: { label: 'กำลังจะเปิด', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    open: { label: 'เปิดขาย', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    closed: { label: 'ปิดขาย', color: 'text-amber-600', bgColor: 'bg-amber-100' },
    drawing: { label: 'กำลังออกรางวัล', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    completed: { label: 'ประกาศผลแล้ว', color: 'text-gray-600', bgColor: 'bg-gray-100' },
    cancelled: { label: 'ยกเลิก', color: 'text-red-600', bgColor: 'bg-red-100' },
  };
  return statusMap[status] || { label: status, color: 'text-gray-600', bgColor: 'bg-gray-100' };
}

/**
 * Get order status display in Thai
 */
export function getOrderStatusThai(status: string): string {
  const map: Record<string, string> = {
    pending: 'รอดำเนินการ',
    confirmed: 'ยืนยันแล้ว',
    processing: 'กำลังดำเนินการ',
    completed: 'สำเร็จ',
    cancelled: 'ยกเลิก',
    refunded: 'คืนเงินแล้ว',
  };
  return map[status] || status;
}

/**
 * Get payment method display in Thai
 */
export function getPaymentMethodThai(method: string): string {
  const map: Record<string, string> = {
    bank_transfer: 'โอนธนาคาร',
    promptpay: 'พร้อมเพย์',
    wallet: 'กระเป๋าเงิน',
    cash: 'เงินสด',
  };
  return map[method] || method;
}

/**
 * Delay execution (for mock/simulation)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID (for mock data / frontend use)
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}
