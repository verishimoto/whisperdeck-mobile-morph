import { useState, useEffect } from 'react';
import { useArchitect } from '@/contexts/ArchitectContext';
import { X } from 'lucide-react';

export function ArchitectGate() {
  const { showGate, setShowGate, checkPassword, isArchitect } = useArchitect();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // If architect just authenticated, show welcome
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowGate(false);
          setShowWelcome(false);
          setIsClosing(false);
        }, 500);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showWelcome, setShowGate]);

  if (!showGate || isArchitect) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setError(false);
      setShowWelcome(true);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowGate(false);
      setIsClosing(false);
    }, 300);
  };

  // Welcome screen for architect
  if (showWelcome) {
    return (
      <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <div className="relative z-10 text-center animate-scale-in">
          {/* Animated Wizard Hat */}
          <div className="mb-8 relative">
            <svg 
              className="w-32 h-32 mx-auto wizard-hat-animated" 
              viewBox="0 0 100 100" 
              fill="none"
            >
              <defs>
                <linearGradient id="opal-gradient-hat" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7">
                    <animate attributeName="stop-color" values="#a855f7;#06b6d4;#ec4899;#10b981;#3b82f6;#a855f7" dur="4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#06b6d4">
                    <animate attributeName="stop-color" values="#06b6d4;#ec4899;#10b981;#3b82f6;#a855f7;#06b6d4" dur="4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#ec4899">
                    <animate attributeName="stop-color" values="#ec4899;#10b981;#3b82f6;#a855f7;#06b6d4;#ec4899" dur="4s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Hat cone */}
              <path 
                d="M50 8 L85 75 L15 75 Z" 
                fill="url(#opal-gradient-hat)" 
                filter="url(#glow)"
                opacity="0.9"
              />
              {/* Hat brim */}
              <ellipse 
                cx="50" 
                cy="78" 
                rx="42" 
                ry="12" 
                fill="url(#opal-gradient-hat)"
                filter="url(#glow)"
              />
              {/* Star decorations */}
              <circle cx="42" cy="35" r="2" fill="white" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="45" r="1.5" fill="white" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="48" cy="55" r="2.5" fill="white" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="55" cy="28" r="1.8" fill="white" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          <h2 className="font-display text-3xl font-bold text-white mb-2">
            Welcome, <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">Verishimoto</span>
          </h2>
          <p className="text-white/60 font-body">Architect Mode Activated</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={handleClose} />
      
      <div className="relative z-10 w-full max-w-md mx-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-scale-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
        >
          <X className="h-4 w-4 text-white/70" />
        </button>

        {/* Wizard hat icon */}
        <div className="text-center mb-6">
          <svg 
            className="w-16 h-16 mx-auto opacity-60" 
            viewBox="0 0 100 100" 
            fill="none"
          >
            <defs>
              <linearGradient id="opal-gradient-small" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path d="M50 8 L85 75 L15 75 Z" fill="url(#opal-gradient-small)" opacity="0.8" />
            <ellipse cx="50" cy="78" rx="42" ry="12" fill="url(#opal-gradient-small)" />
          </svg>
        </div>

        <h2 className="font-display text-xl font-semibold text-white text-center mb-2">
          Architect Access
        </h2>
        <p className="text-white/50 text-sm text-center mb-6 font-body">
          Enter the passphrase to continue...
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="The architect's password..."
            className={`w-full px-4 py-3 bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/20'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all font-mono text-sm`}
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-xs mt-2 text-center">Incorrect passphrase</p>
          )}
          
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 border border-white/20 rounded-xl text-white font-medium hover:from-purple-500/30 hover:via-cyan-500/30 hover:to-pink-500/30 hover:border-white/30 transition-all"
          >
            Enter
          </button>
        </form>

        <p className="text-white/30 text-xs text-center mt-4 font-body">
          Close to continue as guest
        </p>
      </div>
    </div>
  );
}
