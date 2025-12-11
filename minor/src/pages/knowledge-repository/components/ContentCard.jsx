import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCard = ({ content, onView, onBookmark, onShare }) => {
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'case-study': return 'FileText';
      case 'research-paper': return 'BookOpen';
      case 'best-practice': return 'Award';
      case 'policy-framework': return 'Scale';
      case 'methodology': return 'Lightbulb';
      default: return 'File';
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'case-study': return 'text-blue-600 bg-blue-50';
      case 'research-paper': return 'text-green-600 bg-green-50';
      case 'best-practice': return 'text-purple-600 bg-purple-50';
      case 'policy-framework': return 'text-orange-600 bg-orange-50';
      case 'methodology': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
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
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getContentTypeColor(content?.type)}`}>
            <Icon name={getContentTypeIcon(content?.type)} size={20} />
          </div>
          <div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getContentTypeColor(content?.type)}`}>
              {content?.typeLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(content?.id)}
            className="text-muted-foreground hover:text-warning"
          >
            <Icon name={content?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(content)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>
      {/* Thumbnail */}
      {content?.thumbnail && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={content?.thumbnail}
            alt={content?.thumbnailAlt}
            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {content?.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {content?.abstract}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {content?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {content?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{content?.tags?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(content?.publishedDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Building2" size={14} />
            <span>{content?.organization}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={14} />
            <span>{content?.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={14} />
            <span>{content?.downloads}</span>
          </div>
        </div>
      </div>
      {/* Relevance Score */}
      {content?.relevanceScore && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Relevance Score</span>
            <span className="font-medium text-foreground">{content?.relevanceScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${content?.relevanceScore}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <Icon
                key={star}
                name="Star"
                size={14}
                className={star <= content?.rating ? "text-warning fill-current" : "text-muted-foreground"}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({content?.reviewCount} reviews)
          </span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {content?.rating}/5
        </span>
      </div>
      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => onView(content)}
          className="flex-1"
        >
          <Icon name="Eye" size={16} className="mr-2" />
          View Document
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open(content?.downloadUrl, '_blank')}
        >
          <Icon name="Download" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ContentCard;