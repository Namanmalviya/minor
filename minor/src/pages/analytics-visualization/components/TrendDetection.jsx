import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendDetection = ({ onTrendSelect }) => {
  const [selectedTrend, setSelectedTrend] = useState(null);

  const trendInsights = [
    {
      id: 'rd_growth',
      title: 'R&D Investment Surge',
      description: 'Your R&D spending has increased 23% over the last 6 months, outpacing industry average of 8%.',
      type: 'positive',
      confidence: 92,
      impact: 'high',
      timeframe: '6 months',
      prediction: 'Continued growth expected through Q2 2025',
      metrics: ['R&D Spend', 'Patent Applications'],
      icon: 'TrendingUp'
    },
    {
      id: 'patent_acceleration',
      title: 'Patent Filing Acceleration',
      description: 'Patent applications have doubled in Q4 2024 compared to Q4 2023, indicating strong innovation pipeline.',
      type: 'positive',
      confidence: 88,
      impact: 'high',
      timeframe: '12 months',
      prediction: 'Patent grants expected to increase by 40% in 2025',
      metrics: ['Patents Filed', 'Innovation Output'],
      icon: 'Lightbulb'
    },
    {
      id: 'collaboration_decline',
      title: 'Partnership Activity Slowdown',
      description: 'Strategic partnerships have decreased by 15% this quarter, potentially impacting ecosystem metrics.',
      type: 'warning',
      confidence: 76,
      impact: 'medium',
      timeframe: '3 months',
      prediction: 'Recommend increasing partnership initiatives',
      metrics: ['Partnerships', 'Ecosystem Metrics'],
      icon: 'TrendingDown'
    },
    {
      id: 'talent_retention',
      title: 'Innovation Talent Retention',
      description: 'Innovation staff retention rate improved to 94%, highest in 3 years, supporting sustained growth.',
      type: 'positive',
      confidence: 95,
      impact: 'medium',
      timeframe: '36 months',
      prediction: 'Stable talent base supports long-term innovation capacity',
      metrics: ['Human Capital', 'Staff Retention'],
      icon: 'Users'
    },
    {
      id: 'revenue_correlation',
      title: 'Innovation-Revenue Correlation',
      description: 'Strong correlation detected between R&D investment and new product revenue with 6-month lag.',
      type: 'insight',
      confidence: 89,
      impact: 'high',
      timeframe: '24 months',
      prediction: 'Current R&D investments should yield 18% revenue increase by mid-2025',
      metrics: ['R&D Spend', 'New Product Revenue'],
      icon: 'Target'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'insight': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'positive': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'insight': return 'Brain';
      default: return 'Info';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Brain" size={20} className="mr-2" />
          AI Trend Detection
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Last updated: Nov 4, 2024</span>
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>
      </div>
      <div className="p-4">
        {/* Trend Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-success/10 rounded-lg p-3 border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success font-medium">Positive Trends</p>
                <p className="text-2xl font-bold text-success">3</p>
              </div>
              <Icon name="TrendingUp" size={24} className="text-success" />
            </div>
          </div>
          <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning font-medium">Warnings</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </div>
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary font-medium">Insights</p>
                <p className="text-2xl font-bold text-primary">1</p>
              </div>
              <Icon name="Brain" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Trend Details */}
        <div className="space-y-4">
          {trendInsights?.map((trend) => (
            <div
              key={trend?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedTrend === trend?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => {
                setSelectedTrend(selectedTrend === trend?.id ? null : trend?.id);
                onTrendSelect(trend);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg border ${getTypeColor(trend?.type)}`}>
                    <Icon name={trend?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground">{trend?.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(trend?.type)}`}>
                        {trend?.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{trend?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{trend?.timeframe}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span className={getImpactColor(trend?.impact)}>{trend?.impact} impact</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Percent" size={12} />
                        <span>{trend?.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded ${getTypeColor(trend?.type)}`}>
                    <Icon name={getTypeIcon(trend?.type)} size={16} />
                  </div>
                  <Icon 
                    name={selectedTrend === trend?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>

              {selectedTrend === trend?.id && (
                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">AI Prediction</h5>
                      <p className="text-sm text-muted-foreground">{trend?.prediction}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Related Metrics</h5>
                      <div className="flex flex-wrap gap-1">
                        {trend?.metrics?.map((metric, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="BarChart3"
                      iconPosition="left"
                    >
                      View Chart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Insights Summary */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Key Recommendations
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
              <span>Continue increasing R&D investment to maintain competitive advantage</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
              <span>Accelerate partnership initiatives to strengthen ecosystem metrics</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
              <span>Leverage patent portfolio for commercialization opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendDetection;