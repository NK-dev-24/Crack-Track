
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileText, Download, CheckCircle, Calendar, Clock, List, BarChart, Thermometer, Wrench, Image } from 'lucide-react';

interface ReportPanelProps {
  className?: string;
}

const ReportPanel = ({ className }: ReportPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const handleGenerateReport = () => {
    if (isGenerating || isGenerated) return;
    
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3500);
  };
  
  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Preview Section */}
      <div className="flex-1 bg-neutral-50 rounded-lg border border-neutral-200 p-5 mb-5 flex flex-col items-center justify-center">
        {isGenerating ? (
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-2 border-blue-light border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">Generating Report...</p>
            <p className="text-xs text-neutral-500 mt-1">Compiling inspection data</p>
          </div>
        ) : isGenerated ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <FileText className="w-16 h-16 text-blue-light" />
              <CheckCircle className="w-6 h-6 text-success absolute bottom-0 right-0" />
            </div>
            <h4 className="font-medium">Inspection Report - B001</h4>
            <div className="flex items-center justify-center mt-2 space-x-3 text-xs text-neutral-500">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>03/14/2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>14:30 PST</span>
              </div>
            </div>
            <p className="text-xs bg-blue-light/10 mt-3 p-2 rounded text-blue-dark">
              <Image className="w-3 h-3 inline mr-1" />
              Includes defect images and maintenance recommendations
            </p>
          </div>
        ) : (
          <div className="text-center">
            <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm font-medium">Report Preview</p>
            <p className="text-xs text-neutral-500 mt-1">Click generate to compile inspection data</p>
          </div>
        )}
      </div>
      
      {/* Report Sections */}
      <div className="mb-4">
        <h4 className="font-medium text-sm border-b border-neutral-200 pb-2 mb-2">Report Sections</h4>
        <div className="space-y-2">
          {[
            { name: 'Structural Analysis', enabled: true, icon: List },
            { name: 'Defect Documentation', enabled: true, icon: Image },
            { name: 'Thermal Mapping', enabled: true, icon: Thermometer },
            { name: 'Maintenance Recommendations', enabled: true, icon: Wrench },
            { name: 'Historical Comparison', enabled: false, icon: BarChart },
          ].map((section, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <section.icon className="w-3.5 h-3.5 mr-2 text-blue-light" />
                <span className="text-sm">{section.name}</span>
              </div>
              <div className={cn(
                "w-3 h-3 rounded-full",
                section.enabled ? "bg-blue-light" : "bg-neutral-300"
              )} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-auto space-y-3">
        <button
          className={cn(
            "w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center",
            !isGenerated && !isGenerating ? "bg-blue-light hover:bg-blue hover:shadow-md" : "bg-neutral-300 cursor-not-allowed"
          )}
          onClick={handleGenerateReport}
          disabled={isGenerating || isGenerated}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Generating...
            </>
          ) : (
            "Generate Report"
          )}
        </button>
        
        <button
          className={cn(
            "w-full py-2.5 px-4 rounded-lg font-medium border transition-all duration-300 flex items-center justify-center",
            isGenerated 
              ? "border-blue-light text-blue-dark bg-blue-light/10 hover:bg-blue-light/20" 
              : "border-neutral-300 text-neutral-400 cursor-not-allowed"
          )}
          disabled={!isGenerated}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportPanel;
