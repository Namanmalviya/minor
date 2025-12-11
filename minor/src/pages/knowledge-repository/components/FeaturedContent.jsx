import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedContent = ({ onViewContent }) => {
  const featuredItems = [
  {
    id: 'featured-1',
    title: 'AI-Driven Innovation Strategies in Manufacturing',
    abstract: 'Comprehensive analysis of how artificial intelligence is transforming manufacturing innovation processes across Fortune 500 companies.',
    type: 'research-paper',
    typeLabel: 'Research Paper',
    thumbnail: "https://images.unsplash.com/photo-1703563210719-1c5f8586c6d6",
    thumbnailAlt: 'Modern manufacturing facility with robotic automation and AI systems',
    organization: 'MIT Innovation Lab',
    publishedDate: '2024-10-28',
    views: 2847,
    downloads: 892,
    rating: 4.8,
    category: 'trending',
    badge: 'Trending'
  },
  {
    id: 'featured-2',
    title: 'Sustainable Innovation Framework for Startups',
    abstract: 'Best practices guide for implementing sustainable innovation methodologies in early-stage technology startups.',
    type: 'best-practice',
    typeLabel: 'Best Practice',
    thumbnail: "https://images.unsplash.com/photo-1664464683525-29b5d442af54",
    thumbnailAlt: 'Green technology startup office with sustainable energy solutions and eco-friendly workspace',
    organization: 'Stanford Entrepreneurship Center',
    publishedDate: '2024-11-01',
    views: 1923,
    downloads: 654,
    rating: 4.9,
    category: 'recent',
    badge: 'New'
  },
  {
    id: 'featured-3',
    title: 'Digital Transformation Case Study: FinTech Innovation',
    abstract: 'In-depth case study examining how traditional financial institutions successfully implemented digital innovation strategies.',
    type: 'case-study',
    typeLabel: 'Case Study',
    thumbnail: "https://images.unsplash.com/photo-1661422832482-86669ebbe0b9",
    thumbnailAlt: 'Modern financial technology interface showing digital banking and payment systems',
    organization: 'Harvard Business School',
    publishedDate: '2024-10-25',
    views: 3156,
    downloads: 1247,
    rating: 4.7,
    category: 'editors-pick',
    badge: "Editor\'s Pick"
  }];


  const getBadgeColor = (category) => {
    switch (category) {
      case 'trending':return 'bg-error text-error-foreground';
      case 'recent':return 'bg-success text-success-foreground';
      case 'editors-pick':return 'bg-warning text-warning-foreground';
      default:return 'bg-primary text-primary-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Featured Content</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Trending papers, recent additions, and editor's picks
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredItems?.map((item) =>
        <div
          key={item?.id}
          className="group cursor-pointer"
          onClick={() => onViewContent(item)}>

            <div className="relative mb-4 overflow-hidden rounded-lg">
              <Image
              src={item?.thumbnail}
              alt={item?.thumbnailAlt}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

              <div className="absolute top-3 left-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(item?.category)}`}>
                  {item?.badge}
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white rounded-full p-3">
                    <Icon name="Eye" size={20} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {item?.typeLabel}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(item?.publishedDate)}
                </span>
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {item?.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item?.abstract}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Building2" size={12} />
                  <span>{item?.organization}</span>
                </span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{item?.views?.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span>{item?.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default FeaturedContent;