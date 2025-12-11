import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '1y',
    organizationType: 'all',
    region: 'all',
    sector: 'all',
    innovationScore: 'all',
    dataSource: 'all'
  });

  const filterOptions = {
    dateRange: [
      { value: '1m', label: 'Last Month' },
      { value: '3m', label: 'Last 3 Months' },
      { value: '6m', label: 'Last 6 Months' },
      { value: '1y', label: 'Last Year' },
      { value: '2y', label: 'Last 2 Years' },
      { value: 'all', label: 'All Time' }
    ],
    organizationType: [
      { value: 'all', label: 'All Types' },
      { value: 'corporation', label: 'Corporations' },
      { value: 'startup', label: 'Startups' },
      { value: 'research-institution', label: 'Research Institutions' },
      { value: 'university', label: 'Universities' },
      { value: 'government', label: 'Government Agencies' }
    ],
    region: [
      { value: 'all', label: 'All Regions' },
      { value: 'north-america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia-pacific', label: 'Asia Pacific' },
      { value: 'latin-america', label: 'Latin America' },
      { value: 'middle-east', label: 'Middle East' },
      { value: 'africa', label: 'Africa' }
    ],
    sector: [
      { value: 'all', label: 'All Sectors' },
      { value: 'technology', label: 'Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'financial-services', label: 'Financial Services' },
      { value: 'energy', label: 'Energy' },
      { value: 'automotive', label: 'Automotive' },
      { value: 'aerospace', label: 'Aerospace' },
      { value: 'biotechnology', label: 'Biotechnology' }
    ],
    innovationScore: [
      { value: 'all', label: 'All Scores' },
      { value: 'high', label: 'High (8.0+)' },
      { value: 'medium', label: 'Medium (6.0-7.9)' },
      { value: 'low', label: 'Low (Below 6.0)' }
    ],
    dataSource: [
      { value: 'all', label: 'All Sources' },
      { value: 'self-reported', label: 'Self-Reported' },
      { value: 'verified', label: 'Verified Data' },
      { value: 'public-records', label: 'Public Records' },
      { value: 'third-party', label: 'Third-Party Validated' }
    ]
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '1y',
      organizationType: 'all',
      region: 'all',
      sector: 'all',
      innovationScore: 'all',
      dataSource: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Advanced Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            disabled={getActiveFilterCount() === 0}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Date Range</label>
          <select
            value={filters?.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions?.dateRange?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Organization Type</label>
          <select
            value={filters?.organizationType}
            onChange={(e) => handleFilterChange('organizationType', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions?.organizationType?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Region</label>
          <select
            value={filters?.region}
            onChange={(e) => handleFilterChange('region', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions?.region?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Sector</label>
          <select
            value={filters?.sector}
            onChange={(e) => handleFilterChange('sector', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions?.sector?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-border animate-fade-in">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Innovation Score</label>
            <select
              value={filters?.innovationScore}
              onChange={(e) => handleFilterChange('innovationScore', e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {filterOptions?.innovationScore?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Data Source</label>
            <select
              value={filters?.dataSource}
              onChange={(e) => handleFilterChange('dataSource', e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {filterOptions?.dataSource?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Filter Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (value === 'all') return null;
              const option = filterOptions?.[key]?.find(opt => opt?.value === value);
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  <span>{option?.label}</span>
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:text-foreground"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;