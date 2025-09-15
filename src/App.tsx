import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import { CustomCursor } from "./components/CustomCursor";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background relative">
              <CustomCursor />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
