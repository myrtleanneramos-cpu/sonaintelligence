import { ChibiSun } from './ChibiSun';

export function SonariLoading() {
  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white font-['Inter'] flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Chibi Sun Thinking */}
        <ChibiSun mood="thinking" className="mx-auto" />
        
        {/* Loading Spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-[#00D4FF]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#00D4FF] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-[#00FF9D] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="font-['Orbitron'] text-xl font-bold text-[#00D4FF]">
            SCANNING CHAIN
          </h2>
          <p className="text-sm text-gray-400 animate-pulse">
            Analyzing on-chain signals...
          </p>
        </div>
        
        {/* Loading Dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
