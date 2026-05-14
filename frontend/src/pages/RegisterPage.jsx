import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
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
          <h1 className="font-display-lg text-3xl font-black text-white mb-2 uppercase">New Strategist</h1>
          <p className="text-[#b9cacb] font-data-mono text-sm uppercase tracking-widest">Register your neural signature</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg mb-6 text-sm">Success! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label-caps text-[12px] text-[#b9cacb] mb-2 font-bold">CHOOSE USERNAME</label>
            <input 
              className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-secondary focus:outline-none transition-colors" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-label-caps text-[12px] text-[#b9cacb] mb-2 font-bold">CREATE PASSWORD</label>
            <input 
              className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-secondary focus:outline-none transition-colors" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-4 bg-secondary text-white font-black rounded-xl hover:scale-[0.98] active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,179,174,0.3)] uppercase tracking-widest">
            Register ID
          </button>
Form        </form>

        <div className="mt-8 text-center">
          <p className="text-[#b9cacb] text-sm">
            Already have an ID? <Link to="/login" className="text-secondary hover:underline">Authorize here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
