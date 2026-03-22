import { Leaf } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm transition-all duration-300">
      <div className="relative flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <Leaf className="h-8 w-8 text-primary-foreground animate-bounce" />
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Verdén
          </h2>
          <div className="flex items-center space-x-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
