import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.username, data.userId);
        navigate('/');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Connection failed.');
    }
  };

  return (
    <div className="bg-[#131318] min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-8">
          <h1 className="font-display-lg text-3xl font-black text-white mb-2 uppercase">Neural Access</h1>
          <p className="text-[#b9cacb] font-data-mono text-sm uppercase tracking-widest">Identify yourself, User</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-caps text-[12px] text-[#b9cacb] mb-2 font-bold">USERNAME</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary-fixed-dim focus:outline-none transition-colors"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-label-caps text-[12px] text-[#b9cacb] mb-2 font-bold">PASSWORD</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary-fixed-dim focus:outline-none transition-colors"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-4 bg-primary-fixed-dim text-[#002022] font-black rounded-xl hover:scale-[0.98] active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,219,233,0.3)] uppercase tracking-widest">
            Authorize
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#b9cacb] text-sm">
            New to the Arena? <Link to="/register" className="text-primary-fixed-dim hover:underline">Create ID</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
