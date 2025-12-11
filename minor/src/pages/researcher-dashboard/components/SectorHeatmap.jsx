import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SectorHeatmap = () => {
  const [selectedMetric, setSelectedMetric] = useState('innovation-score');
  
  const sectors = [
    'Technology', 'Healthcare', 'Manufacturing', 'Financial Services',
    'Energy', 'Automotive', 'Aerospace', 'Biotechnology',
    'Telecommunications', 'Consumer Goods', 'Education', 'Agriculture'
  ];

  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'];

  const metrics = [
    { id: 'innovation-score', label: 'Innovation Score', unit: '/10' },
    { id: 'rd-investment', label: 'R&D Investment', unit: '%' },
    { id: 'patent-density', label: 'Patent Density', unit: '/1000' },
    { id: 'startup-activity', label: 'Startup Activity', unit: 'index' }
  ];

  // Mock heatmap data
  const getHeatmapValue = (sector, region, metric) => {
    const base = (sector?.length + region?.length) % 10;
    const variation = Math.sin(sector?.charCodeAt(0) + region?.charCodeAt(0)) * 3;
    
    switch (metric) {
      case 'innovation-score':
        return Math.max(3, Math.min(10, base + variation))?.toFixed(1);
      case 'rd-investment':
        return Math.max(1, Math.min(15, (base + variation) * 1.5))?.toFixed(1);
      case 'patent-density':
        return Math.max(5, Math.min(50, (base + variation) * 5))?.toFixed(0);
      case 'startup-activity':
        return Math.max(20, Math.min(100, (base + variation) * 10))?.toFixed(0);
      default:
        return base?.toFixed(1);
    }
  };

  const getIntensityColor = (value, metric) => {
    let normalizedValue;
    switch (metric) {
      case 'innovation-score':
        normalizedValue = (parseFloat(value) - 3) / 7;
        break;
      case 'rd-investment':
        normalizedValue = (parseFloat(value) - 1) / 14;
        break;
      case 'patent-density':
        normalizedValue = (parseFloat(value) - 5) / 45;
        break;
      case 'startup-activity':
        normalizedValue = (parseFloat(value) - 20) / 80;
        break;
      default:
        normalizedValue = 0.5;
    }

    const intensity = Math.max(0, Math.min(1, normalizedValue));
    
    if (intensity < 0.2) return 'bg-red-100 text-red-800';
    if (intensity < 0.4) return 'bg-orange-100 text-orange-800';
    if (intensity < 0.6) return 'bg-yellow-100 text-yellow-800';
    if (intensity < 0.8) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sector Performance Heatmap</h3>
          <p className="text-sm text-muted-foreground">Cross-regional sector analysis and benchmarking</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metrics?.map((metric) => (
              <option key={metric?.id} value={metric?.id}>
                {metric?.label}
              </option>
            ))}
          </select>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            <div className="p-2"></div>
            {regions?.map((region) => (
              <div key={region} className="p-2 text-center">
                <span className="text-xs font-medium text-muted-foreground">{region}</span>
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="space-y-1">
            {sectors?.map((sector) => (
              <div key={sector} className="grid grid-cols-7 gap-1">
                <div className="p-3 text-right">
                  <span className="text-sm font-medium text-foreground">{sector}</span>
                </div>
                {regions?.map((region) => {
                  const value = getHeatmapValue(sector, region, selectedMetric);
                  const colorClass = getIntensityColor(value, selectedMetric);
                  
                  return (
                    <div
                      key={`${sector}-${region}`}
                      className={`p-3 rounded text-center cursor-pointer hover:scale-105 transition-transform duration-200 ${colorClass}`}
                      title={`${sector} - ${region}: ${value}${metrics?.find(m => m?.id === selectedMetric)?.unit || ''}`}
                    >
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Performance Level:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 rounded"></div>
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Showing: {metrics?.find(m => m?.id === selectedMetric)?.label} {metrics?.find(m => m?.id === selectedMetric)?.unit}
        </div>
      </div>
    </div>
  );
};

export default SectorHeatmap;