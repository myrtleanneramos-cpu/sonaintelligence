import { motion, AnimatePresence } from "motion/react";
import { X, AlertTriangle, RefreshCw, Settings } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorType: 'slippage' | 'insufficient' | 'wash-trade' | 'network' | 'rejected';
  tokenSymbol: string;
  expectedAmount?: string;
  onAdjustSlippage?: () => void;
  onRetry: () => void;
  onAbort: () => void;
}

const errorConfig = {
  slippage: {
    title: 'Slippage Exceeded',
    icon: '⚠️',
    color: '#F59E0B',
    description: (expected: string) => `Expected min ${expected} not met due to price movement.`,
    suggestion: 'Increase slippage tolerance or wait for better conditions.',
  },
  insufficient: {
    title: 'Insufficient Funds',
    icon: '💰',
    color: '#EF4444',
    description: () => 'Wallet balance too low to complete this transaction.',
    suggestion: 'Reduce position size or add funds to wallet.',
  },
  'wash-trade': {
    title: 'Wash Trade Detected',
    icon: '🚨',
    color: '#DC2626',
    description: () => 'AI detected high wash trading activity on this token.',
    suggestion: 'SONA blocked entry for your protection. Review token analysis.',
  },
  network: {
    title: 'Network Error',
    icon: '🌐',
    color: '#F59E0B',
    description: () => 'Failed to broadcast transaction to Base network.',
    suggestion: 'Check your connection and try again.',
  },
  rejected: {
    title: 'Transaction Rejected',
    icon: '🚫',
    color: '#EF4444',
    description: () => 'You cancelled the transaction in your wallet.',
    suggestion: 'Review details and try again when ready.',
  },
};

export function ErrorModal({
  isOpen,
  onClose,
  errorType,
  tokenSymbol,
  expectedAmount,
  onAdjustSlippage,
  onRetry,
  onAbort,
}: ErrorModalProps) {
  if (!isOpen) return null;

  const config = errorConfig[errorType];

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
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md rounded-3xl border overflow-hidden"
          style={{
            background: 'rgba(17, 17, 17, 0.98)',
            backdropFilter: 'blur(40px)',
            borderColor: `${config.color}40`,
            boxShadow: `0 0 40px ${config.color}30`,
          }}
        >
          {/* Red Alert Banner */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="px-6 py-4"
            style={{
              background: `linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%)`,
              borderBottom: `1px solid ${config.color}40`,
            }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: `${config.color}20`,
                  border: `2px solid ${config.color}`,
                }}
              >
                <AlertTriangle className="h-5 w-5" style={{ color: config.color }} />
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold text-white"
                >
                  {config.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-1 text-sm text-white/80"
                >
                  {tokenSymbol}
                </motion.p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 transition-all hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
          </motion.div>

          {/* Body */}
          <div className="p-6">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 text-center text-5xl"
            >
              {config.icon}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4 rounded-2xl border px-4 py-3"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className="mb-2 text-sm text-white/80">
                {config.description(expectedAmount || '')}
              </p>
              <p className="text-xs text-white/60">
                {config.suggestion}
              </p>
            </motion.div>

            {/* Expected Amount (for slippage errors) */}
            {errorType === 'slippage' && expectedAmount && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 rounded-2xl border px-4 py-3"
                style={{
                  background: `${config.color}10`,
                  borderColor: `${config.color}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Expected Min</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {expectedAmount}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {/* Adjust Slippage (only for slippage errors) */}
              {errorType === 'slippage' && onAdjustSlippage && (
                <button
                  onClick={onAdjustSlippage}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    borderColor: 'rgba(245, 158, 11, 0.5)',
                    color: '#F59E0B',
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Adjust Slippage
                </button>
              )}

              {/* Retry Button */}
              <button
                onClick={onRetry}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                style={{
                  background: errorType === 'wash-trade' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : `${config.color}20`,
                  borderColor: errorType === 'wash-trade' 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : `${config.color}60`,
                  color: errorType === 'wash-trade' ? 'white' : config.color,
                }}
              >
                <RefreshCw className="h-4 w-4" />
                {errorType === 'wash-trade' ? 'Review Analysis' : 'Try Again'}
              </button>

              {/* Abort/Cancel */}
              <button
                onClick={onAbort}
                className="w-full rounded-2xl border px-6 py-3 font-medium text-white/60 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white/80"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {errorType === 'wash-trade' ? 'Return to Dashboard' : 'Cancel'}
              </button>
            </motion.div>
          </div>

          {/* Footer Warning */}
          {errorType === 'wash-trade' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="border-t px-6 py-3"
              style={{
                background: 'rgba(220, 38, 38, 0.05)',
                borderColor: 'rgba(220, 38, 38, 0.2)',
              }}
            >
              <p className="text-center text-xs text-white/60">
                🛡️ SONA protection active • Your funds are safe
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
