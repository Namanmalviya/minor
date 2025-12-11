import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InnovationMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const regionData = [
    {
      id: 'north-america',
      name: 'North America',
      innovationScore: 8.7,
      organizations: 1247,
      patents: 15420,
      color: '#059669',
      coordinates: { x: 20, y: 25 }
    },
    {
      id: 'europe',
      name: 'Europe',
      innovationScore: 8.4,
      organizations: 2156,
      patents: 18750,
      color: '#2563EB',
      coordinates: { x: 50, y: 20 }
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      innovationScore: 7.9,
      organizations: 3421,
      patents: 22340,
      color: '#F59E0B',
      coordinates: { x: 75, y: 35 }
    },
    {
      id: 'latin-america',
      name: 'Latin America',
      innovationScore: 6.2,
      organizations: 856,
      patents: 4230,
      color: '#EF4444',
      coordinates: { x: 25, y: 60 }
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Global Innovation Density</h3>
          <p className="text-sm text-muted-foreground">Regional performance and activity distribution</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>
      <div className="relative">
        {/* World Map Visualization */}
        <div className="relative w-full h-80 bg-muted/30 rounded-lg overflow-hidden">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            {/* Simplified world map paths */}
            <path
              d="M10,15 L35,15 L35,45 L10,45 Z"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            <path
              d="M40,10 L70,10 L70,40 L40,40 Z"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            <path
              d="M65,25 L90,25 L90,55 L65,55 Z"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            <path
              d="M15,50 L40,50 L40,65 L15,65 Z"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Innovation density circles */}
            {regionData?.map((region) => (
              <g key={region?.id}>
                <circle
                  cx={region?.coordinates?.x}
                  cy={region?.coordinates?.y}
                  r={region?.innovationScore}
                  fill={region?.color}
                  fillOpacity="0.6"
                  stroke={region?.color}
                  strokeWidth="2"
                  className="cursor-pointer hover:fillOpacity-80 transition-all duration-200"
                  onClick={() => setSelectedRegion(region)}
                />
                <text
                  x={region?.coordinates?.x}
                  y={region?.coordinates?.y + 1}
                  textAnchor="middle"
                  className="text-xs font-medium fill-white"
                >
                  {region?.innovationScore}
                </text>
              </g>
            ))}
          </svg>

          {/* Region details overlay */}
          {selectedRegion && (
            <div className="absolute top-4 right-4 bg-popover border border-border rounded-lg p-4 shadow-lg min-w-64">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">{selectedRegion?.name}</h4>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Innovation Score:</span>
                  <span className="text-sm font-medium text-foreground">{selectedRegion?.innovationScore}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Organizations:</span>
                  <span className="text-sm font-medium text-foreground">{selectedRegion?.organizations?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Patents Filed:</span>
                  <span className="text-sm font-medium text-foreground">{selectedRegion?.patents?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">High Performance (8.0+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Moderate Performance (6.0-7.9)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs text-muted-foreground">Developing (Below 6.0)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationMap;