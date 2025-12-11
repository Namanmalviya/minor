import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrganizationSelector from './components/OrganizationSelector';
import ComparisonMatrix from './components/ComparisonMatrix';
import ComparisonRadarChart from './components/RadarChart';
import RankingLeaderboard from './components/RankingLeaderboard';
import ExportReports from './components/ExportReports';

const BenchmarkingComparison = () => {
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [activeTab, setActiveTab] = useState('comparison');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOrganizationSelect = (organization) => {
    if (selectedOrganizations?.length < 5 && !selectedOrganizations?.find(org => org?.id === organization?.id)) {
      setSelectedOrganizations([...selectedOrganizations, organization]);
    }
  };

  const handleRemoveOrganization = (organizationId) => {
    setSelectedOrganizations(selectedOrganizations?.filter(org => org?.id !== organizationId));
  };

  const clearAllSelections = () => {
    setSelectedOrganizations([]);
  };

  const tabs = [
    { id: 'comparison', label: 'Comparison Matrix', icon: 'Grid3X3' },
    { id: 'radar', label: 'Radar Analysis', icon: 'Target' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy' },
    { id: 'reports', label: 'Export Reports', icon: 'FileText' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading benchmarking data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Benchmarking Comparison</h1>
                <p className="text-muted-foreground max-w-2xl">
                  Compare innovation performance across organizations, analyze competitive positioning, 
                  and identify improvement opportunities through comprehensive benchmarking analysis.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {selectedOrganizations?.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllSelections}
                    iconName="X"
                    iconPosition="left"
                  >
                    Clear All ({selectedOrganizations?.length})
                  </Button>
                )}
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Building2" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Organizations</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {selectedOrganizations?.length}/5
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} className="text-success" />
                  <span className="text-sm font-medium text-foreground">Metrics</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">20</div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Categories</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">5</div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Last Updated</span>
                </div>
                <div className="text-sm font-medium text-foreground mt-1">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Organization Selector - Sidebar */}
            <div className="xl:col-span-1">
              <OrganizationSelector
                selectedOrganizations={selectedOrganizations}
                onOrganizationSelect={handleOrganizationSelect}
                onRemoveOrganization={handleRemoveOrganization}
              />
            </div>

            {/* Analysis Content - Main Area */}
            <div className="xl:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'comparison' && (
                  <ComparisonMatrix selectedOrganizations={selectedOrganizations} />
                )}
                
                {activeTab === 'radar' && (
                  <ComparisonRadarChart selectedOrganizations={selectedOrganizations} />
                )}
                
                {activeTab === 'leaderboard' && (
                  <RankingLeaderboard selectedOrganizations={selectedOrganizations} />
                )}
                
                {activeTab === 'reports' && (
                  <ExportReports selectedOrganizations={selectedOrganizations} />
                )}
              </div>

              {/* Insights Panel */}
              {selectedOrganizations?.length > 1 && (
                <div className="mt-8 bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="TrendingUp" size={16} className="text-success" />
                        <span className="font-medium text-success">Top Performer</span>
                      </div>
                      <p className="text-sm text-foreground">
                        {selectedOrganizations?.[0]?.name} leads in R&D investment with 15.2% of revenue allocated to innovation activities.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span className="font-medium text-warning">Improvement Opportunity</span>
                      </div>
                      <p className="text-sm text-foreground">
                        Human capital development shows the largest performance gap across selected organizations.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Target" size={16} className="text-primary" />
                        <span className="font-medium text-primary">Benchmark Target</span>
                      </div>
                      <p className="text-sm text-foreground">
                        Industry average innovation score is 82.4, with top quartile performers exceeding 90.0.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Lightbulb" size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">Strategic Focus</span>
                      </div>
                      <p className="text-sm text-foreground">
                        Ecosystem partnerships and collaboration networks offer the highest ROI for innovation investment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkingComparison;