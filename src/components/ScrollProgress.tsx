interface ScrollProgressProps {
  progress: number;
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      <div className="w-px h-24 bg-border relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-primary transition-all duration-100"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground font-body tracking-wider -rotate-90 origin-center mt-6">
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}
