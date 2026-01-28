import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CustomCursor } from "@/components/CustomCursor";
import { SelectionProvider } from "@/contexts/SelectionContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { ArchitectProvider } from "@/contexts/ArchitectContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PerformanceProvider } from "@/contexts/PerformanceContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <PerformanceProvider>
          <AuthProvider>
            <ArchitectProvider>
              <GamificationProvider>
                <SelectionProvider>
                  <FavoritesProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <CustomCursor />
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </FavoritesProvider>
                </SelectionProvider>
              </GamificationProvider>
            </ArchitectProvider>
          </AuthProvider>
        </PerformanceProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
