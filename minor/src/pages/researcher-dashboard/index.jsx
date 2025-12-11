import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import InnovationMap from './components/InnovationMap';
import SectorHeatmap from './components/SectorHeatmap';
import TrendingMetrics from './components/TrendingMetrics';
import FilterControls from './components/FilterControls';
import ResearchToolkit from './components/ResearchToolkit';
import PublicLeaderboard from './components/PublicLeaderboard';
import KnowledgeRepository from './components/KnowledgeRepositary';
import ExportTools from './components/ExportTools';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResearcherDashboard = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    // Apply filters to dashboard data
  };

  const quickStats = [
    {
      label: 'Total Organizations',
      value: '12,847',
      change: '+234',
      changeType: 'increase',
      icon: 'Building2'
    },
    {
      label: 'Active Researchers',
      value: '3,456',
      change: '+89',
      changeType: 'increase',
      icon: 'Users'
    },
    {
      label: 'Data Points',
      value: '2.4M',
      change: '+12.3K',
      changeType: 'increase',
      icon: 'Database'
    },
    {
      label: 'Research Papers',
      value: '1,247',
      change: '+23',
      changeType: 'increase',
      icon: 'BookOpen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Dashboard Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Researcher Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive analytics and research tools for innovation excellence data
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {currentTime?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Globe" size={16} />
                    <span>Global Dataset</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0 flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Refresh Data
                </Button>
                <Button>
                  <Icon name="Download" size={16} className="mr-2" />
                  Quick Export
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {quickStats?.map((stat, index) => (
                <div key={index} className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat?.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon 
                          name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                          size={14} 
                          className={stat?.changeType === 'increase' ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-sm ${stat?.changeType === 'increase' ? 'text-success' : 'text-error'}`}>
                          {stat?.change}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={stat?.icon} size={24} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filter Controls */}
          <div className="mb-8">
            <FilterControls onFiltersChange={handleFiltersChange} />
          </div>

          {/* Innovation Landscape Overview */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2">
              <InnovationMap />
            </div>
            <div>
              <TrendingMetrics />
            </div>
          </div>

          {/* Sector Analysis */}
          <div className="mb-8">
            <SectorHeatmap />
          </div>

          {/* Research Tools and Leaderboard */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ResearchToolkit />
            <PublicLeaderboard />
          </div>

          {/* Knowledge Repository */}
          <div className="mb-8">
            <KnowledgeRepository />
          </div>

          {/* Export Tools */}
          <div className="mb-8">
            <ExportTools />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} color="white" />
                  </div>
                  <span className="font-semibold text-foreground">Innovation Excellence</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Empowering research and innovation through comprehensive data analytics and insights.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Research Tools</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Dataset Access</a></li>
                  <li><a href="#" className="hover:text-foreground">API Documentation</a></li>
                  <li><a href="#" className="hover:text-foreground">Analysis Tools</a></li>
                  <li><a href="#" className="hover:text-foreground">Export Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Knowledge Base</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Research Papers</a></li>
                  <li><a href="#" className="hover:text-foreground">Case Studies</a></li>
                  <li><a href="#" className="hover:text-foreground">Best Practices</a></li>
                  <li><a href="#" className="hover:text-foreground">Industry Reports</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact Support</a></li>
                  <li><a href="#" className="hover:text-foreground">Community Forum</a></li>
                  <li><a href="#" className="hover:text-foreground">Training Resources</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Innovation Excellence Portal. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Data Usage</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ResearcherDashboard;