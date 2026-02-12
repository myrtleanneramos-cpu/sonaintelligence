import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChibiSun } from './ChibiSun';
import { ArrowLeft, TrendingUp, Shield, Zap, DollarSign, Users, Activity } from 'lucide-react';

interface Vault {
  name: string;
  tvl: string;
  apy: string;
  enterSignals: number;
  cutSignals: number;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  maxCap: string;
  activeTraders: number;
}

export function SonariVaults() {
  const navigate = useNavigate();
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const vaults: Vault[] = [
    {
      name: 'RobinPump Clean Vault',
      tvl: '$48.2K',
      apy: '18.7%',
      enterSignals: 3,
      cutSignals: 1,
      description: 'Conservative strategy focusing on high-cleanliness tokens only',
      riskLevel: 'low',
      maxCap: '$100K',
      activeTraders: 47,
    },
    {
      name: 'Momentum Booster Vault',
      tvl: '$22.1K',
      apy: '24.1%',
      enterSignals: 5,
      cutSignals: 0,
      description: 'Targets tokens with strong upward momentum and liquidity',
      riskLevel: 'medium',
      maxCap: '$50K',
      activeTraders: 23,
    },
    {
      name: 'High-Risk Hunter Vault',
      tvl: '$9.8K',
      apy: '42.3%',
      enterSignals: 2,
      cutSignals: 2,
      description: 'Aggressive trading on emerging tokens with high volatility',
      riskLevel: 'high',
      maxCap: '$25K',
      activeTraders: 12,
    },
  ];

  const handleDeposit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedVault(null);
      setDepositAmount('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white font-['Inter'] overflow-auto pb-24">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#00D4FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#00FF9D]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/sonari')}
            className="hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-['Konkhmer_Sleokchher'] text-2xl font-bold text-[#ffffff]">
            SONARI VAULTS
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF9D]/10 border-2 border-[#00D4FF] rounded-2xl p-6 mb-6 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <ChibiSun mood="happy" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-['Konkhmer_Sleokchher'] font-bold mb-2 text-[32px] text-[#ffffff]">
                Pooled Auto-Trading
              </h2>
              <p className="text-gray-300 mb-4 bg-[#ffffff00]"><span className="italic">Deposit once. SONARI scans and executes trades on intelligent signals.</span></p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg">
                  <Shield className="w-4 h-4 text-[#00FF9D]" />
                  <span className="text-sm font-['Konkhmer_Sleokchher']">Automated Risk Management</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg">
                  <Activity className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-sm font-['Konkhmer_Sleokchher']">Real-time Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vaults Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {vaults.map((vault, idx) => (
            <div
              key={idx}
              className={`
                bg-black/80 border-2 rounded-xl p-5 space-y-4 cursor-pointer transition-all
                border-[#A855F7]/40 hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
              `}
              onClick={() => setSelectedVault(vault)}
            >
              {/* Vault Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-['Konkhmer_Sleokchher'] font-bold text-white leading-tight flex-1">
                    {vault.name}
                  </h3>
                  <div className={`px-2 py-1 rounded text-xs font-['Orbitron'] font-semibold ${vault.riskLevel === 'low' ? 'bg-[#00FF9D]/20 text-[#00FF9D]' : ''} ${vault.riskLevel === 'medium' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : ''} ${vault.riskLevel === 'high' ? 'bg-orange-500/20 text-orange-500' : ''} text-[#e0b5ff]`}>
                    {vault.riskLevel.toUpperCase()}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#ccb2ff]">
                  {vault.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/60 rounded-lg p-3 border border-[#A855F7]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-[#00D4FF]" />
                    <span className="text-xs text-gray-400">TVL</span>
                  </div>
                  <div className="font-['Konkhmer_Sleokchher'] text-lg font-bold text-white">
                    {vault.tvl}
                  </div>
                </div>
                <div className="bg-black/60 rounded-lg p-3 border border-[#A855F7]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#00FF9D]" />
                    <span className="text-xs text-gray-400">APY</span>
                  </div>
                  <div className="font-['Konkhmer_Sleokchher'] text-lg font-bold text-[#00FF9D]">
                    {vault.apy}
                  </div>
                </div>
              </div>

              {/* Active Signals */}
              <div className="bg-gradient-to-r from-[#00FF9D]/10 to-[#FF3B30]/10 rounded-lg p-3 border border-[#A855F7]/20">
                <div className="text-xs text-gray-400 mb-2">Active Signals</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00FF9D]/20 rounded-full flex items-center justify-center border border-[#A855F7]">
                      <span className="font-['Orbitron'] text-sm text-[#00FF9D] font-bold">
                        {vault.enterSignals}
                      </span>
                    </div>
                    <span className="text-xs text-[#00FF9D] font-['Orbitron']">ENTER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FF3B30]/20 rounded-full flex items-center justify-center border border-[#A855F7]">
                      <span className="font-['Orbitron'] text-sm text-[#FF3B30] font-bold">
                        {vault.cutSignals}
                      </span>
                    </div>
                    <span className="text-xs text-[#FF3B30] font-['Orbitron']">CUT</span>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{vault.activeTraders} traders</span>
                </div>
                <div className="text-gray-500">
                  Max: {vault.maxCap}
                </div>
              </div>

              {/* Deposit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVault(vault);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-lg font-['Orbitron'] font-semibold text-sm shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all font-[Konkhmer_Sleokchher] text-[#ffffff]"
              >
                DEPOSIT USDC
              </button>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black/60 border border-[#00FF9D]/20 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-[#00FF9D] mx-auto mb-2" />
            <h3 className="font-['Orbitron'] text-sm font-semibold mb-1">Smart Security</h3>
            <p className="text-xs text-gray-400">All trades verified by AI-powered risk analysis</p>
          </div>
          <div className="bg-black/60 border border-[#00D4FF]/20 rounded-xl p-4 text-center">
            <Zap className="w-8 h-8 text-[#00D4FF] mx-auto mb-2" />
            <h3 className="font-['Orbitron'] text-sm font-semibold mb-1">Auto-Compound</h3>
            <p className="text-xs text-gray-400">Profits automatically reinvested for maximum yield</p>
          </div>
          <div className="bg-black/60 border border-orange-500/20 rounded-xl p-4 text-center">
            <Activity className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-['Orbitron'] text-sm font-semibold mb-1">24/7 Monitoring</h3>
            <p className="text-xs text-gray-400">Round-the-clock market scanning and execution</p>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {selectedVault && !showSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#00D4FF]/20 to-black/80 border-2 border-[#00D4FF] rounded-2xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(0,212,255,0.5)] animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF]">
                Deposit to Vault
              </h2>
              <button
                onClick={() => setSelectedVault(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Vault Info */}
              <div className="bg-black/60 rounded-xl p-4 border border-[#00D4FF]/30">
                <h3 className="font-['Orbitron'] font-semibold mb-3">{selectedVault.name}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Current APY</div>
                    <div className="font-['Orbitron'] text-[#00FF9D] font-bold">{selectedVault.apy}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Risk Level</div>
                    <div className={`font-['Orbitron'] font-bold ${
                      selectedVault.riskLevel === 'low' ? 'text-[#00FF9D]' :
                      selectedVault.riskLevel === 'medium' ? 'text-[#00D4FF]' :
                      'text-orange-500'
                    }`}>
                      {selectedVault.riskLevel.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Deposit Amount (USDC)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black/60 border border-[#00D4FF]/40 rounded-lg px-4 py-3 text-white text-lg font-['Orbitron'] focus:outline-none focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setDepositAmount('100')}
                    className="flex-1 py-1.5 bg-black/60 border border-[#00D4FF]/30 rounded text-xs font-['Orbitron'] text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all"
                  >
                    100
                  </button>
                  <button
                    onClick={() => setDepositAmount('500')}
                    className="flex-1 py-1.5 bg-black/60 border border-[#00D4FF]/30 rounded text-xs font-['Orbitron'] text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all"
                  >
                    500
                  </button>
                  <button
                    onClick={() => setDepositAmount('1000')}
                    className="flex-1 py-1.5 bg-black/60 border border-[#00D4FF]/30 rounded text-xs font-['Orbitron'] text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all"
                  >
                    1000
                  </button>
                </div>
              </div>

              {/* Estimated Returns */}
              {depositAmount && parseFloat(depositAmount) > 0 && (
                <div className="bg-gradient-to-r from-[#00FF9D]/10 to-[#00D4FF]/10 rounded-xl p-4 border border-[#00FF9D]/30">
                  <div className="text-xs text-gray-400 mb-2">Estimated Annual Return</div>
                  <div className="font-['Orbitron'] text-2xl font-bold text-[#00FF9D]">
                    ${(parseFloat(depositAmount) * parseFloat(selectedVault.apy) / 100).toFixed(2)}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedVault(null)}
                  className="py-3 bg-black/60 border border-gray-600 rounded-xl font-['Orbitron'] text-gray-400 font-semibold hover:bg-black/80 transition-all"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                  className="py-3 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-xl font-['Orbitron'] text-black font-bold shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#00FF9D]/20 to-black/80 border-2 border-[#00FF9D] rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-[0_0_50px_rgba(0,255,157,0.5)] animate-in fade-in zoom-in duration-300">
            <ChibiSun mood="happy" className="mx-auto" />
            <div>
              <h2 className="font-['Orbitron'] text-2xl font-bold text-[#00FF9D] mb-2">
                YIELD INCOMING!
              </h2>
              <p className="text-white mb-4">
                Successfully deposited to {selectedVault?.name}
              </p>
              <div className="bg-black/60 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-['Orbitron'] text-white">{depositAmount} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Annual Return</span>
                  <span className="font-['Orbitron'] text-[#00FF9D]">
                    ${(parseFloat(depositAmount) * parseFloat(selectedVault?.apy || '0') / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-[#00D4FF]/20 p-4">
        <div className="max-w-md mx-auto flex justify-around">
          <button onClick={() => navigate('/sonari')} className="flex flex-col items-center gap-1">
            <Activity className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-['Orbitron'] text-gray-400">SCANNER</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Shield className="w-6 h-6 text-[#00D4FF]" />
            <span className="text-xs font-['Orbitron'] text-[#00D4FF]">VAULTS</span>
          </button>
        </div>
      </div>
    </div>
  );
}