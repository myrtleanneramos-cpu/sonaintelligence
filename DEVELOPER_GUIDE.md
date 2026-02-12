# SONA Intelligence - Developer Guide

## 🎯 Overview

SONA Intelligence is a pre-trade risk & opportunity guardrail tool for Base-chain memecoin trading on RobinPump.fun. Built with React, TypeScript, Tailwind CSS v4, and Motion (Framer Motion).

## 🏗️ Architecture

### Core Components

- **SonaNow.tsx** - Main dashboard with live market ticker and token analysis
- **TokenTruth.tsx** - Detailed survivability scoring for individual tokens
- **Receipt.tsx** - Trade receipts and forensic history
- **Rules.tsx** - Risk control rules configuration
- **FixIt.tsx** - Real-time risk monitoring and alerts

### Modal Components

- **LoadingModal.tsx** - 4-step transaction progress (Approve → Sign → Broadcast → Confirmed)
- **SuccessModal.tsx** - Trade confirmation with confetti animation
- **ErrorModal.tsx** - Error handling (5 types: slippage, insufficient, wash-trade, network, rejected)
- **ApiKeyModal.tsx** - CoinGecko API key management

### Services

- **coingecko.ts** - Complete CoinGecko API v3 integration with mock fallback
- **RiskScorer** - Advanced risk analysis algorithm scoring:
  - Liquidity (25% weight)
  - Wash Trade Detection (25% weight)
  - Momentum (20% weight)
  - Slippage (15% weight)
  - Concentration (15% weight)

### Custom Hooks

- **useMarketData** - Auto-refreshing market data (default: 30s interval)
- **useTokenAnalysis** - Token search and risk analysis workflow
- **useTransaction** - Transaction flow state management

### Utilities

- **helpers.ts** - 20+ utility functions for formatting, calculations, validation
- **constants/app.ts** - Application constants and configuration
- **types/index.ts** - TypeScript type definitions

## 🚀 Getting Started

### Prerequisites

```bash
# Install dependencies (already done)
npm install
```

### API Configuration

1. Get a free CoinGecko API key: https://www.coingecko.com/en/api/pricing
2. Click the Settings icon in the app header
3. Enter your API key
4. App will automatically use real data (falls back to mock data without key)

## 📊 Risk Scoring System

### Overall Score (0-100)

- **80-100**: Low Risk (Green) → Recommendation: ENTER
- **60-79**: Moderate Risk (Cyan) → Recommendation: WAIT
- **40-59**: High Risk (Orange) → Recommendation: CUT SIZE
- **0-39**: Very High Risk (Red) → Recommendation: REJECT

### Risk Metrics

1. **Liquidity Score**
   - Market cap tiers: >$1B, >$100M, >$10M
   - Volume tiers: >$100M, >$10M, >$1M
   - Volume/MCap ratio: 0.1-0.5 is healthy

2. **Wash Trade Detection**
   - Analyzes volume volatility patterns
   - High variance without price movement = suspicious
   - Automatically blocks high wash trade tokens

3. **Momentum Score**
   - Positive momentum (10-50%): Healthy
   - >50%: Overheated (caution)
   - <0%: Declining (wait)

4. **Slippage Risk**
   - Volatility + liquidity analysis
   - Low volatility + high volume = safe
   - High volatility + low volume = dangerous

5. **Concentration Risk**
   - Circulating supply / total supply ratio
   - >90%: Low risk
   - <30%: High concentration (risky)

## 🎨 Design System

### Colors

```typescript
PRIMARY: '#22C55E'    // Green - Success, Safe
SECONDARY: '#00D4FF'  // Cyan - Info, Moderate
WARNING: '#F59E0B'    // Orange - Caution
DANGER: '#EF4444'     // Red - Danger, High Risk
CRITICAL: '#DC2626'   // Dark Red - Critical
```

### Glassmorphism Effects

```css
background: rgba(17, 17, 17, 0.3)
backdropFilter: blur(40px)
border: 1px solid rgba(34, 197, 94, 0.3)
boxShadow: 0 8px 16px rgba(0, 0, 0, 0.4)
```

## 🔄 Transaction Flow

