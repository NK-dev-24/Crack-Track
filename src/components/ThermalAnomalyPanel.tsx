
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatusChip from './StatusChip';
import { AlertTriangle, Thermometer, Info } from 'lucide-react';

interface ThermalZone {
  id: string;
  name: string;
  temperature: number;
  maxThreshold: number;
  status: 'normal' | 'warning' | 'critical';
}

interface ThermalAnomalyPanelProps {
  className?: string;
}

const ThermalAnomalyPanel = ({ className }: ThermalAnomalyPanelProps) => {
  const [thermalZones, setThermalZones] = useState<ThermalZone[]>([
    { id: 'Z1', name: 'North Support', temperature: 28, maxThreshold: 45, status: 'normal' },
    { id: 'Z2', name: 'Center Span', temperature: 42, maxThreshold: 45, status: 'warning' },
    { id: 'Z3', name: 'South Support', temperature: 32, maxThreshold: 45, status: 'normal' },
    { id: 'Z4', name: 'East Joint', temperature: 48, maxThreshold: 45, status: 'critical' },
    { id: 'Z5', name: 'West Joint', temperature: 30, maxThreshold: 45, status: 'normal' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThermalZones(prev => 
        prev.map(zone => {
          const fluctuation = (Math.random() * 4) - 2;
          const newTemp = Math.max(20, Math.min(55, zone.temperature + fluctuation));
          
          let newStatus: 'normal' | 'warning' | 'critical' = 'normal';
          if (newTemp >= zone.maxThreshold) {
            newStatus = 'critical';
          } else if (newTemp >= (zone.maxThreshold * 0.9)) {
            newStatus = 'warning';
          }
          
          return {
            ...zone,
            temperature: parseFloat(newTemp.toFixed(1)),
            status: newStatus
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const chartData = thermalZones.map(zone => ({
    name: zone.id,
    temperature: zone.temperature,
    threshold: zone.maxThreshold,
    fill: getTemperatureColor(zone.temperature, zone.maxThreshold)
  }));

  function getTemperatureColor(temp: number, threshold: number): string {
    const ratio = temp / threshold;
    if (ratio >= 1) return '#EF4444';
    if (ratio >= 0.9) return '#F59E0B';
    return '#0EA5E9';
  }

  function getStatusChip(status: ThermalZone['status']) {
    switch (status) {
      case 'critical': return <StatusChip status="danger" label="Critical" />;
      case 'warning': return <StatusChip status="warning" label="Warning" />;
      case 'normal': return <StatusChip status="success" label="Normal" />;
    }
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex items-center mb-2">
        <Thermometer className="w-4 h-4 text-warning-dark mr-1.5" />
        <p className="text-sm font-medium text-neutral-700">Bridge Temperature Analysis</p>
      </div>
      
      <div className="bg-blue-light/5 border border-blue-light/20 text-neutral-600 text-xs italic p-2 rounded-md mb-4 flex items-start">
        <Info className="w-3.5 h-3.5 mr-1.5 text-blue-light mt-0.5 flex-shrink-0" />
        <p>Thermal anomalies may indicate potential structural stress points or material fatigue.</p>
      </div>

      <div className="mb-4">
        <div className="h-[190px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -18, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }} 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid rgba(0, 0, 0, 0.1)', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                }}
                formatter={(value) => [`${value}°C`, 'Temperature']}
              />
              <Bar 
                dataKey="temperature" 
                radius={[4, 4, 0, 0]} 
                fill="#0EA5E9"
              />
              <Legend 
                payload={[
                  { value: 'Normal', type: 'square', color: '#0EA5E9' },
                  { value: 'Warning', type: 'square', color: '#F59E0B' },
                  { value: 'Critical', type: 'square', color: '#EF4444' }
                ]}
                verticalAlign="top"
                align="right"
                iconSize={8}
                wrapperStyle={{ fontSize: '10px' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        <h4 className="font-medium text-sm border-b border-neutral-200 pb-2">Zone Temperatures</h4>
        <div className="space-y-2.5">
          {thermalZones.map((zone) => (
            <div key={zone.id} className={cn(
              "flex items-center justify-between p-2 rounded",
              zone.status === 'critical' && "bg-danger-light/30",
              zone.status === 'warning' && "bg-warning-light/30"
            )}>
              <div>
                <p className="text-sm font-medium">{zone.name}</p>
                <p className="text-xs text-neutral-500">Zone {zone.id}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className={cn(
                  "text-sm font-medium",
                  zone.status === 'critical' && "text-danger font-bold",
                  zone.status === 'warning' && "text-warning-dark",
                )}>
                  {zone.temperature}°C
                  {zone.status === 'critical' && (
                    <AlertTriangle className="w-3 h-3 inline ml-1 text-danger animate-pulse" />
                  )}
                </p>
                {getStatusChip(zone.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200">
        <div className="flex justify-between items-center text-xs text-neutral-500">
          <span>Real-time measurements</span>
          <span>Max threshold: 45°C</span>
        </div>
      </div>
    </div>
  );
};

export default ThermalAnomalyPanel;
