import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";
import { coinGeckoService, RiskScorer, type RiskAnalysis } from "../services/coingecko";

export function TokenTruth() {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState<any>(null);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);

  useEffect(() => {
    if (tokenId) {
      loadTokenData();
    }
  }, [tokenId]);

  const loadTokenData = async () => {
    setLoading(true);
    try {
      const [coinDetail, simplePrice, marketChart] = await Promise.all([
        coinGeckoService.getCoinDetail(tokenId!),
        coinGeckoService.getSimplePrice([tokenId!]),
        coinGeckoService.getMarketChart(tokenId!, 1),
      ]);

      const analysis = RiskScorer.analyze(coinDetail, simplePrice, marketChart);
      
      setTokenData({
        name: `${coinDetail.name} / $${coinDetail.symbol.toUpperCase()}`,
        score: analysis.score,
        checks: [
          { label: "Liquidity", status: analysis.liquidity.status, pass: analysis.liquidity.pass },
          { label: "Wash trade", status: analysis.washTrade.status, pass: analysis.washTrade.pass },
          { label: "Momentum", status: analysis.momentum.status, pass: analysis.momentum.pass },
          { label: "Slippage", status: analysis.slippage.status, pass: analysis.slippage.pass },
          { label: "Concentration", status: analysis.concentration.status, pass: analysis.concentration.pass },
        ],
      });
      setRiskAnalysis(analysis);
    } catch (error) {
      console.error('Failed to load token data:', error);
      toast.error('Failed to load token data');
    } finally {
      setLoading(false);
    }
  };

  const handleEnterProtected = () => {
    if (riskAnalysis && riskAnalysis.recommendation === 'reject') {
      toast.error("Too risky - Entry blocked by SONA");
    } else {
      toast.success("Trade executed with SONA protection - Logged to Receipt");
      setTimeout(() => navigate('/receipt'), 1500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#A855F7]" />
          <p className="text-base lg:text-lg text-white/80">Loading token data...</p>
        </div>
      </div>
    );
  }

  if (!tokenData) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-base lg:text-lg text-white/80">Token not found</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 rounded-3xl border border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7]/10 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="mx-auto max-w-[390px] lg:max-w-7xl min-h-screen pb-24 lg:pb-8">
        {/* Blurred Glass Header */}
        <div 
          className="sticky top-0 z-40 px-5 lg:px-8 py-4 border-b border-white/10"
          style={{
            background: 'rgba(17, 17, 17, 0.25)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <h1 className="text-sm lg:text-base font-semibold">{tokenData.name}</h1>
            <div className="w-6 lg:w-8" />
          </div>
        </div>

        {/* Large Glass Circle Score */}
        <div className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="flex justify-center">
            <div 
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-full flex items-center justify-center border-4"
              style={{
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(50px)',
                borderColor: tokenData.score >= 70 ? '#A855F7' : tokenData.score >= 50 ? '#F97316' : '#EF4444',
                boxShadow: tokenData.score >= 70 
                  ? '0 0 32px rgba(168, 85, 247, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4)' 
                  : tokenData.score >= 50 
                  ? '0 0 32px rgba(249, 115, 22, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4)'
                  : '0 0 32px rgba(239, 68, 68, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="text-center mb-8">
                <div 
                  className="text-6xl lg:text-7xl font-bold mb-2"
                  style={{ 
                    color: tokenData.score >= 70 ? '#A855F7' : tokenData.score >= 50 ? '#F97316' : '#EF4444' 
                  }}
                >
                  {tokenData.score}
                </div>
                <div className="text-sm lg:text-base text-white/60">Survivability</div>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Checklist */}
        <div className="px-5 lg:px-8 mb-8">
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <h3 className="text-lg lg:text-xl font-semibold text-[#A855F7] mb-5">Truth Gates</h3>
            
            <div className="space-y-3">
              {tokenData.checks.map((check: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3.5 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl border"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: check.pass ? 'rgba(168, 85, 247, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 
                      className="w-5 h-5 lg:w-6 lg:h-6" 
                      style={{ color: check.pass ? '#A855F7' : '#EF4444' }}
                    />
                    <span className="text-sm lg:text-base font-medium">{check.label}</span>
                  </div>
                  <span className="text-sm lg:text-base text-white/60">{check.status.charAt(0).toUpperCase() + check.status.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Source */}
        

        {/* Action Button */}
        <div className="px-5 lg:px-8">
          {riskAnalysis && riskAnalysis.recommendation === 'reject' ? (
            <button 
              onClick={handleEnterProtected}
              className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-3xl lg:rounded-[32px] text-base lg:text-lg font-semibold border-2 transition-all"
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                backdropFilter: 'blur(40px)',
                borderColor: '#EF4444',
                boxShadow: '0 0 24px rgba(239, 68, 68, 0.4)',
              }}
            >
              Wait. Too risky.
            </button>
          ) : (
            <button 
              onClick={handleEnterProtected}
              className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-3xl lg:rounded-[32px] text-base lg:text-lg font-semibold border-2 transition-all hover:shadow-[0_0_24px_rgba(34,197,94,0.5)]"
              style={{
                background: 'rgba(168, 85, 247, 0.2)',
                backdropFilter: 'blur(40px)',
                borderColor: '#A855F7',
              }}
            >
              Enter protected.
            </button>
          )}
        </div>

        {/* Tagline */}
        <div className="px-5 lg:px-8 mt-8 text-center">
          <p className="text-xs lg:text-sm text-white/60 mb-1">Know before you click.</p>
          <p className="text-xs text-white/40 italic">No rugs. Just receipts.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}