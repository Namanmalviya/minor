import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrganizationSelector = ({ selectedOrganizations, onOrganizationSelect, onRemoveOrganization }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const sectorOptions = [
  { value: '', label: 'All Sectors' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare & Life Sciences' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'aerospace', label: 'Aerospace & Defense' }];


  const regionOptions = [
  { value: '', label: 'All Regions' },
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'middle-east-africa', label: 'Middle East & Africa' }];


  const availableOrganizations = [
  {
    id: 'org-1',
    name: 'TechCorp Industries',
    sector: 'Technology',
    region: 'North America',
    type: 'Large Enterprise',
    innovationScore: 87.5,
    employees: 15000,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecb57ce6-1762260285429.png",
    logoAlt: 'TechCorp Industries circular logo with blue and white geometric design'
  },
  {
    id: 'org-2',
    name: 'BioMed Research Institute',
    sector: 'Healthcare & Life Sciences',
    region: 'Europe',
    type: 'Research Institution',
    innovationScore: 92.3,
    employees: 3500,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12a508de9-1762260284024.png",
    logoAlt: 'BioMed Research Institute logo featuring medical cross symbol in green and white'
  },
  {
    id: 'org-3',
    name: 'Global Manufacturing Co',
    sector: 'Manufacturing',
    region: 'Asia Pacific',
    type: 'Large Enterprise',
    innovationScore: 78.9,
    employees: 25000,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12c2a501d-1762260287695.png",
    logoAlt: 'Global Manufacturing Co logo with industrial gear icon in orange and black'
  },
  {
    id: 'org-4',
    name: 'FinTech Innovations',
    sector: 'Financial Services',
    region: 'North America',
    type: 'Startup',
    innovationScore: 85.7,
    employees: 450,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d3ed02e6-1762260285786.png",
    logoAlt: 'FinTech Innovations logo with stylized dollar sign and circuit pattern in blue'
  },
  {
    id: 'org-5',
    name: 'Green Energy Solutions',
    sector: 'Energy & Utilities',
    region: 'Europe',
    type: 'Medium Enterprise',
    innovationScore: 89.2,
    employees: 2800,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_19ddf7121-1762260283618.png",
    logoAlt: 'Green Energy Solutions logo featuring wind turbine silhouette in green gradient'
  },
  {
    id: 'org-6',
    name: 'AutoTech Dynamics',
    sector: 'Automotive',
    region: 'Asia Pacific',
    type: 'Large Enterprise',
    innovationScore: 81.4,
    employees: 18000,
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_109a5195c-1762260283616.png",
    logoAlt: 'AutoTech Dynamics logo with modern car silhouette and tech elements in silver'
  }];


  const filteredOrganizations = availableOrganizations?.filter((org) => {
    const matchesSearch = org?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    org?.sector?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesSector = !selectedSector || org?.sector?.toLowerCase()?.includes(selectedSector?.toLowerCase());
    const matchesRegion = !selectedRegion || org?.region?.toLowerCase()?.includes(selectedRegion?.toLowerCase());
    const notSelected = !selectedOrganizations?.find((selected) => selected?.id === org?.id);

    return matchesSearch && matchesSector && matchesRegion && notSelected;
  });

  const handleOrganizationAdd = (org) => {
    if (selectedOrganizations?.length < 5) {
      onOrganizationSelect(org);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Select Organizations</h3>
          <p className="text-sm text-muted-foreground">Choose up to 5 organizations for comparison</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedOrganizations?.length}/5 selected
        </div>
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full" />

        <Select
          placeholder="Filter by sector"
          options={sectorOptions}
          value={selectedSector}
          onChange={setSelectedSector} />

        <Select
          placeholder="Filter by region"
          options={regionOptions}
          value={selectedRegion}
          onChange={setSelectedRegion} />

      </div>
      {/* Selected Organizations */}
      {selectedOrganizations?.length > 0 &&
      <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Selected Organizations</h4>
          <div className="flex flex-wrap gap-2">
            {selectedOrganizations?.map((org) =>
          <div
            key={org?.id}
            className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">

                <img
              src={org?.logo}
              alt={org?.logoAlt}
              className="w-6 h-6 rounded-full object-cover" />

                <span className="text-sm font-medium text-foreground">{org?.name}</span>
                <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveOrganization(org?.id)}
              className="w-5 h-5 p-0 hover:bg-destructive hover:text-destructive-foreground">

                  <Icon name="X" size={12} />
                </Button>
              </div>
          )}
          </div>
        </div>
      }
      {/* Available Organizations */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Available Organizations</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredOrganizations?.map((org) =>
          <div
            key={org?.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200"
            onClick={() => handleOrganizationAdd(org)}>

              <div className="flex items-center space-x-3">
                <img
                src={org?.logo}
                alt={org?.logoAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div>
                  <p className="font-medium text-foreground">{org?.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{org?.sector}</span>
                    <span>•</span>
                    <span>{org?.region}</span>
                    <span>•</span>
                    <span>{org?.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">{org?.innovationScore}</div>
                <div className="text-xs text-muted-foreground">Innovation Score</div>
              </div>
            </div>
          )}
          {filteredOrganizations?.length === 0 &&
          <div className="text-center py-8 text-muted-foreground">
              <Icon name="Search" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No organizations found matching your criteria</p>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default OrganizationSelector;