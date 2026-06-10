// ============================================
// Core Types for Lotto System
// ============================================

// ---- User & Auth ----
export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  phone: string;
  password: string;
  name: string;
  confirmPassword: string;
}

// ---- Lottery (หวย) ----
export type LotteryType = 'government' | 'thai_shared' | 'laos' | 'vietnam' | 'china';

export type LotteryStatus = 'upcoming' | 'open' | 'closed' | 'drawing' | 'completed' | 'cancelled';

export interface Lottery {
  id: string;
  type: LotteryType;
  name: string;
  nameThai: string;
  description: string;
  drawDate: string;
  closeDate: string;
  status: LotteryStatus;
  ticketPrice: number;
  maxTicketsPerUser: number;
  prize: PrizeStructure;
  image?: string;
  createdAt: string;
}

export interface PrizeStructure {
  first: number;
  second: number[];
  third: number[];
  fourth: number[];
  fifth: number[];
  lastTwo: number;
  lastThree: number;
}

// ---- Ticket (ตั๋ว/ใบหวย) ----
export interface Ticket {
  id: string;
  lotteryId: string;
  userId: string;
  numbers: TicketNumbers;
  quantity: number;
  totalPrice: number;
  status: TicketStatus;
  purchasedAt: string;
}

export interface TicketNumbers {
  mainNumber: string;
  setCount: number;
  selectedNumbers?: string[];
}

export type TicketStatus = 'pending' | 'active' | 'won' | 'lost' | 'cancelled' | 'expired';

// ---- Order (คำสั่งซื้อ) ----
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  lotteryId: string;
  lotteryName: string;
  numbers: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'promptpay' | 'wallet' | 'cash';
export type PaymentStatus = 'unpaid' | 'paid' | 'verified' | 'refunded';

// ---- Wallet (กระเป๋าเงิน) ----
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  points: number;
  totalDeposited: number;
  totalWithdrawn: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  referenceId?: string;
  createdAt: string;
}

export type TransactionType = 'deposit' | 'withdraw' | 'purchase' | 'winning' | 'refund' | 'bonus';

// ---- Drawing Result (ผลรางวัล) ----
export interface DrawResult {
  id: string;
  lotteryId: string;
  drawDate: string;
  winningNumbers: WinningNumbers;
  prizeBreakdown: PrizeBreakdown[];
  totalPrizes: number;
  totalWinners: number;
  announcedAt: string;
}

export interface WinningNumbers {
  first: string;
  lastTwo: string;
  lastThree: string[];
  threeFront?: string[];
  twoFront?: string[];
}

export interface PrizeBreakdown {
  prize: string;
  numbers: string[];
  amount: number;
  winners: number;
}

// ---- API Response Types ----
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// ---- Filter & Search ----
export interface LotteryFilter {
  type?: LotteryType;
  status?: LotteryStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface OrderFilter {
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
}

// ---- Cart (for frontend state) ----
export interface CartItem {
  lotteryId: string;
  lotteryName: string;
  lotteryType: LotteryType;
  numbers: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  children?: NavItem[];
}

// ---- UI State ----
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}
