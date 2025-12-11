import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const KnowledgeRepository = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
  { id: 'all', label: 'All Content', count: 247 },
  { id: 'case-studies', label: 'Case Studies', count: 89 },
  { id: 'research-papers', label: 'Research Papers', count: 156 },
  { id: 'best-practices', label: 'Best Practices', count: 67 },
  { id: 'white-papers', label: 'White Papers', count: 34 },
  { id: 'reports', label: 'Industry Reports', count: 45 }];


  const content = [
  {
    id: 1,
    title: 'AI-Driven Innovation in Healthcare: A Comprehensive Case Study',
    type: 'Case Study',
    author: 'Dr. Sarah Chen, Innovation Research Institute',
    publishDate: '2024-11-01',
    readTime: '12 min read',
    downloads: 1247,
    views: 3456,
    tags: ['AI', 'Healthcare', 'Digital Transformation', 'Case Study'],
    description: `Comprehensive analysis of how artificial intelligence technologies are revolutionizing healthcare innovation processes across leading medical institutions.\n\nThis study examines implementation strategies, challenges faced, and measurable outcomes achieved through AI integration in research and development workflows.`,
    thumbnail: "https://images.unsplash.com/photo-1636973879067-9404573bdc78",
    thumbnailAlt: 'Modern medical facility with AI technology displays and healthcare professionals',
    category: 'case-studies',
    featured: true
  },
  {
    id: 2,
    title: 'Global Innovation Metrics: Standardization and Best Practices',
    type: 'Research Paper',
    author: 'Prof. Michael Rodriguez, Global Innovation Council',
    publishDate: '2024-10-28',
    readTime: '18 min read',
    downloads: 892,
    views: 2134,
    tags: ['Metrics', 'Standardization', 'Global Trends', 'Research'],
    description: `Research paper examining the standardization of innovation measurement frameworks across different regions and industries.\n\nProvides recommendations for establishing universal metrics while accounting for regional and sectoral variations in innovation practices.`,
    thumbnail: "https://images.unsplash.com/photo-1714974528693-f77f6fcc56af",
    thumbnailAlt: 'Global business meeting with diverse professionals analyzing innovation charts',
    category: 'research-papers',
    featured: false
  },
  {
    id: 3,
    title: 'Building Sustainable Innovation Ecosystems: Lessons from Silicon Valley',
    type: 'Best Practice',
    author: 'Innovation Excellence Team',
    publishDate: '2024-10-25',
    readTime: '8 min read',
    downloads: 1567,
    views: 4231,
    tags: ['Ecosystem', 'Sustainability', 'Silicon Valley', 'Best Practices'],
    description: `Best practice guide outlining key strategies for building and maintaining sustainable innovation ecosystems based on Silicon Valley's success model.\n\nIncludes actionable frameworks for fostering collaboration between startups, corporations, and research institutions.`,
    thumbnail: "https://images.unsplash.com/photo-1594027706420-b09650109c49", thumbnailAlt: 'Silicon Valley tech campus with modern buildings and innovation centers', category: 'best-practices',
    featured: true
  },
  {
    id: 4,
    title: 'Quantum Computing Innovation Trends 2024', type: 'White Paper', author: 'Quantum Research Consortium', publishDate: '2024-10-22', readTime: '15 min read',
    downloads: 634,
    views: 1876,
    tags: ['Quantum Computing', 'Technology Trends', 'R&D', 'Future Tech'],
    description: `White paper analyzing current trends and future projections in quantum computing innovation across academic and commercial sectors.\n\nExamines investment patterns, breakthrough technologies, and potential applications driving the quantum revolution.`,
    thumbnail: "https://images.unsplash.com/photo-1656431756476-4dc873d79678", thumbnailAlt: 'Quantum computing laboratory with advanced quantum processors and research equipment', category: 'white-papers',
    featured: false
  },
  {
    id: 5,
    title: 'Green Innovation Index: Measuring Environmental Impact', type: 'Industry Report', author: 'Sustainable Innovation Alliance', publishDate: '2024-10-20', readTime: '22 min read',
    downloads: 1123,
    views: 2987,
    tags: ['Green Innovation', 'Environmental Impact', 'Sustainability', 'Metrics'],
    description: `Comprehensive industry report introducing the Green Innovation Index, a new framework for measuring environmental impact of innovation initiatives.\n\nProvides benchmarking data across industries and regions with actionable insights for sustainable innovation strategies.`,
    thumbnail: "https://images.unsplash.com/photo-1661776724269-44db3d4eef5f", thumbnailAlt: 'Green technology facility with solar panels and sustainable innovation displays', category: 'reports',
    featured: false
  },
  {
    id: 6,
    title: 'Digital Transformation in Manufacturing: Innovation Case Studies', type: 'Case Study', author: 'Manufacturing Innovation Lab', publishDate: '2024-10-18', readTime: '14 min read',
    downloads: 756,
    views: 2145,
    tags: ['Digital Transformation', 'Manufacturing', 'Industry 4.0', 'Case Study'],
    description: `Collection of case studies showcasing successful digital transformation initiatives in manufacturing organizations worldwide.\n\nHighlights implementation strategies, technology adoption patterns, and measurable business outcomes achieved through innovation.`,
    thumbnail: "https://images.unsplash.com/photo-1703563210719-1c5f8586c6d6", thumbnailAlt: 'Modern manufacturing facility with digital displays and automated production lines', category: 'case-studies',
    featured: false
  }];


  const filteredContent = content?.filter((item) => {
    const matchesSearch = item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedContent = [...filteredContent]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.publishDate) - new Date(a.publishDate);
      case 'popular':
        return b?.views - a?.views;
      case 'downloads':
        return b?.downloads - a?.downloads;
      default:
        return 0;
    }
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Case Study':return 'FileText';
      case 'Research Paper':return 'BookOpen';
      case 'Best Practice':return 'CheckCircle';
      case 'White Paper':return 'FileCheck';
      case 'Industry Report':return 'BarChart3';
      default:return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Case Study':return 'bg-blue-100 text-blue-800';
      case 'Research Paper':return 'bg-green-100 text-green-800';
      case 'Best Practice':return 'bg-purple-100 text-purple-800';
      case 'White Paper':return 'bg-orange-100 text-orange-800';
      case 'Industry Report':return 'bg-red-100 text-red-800';
      default:return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Knowledge Repository</h3>
          <p className="text-sm text-muted-foreground">Research papers, case studies, and best practices</p>
        </div>
        <Icon name="BookOpen" size={20} className="text-muted-foreground" />
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search knowledge base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />

        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">

          {categories?.map((category) =>
          <option key={category?.id} value={category?.id}>
              {category?.label} ({category?.count})
            </option>
          )}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">

          <option value="recent">Most Recent</option>
          <option value="popular">Most Viewed</option>
          <option value="downloads">Most Downloaded</option>
        </select>
      </div>
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedContent?.map((item) =>
        <div key={item?.id} className={`border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 ${item?.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <div className="relative">
              <Image
              src={item?.thumbnail}
              alt={item?.thumbnailAlt}
              className="w-full h-48 object-cover" />

              {item?.featured &&
            <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                    Featured
                  </span>
                </div>
            }
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(item?.type)}`}>
                  {item?.type}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground line-clamp-2 flex-1">{item?.title}</h4>
                <Icon name={getTypeIcon(item?.type)} size={20} className="text-muted-foreground ml-2 flex-shrink-0" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{item?.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {item?.tags?.slice(0, 3)?.map((tag) =>
              <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {tag}
                  </span>
              )}
                {item?.tags?.length > 3 &&
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    +{item?.tags?.length - 3} more
                  </span>
              }
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{item?.author}</span>
                <span>{new Date(item.publishDate)?.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{item?.views?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{item?.downloads?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{item?.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} className="mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Load More */}
      <div className="flex justify-center mt-6">
        <Button variant="outline">
          Load More Content
        </Button>
      </div>
    </div>);

};

export default KnowledgeRepository;