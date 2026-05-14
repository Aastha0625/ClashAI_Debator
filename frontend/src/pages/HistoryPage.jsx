import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import API_BASE_URL from '../api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/debates/history?userId=${user?.userId || ''}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("History fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Purge this logic flow from the archives forever?")) return;

    try {
      console.log(`Attempting to delete debate ID: ${id}`);
      const res = await fetch(`${API_BASE_URL}/api/debates/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setHistory(prev => prev.filter(d => d.id !== id));
      } else {
        const errData = await res.json();
        console.error("Delete failed on server:", errData.error);
        alert("System Error: Failed to purge record.");
      }
    } catch (err) {
      console.error("Delete request failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#131318] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-fixed-dim border-t-transparent animate-spin rounded-full mx-auto mb-4"></div>
          <p className="text-white font-data-mono uppercase tracking-[0.3em]">Synchronizing Archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#131318] text-[#e4e1e9] min-h-screen pt-32 pb-8 px-4 md:px-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h1 className="font-display-lg text-[32px] md:text-[48px] font-bold text-white">Neural Archives</h1>
          <p className="text-[#b9cacb] font-data-mono text-sm uppercase tracking-widest pb-2">Vault Capacity: {history.length} / UNLIMITED</p>
        </div>

        {history.length === 0 ? (
          <div className="glass-panel p-12 rounded-xl text-center border border-white/10">
            <p className="text-[#b9cacb] font-body-lg">No logic flows found in the vault.</p>
            <button 
               onClick={() => navigate('/setup')}
               className="mt-6 px-8 py-3 bg-primary-fixed-dim text-[#002022] font-bold rounded-lg"
            >
              Start First Debate
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((debate) => (
              <div key={debate.id} className="glass-panel p-6 rounded-xl border border-white/10 hover:border-primary-fixed-dim/40 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{debate.topic}</h3>
                    <p className="text-[#b9cacb] text-xs font-data-mono uppercase tracking-widest">
                      {new Date(debate.created_at).toLocaleDateString()} • {debate.rounds} Rounds • {debate.mode}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-1 rounded-full text-[10px] font-bold font-label-caps border ${debate.verdict.winner === 'pro' ? 'border-primary-fixed-dim text-primary-fixed-dim' : 'border-secondary text-secondary'}`}>
                      {debate.verdict.winner === 'pro' ? 'ADVOCATE WIN' : 'CHALLENGER WIN'}
                    </div>
                    <button 
                      onClick={(e) => handleDelete(debate.id, e)}
                      className="text-[#849495] hover:text-red-400 transition-colors"
                      title="Purge Record"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-sm italic text-[#b9cacb] mb-6 line-clamp-2">
                  "{debate.verdict.reasoning}"
                </p>

                <button 
                  onClick={() => navigate('/verdict', { state: debate })}
                  className="text-primary-fixed-dim text-xs font-bold hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  RE-EXAMINE LOGIC
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
