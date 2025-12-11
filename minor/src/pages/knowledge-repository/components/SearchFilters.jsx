import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onFiltersChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState('');
  const [category, setCategory] = useState('');
  const [theme, setTheme] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [sector, setSector] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const contentTypeOptions = [
    { value: '', label: 'All Content Types' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'research-paper', label: 'Research Papers' },
    { value: 'best-practice', label: 'Best Practices' },
    { value: 'policy-framework', label: 'Policy Frameworks' },
    { value: 'methodology', label: 'Innovation Methodologies' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'rd-innovation', label: 'R&D Innovation' },
    { value: 'digital-transformation', label: 'Digital Transformation' },
    { value: 'sustainability', label: 'Sustainability Innovation' },
    { value: 'startup-ecosystem', label: 'Startup Ecosystem' },
    { value: 'technology-transfer', label: 'Technology Transfer' },
    { value: 'innovation-policy', label: 'Innovation Policy' }
  ];

  const themeOptions = [
    { value: '', label: 'All Themes' },
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'clean-energy', label: 'Clean Energy' },
    { value: 'fintech', label: 'Financial Technology' },
    { value: 'healthcare-innovation', label: 'Healthcare Innovation' },
    { value: 'smart-cities', label: 'Smart Cities' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sectorOptions = [
    { value: '', label: 'All Sectors' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'financial-services', label: 'Financial Services' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government' }
  ];

  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      contentType,
      category,
      theme,
      dateRange,
      sector
    };
    onFiltersChange(filters);
    onSearch(filters);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setContentType('');
    setCategory('');
    setTheme('');
    setDateRange('');
    setSector('');
    const emptyFilters = {
      query: '',
      contentType: '',
      category: '',
      theme: '',
      dateRange: '',
      sector: ''
    };
    onFiltersChange(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Search Knowledge Repository</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          <Icon name={isAdvancedOpen ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
          Advanced Filters
        </Button>
      </div>
      {/* Main Search */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search for case studies, research papers, best practices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} className="px-6">
          <Icon name="Search" size={16} className="mr-2" />
          Search
        </Button>
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Select
          options={contentTypeOptions}
          value={contentType}
          onChange={setContentType}
          placeholder="Content Type"
          className="w-48"
        />
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="Category"
          className="w-48"
        />
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          <Icon name="X" size={14} className="mr-1" />
          Clear All
        </Button>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Theme"
              options={themeOptions}
              value={theme}
              onChange={setTheme}
              placeholder="Select theme"
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
            />
            <Select
              label="Organization Sector"
              options={sectorOptions}
              value={sector}
              onChange={setSector}
              placeholder="Select sector"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;