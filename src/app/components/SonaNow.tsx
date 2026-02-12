import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Wallet, Loader2, Settings, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";
import { ApiKeyModal } from "./ApiKeyModal";
import { LoadingModal } from "./LoadingModal";
import { SuccessModal } from "./SuccessModal";
import { ErrorModal } from "./ErrorModal";
import { coinGeckoService, RiskScorer, type RiskAnalysis } from "../services/coingecko";

interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export function SonaNow() {
  const navigate = useNavigate();
  const [tokenAddress, setTokenAddress] = useState("");
  const [loadingStep, setLoadingStep] = useState<"detecting" | "fetching" | "analyzing" | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [detectedToken, setDetectedToken] = useState("");
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [coinId, setCoinId] = useState("");
  const [topCoins, setTopCoins] = useState<MarketCoin[]>([]);
  const [marketLoading, setMarketLoading] = useState(true);
  
  // Mock balance states
  const [walletBalance] = useState('2,458.92');
  const [solBalance] = useState('12.4583');
  const [usdcBalance] = useState('1,250.00');
  
  // Transaction flow states
  const [txStep, setTxStep] = useState<1 | 2 | 3 | 4>(1);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<'slippage' | 'insufficient' | 'wash-trade' | 'network' | 'rejected'>('network');
  const [tradeAmount] = useState('0.46 SOL');
  const [tradeUsdValue] = useState('100.51');
  const [txHash] = useState('3f8a9b2...7d4c1abc');

  // Fetch top 5 coins for live market ticker
  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const markets = await coinGeckoService.getCoinMarkets('usd', 5, 1);
        if (markets && Array.isArray(markets) && markets.length > 0) {
          setTopCoins(markets);
        }
      } catch (error) {
        // Silently fail - mock data will be used
      } finally {
        setMarketLoading(false);
      }
    };

    fetchTopCoins();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTopCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePaste = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTokenAddress(value);
    
    if (value.length > 2) {
      setLoadingStep("detecting");
      setShowResults(false);
      
      try {
        // Step 1: Search for token
        const searchResult = await coinGeckoService.searchToken(value);
        
        if (!searchResult.coins || searchResult.coins.length === 0) {
          toast.error("Token not found - using mock data");
          setLoadingStep(null);
          return;
        }

        const coin = searchResult.coins[0];
        setDetectedToken(`${coin.name} / $${coin.symbol.toUpperCase()}`);
        setCoinId(coin.id);
        
        setLoadingStep("fetching");
        
        // Step 2: Get detailed market data
        const [coinDetail, simplePrice, marketChart] = await Promise.all([
          coinGeckoService.getCoinDetail(coin.id),
          coinGeckoService.getSimplePrice([coin.id]),
          coinGeckoService.getMarketChart(coin.id, 1),
        ]);
        
        setLoadingStep("analyzing");
        
        // Step 3: Analyze risk
        const analysis = RiskScorer.analyze(coinDetail, simplePrice, marketChart);
        setRiskAnalysis(analysis);
        
        setTimeout(() => {
          setLoadingStep(null);
          setShowResults(true);
        }, 1000);
        
      } catch (error) {
        console.error('CoinGecko error:', error);
        toast.error("Analysis failed - check API key");
        setLoadingStep(null);
      }
    }
  };

  const handleWalletConnect = () => {
    toast.success("Wallet connected (mock)");
  };

  const handleWait = () => {
    toast.info("Position on hold - Monitoring conditions");
  };

  const handleCutSize = () => {
    toast.warning("Position size reduced by 50%");
  };

  const handleEnterProtected = async () => {
    if (!riskAnalysis) return;
    
    // Check if wash trade detected
    if (riskAnalysis.washTrade.status.includes('high')) {
      setErrorType('wash-trade');
      setShowErrorModal(true);
      return;
    }
    
    // Check if rejected by SONA
    if (riskAnalysis.recommendation === 'reject') {
      toast.error("Too risky - Entry blocked by SONA");
      setErrorType('wash-trade');
      setShowErrorModal(true);
      return;
    }
    
    // Simulate transaction flow
    setShowLoadingModal(true);
    setTxStep(1);
    
    // Step 1: Approve (1s)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTxStep(2);
    
    // Step 2: Sign (1s)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTxStep(3);
    
    // Step 3: Broadcast (1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTxStep(4);
    
    // Step 4: Confirmed (0.5s)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Randomly show success or error for demo
    const randomOutcome = Math.random();
    
    setShowLoadingModal(false);
    
    if (randomOutcome > 0.8) {
      // 20% chance of slippage error
      setErrorType('slippage');
      setShowErrorModal(true);
    } else if (randomOutcome > 0.9) {
      // 10% chance of insufficient funds
      setErrorType('insufficient');
      setShowErrorModal(true);
    } else {
      // 70% success
      setShowSuccessModal(true);
      toast.success("Position opened - AI monitoring active");
    }
  };

  const handleSellNow = () => {
    toast.success("Limit sell order placed");
  };

  const handleMoveToUSDC = () => {
    toast.success("Converting position to USDC");
  };

  const handleLogAndIgnore = () => {
    toast.info("Risk logged to Receipt");
    setTimeout(() => navigate('/receipt'), 1000);
  };

  const isLoading = loadingStep !== null;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="mx-auto max-w-[390px] lg:max-w-7xl min-h-screen pb-24 lg:pb-8">
        {/* Blurred Glass Top Bar */}
        <div 
          className="sticky top-0 z-40 px-5 lg:px-8 py-4 border-b border-white/10"
          style={{
            background: 'rgba(17, 17, 17, 0.25)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-[16px] font-['Konkhmer_Sleokchher']">SONA Intelligence</h1>
            <div className="flex items-center gap-2 lg:gap-3">
              <button 
                onClick={handleWalletConnect}
                className="flex items-center gap-1.5 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm border border-[#A855F7]/40 bg-[#111111]/40 hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all" 
                style={{ backdropFilter: 'blur(30px)' }}
              >
                <Wallet className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-semibold">{walletBalance}</span>
              </button>
              <span className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm border border-[#A855F7]/40 bg-[#111111]/40" style={{ backdropFilter: 'blur(30px)' }}>
                Base
              </span>
              
            </div>
          </div>
        </div>

        {/* Live Market Ticker - Top 5 Coins */}
        <div className="px-5 lg:px-8 py-4 border-b border-white/10">
          {marketLoading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#A855F7]" />
              <span className="ml-2 text-xs text-white/60">Loading markets...</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-white/80 font-['Konkhmer_Sleokchher']">Live Market • Top 5</h2>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                  <span className="text-[10px] text-white/40">Live</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {topCoins.map((coin) => {
                  const isPositive = coin.price_change_percentage_24h >= 0;
                  return (
                    <motion.button
                      key={coin.id}
                      onClick={() => {
                        setTokenAddress(coin.name);
                        handlePaste({ target: { value: coin.name } } as any);
                      }}
                      className="w-full px-3 py-2 rounded-2xl border transition-all hover:border-[#A855F7]/60 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      style={{
                        background: 'rgba(17, 17, 17, 0.3)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: coin.market_cap_rank ? coin.market_cap_rank * 0.05 : 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-[10px] text-white/40 font-mono w-4">#{coin.market_cap_rank || '?'}</span>
                          <div className="text-left">
                            <div className="text-xs font-semibold">{coin.name}</div>
                            <div className="text-[10px] text-white/40 uppercase">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xs font-semibold">
                              ${coin.current_price >= 1 
                                ? coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : coin.current_price.toFixed(6)}
                            </div>
                            <div className={`text-[10px] font-medium flex items-center justify-end gap-0.5 ${
                              isPositive ? 'text-[#A855F7]' : 'text-[#EF4444]'
                            }`}>
                              {isPositive ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 px-[40px] py-[16px]">
          <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm border border-[#A855F7]/40 bg-[#111111]" style={{ backdropFilter: 'blur(30px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            Gas Low
          </div>
          <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm border border-[#A855F7]/40 bg-[#111111]" style={{ backdropFilter: 'blur(30px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            Wallet Risk Low
          </div>
          <div className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm border border-[#A855F7]/40 bg-[#111111]" style={{ backdropFilter: 'blur(30px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            Venue Stable
          </div>
        </div>

        {/* Banner */}
        <div className="px-5 lg:px-8 mb-6">
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-[#A855F7]/30"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <input
              type="text"
              placeholder="Paste token name, symbol, or address (try 'solana' or 'eth')"
              value={tokenAddress}
              onChange={handlePaste}
              className="w-full bg-transparent border-none text-base lg:text-lg text-white placeholder-white/40 focus:outline-none bg-[#000000]"
            />
          </div>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="px-5 lg:px-8 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div 
                className="rounded-3xl lg:rounded-[32px] p-8 lg:p-10 border border-[#A855F7]/40 text-center"
                style={{
                  background: 'rgba(17, 17, 17, 0.25)',
                  backdropFilter: 'blur(50px)',
                  boxShadow: '0 8px 24px rgba(168, 85, 247, 0.2)',
                }}
              >
                <Loader2 className="w-8 h-8 lg:w-10 lg:h-10 animate-spin mx-auto mb-4 text-[#A855F7]" />
                <p className="text-base lg:text-lg text-white">
                  {loadingStep === "detecting" && "Detecting token…"}
                  {loadingStep === "fetching" && "Fetching CoinGecko data…"}
                  {loadingStep === "analyzing" && "Analyzing risk signals…"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && riskAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-5 lg:px-8 space-y-5"
            >
              {/* Detected Token Name */}
              <div 
                className="rounded-3xl lg:rounded-[32px] px-5 py-3 lg:px-6 lg:py-4 border border-[#A855F7]/40"
                style={{
                  background: 'rgba(17, 17, 17, 0.3)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.2)',
                }}
              >
                <p className="text-sm lg:text-base font-medium text-white text-center">{detectedToken}</p>
                <p className="text-xs text-white/60 text-center mt-1">Score: {riskAnalysis.score}/100</p>
              </div>

              {/* Card 1 – Next Move */}
              <div 
                className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2 border-[#A855F7]"
                style={{
                  background: 'rgba(17, 17, 17, 0.3)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 8px 16px rgba(168, 85, 247, 0.3)',
                }}
              >
                <h3 className="text-lg lg:text-xl font-semibold text-[#A855F7] mb-4 font-['Konkhmer_Sleokchher']">Next Move</h3>
                
                <div className="space-y-2.5 mb-5">
                  {riskAnalysis.signals.map((signal, i) => {
                    const isRed = signal.includes('hurt');
                    const isOrange = signal.includes('barely') || signal.includes('dying');
                    const isGreen = signal.includes('clean');
                    
                    return (
                      <button 
                        key={i}
                        onClick={() => coinId && navigate(`/token/${coinId}`)}
                        className="w-full px-4 py-3 lg:px-5 lg:py-3.5 rounded-2xl lg:rounded-3xl text-sm lg:text-base text-left border transition-all"
                        style={{
                          background: isRed 
                            ? 'rgba(239, 68, 68, 0.1)' 
                            : isOrange 
                            ? 'rgba(249, 115, 22, 0.1)' 
                            : 'rgba(168, 85, 247, 0.15)',
                          backdropFilter: 'blur(30px)',
                          borderColor: isRed 
                            ? 'rgba(239, 68, 68, 0.4)' 
                            : isOrange 
                            ? 'rgba(249, 115, 22, 0.4)' 
                            : 'rgba(168, 85, 247, 0.6)',
                          boxShadow: isRed 
                            ? '0 0 12px rgba(239, 68, 68, 0.3)' 
                            : isOrange 
                            ? '0 0 12px rgba(249, 115, 22, 0.3)' 
                            : '0 0 16px rgba(168, 85, 247, 0.4)',
                        }}
                      >
                        {signal}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button 
                    onClick={handleWait}
                    disabled={riskAnalysis.recommendation === 'enter'}
                    className="px-3 py-3 lg:px-4 lg:py-3.5 rounded-2xl lg:rounded-3xl text-xs lg:text-sm font-semibold border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] disabled:opacity-50"
                    style={{
                      background: 'rgba(17, 17, 17, 0.4)',
                      backdropFilter: 'blur(30px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Wait.
                  </button>
                  <button 
                    onClick={handleCutSize}
                    disabled={riskAnalysis.recommendation === 'enter'}
                    className="px-3 py-3 lg:px-4 lg:py-3.5 rounded-2xl lg:rounded-3xl text-xs lg:text-sm font-semibold border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] disabled:opacity-50"
                    style={{
                      background: 'rgba(17, 17, 17, 0.4)',
                      backdropFilter: 'blur(30px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Cut size
                  </button>
                  <button 
                    onClick={handleEnterProtected}
                    disabled={riskAnalysis.recommendation === 'reject'}
                    className="px-3 py-3 lg:px-4 lg:py-3.5 rounded-2xl lg:rounded-3xl text-xs lg:text-sm font-semibold border disabled:cursor-not-allowed"
                    style={{
                      background: riskAnalysis.recommendation === 'reject' 
                        ? 'rgba(17, 17, 17, 0.2)' 
                        : 'rgba(168, 85, 247, 0.2)',
                      backdropFilter: 'blur(30px)',
                      borderColor: riskAnalysis.recommendation === 'reject' 
                        ? 'rgba(239, 68, 68, 0.3)' 
                        : 'rgba(168, 85, 247, 0.6)',
                      color: riskAnalysis.recommendation === 'reject' 
                        ? 'rgba(255, 255, 255, 0.3)' 
                        : 'white',
                    }}
                  >
                    Enter
                  </button>
                </div>
              </div>

              {/* Card 2 – Fix It */}
              {riskAnalysis.slippage.status === 'spike' && (
                <div 
                  className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
                  style={{
                    background: 'rgba(17, 17, 17, 0.3)',
                    backdropFilter: 'blur(40px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-[#A855F7] mb-4 font-['Konkhmer_Sleokchher']">Fix It</h3>
                  
                  <div 
                    className="px-4 py-3 lg:px-5 lg:py-3.5 rounded-2xl lg:rounded-3xl mb-5 border"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      backdropFilter: 'blur(30px)',
                      borderColor: 'rgba(239, 68, 68, 0.4)',
                      boxShadow: '0 0 12px rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <p className="text-sm lg:text-base">Slippage spike detected.</p>
                  </div>

                  <div className="space-y-2.5">
                    <button 
                      onClick={handleSellNow}
                      className="w-full px-4 py-3 lg:px-5 lg:py-3.5 rounded-2xl lg:rounded-3xl text-sm lg:text-base text-left border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      style={{
                        background: 'rgba(17, 17, 17, 0.4)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      Sell now, limit.
                    </button>
                    
                    <button 
                      onClick={handleMoveToUSDC}
                      className="w-full px-4 py-3 lg:px-5 lg:py-3.5 rounded-2xl lg:rounded-3xl text-sm lg:text-base text-left border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      style={{
                        background: 'rgba(17, 17, 17, 0.4)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      Move to USDC.
                    </button>
                    
                    <button 
                      onClick={handleLogAndIgnore}
                      className="w-full px-4 py-3 lg:px-5 lg:py-3.5 rounded-2xl lg:rounded-3xl text-sm lg:text-base text-left border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      style={{
                        background: 'rgba(17, 17, 17, 0.4)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      Log and ignore.
                    </button>
                  </div>
                </div>
              )}

              {/* Card 3 – Hidden Wins - Show if score is high */}
              {riskAnalysis.score >= 70 && (
                <div 
                  className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
                  style={{
                    background: 'rgba(17, 17, 17, 0.3)',
                    backdropFilter: 'blur(40px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg lg:text-xl font-semibold text-[#A855F7] font-['Konkhmer_Sleokchher']">Similar Clean Tokens</h3>
                    <span 
                      className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm border"
                      style={{
                        background: 'rgba(168, 85, 247, 0.1)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(168, 85, 247, 0.4)',
                        color: '#A855F7',
                      }}
                    >
                      Clean only
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      toast.success(`${detectedToken} meets SONA standards`);
                      if (coinId) navigate(`/token/${coinId}`);
                    }}
                    className="w-full p-4 lg:p-5 rounded-3xl border cursor-pointer transition-all hover:border-[#A855F7]/60 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]"
                    style={{
                      background: 'rgba(17, 17, 17, 0.4)',
                      backdropFilter: 'blur(30px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-base lg:text-lg font-semibold mb-1">{detectedToken.split('/')[0].trim()}</h4>
                        <p className="text-xs lg:text-sm text-white/60">{riskAnalysis.momentum.status} momentum. {riskAnalysis.liquidity.status} liquidity.</p>
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-[#A855F7]">{riskAnalysis.score}</div>
                    </div>
                    <div 
                      className="w-full px-4 py-2.5 lg:px-5 lg:py-3 rounded-2xl lg:rounded-3xl text-sm lg:text-base font-semibold text-center border transition-all"
                      style={{
                        background: 'rgba(168, 85, 247, 0.15)',
                        backdropFilter: 'blur(30px)',
                        borderColor: 'rgba(168, 85, 247, 0.6)',
                      }}
                    >
                      View gates
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <div className="px-5 lg:px-8 mt-8 mb-4 text-center">
          <p className="text-white/60 mb-1 text-[#ffffff] font-[Inter] text-[13px] font-bold">Know before you click.</p>
          <p className="text-white/40 italic text-[#ffffff] font-[Inter] text-[8px]">Just receipts with intelligence.</p>
        </div>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={showApiModal} onClose={() => setShowApiModal(false)} />

      {/* Loading Modal */}
      <LoadingModal 
        isOpen={showLoadingModal} 
        currentStep={txStep} 
        tokenSymbol={detectedToken.split('/')[1]?.trim().replace('$', '') || 'TOKEN'} 
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        tokenSymbol={detectedToken.split('/')[1]?.trim().replace('$', '') || 'TOKEN'}
        tokenName={detectedToken.split('/')[0]?.trim() || 'Token'}
        amount={tradeAmount}
        usdValue={tradeUsdValue}
        txHash={txHash}
        aiScore={riskAnalysis?.score || 85}
        onViewExplorer={() => {
          toast.success("Opening Base explorer...");
          setShowSuccessModal(false);
        }}
        onSetAlerts={() => {
          toast.success("Price alerts activated");
          setShowSuccessModal(false);
        }}
        onBackToDashboard={() => {
          setShowSuccessModal(false);
        }}
        onEnterAnother={() => {
          setShowSuccessModal(false);
          setShowResults(false);
          setTokenAddress('');
        }}
      />

      {/* Error Modal */}
      <ErrorModal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)}
        errorType={errorType}
        tokenSymbol={detectedToken.split('/')[1]?.trim().replace('$', '') || 'TOKEN'}
        expectedAmount="0.6398 SOL"
        onAdjustSlippage={() => {
          toast.info("Slippage adjusted to 2%");
          setShowErrorModal(false);
        }}
        onRetry={() => {
          setShowErrorModal(false);
          if (errorType === 'wash-trade') {
            navigate(`/token/${coinId}`);
          } else {
            handleEnterProtected();
          }
        }}
        onAbort={() => {
          setShowErrorModal(false);
          if (errorType === 'wash-trade') {
            toast.info("Trade cancelled - funds safe");
          }
        }}
      />

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}