import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BenchmarkingTools = ({ onBenchmarkChange }) => {
  const [selectedComparison, setSelectedComparison] = useState('sector');
  const [isExpanded, setIsExpanded] = useState(true);

  const comparisonTypes = [
    { value: 'sector', label: 'Sector Average', description: 'Compare against industry peers' },
    { value: 'region', label: 'Regional Average', description: 'Compare with geographic peers' },
    { value: 'size', label: 'Organization Size', description: 'Compare with similar-sized entities' },
    { value: 'custom', label: 'Custom Peer Group', description: 'Select specific organizations' }
  ];

  const benchmarkMetrics = [
    {
      id: 'rd_spend',
      name: 'R&D Spend Percentage',
      yourValue: 15.2,
      benchmark: 12.8,
      percentile: 78,
      trend: 'up',
      significance: 'high'
    },
    {
      id: 'patents',
      name: 'Patents per 100 Employees',
      yourValue: 8.5,
      benchmark: 6.2,
      percentile: 85,
      trend: 'up',
      significance: 'high'
    },
    {
      id: 'innovation_staff',
      name: 'Innovation Staff Ratio',
      yourValue: 42,
      benchmark: 38,
      percentile: 65,
      trend: 'stable',
      significance: 'medium'
    },
    {
      id: 'new_products',
      name: 'New Product Revenue %',
      yourValue: 28,
      benchmark: 32,
      percentile: 45,
      trend: 'down',
      significance: 'medium'
    },
    {
      id: 'partnerships',
      name: 'Strategic Partnerships',
      yourValue: 12,
      benchmark: 15,
      percentile: 40,
      trend: 'down',
      significance: 'low'
    }
  ];

  const getPerformanceColor = (percentile) => {
    if (percentile >= 75) return 'text-success';
    if (percentile >= 50) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'high': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Target" size={20} className="mr-2" />
          Benchmarking Analysis
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4">
          {/* Comparison Type Selection */}
          <div className="mb-6">
            <Select
              label="Comparison Baseline"
              description="Choose what to benchmark against"
              options={comparisonTypes}
              value={selectedComparison}
              onChange={(value) => {
                setSelectedComparison(value);
                onBenchmarkChange(value);
              }}
              className="mb-4"
            />
          </div>

          {/* Benchmark Metrics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Performance Comparison</h4>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Your Organization</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Benchmark Average</span>
                </div>
              </div>
            </div>

            {benchmarkMetrics?.map((metric) => (
              <div key={metric?.id} className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-foreground">{metric?.name}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSignificanceColor(metric?.significance)}`}>
                      {metric?.significance} significance
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getPerformanceIcon(metric?.trend)} 
                      size={16} 
                      className={getPerformanceColor(metric?.percentile)}
                    />
                    <span className={`text-sm font-medium ${getPerformanceColor(metric?.percentile)}`}>
                      {metric?.percentile}th percentile
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Your Value */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your Value:</span>
                    <span className="font-medium text-primary">{metric?.yourValue}%</span>
                  </div>

                  {/* Benchmark Value */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Benchmark:</span>
                    <span className="font-medium text-muted-foreground">{metric?.benchmark}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(metric?.percentile, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Performance Gap */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">Performance Gap:</span>
                    <span className={`text-xs font-medium ${
                      metric?.yourValue > metric?.benchmark ? 'text-success' : 'text-error'
                    }`}>
                      {metric?.yourValue > metric?.benchmark ? '+' : ''}{(metric?.yourValue - metric?.benchmark)?.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistical Summary */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Statistical Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Overall Percentile:</span>
                <span className="font-medium text-primary ml-2">68th</span>
              </div>
              <div>
                <span className="text-muted-foreground">Peer Organizations:</span>
                <span className="font-medium text-foreground ml-2">247</span>
              </div>
              <div>
                <span className="text-muted-foreground">Above Benchmark:</span>
                <span className="font-medium text-success ml-2">3 of 5 metrics</span>
              </div>
              <div>
                <span className="text-muted-foreground">Confidence Level:</span>
                <span className="font-medium text-foreground ml-2">95%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchmarkingTools;