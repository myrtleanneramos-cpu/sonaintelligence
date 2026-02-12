import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, X, CheckCircle2, Clock, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";
import { LineChart, Line, ResponsiveContainer } from "recharts";

type FixOption = 'sell' | 'hedge' | 'split' | 'ignore' | null;

export function FixIt() {
  const navigate = useNavigate();
  const [selectedFix, setSelectedFix] = useState<FixOption>(null);
  const [executing, setExecuting] = useState(false);

  // Mock chart data showing price dip
  const chartData = [
    { value: 100 },
    { value: 102 },
    { value: 105 },
    { value: 103 },
    { value: 98 },
    { value: 95 },
    { value: 93 },
    { value: 92 },
  ];

  const handleSelectFix = (option: FixOption) => {
    setSelectedFix(option);
    
    if (option === 'ignore') {
      toast.warning("Risk accepted - Override will be logged");
    } else {
      toast.info(`Selected: ${getOptionTitle(option)}`);
    }
  };

  const getOptionTitle = (option: FixOption): string => {
    switch (option) {
      case 'sell': return 'Sell now, limit';
      case 'hedge': return 'Hedge to USDC';
      case 'split': return 'Split order';
      case 'ignore': return 'Ignore & log';
      default: return '';
    }
  };

  const handleExecute = () => {
    if (!selectedFix) {
      toast.error("Please select a resolution option");
      return;
    }

    setExecuting(true);
    
    setTimeout(() => {
      if (selectedFix === 'ignore') {
        toast.success("Override logged to Receipt");
        navigate('/receipt');
      } else {
        toast.success(`Executing ${getOptionTitle(selectedFix)}...`);
        
        setTimeout(() => {
          toast.success("✓ Fix executed successfully!");
          navigate('/');
        }, 1500);
      }
      setExecuting(false);
    }, 1000);
  };

  const handleDoNothing = () => {
    toast.warning("Action skipped - Logged to Receipt");
    setTimeout(() => navigate('/receipt'), 800);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="mx-auto max-w-[390px] min-h-screen pb-32">
        {/* Blurred Glass Top Bar */}
        <div 
          className="sticky top-0 z-40 px-5 py-4 border-b border-white/10"
          style={{
            background: 'rgba(17, 17, 17, 0.25)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')} 
              className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold font-['Konkhmer_Sleokchher']">Fix It</h1>
            <button 
              onClick={() => navigate('/')}
              className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner - Active Issue */}
        <div className="px-5 py-6">
          <motion.div 
            className="rounded-3xl p-6 border-2"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              backdropFilter: 'blur(40px)',
              borderColor: 'rgba(239, 68, 68, 0.6)',
              boxShadow: '0 0 24px rgba(239, 68, 68, 0.4), 0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                <h2 className="text-lg font-semibold text-[#EF4444] font-['Konkhmer_Sleokchher']">Active Issue Detected</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Clock className="w-3.5 h-3.5" />
                <span>3m ago</span>
              </div>
            </div>
            <p className="text-sm text-white/80">Requires immediate action to minimize loss</p>
          </motion.div>
        </div>

        {/* Incident Summary */}
        <div className="px-5 mb-6">
          <motion.div 
            className="rounded-3xl p-6 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-base font-semibold text-[#A855F7] mb-4 font-['Konkhmer_Sleokchher']">Slippage Spike on TOKEN Buy</h3>
            
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Expected slippage</span>
                <span className="font-medium">1.2%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Actual slippage</span>
                <span className="font-semibold text-[#EF4444]">8.7%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Loss so far</span>
                <span className="font-semibold text-[#F97316]">-4.2%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Gas spent</span>
                <span className="font-medium">$0.12</span>
              </div>
            </div>

            {/* Small Chart */}
            <div 
              className="h-20 rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(17, 17, 17, 0.5)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#EF4444" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Risk Explanation */}
        <div className="px-5 mb-6">
          <motion.div 
            className="px-4 py-3 rounded-2xl border"
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              backdropFilter: 'blur(30px)',
              borderColor: 'rgba(249, 115, 22, 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/80">
                High slippage due to low liquidity in current curve stage. Momentum reversed.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Resolution Options */}
        <div className="px-5 space-y-3">
          <motion.h4 
            className="text-sm font-semibold text-white/80 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Resolution Options
          </motion.h4>

          {/* Option 1: Sell now */}
          <motion.button
            onClick={() => handleSelectFix('sell')}
            className="w-full text-left rounded-3xl p-5 border-2 transition-all"
            style={{
              background: selectedFix === 'sell' 
                ? 'rgba(168, 85, 247, 0.25)' 
                : 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              borderColor: selectedFix === 'sell' 
                ? '#A855F7' 
                : 'rgba(168, 85, 247, 0.3)',
              boxShadow: selectedFix === 'sell' 
                ? '0 0 20px rgba(168, 85, 247, 0.5), 0 8px 16px rgba(0, 0, 0, 0.4)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-base font-semibold">Sell now, limit</h5>
              {selectedFix === 'sell' && (
                <CheckCircle2 className="w-5 h-5 text-[#A855F7]" />
              )}
            </div>
            <p className="text-xs text-white/60">Exit at current price + 2% slippage tolerance</p>
          </motion.button>

          {/* Option 2: Hedge to USDC */}
          <motion.button
            onClick={() => handleSelectFix('hedge')}
            className="w-full text-left rounded-3xl p-5 border-2 transition-all"
            style={{
              background: selectedFix === 'hedge' 
                ? 'rgba(168, 85, 247, 0.25)' 
                : 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              borderColor: selectedFix === 'hedge' 
                ? '#A855F7' 
                : 'rgba(168, 85, 247, 0.3)',
              boxShadow: selectedFix === 'hedge' 
                ? '0 0 20px rgba(168, 85, 247, 0.5), 0 8px 16px rgba(0, 0, 0, 0.4)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-base font-semibold">Hedge to USDC</h5>
              {selectedFix === 'hedge' && (
                <CheckCircle2 className="w-5 h-5 text-[#A855F7]" />
              )}
            </div>
            <p className="text-xs text-white/60">Swap 50% to stable, reduce exposure</p>
          </motion.button>

          {/* Option 3: Split order */}
          <motion.button
            onClick={() => handleSelectFix('split')}
            className="w-full text-left rounded-3xl p-5 border-2 transition-all"
            style={{
              background: selectedFix === 'split' 
                ? 'rgba(168, 85, 247, 0.25)' 
                : 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              borderColor: selectedFix === 'split' ? '#A855F7' : 'rgba(255, 255, 255, 0.1)',
              boxShadow: selectedFix === 'split' 
                ? '0 0 20px rgba(168, 85, 247, 0.5), 0 8px 16px rgba(0, 0, 0, 0.4)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-base font-semibold">Split order</h5>
              {selectedFix === 'split' && (
                <CheckCircle2 className="w-5 h-5 text-[#A855F7]" />
              )}
            </div>
            <p className="text-xs text-white/60">Break into 3 smaller buys over next 10 min</p>
          </motion.button>

          {/* Option 4: Ignore & log */}
          <motion.button
            onClick={() => handleSelectFix('ignore')}
            className="w-full text-left rounded-3xl p-5 border-2 transition-all relative"
            style={{
              background: selectedFix === 'ignore' 
                ? 'rgba(239, 68, 68, 0.2)' 
                : 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              borderColor: selectedFix === 'ignore' 
                ? '#EF4444' 
                : 'rgba(255, 255, 255, 0.1)',
              boxShadow: selectedFix === 'ignore' 
                ? '0 0 20px rgba(239, 68, 68, 0.4), 0 8px 16px rgba(0, 0, 0, 0.4)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Ignore & log</h5>
                <span 
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#EF4444',
                  }}
                >
                  Risk accepted
                </span>
              </div>
              {selectedFix === 'ignore' && (
                <CheckCircle2 className="w-5 h-5 text-[#EF4444]" />
              )}
            </div>
            <p className="text-xs text-white/60">Continue, but override logged in Receipt</p>
          </motion.button>
        </div>

        {/* Bottom Action Bar */}
        <div 
          className="fixed bottom-0 left-0 right-0 px-5 py-4 border-t border-white/10 z-40"
          style={{
            background: 'rgba(17, 17, 17, 0.25)',
            backdropFilter: 'blur(40px)',
          }}
        >
          <div className="mx-auto max-w-[390px] space-y-2.5">
            <button
              onClick={handleExecute}
              disabled={!selectedFix || executing}
              className="w-full px-6 py-4 rounded-3xl text-base font-semibold border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: selectedFix 
                  ? 'rgba(168, 85, 247, 0.2)' 
                  : 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(40px)',
                borderColor: selectedFix 
                  ? '#A855F7' 
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: selectedFix 
                  ? '0 0 16px rgba(168, 85, 247, 0.4)' 
                  : 'none',
              }}
            >
              {executing ? 'Executing...' : 'Execute selected fix'}
            </button>
            
            <button
              onClick={handleDoNothing}
              className="w-full px-6 py-3.5 rounded-3xl text-sm font-semibold border transition-all hover:border-white/30"
              style={{
                background: 'rgba(17, 17, 17, 0.4)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              Do nothing (logged)
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className="px-5 pt-6 pb-2 text-center">
          <p className="text-xs text-white/40 italic">No rugs. Just receipts.</p>
        </div>
      </div>

      {/* Executing Overlay */}
      <AnimatePresence>
        {executing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="px-8 py-6 rounded-3xl border-2"
              style={{
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(50px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-t-[#A855F7] border-r-[#A855F7] border-b-transparent border-l-transparent animate-spin" />
                <p className="text-lg font-semibold text-[#A855F7]">Fixing...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}