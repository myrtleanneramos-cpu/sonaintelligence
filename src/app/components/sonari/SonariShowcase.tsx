import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChibiSun } from './ChibiSun';
import { TrendingUp, TrendingDown, Zap, Shield, Activity, CheckCircle2, AlertTriangle, Home, DollarSign, Users } from 'lucide-react';

export function SonariShowcase() {
  const navigate = useNavigate();
  const [activeFrame, setActiveFrame] = useState<'scanner' | 'trade-success' | 'trade-error' | 'vaults' | 'loading'>('scanner');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] via-[#1a0a2e] to-[#0F0F1A] text-white font-['Inter'] p-4 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="font-['Orbitron'] text-4xl font-bold text-[#00FF9D] drop-shadow-[0_0_20px_rgba(0,255,157,0.5)]">
              SONARI
            </h1>
            <span className="px-3 py-1 text-sm font-['Orbitron'] bg-[#00D4FF]/20 text-[#00D4FF] rounded border border-[#00D4FF]/40">
              BASE CHAIN
            </span>
          </div>
          <p className="text-gray-400 text-lg mb-2">
            AI-Powered On-Chain Token Scanner & Auto-Trading Vaults
          </p>
          <p className="text-sm text-gray-500">
            EasyA Consensus HK 2026 DeFi Track • Myrtle Anne Ramos
          </p>
          <button
            onClick={() => navigate('/select')}
            className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 mx-auto transition-all"
          >
            <Home className="w-4 h-4" />
            Back to App Selector
          </button>
        </div>

        {/* Frame Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFrame('scanner')}
            className={`px-4 py-2 rounded-lg font-['Orbitron'] text-sm transition-all ${
              activeFrame === 'scanner'
                ? 'bg-[#00FF9D] text-black'
                : 'bg-black/60 text-gray-400 border border-[#00FF9D]/20 hover:border-[#00FF9D]/40'
            }`}
          >
            Scanner Dashboard
          </button>
          <button
            onClick={() => setActiveFrame('trade-success')}
            className={`px-4 py-2 rounded-lg font-['Orbitron'] text-sm transition-all ${
              activeFrame === 'trade-success'
                ? 'bg-[#00FF9D] text-black'
                : 'bg-black/60 text-gray-400 border border-[#00FF9D]/20 hover:border-[#00FF9D]/40'
            }`}
          >
            Trade Success
          </button>
          <button
            onClick={() => setActiveFrame('trade-error')}
            className={`px-4 py-2 rounded-lg font-['Orbitron'] text-sm transition-all ${
              activeFrame === 'trade-error'
                ? 'bg-[#FF3B30] text-white'
                : 'bg-black/60 text-gray-400 border border-[#FF3B30]/20 hover:border-[#FF3B30]/40'
            }`}
          >
            Trade Error
          </button>
          <button
            onClick={() => setActiveFrame('vaults')}
            className={`px-4 py-2 rounded-lg font-['Orbitron'] text-sm transition-all ${
              activeFrame === 'vaults'
                ? 'bg-[#00D4FF] text-black'
                : 'bg-black/60 text-gray-400 border border-[#00D4FF]/20 hover:border-[#00D4FF]/40'
            }`}
          >
            Vaults
          </button>
          <button
            onClick={() => setActiveFrame('loading')}
            className={`px-4 py-2 rounded-lg font-['Orbitron'] text-sm transition-all ${
              activeFrame === 'loading'
                ? 'bg-[#00D4FF] text-black'
                : 'bg-black/60 text-gray-400 border border-[#00D4FF]/20 hover:border-[#00D4FF]/40'
            }`}
          >
            Loading State
          </button>
        </div>

        {/* Mobile Frames Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanner Dashboard Frame */}
          {activeFrame === 'scanner' && (
            <div className="bg-[#0F0F1A] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 max-w-md mx-auto w-full">
              <div className="bg-black/90 px-4 py-3 flex items-center justify-between border-b border-[#00FF9D]/20">
                <h3 className="font-['Orbitron'] text-lg font-bold text-[#00FF9D]">SONARI</h3>
                <span className="text-xs text-gray-500">iPhone 16 • 393×852</span>
              </div>
              <div className="p-4 space-y-4 max-h-[700px] overflow-auto">
                <div className="flex justify-end">
                  <ChibiSun mood="happy" className="scale-75" />
                </div>

                <input
                  placeholder="Paste token address..."
                  className="w-full bg-black/60 border border-[#00D4FF]/40 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500"
                />

                <div className="bg-black/60 border border-[#00FF9D]/20 rounded-xl p-3 space-y-2">
                  <h4 className="font-['Orbitron'] text-xs font-semibold text-[#00FF9D]">LIVE MARKET</h4>
                  {[
                    { name: 'Bitcoin', symbol: 'BTC', price: '$96,420', change: 2.34 },
                    { name: 'Ethereum', symbol: 'ETH', price: '$3,245', change: -1.23 },
                  ].map((token, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF9D]/20 rounded-full"></div>
                        <div>
                          <div className="text-xs font-semibold">{token.name}</div>
                          <div className="text-[10px] text-gray-400">{token.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-['Orbitron']">{token.price}</div>
                        <div className={`text-[10px] flex items-center gap-0.5 ${token.change >= 0 ? 'text-[#00FF9D]' : 'text-[#FF3B30]'}`}>
                          {token.change >= 0 ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
                          {Math.abs(token.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-black/80 border-2 border-[#00FF9D] rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                  <h4 className="font-['Orbitron'] text-sm font-bold text-center text-[#00FF9D]">NEXT MOVE</h4>
                  <div className="bg-gradient-to-r from-[#00FF9D]/20 to-[#00FF9D]/10 border-2 border-[#00FF9D] rounded-xl py-6 px-4 text-center">
                    <div className="font-['Orbitron'] text-3xl font-black text-[#00FF9D]">ENTER</div>
                    <div className="text-lg font-['Orbitron'] font-semibold mt-2">85/100</div>
                    <div className="text-xs text-gray-300 mt-1">Genuine building pressure</div>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="flex-1 py-1.5 bg-[#00FF9D]/20 border border-[#00FF9D] rounded text-xs font-['Orbitron'] text-[#00FF9D]">
                      ENTER
                    </button>
                    <button className="flex-1 py-1.5 bg-orange-500/20 border border-orange-500 rounded text-xs font-['Orbitron'] text-orange-500">
                      WAIT
                    </button>
                    <button className="flex-1 py-1.5 bg-[#FF3B30]/20 border border-[#FF3B30] rounded text-xs font-['Orbitron'] text-[#FF3B30]">
                      CUT
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/60 border border-[#00FF9D]/30 rounded-lg p-2 text-center">
                    <Zap className="w-4 h-4 text-[#00FF9D] mx-auto mb-0.5" />
                    <div className="text-[9px] text-gray-400">Gas</div>
                    <div className="font-['Orbitron'] text-[10px] text-[#00FF9D]">LOW</div>
                  </div>
                  <div className="bg-black/60 border border-[#00D4FF]/30 rounded-lg p-2 text-center">
                    <Shield className="w-4 h-4 text-[#00D4FF] mx-auto mb-0.5" />
                    <div className="text-[9px] text-gray-400">Risk</div>
                    <div className="font-['Orbitron'] text-[10px] text-[#00D4FF]">SAFE</div>
                  </div>
                  <div className="bg-black/60 border border-[#00FF9D]/30 rounded-lg p-2 text-center">
                    <Activity className="w-4 h-4 text-[#00FF9D] mx-auto mb-0.5" />
                    <div className="text-[9px] text-gray-400">Venue</div>
                    <div className="font-['Orbitron'] text-[10px] text-[#00FF9D]">STABLE</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trade Success Frame */}
          {activeFrame === 'trade-success' && (
            <div className="bg-[#0F0F1A] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 max-w-md mx-auto w-full">
              <div className="bg-black/90 px-4 py-3 flex items-center justify-between border-b border-[#00FF9D]/20">
                <h3 className="font-['Orbitron'] text-lg font-bold text-[#00FF9D]">Trade Success</h3>
                <span className="text-xs text-gray-500">Popup Modal</span>
              </div>
              <div className="p-8 flex items-center justify-center min-h-[600px]">
                <div className="bg-gradient-to-b from-[#00FF9D]/20 to-black/80 border-2 border-[#00FF9D] rounded-2xl p-8 w-full text-center space-y-6 shadow-[0_0_50px_rgba(0,255,157,0.5)]">
                  <ChibiSun mood="happy" className="mx-auto" />
                  <div>
                    <CheckCircle2 className="w-16 h-16 text-[#00FF9D] mx-auto mb-4 animate-pulse" />
                    <h2 className="font-['Orbitron'] text-2xl font-bold text-[#00FF9D] mb-2">
                      CLEAN ENTRY!
                    </h2>
                    <p className="text-xl font-['Orbitron'] text-white mb-4">
                      Hell yeah
                    </p>
                    <div className="bg-black/60 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Acquired</span>
                        <span className="font-['Orbitron'] text-[#00FF9D]">14,250 PUMP</span>
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
                  <div className="text-xs text-gray-400">Redirecting to scanner...</div>
                </div>
              </div>
            </div>
          )}

          {/* Trade Error Frame */}
          {activeFrame === 'trade-error' && (
            <div className="bg-[#0F0F1A] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 max-w-md mx-auto w-full">
              <div className="bg-black/90 px-4 py-3 flex items-center justify-between border-b border-[#FF3B30]/20">
                <h3 className="font-['Orbitron'] text-lg font-bold text-[#FF3B30]">Trade Error</h3>
                <span className="text-xs text-gray-500">Error Modal</span>
              </div>
              <div className="p-8 flex items-center justify-center min-h-[600px]">
                <div className="bg-gradient-to-b from-[#FF3B30]/20 to-black/80 border-2 border-[#FF3B30] rounded-2xl p-8 w-full text-center space-y-6 shadow-[0_0_50px_rgba(255,59,48,0.5)]">
                  <ChibiSun mood="worried" className="mx-auto" />
                  <div>
                    <AlertTriangle className="w-16 h-16 text-[#FF3B30] mx-auto mb-4 animate-pulse" />
                    <h2 className="font-['Orbitron'] text-2xl font-bold text-[#FF3B30] mb-2">
                      HIGH RISK!
                    </h2>
                    <p className="text-lg text-white mb-4">Slippage exceeded</p>
                    <div className="bg-black/60 rounded-lg p-4 text-sm text-gray-300">
                      The price moved significantly during execution. Transaction aborted to protect your funds.
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#FF3B30]/20 border-2 border-[#FF3B30] rounded-xl font-['Orbitron'] text-[#FF3B30] font-bold">
                    BACK TO SCANNER
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vaults Frame */}
          {activeFrame === 'vaults' && (
            <div className="bg-[#0F0F1A] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 max-w-2xl mx-auto w-full">
              <div className="bg-black/90 px-4 py-3 flex items-center justify-between border-b border-[#00D4FF]/20">
                <h3 className="font-['Orbitron'] text-lg font-bold text-[#00D4FF]">SONARI Vaults</h3>
                <span className="text-xs text-gray-500">Desktop View</span>
              </div>
              <div className="p-4 space-y-4 max-h-[700px] overflow-auto">
                <div className="bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF9D]/10 border-2 border-[#00D4FF] rounded-2xl p-4 flex items-center gap-4">
                  <ChibiSun mood="happy" className="scale-75" />
                  <div className="flex-1">
                    <h4 className="font-['Orbitron'] text-lg font-bold text-[#00D4FF] mb-1">
                      Pooled Auto-Trading
                    </h4>
                    <p className="text-xs text-gray-300">
                      SONARI scans and executes trades on clean signals. Profits shared.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-black/80 border-2 border-[#00FF9D]/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="font-['Orbitron'] font-bold text-sm flex-1">RobinPump Clean Vault</h5>
                      <span className="px-2 py-0.5 rounded text-[9px] font-['Orbitron'] font-semibold bg-[#00FF9D]/20 text-[#00FF9D]">
                        LOW
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/60 rounded-lg p-2 border border-[#00D4FF]/20">
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="w-3 h-3 text-[#00D4FF]" />
                          <span className="text-[9px] text-gray-400">TVL</span>
                        </div>
                        <div className="font-['Orbitron'] text-sm font-bold">$48.2K</div>
                      </div>
                      <div className="bg-black/60 rounded-lg p-2 border border-[#00FF9D]/20">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-[#00FF9D]" />
                          <span className="text-[9px] text-gray-400">APY</span>
                        </div>
                        <div className="font-['Orbitron'] text-sm font-bold text-[#00FF9D]">18.7%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>47 traders</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-lg font-['Orbitron'] font-semibold text-xs shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                      DEPOSIT USDC
                    </button>
                  </div>

                  <div className="bg-black/80 border-2 border-orange-500/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="font-['Orbitron'] font-bold text-sm flex-1">High-Risk Hunter</h5>
                      <span className="px-2 py-0.5 rounded text-[9px] font-['Orbitron'] font-semibold bg-orange-500/20 text-orange-500">
                        HIGH
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/60 rounded-lg p-2 border border-[#00D4FF]/20">
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="w-3 h-3 text-[#00D4FF]" />
                          <span className="text-[9px] text-gray-400">TVL</span>
                        </div>
                        <div className="font-['Orbitron'] text-sm font-bold">$9.8K</div>
                      </div>
                      <div className="bg-black/60 rounded-lg p-2 border border-orange-500/20">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-orange-500" />
                          <span className="text-[9px] text-gray-400">APY</span>
                        </div>
                        <div className="font-['Orbitron'] text-sm font-bold text-orange-500">42.3%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>12 traders</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-lg font-['Orbitron'] font-semibold text-xs shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                      DEPOSIT USDC
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State Frame */}
          {activeFrame === 'loading' && (
            <div className="bg-[#0F0F1A] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 max-w-md mx-auto w-full">
              <div className="bg-black/90 px-4 py-3 flex items-center justify-between border-b border-[#00D4FF]/20">
                <h3 className="font-['Orbitron'] text-lg font-bold text-[#00D4FF]">Loading State</h3>
                <span className="text-xs text-gray-500">Scanning Chain</span>
              </div>
              <div className="p-8 flex items-center justify-center min-h-[600px]">
                <div className="text-center space-y-6">
                  <ChibiSun mood="thinking" className="mx-auto" />
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-[#00D4FF]/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-[#00D4FF] rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-transparent border-t-[#00FF9D] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF]">
                      SCANNING CHAIN
                    </h2>
                    <p className="text-sm text-gray-400 animate-pulse">
                      Analyzing on-chain signals...
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Summary */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="font-['Orbitron'] text-2xl font-bold text-center mb-6 text-[#00D4FF]">
            Complete Feature Set
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/60 border border-[#00FF9D]/20 rounded-xl p-5 text-center">
              <Activity className="w-10 h-10 text-[#00FF9D] mx-auto mb-3" />
              <h3 className="font-['Orbitron'] font-bold mb-2 text-sm">Scanner Dashboard</h3>
              <p className="text-xs text-gray-400">
                Real-time market monitoring with ENTER/WAIT/CUT signals, cleanliness scoring, and live token rankings
              </p>
            </div>
            <div className="bg-black/60 border border-[#00D4FF]/20 rounded-xl p-5 text-center">
              <Zap className="w-10 h-10 text-[#00D4FF] mx-auto mb-3" />
              <h3 className="font-['Orbitron'] font-bold mb-2 text-sm">Trade Execution</h3>
              <p className="text-xs text-gray-400">
                Confirmations with slippage warnings, success/error popups, and risk analysis breakdown
              </p>
            </div>
            <div className="bg-black/60 border border-orange-500/20 rounded-xl p-5 text-center">
              <Shield className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <h3 className="font-['Orbitron'] font-bold mb-2 text-sm">Auto-Trading Vaults</h3>
              <p className="text-xs text-gray-400">
                Pooled funds with automated signal execution, multiple risk tiers, and yield tracking
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-[#00FF9D]/10 to-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ChibiSun mood="happy" className="scale-75" />
              <h3 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF]">
                Chibi Sun Mascot
              </h3>
            </div>
            <p className="text-sm text-gray-300">
              Interactive mascot with 3 moods: <span className="text-[#00FF9D]">Happy</span> on ENTER success, 
              <span className="text-[#00D4FF]"> Thinking</span> during loading, and 
              <span className="text-[#FF3B30]"> Worried</span> on CUT/error states
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/sonari')}
              className="px-8 py-4 bg-gradient-to-r from-[#00FF9D] to-[#00D4FF] rounded-xl font-['Orbitron'] font-bold text-lg text-black shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:shadow-[0_0_50px_rgba(0,255,157,0.6)] transition-all"
            >
              Launch Full SONARI Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
