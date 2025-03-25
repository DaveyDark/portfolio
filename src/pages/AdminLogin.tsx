import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import pageTransition from '../components/pageTransition';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await loginAdmin(password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <h1 className="text-4xl text-yellow-400 uppercase font-semibold">Admin Login</h1>
      
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-yellow-400">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 rounded p-2 text-white"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button 
            type="submit" 
            className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default pageTransition(AdminLogin); 