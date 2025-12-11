import React from 'react';
import ContentCard from './ContentCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const ContentGrid = ({ 
  contents, 
  loading, 
  onViewContent, 
  onBookmarkContent, 
  onShareContent,
  currentPage,
  totalPages,
  onPageChange 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="w-20 h-6 bg-muted rounded-full"></div>
            </div>
            <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-muted rounded"></div>
              <div className="w-3/4 h-4 bg-muted rounded"></div>
              <div className="w-1/2 h-4 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contents?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No content found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search criteria or browse our featured content
        </p>
        <Button variant="outline">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {contents?.map((content) => (
          <ContentCard
            key={content?.id}
            content={content}
            onView={onViewContent}
            onBookmark={onBookmarkContent}
            onShare={onShareContent}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))]?.map((_, index) => {
                const pageNum = Math.max(1, currentPage - 2) + index;
                if (pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;