import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, X } from "lucide-react";
import { toast } from "sonner";
import { coinGeckoService } from "../services/coingecko";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const existingKey = coinGeckoService.getApiKey();
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    coinGeckoService.setApiKey(apiKey.trim());
    toast.success("CoinGecko API key saved!");
    onClose();
  };

  const handleClear = () => {
    setApiKey("");
    localStorage.removeItem('coingecko_api_key');
    toast.info("API key cleared - using mock data");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-5"
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2"
          style={{
            background: 'rgba(17, 17, 17, 0.3)',
            backdropFilter: 'blur(50px)',
            borderColor: '#A855F7',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-[#A855F7]" />
              <h3 className="text-xl lg:text-2xl font-semibold text-[#A855F7]">CoinGecko API Key</h3>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm lg:text-base text-white/80 mb-2">
              Analyst-tier API Key
            </label>
            <input
              type="password"
              placeholder="Enter your CoinGecko API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-base border focus:outline-none focus:border-[#A855F7] transition-all"
              style={{
                background: 'rgba(17, 17, 17, 0.4)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <p className="text-xs text-white/50 mt-2">
              Get your free API key at{' '}
              <a
                href="https://www.coingecko.com/en/api/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A855F7] hover:underline"
              >
                coingecko.com/api
              </a>
            </p>
          </div>

          <div 
            className="mb-6 px-4 py-3 rounded-2xl border"
            style={{
              background: 'rgba(168, 85, 247, 0.1)',
              backdropFilter: 'blur(30px)',
              borderColor: 'rgba(168, 85, 247, 0.3)',
            }}
          >
            <p className="text-xs lg:text-sm text-white/80">
              Without an API key, SONA will use mock data. Add your key for real-time market analysis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleClear}
              className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border transition-all hover:border-white/30"
              style={{
                background: 'rgba(17, 17, 17, 0.4)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              Clear
            </button>
            
            <button 
              onClick={handleSave}
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
    </AnimatePresence>
  );
}