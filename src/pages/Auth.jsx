import { ArrowRight, Dumbbell, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const { login, navigate } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: email || 'alex@fitpulse.io', name: name || 'Alex Rivera' });
  };

  return (
    <div className="fp-app-bg flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FF6B47] opacity-[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8B5CF6] opacity-[0.04] blur-[100px]" />

      <div className="w-full max-w-[420px] animate-slide-up relative">
        {/* Logo */}
        <div className="mb-8 text-center">
          <button type="button" onClick={() => navigate('landing')} className="inline-flex items-center gap-2 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] shadow-[0_8px_24px_rgba(255,107,71,0.3)]">
              <Dumbbell size={18} strokeWidth={2.4} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[#f0f0f5] font-display">FitPulse</span>
          </button>
          <h1 className="text-3xl font-bold text-[#f0f0f5] font-display">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="mt-2 text-sm font-medium text-[#555b6e]">
            {isLogin ? 'Sign in to continue your training' : 'Start your fitness journey today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="fp-panel rounded-[22px] p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Full Name</label>
              <div className="relative">
                <User size={15} strokeWidth={2.3} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3f52]" />
                <input className="fp-input pl-10" placeholder="Alex Rivera" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Email</label>
            <div className="relative">
              <Mail size={15} strokeWidth={2.3} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3f52]" />
              <input className="fp-input pl-10" type="email" placeholder="alex@fitpulse.io" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#555b6e]">Password</label>
            <div className="relative">
              <Lock size={15} strokeWidth={2.3} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3f52]" />
              <input
                className="fp-input pl-10 pr-11"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3a3f52] hover:text-[#888ea0]">
                {showPassword ? <EyeOff size={15} strokeWidth={2.3} /> : <Eye size={15} strokeWidth={2.3} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs font-bold text-[#FF6B47] hover:text-[#FF8A5C] transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="fp-primary-btn w-full py-3.5">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={15} strokeWidth={2.4} />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs font-bold text-[#3a3f52]">OR</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <button type="button" onClick={handleSubmit}
            className="fp-secondary-btn w-full py-3">
            Continue with Google
          </button>
        </form>

        <p className="mt-5 text-center text-sm font-semibold text-[#555b6e]">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#FF6B47] hover:text-[#FF8A5C] transition-colors">
            {isLogin ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
