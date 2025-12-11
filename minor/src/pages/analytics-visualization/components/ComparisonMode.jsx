import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonMode = ({ onComparisonChange, isActive }) => {
  const [comparisonType, setComparisonType] = useState('organizations');
  const [selectedItems, setSelectedItems] = useState([]);

  const comparisonTypes = [
    { value: 'organizations', label: 'Organizations', description: 'Compare different organizations' },
    { value: 'metrics', label: 'Metrics', description: 'Compare multiple metrics' },
    { value: 'timeperiods', label: 'Time Periods', description: 'Compare across time' },
    { value: 'regions', label: 'Regions', description: 'Geographic comparison' }
  ];

  const organizationOptions = [
    { value: 'techcorp', label: 'TechCorp Industries', sector: 'Technology', score: 85 },
    { value: 'innovate_labs', label: 'Innovate Labs', sector: 'Research', score: 78 },
    { value: 'future_systems', label: 'Future Systems Inc', sector: 'Technology', score: 82 },
    { value: 'global_research', label: 'Global Research Institute', sector: 'Research', score: 88 },
    { value: 'quantum_dynamics', label: 'Quantum Dynamics', sector: 'Technology', score: 91 }
  ];

  const metricOptions = [
    { value: 'rd_spend', label: 'R&D Spend Percentage' },
    { value: 'patents', label: 'Patent Applications' },
    { value: 'innovation_staff', label: 'Innovation Staff Ratio' },
    { value: 'new_products', label: 'New Product Revenue' },
    { value: 'partnerships', label: 'Strategic Partnerships' },
    { value: 'training_hours', label: 'Training Hours per Employee' }
  ];

  const timePeriodOptions = [
    { value: 'q1_2024', label: 'Q1 2024' },
    { value: 'q2_2024', label: 'Q2 2024' },
    { value: 'q3_2024', label: 'Q3 2024' },
    { value: 'q4_2024', label: 'Q4 2024' },
    { value: 'q1_2023', label: 'Q1 2023' },
    { value: 'q4_2023', label: 'Q4 2023' }
  ];

  const regionOptions = [
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'latin_america', label: 'Latin America' }
  ];

  const getOptionsForType = () => {
    switch (comparisonType) {
      case 'organizations': return organizationOptions;
      case 'metrics': return metricOptions;
      case 'timeperiods': return timePeriodOptions;
      case 'regions': return regionOptions;
      default: return [];
    }
  };

  const handleItemToggle = (itemValue) => {
    const newSelection = selectedItems?.includes(itemValue)
      ? selectedItems?.filter(item => item !== itemValue)
      : [...selectedItems, itemValue]?.slice(0, 4); // Limit to 4 items

    setSelectedItems(newSelection);
    onComparisonChange({
      type: comparisonType,
      items: newSelection,
      active: newSelection?.length > 1
    });
  };

  const clearComparison = () => {
    setSelectedItems([]);
    onComparisonChange({ type: comparisonType, items: [], active: false });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="GitCompare" size={20} className="mr-2" />
          Comparison Mode
          {isActive && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </h3>
        <div className="flex items-center space-x-2">
          {selectedItems?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
          <Button
            variant={isActive ? "default" : "outline"}
            size="sm"
            iconName="GitCompare"
            iconPosition="left"
          >
            {isActive ? "Active" : "Enable"}
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Comparison Type Selection */}
        <div>
          <Select
            label="Comparison Type"
            description="Choose what to compare"
            options={comparisonTypes}
            value={comparisonType}
            onChange={(value) => {
              setComparisonType(value);
              setSelectedItems([]);
              onComparisonChange({ type: value, items: [], active: false });
            }}
            className="mb-4"
          />
        </div>

        {/* Item Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Items to Compare (Max 4)
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {getOptionsForType()?.map((option) => (
              <div
                key={option?.value}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedItems?.includes(option?.value)
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleItemToggle(option?.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 border-2 rounded ${
                    selectedItems?.includes(option?.value)
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedItems?.includes(option?.value) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{option?.label}</p>
                    {option?.sector && (
                      <p className="text-xs text-muted-foreground">{option?.sector}</p>
                    )}
                  </div>
                </div>
                {option?.score && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{option?.score}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items Summary */}
        {selectedItems?.length > 0 && (
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="font-medium text-foreground mb-2">
              Selected for Comparison ({selectedItems?.length}/4)
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedItems?.map((itemValue) => {
                const item = getOptionsForType()?.find(opt => opt?.value === itemValue);
                return (
                  <span
                    key={itemValue}
                    className="inline-flex items-center space-x-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full"
                  >
                    <span>{item?.label}</span>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleItemToggle(itemValue);
                      }}
                      className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Options */}
        {selectedItems?.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Comparison Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Synchronized Interactions</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Side-by-Side View</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Overlay Mode</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Show Differences</span>
              </label>
            </div>
          </div>
        )}

        {/* Comparison Actions */}
        {selectedItems?.length > 1 && (
          <div className="flex space-x-2 pt-4 border-t border-border">
            <Button
              variant="default"
              size="sm"
              iconName="BarChart3"
              iconPosition="left"
              onClick={()=>{alert('Exporting comparison...')}}
            >
              Generate Comparison
            </Button>
            <Button
            
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Comparison
            </Button>
          </div>
        )}

        {/* Comparison Tips */}
        <div className="bg-muted/20 rounded-lg p-3">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2" />
            Comparison Tips
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Select 2-4 items for optimal comparison visualization</li>
            <li>• Use synchronized interactions to explore data together</li>
            <li>• Enable overlay mode to see direct overlaps</li>
            <li>• Export comparisons for presentations and reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMode;