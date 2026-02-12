import { useState, useEffect } from 'react';
import { coinGeckoService } from '../services/coingecko';

interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank?: number;
  total_volume?: number;
}

/**
 * Custom hook for fetching and auto-refreshing market data
 */
export function useMarketData(limit: number = 5, refreshInterval: number = 30000) {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const markets = await coinGeckoService.getCoinMarkets('usd', limit, 1);
        if (markets && Array.isArray(markets) && markets.length > 0) {
          setCoins(markets);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch market data');
        console.error('Market data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // Auto-refresh
    const interval = setInterval(fetchMarketData, refreshInterval);
    return () => clearInterval(interval);
  }, [limit, refreshInterval]);

  return { coins, loading, error };
}
