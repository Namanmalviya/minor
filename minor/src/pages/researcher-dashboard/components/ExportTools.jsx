import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportTools = () => {
  const [selectedExportType, setSelectedExportType] = useState('report');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const exportTypes = [
    {
      id: 'report',
      label: 'Analytical Report',
      description: 'Comprehensive analysis with charts and insights',
      icon: 'FileText',
      formats: ['pdf', 'docx', 'html']
    },
    {
      id: 'dataset',
      label: 'Raw Dataset',
      description: 'Filtered data in structured format',
      icon: 'Database',
      formats: ['csv', 'xlsx', 'json', 'xml']
    },
    {
      id: 'charts',
      label: 'Visualization Package',
      description: 'Charts and graphs as image files',
      icon: 'BarChart3',
      formats: ['png', 'svg', 'pdf']
    },
    {
      id: 'summary',
      label: 'Executive Summary',
      description: 'Key findings and recommendations',
      icon: 'FileCheck',
      formats: ['pdf', 'docx', 'pptx']
    }
  ];

  const recentExports = [
    {
      id: 1,
      name: 'Innovation Trends Q4 2024',
      type: 'Analytical Report',
      format: 'PDF',
      size: '2.4 MB',
      createdAt: '2024-11-03 14:30',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'Global Innovation Dataset',
      type: 'Raw Dataset',
      format: 'CSV',
      size: '15.7 MB',
      createdAt: '2024-11-02 09:15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'Sector Performance Charts',
      type: 'Visualization Package',
      format: 'PNG',
      size: '8.3 MB',
      createdAt: '2024-11-01 16:45',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 4,
      name: 'Regional Analysis Summary',
      type: 'Executive Summary',
      format: 'DOCX',
      size: '1.2 MB',
      createdAt: '2024-10-31 11:20',
      status: 'processing',
      downloadUrl: null
    }
  ];

  const customizationOptions = {
    report: [
      { id: 'include-charts', label: 'Include Charts & Visualizations', checked: true },
      { id: 'include-raw-data', label: 'Include Raw Data Tables', checked: false },
      { id: 'include-methodology', label: 'Include Methodology Section', checked: true },
      { id: 'include-recommendations', label: 'Include Recommendations', checked: true }
    ],
    dataset: [
      { id: 'include-metadata', label: 'Include Metadata', checked: true },
      { id: 'anonymize-data', label: 'Anonymize Sensitive Data', checked: true },
      { id: 'include-calculations', label: 'Include Calculated Fields', checked: false },
      { id: 'compress-file', label: 'Compress Output File', checked: true }
    ],
    charts: [
      { id: 'high-resolution', label: 'High Resolution (300 DPI)', checked: true },
      { id: 'include-legends', label: 'Include Chart Legends', checked: true },
      { id: 'transparent-background', label: 'Transparent Background', checked: false },
      { id: 'include-data-labels', label: 'Include Data Labels', checked: true }
    ],
    summary: [
      { id: 'executive-overview', label: 'Executive Overview', checked: true },
      { id: 'key-metrics', label: 'Key Performance Metrics', checked: true },
      { id: 'trend-analysis', label: 'Trend Analysis', checked: true },
      { id: 'action-items', label: 'Recommended Actions', checked: false }
    ]
  };

  const handleExport = async () => {
    setIsGenerating(true);
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    // Show success message or download
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return { icon: 'CheckCircle', color: 'text-success' };
      case 'processing': return { icon: 'Clock', color: 'text-warning' };
      case 'failed': return { icon: 'XCircle', color: 'text-error' };
      default: return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const selectedType = exportTypes?.find(type => type?.id === selectedExportType);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export & Download Tools</h3>
          <p className="text-sm text-muted-foreground">Generate custom reports and download datasets</p>
        </div>
        <Icon name="Download" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Export Type</h4>
            <div className="space-y-2">
              {exportTypes?.map((type) => (
                <label
                  key={type?.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedExportType === type?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportType"
                    value={type?.id}
                    checked={selectedExportType === type?.id}
                    onChange={(e) => setSelectedExportType(e?.target?.value)}
                    className="mt-1"
                  />
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={type?.icon} size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{type?.label}</p>
                      <p className="text-sm text-muted-foreground">{type?.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {selectedType && (
            <>
              <div>
                <h4 className="font-medium text-foreground mb-3">Output Format</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedType?.formats?.map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        exportFormat === format
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {format?.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">Customization Options</h4>
                <div className="space-y-2">
                  {customizationOptions?.[selectedExportType]?.map((option) => (
                    <label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={option?.checked}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleExport}
                disabled={isGenerating}
                loading={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Generating Export...' : `Generate ${selectedType?.label}`}
              </Button>
            </>
          )}
        </div>

        {/* Recent Exports */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Exports</h4>
          <div className="space-y-3">
            {recentExports?.map((exportItem) => {
              const statusInfo = getStatusIcon(exportItem?.status);
              return (
                <div key={exportItem?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{exportItem?.name}</h5>
                      <p className="text-sm text-muted-foreground">{exportItem?.type}</p>
                    </div>
                    <div className={`flex items-center space-x-1 ${statusInfo?.color}`}>
                      <Icon name={statusInfo?.icon} size={16} />
                      <span className="text-sm capitalize">{exportItem?.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{exportItem?.format} • {exportItem?.size}</span>
                    <span>{exportItem?.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {exportItem?.status === 'completed' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Download" size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Share" size={16} />
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" disabled className="flex-1">
                        <Icon name="Clock" size={16} className="mr-1" />
                        Processing...
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Export Guidelines</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Large datasets may take several minutes to process</li>
              <li>• Exports are available for download for 30 days</li>
              <li>• Maximum file size limit: 100 MB per export</li>
              <li>• API access available for automated exports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;