
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Area,
  AreaChart
} from 'recharts';
import { Brain, CheckCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { animateValue, easings } from '@/utils/animation';

interface AIInsightsPanelProps {
  className?: string;
}

const AIInsightsPanel = ({ className }: AIInsightsPanelProps) => {
  // Model accuracy data
  const [accuracyValue, setAccuracyValue] = useState(0);
  const targetAccuracy = 95.2;

  useEffect(() => {
    // Animate accuracy value
    animateValue(
      0,
      targetAccuracy,
      2000,
      (value) => setAccuracyValue(value),
      easings.easeOutCubic
    );
  }, []);

  // Generate historical accuracy data
  const accuracyData = [
    { month: 'Sep', accuracy: 82.5 },
    { month: 'Oct', accuracy: 86.3 },
    { month: 'Nov', accuracy: 88.4 },
    { month: 'Dec', accuracy: 91.7 },
    { month: 'Jan', accuracy: 93.8 },
    { month: 'Feb', accuracy: targetAccuracy },
  ];

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-blue-light mr-2" />
          <h4 className="font-medium">DeepCrack CNN Performance</h4>
        </div>
        <div className="text-xs bg-success/10 text-success-dark px-2 py-0.5 rounded flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          Active
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="glass-card p-4 mb-4 text-center">
        <p className="text-sm text-neutral-600 mb-2">Detection Accuracy</p>
        <div className="text-3xl font-semibold text-blue">{accuracyValue.toFixed(1)}%</div>
        <p className="text-xs font-medium text-success-dark mt-1">Industry-leading accuracy, surpassing manual inspections</p>
      </div>

      {/* Accuracy Chart */}
      <div className="h-[160px] mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-neutral-500">Accuracy Trend (6 Months)</p>
          <div className="text-xs font-medium text-blue-dark">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            +15.3% improvement
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={accuracyData}
            margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              fontSize={10} 
              axisLine={false} 
              tickLine={false}
              label={{ value: 'Month (2024-2025)', position: 'insideBottom', offset: -5, fontSize: 10 }}
            />
            <YAxis 
              domain={[80, 100]} 
              fontSize={10} 
              axisLine={false} 
              tickLine={false}
              label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft', fontSize: 10 }}
            />
            <Tooltip 
              cursor={{ stroke: '#ddd' }} 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid rgba(0, 0, 0, 0.1)', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Accuracy']}
            />
            <Area 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#0EA5E9" 
              fillOpacity={1}
              fill="url(#accuracyGradient)"
              strokeWidth={2} 
              dot={{ r: 3, strokeWidth: 1 }} 
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Detection Capabilities */}
      <div className="flex-1">
        <p className="text-sm font-medium mb-2 border-b border-neutral-200 pb-1">Detection Capabilities</p>
        <div className="space-y-2">
          {[
            { feature: 'Structural Cracks (>0.2mm)', status: 'high', accuracy: '95.2%' },
            { feature: 'Surface Erosion', status: 'high', accuracy: '94.8%' },
            { feature: 'Support Deterioration', status: 'medium', accuracy: '89.3%' },
            { feature: 'Thermal Anomalies', status: 'high', accuracy: '98.1%' },
            { feature: 'Water Damage', status: 'medium', accuracy: '86.5%' },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-neutral-100 last:border-0">
              <div className="flex items-center">
                {item.status === 'high' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-success mr-2" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-warning mr-2" />
                )}
                <span className="text-sm">{item.feature}</span>
              </div>
              <span className={cn(
                "text-xs font-medium",
                item.status === 'high' ? "text-success" : "text-warning"
              )}>
                {item.accuracy}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200">
        <p className="text-xs text-neutral-500">
          The AI model continuously improves with each inspection, increasing detection accuracy and reliability.
        </p>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
