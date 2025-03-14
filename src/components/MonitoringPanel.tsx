
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Eye, Image, AlertCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StatusChip from './StatusChip';
import { animateValue, easings } from '@/utils/animation';

interface MonitoringPanelProps {
  className?: string;
}

const MonitoringPanel = ({ className }: MonitoringPanelProps) => {
  const [droneStatus, setDroneStatus] = useState<'standby' | 'scanning' | 'returning'>('scanning');
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [imagesProcessed, setImagesProcessed] = useState(0);
  const [defectsFound, setDefectsFound] = useState(0);
  const [scanProgress, setScanProgress] = useState(65);
  const [activeAlgorithm, setActiveAlgorithm] = useState('DeepCrack CNN');
  
  // Simulate live monitoring data
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImagesProcessed(prev => {
        const newValue = prev + Math.floor(Math.random() * 3) + 1;
        return newValue;
      });
    }, 4000);
    
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        // Slowly drain battery
        const newValue = Math.max(0, prev - (Math.random() * 0.5));
        return parseFloat(newValue.toFixed(1));
      });
    }, 10000);
    
    const defectInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setDefectsFound(prev => prev + 1);
      }
    }, 15000);
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setDroneStatus('returning');
          return 100;
        }
        return Math.min(100, prev + (Math.random() * 2));
      });
    }, 3000);
    
    return () => {
      clearInterval(imageInterval);
      clearInterval(batteryInterval);
      clearInterval(defectInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Counter animation for processed images
  const [displayedImages, setDisplayedImages] = useState(0);
  const [displayedDefects, setDisplayedDefects] = useState(0);
  
  useEffect(() => {
    animateValue(
      displayedImages,
      imagesProcessed,
      1000,
      value => setDisplayedImages(Math.floor(value)),
      easings.easeOutCubic
    );
  }, [imagesProcessed, displayedImages]);
  
  useEffect(() => {
    animateValue(
      displayedDefects,
      defectsFound,
      1000,
      value => setDisplayedDefects(Math.floor(value)),
      easings.easeOutCubic
    );
  }, [defectsFound, displayedDefects]);

  return (
    <div className={cn("h-full", className)}>
      {/* Drone Status */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-sm font-medium">Current Drone Status</h4>
          <p className="text-xs text-neutral-500">Mission #1042</p>
        </div>
        <StatusChip 
          status={droneStatus === 'scanning' ? 'info' : droneStatus === 'returning' ? 'warning' : 'neutral'}
          label={droneStatus === 'scanning' ? 'Scanning' : droneStatus === 'returning' ? 'Returning' : 'Standby'}
          pulsing={droneStatus === 'scanning'}
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-4">
        <ProgressBar 
          label="Scan Progress" 
          progress={scanProgress} 
          showPercentage={true}
          color={scanProgress < 50 ? "bg-blue-light" : scanProgress < 90 ? "bg-warning" : "bg-success"}
        />
        <ProgressBar 
          label="Battery Level" 
          progress={batteryLevel} 
          showPercentage={true}
          color={batteryLevel > 50 ? "bg-success" : batteryLevel > 20 ? "bg-warning" : "bg-danger"}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-neutral-50/50 border border-neutral-200/70 rounded-lg">
          <div className="flex items-center mb-1.5">
            <Image className="w-4 h-4 text-blue-light mr-1.5" />
            <h5 className="text-sm font-medium">Images</h5>
          </div>
          <p className="text-xl font-semibold">{displayedImages}</p>
          <p className="text-xs text-neutral-500 mt-1">Processed</p>
        </div>
        <div className="p-3 bg-neutral-50/50 border border-neutral-200/70 rounded-lg">
          <div className="flex items-center mb-1.5">
            <AlertCircle className="w-4 h-4 text-danger mr-1.5" />
            <h5 className="text-sm font-medium">Defects</h5>
          </div>
          <p className="text-xl font-semibold">{displayedDefects}</p>
          <p className="text-xs text-neutral-500 mt-1">Detected</p>
        </div>
      </div>

      {/* Active Algorithm */}
      <div className="p-3 border border-blue-light/20 bg-blue-light/5 rounded-lg mb-4">
        <div className="flex items-center mb-1">
          <Activity className="w-4 h-4 text-blue-light mr-1.5" />
          <h5 className="text-sm font-medium">Active Algorithm</h5>
        </div>
        <p className="text-sm">{activeAlgorithm}</p>
        <div className="flex items-center mt-1.5">
          <Eye className="w-3 h-3 text-blue-light mr-1" />
          <p className="text-xs text-neutral-500">Real-time detection active</p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center mt-auto pt-2">
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-light text-white shadow-sm transition duration-300 hover:bg-blue hover:shadow-md">
          View Live Feed
        </button>
      </div>
    </div>
  );
};

export default MonitoringPanel;
