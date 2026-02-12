# SONA Intelligence

This is only a prototype demo for pre-trade risk & opportunity guardrail tool for RobinPump.fun (Base-chain bonding-curve memecoin launcher)

Video here: https://youtu.be/NwuFB13c1zY

## Overview

SONA Intelligence is a mobile-first crypto trading providing real-time risk analysis, survivability scoring, and comprehensive trade logging for traders using blockchain.

**Taglines:**
- "Know before you click."
- "No rugs. Just receipts."

## Design System

- **Background:** Radial gradient from #0A0A1F to #0F0F0F
- **Primary Accent:** Neon green (#22C55E) for success states, borders, glows
- **Caution:** Orange (#F97316)
- **Danger:** Red (#EF4444)
- **Glassmorphism:** Heavy backdrop blur (40-50px), 20-30% white overlays, neon green borders
- **Typography:** Inter font family
- **Mobile Frame:** 390×844px (iPhone 14 Pro optimized)

## Features

### 1. SONA Now (Home/Market Overview)
- Token address/name input with real-time detection
- Risk assessment chips with color-coded warnings
- Next Move recommendations
- Fix It suggestions for risk mitigation
- Hidden Wins discovery (clean tokens only)
- CoinGecko API integration for live data

### 2. Token Truth (Survivability Scoring)
- Dynamic score circle with animated ring (0-100 scale)
- Multi-gate analysis:
  - Liquidity assessment
  - Wash trade detection
  - Momentum tracking
  - Slippage monitoring
  - Concentration analysis
- Protected entry gates with override logging

### 3. Receipt (Trade Receipts/Forensics)
- Complete timeline of all trade actions
- Evidence tiles (transaction hash, CoinGecko snapshots, logs)
- Export and save functionality
- Immutable override logging

### 4. Rules (Risk Controls)
- Adjustable max position size (% of wallet)
- Daily loss limits with auto-stop
- Strict mode toggle (no overrides)
- Quick presets: Conservative, Balanced, Aggressive, YOLO
- Permanent override logging (always on)

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Routing:** React Router v7 (Data mode)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Data Source:** CoinGecko API (mock data for prototype)

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
/src
  /app
    /components
      SonaNow.tsx       # Home screen
      TokenTruth.tsx    # Survivability scoring
      Receipt.tsx       # Trade receipts
      Rules.tsx         # Risk controls
    routes.tsx          # React Router config
    App.tsx            # Main app component
  /styles
    theme.css          # Design tokens
    fonts.css          # Font imports
    app.css           # Global styles
```

## API Integration

Currently using **CoinGecko API** endpoints (mock data in prototype):
- `/simple/price` - Token price data
- `/market_chart` - Historical market data
- `/coins/{id}` - Detailed token information

## Responsive Design

- **Mobile-first:** 390×844px primary viewport
- **Desktop:** Responsive grid layouts up to 7xl breakpoint
- **Tablet:** Adaptive layouts with MD breakpoints

## Future Enhancements

- [ ] Live CoinGecko API integration with real credentials
- [ ] Web3 wallet connection (MetaMask, Phantom)
- [ ] Base blockchain transaction execution
- [ ] Real-time slippage monitoring
- [ ] On-chain data verification
- [ ] Multi-chain support beyond Base

## Author

Built for the RobinPump.fun ecosystem.
