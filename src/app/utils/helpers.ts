// SONA Intelligence - Utility Helper Functions

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

/**
 * Format price based on value (more decimals for smaller prices)
 */
export function formatPrice(price: number): string {
  if (price >= 1) {
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  if (price >= 0.01) {
    return price.toFixed(4);
  }
  return price.toFixed(8);
}

/**
 * Format percentage change with + or - prefix
 */
export function formatPercentage(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

/**
 * Get color based on score (0-100)
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return '#A855F7'; // Purple
  if (score >= 60) return '#C026D3'; // Magenta
  if (score >= 40) return '#F59E0B'; // Orange
  return '#EF4444'; // Red
}

/**
 * Get risk level text based on score
 */
export function getRiskLevel(score: number): string {
  if (score >= 80) return 'Low Risk';
  if (score >= 60) return 'Moderate';
  if (score >= 40) return 'High Risk';
  return 'Very High Risk';
}

/**
 * Shorten wallet address or transaction hash
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Generate mock transaction hash
 */
export function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(timestamp: number | string): string {
  const now = Date.now();
  const time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
  const diff = now - time;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

/**
 * Calculate PnL percentage
 */
export function calculatePnL(entryPrice: number, currentPrice: number): {
  amount: number;
  percentage: number;
  isProfit: boolean;
} {
  const amount = currentPrice - entryPrice;
  const percentage = (amount / entryPrice) * 100;
  return {
    amount,
    percentage,
    isProfit: amount >= 0,
  };
}

/**
 * Validate Ethereum/Base address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate token symbol (2-5 uppercase letters)
 */
export function isValidSymbol(symbol: string): boolean {
  return /^[A-Z]{2,5}$/.test(symbol);
}

/**
 * Get wash trade severity
 */
export function getWashTradeSeverity(status: string): {
  level: 'low' | 'moderate' | 'high' | 'critical';
  color: string;
  shouldBlock: boolean;
} {
  if (status.includes('high')) {
    return { level: 'critical', color: '#DC2626', shouldBlock: true };
  }
  if (status.includes('moderate')) {
    return { level: 'high', color: '#F59E0B', shouldBlock: false };
  }
  if (status.includes('low')) {
    return { level: 'moderate', color: '#00D4FF', shouldBlock: false };
  }
  return { level: 'low', color: '#22C55E', shouldBlock: false };
}

/**
 * Format liquidity status
 */
export function formatLiquidityStatus(marketCap: number, volume24h: number): {
  label: string;
  color: string;
  safe: boolean;
} {
  const ratio = marketCap > 0 ? volume24h / marketCap : 0;
  
  if (marketCap > 1_000_000_000 && ratio > 0.1) {
    return { label: 'Excellent', color: '#22C55E', safe: true };
  }
  if (marketCap > 100_000_000 && ratio > 0.05) {
    return { label: 'Good', color: '#00D4FF', safe: true };
  }
  if (marketCap > 10_000_000) {
    return { label: 'Moderate', color: '#F59E0B', safe: true };
  }
  return { label: 'Low', color: '#EF4444', safe: false };
}

/**
 * Calculate slippage impact
 */
export function calculateSlippage(
  tradeAmount: number,
  liquidity: number,
  volatility: number
): number {
  // Simple slippage estimation formula
  const liquidityImpact = (tradeAmount / liquidity) * 100;
  const volatilityMultiplier = 1 + volatility;
  return liquidityImpact * volatilityMultiplier;
}

/**
 * Get recommendation action based on score and risk factors
 */
export function getRecommendation(
  score: number,
  washTrade: boolean,
  lowLiquidity: boolean
): 'enter' | 'wait' | 'cut' | 'reject' {
  if (washTrade) return 'reject';
  if (score >= 80 && !lowLiquidity) return 'enter';
  if (score >= 60) return 'wait';
  if (score >= 40) return 'cut';
  return 'reject';
}

/**
 * Parse token input (name, symbol, or address)
 */
export function parseTokenInput(input: string): {
  type: 'name' | 'symbol' | 'address' | 'unknown';
  value: string;
} {
  const trimmed = input.trim();
  
  if (isValidAddress(trimmed)) {
    return { type: 'address', value: trimmed };
  }
  if (isValidSymbol(trimmed.toUpperCase())) {
    return { type: 'symbol', value: trimmed.toUpperCase() };
  }
  if (trimmed.length >= 2) {
    return { type: 'name', value: trimmed };
  }
  return { type: 'unknown', value: trimmed };
}

/**
 * Generate mock trade data for testing
 */
export function generateMockTrade(tokenSymbol: string, score: number) {
  return {
    id: generateTxHash(),
    tokenSymbol,
    tokenName: tokenSymbol,
    amount: (Math.random() * 1 + 0.1).toFixed(4),
    usdValue: (Math.random() * 200 + 50).toFixed(2),
    entryPrice: (Math.random() * 100 + 10).toFixed(4),
    currentPrice: (Math.random() * 120 + 10).toFixed(4),
    score,
    timestamp: Date.now(),
    status: 'active' as const,
  };
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Copy text to clipboard with feedback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Format Base chain explorer URL
 */
export function getExplorerUrl(txHash: string, type: 'tx' | 'address' = 'tx'): string {
  const baseUrl = 'https://basescan.org';
  return `${baseUrl}/${type}/${txHash}`;
}

/**
 * Calculate position size based on wallet balance and risk tolerance
 */
export function calculatePositionSize(
  walletBalance: number,
  riskScore: number,
  riskTolerance: 'low' | 'medium' | 'high'
): number {
  const riskMultipliers = {
    low: 0.05,    // 5% of wallet
    medium: 0.10, // 10% of wallet
    high: 0.20,   // 20% of wallet
  };
  
  const baseSize = walletBalance * riskMultipliers[riskTolerance];
  const scoreAdjustment = riskScore / 100;
  
  return baseSize * scoreAdjustment;
}

/**
 * Get signal emoji based on signal text
 */
export function getSignalEmoji(signal: string): string {
  if (signal.includes('hurt')) return '⚠️';
  if (signal.includes('clean')) return '✅';
  if (signal.includes('dying')) return '📉';
  if (signal.includes('barely')) return '🔍';
  return '📊';
}