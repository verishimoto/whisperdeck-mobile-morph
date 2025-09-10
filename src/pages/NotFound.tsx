import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="mb-8">
          <span className="text-8xl opacity-50">🔮</span>
        </div>
        <h1 className="text-6xl font-display font-black bg-gradient-brand bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground font-medium mb-8">
          Oops! This prompt doesn't exist in our collection
        </p>
        <Button 
          onClick={() => window.location.href = "/"} 
          className="bg-gradient-brand text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-brand hover:shadow-glow transition-smooth"
        >
          Return to Hack Prompts
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
