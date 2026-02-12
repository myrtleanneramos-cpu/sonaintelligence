# SONARI - AI-Powered On-Chain Token Scanner

## Overview

SONARI is a complete dark cyberpunk Figma prototype added to the SONA Intelligence suite. It's an AI-powered on-chain token scanner and automated trading vault system specifically designed for RobinPump.fun on the Base blockchain.

**Built by:** Myrtle Anne Ramos  
**Event:** EasyA Consensus HK 2026 DeFi Track

---

## 🎨 Design System

### Color Palette
- **Background:** `#0F0F1A` (Pure black)
- **Neon Green:** `#00FF9D` (ENTER signals, success states)
- **Cyan:** `#00D4FF` (Buttons, vaults, interactive elements)
- **Red:** `#FF3B30` (CUT signals, warnings, errors)
- **Orange:** `#FF9500` (WAIT signals, caution states)

### Typography
- **Headings:** Orbitron (futuristic, cyberpunk aesthetic)
- **Body Text:** Inter (clean, readable)

### Visual Style
- Dark cyberpunk aesthetic with neon glow effects
- High contrast for readability
- Glassmorphism and blur effects
- Glowing borders (`box-shadow` with rgba colors)
- Minimal text, visuals-first approach
- Animated loading states and transitions

---

## 📱 Screens & Features

### 1. **Scanner Dashboard** (`/sonari`)
The main home screen featuring:

#### Top Bar
- "SONARI" logo with neon green glow
- "BASE" chain badge
- Connect Wallet button (cyan gradient)

#### Live Market Ticker
- Top 5 tokens: Bitcoin, Ethereum, Tether, BNB, Solana
- Real-time prices and 24h changes
- Green up arrows, red down arrows

#### Central "Next Move" Verdict Box
- Large verdict display: **ENTER** (green) / **WAIT** (orange) / **CUT** (red)
- Cleanliness score (e.g., 85/100)
- Short reason (e.g., "Genuine building pressure" or "Wash trade detected")
- Toggle buttons to switch between verdicts

#### Similar Clean Tokens List
- Tokens with cleanliness scores (e.g., Solana 82, Base 78)
- Liquidity and momentum notes

#### Bottom Indicators
- Gas: LOW/MEDIUM/HIGH with Zap icon
- Wallet Risk: SAFE/WARNING with Shield icon
- Venue: STABLE/VOLATILE with Activity icon

#### Chibi Sun Mascot
- Animated sun character in corner
- **Happy** mood on ENTER success (smiling)
- **Thinking** mood on loading (question mark)
- **Worried** mood on CUT/error (frown, furrowed brows)
- Neon green glow effect
- Spinning rays animation

#### Token Input
- "Paste token name, symbol, or address" placeholder
- Cyan border with glow on focus

---

### 2. **Trade Execution** (`/sonari/trade`)
Overlay screen for confirming trades:

#### Confirm Trade View
- Token pair display (e.g., PUMP/USDC)
- Chain: BASE
- Cleanliness score badge (85/100)
- Amount input (USDC)
- Expected output calculation
- Price impact percentage
- Slippage tolerance warning

#### Risk Analysis Panel
- Liquidity Depth: ✓ GOOD
- Wash Trade Check: ✓ CLEAN
- Rug Pull Risk: ✓ LOW
- Contract Security: ✓ VERIFIED

#### Action Buttons
- **ABORT** (red border, danger state)
- **EXECUTE** (neon green gradient, success state)

#### Success Popup Modal
- Chibi sun mascot (happy mood)
- Large green checkmark icon
- "CLEAN ENTRY! Hell yeah" message
- Transaction details:
  - Acquired tokens
  - Execution price
  - Gas fee
- Auto-redirect message

#### Error/Warning Popup Modal
- Chibi sun mascot (worried mood)
- Red alert triangle icon
- "HIGH RISK – abort?" message
- Error reason (e.g., "Slippage exceeded")
- BACK TO SCANNER button

---

### 3. **Vaults Section** (`/sonari/vaults`)
Full-screen vault management interface:

