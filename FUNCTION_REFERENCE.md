# SONA Intelligence - Function Reference Guide

## 📚 Quick Reference for Custom Functions

### 🎨 Formatting Functions

#### `formatLargeNumber(num: number): string`
Formats large numbers with K, M, B suffixes.

```typescript
formatLargeNumber(68430000000) // "$68.43B"
formatLargeNumber(2847392) // "$2.85M"
formatLargeNumber(12500) // "$12.50K"
```

#### `formatPrice(price: number): string`
Smart price formatting based on value.

```typescript
formatPrice(142.5) // "142.50"
formatPrice(0.00012345) // "0.00012345"
formatPrice(0.0000000123) // "0.00000001"
```

#### `formatPercentage(change: number): string`
Formats percentage with +/- prefix.

```typescript
formatPercentage(3.42) // "+3.42%"
formatPercentage(-1.23) // "-1.23%"
```

#### `shortenAddress(address: string, chars = 4): string`
Shortens wallet addresses or tx hashes.

```typescript
shortenAddress("0x1234567890abcdef1234567890abcdef12345678")
// "0x1234...5678"
```

---

### 🎯 Risk Analysis Functions

#### `getScoreColor(score: number): string`
Returns color based on risk score.

```typescript
getScoreColor(85) // "#22C55E" (green)
getScoreColor(65) // "#00D4FF" (cyan)
getScoreColor(45) // "#F59E0B" (orange)
getScoreColor(25) // "#EF4444" (red)
```

#### `getRiskLevel(score: number): string`
Returns risk level text.

```typescript
getRiskLevel(85) // "Low Risk"
getRiskLevel(65) // "Moderate"
getRiskLevel(45) // "High Risk"
getRiskLevel(25) // "Very High Risk"
```

#### `getWashTradeSeverity(status: string)`
Analyzes wash trade status and returns severity.

```typescript
getWashTradeSeverity("high wash trade")
// { level: 'critical', color: '#DC2626', shouldBlock: true }

getWashTradeSeverity("moderate wash trade")
// { level: 'high', color: '#F59E0B', shouldBlock: false }
```

#### `getRecommendation(score: number, washTrade: boolean, lowLiquidity: boolean)`
Determines recommended action.

```typescript
getRecommendation(85, false, false) // "enter"
getRecommendation(65, false, false) // "wait"
getRecommendation(45, false, false) // "cut"
getRecommendation(85, true, false) // "reject" (wash trade blocks entry)
```

---

### 💰 Financial Calculations

#### `calculatePnL(entryPrice: number, currentPrice: number)`
Calculates profit/loss.

```typescript
calculatePnL(100, 120)
// { amount: 20, percentage: 20, isProfit: true }

calculatePnL(100, 85)
// { amount: -15, percentage: -15, isProfit: false }
```

#### `calculateSlippage(tradeAmount: number, liquidity: number, volatility: number): number`
Estimates slippage impact.

```typescript
calculateSlippage(1000, 100000, 0.05) // 1.05% slippage
```

#### `calculatePositionSize(walletBalance: number, riskScore: number, riskTolerance)`
Calculates recommended position size.

```typescript
calculatePositionSize(10000, 80, 'medium')
// 800 (10% of wallet * 80% score adjustment)

calculatePositionSize(10000, 80, 'low')
// 400 (5% of wallet * 80% score adjustment)
```

---

### ✅ Validation Functions

#### `isValidAddress(address: string): boolean`
Validates Ethereum/Base address format.

```typescript
isValidAddress("0x1234567890abcdef1234567890abcdef12345678") // true
isValidAddress("0x123") // false
isValidAddress("invalid") // false
```

#### `isValidSymbol(symbol: string): boolean`
Validates token symbol format (2-5 uppercase letters).

```typescript
isValidSymbol("BTC") // true
isValidSymbol("USDT") // true
isValidSymbol("btc") // false (must be uppercase)
isValidSymbol("TOOLONG") // false (max 5 chars)
```

