import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    contentType: '',
    category: '',
    theme: '',
    tags: '',
    organization: '',
    authors: '',
    file: null,
    isPublic: true,
    allowDownload: true
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const contentTypeOptions = [
    { value: 'case-study', label: 'Case Study' },
    { value: 'research-paper', label: 'Research Paper' },
    { value: 'best-practice', label: 'Best Practice' },
    { value: 'policy-framework', label: 'Policy Framework' },
    { value: 'methodology', label: 'Innovation Methodology' }
  ];

  const categoryOptions = [
    { value: 'rd-innovation', label: 'R&D Innovation' },
    { value: 'digital-transformation', label: 'Digital Transformation' },
    { value: 'sustainability', label: 'Sustainability Innovation' },
    { value: 'startup-ecosystem', label: 'Startup Ecosystem' },
    { value: 'technology-transfer', label: 'Technology Transfer' },
    { value: 'innovation-policy', label: 'Innovation Policy' }
  ];

  const themeOptions = [
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'clean-energy', label: 'Clean Energy' },
    { value: 'fintech', label: 'Financial Technology' },
    { value: 'healthcare-innovation', label: 'Healthcare Innovation' },
    { value: 'smart-cities', label: 'Smart Cities' }
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
      setFormData(prev => ({ ...prev, file: e?.dataTransfer?.files?.[0] }));
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setFormData(prev => ({ ...prev, file: e?.target?.files?.[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const uploadData = {
      ...formData,
      id: Date.now()?.toString(),
      publishedDate: new Date()?.toISOString(),
      views: 0,
      downloads: 0,
      rating: 0,
      reviewCount: 0,
      status: 'pending-approval'
    };
    
    onUpload(uploadData);
    setIsUploading(false);
    setUploadProgress(0);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      abstract: '',
      contentType: '',
      category: '',
      theme: '',
      tags: '',
      organization: '',
      authors: '',
      file: null,
      isPublic: true,
      allowDownload: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload Knowledge Content</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Document File *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData?.file ? (
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">{formData?.file?.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Title *"
                type="text"
                value={formData?.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
                placeholder="Enter document title"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Abstract *
              </label>
              <textarea
                value={formData?.abstract}
                onChange={(e) => setFormData(prev => ({ ...prev, abstract: e?.target?.value }))}
                placeholder="Provide a brief abstract or summary"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <Select
              label="Content Type *"
              options={contentTypeOptions}
              value={formData?.contentType}
              onChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
              placeholder="Select content type"
              required
            />

            <Select
              label="Category *"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              placeholder="Select category"
              required
            />

            <Select
              label="Theme"
              options={themeOptions}
              value={formData?.theme}
              onChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
              placeholder="Select theme"
            />

            <Input
              label="Organization"
              type="text"
              value={formData?.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e?.target?.value }))}
              placeholder="Organization name"
            />

            <div className="md:col-span-2">
              <Input
                label="Authors"
                type="text"
                value={formData?.authors}
                onChange={(e) => setFormData(prev => ({ ...prev, authors: e?.target?.value }))}
                placeholder="Author names (comma separated)"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Tags"
                type="text"
                value={formData?.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e?.target?.value }))}
                placeholder="Tags (comma separated)"
                description="Add relevant keywords to help others find your content"
              />
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Permissions</h3>
            <Checkbox
              label="Make this content publicly visible"
              checked={formData?.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e?.target?.checked }))}
            />
            <Checkbox
              label="Allow others to download this document"
              checked={formData?.allowDownload}
              onChange={(e) => setFormData(prev => ({ ...prev, allowDownload: e?.target?.checked }))}
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Uploading...</span>
                <span className="text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData?.title || !formData?.abstract || !formData?.contentType || !formData?.file || isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;