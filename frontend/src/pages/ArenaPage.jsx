import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../AIEngine';
import { useSettings } from '../context/SettingsContext';
import Footer from '../components/Footer';

const RANDOM_TOPICS = [
  "AI will replace human creativity",
  "Social media does more harm than good",
  "Universal Basic Income is necessary",
  "Remote work is better than office work",
  "We are living in a simulation",
  "Mars colonization is a waste of resources",
  "Video games are a form of high art",
  "Crypto will replace traditional banking",
  "Superheroes are a bad influence on society",
  "Pineapple belongs on pizza"
];

export default function ArenaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateParams = location.state || {};
  
  const [topic, setTopic] = useState(stateParams.topic || "");
  const [rounds, setRounds] = useState(stateParams.rounds || 5);
  const [mode, setMode] = useState(stateParams.mode || "NORMAL");
  const [depth, setDepth] = useState(stateParams.depth || 8);
  const [arenaMode, setArenaMode] = useState(stateParams.arenaMode || "ADVERSARIAL");
  
  const { settings } = useSettings();
  
  const [isDebating, setIsDebating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [activeDebater, setActiveDebater] = useState(null); // 'pro' or 'con'
  
  const [proArgs, setProArgs] = useState([]);
  const [conArgs, setConArgs] = useState([]);
  
  const [proScore, setProScore] = useState(0);
  const [conScore, setConScore] = useState(0);
  
  const [isTyping, setIsTyping] = useState(false);

  const proScrollRef = useRef(null);
  const conScrollRef = useRef(null);

  useEffect(() => {
    if (proScrollRef.current) proScrollRef.current.scrollTop = proScrollRef.current.scrollHeight;
  }, [proArgs, isTyping]);

  useEffect(() => {
    if (conScrollRef.current) conScrollRef.current.scrollTop = conScrollRef.current.scrollHeight;
  }, [conArgs, isTyping]);

  const handleRandomTopic = () => {
    const randomTopic = RANDOM_TOPICS[Math.floor(Math.random() * RANDOM_TOPICS.length)];
    setTopic(randomTopic);
  };

  const startDebate = () => {
    if (!topic.trim()) return;
    setIsDebating(true);
    setCurrentRound(1);
    setProArgs([]);
    setConArgs([]);
    setProScore(0);
    setConScore(0);
    runRound(1, 'pro');
  };

  const hasStartedRef = useRef(false);

  // Auto-start debate if navigated from setup
  useEffect(() => {
    if (stateParams.topic && !isDebating && proArgs.length === 0 && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startDebate();
    }
  }, []);

  const runRound = async (roundNum, turn) => {
    setActiveDebater(turn);
    setIsTyping(true);
    
    let opponentLastMessage = "";
    if (turn === 'con' && proArgs.length > 0) opponentLastMessage = proArgs[proArgs.length - 1];
    if (turn === 'pro' && conArgs.length > 0) opponentLastMessage = conArgs[conArgs.length - 1];

    const response = await generateAIResponse(topic, turn, mode, roundNum - 1, opponentLastMessage, depth, arenaMode);
    
    setIsTyping(false);

    // Stop debate if API limit is hit
    if (response.includes('[SYSTEM WARNING]')) {
      if (turn === 'pro') setProArgs(prev => [...prev, response]);
      else setConArgs(prev => [...prev, response]);
      setIsDebating(false);
      setActiveDebater(null);
      return;
    }

    if (turn === 'pro') {
      setProArgs(prev => [...prev, response]);
      setProScore(prev => prev + Math.floor(Math.random() * 4) + 7);
      setTimeout(() => runRound(roundNum, 'con'), settings.debateSpeed); 
    } else {
      setConArgs(prev => [...prev, response]);
      setConScore(prev => prev + Math.floor(Math.random() * 4) + 7);
      
      if (roundNum < rounds) {
        setTimeout(() => {
          setCurrentRound(roundNum + 1);
          runRound(roundNum + 1, 'pro');
        }, settings.debateSpeed);
      } else {
        setTimeout(() => {
          setIsDebating(false);
          setActiveDebater(null);
          navigate('/verdict', { state: { topic, mode, rounds, proScore, conScore, proArgs, conArgs, depth, arenaMode } });
        }, 3000);
      }
    }
  };

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen" style={{
      backgroundColor: '#131318',
      backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(0, 219, 233, 0.08) 0%, transparent 50%), radial-gradient(circle at 10% 30%, rgba(255, 179, 174, 0.03) 0%, transparent 40%)',
      color: '#e4e1e9'
    }}>


      <main className="pt-[120px] pb-section-gap px-margin-edge max-w-container-max mx-auto">
        {/* Hero / Setup Section */}
        <section className="flex flex-col items-center text-center mb-section-gap">
          <p className="font-body-md text-on-surface-variant mb-stack-lg max-w-xl">Set the parameters and watch the clash of logic. Two advanced neural networks dissect complexity through adversarial reasoning.</p>
          
          <div className="w-full max-w-4xl space-y-stack-md">
            {/* Input Group */}
            <div className="flex flex-col md:flex-row gap-stack-md">
              <div className="relative flex-grow group">
                <input 
                  className="w-full py-4 px-6 bg-[rgba(0,0,0,0.3)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/10 rounded-xl focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-all text-on-surface placeholder:text-outline/50" 
                  placeholder="Enter a controversial topic..." 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isDebating}
                />
              </div>
              <div className="flex gap-stack-md">
                <button 
                  className="glass-panel px-6 py-4 rounded-xl flex items-center gap-2 font-label-caps text-label-caps hover:bg-white/10 transition-all border border-white/10"
                  onClick={handleRandomTopic} 
                  disabled={isDebating}
                >
                  <span className="material-symbols-outlined text-primary-fixed-dim">casino</span>
                  RANDOM
                </button>
                <button 
                  className="bg-primary-fixed-dim text-on-primary-fixed px-10 py-4 rounded-xl flex items-center gap-2 font-label-caps text-label-caps font-bold shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:shadow-[0_0_30px_rgba(0,219,233,0.5)] transition-all disabled:opacity-50"
                  onClick={startDebate} 
                  disabled={isDebating || !topic.trim()}
                >
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  START
                </button>
              </div>
            </div>
            
            {/* Parameters Bar */}
            <div className="glass-panel w-full p-4 rounded-xl flex flex-wrap items-center justify-center gap-10 md:gap-20">
              <div className="flex items-center gap-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">ROUNDS:</span>
                <select 
                  className="bg-surface-container-high border-none text-on-surface rounded-lg px-4 py-1 font-body-md focus:ring-1 focus:ring-primary-fixed-dim"
                  value={rounds}
                  onChange={(e) => setRounds(Number(e.target.value))}
                  disabled={isDebating}
                >
                  <option value={3}>3 rounds</option>
                  <option value={5}>5 rounds</option>
                  <option value={7}>7 rounds</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">PERSONALITY MODE:</span>
                <div className="bg-surface-container-high p-1 rounded-lg flex gap-1">
                  {['NORMAL', 'SAVAGE', 'PHILOSOPHER'].map(m => (
                    <button 
                      key={m}
                      className={`${mode === m ? 'bg-white/10 text-on-surface' : 'hover:bg-white/5 text-on-surface-variant'} px-4 py-1 rounded-md text-label-caps font-label-caps transition-colors`}
                      onClick={() => setMode(m)}
                      disabled={isDebating}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">DEPTH:</span>
                <span className="font-data-mono text-primary-fixed-dim">LEVEL {depth}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant">ARENA:</span>
                <span className="font-data-mono text-secondary">{arenaMode}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Battle Stage */}
        <section className="relative">
          {/* Round Indicator */}
          <div className="flex flex-col items-center mb-stack-lg">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4">ROUND {currentRound} / {rounds}</h2>
            <div className="flex gap-2">
              {Array.from({ length: rounds }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${i < currentRound ? 'bg-primary-fixed-dim/20 border border-primary-fixed-dim/40' : 'bg-white/5'}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Main Arena Grid */}
          <div className="grid grid-cols-1 md:grid-cols-11 items-stretch gap-stack-md lg:gap-gutter relative">
            
            {/* Pro Side: Advocate */}
            <div className={`md:col-span-5 glass-panel rounded-2xl p-stack-lg flex flex-col min-h-[400px] ${activeDebater === 'pro' ? 'border border-[rgba(0,219,233,0.4)] shadow-[0_0_20px_rgba(0,219,233,0.1)]' : ''}`}>
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary-fixed-dim/20 text-primary-fixed-dim rounded-lg flex items-center justify-center font-display-lg text-headline-md border border-primary-fixed-dim/30">A</div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">Advocate</h3>
                    <p className="font-label-caps text-label-caps text-primary-fixed-dim">PRO SIDE</p>
                  </div>
                </div>
                <div className="font-display-lg text-display-lg text-primary-fixed-dim opacity-40">{proScore}</div>
              </div>
              <div className="flex-grow flex flex-col border-t border-white/5 pt-stack-lg overflow-y-auto" ref={proScrollRef} style={{maxHeight: '300px'}}>
                {proArgs.length === 0 && activeDebater !== 'pro' ? (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="font-body-md text-on-surface-variant italic animate-pulse">Awaiting argument...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {proArgs.map((arg, i) => (
                      <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 text-sm">{arg}</div>
                    ))}
                    {isTyping && activeDebater === 'pro' && (
                      <div className="flex gap-2 p-2">
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-stack-lg flex justify-between items-center text-data-mono font-data-mono text-[12px] text-outline">
                <div className="flex gap-4">
                  <span>CONFIDENCE: {proArgs.length > 0 ? '98%' : '--'}</span>
                  <span>LOGIC FLOW: {proArgs.length > 0 ? 'STABLE' : '--'}</span>
                </div>
                <span className="material-symbols-outlined text-[16px]">info</span>
              </div>
            </div>

            {/* Center Conflict Zone */}
            <div className="md:col-span-1 flex items-center justify-center z-10 -mx-4 md:mx-0 py-8">
              <div className="w-16 h-16 rounded-full glass-panel border border-white/10 flex items-center justify-center font-display-lg text-headline-md font-extrabold text-on-surface shadow-[-10px_0_20px_-5px_rgba(0,219,233,0.3),10px_0_20px_-5px_rgba(255,179,174,0.3)]">
                VS
              </div>
            </div>

            {/* Con Side: Challenger */}
            <div className={`md:col-span-5 glass-panel rounded-2xl p-stack-lg flex flex-col min-h-[400px] ${activeDebater === 'con' ? 'border border-[rgba(255,179,174,0.4)] shadow-[0_0_20px_rgba(255,179,174,0.1)]' : ''}`}>
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center font-display-lg text-headline-md border border-secondary/30">C</div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">Challenger</h3>
                    <p className="font-label-caps text-label-caps text-secondary">CON SIDE</p>
                  </div>
                </div>
                <div className="font-display-lg text-display-lg text-secondary opacity-40">{conScore}</div>
              </div>
              <div className="flex-grow flex flex-col border-t border-white/5 pt-stack-lg overflow-y-auto" ref={conScrollRef} style={{maxHeight: '300px'}}>
                {conArgs.length === 0 && activeDebater !== 'con' ? (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="font-body-md text-on-surface-variant italic">Awaiting counter-argument...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {conArgs.map((arg, i) => (
                      <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 text-sm">{arg}</div>
                    ))}
                    {isTyping && activeDebater === 'con' && (
                      <div className="flex gap-2 p-2">
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-outline animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-stack-lg flex justify-between items-center text-data-mono font-data-mono text-[12px] text-outline">
                <div className="flex gap-4">
                  <span>CONFIDENCE: {conArgs.length > 0 ? '97%' : '--'}</span>
                  <span>LOGIC FLOW: {conArgs.length > 0 ? 'STABLE' : '--'}</span>
                </div>
                <span className="material-symbols-outlined text-[16px]">info</span>
              </div>
            </div>

          </div>
        </section>

        {/* Side-by-Side Context / Rules (Bento Style) */}
        <section className="mt-section-gap grid grid-cols-1 md:grid-cols-3 gap-stack-md">
          <div className="glass-panel p-stack-md rounded-xl border-l-4 border-primary-fixed-dim">
            <h4 className="font-label-caps text-label-caps text-on-surface mb-2">NEURAL ENGINE</h4>
            <p className="text-on-surface-variant font-data-mono text-data-mono text-sm">Proprietary logic-mapping model optimized for syllogistic deconstruction.</p>
          </div>
          <div className="glass-panel p-stack-md rounded-xl border-l-4 border-secondary">
            <h4 className="font-label-caps text-label-caps text-on-surface mb-2">ARENA PROTOCOL</h4>
            <p className="text-on-surface-variant font-data-mono text-data-mono text-sm">Fairness-first arbitration. No fallacies allowed. Pure statistical reasoning.</p>
          </div>
          <div className="glass-panel p-stack-md rounded-xl border-l-4 border-primary-fixed-dim">
            <h4 className="font-label-caps text-label-caps text-on-surface mb-2">LOGIC METRICS</h4>
            <p className="text-on-surface-variant font-data-mono text-data-mono text-sm">Real-time evaluation of semantic consistency and evidence weighting.</p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