#### Hero Section
- "SONARI Vaults – Pooled Auto-Trading" title
- Description: "Deposit once. SONARI scans and executes trades on clean signals. Profits shared."
- Chibi sun mascot
- Feature badges (Automated Risk Management, Real-time Monitoring)

#### Vault Cards (Grid Layout)
Each vault displays:

**RobinPump Clean Vault**
- TVL: $48.2K
- APY: 18.7% (green)
- Risk Level: LOW (green badge)
- Active Signals: 3 ENTER, 1 CUT
- Description: Conservative strategy focusing on high-cleanliness tokens
- Max Cap: $100K
- Active Traders: 47
- DEPOSIT USDC button (cyan gradient)

**Momentum Booster Vault**
- TVL: $22.1K
- APY: 24.1%
- Risk Level: MEDIUM (cyan badge)
- Active Signals: 5 ENTER
- Description: Targets tokens with strong upward momentum
- Max Cap: $50K
- Active Traders: 23

**High-Risk Hunter Vault**
- TVL: $9.8K
- APY: 42.3% (orange)
- Risk Level: HIGH (orange badge)
- Active Signals: 2 CUT (avoided losses)
- Description: Aggressive trading on emerging tokens
- Max Cap: $25K
- Active Traders: 12

#### Deposit Modal
- Vault selection display
- Amount input (USDC)
- Quick amount buttons (100, 500, 1000)
- Estimated annual return calculation
- CANCEL / CONFIRM buttons

#### Success Modal
- Chibi sun mascot (happy)
- "YIELD INCOMING!" message
- Deposit confirmation details
- Estimated returns

---

### 4. **Loading State** (`/sonari/loading`)
Dedicated loading screen:
- Chibi sun mascot (thinking mood)
- Dual spinning rings (neon green and cyan)
- "SCANNING CHAIN" message
- "Analyzing on-chain signals..." subtitle
- Animated bouncing dots

---

### 5. **Showcase Demo** (`/sonari/showcase`)
Comprehensive demo view for hackathon presentation:
- Frame selector to toggle between all screens
- Mobile mockup frames (iPhone 16 size - 393×852px)
- Desktop vault view
- All modals and states visible
- Features summary section
- Interactive chibi sun mood showcase
- Quick navigation to full experience

---

## 🧭 Navigation

### Route Structure
```
/select               → App Selector (landing page)
/                     → SONA Intelligence (original app)
/sonari               → SONARI Scanner Dashboard
/sonari/trade         → Trade Execution & Confirmation
/sonari/vaults        → Vaults Section
/sonari/loading       → Loading State
/sonari/showcase      → Hackathon Demo Showcase
```

### Bottom Navigation Bar
- **SCANNER** tab (Activity icon) → Dashboard
- **VAULTS** tab (Shield icon) → Vaults section
- Floating above black backdrop with blur effect

---

## 🎭 Interactive Elements

### Mascot Moods
The chibi sun mascot responds to app state:
- **Happy:** ENTER signals, successful trades, vault deposits
- **Thinking:** Loading states, analyzing tokens
- **Worried:** CUT signals, errors, high-risk warnings

### Verdict Toggling
Users can click verdict buttons (ENTER/WAIT/CUT) to see different signal states and mascot reactions.

### Modal Flow
1. Click verdict → Navigate to trade confirmation
2. Click EXECUTE → Show loading → Success or error modal
3. Click vault card → Deposit modal → Success confirmation

### Glow Effects
- Buttons: `box-shadow: 0 0 20px rgba(0,255,157,0.4)`
- Borders: Neon colors with transparency
- Hover states: Increased glow intensity
- Active elements: Pulsing animations

---

## 📐 Responsive Design

### Mobile-First (iPhone 16 - 393×852px)
- Single column layouts
- Full-width cards
- Touch-friendly button sizes
- Bottom navigation bar

### Desktop (up to 1280px+)
- Multi-column vault grid (2-3 columns)
- Wider modals and cards
- Side-by-side layouts
- Enhanced spacing

---

## 🎯 Core Concepts

