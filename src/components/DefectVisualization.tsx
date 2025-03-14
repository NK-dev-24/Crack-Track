
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import StatusChip from './StatusChip';

// Define types for defect data
interface Defect {
  id: string;
  location: string;
  severity: 'Low' | 'Moderate' | 'High';
  type: string;
  coordinates: { x: number; y: number };
  size: number;
}

interface DefectVisualizationProps {
  className?: string;
}

const DefectVisualization = ({ className }: DefectVisualizationProps) => {
  // Sample defect data
  const defects: Defect[] = [
    { 
      id: 'CR001', 
      location: 'West Support Beam', 
      severity: 'High', 
      type: 'Structural Crack',
      coordinates: { x: 25, y: 45 },
      size: 12
    },
    { 
      id: 'CR002', 
      location: 'North Pillar', 
      severity: 'Moderate', 
      type: 'Surface Crack',
      coordinates: { x: 65, y: 30 },
      size: 8
    },
    { 
      id: 'CR003', 
      location: 'Main Deck', 
      severity: 'Low', 
      type: 'Hairline Crack',
      coordinates: { x: 75, y: 70 },
      size: 5
    },
  ];

  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (selectedDefect) {
      setShowDetails(true);
      const timer = setTimeout(() => setShowDetails(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedDefect]);

  const getSeverityColor = (severity: Defect['severity']) => {
    switch (severity) {
      case 'High': return 'bg-danger';
      case 'Moderate': return 'bg-warning';
      case 'Low': return 'bg-success';
      default: return 'bg-blue';
    }
  };

  const getSeverityChip = (severity: Defect['severity']) => {
    switch (severity) {
      case 'High': return <StatusChip status="danger" label="High" />;
      case 'Moderate': return <StatusChip status="warning" label="Moderate" />;
      case 'Low': return <StatusChip status="success" label="Low" />;
      default: return null;
    }
  };

  return (
    <div className={cn("h-full", className)}>
      <div className="relative h-[230px] bg-neutral-100 rounded-lg overflow-hidden mb-4">
        {/* Bridge image with markers */}
        <div className="absolute inset-0 opacity-90">
          <img 
            src="https://images.unsplash.com/photo-1433086966358-54859d0ed716" 
            alt="Bridge with detected cracks"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay and defect markers */}
        <div className="absolute inset-0 bg-neutral-900/10">
          {defects.map((defect) => (
            <button
              key={defect.id}
              className={cn(
                "absolute rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                getSeverityColor(defect.severity),
                selectedDefect?.id === defect.id ? "z-10 scale-125" : "z-0"
              )}
              style={{ 
                left: `${defect.coordinates.x}%`, 
                top: `${defect.coordinates.y}%`,
                width: `${defect.size}px`,
                height: `${defect.size}px`,
              }}
              onClick={() => setSelectedDefect(defect)}
            />
          ))}
        </div>

        {/* Detail popup */}
        {selectedDefect && showDetails && (
          <div 
            className="absolute glass-card p-3 z-20 animate-fade-in text-left"
            style={{ 
              left: `${Math.min(Math.max(selectedDefect.coordinates.x, 20), 80)}%`, 
              top: `${Math.min(Math.max(selectedDefect.coordinates.y + 10, 20), 80)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm">{selectedDefect.id}</h4>
              {getSeverityChip(selectedDefect.severity)}
            </div>
            <p className="text-xs">{selectedDefect.location}</p>
            <p className="text-xs text-neutral-500">{selectedDefect.type}</p>
          </div>
        )}
      </div>

      {/* Defect list */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm border-b border-neutral-200 pb-2">Detected Defects</h4>
        {defects.map((defect) => (
          <div 
            key={defect.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-300 ease-apple cursor-pointer",
              selectedDefect?.id === defect.id
                ? "border-blue-light bg-blue-light/5"
                : "border-neutral-200 hover:border-blue-light/50"
            )}
            onClick={() => setSelectedDefect(defect)}
          >
            <div className="flex items-center justify-between">
              <h5 className="font-medium">{defect.id}</h5>
              {getSeverityChip(defect.severity)}
            </div>
            <p className="text-sm text-neutral-600 mt-1">{defect.location}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{defect.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefectVisualization;
