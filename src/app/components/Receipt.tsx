import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Download, Save, CheckCircle2, XCircle, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";

export function Receipt() {
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const [strategyNotes, setStrategyNotes] = useState("");
  
  // Mock balance states
  const [walletBalance] = useState('2,458.92');
  const [totalProfit] = useState('+342.18');
  const [winRate] = useState('73%');

  const trades = [
    {
      id: "042",
      time: "14:31",
      intent: "Buy TOKEN curve 45%",
      sonaScore: "38% slippage risk",
      action: "Override → Biometric confirm",
      result: "+9%",
      status: "confirmed",
      evidence: {
        hash: "0xABCDEF1234567890",
        snapshot: "snapshot_14:31:02",
        log: "log_042.json",
      },
    },
    {
      id: "041",
      time: "13:15",
      intent: "Buy CLEAN1",
      sonaScore: "92/100",
      action: "Enter protected",
      result: "+4%",
      status: "logged",
      evidence: {
        hash: "0x1234567890ABCDEF",
        snapshot: "snapshot_13:15:42",
        log: "log_041.json",
      },
    },
    {
      id: "040",
      time: "12:03",
      intent: "Buy RISKY2",
      sonaScore: "High wash trade",
      action: "Rejected by SONA",
      result: "N/A",
      status: "rejected",
      evidence: {
        hash: "N/A",
        snapshot: "snapshot_12:03:18",
        log: "log_040.json",
      },
    },
  ];

  const handleSaveStrategy = () => {
    if (!strategyName.trim()) {
      toast.error("Please enter a strategy name");
      return;
    }

    const strategies = JSON.parse(localStorage.getItem("sona_strategies") || "[]");
    const newStrategy = {
      id: Date.now().toString(),
      name: strategyName,
      notes: strategyNotes,
      createdAt: new Date().toISOString(),
    };
    strategies.push(newStrategy);
    localStorage.setItem("sona_strategies", JSON.stringify(strategies));

    toast.success(`Strategy "${strategyName}" saved!`);
    setShowSaveModal(false);
    setStrategyName("");
    setStrategyNotes("");
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success(`${label} copied to clipboard`);
  };

  const handleFullAnalysis = (tradeId: string) => {
    toast.info(`Opening full analysis for Trade #${tradeId}`);
  };

  const handleExport = () => {
    toast.success("Receipt exported as PDF (mock)");
    setShowExportModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="mx-auto max-w-[390px] lg:max-w-7xl min-h-screen pb-24 lg:pb-8">
        {/* Blurred Glass Header */}
        <div 
          className="sticky top-0 z-40 px-5 lg:px-8 py-4 border-b border-white/10"
          style={{
            background: 'rgba(17, 17, 17, 0.25)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <h1 className="text-sm lg:text-base font-semibold font-['Konkhmer_Sleokchher']">Receipt</h1>
            <div className="w-6 lg:w-8" />
          </div>
        </div>

        {/* Scrollable Glass Timeline */}
        <div className="px-5 lg:px-8 py-6 space-y-5">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="rounded-3xl lg:rounded-[32px] p-5 lg:p-6 border border-white/10"
              style={{
                background: 'rgba(17, 17, 17, 0.3)',
                backdropFilter: 'blur(40px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Trade Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold font-[Konkhmer_Sleokchher] text-[24px]">Trade #{trade.id}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm lg:text-base text-white/60">{trade.time}</span>
                  {trade.status === "confirmed" && <CheckCircle2 className="w-5 h-5 text-[#A855F7]" />}
                  {trade.status === "rejected" && <XCircle className="w-5 h-5 text-[#EF4444]" />}
                </div>
              </div>

              {/* Trade Details */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-start justify-between text-sm lg:text-base">
                  <span className="text-white/60 text-[#ffffff]">Intent:</span>
                  <span className="text-right">{trade.intent}</span>
                </div>
                <div className="flex items-start justify-between text-sm lg:text-base">
                  <span className="text-white/60 text-[#ccffed99]">SONA:</span>
                  <span className="text-right">{trade.sonaScore}</span>
                </div>
                <div className="flex items-start justify-between text-sm lg:text-base">
                  <span className="text-white/60 text-[#99ffd9]">Action:</span>
                  <span className="text-right">{trade.action}</span>
                </div>
                <div className="flex items-start justify-between text-sm lg:text-base">
                  <span className="text-white/60 text-[#33e4ff99]">Result:</span>
                  <span 
                    className="text-right font-semibold"
                    style={{ 
                      color: trade.result.includes("+") ? "#A855F7" : trade.result === "N/A" ? "#ffffff60" : "#EF4444" 
                    }}
                  >
                    {trade.result}
                  </span>
                </div>
              </div>

              {/* Evidence Tiles */}
              

              {/* Full Analysis Link */}
              <button 
                onClick={() => handleFullAnalysis(trade.id)}
                className="w-full mt-3 px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                style={{
                  background: 'rgba(17, 17, 17, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                Full analysis
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Glass Buttons */}
        <div className="px-5 lg:px-8 py-6 grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border transition-all hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
            style={{
              background: 'rgba(17, 17, 17, 0.4)',
              backdropFilter: 'blur(30px)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            Export
          </button>
          <button 
            onClick={() => setShowSaveModal(true)}
            className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border-2 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            style={{
              background: 'rgba(168, 85, 247, 0.2)',
              backdropFilter: 'blur(40px)',
              borderColor: '#A855F7',
            }}
          >
            Save
          </button>
        </div>

        {/* Tagline */}
        <div className="px-5 lg:px-8 mt-4 text-center">
          <p className="text-xs lg:text-sm text-white/60 mb-1 text-[#ffffff] italic">Know before you click.</p>
          
          <p className="text-xs text-white/50 mt-2">We're here to make you win, not just probability.</p>
        </div>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2"
              style={{
                background: 'rgba(17, 17, 17, 0.25)',
                backdropFilter: 'blur(50px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-[#A855F7] mb-4 font-['Konkhmer_Sleokchher']">Exporting Receipt</h3>
              
              <div 
                className="mb-6 p-8 rounded-2xl border text-center"
                style={{
                  background: 'rgba(17, 17, 17, 0.4)',
                  backdropFilter: 'blur(30px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Download className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 text-white/60" />
                <p className="text-sm lg:text-base text-white/60">Mock PDF Preview</p>
                <p className="text-xs text-white/40 mt-1">SONA_Receipt_All_Trades.pdf</p>
              </div>

              <button 
                onClick={handleExport}
                className="w-full px-6 py-4 lg:px-8 lg:py-5 rounded-3xl font-semibold text-base lg:text-lg border-2 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                style={{
                  background: 'rgba(168, 85, 247, 0.2)',
                  backdropFilter: 'blur(40px)',
                  borderColor: '#A855F7',
                }}
              >
                Download
              </button>
              
              <button 
                onClick={() => setShowExportModal(false)}
                className="w-full mt-3 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Strategy Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl lg:rounded-[32px] p-6 lg:p-8 border-2"
              style={{
                background: 'rgba(17, 17, 17, 0.25)',
                backdropFilter: 'blur(50px)',
                borderColor: '#A855F7',
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-[#A855F7] mb-6 font-['Konkhmer_Sleokchher']">Save Strategy</h3>
              
              <div className="mb-4">
                <label className="block text-sm lg:text-base text-white/80 mb-2">Strategy name</label>
                <input
                  type="text"
                  placeholder="e.g. Venus Momentum"
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                  className="w-full px-4 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-base border focus:outline-none focus:border-[#A855F7] transition-all"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm lg:text-base text-white/80 mb-2">Description / notes</label>
                <textarea
                  placeholder="Add notes about your strategy..."
                  value={strategyNotes}
                  onChange={(e) => setStrategyNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl text-sm lg:text-base border focus:outline-none focus:border-[#A855F7] transition-all resize-none"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border transition-all hover:border-white/30"
                  style={{
                    background: 'rgba(17, 17, 17, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Cancel
                </button>
                
                <button 
                  onClick={handleSaveStrategy}
                  className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-3xl font-semibold text-sm lg:text-base border-2 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                  style={{
                    background: 'rgba(168, 85, 247, 0.2)',
                    backdropFilter: 'blur(40px)',
                    borderColor: '#A855F7',
                  }}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}