import { useState, useCallback } from 'react';
import { coinGeckoService, RiskScorer, type RiskAnalysis } from '../services/coingecko';
import { toast } from 'sonner';

type LoadingStep = 'detecting' | 'fetching' | 'analyzing' | null;

/**
 * Custom hook for token analysis workflow
 */
export function useTokenAnalysis() {
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(null);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [detectedToken, setDetectedToken] = useState('');
  const [coinId, setCoinId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const analyzeToken = useCallback(async (query: string) => {
    if (query.length < 2) {
      setRiskAnalysis(null);
      return;
    }

    setLoadingStep('detecting');
    setError(null);

    try {
      // Step 1: Search for token
      const searchResult = await coinGeckoService.searchToken(query);

      if (!searchResult.coins || searchResult.coins.length === 0) {
        toast.error('Token not found - using mock data');
        setLoadingStep(null);
        setError('Token not found');
        return;
      }

      const coin = searchResult.coins[0];
      setDetectedToken(`${coin.name} / $${coin.symbol.toUpperCase()}`);
      setCoinId(coin.id);

      setLoadingStep('fetching');

      // Step 2: Get detailed market data
      const [coinDetail, simplePrice, marketChart] = await Promise.all([
        coinGeckoService.getCoinDetail(coin.id),
        coinGeckoService.getSimplePrice([coin.id]),
        coinGeckoService.getMarketChart(coin.id, 1),
      ]);

      setLoadingStep('analyzing');

      // Step 3: Analyze risk
      const analysis = RiskScorer.analyze(coinDetail, simplePrice, marketChart);
      setRiskAnalysis(analysis);

      // Add slight delay for UX
      setTimeout(() => {
        setLoadingStep(null);
      }, 800);

      return {
        coinId: coin.id,
        detectedToken: `${coin.name} / $${coin.symbol.toUpperCase()}`,
        analysis,
      };
    } catch (err) {
      console.error('Token analysis error:', err);
      toast.error('Analysis failed - check API key');
      setLoadingStep(null);
      setError('Analysis failed');
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setLoadingStep(null);
    setRiskAnalysis(null);
    setDetectedToken('');
    setCoinId('');
    setError(null);
  }, []);

  return {
    loadingStep,
    riskAnalysis,
    detectedToken,
    coinId,
    error,
    isLoading: loadingStep !== null,
    analyzeToken,
    reset,
  };
}
