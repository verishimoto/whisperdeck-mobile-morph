import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Placeholder for Supabase Auth integration with Vertex AI Prompt Caching
    // This will be configured to optimize token usage through cached instructions
    setTimeout(() => {
      toast({
        title: "Authentication Ready",
        description: "Connected to Vertex AI with Prompt Caching enabled.",
      });
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background Opal Effects */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsla(var(--opal-purple), 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, hsla(var(--opal-cyan), 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsla(var(--opal-pink), 0.1) 0%, transparent 70%)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Login Card - Glassmorphism */}
      <div 
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(168, 85, 247, 0.1)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-8 w-8 text-[hsl(var(--opal-purple))]" />
            <h1 
              className="text-3xl font-bold"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--opal-purple)), 
                  hsl(var(--opal-cyan)))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              WhispererDeck
            </h1>
          </div>
          <p className="text-white/60 text-sm">
            Level 4 AI Architect Platform
          </p>
          <p className="text-white/40 text-xs mt-2">
            Prompt Caching optimized for Vertex AI
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="architect@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[hsl(var(--opal-purple))] focus:ring-[hsl(var(--opal-purple))]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80 text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[hsl(var(--opal-purple))] focus:ring-[hsl(var(--opal-purple))]"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[hsl(var(--opal-purple))] to-[hsl(var(--opal-cyan))] hover:opacity-90 text-white font-medium"
          >
            {isLoading ? "Authenticating..." : "Enter the Deck"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/50">
            PaaS for Socratic Prompt Chains
          </p>
          <p className="text-xs text-white/40 mt-1">
            Vertex AI • LangChain • AutoGen Ready
          </p>
        </div>
      </div>
    </div>
  );
}
