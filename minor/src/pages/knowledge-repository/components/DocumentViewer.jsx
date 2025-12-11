import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentViewer = ({ document, isOpen, onClose, onBookmark, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [annotations, setAnnotations] = useState([]);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [newAnnotation, setNewAnnotation] = useState('');
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);

  const totalPages = 24; // Mock total pages

  const mockAnnotations = [
    {
      id: 1,
      page: 1,
      content: 'Key insight about AI implementation strategies',
      author: 'Sarah Chen',
      timestamp: '2024-11-04T10:30:00Z',
      position: { x: 200, y: 150 }
    },
    {
      id: 2,
      page: 1,
      content: 'Important methodology reference for our project',
      author: 'Michael Rodriguez',
      timestamp: '2024-11-04T11:15:00Z',
      position: { x: 350, y: 300 }
    }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleAddAnnotation = () => {
    if (newAnnotation?.trim()) {
      const annotation = {
        id: Date.now(),
        page: currentPage,
        content: newAnnotation,
        author: 'You',
        timestamp: new Date()?.toISOString(),
        position: { x: 250, y: 200 }
      };
      setAnnotations(prev => [...prev, annotation]);
      setNewAnnotation('');
      setIsAddingAnnotation(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground line-clamp-1">
              {document?.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(document?.id)}
              className="text-muted-foreground hover:text-warning"
            >
              <Icon name={document?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onShare(document)}
              className="text-muted-foreground hover:text-primary"
            >
              <Icon name="Share2" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.print()}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Printer" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(document?.downloadUrl, '_blank')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Download" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Document Viewer */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
                <div className="w-px h-6 bg-border mx-2"></div>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <Icon name="ZoomOut" size={16} />
                </Button>
                <span className="text-sm text-foreground min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <Icon name="ZoomIn" size={16} />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={showAnnotations ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowAnnotations(!showAnnotations)}
                >
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Annotations ({mockAnnotations?.length + annotations?.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingAnnotation(true)}
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Note
                </Button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto bg-muted/20 p-8">
              <div className="max-w-4xl mx-auto">
                <div
                  className="bg-white border border-border shadow-lg relative"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '20mm'
                  }}
                >
                  {/* Mock PDF Content */}
                  <div className="space-y-6">
                    <div className="text-center border-b border-gray-200 pb-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {document?.title}
                      </h1>
                      <p className="text-gray-600">
                        {document?.organization} • {new Date(document.publishedDate)?.getFullYear()}
                      </p>
                    </div>

                    <div className="space-y-4 text-gray-800 leading-relaxed">
                      <h2 className="text-xl font-semibold">Abstract</h2>
                      <p>{document?.abstract}</p>
                      
                      <h2 className="text-xl font-semibold">Introduction</h2>
                      <p>
                        This comprehensive analysis examines the current state of innovation excellence 
                        across various industry sectors. The research methodology incorporates both 
                        quantitative metrics and qualitative assessments to provide a holistic view 
                        of organizational innovation capabilities.
                      </p>
                      
                      <p>
                        Key performance indicators include R&D investment ratios, patent portfolios, 
                        human capital development, and ecosystem collaboration metrics. The study 
                        reveals significant variations in innovation approaches across different 
                        organizational structures and market contexts.
                      </p>

                      <h2 className="text-xl font-semibold">Methodology</h2>
                      <p>
                        Our research framework combines multiple data collection methods including 
                        structured surveys, in-depth interviews, and performance analytics. The 
                        sample includes organizations from technology, healthcare, manufacturing, 
                        and financial services sectors.
                      </p>
                    </div>
                  </div>

                  {/* Annotations Overlay */}
                  {showAnnotations && (
                    <>
                      {mockAnnotations?.concat(annotations)?.map((annotation) => (
                        annotation?.page === currentPage && (
                          <div
                            key={annotation?.id}
                            className="absolute bg-warning text-warning-foreground p-2 rounded-lg shadow-lg max-w-xs z-10"
                            style={{
                              left: annotation?.position?.x,
                              top: annotation?.position?.y
                            }}
                          >
                            <div className="text-xs font-medium mb-1">
                              {annotation?.author} • {formatTimestamp(annotation?.timestamp)}
                            </div>
                            <div className="text-sm">{annotation?.content}</div>
                          </div>
                        )
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Annotations Sidebar */}
          {showAnnotations && (
            <div className="w-80 border-l border-border bg-muted/30 flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Annotations</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockAnnotations?.concat(annotations)?.map((annotation) => (
                  <div key={annotation?.id} className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary">
                        Page {annotation?.page}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(annotation?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{annotation?.content}</p>
                    <p className="text-xs text-muted-foreground">— {annotation?.author}</p>
                  </div>
                ))}
              </div>

              {/* Add Annotation Form */}
              {isAddingAnnotation && (
                <div className="p-4 border-t border-border">
                  <Input
                    type="text"
                    placeholder="Add your annotation..."
                    value={newAnnotation}
                    onChange={(e) => setNewAnnotation(e?.target?.value)}
                    className="mb-3"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleAddAnnotation}>
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsAddingAnnotation(false);
                        setNewAnnotation('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;