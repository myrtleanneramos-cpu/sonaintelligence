import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChibiSun } from './ChibiSun';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SonariTrade() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('100');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    // Simulate trade execution
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo
    
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/sonari');
      }, 3000);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white font-['Inter'] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00FF9D]/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/sonari')}
            className="hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-['Konkhmer_Sleokchher'] text-xl font-bold text-[#00FF9D]">
            TRADE EXECUTION
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <ChibiSun mood="thinking" />
        </div>

        {/* Trade Form */}
        <div className="bg-black/80 border-2 border-[#00FF9D] rounded-2xl p-6 space-y-6 shadow-[0_0_30px_rgba(0,255,157,0.3)] mb-6">
          <div className="text-center">
            <h2 className="font-['Konkhmer_Sleokchher'] text-2xl font-bold text-[#00FF9D] mb-2">
              CONFIRM TRADE
            </h2>
            <p className="text-sm text-gray-400">Review details before execution</p>
          </div>

          {/* Token Info */}
          <div className="bg-black/60 rounded-xl p-4 border border-[#00D4FF]/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Token</span>
              <span className="font-['Orbitron'] font-semibold">PUMP/USDC</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Chain</span>
              <span className="font-['Orbitron'] text-[#00D4FF]">BASE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Cleanliness Score</span>
              <span className="font-['Orbitron'] text-[#00FF9D] font-bold">85/100</span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black/60 border border-[#00D4FF]/40 rounded-lg px-4 py-3 text-white text-lg font-['Orbitron'] focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
            />
          </div>

          {/* Expected Output */}
          <div className="bg-gradient-to-r from-[#00FF9D]/10 to-[#00D4FF]/10 rounded-xl p-4 border border-[#00D4FF]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Expected Output</span>
              <span className="font-['Orbitron'] text-lg text-[#00FF9D]">
                {(parseFloat(amount) * 142.5).toFixed(2)} PUMP
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Price Impact</span>
              <span className="font-['Orbitron'] text-sm text-[#00D4FF]">0.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Slippage Tolerance</span>
              <span className="font-['Orbitron'] text-sm text-yellow-400">1.5%</span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300">
              <span className="font-semibold text-yellow-400">Slippage Warning:</span> High volatility detected. Transaction may fail if price moves beyond tolerance.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/sonari')}
              className="py-3 bg-[#FF3B30]/20 border-2 border-[#FF3B30] rounded-xl font-['Orbitron'] text-[#FF3B30] font-bold hover:bg-[#FF3B30]/30 transition-all"
            >
              ABORT
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 bg-gradient-to-r from-[#00FF9D] to-[#00D4AA] rounded-xl font-['Orbitron'] text-black font-bold shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-all flex items-center justify-center gap-2"
            >
              EXECUTE <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="bg-black/60 border border-[#00D4FF]/20 rounded-xl p-4 space-y-3">
          <h3 className="font-['Konkhmer_Sleokchher'] text-sm font-semibold text-[#00D4FF]">
            RISK ANALYSIS
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Liquidity Depth</span>
              <span className="text-[#00FF9D] font-['Orbitron']">✓ GOOD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Wash Trade Check</span>
              <span className="text-[#00FF9D] font-['Orbitron']">✓ CLEAN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Rug Pull Risk</span>
              <span className="text-[#00FF9D] font-['Orbitron']">✓ LOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Contract Security</span>
              <span className="text-[#00FF9D] font-['Orbitron']">✓ VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#00FF9D]/20 to-black/80 border-2 border-[#00FF9D] rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-[0_0_50px_rgba(0,255,157,0.5)] animate-in fade-in zoom-in duration-300">
            <ChibiSun mood="happy" className="mx-auto" />
            <div>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-[#00FF9D] animate-pulse" />
              </div>
              <h2 className="font-['Konkhmer_Sleokchher'] text-2xl font-bold text-[#00FF9D] mb-2">
                CLEAN ENTRY!
              </h2>
              <p className="text-xl font-['Orbitron'] text-white mb-4">
                Hell yeah
              </p>
              <div className="bg-black/60 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Acquired</span>
                  <span className="font-['Orbitron'] text-[#00FF9D]">
                    {(parseFloat(amount) * 142.5).toFixed(2)} PUMP
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Execution Price</span>
                  <span className="font-['Orbitron'] text-white">$0.702</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas Fee</span>
                  <span className="font-['Orbitron'] text-gray-400">0.0003 ETH</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Redirecting to scanner...
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#FF3B30]/20 to-black/80 border-2 border-[#FF3B30] rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-[0_0_50px_rgba(255,59,48,0.5)] animate-in fade-in zoom-in duration-300">
            <ChibiSun mood="worried" className="mx-auto" />
            <div>
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-[#FF3B30] animate-pulse" />
              </div>
              <h2 className="font-['Konkhmer_Sleokchher'] text-2xl font-bold text-[#FF3B30] mb-2">
                HIGH RISK!
              </h2>
              <p className="text-lg text-white mb-4">
                Slippage exceeded
              </p>
              <div className="bg-black/60 rounded-lg p-4 text-sm text-gray-300">
                The price moved significantly during execution. Transaction aborted to protect your funds.
              </div>
            </div>
            <button
              onClick={() => {
                setShowError(false);
                navigate('/sonari');
              }}
              className="w-full py-3 bg-[#FF3B30]/20 border-2 border-[#FF3B30] rounded-xl font-['Orbitron'] text-[#FF3B30] font-bold hover:bg-[#FF3B30]/30 transition-all"
            >
              BACK TO SCANNER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}