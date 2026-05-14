import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { judgeDebate } from '../AIEngine';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import API_BASE_URL from '../api';

export default function VerdictPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [verdict, setVerdict] = useState(null);

  const { topic, proArgs, conArgs } = location.state || {
    topic: "Unknown Topic",
    proArgs: [],
    conArgs: []
  };

  const { user } = useAuth();
  const hasSaved = React.useRef(false);

  useEffect(() => {
    // If we already have a verdict in state (from Archives), use it directly
    if (location.state?.verdict) {
      setVerdict(location.state.verdict);
      setLoading(false);
      hasSaved.current = true; // Mark as saved so we don't duplicate
      return;
    }

    const getVerdict = async () => {
      try {
        const result = await judgeDebate(topic, proArgs, conArgs);
        setVerdict(result);
        setLoading(false);

        // Auto-save to database (once only for new debates)
        if (!hasSaved.current) {
          hasSaved.current = true;
          await fetch(`${API_BASE_URL}/api/debates/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user?.userId,
              topic,
              mode: location.state?.mode,
              rounds: location.state?.rounds,
              proArgs,
              conArgs,
              verdict: result
            })
          });
        }
      } catch (err) {
        console.error("Judging or saving failed:", err);
        setLoading(false); // Stop loading even if it fails
      }
    };
    getVerdict();
  }, [topic, proArgs, conArgs, user]);

  if (loading) {
    return (
      <div className="bg-[#131318] min-h-screen flex flex-col items-center justify-center text-white">
        <div className="w-20 h-20 rounded-full border-4 border-primary-fixed-dim border-t-transparent animate-spin mb-8 shadow-[0_0_30px_rgba(0,219,233,0.3)]"></div>
        <h2 className="font-display-lg text-2xl font-bold tracking-widest animate-pulse">ANALYZING LOGIC CLUSTERS...</h2>
      </div>
    );
  }

  const isProWinner = verdict.winner === 'pro';
  const winnerName = isProWinner ? "ADVOCATE" : "CHALLENGER";
  const proScore = verdict.proScore;
  const conScore = verdict.conScore;
  const margin = Math.abs(((proScore - conScore) / ((proScore + conScore) / 2)) * 100).toFixed(1);

  const handleShare = () => {
    const shareText = `ClashAI Debate Verdict 🛡️⚡\n\nTopic: "${topic}"\nWinner: ${winnerName} (${(isProWinner ? proScore : conScore).toFixed(0)}% Coherence)\n\nReasoning: "${verdict.reasoning}"\n\nAnalyze your own logic at ClashAI.`;

    if (navigator.share) {
      navigator.share({
        title: 'ClashAI Debate Verdict',
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Verdict summary copied to clipboard!");
      });
    }
  };

  return (
    <div className="bg-[#131318] text-[#e4e1e9] font-body-md min-h-screen pb-32 md:pb-0 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle at top, #1b1b20 0%, #131318 100%)' }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-fixed-dim/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        <main className="pt-32 px-4 md:px-8 max-w-[1280px] mx-auto">
          {/* Title & Hero Banner */}
          <div className="text-center mb-20">
            <h2 className="font-label-caps text-primary-fixed-dim tracking-[0.2em] mb-2 font-bold text-[12px]">POST-CONFLICT ANALYSIS</h2>
            <h1 className="font-display-lg text-[32px] md:text-[48px] font-bold mb-8 text-white">The Logic Verdict</h1>

            {/* Winner Banner */}
            <div className="relative mt-8 inline-block w-full max-w-4xl">
              <div className={`absolute inset-0 ${isProWinner ? 'bg-primary-fixed-dim/20' : 'bg-secondary/20'} blur-[80px] rounded-full`}></div>
              <div className={`glass-panel relative rounded-xl p-8 border ${isProWinner ? 'border-primary-fixed-dim/40' : 'border-secondary/40'} flex flex-col items-center overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${isProWinner ? 'bg-primary-fixed-dim shadow-[0_0_15px_rgba(0,219,233,0.8)]' : 'bg-secondary shadow-[0_0_15px_rgba(255,179,174,0.8)]'}`}></div>
                <div className={`${isProWinner ? 'text-primary-fixed-dim' : 'text-secondary'} font-label-caps text-[16px] mb-2 font-bold uppercase`}>{margin > 15 ? 'Decisive Victory' : 'Narrow Victory'}</div>
                <div className="font-display-lg text-[48px] tracking-widest text-white mb-2 font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{winnerName}</div>
                <div className="font-body-md text-[#b9cacb] max-w-lg">
                  The {winnerName.toLowerCase()} outperformed the opponent in logical consistency and data-backed rebuttals by a margin of {margin}%.
                </div>
              </div>
            </div>
          </div>

          {/* Logic Breakdown Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-md text-[24px] font-semibold text-white">Winning Strategy</h3>
              <div className={`border ${isProWinner ? 'border-primary-fixed-dim/40 text-primary-fixed-dim' : 'border-secondary/40 text-secondary'} px-4 py-1 rounded-full font-data-mono text-[12px]`}>{winnerName} Verdict</div>
            </div>

            <div className={`glass-panel rounded-xl p-8 border ${isProWinner ? 'border-primary-fixed-dim/40' : 'border-secondary/40'} flex items-center gap-8 relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${isProWinner ? 'bg-primary-fixed-dim' : 'bg-secondary'}`}></div>
              <div className="flex-1 pr-8 border-r border-white/10">
                <div className="font-label-caps text-[12px] text-[#b9cacb] mb-4 font-bold tracking-widest">WHY THEY WON</div>
                <p className="font-body-md text-white italic">
                  "{verdict.reasoning}"
                </p>
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center relative flex-shrink-0">
                <div className={`absolute inset-0 rounded-full border-4 ${isProWinner ? 'border-primary-fixed-dim' : 'border-secondary'} border-r-transparent border-t-transparent rotate-45`}></div>
                <div className="text-center">
                  <div className="text-[32px] font-display-lg font-bold text-white leading-none">{(isProWinner ? proScore : conScore).toFixed(0)}%</div>
                  <div className="text-[8px] font-label-caps text-[#b9cacb] tracking-widest mt-1">COHERENCE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
            {/* Logic Health Stat */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group hover:border-primary-fixed-dim/40 transition-colors border border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary-fixed-dim">check_circle</span>
                  <h4 className="font-label-caps text-[12px] font-bold text-[#b9cacb]">Logic Health</h4>
                </div>
                <div className="font-display-lg text-[32px] font-bold text-white flex items-baseline gap-2">
                  {verdict.logicHealth === 0 ? "EXCELLENT" : "GOOD"}
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between font-data-mono text-[10px] text-[#b9cacb] mb-2 uppercase">
                  <span>Logic Errors</span>
                  <span>{verdict.logicHealth} Detected</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-fixed-dim/50 to-primary-fixed-dim shadow-[0_0_10px_#00dbe9]" style={{ width: `${100 - (verdict.logicHealth * 20)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Fact Depth Stat */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group hover:border-[#edb1ff]/40 transition-colors border border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#edb1ff]">menu_book</span>
                  <h4 className="font-label-caps text-[12px] font-bold text-[#b9cacb]">Fact Depth</h4>
                </div>
                <div className="font-display-lg text-[32px] font-bold text-white">{verdict.factDepth}<span className="text-[20px] text-[#b9cacb]">/10</span></div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between font-data-mono text-[10px] text-[#b9cacb] mb-2">
                  <span>Detail Level</span>
                  <span>{verdict.factDepth > 7 ? 'High' : 'Normal'}</span>
                </div>
                <div className="flex gap-1 h-2">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className={`flex-1 rounded-full ${i < verdict.factDepth ? 'bg-[#edb1ff]' : 'bg-[#edb1ff]/20'}`}></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Convincing Power Stat */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group hover:border-secondary/40 transition-colors border border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary">stars</span>
                  <h4 className="font-label-caps text-[12px] font-bold text-[#b9cacb]">Convincing Power</h4>
                </div>
                <div className="font-display-lg text-[32px] font-bold text-white">{verdict.impactScore}</div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between font-data-mono text-[10px] text-[#b9cacb] mb-2 uppercase">
                  <span>Impact</span>
                  <span>Solid</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary/50 to-secondary w-[75%] shadow-[0_0_10px_#ffb3ae]"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-20 max-w-4xl mx-auto">
            <button
              className="w-full md:w-auto px-12 py-4 bg-primary-fixed-dim text-[#002022] font-label-caps text-[14px] font-bold rounded-xl hover:scale-95 active:scale-90 transition-transform shadow-[0_0_20px_rgba(0,219,233,0.3)] flex items-center justify-center gap-2"
              onClick={() => navigate('/setup')}
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              New Debate
            </button>
            <button
              className="w-full md:w-auto px-12 py-4 glass-panel text-white font-label-caps text-[14px] font-bold rounded-xl hover:bg-white/10 hover:scale-95 active:scale-90 transition-all border border-white/20 flex items-center justify-center gap-2"
              onClick={handleShare}
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              Share Verdict
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