### Signal System
- **ENTER:** High cleanliness score (75+), genuine building pressure, strong momentum
- **WAIT:** Medium score (50-74), uncertain signals, mixed indicators
- **CUT:** Low score (<50), wash trades detected, rug pull risks

### Cleanliness Scoring (0-100)
Analyzes:
- Liquidity depth
- Wash trade detection
- Rug pull risk factors
- Contract security verification
- Trading volume authenticity

### Auto-Trading Vaults
- Pooled user funds
- Automated execution on clean ENTER signals
- Automated exits on CUT signals
- Profit sharing based on deposit percentage
- Multiple risk tiers (Low, Medium, High)

---

## 🛠️ Technical Implementation

### Technologies
- **React** with TypeScript
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Orbitron** Google Font
- **Lucide React** icons
- **Motion/React** for animations

### Key Components
```
/src/app/components/sonari/
  ├── ChibiSun.tsx          → Mascot component (SVG)
  ├── SonariScanner.tsx     → Main dashboard
  ├── SonariTrade.tsx       → Trade execution
  ├── SonariVaults.tsx      → Vaults interface
  ├── SonariLoading.tsx     → Loading screen
  └── SonariShowcase.tsx    → Demo showcase
```

### Fonts Configuration
Added to `/src/styles/fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
```

---

## 🎬 Hackathon Demo Flow

### Recommended Presentation Order

1. **Start at App Selector** (`/select`)
   - Show both SONA Intelligence and SONARI side-by-side
   - Click "View SONARI Showcase Demo"

2. **Showcase All Frames** (`/sonari/showcase`)
   - Toggle through Scanner, Success, Error, Vaults, Loading
   - Highlight chibi sun mascot moods
   - Point out cyberpunk design elements

3. **Live Interactive Demo** (`/sonari`)
   - Toggle between ENTER/WAIT/CUT verdicts
   - Show mascot mood changes
   - Click verdict → Trade flow
   - Navigate to vaults
   - Click deposit → Modal flow

4. **Key Talking Points**
   - Real-time signal detection (ENTER/WAIT/CUT)
   - Automated trading vaults with risk tiers
   - Wash trade detection and rug pull prevention
   - Chibi sun mascot for user engagement
   - Dark cyberpunk aesthetic with neon accents
   - Mobile-first responsive design

---

## 🚀 Getting Started

### Accessing SONARI
1. Open the app → lands on `/select`
2. Click "SONARI" card or "Launch Scanner"
3. Explore the scanner dashboard

### Switching Between Apps
- Use the App Selector (`/select`) as a hub
- Footer links in SONARI ("Switch to SONA Intelligence")
- Browser navigation (back/forward)

---

## 📝 Future Enhancements

### Potential Features
- Real CoinGecko API integration for live data
- Web3 wallet connection (MetaMask, WalletConnect)
- Smart contract integration for actual trading
- Historical performance charts
- Social trading features (follow top traders)
- Notifications for ENTER/CUT signals
- Portfolio tracking
- Multi-chain support (Ethereum, Polygon, etc.)

---

## 🎨 Design Credits

**Inspiration:** X METHOD wallet, cyberpunk aesthetics, neon Tokyo vibes  
**Mascot Design:** Chibi sun character with animated moods  
**Color Palette:** Dark mode with neon green/cyan/red accents  
**Typography:** Orbitron (futuristic) + Inter (modern)

---

## 📄 License & Attribution

Built by **Myrtle Anne Ramos** for EasyA Consensus HK 2026 DeFi Track

This is a prototype/demo application for hackathon purposes. Not intended for production use with real funds.

---

## 🔗 Quick Links

- **GitHub:** [Add your GitHub link]
- **Loom Demo:** [Add your Loom video link]
- **Live Demo:** Navigate to `/sonari/showcase`

---

**Total Screens:** 6-8 frames (Scanner, Trade Confirm, Success Modal, Error Modal, Vaults, Deposit Modal, Loading, Showcase)

**Mobile-First:** iPhone 16 size (393×852px) with desktop scaling up to 1280px+

**Interactive:** Fully clickable prototypes with state management and animations
