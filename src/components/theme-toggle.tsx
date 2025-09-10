import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const isDark = theme === 'dark'
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center gap-3">
      <Sun className={`h-4 w-4 transition-smooth ${isDark ? 'text-muted-foreground' : 'text-brand-yellow'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-brand-purple data-[state=unchecked]:bg-brand-yellow"
      />
      <Moon className={`h-4 w-4 transition-smooth ${isDark ? 'text-brand-cyan' : 'text-muted-foreground'}`} />
    </div>
  )
}