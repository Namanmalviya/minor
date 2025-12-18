import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ExcellenceScoreCard = ({ score, trend, ranking, totalOrganizations, trendData,innovationScore,peopleScore,ecosystemScore }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = () => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Innovation Excellence Score</h2>
          <p className="text-sm text-muted-foreground">Your organization's overall performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Rank #{ranking} of {totalOrganizations}</span>
        </div>
      </div>

      <div className="grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Display */}
        <div className="flex items-center justify-center">
          <div className={`relative w-32 h-32 ${getScoreBgColor()} rounded-full flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor()}`}>{score}</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">6-Month Trend</h3>
            <div className={`flex items-center space-x-1 ${trend >= 0 ? 'text-success' : 'text-error'}`}>
              <Icon name={trend >= 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span className="text-sm font-medium">{trend >= 0 ? '+' : ''}{trend}%</span>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="rgb(37, 99, 235)" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-success">{Math.round(innovationScore*10)*10}</div>
          <div className="text-xs text-muted-foreground">R&D Excellence</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warning">{Math.round(peopleScore*10)*10}</div>
          <div className="text-xs text-muted-foreground">Innovation Output</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{Math.round(ecosystemScore*10)*10}</div>
          <div className="text-xs text-muted-foreground">Ecosystem Impact</div>
        </div>
      </div>
    </div>
  );
};

export default ExcellenceScoreCard;