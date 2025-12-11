import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportTools = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeData: true,
    includeBenchmarks: true,
    includeTrends: true,
    dateRange: 'current',
    resolution: 'high'
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', description: 'Comprehensive formatted report' },
    { value: 'excel', label: 'Excel Workbook', description: 'Data tables and charts' },
    { value: 'png', label: 'PNG Images', description: 'High-resolution chart images' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data export' },
    { value: 'powerpoint', label: 'PowerPoint', description: 'Presentation slides' }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current View' },
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Available Data' }
  ];

  const resolutionOptions = [
    { value: 'standard', label: 'Standard (72 DPI)' },
    { value: 'high', label: 'High (150 DPI)' },
    { value: 'print', label: 'Print Quality (300 DPI)' }
  ];

  const handleExport = () => {
    onExport(exportConfig);
    setIsOpen(false);
  };

  const updateConfig = (key, value) => {
    setExportConfig(prev => ({ ...prev, [key]: value }));
  };

  const getEstimatedSize = () => {
    let size = 0;
    if (exportConfig?.includeCharts) size += 2.5;
    if (exportConfig?.includeData) size += 1.2;
    if (exportConfig?.includeBenchmarks) size += 0.8;
    if (exportConfig?.includeTrends) size += 0.5;
    
    if (exportConfig?.resolution === 'high') size *= 1.5;
    if (exportConfig?.resolution === 'print') size *= 2.5;
    
    return size?.toFixed(1);
  };

  return (
    <div className="relative">
      <Button
        variant="default"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Download"
        iconPosition="left"
      >
        Export Data
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-modal z-50 animate-fade-in">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="Download" size={20} className="mr-2" />
              Export Configuration
            </h3>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Export Format */}
            <div>
              <Select
                label="Export Format"
                description="Choose output format"
                options={exportFormats}
                value={exportConfig?.format}
                onChange={(value) => updateConfig('format', value)}
                className="mb-4"
              />
            </div>

            {/* Content Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Include Content
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Charts and Visualizations"
                  checked={exportConfig?.includeCharts}
                  onChange={(e) => updateConfig('includeCharts', e?.target?.checked)}
                />
                <Checkbox
                  label="Raw Data Tables"
                  checked={exportConfig?.includeData}
                  onChange={(e) => updateConfig('includeData', e?.target?.checked)}
                />
                <Checkbox
                  label="Benchmark Analysis"
                  checked={exportConfig?.includeBenchmarks}
                  onChange={(e) => updateConfig('includeBenchmarks', e?.target?.checked)}
                />
                <Checkbox
                  label="Trend Insights"
                  checked={exportConfig?.includeTrends}
                  onChange={(e) => updateConfig('includeTrends', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Select
                label="Date Range"
                description="Select data period"
                options={dateRangeOptions}
                value={exportConfig?.dateRange}
                onChange={(value) => updateConfig('dateRange', value)}
                className="mb-4"
              />
            </div>

            {/* Resolution (for image formats) */}
            {(exportConfig?.format === 'png' || exportConfig?.format === 'pdf') && (
              <div>
                <Select
                  label="Image Resolution"
                  description="Quality setting for images"
                  options={resolutionOptions}
                  value={exportConfig?.resolution}
                  onChange={(value) => updateConfig('resolution', value)}
                  className="mb-4"
                />
              </div>
            )}

            {/* Export Preview */}
            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="font-medium text-foreground mb-2">Export Preview</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium">{exportFormats?.find(f => f?.value === exportConfig?.format)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Size:</span>
                  <span className="font-medium">{getEstimatedSize()} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="font-medium">~30 seconds</span>
                </div>
              </div>
            </div>

            {/* Quick Export Options */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Quick Export Templates
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportConfig({
                    format: 'pdf',
                    includeCharts: true,
                    includeData: false,
                    includeBenchmarks: true,
                    includeTrends: true,
                    dateRange: 'current',
                    resolution: 'high'
                  })}
                >
                  Executive Summary
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportConfig({
                    format: 'excel',
                    includeCharts: true,
                    includeData: true,
                    includeBenchmarks: true,
                    includeTrends: false,
                    dateRange: '6m',
                    resolution: 'standard'
                  })}
                >
                  Full Analysis
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportConfig({
                    format: 'png',
                    includeCharts: true,
                    includeData: false,
                    includeBenchmarks: false,
                    includeTrends: false,
                    dateRange: 'current',
                    resolution: 'print'
                  })}
                >
                  Charts Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExportConfig({
                    format: 'csv',
                    includeCharts: false,
                    includeData: true,
                    includeBenchmarks: false,
                    includeTrends: false,
                    dateRange: 'all',
                    resolution: 'standard'
                  })}
                >
                  Data Only
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportTools;