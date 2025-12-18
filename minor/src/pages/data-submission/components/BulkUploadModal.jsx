import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);
  const fileInputRef = useRef(null);

  const templateFiles = [
    {
      name: 'R&D Metrics Template',
      description: 'Template for R&D expenditure, patents, and collaboration data',
      filename: 'rd_metrics_template.xlsx',
      icon: 'FileSpreadsheet'
    },
    {
      name: 'Human Capital Template',
      description: 'Template for staff, training, and retention metrics',
      filename: 'human_capital_template.xlsx',
      icon: 'Users'
    },
    {
      name: 'Innovation Outputs Template',
      description: 'Template for products, startups, and awards data',
      filename: 'innovation_outputs_template.xlsx',
      icon: 'Lightbulb'
    },
    {
      name: 'Financial Indicators Template',
      description: 'Template for revenue, ROI, and grants data',
      filename: 'financial_indicators_template.xlsx',
      icon: 'DollarSign'
    },
    {
      name: 'Ecosystem Metrics Template',
      description: 'Template for partnerships and network data',
      filename: 'ecosystem_metrics_template.xlsx',
      icon: 'Network'
    }
  ];

  const mockErrors = [
    { row: 3, field: 'R&D Expenditure', message: 'Value must be a positive number' },
    { row: 7, field: 'Patent Applications', message: 'Invalid date format' },
    { row: 12, field: 'Staff Count', message: 'Required field is empty' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

 const handleFileSelect = (file) => {
  if (file && file.type === 'application/pdf') {
    setSelectedFile(file);
    setUploadErrors([]);
  } else {
    alert('Only PDF files are allowed');
  }
};


  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const handleUpload = async (e) => {
    if (!selectedFile) return;
    const formdata=new FormData()
    formdata.append("file",file)
    console.log(file)
    // setIsUploading(true);
    // setUploadProgress(0);
    
    // e.preventDefault()
    // // Simulate upload progress
    // const interval = setInterval(() => {
    //   setUploadProgress(prev => {
    //     if (prev >= 100) {
    //       clearInterval(interval);
    //       setIsUploading(false);
    //       // Simulate validation errors
    //       setUploadErrors(mockErrors);
    //       return 100;
    //     }
    //     return prev + 10;
    //   });
    // }, 200);
  };

  const handleTemplateDownload = (template) => {
    // Simulate template download
    console.log(`Downloading template: ${template?.filename}`);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadErrors([]);
    setDragActive(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Bulk Data Upload</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Upload CSV or Excel files to import multiple metrics at once
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Upload File</h3>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                    dragActive 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports CSV and Excel files up to 10MB
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    Choose File
                  </Button>
                 <input
  ref={fileInputRef}
  type="file"
  accept=".pdf"
  onChange={handleFileInputChange}
  className="hidden"
/>

                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileSpreadsheet" size={20} className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFile(null)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>

                    {uploadProgress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Uploading...</span>
                          <span className="text-foreground">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {uploadErrors?.length > 0 && (
                  <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <h4 className="font-medium text-error">Validation Errors Found</h4>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {uploadErrors?.map((error, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">Row {error?.row}:</span>
                          <span className="text-muted-foreground"> {error?.field} - </span>
                          <span className="text-error">{error?.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="default"
                    onClick={handleUpload}
                   // disabled={!selectedFile || isUploading}
                   //loading={isUploading}
                    className="flex-1"
                  >
                    Upload & Validate
                  </Button>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Download Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use these templates to ensure your data is formatted correctly
                </p>
                
                <div className="space-y-3">
                  {templateFiles?.map((template, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={template?.icon} size={20} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{template?.name}</h4>
                            <p className="text-sm text-muted-foreground">{template?.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTemplateDownload(template)}
                        >
                          <Icon name="Download" size={16} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Upload Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ensure all required fields are filled</li>
                      <li>• Use the exact column headers from templates</li>
                      <li>• Dates should be in MM/DD/YYYY format</li>
                      <li>• Numbers should not contain currency symbols</li>
                      <li>• Maximum file size is 10MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;