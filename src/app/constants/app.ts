// SONA Intelligence - Application Constants

export const APP_NAME = 'SONA Intelligence';
export const APP_TAGLINE = 'Know before you click.';
export const APP_SUBTITLE = 'Just receipts with intelligence.';

export const BLOCKCHAIN = {
  NAME: 'Base',
  EXPLORER_URL: 'https://basescan.org',
  CHAIN_ID: 8453,
} as const;

export const API = {
  COINGECKO_BASE_URL: 'https://api.coingecko.com/api/v3',
  REFRESH_INTERVAL: 30000, // 30 seconds
  REQUEST_TIMEOUT: 10000, // 10 seconds
} as const;

export const COLORS = {
  PRIMARY: '#A855F7', // Purple
  SECONDARY: '#C026D3', // Magenta
  ACCENT: '#7C3AED', // Violet
  WARNING: '#F59E0B', // Orange
  DANGER: '#EF4444', // Red
  CRITICAL: '#DC2626', // Dark Red
  BACKGROUND: '#0F0F0F',
  CARD: 'rgba(17, 17, 17, 0.3)',
  PURPLE_GLOW: 'rgba(168, 85, 247, 0.3)',
} as const;

export const RISK_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  MODERATE: 40,
  POOR: 20,
} as const;

export const LIQUIDITY_TIERS = {
  TIER_1: 1_000_000_000, // $1B+
  TIER_2: 100_000_000,   // $100M+
  TIER_3: 10_000_000,    // $10M+
  TIER_4: 1_000_000,     // $1M+
} as const;

export const VOLUME_TIERS = {
  HIGH: 100_000_000,     // $100M+
  MEDIUM: 10_000_000,    // $10M+
  LOW: 1_000_000,        // $1M+
} as const;

export const TRANSACTION_STEPS = [
  { id: 1, label: 'Approve', duration: 1000 },
  { id: 2, label: 'Sign', duration: 1000 },
  { id: 3, label: 'Broadcast', duration: 1500 },
  { id: 4, label: 'Confirmed', duration: 500 },
] as const;

export const ERROR_TYPES = {
  SLIPPAGE: 'slippage',
  INSUFFICIENT: 'insufficient',
  WASH_TRADE: 'wash-trade',
  NETWORK: 'network',
  REJECTED: 'rejected',
} as const;

export const RECOMMENDATIONS = {
  ENTER: 'enter',
  WAIT: 'wait',
  CUT: 'cut',
  REJECT: 'reject',
} as const;

export const ROUTES = {
  HOME: '/',
  TOKEN: '/token',
  RECEIPT: '/receipt',
  RULES: '/rules',
  FIX_IT: '/fix-it',
} as const;

export const STORAGE_KEYS = {
  API_KEY: 'coingecko_api_key',
  STRATEGIES: 'sona_strategies',
  TRADES: 'sona_trades',
  SETTINGS: 'sona_settings',
} as const;

export const DEFAULT_SLIPPAGE = 0.5; // 0.5%
export const MAX_SLIPPAGE = 5; // 5%

export const POSITION_SIZE_MULTIPLIERS = {
  LOW_RISK: 0.05,    // 5% of wallet
  MEDIUM_RISK: 0.10, // 10% of wallet
  HIGH_RISK: 0.20,   // 20% of wallet
} as const;

export const MARKET_CAP_LABELS = {
  MEGA: 'Mega Cap',     // $10B+
  LARGE: 'Large Cap',   // $1B+
  MID: 'Mid Cap',       // $100M+
  SMALL: 'Small Cap',   // $10M+
  MICRO: 'Micro Cap',   // $1M+
  NANO: 'Nano Cap',     // <$1M
} as const;

export const TOAST_DURATION = 3000; // 3 seconds

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;