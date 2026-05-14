import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-margin-edge flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img src="/src/assets/clash_logo.png" alt="ClashAI" className="w-8 h-8 object-contain" />
        <span className="font-display-lg text-lg font-black text-white tracking-widest uppercase">ClashAI</span>
        <span className="text-[#849495] font-data-mono text-[10px]">© 2026</span>
      </div>
      <div className="flex gap-6">
        <a className="text-[#849495] hover:text-primary-fixed-dim transition-colors text-[10px] font-data-mono uppercase tracking-widest hover:underline underline-offset-4" href="#">Privacy Policy</a>
      </div>
    </footer>
  );
}
