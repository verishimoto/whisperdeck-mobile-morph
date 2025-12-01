import { useGamification } from '@/contexts/GamificationContext';
import { TrendingUp, Award, Zap, Minimize2, Maximize2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

export function ProgressDashboard() {
  const {
    dailyCopiesRemaining,
    totalPromptsUsed,
    chainsBuilt,
    currentLevel,
    getTimeUntilReset,
  } = useGamification();

  const [isMinimized, setIsMinimized] = useState(() => {
    const saved = localStorage.getItem('progressDashboardMinimized');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('progressDashboardMinimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

  const levelNames = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
  const levelColors = [
    'hsl(var(--level-essential))',
    'hsl(var(--level-strategy))',
    'hsl(var(--level-advanced))',
    'hsl(var(--level-master))',
    'hsl(var(--level-ultra))',
  ];

  const copyPercentage = (dailyCopiesRemaining / 5) * 100;

  return (
    <div className="fixed bottom-[300px] left-6 z-40 w-72 glass-card p-4 animate-in slide-in-from-bottom-4 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground/90 font-semibold text-sm flex items-center gap-2">
          <Award className="h-4 w-4" style={{ color: levelColors[currentLevel] }} />
          Progress
        </h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
          title={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? (
            <Maximize2 className="h-3 w-3 text-white/80" />
          ) : (
            <Minimize2 className="h-3 w-3 text-white/80" />
          )}
        </button>
      </div>

      {!isMinimized && (
        <>
          {/* Daily Copies Quota */}
          <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-foreground/60">Daily Copies</span>
          <span className="text-xs font-semibold text-foreground/90">
            {dailyCopiesRemaining}/5 remaining
          </span>
        </div>
        <Progress 
          value={copyPercentage} 
          className="h-2"
          style={{
            backgroundColor: 'hsl(var(--muted) / 0.3)',
          }}
        />
        {dailyCopiesRemaining === 0 && (
          <p className="text-xs text-destructive mt-2 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Resets in: {getTimeUntilReset()}
          </p>
        )}
      </div>

      {/* Level Badge */}
      <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-foreground/60">Current Level</span>
          <span 
            className="text-xs font-bold"
            style={{ color: levelColors[currentLevel] }}
          >
            {levelNames[currentLevel]}
          </span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className="flex-1 h-1 rounded-full transition-all"
              style={{
                backgroundColor: level <= currentLevel 
                  ? levelColors[level]
                  : 'hsl(var(--muted) / 0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-foreground/40" />
            <span className="text-xs text-foreground/60">Prompts Used</span>
          </div>
          <p className="text-lg font-bold text-foreground/90">
            {totalPromptsUsed.size}
          </p>
        </div>
        
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="h-3 w-3 text-foreground/40" />
            <span className="text-xs text-foreground/60">Chains Built</span>
          </div>
          <p className="text-lg font-bold text-foreground/90">
            {chainsBuilt}
          </p>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
