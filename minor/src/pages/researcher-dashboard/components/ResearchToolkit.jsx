import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResearchToolkit = () => {
  const [activeTab, setActiveTab] = useState('datasets');
  
  const datasets = [
    {
      id: 1,
      title: 'Global Innovation Index 2024',
      description: 'Comprehensive innovation metrics across 130+ countries and regions',
      format: 'CSV, JSON, Excel',
      size: '45.2 MB',
      lastUpdated: '2024-11-01',
      downloads: 2847,
      category: 'Global Rankings',
      icon: 'Globe'
    },
    {
      id: 2,
      title: 'R&D Investment Trends',
      description: 'Historical R&D spending data by sector and organization type',
      format: 'CSV, JSON',
      size: '23.8 MB',
      lastUpdated: '2024-10-28',
      downloads: 1923,
      category: 'Financial Data',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      title: 'Patent Filing Analytics',
      description: 'Patent application and grant data with technology classifications',
      format: 'CSV, XML',
      size: '67.4 MB',
      lastUpdated: '2024-10-25',
      downloads: 3156,
      category: 'IP Data',
      icon: 'FileText'
    },
    {
      id: 4,
      title: 'Startup Ecosystem Metrics',
      description: 'Funding, valuation, and growth data for innovation startups',
      format: 'JSON, Excel',
      size: '31.7 MB',
      lastUpdated: '2024-10-30',
      downloads: 1654,
      category: 'Startup Data',
      icon: 'Rocket'
    }
  ];

  const apiEndpoints = [
    {
      id: 1,
      endpoint: '/api/v1/organizations',
      method: 'GET',
      description: 'Retrieve organization profiles and innovation metrics',
      parameters: 'region, sector, size, score_range',
      rateLimit: '1000/hour',
      authentication: 'API Key'
    },
    {
      id: 2,
      endpoint: '/api/v1/metrics/trends',
      method: 'GET',
      description: 'Get trending innovation indicators and performance data',
      parameters: 'timeframe, metric_type, aggregation',
      rateLimit: '500/hour',
      authentication: 'API Key'
    },
    {
      id: 3,
      endpoint: '/api/v1/benchmarks',
      method: 'GET',
      description: 'Access benchmarking data for comparative analysis',
      parameters: 'baseline, comparison_group, metrics',
      rateLimit: '200/hour',
      authentication: 'API Key + OAuth'
    },
    {
      id: 4,
      endpoint: '/api/v1/reports/generate',
      method: 'POST',
      description: 'Generate custom analytical reports',
      parameters: 'template, filters, format',
      rateLimit: '50/hour',
      authentication: 'API Key + OAuth'
    }
  ];

  const analysisTools = [
    {
      id: 1,
      name: 'Correlation Matrix Generator',
      description: 'Generate correlation matrices between innovation indicators',
      type: 'Statistical Analysis',
      icon: 'Grid3x3',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Trend Forecasting Model',
      description: 'Predict future innovation performance using ML algorithms',
      type: 'Predictive Analytics',
      icon: 'TrendingUp',
      status: 'Beta'
    },
    {
      id: 3,
      name: 'Cluster Analysis Tool',
      description: 'Identify innovation patterns and organization groupings',
      type: 'Machine Learning',
      icon: 'Scatter',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Regression Analysis Suite',
      description: 'Perform linear and non-linear regression on innovation data',
      type: 'Statistical Analysis',
      icon: 'LineChart',
      status: 'Available'
    },
    {
      id: 5,
      name: 'Network Analysis Engine',
      description: 'Analyze collaboration networks and innovation ecosystems',
      type: 'Network Analysis',
      icon: 'Network',
      status: 'Coming Soon'
    }
  ];

  const tabs = [
    { id: 'datasets', label: 'Datasets', icon: 'Database' },
    { id: 'api', label: 'API Access', icon: 'Code' },
    { id: 'tools', label: 'Analysis Tools', icon: 'Wrench' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Research Toolkit</h3>
          <p className="text-sm text-muted-foreground">Access datasets, APIs, and analytical tools</p>
        </div>
        <Icon name="Beaker" size={20} className="text-muted-foreground" />
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Datasets Tab */}
      {activeTab === 'datasets' && (
        <div className="space-y-4">
          {datasets?.map((dataset) => (
            <div key={dataset?.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={dataset?.icon} size={20} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{dataset?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{dataset?.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Format: {dataset?.format}</span>
                      <span>Size: {dataset?.size}</span>
                      <span>Updated: {dataset?.lastUpdated}</span>
                      <span>Downloads: {dataset?.downloads?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {dataset?.category}
                  </span>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* API Access Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Key" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">API Authentication</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Access our research APIs using your API key. For advanced endpoints, OAuth authentication is required.
            </p>
            <Button variant="outline" size="sm">
              Generate API Key
            </Button>
          </div>

          <div className="space-y-4">
            {apiEndpoints?.map((api) => (
              <div key={api?.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        api?.method === 'GET' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {api?.method}
                      </span>
                      <code className="text-sm font-mono text-foreground">{api?.endpoint}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{api?.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-muted-foreground">Parameters:</span>
                    <p className="text-foreground mt-1">{api?.parameters}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Rate Limit:</span>
                    <p className="text-foreground mt-1">{api?.rateLimit}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Auth:</span>
                    <p className="text-foreground mt-1">{api?.authentication}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Analysis Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          {analysisTools?.map((tool) => (
            <div key={tool?.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={tool?.icon} size={20} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{tool?.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${
                        tool?.status === 'Available' ? 'bg-success/20 text-success' :
                        tool?.status === 'Beta'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {tool?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{tool?.description}</p>
                    <span className="text-xs text-muted-foreground">{tool?.type}</span>
                  </div>
                </div>
                <Button 
                  variant={tool?.status === 'Available' ? 'default' : 'outline'} 
                  size="sm"
                  disabled={tool?.status === 'Coming Soon'}
                >
                  {tool?.status === 'Available' ? 'Launch Tool' : 
                   tool?.status === 'Beta' ? 'Try Beta' : 'Coming Soon'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchToolkit;