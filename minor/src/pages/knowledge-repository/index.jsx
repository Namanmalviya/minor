import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import FeaturedContent from './components/FeaturedContent';
import ContentGrid from './components/ContentGrid';
import UploadModal from './components/UploadModal';
import DocumentViewer from './components/DocumentViewer';

const KnowledgeRepository = () => {
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    contentType: '',
    category: '',
    theme: '',
    dateRange: '',
    sector: ''
  });
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');

  const itemsPerPage = 9;

  // Mock data for knowledge repository
  const mockContents = [
  {
    id: 'kr-001',
    title: 'Digital Innovation Strategies for Healthcare Organizations',
    abstract: `Comprehensive analysis of digital transformation initiatives in healthcare, examining successful implementation strategies, technology adoption patterns, and patient outcome improvements across leading medical institutions.`,
    type: 'research-paper',
    typeLabel: 'Research Paper',
    category: 'digital-transformation',
    theme: 'healthcare-innovation',
    tags: ['digital health', 'telemedicine', 'AI diagnostics', 'patient care'],
    organization: 'Johns Hopkins Medical Innovation Lab',
    authors: 'Dr. Emily Watson, Dr. Michael Chen, Sarah Rodriguez',
    publishedDate: '2024-10-28',
    views: 3247,
    downloads: 892,
    rating: 4.8,
    reviewCount: 156,
    relevanceScore: 95,
    thumbnail: "https://images.unsplash.com/photo-1713600025722-f17601622fb4",
    thumbnailAlt: 'Modern hospital corridor with digital displays and healthcare technology systems',
    downloadUrl: '/documents/digital-innovation-healthcare.pdf',
    isBookmarked: false,
    sector: 'healthcare'
  },
  {
    id: 'kr-002',
    title: 'Sustainable Manufacturing Innovation Case Study: Tesla Gigafactory',
    abstract: `In-depth case study examining Tesla's revolutionary approach to sustainable manufacturing, including renewable energy integration, waste reduction strategies, and supply chain optimization methodologies.`,
    type: 'case-study', typeLabel: 'Case Study', category: 'sustainability', theme: 'clean-energy',
    tags: ['sustainable manufacturing', 'renewable energy', 'supply chain', 'automation'],
    organization: 'MIT Sloan School of Management', authors: 'Prof. David Kim, Lisa Thompson, James Wilson', publishedDate: '2024-10-25',
    views: 2891,
    downloads: 1247,
    rating: 4.9,
    reviewCount: 203,
    relevanceScore: 92,
    thumbnail: "https://images.unsplash.com/photo-1695395894170-ff75a98f176c", thumbnailAlt: 'Tesla Gigafactory exterior showing solar panels and sustainable manufacturing facility',
    downloadUrl: '/documents/tesla-gigafactory-case-study.pdf', isBookmarked: true, sector: 'manufacturing'
  },
  {
    id: 'kr-003', title: 'AI-Driven Financial Services Innovation Framework',
    abstract: `Best practices guide for implementing artificial intelligence solutions in financial services, covering risk management, customer experience enhancement, and regulatory compliance considerations.`,
    type: 'best-practice', typeLabel: 'Best Practice', category: 'rd-innovation', theme: 'fintech',
    tags: ['artificial intelligence', 'fintech', 'risk management', 'customer experience'],
    organization: 'Stanford Financial Innovation Lab', authors: 'Dr. Rachel Martinez, Alex Johnson, Kevin Lee', publishedDate: '2024-11-01',
    views: 1923,
    downloads: 654,
    rating: 4.7,
    reviewCount: 89,
    relevanceScore: 88,
    thumbnail: "https://images.unsplash.com/photo-1661422832482-86669ebbe0b9", thumbnailAlt: 'Modern financial technology interface showing AI-powered banking and investment platforms',
    downloadUrl: '/documents/ai-financial-services-framework.pdf', isBookmarked: false, sector: 'financial-services'
  },
  {
    id: 'kr-004', title: 'Smart City Innovation Policy Framework: Singapore Model', abstract: `Comprehensive policy framework analysis of Singapore's smart city initiatives, examining governance structures, public-private partnerships, and citizen engagement strategies for urban innovation.`,
    type: 'policy-framework',
    typeLabel: 'Policy Framework',
    category: 'innovation-policy',
    theme: 'smart-cities',
    tags: ['smart cities', 'urban planning', 'public policy', 'digital governance'],
    organization: 'National University of Singapore',
    authors: 'Prof. Wei Lin Tan, Dr. Priya Sharma, Mark Anderson',
    publishedDate: '2024-10-20',
    views: 2156,
    downloads: 789,
    rating: 4.6,
    reviewCount: 124,
    relevanceScore: 85,
    thumbnail: "https://images.unsplash.com/photo-1506092354914-509dc4bff79c",
    thumbnailAlt: 'Singapore smart city skyline with digital infrastructure and urban technology integration',
    downloadUrl: '/documents/singapore-smart-city-policy.pdf',
    isBookmarked: false,
    sector: 'government'
  },
  {
    id: 'kr-005',
    title: 'Biotechnology Startup Ecosystem Development Methodology',
    abstract: `Systematic methodology for developing biotechnology startup ecosystems, including incubation strategies, funding mechanisms, regulatory navigation, and commercialization pathways.`,
    type: 'methodology',
    typeLabel: 'Innovation Methodology',
    category: 'startup-ecosystem',
    theme: 'biotechnology',
    tags: ['biotechnology', 'startup ecosystem', 'incubation', 'commercialization'],
    organization: 'Harvard Business School',
    authors: 'Dr. Jennifer Adams, Robert Chen, Maria Gonzalez',
    publishedDate: '2024-10-15',
    views: 1745,
    downloads: 523,
    rating: 4.5,
    reviewCount: 67,
    relevanceScore: 82,
    thumbnail: "https://images.unsplash.com/photo-1631084167546-484c2cfa2194",
    thumbnailAlt: 'Biotechnology laboratory with researchers working on innovative medical research and development',
    downloadUrl: '/documents/biotech-startup-methodology.pdf',
    isBookmarked: true,
    sector: 'technology'
  },
  {
    id: 'kr-006',
    title: 'Technology Transfer Best Practices in Academic Institutions',
    abstract: `Comprehensive guide to effective technology transfer practices in universities, covering intellectual property management, industry partnerships, and commercialization success factors.`,
    type: 'best-practice',
    typeLabel: 'Best Practice',
    category: 'technology-transfer',
    theme: 'artificial-intelligence',
    tags: ['technology transfer', 'academic research', 'intellectual property', 'commercialization'],
    organization: 'University of California Berkeley',
    authors: 'Prof. Susan Miller, Dr. Thomas Brown, Lisa Chang',
    publishedDate: '2024-10-12',
    views: 2034,
    downloads: 698,
    rating: 4.4,
    reviewCount: 91,
    relevanceScore: 79,
    thumbnail: "https://images.unsplash.com/photo-1731149791398-404c444ed5c9",
    thumbnailAlt: 'University research laboratory with scientists collaborating on technology transfer projects',
    downloadUrl: '/documents/tech-transfer-best-practices.pdf',
    isBookmarked: false,
    sector: 'education'
  }];


  const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'views-desc', label: 'Most Viewed' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'downloads-desc', label: 'Most Downloaded' }];


  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setContents(mockContents);
      setFilteredContents(mockContents);
      setTotalPages(Math.ceil(mockContents?.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchFilters, sortBy, contents]);

  const applyFiltersAndSort = () => {
    let filtered = [...contents];

    // Apply search query
    if (searchFilters?.query) {
      const query = searchFilters?.query?.toLowerCase();
      filtered = filtered?.filter((content) =>
      content?.title?.toLowerCase()?.includes(query) ||
      content?.abstract?.toLowerCase()?.includes(query) ||
      content?.tags?.some((tag) => tag?.toLowerCase()?.includes(query)) ||
      content?.organization?.toLowerCase()?.includes(query)
      );
    }

    // Apply filters
    if (searchFilters?.contentType) {
      filtered = filtered?.filter((content) => content?.type === searchFilters?.contentType);
    }
    if (searchFilters?.category) {
      filtered = filtered?.filter((content) => content?.category === searchFilters?.category);
    }
    if (searchFilters?.theme) {
      filtered = filtered?.filter((content) => content?.theme === searchFilters?.theme);
    }
    if (searchFilters?.sector) {
      filtered = filtered?.filter((content) => content?.sector === searchFilters?.sector);
    }

    // Apply date range filter
    if (searchFilters?.dateRange) {
      const now = new Date();
      let filterDate = new Date();

      switch (searchFilters?.dateRange) {
        case 'last-week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'last-month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'last-quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'last-year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
        default:
          filterDate = null;
      }

      if (filterDate) {
        filtered = filtered?.filter((content) =>
        new Date(content.publishedDate) >= filterDate
        );
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.publishedDate) - new Date(a.publishedDate);
        case 'date-asc':
          return new Date(a.publishedDate) - new Date(b.publishedDate);
        case 'views-desc':
          return b?.views - a?.views;
        case 'rating-desc':
          return b?.rating - a?.rating;
        case 'downloads-desc':
          return b?.downloads - a?.downloads;
        case 'relevance':
        default:
          return (b?.relevanceScore || 0) - (a?.relevanceScore || 0);
      }
    });

    setFilteredContents(filtered);
    setTotalPages(Math.ceil(filtered?.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleViewContent = (content) => {
    setSelectedDocument(content);
    setIsDocumentViewerOpen(true);
  };

  const handleBookmarkContent = (contentId) => {
    setContents((prev) => prev?.map((content) =>
    content?.id === contentId ?
    { ...content, isBookmarked: !content?.isBookmarked } :
    content
    ));
  };

  const handleShareContent = (content) => {
    if (navigator.share) {
      navigator.share({
        title: content?.title,
        text: content?.abstract,
        url: window.location?.href + '?doc=' + content?.id
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href + '?doc=' + content?.id);
      // Show toast notification
    }
  };

  const handleUpload = (uploadData) => {
    const newContent = {
      ...uploadData,
      views: 0,
      downloads: 0,
      rating: 0,
      reviewCount: 0,
      relevanceScore: 0,
      thumbnail: "https://images.unsplash.com/photo-1690996258835-ce5044487813",
      thumbnailAlt: 'Document preview thumbnail showing uploaded content',
      downloadUrl: '/documents/' + uploadData?.title?.toLowerCase()?.replace(/\s+/g, '-') + '.pdf',
      isBookmarked: false
    };

    setContents((prev) => [newContent, ...prev]);
  };

  const getCurrentPageContents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContents?.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Repository</h1>
              <p className="text-muted-foreground">
                Discover case studies, research papers, and best practices from innovation leaders
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(true)}>

                <Icon name="Upload" size={16} className="mr-2" />
                Upload Content
              </Button>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none">

                  <Icon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none">

                  <Icon name="List" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
         

          {/* Featured Content */}
          <FeaturedContent onViewContent={handleViewContent} />

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-foreground">
                All Content
              </h2>
              <span className="text-muted-foreground">
                {filteredContents?.length} results
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">

                {sortOptions?.map((option) =>
                <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                )}
              </select>
            </div>
          </div>

          <SearchFilters
            onFiltersChange={setSearchFilters}
            onSearch={handleSearch} />

          {/* Content Grid */}
          <ContentGrid
            contents={getCurrentPageContents()}
            loading={loading}
            onViewContent={handleViewContent}
            onBookmarkContent={handleBookmarkContent}
            onShareContent={handleShareContent}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} />

        </div>
      </main>
      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload} />

      {/* Document Viewer */}
      <DocumentViewer
        document={selectedDocument}
        isOpen={isDocumentViewerOpen}
        onClose={() => setIsDocumentViewerOpen(false)}
        onBookmark={handleBookmarkContent}
        onShare={handleShareContent} />

    </div>);

};

export default KnowledgeRepository;