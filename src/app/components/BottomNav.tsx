import { useNavigate, useLocation } from "react-router";
import { Activity, Wrench, FileText, Shield, Save } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface BottomNavProps {
  onSaveStrategy?: () => void;
}

export function BottomNav({ onSaveStrategy }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const [strategyNotes, setStrategyNotes] = useState("");

  const isActive = (path: string) => location.pathname === path;

  const handleSaveStrategy = () => {
    if (!strategyName.trim()) {
      toast.error("Please enter a strategy name");
      return;
    }

    // Save to localStorage
    const strategies = JSON.parse(localStorage.getItem("sona_strategies") || "[]");
    const newStrategy = {
      id: Date.now().toString(),
      name: strategyName,
      notes: strategyNotes,
      createdAt: new Date().toISOString(),
    };
    strategies.push(newStrategy);
    localStorage.setItem("sona_strategies", JSON.stringify(strategies));

    toast.success(`Strategy "${strategyName}" saved!`);
    setShowSaveModal(false);
    setStrategyName("");
    setStrategyNotes("");

    if (onSaveStrategy) {
      onSaveStrategy();
    }
  };

  const handleFixClick = () => {
    navigate('/fix-it');
  };

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 border-t border-white/10 z-50"
        style={{
          background: 'rgba(17, 17, 17, 0.25)',
          backdropFilter: 'blur(40px)',
        }}
      >
        <div className="mx-auto max-w-[390px] lg:max-w-7xl px-5 lg:px-8 py-3 lg:py-4 flex items-center justify-center gap-x-8">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div 
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2"
              style={isActive('/') ? {
                background: 'rgba(168, 85, 247, 0.2)',
                backdropFilter: 'blur(30px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.5)',
              } : {
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Activity className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive('/') ? 'text-[#A855F7]' : 'text-white/60'}`} />
            </div>
            <span className={`text-[10px] lg:text-xs ${isActive('/') ? 'text-[#A855F7]' : 'text-white/40'}`}>Now</span>
          </button>
          
          <button 
            onClick={handleFixClick}
            className="flex flex-col items-center gap-1 transition-all hover:opacity-80"
          >
            <div 
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border"
              style={{
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Wrench className="w-5 h-5 lg:w-6 lg:h-6 text-white/60" />
            </div>
            <span className="text-[10px] lg:text-xs text-white/40">Fix</span>
          </button>
          
          <button 
            onClick={() => navigate('/receipt')} 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div 
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2"
              style={isActive('/receipt') ? {
                background: 'rgba(168, 85, 247, 0.2)',
                backdropFilter: 'blur(30px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.5)',
              } : {
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <FileText className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive('/receipt') ? 'text-[#A855F7]' : 'text-white/60'}`} />
            </div>
            <span className={`text-[10px] lg:text-xs ${isActive('/receipt') ? 'text-[#A855F7]' : 'text-white/40'}`}>Receipt</span>
          </button>
          
          <button 
            onClick={() => navigate('/rules')} 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div 
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2"
              style={isActive('/rules') ? {
                background: 'rgba(168, 85, 247, 0.2)',
                backdropFilter: 'blur(30px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.5)',
              } : {
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Shield className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive('/rules') ? 'text-[#A855F7]' : 'text-white/60'}`} />
            </div>
            <span className={`text-[10px] lg:text-xs ${isActive('/rules') ? 'text-[#A855F7]' : 'text-white/40'}`}>Rules</span>
          </button>
          
          <button 
            onClick={() => setShowSaveModal(true)}
            className="flex flex-col items-center gap-1 transition-all hover:opacity-80"
          >
            
            
          </button>
        </div>
      </div>

      {/* Save Strategy Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2"
              style={{
                background: 'rgba(17, 17, 17, 0.25)',
                backdropFilter: 'blur(50px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-[#A855F7] mb-6">Save Strategy</h3>
              
              <div className="mb-4">
                <label className="block text-sm lg:text-base text-white/80 mb-2">Strategy name</label>
                <input
                  type="text"
                  placeholder="e.g. Venus Momentum"
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                  className="w-full px-4 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-base border focus:outline-none focus:border-[#A855F7] transition-all"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm lg:text-base text-white/80 mb-2">Description / notes</label>
                <textarea
                  placeholder="Add notes about your strategy..."
                  value={strategyNotes}
                  onChange={(e) => setStrategyNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-base border focus:outline-none focus:border-[#A855F7] transition-all resize-none"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border transition-all hover:border-white/30"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Cancel
                </button>
                
                <button 
                  onClick={handleSaveStrategy}
                  className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border-2 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  style={{
                    background: 'rgba(168, 85, 247, 0.2)',
                    backdropFilter: 'blur(40px)',
                    borderColor: '#A855F7',
                  }}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}