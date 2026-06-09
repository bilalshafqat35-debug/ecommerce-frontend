import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const Login = ({ setPage, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Username aur password dono bharein.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://muhammadbilal786.pythonanywhere.com/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('username', username);
        setUser({ username });
        setPage('home');
      } else {
        setError('Galat username ya password.');
      }
    } catch (err) {
      setError('Server se connect nahi ho saka. Django server chalu hai?');
    }
    setLoading(false);
  };

  return (
    <div className="container py-12 flex justify-center">
      <div className="w-full max-w-md bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-2">Log in</h1>
        <p className="text-[#8B96A5] text-sm mb-6">Apne account mein login karein</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <label className="block text-sm text-[#505050] mb-1">Username</label>
        <div className="flex items-center border border-[#DEE2E7] rounded-md px-3 mb-4 focus-within:border-primary transition-colors">
          <User size={18} className="text-[#8B96A5]" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 outline-none"
            placeholder="Enter username"
          />
        </div>

        <label className="block text-sm text-[#505050] mb-1">Password</label>
        <div className="flex items-center border border-[#DEE2E7] rounded-md px-3 mb-6 focus-within:border-primary transition-colors">
          <Lock size={18} className="text-[#8B96A5]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            className="w-full px-3 py-2 outline-none"
            placeholder="Enter password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="text-sm text-[#505050] text-center mt-5">
          Account nahi hai?{' '}
          <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => setPage('signup')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;