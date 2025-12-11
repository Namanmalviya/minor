import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RankingLeaderboard = ({ selectedOrganizations }) => {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [viewMode, setViewMode] = useState('public'); // public or anonymous

  const categoryOptions = [
  { value: 'overall', label: 'Overall Innovation Score' },
  { value: 'rd-metrics', label: 'R&D Metrics' },
  { value: 'human-capital', label: 'Human Capital' },
  { value: 'innovation-output', label: 'Innovation Output' },
  { value: 'financial-indicators', label: 'Financial Indicators' },
  { value: 'ecosystem-metrics', label: 'Ecosystem Metrics' }];


  // Mock leaderboard data
  const leaderboardData = [
  {
    id: 'org-2',
    name: 'BioMed Research Institute',
    sector: 'Healthcare & Life Sciences',
    region: 'Europe',
    type: 'Research Institution',
    overallScore: 92.3,
    categoryScores: {
      'rd-metrics': 95.2,
      'human-capital': 89.8,
      'innovation-output': 91.5,
      'financial-indicators': 88.7,
      'ecosystem-metrics': 90.3
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e85efe47-1762260285423.png",
    logoAlt: 'BioMed Research Institute logo featuring medical cross symbol in green and white',
    achievements: ['Top R&D Spender', 'Most Patents Filed', 'Innovation Excellence Award 2024'],
    employees: 3500,
    yearFounded: 1995
  },
  {
    id: 'org-5',
    name: 'Green Energy Solutions',
    sector: 'Energy & Utilities',
    region: 'Europe',
    type: 'Medium Enterprise',
    overallScore: 89.2,
    categoryScores: {
      'rd-metrics': 87.5,
      'human-capital': 91.2,
      'innovation-output': 88.9,
      'financial-indicators': 90.1,
      'ecosystem-metrics': 88.3
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1de17d6e6-1762260285263.png",
    logoAlt: 'Green Energy Solutions logo featuring wind turbine silhouette in green gradient',
    achievements: ['Sustainability Leader', 'Clean Tech Innovation Award'],
    employees: 2800,
    yearFounded: 2010
  },
  {
    id: 'org-1',
    name: 'TechCorp Industries',
    sector: 'Technology',
    region: 'North America',
    type: 'Large Enterprise',
    overallScore: 87.5,
    categoryScores: {
      'rd-metrics': 89.1,
      'human-capital': 86.7,
      'innovation-output': 88.2,
      'financial-indicators': 87.9,
      'ecosystem-metrics': 85.6
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_114fef74e-1762260284463.png",
    logoAlt: 'TechCorp Industries circular logo with blue and white geometric design',
    achievements: ['Digital Innovation Leader', 'Best Workplace for Innovation'],
    employees: 15000,
    yearFounded: 1985
  },
  {
    id: 'org-4',
    name: 'FinTech Innovations',
    sector: 'Financial Services',
    region: 'North America',
    type: 'Startup',
    overallScore: 85.7,
    categoryScores: {
      'rd-metrics': 83.4,
      'human-capital': 88.9,
      'innovation-output': 86.2,
      'financial-indicators': 84.8,
      'ecosystem-metrics': 85.2
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0bdc02b-1762260285322.png",
    logoAlt: 'FinTech Innovations logo with stylized dollar sign and circuit pattern in blue',
    achievements: ['Fastest Growing Startup', 'Fintech Innovation Award'],
    employees: 450,
    yearFounded: 2018
  },
  {
    id: 'org-6',
    name: 'AutoTech Dynamics',
    sector: 'Automotive',
    region: 'Asia Pacific',
    type: 'Large Enterprise',
    overallScore: 81.4,
    categoryScores: {
      'rd-metrics': 82.7,
      'human-capital': 79.8,
      'innovation-output': 83.1,
      'financial-indicators': 80.9,
      'ecosystem-metrics': 80.5
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e97707fd-1762260285389.png",
    logoAlt: 'AutoTech Dynamics logo with modern car silhouette and tech elements in silver',
    achievements: ['Automotive Innovation Excellence'],
    employees: 18000,
    yearFounded: 1972
  },
  {
    id: 'org-3',
    name: 'Global Manufacturing Co',
    sector: 'Manufacturing',
    region: 'Asia Pacific',
    type: 'Large Enterprise',
    overallScore: 78.9,
    categoryScores: {
      'rd-metrics': 76.5,
      'human-capital': 80.2,
      'innovation-output': 79.8,
      'financial-indicators': 78.1,
      'ecosystem-metrics': 79.9
    },
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0a54dfe-1762260283744.png",
    logoAlt: 'Global Manufacturing Co logo with industrial gear icon in orange and black',
    achievements: ['Manufacturing Excellence Award'],
    employees: 25000,
    yearFounded: 1965
  }];


  const getCurrentScore = (org) => {
    return selectedCategory === 'overall' ? org?.overallScore : org?.categoryScores?.[selectedCategory];
  };

  const sortedLeaderboard = [...leaderboardData]?.sort((a, b) => getCurrentScore(b) - getCurrentScore(a));

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:return <Icon name="Crown" size={20} className="text-warning" />;
      case 2:return <Icon name="Medal" size={20} className="text-muted-foreground" />;
      case 3:return <Icon name="Award" size={20} className="text-orange-600" />;
      default:return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  const isSelected = (orgId) => selectedOrganizations?.some((org) => org?.id === orgId);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Innovation Excellence Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top performing organizations ranked by innovation metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="min-w-48" />

            <Button
              variant={viewMode === 'public' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode(viewMode === 'public' ? 'anonymous' : 'public')}>

              <Icon name={viewMode === 'public' ? 'Eye' : 'EyeOff'} size={16} className="mr-2" />
              {viewMode === 'public' ? 'Public' : 'Anonymous'}
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {sortedLeaderboard?.map((org, index) => {
          const rank = index + 1;
          const score = getCurrentScore(org);
          const selected = isSelected(org?.id);

          return (
            <div
              key={org?.id}
              className={`p-6 hover:bg-muted/50 transition-colors duration-200 ${
              selected ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`
              }>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(rank)}
                  </div>

                  {/* Organization Info */}
                  <div className="flex items-center space-x-4">
                    {viewMode === 'public' &&
                    <img
                      src={org?.logo}
                      alt={org?.logoAlt}
                      className="w-12 h-12 rounded-full object-cover" />

                    }
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {viewMode === 'public' ? org?.name : `Organization ${String.fromCharCode(65 + index)}`}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{org?.sector}</span>
                        <span>•</span>
                        <span>{org?.region}</span>
                        <span>•</span>
                        <span>{org?.type}</span>
                      </div>
                      {viewMode === 'public' &&
                      <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Users" size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{org?.employees?.toLocaleString()} employees</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">Founded {org?.yearFounded}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                {/* Score and Achievements */}
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score?.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Innovation Score</div>
                  
                  {viewMode === 'public' && org?.achievements?.length > 0 &&
                  <div className="mt-2 space-y-1">
                      {org?.achievements?.slice(0, 2)?.map((achievement, idx) =>
                    <div key={idx} className="flex items-center justify-end space-x-1">
                          <Icon name="Star" size={12} className="text-warning" />
                          <span className="text-xs text-muted-foreground">{achievement}</span>
                        </div>
                    )}
                    </div>
                  }
                </div>
              </div>
              {/* Performance Indicators */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(org?.categoryScores)?.map(([category, categoryScore]) =>
                <div key={category} className="text-center">
                    <div className={`text-sm font-semibold ${getScoreColor(categoryScore)}`}>
                      {categoryScore?.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {category?.replace('-', ' ')}
                    </div>
                  </div>
                )}
              </div>
              {selected &&
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Selected for Comparison</span>
                  </div>
                </div>
              }
            </div>);

        })}
      </div>
      {/* Summary Statistics */}
      <div className="p-6 bg-muted/30 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {sortedLeaderboard?.length}
            </div>
            <div className="text-sm text-muted-foreground">Organizations</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {(sortedLeaderboard?.reduce((sum, org) => sum + getCurrentScore(org), 0) / sortedLeaderboard?.length)?.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {getCurrentScore(sortedLeaderboard?.[0])?.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Top Score</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {sortedLeaderboard?.filter((org) => getCurrentScore(org) >= 85)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Excellence Tier</div>
          </div>
        </div>
      </div>
    </div>);

};

export default RankingLeaderboard;