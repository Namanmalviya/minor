import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComparisonRadarChart = ({ selectedOrganizations }) => {
  const categories = [
    'R&D Metrics',
    'Human Capital', 
    'Innovation Output',
    'Financial Indicators',
    'Ecosystem Metrics'
  ];

  // Generate mock radar data for each organization
  const generateRadarData = () => {
    return categories?.map(category => {
      const dataPoint = { category };
      
      selectedOrganizations?.forEach((org, index) => {
        // Generate realistic scores based on organization type and innovation score
        const baseScore = org?.innovationScore || 75;
        const variation = (Math.random() - 0.5) * 20; // ±10 point variation
        const categoryScore = Math.max(20, Math.min(100, baseScore + variation));
        
        dataPoint[org.name] = Math.round(categoryScore);
      });
      
      return dataPoint;
    });
  };

  const radarData = generateRadarData();

  // Color palette for different organizations
  const colors = [
    '#2563EB', // blue-600
    '#059669', // emerald-600
    '#DC2626', // red-600
    '#7C3AED', // violet-600
    '#EA580C'  // orange-600
  ];

  if (selectedOrganizations?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Target" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Organizations Selected</h3>
        <p className="text-muted-foreground">Select organizations to view the radar comparison</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Innovation Excellence Radar</h3>
        <p className="text-sm text-muted-foreground">
          Multi-dimensional performance comparison across all innovation categories
        </p>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: 'var(--color-foreground)' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            />
            {selectedOrganizations?.map((org, index) => (
              <Radar
                key={org?.id}
                name={org?.name}
                dataKey={org?.name}
                stroke={colors?.[index % colors?.length]}
                fill={colors?.[index % colors?.length]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                paddingTop: '20px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {/* Performance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedOrganizations?.map((org, index) => {
          // Calculate average score across all categories
          const avgScore = radarData?.reduce((sum, category) => sum + category?.[org?.name], 0) / radarData?.length;
          
          return (
            <div key={org?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={org?.logo}
                  alt={org?.logoAlt}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground">{org?.name}</h4>
                  <p className="text-xs text-muted-foreground">{org?.sector}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className="font-semibold text-foreground">{avgScore?.toFixed(1)}</span>
                </div>
                
                {/* Top performing category */}
                {(() => {
                  const topCategory = radarData?.reduce((max, category) => 
                    category?.[org?.name] > max?.score ? 
                    { name: category?.category, score: category?.[org?.name] } : max, 
                    { name: '', score: 0 }
                  );
                  
                  return (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Strongest Area</span>
                      <div className="text-right">
                        <div className="text-xs font-medium text-success">{topCategory?.name}</div>
                        <div className="text-xs text-muted-foreground">{topCategory?.score}/100</div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* Performance indicator */}
                <div className="flex items-center space-x-2 mt-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors?.[index % colors?.length] }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {avgScore >= 80 ? 'Excellent Performance' :
                     avgScore >= 70 ? 'Good Performance' :
                     avgScore >= 60 ? 'Average Performance' : 'Below Average'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Category Insights */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Category Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {radarData?.map((category) => {
            const scores = selectedOrganizations?.map(org => category?.[org?.name]);
            const avgScore = scores?.reduce((sum, score) => sum + score, 0) / scores?.length;
            const leader = selectedOrganizations?.[scores?.indexOf(Math.max(...scores))];
            
            return (
              <div key={category?.category} className="flex items-center justify-between">
                <span className="text-muted-foreground">{category?.category}</span>
                <div className="text-right">
                  <div className="font-medium text-foreground">Avg: {avgScore?.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Leader: {leader?.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparisonRadarChart;