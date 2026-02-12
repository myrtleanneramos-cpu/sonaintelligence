import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Bell, Home, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenSymbol: string;
  tokenName: string;
  amount: string;
  usdValue: string;
  txHash: string;
  aiScore: number;
  onViewExplorer: () => void;
  onSetAlerts: () => void;
  onBackToDashboard: () => void;
  onEnterAnother: () => void;
}

export function SuccessModal({
  isOpen,
  onClose,
  tokenSymbol,
  tokenName,
  amount,
  usdValue,
  txHash,
  aiScore,
  onViewExplorer,
  onSetAlerts,
  onBackToDashboard,
  onEnterAnother,
}: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [pnl] = useState((Math.random() * 10 - 2).toFixed(2)); // Mock PnL

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-5"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  opacity: 0,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeIn",
                  delay: Math.random() * 0.5,
                }}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#A855F7' : i % 3 === 1 ? '#00D4FF' : '#FFFFFF',
                  left: Math.random() * 100 + '%',
                }}
              />
            ))}
          </div>
        )}

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative w-full max-w-lg rounded-3xl border p-8"
          style={{
            background: 'rgba(17, 17, 17, 0.98)',
            backdropFilter: 'blur(40px)',
            borderColor: 'rgba(34, 197, 94, 0.4)',
            boxShadow: '0 0 60px rgba(34, 197, 94, 0.3), 0 0 100px rgba(0, 255, 157, 0.1)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 transition-all hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>

          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.8, bounce: 0.5 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              border: '3px solid #A855F7',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
            }}
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="#A855F7"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-center text-3xl font-bold text-white lg:text-4xl"
          >
            Entry Confirmed!
          </motion.h2>

          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-center"
          >
            <p className="mb-1 text-base text-white/80">
              Bought <span className="font-semibold text-white">{amount}</span> of{' '}
              <span className="font-semibold text-[#A855F7]">{tokenSymbol}</span>
            </p>
            <p className="text-sm text-white/60">at ${usdValue}</p>
          </motion.div>

          {/* Transaction Hash */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 rounded-2xl border px-4 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="mb-1 text-xs text-white/40">Transaction</p>
                <p className="font-mono text-sm text-white/80">{txHash}</p>
              </div>
              <button
                onClick={onViewExplorer}
                className="ml-3 rounded-full p-2 transition-all hover:bg-white/10"
                title="View on Explorer"
              >
                <ExternalLink className="h-4 w-4 text-[#A855F7]" />
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 grid grid-cols-3 gap-3"
          >
            {/* Position Size */}
            <div
              className="rounded-2xl border p-3"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className="mb-1 text-xs text-white/40">Position</p>
              <p className="text-sm font-semibold text-white">{amount}</p>
              <p className="text-xs text-white/60">${usdValue}</p>
            </div>

            {/* Current PnL */}
            <div
              className="rounded-2xl border p-3"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className="mb-1 text-xs text-white/40">PnL</p>
              <p className={`text-sm font-semibold ${parseFloat(pnl) >= 0 ? 'text-[#A855F7]' : 'text-[#EF4444]'}`}>
                {parseFloat(pnl) >= 0 ? '+' : ''}${pnl}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp className={`h-3 w-3 ${parseFloat(pnl) >= 0 ? 'text-[#A855F7]' : 'text-[#EF4444] rotate-180'}`} />
                <p className="text-xs text-white/60">{parseFloat(pnl) >= 0 ? '+' : ''}{(parseFloat(pnl) / parseFloat(usdValue) * 100).toFixed(2)}%</p>
              </div>
            </div>

            {/* AI Score */}
            <div
              className="rounded-2xl border p-3"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                borderColor: 'rgba(34, 197, 94, 0.3)',
              }}
            >
              <p className="mb-1 text-xs text-white/40">AI Score</p>
              <p className="text-2xl font-bold text-[#A855F7]">{aiScore}</p>
              <p className="text-xs text-white/60">Clean</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            {/* Primary: View on Explorer */}
            <button
              onClick={onViewExplorer}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                borderColor: 'rgba(34, 197, 94, 0.6)',
                color: '#A855F7',
              }}
            >
              <ExternalLink className="h-4 w-4" />
              View on Explorer
            </button>

            {/* Secondary Actions Grid */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={onSetAlerts}
                className="flex flex-col items-center gap-1 rounded-2xl border px-3 py-3 text-xs font-medium transition-all hover:border-[#A855F7]/60"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Bell className="h-4 w-4 text-white/60" />
                <span className="text-white/80">Alerts</span>
              </button>
              <button
                onClick={onBackToDashboard}
                className="flex flex-col items-center gap-1 rounded-2xl border px-3 py-3 text-xs font-medium transition-all hover:border-[#A855F7]/60"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Home className="h-4 w-4 text-white/60" />
                <span className="text-white/80">Home</span>
              </button>
              <button
                onClick={onEnterAnother}
                className="flex flex-col items-center gap-1 rounded-2xl border px-3 py-3 text-xs font-medium transition-all hover:border-[#A855F7]/60"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <TrendingUp className="h-4 w-4 text-white/60" />
                <span className="text-white/80">Enter</span>
              </button>
            </div>
          </motion.div>

          {/* Auto-dismiss hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center text-xs text-white/30"
          >
            AI monitoring active • Position tracked
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}