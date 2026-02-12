import { useNavigate } from 'react-router';
import { Sparkles, Zap } from 'lucide-react';

export function AppSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] via-[#1a0a2e] to-[#0F0F1A] text-white font-['Inter'] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          
          
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* SONA Intelligence Card */}
          <div
            onClick={() => navigate('/')}
            className="group bg-gradient-to-br from-[#A855F7]/20 to-[#7C3AED]/10 border-2 border-[#A855F7]/40 rounded-2xl p-8 cursor-pointer transition-all hover:border-[#A855F7] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A855F7] to-[#C026D3] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-['Orbitron'] text-2xl font-bold text-[#e2cbff] tracking-wider">
                SONA Intelligence
              </h2>
            </div>

            <p className="mb-6 leading-relaxed font-[Konkhmer_Sleokchher] text-[#ffffff] italic">Pre-trade risk & opportunity guardrail tool for RobinPump.fun. Dark glassmorphism UI with comprehensive market analysis and real-time monitoring.</p>

            <div className="space-y-2 mb-6 bg-[#ffe5e500]">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
                <span className="text-[#496089] text-[#496089] text-[#4b618a] text-[#566c94] text-[#7488ad] text-[#9aabcb] text-[#eef4ff] text-[#fbfdff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Token survivability scoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
                <span className="text-[#5477b6] text-[#5477b6] text-[#5578b6] text-[#5b7cb7] text-[#728ec0] text-[#9eb1d3] text-[#d6ddea] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Trade receipts & forensics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
                <span className="text-[#202a3a] text-[#202a3b] text-[#212a3b] text-[#222c3e] text-[#263144] text-[#323e53] text-[#4a586f] text-[#6c7a93] text-[#8f9db4] text-[#adb9cf] text-[#c4d0e5] text-[#d6e1f6] text-[#e2ecff] text-[#e5eeff] text-[#eaf1ff] text-[#eff4ff] text-[#f3f7ff] text-[#f5f8ff] text-[#f7f9ff] text-[#f9fbff] text-[#fafbff] text-[#fbfcff] text-[#fbfcff] text-[#fcfdff] text-[#fefeff]">Risk control rules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#ffffff00]">
                <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
                <span className="text-[#2c3d5a] text-[#2e3f5d] text-[#324361] text-[#344664] text-[#364867] text-[#394b6a] text-[#3e5070] text-[#445777] text-[#4b5e7e] text-[#566988] text-[#607392] text-[#697b99] text-[#7284a0] text-[#7d8da8] text-[#8a9ab2] text-[#9eaabf] text-[#acb8c9] text-[#bdc5d4] text-[#d6dce4] text-[#eaecf0] text-[#fafafa] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">CoinGecko integration</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#A855F7] font-['Orbitron'] font-semibold">
              <span className="text-[#9d86b3] text-[#9d86b3] text-[#9e87b4] text-[#a28bb7] text-[#ab96bf] text-[#baa7cb] text-[#ccbed9] text-[#e2d9ea] text-[#f8f6fa] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] font-[Numans] font-bold">Launch App</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>

            <div className="mt-4 pt-4 border-t border-[#A855F7]/20">
              
            </div>
          </div>

          {/* SONARI Card */}
          <div
            onClick={() => navigate('/sonari')}
            className="group bg-gradient-to-br from-[#00FF9D]/20 to-[#00D4FF]/10 border-2 border-[#00FF9D]/40 rounded-2xl p-8 cursor-pointer transition-all hover:border-[#00FF9D] hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF9D] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.5)]">
                <Zap className="w-7 h-7 text-black" />
              </div>
              <h2 className="font-['Orbitron'] text-2xl font-bold text-[#e9fff6] tracking-wider">
                SONARI
              </h2>
            </div>

            <p className="mb-6 leading-relaxed text-[#ffffff] font-[Konkhmer_Sleokchher]">
              AI-powered on-chain token scanner and auto-trading vaults for RobinPump.fun. Dark cyberpunk aesthetics with neon green accents and chibi sun mascot.
            </p>

            <div className="space-y-2 mb-6 bg-[#ffffff00]">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#9db1d5] text-[#9db1d5] text-[#9db1d5] text-[#9fb3d6] text-[#b1c1df] text-[#d0dbef] text-[#f2f7ff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Real-time signal detection (ENTER/WAIT/CUT)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#565f6f] text-[#565f70] text-[#576070] text-[#606a7c] text-[#6d788a] text-[#8791a4] text-[#dfe4ef] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Automated trading vaults</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#8f9fbd] text-[#8fa0be] text-[#9eadc9] text-[#b2bed6] text-[#cdd6e7] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Trade risk detection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                <span className="text-[#798394] text-[#7a8495] text-[#7a8495] text-[#7d8899] text-[#8690a1] text-[#939eae] text-[#a9b2c2] text-[#c2cbd9] text-[#dbe2ef] text-[#fcfdff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]">Interactive chibi sun mascot</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#00FF9D] font-['Orbitron'] font-semibold">
              <span className="font-[Numans]">Launch Scanner</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>

            <div className="mt-4 pt-4 border-t border-[#00FF9D]/20">
              
            </div>
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          
          
          
        </div>
      </div>
    </div>
  );
}
