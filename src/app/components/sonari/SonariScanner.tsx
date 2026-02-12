import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChibiSun } from './ChibiSun';
import { TrendingUp, TrendingDown, Zap, Shield, Activity, Home, Wallet } from 'lucide-react';

interface MarketToken {
  name: string;
  symbol: string;
  price: string;
  change24h: number;
}

interface CleanToken {
  name: string;
  score: number;
  note: string;
}

export function SonariScanner() {
  const navigate = useNavigate();
  const [tokenInput, setTokenInput] = useState('');
  const [verdict, setVerdict] = useState<'ENTER' | 'WAIT' | 'CUT'>('ENTER');
  const [cleanlinessScore] = useState(85);
  const [reason] = useState('Genuine building pressure');
  
  // Mock wallet balances
  const [walletBalance] = useState('$4,892.45');
  const [usdcBalance] = useState('2,500.00');

  const topTokens: MarketToken[] = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$96,420.12', change24h: 2.34 },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,245.67', change24h: -1.23 },
    { name: 'Tether', symbol: 'USDT', price: '$1.00', change24h: 0.01 },
    { name: 'BNB', symbol: 'BNB', price: '$612.45', change24h: 3.45 },
    { name: 'Solana', symbol: 'SOL', price: '$142.89', change24h: 5.67 },
  ];

  const cleanTokens: CleanToken[] = [
    { name: 'Solana', score: 82, note: 'High liquidity' },
    { name: 'Base Token', score: 78, note: 'Strong momentum' },
    { name: 'Pepe Coin', score: 71, note: 'Organic growth' },
  ];

  const handleTradeClick = () => {
    if (verdict === 'ENTER') {
      navigate('/sonari/trade');
    }
  };

  const handleVaultsClick = () => {
    navigate('/sonari/vaults');
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white font-['Inter'] overflow-auto pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0F0F1A]/90 backdrop-blur-xl border-b border-[#00FF9D]/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-['Konkhmer_Sleokchher'] text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,255,157,0.5)] text-[#ffffff]">
              SONARI
            </h1>
            
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-lg font-['Orbitron'] text-sm font-semibold shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all font-[Nico_Moji]">
            CONNECT
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Chibi Sun Mascot */}
        <div className="flex justify-end">
          <ChibiSun mood={verdict === 'ENTER' ? 'happy' : verdict === 'WAIT' ? 'thinking' : 'worried'} />
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Paste token name, symbol, or address"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="w-full bg-black/60 border border-[#A855F7]/40 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all bg-[#00000000]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Activity className="w-5 h-5 text-[#00D4FF] animate-pulse" />
          </div>
        </div>

        {/* Live Market */}
        <div className="bg-black/60 border border-[#00FF9D]/20 rounded-xl p-4 space-y-3 shadow-[0_0_20px_rgba(0,255,157,0.1)]">
          <h2 className="font-['Orbitron'] text-sm font-semibold text-[#00FF9D] mb-3 font-bold font-[Konkhmer_Sleokchher]">LIVE MARKET / TOP TOKENS</h2>
          {topTokens.map((token, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF9D]/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-['Orbitron']">{token.symbol[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{token.name}</div>
                  <div className="text-xs text-gray-400">{token.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-['Orbitron'] text-sm">{token.price}</div>
                <div className={`text-xs flex items-center gap-1 justify-end ${token.change24h >= 0 ? 'text-[#00FF9D]' : 'text-[#FF3B30]'}`}>
                  {token.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(token.change24h)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Move Verdict */}
        <div className="bg-black/80 border-2 border-[#00FF9D] rounded-2xl p-6 space-y-4 shadow-[0_0_30px_rgba(0,255,157,0.3)]">
          <h2 className="font-['Orbitron'] text-lg font-bold text-center font-[Konkhmer_Sleokchher] text-[#ffffff]">
            NEXT MOVE
          </h2>
          
          <div 
            onClick={handleTradeClick}
            className={`
              relative py-8 px-6 rounded-xl cursor-pointer transition-all
              ${verdict === 'ENTER' ? 'bg-gradient-to-r from-[#00FF9D]/20 to-[#00FF9D]/10 border-2 border-[#00FF9D] shadow-[0_0_25px_rgba(0,255,157,0.5)]' : ''}
              ${verdict === 'WAIT' ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/10 border-2 border-orange-500 shadow-[0_0_25px_rgba(255,165,0,0.5)]' : ''}
              ${verdict === 'CUT' ? 'bg-gradient-to-r from-[#FF3B30]/20 to-[#FF3B30]/10 border-2 border-[#FF3B30] shadow-[0_0_25px_rgba(255,59,48,0.5)]' : ''}
              hover:scale-105
            `}
          >
            <div className="text-center space-y-3">
              <div 
                className={`font-['Orbitron'] text-5xl font-black ${verdict === 'ENTER' ? 'text-[#00FF9D]' : ''} ${verdict === 'WAIT' ? 'text-orange-500' : ''} ${verdict === 'CUT' ? 'text-[#FF3B30]' : ''} font-[Konkhmer_Sleokchher]`}
              >
                {verdict}
              </div>
              <div className="text-2xl font-['Orbitron'] font-semibold">
                {cleanlinessScore}/100
              </div>
              <div className="text-sm text-[#ffffff]">
                {reason}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setVerdict('ENTER')}
              className="flex-1 py-2 bg-[#00FF9D]/20 border border-[#00FF9D] rounded-lg font-['Orbitron'] text-[#00FF9D] hover:bg-[#00FF9D]/30 transition-all font-[Questrial] font-bold"
            >ENTER</button>
            <button
              onClick={() => setVerdict('WAIT')}
              className="flex-1 py-2 bg-orange-500/20 border border-orange-500 rounded-lg font-['Orbitron'] text-orange-500 hover:bg-orange-500/30 transition-all"
            >
              WAIT
            </button>
            <button
              onClick={() => setVerdict('CUT')}
              className="flex-1 py-2 bg-[#FF3B30]/20 border border-[#FF3B30] rounded-lg font-['Orbitron'] text-[#FF3B30] hover:bg-[#FF3B30]/30 transition-all"
            >
              CUT
            </button>
          </div>
        </div>

        {/* Similar Clean Tokens */}
        <div className="bg-black/60 border border-[#00D4FF]/20 rounded-xl p-4 space-y-3 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
          <h2 className="font-['Orbitron'] text-sm font-semibold font-[Konkhmer_Sleokchher] text-[#ffffff]">SIMILAR TOKENS</h2>
          {cleanTokens.map((token, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-black/40 rounded-lg border border-[#00D4FF]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00FF9D] to-[#00D4FF] rounded-full flex items-center justify-center font-['Orbitron'] font-bold text-black text-xs">
                  {token.score}
                </div>
                <div>
                  <div className="font-semibold text-sm">{token.name}</div>
                  <div className="text-xs text-gray-400">{token.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vaults CTA */}
        <button
          onClick={handleVaultsClick}
          className="w-full py-4 bg-gradient-to-r from-[#00D4FF]/20 to-[#0099CC]/20 border-2 border-[#00D4FF] rounded-xl font-['Orbitron'] text-[#00D4FF] font-bold text-lg shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
        >EXPLORE VAULTS</button>

        {/* Bottom Indicators */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/60 border border-[#00FF9D]/30 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-[#00FF9D] mx-auto mb-1" />
            <div className="text-xs text-gray-400">Gas</div>
            <div className="font-['Orbitron'] text-sm text-[#00FF9D]">LOW</div>
          </div>
          <div className="bg-black/60 border border-[#00D4FF]/30 rounded-lg p-3 text-center">
            <Shield className="w-5 h-5 text-[#00D4FF] mx-auto mb-1" />
            <div className="text-xs text-gray-400">Wallet Risk</div>
            <div className="font-['Orbitron'] text-sm text-[#00D4FF]">SAFE</div>
          </div>
          <div className="bg-black/60 border border-[#00FF9D]/30 rounded-lg p-3 text-center">
            <Activity className="w-5 h-5 text-[#00FF9D] mx-auto mb-1" />
            <div className="text-xs text-gray-400">Venue</div>
            <div className="font-['Orbitron'] text-sm text-[#00FF9D]">STABLE</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 space-y-1 pt-4">
          
          
          
          <button
            onClick={() => navigate('/select')}
            className="mt-4 hover:text-[#00D4FF] transition-colors flex items-center gap-1 mx-auto text-[#ffffff]"
          >
            <Home className="w-3 h-3" />
            Switch to SONA Intelligence
          </button>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-[#00FF9D]/20 p-4">
        <div className="max-w-md mx-auto flex justify-around">
          <button className="flex flex-col items-center gap-1">
            <Activity className="w-6 h-6 text-[#00FF9D]" />
            <span className="text-xs font-['Orbitron'] text-[#00FF9D] font-[Konkhmer_Sleokchher]">NOW</span>
          </button>
          <button onClick={handleVaultsClick} className="flex flex-col items-center gap-1">
            <Shield className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-['Orbitron'] text-[#b4ffff] font-[Konkhmer_Sleokchher]">VAULTS</span>
          </button>
        </div>
      </div>
    </div>
  );
}