
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { animateValue, easings } from "@/utils/animation";

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  animate?: boolean;
  className?: string;
}

const ProgressBar = ({
  progress,
  color = "bg-blue-light",
  height = 6,
  label,
  showPercentage = false,
  animate = true,
  className,
}: ProgressBarProps) => {
  const [displayedProgress, setDisplayedProgress] = useState(animate ? 0 : progress);
  
  useEffect(() => {
    if (animate) {
      animateValue(
        displayedProgress,
        progress,
        800,
        (value) => setDisplayedProgress(value),
        easings.easeOutCubic
      );
    } else {
      setDisplayedProgress(progress);
    }
  }, [progress, animate]);

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1 text-sm">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="font-medium">{Math.round(displayedProgress)}%</span>
          )}
        </div>
      )}
      <div 
        className="progress-bg" 
        style={{ height: `${height}px` }}
      >
        <div
          className={cn("progress-fill", color)}
          style={{ width: `${displayedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
