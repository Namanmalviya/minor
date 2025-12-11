import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PublicLeaderboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [viewMode, setViewMode] = useState('public');

  const categories = [
  { id: 'overall', label: 'Overall Innovation', icon: 'Trophy' },
  { id: 'rd-investment', label: 'R&D Investment', icon: 'DollarSign' },
  { id: 'patent-activity', label: 'Patent Activity', icon: 'FileText' },
  { id: 'startup-ecosystem', label: 'Startup Ecosystem', icon: 'Rocket' },
  { id: 'collaboration', label: 'Collaboration Index', icon: 'Users' }];


  const leaderboardData = {
    overall: [
    {
      rank: 1,
      organization: 'TechCorp Industries',
      type: 'Corporation',
      sector: 'Technology',
      region: 'North America',
      score: 9.2,
      change: '+0.3',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e2eb2999-1762260283129.png",
      logoAlt: 'Modern tech company logo with blue geometric design',
      isAnonymized: false
    },
    {
      rank: 2,
      organization: 'Global Research Institute',
      type: 'Research Institution',
      sector: 'Multi-sector',
      region: 'Europe',
      score: 9.0,
      change: '+0.1',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_170071bb5-1762260284522.png",
      logoAlt: 'Academic institution logo with traditional shield emblem',
      isAnonymized: false
    },
    {
      rank: 3,
      organization: 'Organization #3247',
      type: 'Corporation',
      sector: 'Healthcare',
      region: 'Asia Pacific',
      score: 8.8,
      change: '+0.5',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13cdb791d-1762260285419.png",
      logoAlt: 'Healthcare company logo with medical cross symbol',
      isAnonymized: true
    },
    {
      rank: 4,
      organization: 'Innovation Labs Ltd',
      type: 'Startup',
      sector: 'Biotechnology',
      region: 'North America',
      score: 8.6,
      change: '+0.2',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1df18d89b-1762260284524.png",
      logoAlt: 'Biotech startup logo with DNA helix design',
      isAnonymized: false
    },
    {
      rank: 5,
      organization: 'Organization #1892',
      type: 'University',
      sector: 'Education',
      region: 'Europe',
      score: 8.4,
      change: '-0.1',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f7be4612-1762260285419.png",
      logoAlt: 'University logo with classical academic building design',
      isAnonymized: true
    },
    {
      rank: 6,
      organization: 'Future Energy Corp',
      type: 'Corporation',
      sector: 'Energy',
      region: 'Latin America',
      score: 8.2,
      change: '+0.4',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17d253213-1762260284135.png",
      logoAlt: 'Energy company logo with green leaf and lightning bolt',
      isAnonymized: false
    },
    {
      rank: 7,
      organization: 'Quantum Dynamics Inc',
      type: 'Startup',
      sector: 'Technology',
      region: 'North America',
      score: 8.0,
      change: '+0.6',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_190f91197-1762260285415.png",
      logoAlt: 'Quantum tech startup logo with atomic particle design',
      isAnonymized: false
    },
    {
      rank: 8,
      organization: 'Organization #5634',
      type: 'Research Institution',
      sector: 'Manufacturing',
      region: 'Asia Pacific',
      score: 7.8,
      change: '0.0',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14c081b0f-1762260285337.png",
      logoAlt: 'Manufacturing research institute logo with gear mechanism',
      isAnonymized: true
    }]

  };

  const getCurrentData = () => {
    return leaderboardData?.[selectedCategory] || leaderboardData?.overall;
  };

  const getChangeIcon = (change) => {
    const numChange = parseFloat(change);
    if (numChange > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (numChange < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Public Innovation Leaderboard</h3>
          <p className="text-sm text-muted-foreground">Top-performing organizations across innovation metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('public')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
              viewMode === 'public' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Public View
            </button>
            <button
              onClick={() => setViewMode('research')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
              viewMode === 'research' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
              }>

              Research View
            </button>
          </div>
          <Icon name="Award" size={20} className="text-muted-foreground" />
        </div>
      </div>
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) =>
        <button
          key={category?.id}
          onClick={() => setSelectedCategory(category?.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          selectedCategory === category?.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'}`
          }>

            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        )}
      </div>
      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Rank</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Organization</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Sector</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Region</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Score</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Change</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentData()?.map((item) => {
              const changeInfo = getChangeIcon(item?.change);
              return (
                <tr key={item?.rank} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold ${getRankBadge(item?.rank)}`}>
                      {item?.rank}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item?.isAnonymized ?
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Icon name="Building2" size={20} className="text-muted-foreground" />
                          </div> :

                        <Image
                          src={item?.logo}
                          alt={item?.logoAlt}
                          className="w-full h-full object-cover" />

                        }
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item?.organization}</p>
                        {item?.isAnonymized && viewMode === 'research' &&
                        <p className="text-xs text-muted-foreground">Anonymized for research</p>
                        }
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {item?.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-sm text-foreground">{item?.sector}</td>
                  <td className="py-4 px-2 text-sm text-foreground">{item?.region}</td>
                  <td className="py-4 px-2 text-right">
                    <span className="text-lg font-semibold text-foreground">{item?.score}</span>
                    <span className="text-sm text-muted-foreground">/10</span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${changeInfo?.color}`}>
                      <Icon name={changeInfo?.icon} size={16} />
                      <span className="text-sm font-medium">{item?.change}</span>
                    </div>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {viewMode === 'research' ? 'Research access with anonymization' : 'Public leaderboard view'}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Updated: {new Date()?.toLocaleDateString()} | Next update: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString()}
        </div>
      </div>
    </div>);

};

export default PublicLeaderboard;