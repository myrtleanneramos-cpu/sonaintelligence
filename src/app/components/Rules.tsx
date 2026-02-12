import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, Wallet } from "lucide-react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";

export function Rules() {
  const navigate = useNavigate();
  const [maxPosition, setMaxPosition] = useState(5);
  const [dailyLossLimit, setDailyLossLimit] = useState("500");
  const [strictMode, setStrictMode] = useState(true);
  
  // Mock balance states
  const [walletBalance] = useState('2,458.92');

  const handleMaxPositionChange = (value: number) => {
    setMaxPosition(value);
    toast.info(`Max position updated to ${value}%`);
  };

  const handleDailyLossChange = (value: string) => {
    setDailyLossLimit(value);
  };

  const handleStrictModeToggle = () => {
    const newValue = !strictMode;
    setStrictMode(newValue);
    toast.success(newValue ? "Strict mode enabled - All risky trades require confirmation" : "Strict mode disabled - Manual overrides allowed");
  };

  const handleSaveRules = () => {
    const rules = {
      maxPosition,
      dailyLossLimit,
      strictMode,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('sona_rules', JSON.stringify(rules));
    toast.success("Rules saved successfully!");
  };

  const handleResetToDefault = () => {
    setMaxPosition(5);
    setDailyLossLimit("500");
    setStrictMode(true);
    toast.info("Rules reset to defaults");
  };

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
            <h1 className="text-sm lg:text-base font-semibold font-['Konkhmer_Sleokchher']">Rules</h1>
            <div className="w-6 lg:w-8" />
          </div>
        </div>

        {/* Floating Glass Controls */}
        <div className="px-5 lg:px-8 py-6 space-y-5">
          {/* Max Position Control */}
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <label className="text-base lg:text-lg font-semibold">Max position</label>
              <span className="text-2xl lg:text-3xl font-bold text-[#A855F7]">{maxPosition}%</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="100"
              value={maxPosition}
              onChange={(e) => handleMaxPositionChange(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${maxPosition}%, rgba(255,255,255,0.1) ${maxPosition}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            
            <p className="text-xs lg:text-sm text-white/60 mt-3">Maximum percentage of portfolio per position</p>
          </div>

          {/* Daily Loss Limit */}
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <label className="block text-base lg:text-lg font-semibold mb-4">Daily loss limit</label>
            
            <div className="relative">
              <span className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-lg lg:text-xl text-white/60">$</span>
              <input
                type="text"
                value={dailyLossLimit}
                onChange={(e) => handleDailyLossChange(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full pl-10 lg:pl-12 pr-4 py-3.5 lg:py-4 rounded-2xl lg:rounded-3xl text-base lg:text-lg border focus:outline-none focus:border-[#A855F7] transition-all"
                style={{
                  background: 'rgba(17, 17, 17, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>
            
            <p className="text-xs lg:text-sm text-white/60 mt-3">Trading stops when this limit is reached</p>
          </div>

          {/* Strict Mode Toggle */}
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-base lg:text-lg font-semibold">Strict mode</label>
              
              <button
                onClick={handleStrictModeToggle}
                className="relative w-14 h-8 lg:w-16 lg:h-9 rounded-full transition-all"
                style={{
                  background: strictMode ? '#A855F7' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: strictMode ? '0 0 16px rgba(168, 85, 247, 0.4)' : 'none',
                }}
              >
                <span
                  className="absolute top-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white transition-all"
                  style={{
                    left: strictMode ? 'calc(100% - 28px)' : '4px',
                  }}
                />
              </button>
            </div>
            
            <p className="text-xs lg:text-sm text-white/60">
              {strictMode 
                ? "All risky trades require biometric confirmation" 
                : "Manual overrides allowed without confirmation"}
            </p>
          </div>

          {/* Overrides Logged */}
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border border-white/10"
            style={{
              background: 'rgba(17, 17, 17, 0.3)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            <h3 className="text-base lg:text-lg font-semibold mb-3 font-['Konkhmer_Sleokchher']">Override tracking</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm lg:text-base">
                <span className="text-white/60">Total overrides</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm lg:text-base">
                <span className="text-white/60">This week</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between text-sm lg:text-base">
                <span className="text-white/60">Success rate</span>
                <span className="font-medium text-[#A855F7]">66%</span>
              </div>
            </div>
          </div>

          {/* Glass Warning */}
          <div 
            className="rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(40px)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.3)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 lg:w-6 lg:h-6 text-[#EF4444] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-[#EF4444] mb-2 font-['Konkhmer_Sleokchher']">No exceptions without a trace.</h3>
                <p className="text-sm lg:text-base text-white/80">
                  Every override, every manual trade, every decision is logged forever. SONA remembers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="px-5 lg:px-8 mt-4 text-center">
          <p className="text-xs lg:text-sm text-white/60 mb-1">Know before you click.</p>
          <p className="text-xs text-white/40 italic">No rugs. Just receipts.</p>
          <p className="text-xs text-white/50 mt-2">We're here to make you win, not just probability.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}