#### `parseTokenInput(input: string)`
Determines input type (address/symbol/name).

```typescript
parseTokenInput("0x1234...") // { type: 'address', value: '0x1234...' }
parseTokenInput("BTC") // { type: 'symbol', value: 'BTC' }
parseTokenInput("Bitcoin") // { type: 'name', value: 'Bitcoin' }
```

---

### 🕒 Time & Date Functions

#### `getRelativeTime(timestamp: number | string): string`
Converts timestamp to relative time.

```typescript
getRelativeTime(Date.now() - 7200000) // "2h ago"
getRelativeTime(Date.now() - 86400000) // "1d ago"
getRelativeTime(Date.now() - 300000) // "5m ago"
```

---

### 🔗 Utility Functions

#### `generateTxHash(): string`
Generates random transaction hash for testing.

```typescript
generateTxHash()
// "0x3f8a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1"
```

#### `copyToClipboard(text: string): Promise<boolean>`
Copies text to clipboard.

```typescript
await copyToClipboard("0x1234...5678") // true on success
```

#### `getExplorerUrl(txHash: string, type = 'tx'): string`
Generates Base explorer URL.

```typescript
getExplorerUrl("0x123...", "tx")
// "https://basescan.org/tx/0x123..."

getExplorerUrl("0x123...", "address")
// "https://basescan.org/address/0x123..."
```

#### `debounce<T>(func: T, wait: number)`
Debounces function calls.

```typescript
const debouncedSearch = debounce(searchToken, 500);
// Waits 500ms after last call before executing
```

---

### 📊 Data Generation

#### `generateMockTrade(tokenSymbol: string, score: number)`
Generates mock trade data for testing.

```typescript
generateMockTrade("SOL", 85)
// {
//   id: "0x...",
//   tokenSymbol: "SOL",
//   amount: "0.4523",
//   usdValue: "142.50",
//   score: 85,
//   timestamp: 1234567890,
//   status: "active"
// }
```

#### `formatLiquidityStatus(marketCap: number, volume24h: number)`
Formats liquidity status with label and color.

```typescript
formatLiquidityStatus(2000000000, 300000000)
// { label: "Excellent", color: "#22C55E", safe: true }

formatLiquidityStatus(50000000, 3000000)
// { label: "Good", color: "#00D4FF", safe: true }
```

---

### 🎨 UI Helper Functions

#### `getSignalEmoji(signal: string): string`
Returns emoji for risk signal.

```typescript
getSignalEmoji("Slippage will hurt.") // "⚠️"
getSignalEmoji("This one is clean.") // "✅"
getSignalEmoji("Momentum is dying.") // "📉"
```

---

## 🪝 Custom Hooks Reference

### `useMarketData(limit = 5, refreshInterval = 30000)`
Auto-refreshing market data hook.

```typescript
const { coins, loading, error } = useMarketData(5, 30000);

// Returns:
// - coins: MarketCoin[]
// - loading: boolean
// - error: string | null
```

### `useTokenAnalysis()`
Token analysis workflow hook.

```typescript
const {
  loadingStep,      // 'detecting' | 'fetching' | 'analyzing' | null
  riskAnalysis,     // RiskAnalysis | null
  detectedToken,    // string
  coinId,           // string
  error,            // string | null
  isLoading,        // boolean
  analyzeToken,     // (query: string) => Promise<...>
  reset,            // () => void
} = useTokenAnalysis();

// Usage:
await analyzeToken("solana");
```

### `useTransaction()`
Transaction flow management hook.

```typescript
const {
  txStep,               // 1 | 2 | 3 | 4
  showLoadingModal,     // boolean
  showSuccessModal,     // boolean
  showErrorModal,       // boolean
  errorType,            // ErrorType
  executeTransaction,   // (analysis) => Promise<void>
  closeSuccessModal,    // () => void
  closeErrorModal,      // () => void
  retryTransaction,     // (analysis) => void
} = useTransaction();

// Usage:
await executeTransaction(riskAnalysis);
```

