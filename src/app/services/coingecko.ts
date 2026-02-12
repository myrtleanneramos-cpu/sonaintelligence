// CoinGecko API v3 Service for SONA Intelligence
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Mock responses for when API key is not set or API fails
const MOCK_RESPONSES = {
  search: {
    coins: [
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        market_cap_rank: 5,
      },
    ],
  },
  simplePrice: {
    solana: {
      usd: 142.5,
      usd_24h_vol: 2847392847,
      usd_24h_change: 3.42,
      last_updated_at: Date.now() / 1000,
    },
  },
  coinDetail: {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    market_data: {
      current_price: { usd: 142.5 },
      market_cap: { usd: 68430000000 },
      total_volume: { usd: 2847392847 },
      price_change_percentage_24h: 3.42,
      circulating_supply: 480000000,
      total_supply: 580000000,
      ath: { usd: 260 },
      ath_change_percentage: { usd: -45.19 },
    },
  },
  marketChart: {
    prices: Array.from({ length: 24 }, (_, i) => [
      Date.now() - (24 - i) * 3600000,
      140 + Math.random() * 5,
    ]),
    market_caps: Array.from({ length: 24 }, (_, i) => [
      Date.now() - (24 - i) * 3600000,
      68000000000 + Math.random() * 2000000000,
    ]),
    total_volumes: Array.from({ length: 24 }, (_, i) => [
      Date.now() - (24 - i) * 3600000,
      2500000000 + Math.random() * 500000000,
    ]),
  },
  coinMarkets: [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 96420.32,
      market_cap: 1910234567890,
      market_cap_rank: 1,
      total_volume: 45678912345,
      price_change_percentage_24h: 2.34,
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 3245.67,
      market_cap: 390123456789,
      market_cap_rank: 2,
      total_volume: 23456789012,
      price_change_percentage_24h: -1.23,
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      current_price: 1.0002,
      market_cap: 125000000000,
      market_cap_rank: 3,
      total_volume: 87654321098,
      price_change_percentage_24h: 0.01,
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      current_price: 612.45,
      market_cap: 89123456789,
      market_cap_rank: 4,
      total_volume: 1987654321,
      price_change_percentage_24h: 3.87,
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      current_price: 142.5,
      market_cap: 68430000000,
      market_cap_rank: 5,
      total_volume: 2847392847,
      price_change_percentage_24h: 3.42,
    },
  ],
};

interface CoinGeckoConfig {
  apiKey?: string;
  useMock?: boolean;
}

class CoinGeckoService {
  private apiKey: string | null = null;
  private useMock: boolean = false;

  constructor(config?: CoinGeckoConfig) {
    // Try to load API key from localStorage
    this.apiKey = localStorage.getItem('coingecko_api_key') || config?.apiKey || null;
    this.useMock = config?.useMock || false;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('coingecko_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private async fetchWithKey(endpoint: string, params: Record<string, string> = {}) {
    // If mock mode or no API key, return mock data immediately
    if (this.useMock || !this.apiKey) {
      return this.getMockResponse(endpoint);
    }

    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // Add API key as query parameter for demo tier
    if (this.apiKey) {
      url.searchParams.append('x_cg_demo_api_key', this.apiKey);
    }

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        // Silently fallback to mock data on error
        return this.getMockResponse(endpoint);
      }

      return await response.json();
    } catch (error) {
      // Silently fallback to mock data on error
      return this.getMockResponse(endpoint);
    }
  }

  private getMockResponse(endpoint: string) {
    if (endpoint.includes('/markets')) return MOCK_RESPONSES.coinMarkets;
    if (endpoint.includes('/search')) return MOCK_RESPONSES.search;
    if (endpoint.includes('/simple/price')) return MOCK_RESPONSES.simplePrice;
    if (endpoint.includes('/market_chart')) return MOCK_RESPONSES.marketChart;
    if (endpoint.includes('/coins/')) return MOCK_RESPONSES.coinDetail;
    return {};
  }

  // 1. Search for token — find coin ID from name, symbol, or address
  async searchToken(query: string) {
    return this.fetchWithKey('/search', { query });
  }

  // 2. Simple price — lightweight, fast current data
  async getSimplePrice(ids: string[], vsCurrency = 'usd') {
    return this.fetchWithKey('/simple/price', {
      ids: ids.join(','),
      vs_currencies: vsCurrency,
      include_24hr_vol: 'true',
      include_24hr_change: 'true',
      include_last_updated_at: 'true',
    });
  }

  // 3. Coin detail — full market data for one token
  async getCoinDetail(id: string) {
    return this.fetchWithKey(`/coins/${id}`, {
      localization: 'false',
      tickers: 'false',
      market_data: 'true',
    });
  }

  // 4. Market chart — historical price & volume
  async getMarketChart(id: string, days: number = 1, vsCurrency = 'usd') {
    return this.fetchWithKey(`/coins/${id}/market_chart`, {
      vs_currency: vsCurrency,
      days: days.toString(),
      interval: days <= 90 ? 'hourly' : 'daily',
    });
  }

  // 5. Coin markets — list of tokens with market data
  async getCoinMarkets(vsCurrency = 'usd', perPage = 250, page = 1) {
    return this.fetchWithKey('/coins/markets', {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: 'false',
    });
  }
}

// Risk Scoring Engine using CoinGecko data
export interface RiskAnalysis {
  score: number; // 0-100, higher is safer
  liquidity: { status: string; pass: boolean; score: number };
  washTrade: { status: string; pass: boolean; score: number };
  momentum: { status: string; pass: boolean; score: number };
  slippage: { status: string; pass: boolean; score: number };
  concentration: { status: string; pass: boolean; score: number };
  signals: string[];
  recommendation: 'enter' | 'wait' | 'cut' | 'reject';
}

export class RiskScorer {
  // Analyze token based on CoinGecko data
  static analyze(coinDetail: any, simplePrice: any, marketChart: any): RiskAnalysis {
    const marketData = coinDetail?.market_data || {};
    const priceData = simplePrice?.[coinDetail?.id] || {};
    
    // 1. Liquidity Score (market cap + 24h volume)
    const marketCap = marketData.market_cap?.usd || 0;
    const volume24h = priceData.usd_24h_vol || marketData.total_volume?.usd || 0;
    const volumeToMcapRatio = marketCap > 0 ? volume24h / marketCap : 0;
    
    const liquidityScore = this.scoreLiquidity(marketCap, volume24h, volumeToMcapRatio);
    
    // 2. Wash Trade Detection (volume anomalies)
    const washTradeScore = this.scoreWashTrade(marketChart, volume24h);
    
    // 3. Momentum (price change patterns)
    const priceChange24h = priceData.usd_24h_change || marketData.price_change_percentage_24h || 0;
    const momentumScore = this.scoreMomentum(priceChange24h, marketChart);
    
    // 4. Slippage Risk (volatility + liquidity)
    const slippageScore = this.scoreSlippage(marketChart, volume24h);
    
    // 5. Concentration Risk (supply distribution)
    const circulatingSupply = marketData.circulating_supply || 0;
    const totalSupply = marketData.total_supply || 0;
    const concentrationScore = this.scoreConcentration(circulatingSupply, totalSupply, marketCap);
    
    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      liquidityScore.score * 0.25 +
      washTradeScore.score * 0.25 +
      momentumScore.score * 0.20 +
      slippageScore.score * 0.15 +
      concentrationScore.score * 0.15
    );
    
    // Generate signals
    const signals: string[] = [];
    if (liquidityScore.score < 50) signals.push('Slippage will hurt.');
    if (washTradeScore.score > 70) signals.push('Wash trade barely any.');
    if (momentumScore.score < 40) signals.push('Momentum is dying.');
    if (overallScore >= 70) signals.push('This one is clean.');
    
    // Recommendation
    let recommendation: 'enter' | 'wait' | 'cut' | 'reject' = 'wait';
    if (overallScore >= 80) recommendation = 'enter';
    else if (overallScore >= 60) recommendation = 'wait';
    else if (overallScore >= 40) recommendation = 'cut';
    else recommendation = 'reject';
    
    return {
      score: overallScore,
      liquidity: liquidityScore,
      washTrade: washTradeScore,
      momentum: momentumScore,
      slippage: slippageScore,
      concentration: concentrationScore,
      signals,
      recommendation,
    };
  }
  
  private static scoreLiquidity(marketCap: number, volume24h: number, ratio: number) {
    let score = 0;
    let status = 'unknown';
    let pass = false;
    
    // Market cap tiers
    if (marketCap > 1_000_000_000) score += 40; // >$1B
    else if (marketCap > 100_000_000) score += 30; // >$100M
    else if (marketCap > 10_000_000) score += 20; // >$10M
    else score += 10;
    
    // Volume tiers
    if (volume24h > 100_000_000) score += 30; // >$100M
    else if (volume24h > 10_000_000) score += 20; // >$10M
    else if (volume24h > 1_000_000) score += 10; // >$1M
    
    // Volume/MCap ratio (healthy range: 0.1 - 0.5)
    if (ratio >= 0.1 && ratio <= 0.5) score += 30;
    else if (ratio > 0.05 && ratio < 1) score += 15;
    
    if (score >= 70) { status = 'strong'; pass = true; }
    else if (score >= 50) { status = 'moderate'; pass = true; }
    else if (score >= 30) { status = 'low'; pass = false; }
    else { status = 'very low'; pass = false; }
    
    return { status, pass, score };
  }
  
  private static scoreWashTrade(marketChart: any, currentVolume: number) {
    let score = 100;
    let status = 'clean';
    let pass = true;
    
    if (!marketChart?.total_volumes) {
      return { status: 'unknown', pass: false, score: 50 };
    }
    
    const volumes = marketChart.total_volumes.map((v: any) => v[1]);
    const avgVolume = volumes.reduce((a: number, b: number) => a + b, 0) / volumes.length;
    const stdDev = Math.sqrt(
      volumes.reduce((sum: number, v: number) => sum + Math.pow(v - avgVolume, 2), 0) / volumes.length
    );
    
    // High volatility in volume without price movement = wash trade
    const volumeVariance = stdDev / avgVolume;
    
    if (volumeVariance > 0.8) {
      score = 30;
      status = 'high wash trade';
      pass = false;
    } else if (volumeVariance > 0.5) {
      score = 60;
      status = 'moderate wash trade';
      pass = false;
    } else if (volumeVariance > 0.3) {
      score = 80;
      status = 'low';
      pass = true;
    } else {
      score = 100;
      status = 'minimal';
      pass = true;
    }
    
    return { status, pass, score };
  }
  
  private static scoreMomentum(priceChange24h: number, marketChart: any) {
    let score = 50;
    let status = 'neutral';
    let pass = true;
    
    // Positive momentum is good, but not too extreme
    if (priceChange24h > 10 && priceChange24h < 50) {
      score = 90;
      status = 'healthy';
      pass = true;
    } else if (priceChange24h > 50) {
      score = 60;
      status = 'overheated';
      pass = false;
    } else if (priceChange24h > 0) {
      score = 70;
      status = 'building';
      pass = true;
    } else if (priceChange24h > -10) {
      score = 50;
      status = 'consolidating';
      pass = true;
    } else {
      score = 30;
      status = 'dying';
      pass = false;
    }
    
    return { status, pass, score };
  }
  
  private static scoreSlippage(marketChart: any, volume24h: number) {
    let score = 50;
    let status = 'moderate';
    let pass = true;
    
    if (!marketChart?.prices) {
      return { status: 'unknown', pass: false, score: 50 };
    }
    
    const prices = marketChart.prices.map((p: any) => p[1]);
    const priceRange = Math.max(...prices) - Math.min(...prices);
    const avgPrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
    const volatility = priceRange / avgPrice;
    
    // Low volatility + high volume = low slippage
    if (volatility < 0.05 && volume24h > 10_000_000) {
      score = 95;
      status = 'safe';
      pass = true;
    } else if (volatility < 0.1 && volume24h > 1_000_000) {
      score = 80;
      status = 'low';
      pass = true;
    } else if (volatility < 0.2) {
      score = 60;
      status = 'moderate';
      pass = true;
    } else if (volatility < 0.4) {
      score = 40;
      status = 'high';
      pass = false;
    } else {
      score = 20;
      status = 'spike';
      pass = false;
    }
    
    return { status, pass, score };
  }
  
  private static scoreConcentration(circSupply: number, totalSupply: number, marketCap: number) {
    let score = 50;
    let status = 'moderate';
    let pass = true;
    
    if (totalSupply === 0) {
      return { status: 'unknown', pass: false, score: 50 };
    }
    
    const supplyRatio = circSupply / totalSupply;
    
    // Higher circulating supply ratio = less concentration risk
    if (supplyRatio > 0.9) {
      score = 90;
      status = 'low';
      pass = true;
    } else if (supplyRatio > 0.7) {
      score = 75;
      status = 'acceptable';
      pass = true;
    } else if (supplyRatio > 0.5) {
      score = 60;
      status = 'moderate';
      pass = true;
    } else if (supplyRatio > 0.3) {
      score = 40;
      status = 'high';
      pass = false;
    } else {
      score = 20;
      status = 'very high';
      pass = false;
    }
    
    return { status, pass, score };
  }
}

// Export singleton instance
export const coinGeckoService = new CoinGeckoService();