import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { settings, updateSettings } = useSettings();
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const isLandingPage = location.pathname === '/';

  const headerClass = `fixed top-0 w-full flex justify-between items-center px-margin-edge py-stack-md mx-auto bg-background/80 backdrop-blur-xl border-b border-white/10 ${isLandingPage ? 'z-[100]' : 'z-50'}`;

  const handleAccountClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowAuth(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowAuth(false);
    navigate('/');
  };

  return (
    <>
      <header className={headerClass}>
        <div className={`font-display-lg font-black tracking-widest text-white flex items-center gap-3 ${isLandingPage ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          <img src="/src/assets/clash_logo.png" alt="ClashAI Logo" className="w-10 h-10 object-contain" />
          <Link to="/">ClashAI</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/setup" className={`font-body-md ${location.pathname === '/setup' ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-[#b9cacb] hover:text-white transition-colors'}`}>Arena</Link>
          <Link to="/history" className={`font-body-md ${location.pathname === '/history' ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-[#b9cacb] hover:text-white transition-colors'}`}>Archives</Link>
          <a className="font-body-md text-[#b9cacb] hover:text-white transition-colors" href="https://github.com/Aastha0625/ClashAI_Debator" target="_blank" rel="noreferrer">Docs</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className={`material-symbols-outlined transition-colors p-2 rounded-full hover:bg-white/5 ${user ? 'text-primary-fixed-dim' : 'text-[#b9cacb] hover:text-white'}`}
            onClick={handleAccountClick}
            title="Account"
          >
            account_circle
          </button>
          <button
            className="material-symbols-outlined text-[#b9cacb] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            settings
          </button>
          {location.pathname === '/' && (
            <button className="px-stack-md py-stack-sm rounded-lg portal-button text-white font-label-caps text-label-caps active:scale-90 transition-transform hidden md:block" onClick={() => navigate('/setup')}>
              Enter Arena
            </button>
          )}
          {location.pathname !== '/' && (
            <button className="hidden md:block bg-primary-fixed-dim text-[#002022] font-label-caps font-bold px-6 py-2 rounded-lg hover:scale-95 active:scale-90 transition-transform text-[12px]" onClick={() => navigate('/setup')}>
              Enter Arena
            </button>
          )}
        </div>
      </header>

      {/* Authentication Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-panel p-8 rounded-2xl max-w-md w-full mx-4 border-t-4 border-t-primary-fixed-dim relative">
            <button
              className="absolute top-4 right-4 text-outline hover:text-white"
              onClick={() => setShowAuth(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-display-lg text-[24px] text-white mb-6 text-center uppercase tracking-widest">
              User Profile
            </h2>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-fixed-dim/20 rounded-full mx-auto flex items-center justify-center mb-4 border border-primary-fixed-dim shadow-[0_0_20px_rgba(0,219,233,0.2)]">
                <span className="material-symbols-outlined text-[40px] text-primary-fixed-dim">shield_person</span>
              </div>
              <p className="font-display-lg text-xl text-white mb-1">{user?.username}</p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setShowAuth(false); navigate('/history'); }}
                  className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-label-caps hover:bg-white/10 transition-colors"
                >
                  DEBATE HISTORY
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 border border-red-500/50 text-red-500 rounded-xl font-label-caps hover:bg-red-500/10 transition-colors"
                >
                  DISCONNECT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal - Redesigned to match Login/Register */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel p-10 rounded-2xl max-w-md w-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            <button
              className="absolute top-6 right-6 text-[#b9cacb] hover:text-white transition-colors"
              onClick={() => setShowSettings(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-10">
              <h2 className="font-display-lg text-3xl font-black text-white mb-2 uppercase tracking-tighter">System Config</h2>
              <p className="text-[#b9cacb] font-data-mono text-[10px] uppercase tracking-[0.2em]">Hardware Parameters v1.0.4</p>
            </div>

            <div className="space-y-8">
              {/* Debate Speed */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-[12px] text-secondary font-bold tracking-widest">Debate Speed</label>
                  <span className="font-data-mono text-[10px] text-[#b9cacb]">
                    {settings.debateSpeed === 2000 ? 'FAST' : settings.debateSpeed === 4500 ? 'NORMAL' : 'SLOW'}
                  </span>
                </div>
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-body-md focus:border-secondary outline-none transition-colors appearance-none cursor-pointer"
                  value={settings.debateSpeed}
                  onChange={(e) => updateSettings({ debateSpeed: Number(e.target.value) })}
                >
                  <option value={2000}>Fast (2.0s delay)</option>
                  <option value={4500}>Normal (4.5s delay)</option>
                  <option value={8000}>Slow (8.0s delay)</option>
                </select>
                <p className="text-[10px] text-[#849495] italic">Adjusts the "Neural Cooldown" between exchanges.</p>
              </div>

              {/* Visual Effects */}
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                <div>
                  <div className="font-label-caps text-[12px] text-primary-fixed-dim font-bold tracking-widest uppercase">Visual Immersion</div>
                  <div className="text-[10px] text-[#b9cacb] mt-1">Enable scanlines & atmospheric bloom</div>
                </div>
                <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${settings.visualEffects ? 'bg-primary-fixed-dim shadow-[0_0_15px_#00dbe9]' : 'bg-white/10'}`}
                  onClick={() => updateSettings({ visualEffects: !settings.visualEffects })}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.visualEffects ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>

              {/* Action */}
              <button
                className="w-full py-4 mt-4 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 active:scale-95 transition-all uppercase tracking-widest text-sm"
                onClick={() => setShowSettings(false)}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
