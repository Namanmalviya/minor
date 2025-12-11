import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportReports = ({ selectedOrganizations }) => {
  const [reportType, setReportType] = useState('comprehensive');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRankings, setIncludeRankings] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypeOptions = [
    { value: 'comprehensive', label: 'Comprehensive Analysis Report' },
    { value: 'executive', label: 'Executive Summary' },
    { value: 'detailed-metrics', label: 'Detailed Metrics Comparison' },
    { value: 'benchmarking', label: 'Benchmarking Analysis' },
    { value: 'trend-analysis', label: 'Trend Analysis Report' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' },
    { value: 'csv', label: 'CSV Data Export' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock download functionality
    const reportData = {
      type: reportType,
      format: exportFormat,
      organizations: selectedOrganizations?.map(org => org?.name),
      generatedAt: new Date()?.toISOString(),
      includeCharts,
      includeRankings,
      includeRecommendations
    };
    
    console.log('Generated report:', reportData);
    
    setIsGenerating(false);
    
    // Show success message (in real app, this would trigger actual download)
    alert(`${reportTypeOptions?.find(opt => opt?.value === reportType)?.label} has been generated and downloaded!`);
  };

  const getReportDescription = () => {
    switch (reportType) {
      case 'comprehensive':
        return 'Complete analysis including all metrics, comparisons, trends, and strategic recommendations';
      case 'executive':
        return 'High-level summary with key insights and strategic recommendations for leadership';
      case 'detailed-metrics':
        return 'In-depth breakdown of all innovation indicators with statistical analysis';
      case 'benchmarking':
        return 'Focused comparison against industry peers and sector averages';
      case 'trend-analysis':
        return 'Historical performance trends and future projections';
      default:
        return '';
    }
  };

  const getEstimatedPages = () => {
    const basePages = {
      'comprehensive': 25,
      'executive': 8,
      'detailed-metrics': 35,
      'benchmarking': 15,
      'trend-analysis': 20
    };
    
    const orgMultiplier = Math.max(1, selectedOrganizations?.length * 0.5);
    return Math.round(basePages?.[reportType] * orgMultiplier);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Export Comparison Report</h3>
        <p className="text-sm text-muted-foreground">
          Generate detailed reports with insights and recommendations based on your comparison analysis
        </p>
      </div>
      {selectedOrganizations?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h4 className="text-lg font-semibold text-foreground mb-2">No Organizations Selected</h4>
          <p className="text-muted-foreground">Select organizations to generate comparison reports</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Report Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Report Type"
                description="Choose the type of analysis report"
                options={reportTypeOptions}
                value={reportType}
                onChange={setReportType}
              />
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{getReportDescription()}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Estimated pages: {getEstimatedPages()}</span>
                  <span>Generation time: ~2-3 minutes</span>
                </div>
              </div>
            </div>

            <div>
              <Select
                label="Export Format"
                description="Select the output format"
                options={formatOptions}
                value={exportFormat}
                onChange={setExportFormat}
              />
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Info" size={16} />
                  <span>
                    {exportFormat === 'pdf' && 'Professional document with charts and formatting'}
                    {exportFormat === 'excel' && 'Spreadsheet with data tables and pivot analysis'}
                    {exportFormat === 'powerpoint' && 'Presentation slides with visual summaries'}
                    {exportFormat === 'csv' && 'Raw data export for further analysis'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Options */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Report Content</h4>
            <div className="space-y-3">
              <Checkbox
                label="Include Charts and Visualizations"
                description="Add radar charts, comparison matrices, and trend graphs"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
              />
              <Checkbox
                label="Include Rankings and Leaderboards"
                description="Show performance rankings and peer comparisons"
                checked={includeRankings}
                onChange={(e) => setIncludeRankings(e?.target?.checked)}
              />
              <Checkbox
                label="Include Strategic Recommendations"
                description="AI-generated insights and improvement suggestions"
                checked={includeRecommendations}
                onChange={(e) => setIncludeRecommendations(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Selected Organizations Summary */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Organizations in Report</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedOrganizations?.map((org) => (
                <div key={org?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <img
                    src={org?.logo}
                    alt={org?.logoAlt}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm">{org?.name}</p>
                    <p className="text-xs text-muted-foreground">{org?.sector}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Report Preview</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} />
                <span>Executive Summary & Key Findings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} />
                <span>Performance Comparison Matrix</span>
              </div>
              {includeCharts && (
                <div className="flex items-center space-x-2">
                  <Icon name="PieChart" size={16} />
                  <span>Visual Analytics & Charts</span>
                </div>
              )}
              {includeRankings && (
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={16} />
                  <span>Rankings & Benchmarking Analysis</span>
                </div>
              )}
              {includeRecommendations && (
                <div className="flex items-center space-x-2">
                  <Icon name="Lightbulb" size={16} />
                  <span>Strategic Recommendations</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} />
                <span>Trend Analysis & Future Outlook</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Report will be generated for {selectedOrganizations?.length} organization{selectedOrganizations?.length !== 1 ? 's' : ''}
            </div>
            <Button
              onClick={handleGenerateReport}
              loading={isGenerating}
              disabled={isGenerating}
              iconName="Download"
              iconPosition="left"
            >
              {isGenerating ? 'Generating Report...' : 'Generate & Download Report'}
            </Button>
          </div>
        </div>
      )}
      {/* Recent Reports */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Recent Reports</h4>
        <div className="space-y-3">
          {[
            {
              name: 'Technology Sector Comparison - Q4 2024',
              date: '2024-11-01',
              organizations: 4,
              format: 'PDF',
              size: '2.3 MB'
            },
            {
              name: 'Healthcare Innovation Benchmarking',
              date: '2024-10-28',
              organizations: 3,
              format: 'Excel',
              size: '1.8 MB'
            },
            {
              name: 'Regional Performance Analysis',
              date: '2024-10-25',
              organizations: 6,
              format: 'PowerPoint',
              size: '4.1 MB'
            }
          ]?.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground text-sm">{report?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report?.organizations} organizations • {report?.format} • {report?.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{report?.date}</span>
                <Button variant="ghost" size="icon">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportReports;