import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonMatrix = ({ selectedOrganizations }) => {
  const indicators = [
    {
      category: 'R&D Metrics',
      metrics: [
        { name: 'R&D Spend %', unit: '%' },
        { name: 'Patents Filed', unit: 'count' },
        { name: 'Patents Granted', unit: 'count' },
        { name: 'Research Collaborations', unit: 'count' }
      ]
    },
    {
      category: 'Human Capital',
      metrics: [
        { name: 'Innovation Staff %', unit: '%' },
        { name: 'Training Programs', unit: 'count' },
        { name: 'Retention Rate', unit: '%' },
        { name: 'PhD Researchers', unit: 'count' }
      ]
    },
    {
      category: 'Innovation Output',
      metrics: [
        { name: 'New Products', unit: 'count' },
        { name: 'Commercialized IP', unit: 'count' },
        { name: 'Startups Incubated', unit: 'count' },
        { name: 'Awards Received', unit: 'count' }
      ]
    },
    {
      category: 'Financial Indicators',
      metrics: [
        { name: 'Revenue from New Products', unit: '%' },
        { name: 'Innovation ROI', unit: '%' },
        { name: 'Grants Received', unit: '$M' },
        { name: 'Investment Attracted', unit: '$M' }
      ]
    },
    {
      category: 'Ecosystem Metrics',
      metrics: [
        { name: 'Industry Partnerships', unit: 'count' },
        { name: 'Academic Networks', unit: 'count' },
        { name: 'Accelerator Support', unit: 'count' },
        { name: 'Innovation Events', unit: 'count' }
      ]
    }
  ];

  // Mock performance data for each organization
  const getPerformanceData = (orgId, metricName) => {
    const mockData = {
      'org-1': {
        'R&D Spend %': { value: 12.5, percentile: 85, trend: 'up' },
        'Patents Filed': { value: 145, percentile: 78, trend: 'up' },
        'Patents Granted': { value: 89, percentile: 82, trend: 'stable' },
        'Research Collaborations': { value: 23, percentile: 90, trend: 'up' },
        'Innovation Staff %': { value: 35, percentile: 88, trend: 'up' },
        'Training Programs': { value: 18, percentile: 75, trend: 'stable' },
        'Retention Rate': { value: 92, percentile: 85, trend: 'up' },
        'PhD Researchers': { value: 156, percentile: 80, trend: 'up' },
        'New Products': { value: 12, percentile: 85, trend: 'up' },
        'Commercialized IP': { value: 8, percentile: 78, trend: 'stable' },
        'Startups Incubated': { value: 5, percentile: 70, trend: 'up' },
        'Awards Received': { value: 7, percentile: 88, trend: 'up' },
        'Revenue from New Products': { value: 28, percentile: 82, trend: 'up' },
        'Innovation ROI': { value: 15.2, percentile: 85, trend: 'up' },
        'Grants Received': { value: 12.5, percentile: 80, trend: 'stable' },
        'Investment Attracted': { value: 45.2, percentile: 75, trend: 'up' },
        'Industry Partnerships': { value: 34, percentile: 88, trend: 'up' },
        'Academic Networks': { value: 18, percentile: 85, trend: 'stable' },
        'Accelerator Support': { value: 6, percentile: 70, trend: 'up' },
        'Innovation Events': { value: 24, percentile: 82, trend: 'up' }
      }
    };

    // Generate similar data for other organizations with variations
    const baseData = mockData?.['org-1']?.[metricName] || { value: 0, percentile: 50, trend: 'stable' };
    const variation = Math.random() * 0.4 - 0.2; // ±20% variation
    
    return {
      value: Math.max(0, baseData?.value * (1 + variation)),
      percentile: Math.max(10, Math.min(95, baseData?.percentile + (Math.random() * 30 - 15))),
      trend: ['up', 'down', 'stable']?.[Math.floor(Math.random() * 3)]
    };
  };

  const getPerformanceColor = (percentile) => {
    if (percentile >= 80) return 'text-success bg-success/10';
    if (percentile >= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down': return <Icon name="TrendingDown" size={14} className="text-error" />;
      default: return <Icon name="Minus" size={14} className="text-muted-foreground" />;
    }
  };

  if (selectedOrganizations?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Organizations Selected</h3>
        <p className="text-muted-foreground">Select organizations to view the comparison matrix</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Performance Comparison Matrix</h3>
        <p className="text-sm text-muted-foreground">Detailed metrics comparison across all innovation indicators</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-foreground min-w-48">Indicator</th>
              {selectedOrganizations?.map((org) => (
                <th key={org?.id} className="text-center p-4 font-medium text-foreground min-w-32">
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={org?.logo}
                      alt={org?.logoAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-xs">{org?.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicators?.map((category, categoryIndex) => (
              <React.Fragment key={category?.category}>
                <tr className="bg-muted/50">
                  <td colSpan={selectedOrganizations?.length + 1} className="p-3 font-semibold text-foreground">
                    {category?.category}
                  </td>
                </tr>
                {category?.metrics?.map((metric, metricIndex) => (
                  <tr key={`${categoryIndex}-${metricIndex}`} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4">
                      <div className="font-medium text-foreground">{metric?.name}</div>
                      <div className="text-xs text-muted-foreground">Unit: {metric?.unit}</div>
                    </td>
                    {selectedOrganizations?.map((org) => {
                      const data = getPerformanceData(org?.id, metric?.name);
                      return (
                        <td key={org?.id} className="p-4 text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-foreground">
                              {metric?.unit === '%' ? `${data?.value?.toFixed(1)}%` :
                               metric?.unit === 'count' ? Math.round(data?.value) :
                               metric?.unit === '$M' ? `$${data?.value?.toFixed(1)}M` :
                               data?.value?.toFixed(1)}
                            </div>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getPerformanceColor(data?.percentile)}`}>
                              <span>{Math.round(data?.percentile)}th</span>
                              {getTrendIcon(data?.trend)}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success/20 rounded-full"></div>
              <span>80th+ percentile</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning/20 rounded-full"></div>
              <span>60-79th percentile</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error/20 rounded-full"></div>
              <span>&lt;60th percentile</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} className="text-success" />
              <span>Improving</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingDown" size={12} className="text-error" />
              <span>Declining</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Minus" size={12} className="text-muted-foreground" />
              <span>Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrix;