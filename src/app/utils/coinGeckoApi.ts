// CoinGecko API Integration for SONA Intelligence
// Free API - No API key required for basic endpoints
// Rate limit: 10-50 calls/minute depending on endpoint

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinGeckoToken {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price?: number;
  market_cap?: number;
  market_cap_rank?: number;
  total_volume?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
  circulating_supply?: number;
  total_supply?: number;
  ath?: number;
  atl?: number;
  high_24h?: number;
  low_24h?: number;
}

export interface CoinGeckoMarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface TokenAnalysis {
  survivability: number;
  momentum: string;
  volume: string;
  action: string;
  warnings: string[];
  strengths: string[];
}

// Fetch trending coins
export async function fetchTrendingCoins(): Promise<CoinGeckoToken[]> {
  try {
    const response = await fetch(`${COINGECKO_BASE_URL}/search/trending`);
    if (!response.ok) throw new Error('Failed to fetch trending coins');
    const data = await response.json();
    
    return data.coins.slice(0, 10).map((item: any) => ({
      id: item.item.id,
      symbol: item.item.symbol,
      name: item.item.name,
      image: item.item.thumb,
      market_cap_rank: item.item.market_cap_rank,
      price_change_percentage_24h: item.item.data?.price_change_percentage_24h?.usd || 0,
    }));
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return [];
  }
}

// Fetch top coins by market cap
export async function fetchTopCoins(limit: number = 20): Promise<CoinGeckoToken[]> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h,7d`
    );
    if (!response.ok) throw new Error('Failed to fetch top coins');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return [];
  }
}

// Search for a specific token
export async function searchToken(query: string): Promise<CoinGeckoToken[]> {
  try {
    const response = await fetch(`${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search token');
    const data = await response.json();
    
    return data.coins.slice(0, 5).map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.thumb,
      market_cap_rank: coin.market_cap_rank,
    }));
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return [];
  }
}

// Fetch detailed token data
export async function fetchTokenDetails(tokenId: string): Promise<CoinGeckoToken | null> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${tokenId}?localization=false&tickers=false&community_data=true&developer_data=false&sparkline=false`
    );
    if (!response.ok) throw new Error('Failed to fetch token details');
    const data = await response.json();
    
    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large,
      current_price: data.market_data?.current_price?.usd,
      market_cap: data.market_data?.market_cap?.usd,
      market_cap_rank: data.market_cap_rank,
      total_volume: data.market_data?.total_volume?.usd,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h,
      price_change_percentage_7d: data.market_data?.price_change_percentage_7d,
      circulating_supply: data.market_data?.circulating_supply,
      total_supply: data.market_data?.total_supply,
      ath: data.market_data?.ath?.usd,
      atl: data.market_data?.atl?.usd,
      high_24h: data.market_data?.high_24h?.usd,
      low_24h: data.market_data?.low_24h?.usd,
    };
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return null;
  }
}

// Fetch market chart data
export async function fetchMarketChart(tokenId: string, days: number = 7): Promise<CoinGeckoMarketData | null> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
    );
    if (!response.ok) throw new Error('Failed to fetch market chart');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return null;
  }
}

// Calculate survivability score based on real metrics
export function calculateSurvivability(token: CoinGeckoToken): TokenAnalysis {
  const warnings: string[] = [];
  const strengths: string[] = [];
  let score = 50; // Base score

  // Price change analysis
  const priceChange24h = token.price_change_percentage_24h || 0;
  const priceChange7d = token.price_change_percentage_7d || 0;

  if (priceChange24h > 20) {
    warnings.push('Slippage will hurt.');
    score -= 15;
  } else if (priceChange24h > 10) {
    warnings.push('High volatility detected.');
    score -= 8;
  } else if (priceChange24h > 5) {
    strengths.push('Healthy momentum.');
    score += 5;
  }

  if (priceChange24h < -20) {
    warnings.push('Momentum is dying.');
    score -= 20;
  }

  // Volume analysis
  const volumeToMarketCap = token.total_volume && token.market_cap 
    ? token.total_volume / token.market_cap 
    : 0;

  if (volumeToMarketCap > 0.5) {
    strengths.push('Deep liquidity.');
    score += 15;
  } else if (volumeToMarketCap > 0.2) {
    strengths.push('Strong volume.');
    score += 10;
  } else if (volumeToMarketCap < 0.05) {
    warnings.push('Wash trade barely any.');
    score -= 15;
  }

  // Market cap rank analysis
  if (token.market_cap_rank && token.market_cap_rank <= 50) {
    strengths.push('Top tier asset.');
    score += 15;
  } else if (token.market_cap_rank && token.market_cap_rank <= 200) {
    strengths.push('Established project.');
    score += 10;
  } else if (token.market_cap_rank && token.market_cap_rank > 500) {
    warnings.push('Low market presence.');
    score -= 10;
  }

  // Price stability
  if (token.high_24h && token.low_24h && token.current_price) {
    const range = ((token.high_24h - token.low_24h) / token.current_price) * 100;
    if (range < 5) {
      strengths.push('Stable price action.');
      score += 10;
    } else if (range > 20) {
      warnings.push('Extreme volatility.');
      score -= 10;
    }
  }

  // Cap score between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine momentum and volume descriptors
  let momentum = 'Neutral momentum';
  let volume = 'Moderate volume';
  let action = 'Wait.';

  if (priceChange7d > 15) momentum = 'Building fast';
  else if (priceChange7d > 5) momentum = 'Clean momentum';
  else if (priceChange7d < -15) momentum = 'Losing steam';

  if (volumeToMarketCap > 0.3) volume = 'Deep liquidity';
  else if (volumeToMarketCap > 0.1) volume = 'Strong volume';
  else if (volumeToMarketCap < 0.05) volume = 'Thin liquidity';

  if (score >= 75 && warnings.length === 0) {
    action = 'Enter now';
  } else if (score >= 65) {
    action = 'Cut size in half.';
  } else if (score >= 50) {
    action = 'Wait.';
  } else {
    action = 'Avoid.';
  }

  // Add clean assessment
  if (warnings.length === 0 && score >= 70) {
    strengths.push('This one is clean.');
  }

  return {
    survivability: Math.round(score),
    momentum,
    volume,
    action,
    warnings,
    strengths,
  };
}

// Get high-quality tokens (survivability >= 70)
export async function fetchHighQualityTokens(): Promise<Array<CoinGeckoToken & { analysis: TokenAnalysis }>> {
  const topCoins = await fetchTopCoins(50);
  const analyzed = topCoins.map(token => ({
    ...token,
    analysis: calculateSurvivability(token),
  }));

  return analyzed
    .filter(token => token.analysis.survivability >= 70)
    .slice(0, 5);
}
