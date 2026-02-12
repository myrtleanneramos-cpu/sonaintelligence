// SONA Intelligence - TypeScript Type Definitions

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank?: number;
  total_volume?: number;
  image?: string;
}

export interface TokenSearchResult {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb?: string;
  }>;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
  };
}

export interface RiskMetric {
  status: string;
  pass: boolean;
  score: number;
}

export interface RiskAnalysis {
  score: number;
  liquidity: RiskMetric;
  washTrade: RiskMetric;
  momentum: RiskMetric;
  slippage: RiskMetric;
  concentration: RiskMetric;
  signals: string[];
  recommendation: 'enter' | 'wait' | 'cut' | 'reject';
}

export type LoadingStep = 'detecting' | 'fetching' | 'analyzing' | null;

export type TxStep = 1 | 2 | 3 | 4;

export type ErrorType = 'slippage' | 'insufficient' | 'wash-trade' | 'network' | 'rejected';

export interface Trade {
  id: string;
  tokenSymbol: string;
  tokenName: string;
  amount: string;
  usdValue: string;
  entryPrice: string;
  currentPrice: string;
  score: number;
  timestamp: number;
  status: 'active' | 'closed' | 'pending';
  txHash?: string;
}

export interface Strategy {
  id: string;
  name: string;
  notes: string;
  createdAt: string;
  rules?: Array<{
    type: string;
    value: string | number;
  }>;
}

export interface AppSettings {
  slippageTolerance: number;
  riskTolerance: 'low' | 'medium' | 'high';
  autoRefresh: boolean;
  notifications: boolean;
  darkMode: boolean;
}

export interface WalletInfo {
  address: string;
  balance: number;
  connected: boolean;
  chainId?: number;
}

export interface Alert {
  id: string;
  tokenId: string;
  type: 'price' | 'volume' | 'score';
  condition: 'above' | 'below';
  value: number;
  enabled: boolean;
  createdAt: string;
}

export interface Receipt {
  id: string;
  type: 'entry' | 'exit' | 'alert' | 'analysis';
  tokenSymbol: string;
  tokenName: string;
  timestamp: number;
  data: Record<string, any>;
  aiScore?: number;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: 'risk' | 'liquidity' | 'momentum' | 'custom';
  enabled: boolean;
  conditions: Array<{
    metric: string;
    operator: '>' | '<' | '==' | '>=' | '<=';
    value: number | string;
  }>;
  action: 'block' | 'warn' | 'flag';
}

export interface MarketChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

export interface SimplePriceData {
  [coinId: string]: {
    usd: number;
    usd_24h_vol: number;
    usd_24h_change: number;
    last_updated_at: number;
  };
}
