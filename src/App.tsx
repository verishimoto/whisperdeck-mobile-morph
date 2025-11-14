import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { SelectionProvider } from "@/contexts/SelectionContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GamificationProvider>
        <SelectionProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CustomCursor />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SelectionProvider>
      </GamificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
