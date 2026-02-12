import { MemoryRouter, Routes, Route } from 'react-router';
import { AppSelector } from './components/AppSelector';
import { SonaNow } from './components/SonaNow';
import { TokenTruth } from './components/TokenTruth';
import { Receipt } from './components/Receipt';
import { Rules } from './components/Rules';
import { FixIt } from './components/FixIt';
import { Toaster } from './components/Toaster';
import { SonariScanner } from './components/sonari/SonariScanner';
import { SonariTrade } from './components/sonari/SonariTrade';
import { SonariVaults } from './components/sonari/SonariVaults';
import { SonariLoading } from './components/sonari/SonariLoading';
import { SonariShowcase } from './components/sonari/SonariShowcase';

export default function App() {
  return (
    <>
      <MemoryRouter initialEntries={['/select']}>
        <Routes>
          {/* App Selector Landing Page */}
          <Route path="/select" element={<AppSelector />} />
          
          {/* Original SONA Intelligence Routes */}
          <Route path="/" element={<SonaNow />} />
          <Route path="/token/:tokenId" element={<TokenTruth />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/fix-it" element={<FixIt />} />
          
          {/* New SONARI Routes */}
          <Route path="/sonari" element={<SonariScanner />} />
          <Route path="/sonari/trade" element={<SonariTrade />} />
          <Route path="/sonari/vaults" element={<SonariVaults />} />
          <Route path="/sonari/loading" element={<SonariLoading />} />
          <Route path="/sonari/showcase" element={<SonariShowcase />} />
        </Routes>
      </MemoryRouter>
      <Toaster />
    </>
  );
}