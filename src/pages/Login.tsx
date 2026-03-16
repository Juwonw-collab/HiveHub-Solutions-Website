import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Hexagon, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/crm');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <Hexagon className="w-8 h-8 text-accent fill-accent/20" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Member Portal</h1>
          <p className="text-muted mb-8">Sign in to access your HiveHub CRM dashboard.</p>
          
          <button 
            onClick={login}
            className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg font-medium"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
          
          <p className="mt-6 text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
