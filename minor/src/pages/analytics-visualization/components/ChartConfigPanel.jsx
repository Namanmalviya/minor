import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ChartConfigPanel = ({ onConfigChange, currentConfig }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const chartTypes = [
    { value: 'line', label: 'Line Chart', description: 'Trend analysis over time' },
    { value: 'bar', label: 'Bar Chart', description: 'Compare values across categories' },
    { value: 'pie', label: 'Pie Chart', description: 'Show proportional data' },
    { value: 'heatmap', label: 'Heatmap', description: 'Visualize data density' },
    { value: 'scatter', label: 'Scatter Plot', description: 'Show correlations' },
    { value: 'area', label: 'Area Chart', description: 'Cumulative trends' }
  ];

  const dataSources = [
    { value: 'rd_metrics', label: 'R&D Metrics', description: 'Research & Development data' },
    { value: 'human_capital', label: 'Human Capital', description: 'Staff and training metrics' },
    { value: 'innovation_output', label: 'Innovation Output', description: 'Products and patents' },
    { value: 'financial_indicators', label: 'Financial Indicators', description: 'Revenue and ROI' },
    { value: 'ecosystem_metrics', label: 'Ecosystem Metrics', description: 'Partnerships and networks' }
  ];

  const timeRanges = [
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: '2y', label: 'Last 2 Years' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const colorSchemes = [
    { value: 'blue', label: 'Blue Theme', color: '#2563EB' },
    { value: 'green', label: 'Green Theme', color: '#059669' },
    { value: 'purple', label: 'Purple Theme', color: '#7C3AED' },
    { value: 'orange', label: 'Orange Theme', color: '#EA580C' },
    { value: 'gradient', label: 'Gradient Theme', color: 'linear-gradient' }
  ];

  const handleConfigUpdate = (key, value) => {
    const newConfig = { ...currentConfig, [key]: value };
    onConfigChange(newConfig);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Settings" size={20} className="mr-2" />
          Chart Configuration
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
        <div className="p-4 space-y-4">
          {/* Chart Type Selection */}
          <div>
            <Select
              label="Visualization Type"
              description="Choose how to display your data"
              options={chartTypes}
              value={currentConfig?.chartType}
              onChange={(value) => handleConfigUpdate('chartType', value)}
              className="mb-4"
            />
          </div>

          {/* Data Source Selection */}
          <div>
            <Select
              label="Data Source"
              description="Select the metrics to visualize"
              options={dataSources}
              value={currentConfig?.dataSource}
              onChange={(value) => handleConfigUpdate('dataSource', value)}
              className="mb-4"
            />
          </div>

          {/* Time Range */}
          <div>
            <Select
              label="Time Range"
              description="Set the analysis period"
              options={timeRanges}
              value={currentConfig?.timeRange}
              onChange={(value) => handleConfigUpdate('timeRange', value)}
              className="mb-4"
            />
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Color Scheme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorSchemes?.map((scheme) => (
                <button
                  key={scheme?.value}
                  onClick={() => handleConfigUpdate('colorScheme', scheme?.value)}
                  className={`flex items-center space-x-2 p-2 rounded-md border transition-colors ${
                    currentConfig?.colorScheme === scheme?.value
                      ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: scheme?.color }}
                  ></div>
                  <span className="text-sm">{scheme?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Chart Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentConfig?.showGrid}
                  onChange={(e) => handleConfigUpdate('showGrid', e?.target?.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-muted-foreground">Show Grid Lines</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentConfig?.showLegend}
                  onChange={(e) => handleConfigUpdate('showLegend', e?.target?.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-muted-foreground">Show Legend</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentConfig?.enableZoom}
                  onChange={(e) => handleConfigUpdate('enableZoom', e?.target?.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-muted-foreground">Enable Zoom</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onConfigChange({
                chartType: 'line',
                dataSource: 'rd_metrics',
                timeRange: '6m',
                colorScheme: 'blue',
                showGrid: true,
                showLegend: true,
                enableZoom: true
              })}
            >
              Reset to Default
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartConfigPanel;