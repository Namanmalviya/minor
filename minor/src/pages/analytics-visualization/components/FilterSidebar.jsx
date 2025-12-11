import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ onFilterChange, activeFilters }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const organizationTypes = [
    { value: 'corporation', label: 'Corporation' },
    { value: 'startup', label: 'Startup' },
    { value: 'research_institute', label: 'Research Institute' },
    { value: 'university', label: 'University' },
    { value: 'government', label: 'Government Agency' }
  ];

  const sectors = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'finance', label: 'Finance' },
    { value: 'energy', label: 'Energy' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'aerospace', label: 'Aerospace' }
  ];

  const regions = [
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'latin_america', label: 'Latin America' },
    { value: 'middle_east', label: 'Middle East' },
    { value: 'africa', label: 'Africa' }
  ];

  const performanceMetrics = [
    { id: 'rd_spend', label: 'R&D Spend Percentage', checked: true },
    { id: 'patents', label: 'Patent Applications', checked: true },
    { id: 'innovation_staff', label: 'Innovation Staff Ratio', checked: false },
    { id: 'new_products', label: 'New Product Revenue', checked: true },
    { id: 'partnerships', label: 'Strategic Partnerships', checked: false },
    { id: 'training_hours', label: 'Training Hours per Employee', checked: false }
  ];

  const [selectedMetrics, setSelectedMetrics] = useState(performanceMetrics);

  const handleMetricChange = (metricId, checked) => {
    const updatedMetrics = selectedMetrics?.map(metric =>
      metric?.id === metricId ? { ...metric, checked } : metric
    );
    setSelectedMetrics(updatedMetrics);
    onFilterChange('metrics', updatedMetrics?.filter(m => m?.checked)?.map(m => m?.id));
  };

  const handleFilterUpdate = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearAllFilters = () => {
    onFilterChange('clear', null);
    setSelectedMetrics(performanceMetrics?.map(m => ({ ...m, checked: false })));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.organizationType) count++;
    if (activeFilters?.sector) count++;
    if (activeFilters?.region) count++;
    if (selectedMetrics?.some(m => m?.checked)) count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h3 className="font-semibold text-foreground">Advanced Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Organization Type Filter */}
          <div>
            <Select
              label="Organization Type"
              description="Filter by organization category"
              options={organizationTypes}
              value={activeFilters?.organizationType}
              onChange={(value) => handleFilterUpdate('organizationType', value)}
              clearable
              className="mb-4"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <Select
              label="Industry Sector"
              description="Select industry focus"
              options={sectors}
              value={activeFilters?.sector}
              onChange={(value) => handleFilterUpdate('sector', value)}
              searchable
              clearable
              className="mb-4"
            />
          </div>

          {/* Region Filter */}
          <div>
            <Select
              label="Geographic Region"
              description="Filter by location"
              options={regions}
              value={activeFilters?.region}
              onChange={(value) => handleFilterUpdate('region', value)}
              clearable
              className="mb-4"
            />
          </div>

          {/* Performance Metrics */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Performance Metrics
            </label>
            <div className="space-y-2">
              {selectedMetrics?.map((metric) => (
                <Checkbox
                  key={metric?.id}
                  label={metric?.label}
                  checked={metric?.checked}
                  onChange={(e) => handleMetricChange(metric?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">From</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                  defaultValue="2024-01-01"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">To</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                  defaultValue="2024-11-04"
                />
              </div>
            </div>
          </div>

          {/* Innovation Score Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Innovation Excellence Score
            </label>
            <div className="px-3">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Quick Filters
            </label>
            <div className="space-y-2">
              <Checkbox label="Top Performers (Score &gt; 80)" />
              <Checkbox label="High Growth Organizations" />
              <Checkbox label="Recent Data Submissions" />
              <Checkbox label="Peer Organizations" />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex space-x-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>

          {/* Filter Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground mb-2">Active Filters:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                {activeFilters?.organizationType && (
                  <div>Organization: {organizationTypes?.find(t => t?.value === activeFilters?.organizationType)?.label}</div>
                )}
                {activeFilters?.sector && (
                  <div>Sector: {sectors?.find(s => s?.value === activeFilters?.sector)?.label}</div>
                )}
                {activeFilters?.region && (
                  <div>Region: {regions?.find(r => r?.value === activeFilters?.region)?.label}</div>
                )}
                {selectedMetrics?.some(m => m?.checked) && (
                  <div>Metrics: {selectedMetrics?.filter(m => m?.checked)?.length} selected</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;