---

## 💾 Storage Manager Reference

### API Key Methods

```typescript
import { storage } from './utils/storage';

storage.getApiKey() // string | null
storage.setApiKey("your-key") // boolean
storage.removeApiKey() // boolean
```

### Strategies Methods

```typescript
storage.getStrategies() // Strategy[]
storage.addStrategy({ name: "Venus", notes: "..." }) // boolean
storage.updateStrategy(id, { name: "New Name" }) // boolean
storage.deleteStrategy(id) // boolean
```

### Trades Methods

```typescript
storage.getTrades() // Trade[]
storage.getActiveTrades() // Trade[]
storage.addTrade({ tokenSymbol: "SOL", ... }) // boolean
storage.updateTrade(id, { status: "closed" }) // boolean
storage.deleteTrade(id) // boolean
```

### Settings Methods

```typescript
storage.getSettings() // AppSettings
storage.updateSettings({ slippageTolerance: 1.0 }) // boolean
```

### Data Management

```typescript
storage.exportData() // string (JSON)
storage.importData(jsonString) // boolean
storage.clearAll() // boolean
storage.getStats() // { totalTrades, winRate, ... }
```

---

## 📈 RiskScorer Methods

### Main Analysis

```typescript
import { RiskScorer } from './services/coingecko';

const analysis = RiskScorer.analyze(coinDetail, simplePrice, marketChart);
// Returns: RiskAnalysis
// {
//   score: 85,
//   liquidity: { status: "strong", pass: true, score: 90 },
//   washTrade: { status: "minimal", pass: true, score: 100 },
//   momentum: { status: "healthy", pass: true, score: 90 },
//   slippage: { status: "low", pass: true, score: 80 },
//   concentration: { status: "low", pass: true, score: 90 },
//   signals: ["This one is clean.", ...],
//   recommendation: "enter"
// }
```

---

## 🎯 Usage Examples

### Complete Token Analysis Flow

```typescript
import { useTokenAnalysis } from './hooks/useTokenAnalysis';
import { getScoreColor, getRiskLevel } from './utils/helpers';

function MyComponent() {
  const { analyzeToken, riskAnalysis, isLoading } = useTokenAnalysis();

  const handleAnalyze = async () => {
    const result = await analyzeToken("solana");
    
    if (result) {
      const color = getScoreColor(result.analysis.score);
      const level = getRiskLevel(result.analysis.score);
      console.log(`${level} - Score: ${result.analysis.score}`);
    }
  };

  return <button onClick={handleAnalyze}>Analyze</button>;
}
```

### Transaction with Storage

```typescript
import { useTransaction } from './hooks/useTransaction';
import { storage } from './utils/storage';

function TradeButton({ riskAnalysis }) {
  const { executeTransaction, showSuccessModal } = useTransaction();

  const handleTrade = async () => {
    await executeTransaction(riskAnalysis);
    
    if (showSuccessModal) {
      // Save trade to localStorage
      storage.addTrade({
        tokenSymbol: "SOL",
        tokenName: "Solana",
        amount: "0.5",
        usdValue: "71.25",
        entryPrice: "142.50",
        currentPrice: "142.50",
        score: riskAnalysis.score,
        status: "active"
      });
    }
  };

  return <button onClick={handleTrade}>Trade</button>;
}
```

---

## 🚀 Pro Tips

1. **Always use helpers for formatting** - Consistent UI
2. **Leverage custom hooks** - Reusable logic
3. **Use storage manager** - Persist user data
4. **Validate inputs** - Use validation helpers
5. **Handle errors gracefully** - Toast notifications
6. **Type everything** - Use TypeScript types from `/types`

---

**All functions are production-ready and tested!** 🎉
