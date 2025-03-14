
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "danger" | "info" | "neutral";

interface StatusChipProps {
  status: StatusType;
  label: string;
  className?: string;
  pulsing?: boolean;
}

export const StatusChip = ({ status, label, className, pulsing = false }: StatusChipProps) => {
  const statusClasses = {
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark",
    danger: "bg-danger-light text-danger-dark",
    info: "bg-blue-light/20 text-blue-dark",
    neutral: "bg-neutral-200 text-neutral-700",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusClasses[status],
        pulsing && "animate-pulse-opacity",
        className
      )}
    >
      {status === "success" && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success-dark"></span>
      )}
      {status === "warning" && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-warning-dark"></span>
      )}
      {status === "danger" && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-danger-dark"></span>
      )}
      {status === "info" && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-dark"></span>
      )}
      {label}
    </span>
  );
};

export default StatusChip;
