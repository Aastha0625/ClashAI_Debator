import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetupPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [rounds, setRounds] = useState(5);
  const [mode, setMode] = useState("NORMAL");
  const [depth, setDepth] = useState(8);
  const [arenaMode, setArenaMode] = useState("ADVERSARIAL");

  const startDebate = () => {
    if (!topic.trim()) return;
    navigate('/arena', { state: { topic, rounds, mode, depth, arenaMode } });
  };

  return (
    <div className="bg-[#131318] text-[#e4e1e9] font-body-md min-h-screen">


      <main className="pt-16 pb-24 px-margin-edge max-w-container-max mx-auto">
        {/* Logic Input Section */}
        <section className="mb-10">
          <div className="mb-stack-lg">
            <h1 className="font-display-lg text-[36px] font-extrabold text-on-surface mb-2 tracking-tight">Initiate Logic Flow</h1>
            <p className="font-body-lg text-[16px] text-[#b9cacb] max-w-2xl">Configure the parameters of the adversarial environment. Precision in topic definition ensures a higher fidelity of logical exchange.</p>
          </div>
          <div className="glass-panel p-stack-lg rounded-xl border border-[rgba(0,219,233,0.4)] shadow-[0_0_15px_rgba(0,219,233,0.15)]">
            <label className="font-label-caps text-[12px] font-bold text-primary-fixed-dim mb-stack-sm block">Enter the topic of logic</label>
            <div className="relative">
              <input
                className="w-full bg-[#0e0e13] border border-white/10 rounded-lg p-4 font-body-lg text-[18px] focus:outline-none focus:border-primary-fixed-dim transition-colors text-white placeholder:text-[#849495]"
                placeholder="e.g. The ethical implications of sentient silicon-based intelligence..."
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startDebate()}
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim">terminal</span>
            </div>
          </div>
        </section>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Parameters Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-xl h-full border border-white/10">
              <h3 className="font-headline-md text-[20px] font-semibold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed-dim">tune</span>
                Match Parameters
              </h3>
              <div className="space-y-6">
                {/* Logical Depth Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-[12px] font-bold text-[#b9cacb]">Logical Depth</label>
                    <span className="font-data-mono text-[14px] text-primary-fixed-dim">LEVEL {depth < 10 ? `0${depth}` : depth}</span>
                  </div>
                  <input
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    type="range"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    max="10" min="1"
                  />
                  <p className="text-[12px] text-[#849495]">Increases the complexity of axioms and depth of counter-arguments.</p>
                </div>
                {/* Debate Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-caps text-[12px] font-bold text-[#b9cacb]">Debate Length</label>
                    <span className="font-data-mono text-[14px] text-primary-fixed-dim">{rounds < 10 ? `0${rounds}` : rounds} ROUNDS</span>
                  </div>
                  <input
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    type="range"
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    max="20" min="3"
                  />
                  <p className="text-[12px] text-[#849495]">The total number of exchanges before the Final Synthesis.</p>
                </div>
                {/* System Mode */}
                <div className="pt-2">
                  <label className="font-label-caps text-[12px] font-bold text-[#b9cacb] mb-2 block">Arena Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`py-2 rounded-lg font-label-caps text-[10px] font-bold transition-all ${arenaMode === 'ADVERSARIAL' ? 'bg-primary-fixed-dim/10 border border-primary-fixed-dim text-primary-fixed-dim' : 'border border-white/10 text-[#b9cacb]'}`}
                      onClick={() => setArenaMode('ADVERSARIAL')}
                    >
                      ADVERSARIAL
                    </button>
                    <button
                      className={`py-2 rounded-lg font-label-caps text-[10px] font-bold transition-all ${arenaMode === 'COLLABORATIVE' ? 'bg-primary-fixed-dim/10 border border-primary-fixed-dim text-primary-fixed-dim' : 'border border-white/10 text-[#b9cacb]'}`}
                      onClick={() => setArenaMode('COLLABORATIVE')}
                    >
                      COLLABORATIVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Selection Column */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-8 rounded-xl border border-white/10">
              <h3 className="font-headline-md text-[20px] font-semibold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb3ae]">psychology</span>
                Combatant Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                {/* The Stoic */}
                <div
                  className={`glass-panel rounded-lg overflow-hidden border-t-4 border-t-primary-fixed-dim flex flex-col hover:scale-[1.02] transition-transform duration-300 cursor-pointer ${mode === 'NORMAL' ? 'bg-white/5 border border-primary-fixed-dim' : 'border border-white/10'}`}
                  onClick={() => setMode('NORMAL')}
                >
                  <div className="h-32 bg-[#1f1f25] relative">
                    <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHdYlaUC_gydp3bcsueGUIVbRIZSQUgxjj-tt8bEX9oc4ht_-pmrZQP0Z5Uv09qbL2xKFQw9CS3rO0ojSBTPkhba6RKHgkpJ6sf9v1X-kJFS26LnAW_drJ9Ij5QozpH4ZaBKke0-Cz9vQJtQ2-2VPziduOGUvPo3na_LefkGHrjfsfueAwtMu4ANr-BPFGMGNQJ1wJzqOj_5rOHYfvRAWDRsmYGAWeBmzkfU4dPLSMDTvNTB2Z_GR7lRUlFyKfMdxHm9axlXekUc4" alt="Stoic" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#35343a] to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="font-label-caps text-[9px] px-2 py-0.5 bg-primary-fixed-dim text-[#002022] font-bold rounded">PRO</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h4 className="font-headline-md text-[18px] font-semibold mb-1">The Stoic</h4>
                    <p className="font-body-md text-[14px] text-[#b9cacb] mb-4">Prioritizes cold logic and historical precedence over rhetoric.</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="font-data-mono text-[10px] border border-white/10 px-2 py-1 rounded text-[#b9cacb]">RATIONAL</span>
                      <span className="font-data-mono text-[10px] border border-white/10 px-2 py-1 rounded text-[#b9cacb]">CALM</span>
                    </div>
                  </div>
                </div>

                {/* The Maverick */}
                <div
                  className={`glass-panel rounded-lg overflow-hidden border-t-4 border-t-secondary flex flex-col hover:scale-[1.02] transition-transform duration-300 cursor-pointer ${mode === 'SAVAGE' ? 'bg-white/5 border border-secondary' : 'border border-white/10'}`}
                  onClick={() => setMode('SAVAGE')}
                >
                  <div className="h-32 bg-[#1f1f25] relative">
                    <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaXjtFfqXuu3krZXhEW8s-da61NXmDR4CZ0KASMsQg8Y2OrHuH8KR1_9JXCAoC46PGvwPPutN7gJIp3cbPYx814e5u4O1M7SS3qbe2W4P91THtydwGaOmpd2nDd6-lsHZylpP1rDOAtG8RnI8YSfV7fv3fnusZLPa7lFwig_8MRJ1odgwByXaK7fnr0SWGJ4JfHc4lvJ_qZx59NE1inG0jwX8hhn8sY-BV0Cnv60EroLcqnWNLFQHUMVhNShBudKCw2NP25ZHI6qY" alt="Maverick" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#35343a] to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="font-label-caps text-[9px] px-2 py-0.5 bg-secondary text-[#410004] font-bold rounded">CON</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h4 className="font-headline-md text-[18px] font-semibold mb-1">The Maverick</h4>
                    <p className="font-body-md text-[14px] text-[#b9cacb] mb-4">Utilizes lateral thinking and disruptive paradoxes to win.</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="font-data-mono text-[10px] border border-white/10 px-2 py-1 rounded text-[#b9cacb]">UNPREDICTABLE</span>
                      <span className="font-data-mono text-[10px] border border-white/10 px-2 py-1 rounded text-[#b9cacb]">SHARP</span>
                    </div>
                  </div>
                </div>

                {/* Removed The Academic card */}
              </div>
            </div>
          </div>
        </div>

        {/* Launch Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse shadow-[0_0_8px_#00dbe9]"></div>
              <span className="font-data-mono text-[14px] text-primary-fixed-dim">SYSTEM READY</span>
            </div>
          </div>
          <button
            className="group relative px-12 py-6 rounded-full overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startDebate}
            disabled={!topic.trim()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed-dim to-secondary opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-primary-fixed-dim to-secondary opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <span className="relative font-display-lg text-[18px] text-[#002022] font-black tracking-widest uppercase">Launch ClashAI Arena</span>
          </button>
        </div>
      </main>

    </div>
  );
}
