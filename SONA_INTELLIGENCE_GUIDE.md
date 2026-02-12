# SONA Intelligence - Complete Prototype Guide

## 🎯 Overview

**SONA Intelligence** is a pre-trade risk & opportunity guardrail tool for RobinPump.fun (Base-chain bonding-curve memecoin launcher). The app features vibrant neon green (#22C55E) accents, deep black gradient backgrounds (#0F0F0F), floating glassmorphism cards, and comprehensive CoinGecko API integration.

**Taglines:**
- "Know before you click."
- "No rugs. Just receipts."

---

## 📱 Screens & Features

### 1. **SONA Now** (Home/Market Overview)
**Route:** `/`

**Features:**
- ✅ **Token Search:** Paste token name, symbol, or address
- ✅ **Real CoinGecko API:** Live market data with mock fallback
- ✅ **Risk Analysis:** 5-factor scoring (Liquidity, Wash Trade, Momentum, Slippage, Concentration)
- ✅ **Smart Recommendations:** Dynamic signals based on real data
- ✅ **Action Buttons:**
  - Wait (hold position)
  - Cut size (reduce by 50%)
  - Enter protected (execute with SONA protection)
- ✅ **Wallet Connect:** Mock wallet connection
- ✅ **API Settings:** Configure CoinGecko API key

**Try It:**
```
Type "solana" or "ethereum" → See real-time analysis
```

---

### 2. **Token Truth** (Survivability Scoring)
**Route:** `/token/:tokenId`

**Features:**
- ✅ **Large Circle Score:** Visual 0-100 survivability rating
- ✅ **Truth Gates Checklist:** 5 risk factors with pass/fail
- ✅ **Color-Coded Results:**
  - Green (70+): Clean, safe to enter
  - Orange (50-69): Moderate risk
  - Red (<50): High risk, blocked
- ✅ **Dynamic Button:** "Enter protected" or "Wait. Too risky"
- ✅ **Live API Data:** Real CoinGecko metrics

**Data Source:**
- CoinGecko `/simple/price` + `/market_chart`

---

### 3. **Fix It** (Real-Time Risk Resolution)
**Route:** `/fix-it`

**Features:**
- ✅ **Active Issue Detection:** Red banner with timer
- ✅ **Incident Summary:**
  - Expected vs Actual slippage
  - Loss tracking
  - Gas cost
  - Price chart (Recharts)
- ✅ **4 Resolution Options:**
  1. **Sell now, limit** - Exit with 2% slippage tolerance
  2. **Hedge to USDC** - Swap 50% to stable
  3. **Split order** - Break into 3 smaller buys
  4. **Ignore & log** - Accept risk, log to Receipt
- ✅ **Selection System:** Tap to select, checkmark indicator, neon glow
- ✅ **Execute Button:** Animated execution with success toast
- ✅ **Do Nothing:** Skip and log to Receipt

**Navigation:**
- Accessible from bottom nav "Fix" button
- Back arrow returns to SONA Now

---

### 4. **Receipt** (Trade Forensics)
**Route:** `/receipt`

**Features:**
- ✅ **Trade Timeline:** All past trades with details
- ✅ **Evidence Tiles:** Copyable hash, snapshot, log
- ✅ **Trade Details:**
  - Intent (buy/sell)
  - SONA score
  - Action taken
  - Result (+/- %)
- ✅ **Full Analysis:** Per-trade deep dive
- ✅ **Export Modal:** Download PDF (mock)
- ✅ **Save Strategy:** Save current strategy to localStorage

**Mock Trades:**
- #042: Buy TOKEN (Override, +9%)
- #041: Buy CLEAN1 (Protected, +4%)
- #040: Buy RISKY2 (Rejected, N/A)

---

### 5. **Rules** (Risk Controls)
**Route:** `/rules`

**Features:**
- ✅ **Max Position Slider:** 1-100%, live toast feedback
- ✅ **Daily Loss Limit:** $ input with validation
- ✅ **Strict Mode Toggle:** 
  - ON: All risky trades require biometric
  - OFF: Manual overrides allowed
- ✅ **Override Tracking:**
  - Total overrides: 3
  - This week: 1
  - Success rate: 66%
- ✅ **Warning Card:** "No exceptions without a trace"

---

## 🔧 Technical Stack

### Core Technologies
- **React** 18.3.1
- **React Router** 7.13.0 (Data mode)
- **Tailwind CSS** 4.1.12
- **Motion** 12.23.24 (Framer Motion successor)
- **Sonner** 2.0.3 (Toast notifications)
- **Recharts** 2.15.2 (Charts)
- **Lucide React** 0.487.0 (Icons)

### API Integration
- **CoinGecko API v3** with 5 priority endpoints:
  1. `/search` - Token discovery
  2. `/simple/price` - Fast current data
  3. `/coins/{id}` - Full market data
  4. `/coins/{id}/market_chart` - Historical price/volume
  5. `/coins/markets` - Token lists

---

## 📊 Risk Scoring Formula

### Overall Score (0-100)
```
Score = Liquidity(25%) + WashTrade(25%) + Momentum(20%) + Slippage(15%) + Concentration(15%)
```

### 1. Liquidity Score (25%)
- **Market Cap Tiers:**
  - >$1B: 40 points
  - >$100M: 30 points
  - >$10M: 20 points
- **Volume Tiers:**
  - >$100M: 30 points
  - >$10M: 20 points
  - >$1M: 10 points
- **Volume/MCap Ratio:**
  - 0.1-0.5: 30 points (healthy)
  - 0.05-1.0: 15 points

### 2. Wash Trade Detection (25%)
- **Volume Variance Analysis:**
  - <0.3: 100 points (minimal)
  - 0.3-0.5: 80 points (low)
  - 0.5-0.8: 60 points (moderate)
  - >0.8: 30 points (high)

### 3. Momentum Score (20%)
- **24h Price Change:**
  - +10% to +50%: 90 points (healthy)
  - +50%+: 60 points (overheated)
  - 0% to +10%: 70 points (building)
  - -10% to 0%: 50 points (consolidating)
  - <-10%: 30 points (dying)

### 4. Slippage Risk (15%)
- **Volatility + Volume:**
  - <5% vol, >$10M vol: 95 points (safe)
  - <10% vol, >$1M vol: 80 points (low)
  - <20% vol: 60 points (moderate)
  - <40% vol: 40 points (high)
  - >40% vol: 20 points (spike)

### 5. Concentration Risk (15%)
- **Circulating/Total Supply Ratio:**
  - >90%: 90 points (low)
  - >70%: 75 points (acceptable)
  - >50%: 60 points (moderate)
  - >30%: 40 points (high)
  - <30%: 20 points (very high)

---

## 🎨 Design System

### Colors
- **Background:** `#0F0F0F`
- **Cards:** `#111111` with 25-30% opacity
- **Primary Accent:** `#22C55E` (neon green)
- **Success:** `#22C55E`
- **Warning:** `#F97316` (orange)
- **Error:** `#EF4444` (red)

### Glassmorphism Style
```css
background: rgba(17, 17, 17, 0.3);
backdrop-filter: blur(40px);
border: 1px solid rgba(34, 197, 94, 0.3);
border-radius: 24px;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
```

### Hover/Tap Effects
```css
hover:border-[#22C55E]
hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]
transition-all duration-300
```

### Typography
- **Font:** Inter (imported via Google Fonts)
- **Mobile:** 12-16px base
- **Desktop:** 14-18px base
- **Headings:** 18-32px

---

## 💾 Data Persistence

### localStorage Keys
1. **`coingecko_api_key`** - CoinGecko Analyst API key
2. **`sona_strategies`** - Array of saved strategies

### Strategy Object
```json
{
  "id": "1707654321000",
  "name": "Venus Momentum",
  "notes": "High momentum tokens only",
  "createdAt": "2026-02-11T12:30:00.000Z"
}
```

---

## 🔄 User Flows

### Flow 1: Search & Analyze Token
1. Open SONA Now (/)
2. Click ⚙️ Settings → Enter CoinGecko API key (optional)
3. Type "solana" in search
4. See loading states: "Detecting token..." → "Fetching CoinGecko..." → "Analyzing..."
5. View results: Score, signals, gates
6. Click "View gates" → Navigate to Token Truth
7. See detailed 5-factor analysis
8. Tap "Enter protected" → Navigate to Receipt

### Flow 2: Fix Active Issue
1. Tap "Fix" in bottom nav
2. See active issue: "Slippage Spike on TOKEN Buy"
3. Review incident details + chart
4. Tap "Sell now, limit" (checkmark appears, green glow)
5. Tap "Execute selected fix"
6. See "Fixing..." overlay → "✓ Fix executed successfully!"
7. Auto-navigate back to SONA Now

### Flow 3: Save Strategy
1. From any screen, tap "Save" in bottom nav
2. Enter strategy name: "Venus Momentum"
3. Add notes: "High momentum tokens only"
4. Tap "Save"
5. Toast: "Strategy 'Venus Momentum' saved!"
6. View in Receipt screen

### Flow 4: Review Trade History
1. Tap "Receipt" in bottom nav
2. Scroll trade timeline
3. Tap evidence tile (HASH/SNAPSHOT/LOG) → Copy to clipboard
4. Tap "Full analysis" → Show trade deep dive
5. Tap "Export" → Download PDF modal
6. Tap "Save Strategy" → Save current settings

---

## 🚀 Quick Start

### Without API Key (Mock Mode)
1. Type any token name in search
2. Get instant mock analysis
3. All features work with realistic data

### With API Key (Live Data)
1. Get free API key: https://www.coingecko.com/en/api/pricing
2. Click ⚙️ Settings in top bar
3. Paste your key → "Save"
4. Search real tokens (solana, ethereum, bitcoin)
5. Get live market data in seconds

---

## 📐 Screen Dimensions

### Mobile First (Primary)
- **Width:** 390px
- **Height:** 844px (iPhone 14 Pro)
- **Safe Area:** Account for bottom nav (72px)

### Desktop Responsive
- **Max Width:** 390px (mobile) → 1280px+ (desktop)
- **Breakpoint:** `lg:` = 1024px
- **Layout:** Centered column on desktop

---

## 🎯 Interactive Elements

### All Buttons Functional ✅
- [x] Token search & analysis
- [x] Wallet connect (mock)
- [x] API settings modal
- [x] All resolution options
- [x] Execute fix
- [x] Do nothing (logged)
- [x] Copy evidence tiles
- [x] Export receipt
- [x] Save strategy
- [x] Max position slider
- [x] Daily loss input
- [x] Strict mode toggle
- [x] Bottom navigation (5 buttons)

### Toast Notifications ✅
- Success: Green with check icon
- Error: Red with X icon
- Warning: Orange with alert
- Info: Blue with info icon

---

## 🔮 Future Enhancements (Not Implemented)

1. **Basescan API Integration** - On-chain contract verification
2. **DexScreener API** - Bonding curve specific data
3. **WebSocket Updates** - Real-time price streaming
4. **Biometric Auth** - Override confirmation
5. **Multi-chain Support** - Ethereum, Arbitrum, Optimism
6. **Advanced Charts** - TradingView integration
7. **Social Signals** - Twitter sentiment analysis
8. **Whale Tracking** - Large holder movements

---

## 📱 Bottom Navigation

### 5 Buttons (Always Visible)
1. **Now** (Activity icon) → `/` - Market overview
2. **Fix** (Wrench icon) → `/fix-it` - Active issues
3. **Receipt** (FileText icon) → `/receipt` - Trade history
4. **Rules** (Shield icon) → `/rules` - Risk settings
5. **Save** (Save icon) → Modal - Save strategy

### Active State
- Green border & background
- Neon green icon color
- Green label text
- Glow shadow effect

---

## 🎭 Mock Data Examples

### Token Data
```json
{
  "name": "Solana",
  "symbol": "SOL",
  "score": 82,
  "price": "$142.50",
  "marketCap": "$68.4B",
  "volume24h": "$2.8B",
  "change24h": "+3.42%"
}
```

### Trade Receipt
```json
{
  "id": "042",
  "time": "14:31",
  "intent": "Buy TOKEN curve 45%",
  "sonaScore": "38% slippage risk",
  "action": "Override → Biometric confirm",
  "result": "+9%",
  "status": "confirmed"
}
```

### Fix It Issue
```json
{
  "type": "Slippage Spike",
  "token": "TOKEN",
  "expectedSlippage": "1.2%",
  "actualSlippage": "8.7%",
  "lossSoFar": "-4.2%",
  "gasSpent": "$0.12",
  "detectedAt": "3m ago"
}
```

---

## 🛠️ Development Notes

### File Structure
```
/src/app/
  ├── App.tsx (RouterProvider + Toaster)
  ├── routes.tsx (React Router config)
  ├── components/
  │   ├── SonaNow.tsx (Home)
  │   ├── TokenTruth.tsx (Survivability)
  │   ├── FixIt.tsx (Risk Resolution)
  │   ├── Receipt.tsx (Trade History)
  │   ├── Rules.tsx (Risk Controls)
  │   ├── BottomNav.tsx (Navigation)
  │   ├── ApiKeyModal.tsx (API Settings)
  │   └── Toaster.tsx (Toast Config)
  └── services/
      └── coingecko.ts (API Client + Risk Scorer)
```

### Key Dependencies
```json
{
  "react-router": "7.13.0",
  "motion": "12.23.24",
  "sonner": "2.0.3",
  "recharts": "2.15.2",
  "lucide-react": "0.487.0"
}
```

---

## ✨ Prototype Complete!

All 5 screens fully functional with:
- ✅ Real CoinGecko API integration
- ✅ Smart mock fallbacks
- ✅ Complete navigation system
- ✅ Toast notifications
- ✅ localStorage persistence
- ✅ Responsive design (390px → 1280px+)
- ✅ Smooth Motion animations
- ✅ Glassmorphism UI
- ✅ Full interactivity

**Ready for user testing and design handoff!** 🚀
