import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { RiskAnalysis } from '../services/coingecko';

type TxStep = 1 | 2 | 3 | 4;
type ErrorType = 'slippage' | 'insufficient' | 'wash-trade' | 'network' | 'rejected';

interface TransactionState {
  txStep: TxStep;
  showLoadingModal: boolean;
  showSuccessModal: boolean;
  showErrorModal: boolean;
  errorType: ErrorType;
}

/**
 * Custom hook for transaction flow management
 */
export function useTransaction() {
  const [state, setState] = useState<TransactionState>({
    txStep: 1,
    showLoadingModal: false,
    showSuccessModal: false,
    showErrorModal: false,
    errorType: 'network',
  });

  const executeTransaction = useCallback(
    async (riskAnalysis: RiskAnalysis | null) => {
      if (!riskAnalysis) {
        toast.error('No risk analysis available');
        return;
      }

      // Check if wash trade detected
      if (riskAnalysis.washTrade.status.includes('high')) {
        setState((prev) => ({
          ...prev,
          errorType: 'wash-trade',
          showErrorModal: true,
        }));
        return;
      }

      // Check if rejected by SONA
      if (riskAnalysis.recommendation === 'reject') {
        toast.error('Too risky - Entry blocked by SONA');
        setState((prev) => ({
          ...prev,
          errorType: 'wash-trade',
          showErrorModal: true,
        }));
        return;
      }

      // Start transaction flow
      setState((prev) => ({ ...prev, showLoadingModal: true, txStep: 1 }));

      // Step 1: Approve (1s)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState((prev) => ({ ...prev, txStep: 2 }));

      // Step 2: Sign (1s)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState((prev) => ({ ...prev, txStep: 3 }));

      // Step 3: Broadcast (1.5s)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState((prev) => ({ ...prev, txStep: 4 }));

      // Step 4: Confirmed (0.5s)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Randomly show success or error for demo (adjust for production)
      const randomOutcome = Math.random();

      setState((prev) => ({ ...prev, showLoadingModal: false }));

      if (randomOutcome > 0.8) {
        // 20% chance of slippage error
        setState((prev) => ({
          ...prev,
          errorType: 'slippage',
          showErrorModal: true,
        }));
      } else if (randomOutcome > 0.9) {
        // 10% chance of insufficient funds
        setState((prev) => ({
          ...prev,
          errorType: 'insufficient',
          showErrorModal: true,
        }));
      } else {
        // 70% success
        setState((prev) => ({ ...prev, showSuccessModal: true }));
        toast.success('Position opened - AI monitoring active');
      }
    },
    []
  );

  const closeSuccessModal = useCallback(() => {
    setState((prev) => ({ ...prev, showSuccessModal: false }));
  }, []);

  const closeErrorModal = useCallback(() => {
    setState((prev) => ({ ...prev, showErrorModal: false }));
  }, []);

  const retryTransaction = useCallback(
    (riskAnalysis: RiskAnalysis | null) => {
      closeErrorModal();
      setTimeout(() => executeTransaction(riskAnalysis), 300);
    },
    [closeErrorModal, executeTransaction]
  );

  return {
    ...state,
    executeTransaction,
    closeSuccessModal,
    closeErrorModal,
    retryTransaction,
  };
}
