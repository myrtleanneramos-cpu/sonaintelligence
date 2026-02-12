import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  isOpen: boolean;
  currentStep: 1 | 2 | 3 | 4;
  tokenSymbol: string;
}

const steps = [
  { id: 1, label: "Approve" },
  { id: 2, label: "Sign" },
  { id: 3, label: "Broadcast" },
  { id: 4, label: "Confirmed" },
];

export function LoadingModal({ isOpen, currentStep, tokenSymbol }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mx-5 w-full max-w-md rounded-3xl border p-8"
        style={{
          background: 'rgba(17, 17, 17, 0.25)',
          backdropFilter: 'blur(40px)',
          borderColor: 'rgba(168, 85, 247, 0.3)',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
        }}
      >
        {/* Animated Spinner */}
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div 
              className="h-20 w-20 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #00D4FF 100%)',
                opacity: 0.2,
              }}
            />
            <Loader2 
              className="absolute inset-0 m-auto h-12 w-12 text-[#A855F7]"
              strokeWidth={2.5}
            />
          </motion.div>
        </div>

        {/* Status Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-center text-2xl font-bold text-white"
        >
          Executing Trade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center text-sm text-white/60"
        >
          AI confirming clean entry for {tokenSymbol}...
        </motion.p>

        {/* Progress Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isComplete = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3"
              >
                {/* Step Circle */}
                <motion.div
                  animate={isCurrent ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0px rgba(168, 85, 247, 0.3)',
                      '0 0 20px rgba(168, 85, 247, 0.6)',
                      '0 0 0px rgba(168, 85, 247, 0.3)',
                    ],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                    },
                  } : {}}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all"
                  style={{
                    background: isComplete || isCurrent 
                      ? 'rgba(34, 197, 94, 0.2)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isComplete || isCurrent 
                      ? '#A855F7' 
                      : 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {isComplete ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-4 w-4 text-[#A855F7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <span className={`text-xs font-semibold ${isCurrent ? 'text-[#A855F7]' : 'text-white/40'}`}>
                      {step.id}
                    </span>
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isComplete || isCurrent ? 'text-white' : 'text-white/40'}`}>
                    {step.label}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isComplete ? '100%' : isCurrent ? '50%' : '0%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #A855F7 0%, #00D4FF 100%)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-xs text-white/40"
        >
          This may take a few seconds on Base chain...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}