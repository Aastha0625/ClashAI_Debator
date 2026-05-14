import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="font-body-md text-body-md min-h-screen relative overflow-hidden bg-[#0e0e13] text-[#e4e1e9]">


      <main className="min-h-screen relative overflow-hidden pt-12">
        {/* Background Elements */}
        <div className="grid-bg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="hero-3d-sphere"></div>
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-margin-edge py-section-gap min-h-[80vh] z-10">
          <div className="scanline"></div>

          <div className="relative mb-8 group mt-8">
            <div className="absolute -inset-10 bg-primary-fixed-dim/20 blur-[80px] rounded-full group-hover:bg-primary-fixed-dim/30 transition-all duration-700"></div>
            <div className="w-32 h-32 rounded-full glass-panel flex items-center justify-center border-2 border-primary-fixed-dim/40 relative z-10 animate-spin-slow">
               <span className="material-symbols-outlined text-primary-fixed-dim text-6xl drop-shadow-[0_0_15px_rgba(0,219,233,0.8)]">swords</span>
            </div>
          </div>

          <div className="reveal-text">
            <h2 className="font-label-caps text-label-caps text-primary-fixed-dim tracking-[0.4em] mb-4 uppercase">Neural Conflict Protocol v2.4</h2>
            <h1 className="font-display-lg text-display-lg md:text-[60px] leading-[1.1] mb-8 max-w-5xl mx-auto font-black italic">
              <span className="block text-white opacity-90">THE ULTIMATE</span>
              <span className="text-gradient drop-shadow-2xl tracking-widest uppercase">AI Debate Arena</span>
            </h1>
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="absolute -left-8 top-0 text-primary-fixed-dim/20 font-display-lg text-8xl pointer-events-none select-none">“</div>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10 leading-relaxed px-4">
                Witness two advanced AI minds clash over any topic. You set the rules, they bring the arguments. You decide the victor in the world's first autonomous logic battlefield.
              </p>
              <div className="absolute -right-8 bottom-0 text-primary-fixed-dim/20 font-display-lg text-8xl pointer-events-none select-none">”</div>
            </div>
            <div className="flex flex-col items-center gap-gutter">
              <button className="portal-button px-10 py-4 rounded-full text-white font-label-caps text-lg flex items-center gap-stack-md group shadow-[0_0_40px_rgba(0,219,233,0.3)]" onClick={() => navigate('/setup')}>
                <span className="relative z-10 tracking-widest">INITIATE COMBAT</span>
                <span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-700 relative z-10">settings_input_component</span>
              </button>
              <span className="font-data-mono text-[10px] text-on-surface-variant/60 tracking-widest animate-pulse">ESTABLISHING SECURE NEURAL LINK...</span>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-[1280px] mx-auto px-margin-edge py-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border-l-4 border-l-primary-fixed-dim group hover:translate-y-[-10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary-fixed-dim text-3xl">psychology</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary-fixed-dim transition-colors">Ethical Reasoning</h3>
              <p className="text-on-surface-variant leading-relaxed text-xs">
                Explore complex moral dilemmas through the lens of multiple philosophical frameworks. Our AIs dissect ethics with surgical precision.
              </p>
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
                <span className="font-data-mono text-[10px] text-primary-fixed-dim">98% LOGIC DEPTH</span>
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-primary-fixed-dim animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-6 bg-primary-fixed-dim animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-3 bg-primary-fixed-dim animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border-l-4 border-l-secondary group hover:translate-y-[-10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-3xl">balance</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface group-hover:text-secondary transition-colors">Deep Logic</h3>
              <p className="text-on-surface-variant leading-relaxed text-xs">
                Identify fallacies and structural flaws in real-time. Every argument is cross-referenced against a database of trillion-point logic clusters.
              </p>
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
                <span className="font-data-mono text-[10px] text-secondary">REAL-TIME ANALYSIS</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary group-hover:rotate-45 transition-all text-sm">troubleshoot</span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border-l-4 border-l-tertiary-fixed-dim group hover:translate-y-[-10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed-dim/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-3xl">bolt</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-surface group-hover:text-tertiary-fixed-dim transition-colors">Speed of Thought</h3>
              <p className="text-on-surface-variant leading-relaxed text-xs">
                High-frequency synthesis allows for thousands of logical permutations per second. Experience the pinnacle of machine dialectics.
              </p>
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
                <span className="font-data-mono text-[10px] text-tertiary-fixed-dim">0.4s RESPONSE TIME</span>
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 border-2 border-tertiary-fixed-dim/20 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-tertiary-fixed-dim rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
