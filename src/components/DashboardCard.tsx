
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import StatusChip from './StatusChip';
import { Maximize2, Minimize2 } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  chip?: {
    label: string;
    status: "success" | "warning" | "danger" | "info" | "neutral";
  };
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

const DashboardCard = ({
  title,
  children,
  chip,
  className,
  headerClassName,
  contentClassName,
  noPadding = false,
}: DashboardCardProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={cn(
      "dashboard-card flex flex-col relative",
      isFullScreen ? "fixed inset-4 z-50 bg-white m-0" : "",
      className
    )}>
      {/* Technical grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[linear-gradient(0deg,transparent_24px,#0EA5E9_25px,transparent_26px),linear-gradient(90deg,transparent_24px,#0EA5E9_25px,transparent_26px)]" style={{ backgroundSize: '25px 25px' }}></div>
      </div>
      
      <div className={cn(
        "flex justify-between items-center mb-4 z-10",
        headerClassName
      )}>
        <div className="flex items-center space-x-2">
          {chip && (
            <StatusChip 
              status={chip.status} 
              label={chip.label} 
              className="mb-0" 
              pulsing={chip.status === "success"}
            />
          )}
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <button 
          className="text-neutral-500 hover:text-blue transition-colors p-1 rounded-md hover:bg-neutral-100"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
      <div className={cn(
        "flex-1 relative z-10",
        !noPadding && "mt-2",
        contentClassName
      )}>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
