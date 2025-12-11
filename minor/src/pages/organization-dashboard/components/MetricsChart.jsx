import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MetricsChart = ({ data, title, type = 'bar' }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('6m');

  const timeRanges = [
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: '2y', label: '2Y' }
  ];

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
          <XAxis 
            dataKey="month" 
            stroke="rgb(100, 116, 139)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgb(100, 116, 139)"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgb(255, 255, 255)',
              border: '1px solid rgb(226, 232, 240)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="rgb(37, 99, 235)" 
            strokeWidth={2}
            dot={{ fill: 'rgb(37, 99, 235)', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      );
    }

    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
        <XAxis 
          dataKey="month" 
          stroke="rgb(100, 116, 139)"
          fontSize={12}
        />
        <YAxis 
          stroke="rgb(100, 116, 139)"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(226, 232, 240)',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="rgb(37, 99, 235)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  timeRange === range?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <Icon name="BarChart3" size={16} />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              <Icon name="TrendingUp" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Monthly Performance</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsChart;