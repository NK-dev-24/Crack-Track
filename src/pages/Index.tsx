
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import BridgeModel from '@/components/BridgeModel';
import DefectVisualization from '@/components/DefectVisualization';
import ThermalAnomalyPanel from '@/components/ThermalAnomalyPanel';
import MonitoringPanel from '@/components/MonitoringPanel';
import ReportPanel from '@/components/ReportPanel';
import AIInsightsPanel from '@/components/AIInsightsPanel';
import DashboardCard from '@/components/DashboardCard';
import StatusChip from '@/components/StatusChip';
import { staggerAnimation } from '@/utils/animation';
import { Battery, Cpu, Calendar, Clock, ArrowRight, History, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionProgress, setInspectionProgress] = useState(0);
  const [inspectionComplete, setInspectionComplete] = useState(false);
  
  // Handle start inspection button click
  const handleStartInspection = () => {
    if (isInspecting) return;
    
    setIsInspecting(true);
    setInspectionProgress(0);
    setInspectionComplete(false);
    
    toast.info('Inspection started', {
      description: 'Drone is taking off and preparing for bridge inspection',
      duration: 5000,
    });
    
    // Simulate inspection progress
    const interval = setInterval(() => {
      setInspectionProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        
        // Provide updates at certain milestones
        if (prev < 25 && newProgress >= 25) {
          toast.info('Scanning north section', {
            description: 'Capturing high-resolution images of bridge supports',
          });
        } else if (prev < 50 && newProgress >= 50) {
          toast.info('Scanning central section', {
            description: 'Analyzing structural integrity of main span',
          });
        } else if (prev < 75 && newProgress >= 75) {
          toast.warning('Potential defect detected', {
            description: 'Crack identified in east support beam',
            icon: <AlertTriangle className="h-4 w-4" />,
          });
        }
        
        // Complete the inspection
        if (newProgress >= 100) {
          clearInterval(interval);
          setInspectionComplete(true);
          setIsInspecting(false);
          
          toast.success('Inspection complete', {
            description: '3 defects found. Report is being generated.',
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  };
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Apply staggered animation to dashboard cards
      const cards = Array.from(document.querySelectorAll('.dashboard-card'));
      staggerAnimation(
        cards as HTMLElement[],
        100,
        (element) => {
          element.classList.add('animate-scale-in');
        }
      );
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 relative">
      {/* Technical grid background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(0deg,transparent_24px,#000_25px,transparent_26px),linear-gradient(90deg,transparent_24px,#000_25px,transparent_26px)]" style={{ backgroundSize: '25px 25px' }}></div>
      </div>
      
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-light border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600 font-medium">Loading CrackTrack Dashboard</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4 md:px-6">
          {/* Status Bar */}
          <div className="mb-2 py-1 px-3 bg-neutral-900/5 text-xs text-neutral-700 rounded-md flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-1.5"></div>
                <span>System: Online</span>
              </div>
              <div className="flex items-center">
                <Battery className="w-3.5 h-3.5 mr-1 text-success" />
                <span>Battery: 78%</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>Last Updated: 5m ago</span>
              </div>
            </div>
            <div className="flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1 text-blue-light" />
              <span>AI: Active</span>
            </div>
          </div>
          
          {/* Inspection Progress Bar - Only show when inspection is in progress */}
          {isInspecting && (
            <div className="mb-4 p-3 bg-blue-light/10 rounded-lg border border-blue-light/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-dark">Inspection in Progress</span>
                <span className="text-xs font-medium text-blue-dark">{Math.round(inspectionProgress)}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-light rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${inspectionProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-neutral-600">
                Drone is scanning the bridge and collecting data...
              </p>
            </div>
          )}
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className="chip bg-blue-light/10 text-blue-dark mb-2">AI-Powered Drone Bridge Inspection</div>
                <h1 className="text-3xl font-semibold tracking-tight mb-1 text-blue-dark">CrackTrack Dashboard</h1>
                <p className="text-neutral-500 italic">Inspection made simple with drone automation</p>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="glass-card px-3 py-1.5 mb-4 text-xs border-l-4 border-l-success">
                  <div className="font-semibold mb-0.5">Cost Savings</div>
                  <div className="flex items-center space-x-2">
                    <div>
                      <span className="text-success font-bold">40%</span> cost reduction
                    </div>
                    <div className="w-px h-3 bg-neutral-300"></div>
                    <div>
                      <span className="text-success font-bold">70%</span> faster inspections
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 hover:border-blue-light/50 hover:bg-blue-light/5 transition-all duration-300 text-blue-dark">
                    <History className="w-4 h-4 mr-1.5" />
                    Analysis History
                  </button>
                  <button 
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow ${
                      isInspecting ? 'bg-neutral-400 text-white cursor-not-allowed' : 'bg-blue-light text-white hover:bg-blue'
                    }`}
                    onClick={handleStartInspection}
                    disabled={isInspecting}
                  >
                    {isInspecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></div>
                        Inspection in Progress...
                      </>
                    ) : (
                      <>
                        Start New Inspection
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First Column */}
            <div className="space-y-6">
              <DashboardCard 
                title="Bridge Structure Analysis"
                chip={{ label: "3D Model", status: "info" }}
                className="min-h-[450px]"
              >
                <BridgeModel />
              </DashboardCard>
              
              <DashboardCard 
                title="Real-Time Monitoring"
                chip={{ label: "Live", status: "success" }}
                className="min-h-[400px]"
              >
                <MonitoringPanel />
              </DashboardCard>
            </div>
            
            {/* Second Column */}
            <div className="space-y-6">
              <DashboardCard 
                title="Crack Detection"
                chip={{ label: "Critical", status: "danger" }}
                className="min-h-[500px]"
              >
                <DefectVisualization />
              </DashboardCard>
              
              <DashboardCard 
                title="AI Model Insights"
                chip={{ label: "Deep Learning", status: "info" }}
                className="min-h-[350px]"
              >
                <AIInsightsPanel />
              </DashboardCard>
            </div>
            
            {/* Third Column */}
            <div className="space-y-6">
              <DashboardCard 
                title="Thermal Anomaly Detection"
                chip={{ label: "Warning", status: "warning" }}
                className="min-h-[400px]"
              >
                <ThermalAnomalyPanel />
              </DashboardCard>
              
              <DashboardCard 
                title="Report Generation"
                chip={{ label: "Ready", status: "neutral" }}
                className="min-h-[450px]"
              >
                <ReportPanel />
              </DashboardCard>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-neutral-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-neutral-500">CrackTrack AI © 2025 • Bridge Monitoring Platform</p>
              <div className="mt-4 md:mt-0 flex items-center space-x-6">
                <button className="text-sm text-neutral-500 hover:text-blue-light transition-colors">Documentation</button>
                <button className="text-sm text-neutral-500 hover:text-blue-light transition-colors">Support</button>
                <button className="text-sm text-neutral-500 hover:text-blue-light transition-colors">Settings</button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
