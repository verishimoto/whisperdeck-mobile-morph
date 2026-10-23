import { Moon, Sun, Keyboard, User, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const meta = (user?.user_metadata ?? {}) as Record<string, string>;
  const displayName = meta.full_name || meta.name || user?.email?.split('@')[0] || '';
  const avatarUrl = meta.avatar_url || meta.picture || '';
  const initials = displayName.split(/[\s._-]+/).filter(Boolean).slice(0, 2).map(s => s[0]?.toUpperCase()).join('') || 'U';
  // Display-only greeting; grants no extra access.
  const isArchitectEmail = user?.email?.toLowerCase() === 'vg.contato@gmail.com';

  return (
    <>
      <header className="sticky top-0 z-50 liquid-glass-header border-b-0">
        {/* Top Bar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground header-brand">
              WhispererDeck
            </h1>
            <p className="hidden sm:block text-[10px] text-muted-foreground font-light tracking-widest uppercase mt-0.5">
              {totalPrompts} Advanced LLM Prompts
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isArchitectEmail && (
              <span className="hidden md:inline text-sm text-primary font-medium mr-1">Welcome, Architect!</span>
            )}
            {/* Keyboard Shortcuts */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowShortcuts(true)}
                  className="p-2.5 rounded-xl liquid-glass-button hidden md:flex"
                  data-cursor="hover"
                >
                  <Keyboard className="h-4 w-4 text-foreground/60 hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">Keyboard Shortcuts (⌘/)</p>
              </TooltipContent>
            </Tooltip>

            {/* User / Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full liquid-glass-button p-0.5" aria-label="Account menu" data-cursor="hover">
                    <Avatar className="h-9 w-9">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt="" referrerPolicy="no-referrer" />}
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/templates')}>Templates</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <button onClick={() => navigate('/auth')} className="p-2.5 rounded-xl liquid-glass-button" data-cursor="hover" aria-label="Sign in">
                    <User className="h-4 w-4 text-foreground/70 hover:text-foreground transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                  <p className="text-sm">Sign In</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Theme Toggle */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-xl liquid-glass-button"
                  data-cursor="hover"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">Toggle Theme (T)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      <KeyboardShortcutsModal 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </>
  );
}
