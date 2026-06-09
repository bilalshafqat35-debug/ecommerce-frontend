import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

const Signup = ({ setPage, setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    if (!username || !password) {
      setError('Username aur password zaroori hain.');
      return;
    }
    if (password.length < 6) {
      setError('Password kam se kam 6 characters ka ho.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://muhammadbilal786.pythonanywhere.com/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Signup ke baad seedha login bhi kar dete hain
        const loginRes = await fetch('https://muhammadbilal786.pythonanywhere.com/api/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem('access', loginData.access);
          localStorage.setItem('refresh', loginData.refresh);
          localStorage.setItem('username', username);
          setUser({ username });
          setPage('home');
        } else {
          setPage('login');
        }
      } else {
        if (data.username) setError('Ye username pehle se mojood hai.');
        else setError('Signup nahi ho saka. Dobara koshish karein.');
      }
    } catch (err) {
      setError('Server se connect nahi ho saka. Django server chalu hai?');
    }
    setLoading(false);
  };

  return (
    <div className="container py-12 flex justify-center">
      <div className="w-full max-w-md bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-2">Create account</h1>
        <p className="text-[#8B96A5] text-sm mb-6">Naya account banayein</p>

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
            placeholder="Choose a username"
          />
        </div>

        <label className="block text-sm text-[#505050] mb-1">Email (optional)</label>
        <div className="flex items-center border border-[#DEE2E7] rounded-md px-3 mb-4 focus-within:border-primary transition-colors">
          <Mail size={18} className="text-[#8B96A5]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <label className="block text-sm text-[#505050] mb-1">Password</label>
        <div className="flex items-center border border-[#DEE2E7] rounded-md px-3 mb-6 focus-within:border-primary transition-colors">
          <Lock size={18} className="text-[#8B96A5]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSignup(); }}
            className="w-full px-3 py-2 outline-none"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Sign up'}
        </button>

        <p className="text-sm text-[#505050] text-center mt-5">
          Pehle se account hai?{' '}
          <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => setPage('login')}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;