1. **User Input** → Token search (name, symbol, or address)
2. **Detection** → CoinGecko API search
3. **Fetching** → Parallel API calls for detailed data
4. **Analysis** → Risk scoring algorithm
5. **Recommendation** → AI-powered action (Enter/Wait/Cut/Reject)
6. **Execute** → 4-step transaction with real-time updates
7. **Confirmation** → Success modal or error handling

## 📱 Responsive Design

- **Mobile**: 390px base (iPhone 14 Pro)
- **Desktop**: Up to 1280px+ with max-width constraint
- All components responsive with `lg:` breakpoints

## 🧪 Testing

### Mock Data

The app works perfectly without an API key using comprehensive mock data:
- Top 5 coins: BTC, ETH, USDT, BNB, SOL
- Sample token: Solana with realistic market data
- Mock transaction outcomes (70% success, 20% slippage, 10% insufficient)

### Error States

Test all 5 error types:
1. **Slippage** - Price moved unfavorably
2. **Insufficient** - Not enough funds
3. **Wash Trade** - High wash trading detected
4. **Network** - Connection failed
5. **Rejected** - User cancelled

## 🛠️ Development Tips

### Using Custom Hooks

```typescript
// Auto-refreshing market data
const { coins, loading, error } = useMarketData(5, 30000);

// Token analysis
const { analyzeToken, riskAnalysis, isLoading } = useTokenAnalysis();

// Transaction flow
const { executeTransaction, showSuccessModal } = useTransaction();
```

### Using Helper Functions

```typescript
import { 
  formatLargeNumber,
  formatPrice,
  getScoreColor,
  shortenAddress,
  calculatePnL 
} from './utils/helpers';

// Format $68,430,000,000 → "$68.43B"
formatLargeNumber(68430000000);

// Format 0.00012345 → "0.00012345"
formatPrice(0.00012345);

// Get color based on score
getScoreColor(85); // Returns "#22C55E" (green)
```

### Adding New Risk Metrics

1. Add to `RiskAnalysis` interface in `types/index.ts`
2. Create scoring function in `RiskScorer` class
3. Update `analyze()` method with new weight
4. Add to UI in `SonaNow.tsx` results section

## 🚦 Navigation

Bottom navigation with 5 tabs:
- **Now** - Home/Market overview
- **Fix** - Risk monitoring
- **Receipt** - Trade history
- **Rules** - Risk controls
- **Save** - Save strategies

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Output directory: dist/
```

## 🎯 Future Enhancements

- [ ] Real wallet connection (WalletConnect, MetaMask)
- [ ] Live Base chain transactions
- [ ] Historical trade analytics
- [ ] Custom rule builder UI
- [ ] Multi-chain support
- [ ] Social sentiment analysis
- [ ] Telegram/Discord alerts
- [ ] Portfolio tracking

## 📝 Code Style

- TypeScript strict mode
- Functional components with hooks
- Tailwind CSS utility classes
- Motion for animations
- ESLint + Prettier (recommended)

## 🐛 Debugging

### Common Issues

1. **API 400 Error**
   - Check API key validity
   - App automatically falls back to mock data
   - No action needed for demo/development

2. **Modal Not Showing**
   - Check state management
   - Verify AnimatePresence wrapper
   - Console log modal open state

3. **Toast Not Appearing**
   - Ensure Toaster component in App.tsx
   - Check sonner import

## 📚 Resources

- [CoinGecko API Docs](https://docs.coingecko.com/reference/introduction)
- [Motion Docs](https://motion.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

## 💡 Best Practices

1. **Always use mock data fallback** for reliability
2. **Validate user input** before API calls
3. **Show loading states** for better UX
4. **Handle errors gracefully** with toast notifications
5. **Use TypeScript** for type safety
6. **Keep components small** and focused
7. **Extract reusable logic** to custom hooks
8. **Test on mobile** (390px width minimum)

## 🎉 Hackathon Tips

- The app is fully functional without any backend
- Mock data provides realistic demo experience
- All animations are smooth and polished
- Error states are handled professionally
- Mobile-first design impresses judges
- Clean code with TypeScript shows quality

---

**Built with ❤️ for RobinPump.fun on Base**
