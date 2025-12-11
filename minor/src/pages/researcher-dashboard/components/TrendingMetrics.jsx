import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TrendingMetrics = () => {
  const [timeframe, setTimeframe] = useState('7d');
  
  const trendingData = [
    {
      id: 1,
      metric: 'AI Patent Filings',
      value: '+34.2%',
      change: 'increase',
      period: 'vs last quarter',
      category: 'Technology',
      organizations: 156,
      icon: 'Brain',
      color: 'text-success'
    },
    {
      id: 2,
      metric: 'Green Tech Investment',
      value: '+28.7%',
      change: 'increase',
      period: 'vs last quarter',
      category: 'Energy',
      organizations: 89,
      icon: 'Leaf',
      color: 'text-success'
    },
    {
      id: 3,
      metric: 'Biotech R&D Spend',
      value: '+22.1%',
      change: 'increase',
      period: 'vs last quarter',
      category: 'Healthcare',
      organizations: 67,
      icon: 'Microscope',
      color: 'text-success'
    },
    {
      id: 4,
      metric: 'Fintech Startups',
      value: '+19.8%',
      change: 'increase',
      period: 'vs last quarter',
      category: 'Financial Services',
      organizations: 234,
      icon: 'CreditCard',
      color: 'text-success'
    },
    {
      id: 5,
      metric: 'Quantum Computing',
      value: '+15.3%',
      change: 'increase',
      period: 'vs last quarter',
      category: 'Technology',
      organizations: 23,
      icon: 'Cpu',
      color: 'text-success'
    },
    {
      id: 6,
      metric: 'Space Technology',
      value: '-8.2%',
      change: 'decrease',
      period: 'vs last quarter',
      category: 'Aerospace',
      organizations: 45,
      icon: 'Rocket',
      color: 'text-error'
    }
  ];

  const timeframes = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Trending Innovation Metrics</h3>
          <p className="text-sm text-muted-foreground">Real-time performance indicators across sectors</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes?.map((tf) => (
              <button
                key={tf?.id}
                onClick={() => setTimeframe(tf?.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  timeframe === tf?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf?.label}
              </button>
            ))}
          </div>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingData?.map((item) => (
          <div
            key={item?.id}
            className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-200 bg-background"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={item?.icon} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{item?.metric}</h4>
                  <p className="text-xs text-muted-foreground">{item?.category}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${item?.color}`}>
                <Icon 
                  name={item?.change === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                />
                <span className="text-sm font-semibold">{item?.value}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Organizations:</span>
                <span className="text-xs font-medium text-foreground">{item?.organizations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Period:</span>
                <span className="text-xs font-medium text-foreground">{item?.period}</span>
              </div>
            </div>

            {/* Mini trend visualization */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-end space-x-1 h-8">
                {Array.from({ length: 7 }, (_, i) => {
                  const height = Math.random() * 100;
                  const isPositive = item?.change === 'increase';
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${
                        isPositive ? 'bg-success/20' : 'bg-error/20'
                      } ${i === 6 ? (isPositive ? 'bg-success' : 'bg-error') : ''}`}
                      style={{ height: `${Math.max(20, height)}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Positive Trend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-muted-foreground">Negative Trend</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMetrics;