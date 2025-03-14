
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import StatusChip from './StatusChip';

interface BridgeModelProps {
  className?: string;
}

const BridgeModel = ({ className }: BridgeModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Bridge data
  const bridgeData = {
    id: "B001",
    name: "Golden Gate Bridge",
    location: "San Francisco, CA",
    lastInspection: "03/14/2025",
    status: "Inspection Complete",
    constructionYear: 1937,
    length: "1.7 miles",
    type: "Suspension Bridge",
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Auto rotation when not dragging
    const autoRotate = setInterval(() => {
      if (!isDragging) {
        setRotateAngle((prev) => (prev + 0.1) % 360);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(autoRotate);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotateAngle((prev) => prev + deltaX * 0.5);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div 
        ref={containerRef}
        className="model-container bg-neutral-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-light border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-neutral-500">Loading 3D Model...</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simulated 3D bridge model with CSS */}
            <div 
              className="relative w-[70%] h-[40%] perspective-800 transform-gpu transition-all duration-500 ease-apple"
              style={{ transform: `rotateY(${rotateAngle}deg)` }}
            >
              {/* Bridge deck */}
              <div className="absolute top-[40%] left-0 w-full h-[10%] bg-neutral-300 shadow-md transform-gpu"></div>
              
              {/* Left tower */}
              <div className="absolute bottom-0 left-[15%] w-[5%] h-[100%] bg-neutral-800 shadow-md transform-gpu"></div>
              
              {/* Right tower */}
              <div className="absolute bottom-0 right-[15%] w-[5%] h-[100%] bg-neutral-800 shadow-md transform-gpu"></div>
              
              {/* Main suspension cable - left side */}
              <div className="absolute top-[0%] left-[15%] w-[35%] h-[1px] bg-neutral-600 shadow-sm transform-gpu origin-left"
                style={{ transform: 'rotate(10deg)' }}></div>
              
              {/* Main suspension cable - right side */}
              <div className="absolute top-[0%] right-[15%] w-[35%] h-[1px] bg-neutral-600 shadow-sm transform-gpu origin-right"
                style={{ transform: 'rotate(-10deg)' }}></div>
              
              {/* Vertical suspension cables */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-[1px] h-[40%] bg-neutral-500 transform-gpu"
                  style={{ 
                    left: `${18 + i * 6}%`, 
                    top: `${5 + Math.sin(i * 0.5) * 5}%` 
                  }}
                ></div>
              ))}

              {/* Defect markers */}
              <div className="absolute top-[37%] left-[30%] w-3 h-3 bg-danger rounded-full animate-pulse-opacity shadow-sm transform-gpu"></div>
              <div className="absolute top-[38%] left-[65%] w-3 h-3 bg-warning rounded-full animate-pulse-opacity shadow-sm transform-gpu"></div>
            </div>

            {/* Interactive hint */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-neutral-500 pointer-events-none">
              Drag to rotate model
            </div>
          </div>
        )}
      </div>

      {/* Bridge information */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Bridge ID: {bridgeData.id}</h4>
          <StatusChip status="success" label={bridgeData.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
          <div className="text-sm">
            <span className="text-neutral-500">Location:</span>
            <p className="font-medium">{bridgeData.location}</p>
          </div>
          <div className="text-sm">
            <span className="text-neutral-500">Last Inspection:</span>
            <p className="font-medium">{bridgeData.lastInspection}</p>
          </div>
          <div className="text-sm">
            <span className="text-neutral-500">Length:</span>
            <p className="font-medium">{bridgeData.length}</p>
          </div>
          <div className="text-sm">
            <span className="text-neutral-500">Built:</span>
            <p className="font-medium">{bridgeData.constructionYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeModel;
