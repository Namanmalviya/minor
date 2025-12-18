import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChartConfigPanel from './components/ChartConfigPanel';
import InteractiveChart from './components/InteractiveChart';
import FilterSidebar from './components/FilterSidebar';
import BenchmarkingTools from './components/BenchmarkingTools';
import TrendDetection from './components/TrendDetection';
import ExportTools from './components/ExportTools';
import ComparisonMode from './components/ComparisonMode';

const AnalyticsVisualization = () => {
  const navigate = useNavigate();
  const [chartConfig, setChartConfig] = useState({
    chartType: 'line',
    dataSource: 'rd_metrics',
    timeRange: '6m',
    colorScheme: 'blue',
    showGrid: true,
    showLegend: true,
    enableZoom: true
  });

  const [activeFilters, setActiveFilters] = useState({
    organizationType: '',
    sector: '',
    region: '',
    metrics: []
  });

  const [comparisonMode, setComparisonMode] = useState({
    active: false,
    type: 'organizations',
    items: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfigChange = (newConfig) => {
    setChartConfig(newConfig);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setActiveFilters({
        organizationType: '',
        sector: '',
        region: '',
        metrics: []
      });
    } else {
      setActiveFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleBenchmarkChange = (benchmarkType) => {
    console.log('Benchmark type changed:', benchmarkType);
  };

  const handleTrendSelect = (trend) => {
    setSelectedTrend(trend);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting with config:', exportConfig);
    // Simulate export process
    alert(`Exporting ${exportConfig?.format?.toUpperCase()} report... This would normally trigger a download.`);
  };

  const handleComparisonChange = (comparison) => {
    setComparisonMode(comparison);
  };

  console.log(chartConfig)

  const quickActions = [
    {
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/organization-dashboard',
      description: 'Return to main dashboard'
    },
    {
      label: 'Data Submission',
      icon: 'Upload',
      path: '/data-submission',
      description: 'Submit new metrics'
    },
    {
      label: 'Benchmarking',
      icon: 'Target',
      path: '/benchmarking-comparison',
      description: 'Detailed comparisons'
    },
    {
      label: 'Knowledge Base',
      icon: 'BookOpen',
      path: '/knowledge-repository',
      description: 'Research resources'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Loading Analytics</h2>
            <p className="text-muted-foreground">Preparing your data visualization workspace...</p>
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
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center">
                  <Icon name="BarChart3" size={28} className="mr-3" />
                  Analytics Visualization
                </h1>
                <p className="text-muted-foreground mt-1">
                  Interactive data exploration with customizable charts and benchmarking tools
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <ExportTools onExport={handleExport} />
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="mt-6 flex flex-wrap gap-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(action?.path)}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <FilterSidebar 
                  onFilterChange={handleFilterChange}
                  activeFilters={activeFilters}
                />
                <ComparisonMode
                  onComparisonChange={handleComparisonChange}
                  isActive={comparisonMode?.active}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Chart Configuration */}
                <ChartConfigPanel
                  onConfigChange={handleConfigChange}
                  currentConfig={chartConfig}
                />

                {/* Main Visualization */}
                <InteractiveChart
                  config={chartConfig}
                  data={null}
                  onExport={handleExport}
                />

                {/* Analysis Tools Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <BenchmarkingTools onBenchmarkChange={handleBenchmarkChange} />
                  <TrendDetection onTrendSelect={handleTrendSelect} />
                </div>

                {/* Real-time Data Status */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-foreground">Real-time Data Connection</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: Nov 4, 2024 at 12:32 PM • Next update in 5 minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">247 organizations connected</span>
                      <Button variant="ghost" size="icon">
                        <Icon name="Wifi" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Performance Insights */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Performance Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">68th</p>
                      <p className="text-sm text-muted-foreground">Overall Percentile</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">+23%</p>
                      <p className="text-sm text-muted-foreground">R&D Growth</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">92%</p>
                      <p className="text-sm text-muted-foreground">Trend Confidence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Optimization Notice */}
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start space-x-2">
              <Icon name="Smartphone" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Mobile View</p>
                <p className="text-xs text-muted-foreground">
                  For full analytics features, use desktop browser
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsVisualization;