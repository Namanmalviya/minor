import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FormSection from './components/FormSection';
import FormField from './components/FormField';
import BulkUploadModal from './components/BulkUploadModal';
import SubmissionHistory from './components/SubmissionHistory';
import AutoSaveIndicator from './components/AutoSaveindicator';
import axios from 'axios';

const DataSubmission = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('rd-metrics');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

    const token = localStorage.getItem('token')
    const company = JSON.parse(localStorage.getItem('company'))
    console.log(token)
    console.log(company)
  // Form sections configuration


  
  console.log(submissionData)
  const formSections = [
    {
      id: 'rd-metrics',
      title: 'R&D Metrics',
      description: 'Research & Development expenditure, patents, and collaborations',
      icon: 'FlaskConical',
      fields: [
        {
          name: 'rdExpenditure',
          label: 'R&D Expenditure',
          type: 'number',
          prefix: '$',
          suffix: 'M',
          required: true,
          description: 'Total R&D spending in millions USD for current fiscal year'
        },
        {
          name: 'rdPercentage',
          label: 'R&D as % of Revenue',
          type: 'number',
          suffix: '%',
          required: true,
          min: 0,
          max: 100,
          step: 0.1,
          description: 'R&D expenditure as percentage of total revenue'
        },
        {
          name: 'patentApplications',
          label: 'Patent Applications Filed',
          type: 'number',
          required: true,
          description: 'Number of patent applications filed in current year'
        },
        {
          name: 'patentsGranted',
          label: 'Patents Granted',
          type: 'number',
          required: true,
          description: 'Number of patents granted in current year'
        },
        {
          name: 'researchCollaborations',
          label: 'Research Collaborations',
          type: 'number',
          required: true,
          description: 'Active research partnerships with external organizations'
        },
        {
          name: 'publicationCount',
          label: 'Research Publications',
          type: 'number',
          description: 'Peer-reviewed publications by organization staff'
        }
      ]
    },
    {
      id: 'human-capital',
      title: 'Human Capital',
      description: 'Innovation-focused staff, training programs, and retention',
      icon: 'Users',
      fields: [
        {
          name: 'totalStaff',
          label: 'Total Staff Count',
          type: 'number',
          required: true,
          description: 'Total number of employees in the organization'
        },
        {
          name: 'innovationStaff',
          label: 'Innovation-Focused Staff',
          type: 'number',
          required: true,
          description: 'Staff directly involved in R&D and innovation activities'
        },
        {
          name: 'staffWithPhd',
          label: 'Staff with PhD',
          type: 'number',
          description: 'Number of employees holding doctoral degrees'
        },
        {
          name: 'trainingPrograms',
          label: 'Innovation Training Programs',
          type: 'number',
          required: true,
          description: 'Number of innovation-focused training programs conducted'
        },
        {
          name: 'trainingHours',
          label: 'Training Hours per Employee',
          type: 'number',
          suffix: 'hrs',
          description: 'Average training hours per employee annually'
        },
        {
          name: 'retentionRate',
          label: 'Staff Retention Rate',
          type: 'number',
          suffix: '%',
          min: 0,
          max: 100,
          step: 0.1,
          description: 'Percentage of staff retained year-over-year'
        },
        {
          name: 'diversityIndex',
          label: 'Diversity Index',
          type: 'select',
          options: [
            { value: 'low', label: 'Low (0-30%)' },
            { value: 'medium', label: 'Medium (31-60%)' },
            { value: 'high', label: 'High (61-80%)' },
            { value: 'very-high', label: 'Very High (81-100%)' }
          ],
          description: 'Gender and ethnic diversity in innovation teams'
        }
      ]
    },
    {
      id: 'innovation-outputs',
      title: 'Innovation Outputs',
      description: 'Commercialized products, startups, and awards received',
      icon: 'Lightbulb',
      fields: [
        {
          name: 'newProducts',
          label: 'New Products Launched',
          type: 'number',
          required: true,
          description: 'Number of new products/services launched in current year'
        },
        {
          name: 'commercializedProducts',
          label: 'Commercialized R&D Products',
          type: 'number',
          required: true,
          description: 'R&D projects successfully brought to market'
        },
        {
          name: 'startupIncubated',
          label: 'Startups Incubated',
          type: 'number',
          description: 'Number of startups supported through incubation programs'
        },
        {
          name: 'spinoffCompanies',
          label: 'Spin-off Companies',
          type: 'number',
          description: 'Companies spun off from internal R&D projects'
        },
        {
          name: 'innovationAwards',
          label: 'Innovation Awards',
          type: 'number',
          description: 'Industry awards and recognitions received'
        },
        {
          name: 'technologyTransfers',
          label: 'Technology Transfers',
          type: 'number',
          description: 'Successful technology licensing or transfer agreements'
        },
        {
          name: 'prototypesBuilt',
          label: 'Prototypes Built',
          type: 'number',
          description: 'Number of functional prototypes developed'
        }
      ]
    },
    {
      id: 'financial-indicators',
      title: 'Financial Indicators',
      description: 'Revenue from innovation, ROI calculations, and grants',
      icon: 'DollarSign',
      fields: [
        {
          name: 'totalRevenue',
          label: 'Total Revenue',
          type: 'number',
          prefix: '$',
          suffix: 'M',
          required: true,
          description: 'Total organizational revenue in millions USD'
        },
        {
          name: 'newProductRevenue',
          label: 'Revenue from New Products',
          type: 'number',
          prefix: '$',
          suffix: 'M',
          required: true,
          description: 'Revenue generated from products launched in last 3 years'
        },
        {
          name: 'innovationROI',
          label: 'Innovation ROI',
          type: 'number',
          suffix: '%',
          description: 'Return on investment for innovation activities'
        },
        {
          name: 'grantsReceived',
          label: 'Grants Received',
          type: 'number',
          prefix: '$',
          suffix: 'M',
          description: 'Total grant funding received for innovation projects'
        },
        {
          name: 'licensingRevenue',
          label: 'Licensing Revenue',
          type: 'number',
          prefix: '$',
          suffix: 'M',
          description: 'Revenue from intellectual property licensing'
        },
        {
          name: 'innovationBudget',
          label: 'Innovation Budget Allocation',
          type: 'number',
          suffix: '%',
          min: 0,
          max: 100,
          step: 0.1,
          description: 'Percentage of total budget allocated to innovation'
        }
      ]
    },
    {
      id: 'ecosystem-metrics',
      title: 'Ecosystem Metrics',
      description: 'Partnerships, networks, and accelerator support',
      icon: 'Network',
      fields: [
        {
          name: 'industryPartnerships',
          label: 'Industry Partnerships',
          type: 'number',
          required: true,
          description: 'Active partnerships with other industry organizations'
        },
        {
          name: 'academicPartnerships',
          label: 'Academic Partnerships',
          type: 'number',
          required: true,
          description: 'Collaborations with universities and research institutions'
        },
        {
          name: 'governmentPartnerships',
          label: 'Government Partnerships',
          type: 'number',
          description: 'Partnerships with government agencies and departments'
        },
        {
          name: 'acceleratorSupport',
          label: 'Accelerator Programs Supported',
          type: 'number',
          description: 'Number of accelerator or incubator programs supported'
        },
        {
          name: 'networkEvents',
          label: 'Networking Events Hosted',
          type: 'number',
          description: 'Innovation-focused events organized or co-hosted'
        },
        {
          name: 'mentorshipPrograms',
          label: 'Mentorship Programs',
          type: 'number',
          description: 'Active mentorship programs for startups or entrepreneurs'
        },
        {
          name: 'ecosystemRating',
          label: 'Ecosystem Engagement Rating',
          type: 'select',
          options: [
            { value: 'minimal', label: 'Minimal (1-2)' },
            { value: 'moderate', label: 'Moderate (3-4)' },
            { value: 'active', label: 'Active (5-6)' },
            { value: 'highly-active', label: 'Highly Active (7-8)' },
            { value: 'leading', label: 'Leading (9-10)' }
          ],
          description: 'Self-assessment of ecosystem engagement level'
        }
      ]
    }
  ];

  // Calculate completion percentage for each section
  const calculateCompletion = (sectionId) => {
    const section = formSections?.find(s => s?.id === sectionId);
    if (!section) return 0;

    const requiredFields = section?.fields?.filter(field => field?.required);
    const completedFields = requiredFields?.filter(field => 
      formData?.[field?.name] !== undefined && formData?.[field?.name] !== ''
    );

    return requiredFields?.length > 0 ? Math.round((completedFields?.length / requiredFields?.length) * 100) : 0;
  };

  // Handle form field changes
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error for this field
    if (errors?.[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }

    // Trigger auto-save
    triggerAutoSave();
  };

  // Auto-save functionality
  const triggerAutoSave = () => {
    setIsSaving(true);
    
    // Simulate auto-save delay
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    formSections?.forEach(section => {
      section?.fields?.forEach(field => {
        if (field?.required && (!formData?.[field?.name] || formData?.[field?.name] === '')) {
          newErrors[field.name] = `${field?.label} is required`;
        }
        
        if (field?.type === 'number' && formData?.[field?.name] !== undefined) {
          const value = parseFloat(formData?.[field?.name]);
          if (field?.min !== undefined && value < field?.min) {
            newErrors[field.name] = `${field?.label} must be at least ${field?.min}`;
          }
          if (field?.max !== undefined && value > field?.max) {
            newErrors[field.name] = `${field?.label} must be at most ${field?.max}`;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
  if (!validateForm()) return;

  if (!pdfFile) {
    alert('Please upload a verification PDF');
    return;
  }

  setIsSubmitting(true);

  try {
    const submitData = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    // Append PDF
    submitData.append('document', pdfFile);

    await axios.post(
      'http://localhost:5000/data-submission',
      submitData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    navigate('/organization-dashboard');
  } catch (err) {
    console.error(err);
    alert('Submission failed');
  } finally {
    setIsSubmitting(false);
  }
};


  // Handle save as draft
  const handleSaveDraft = () => {
    triggerAutoSave();
    // Show success message or navigate
  };

  // Load saved data on component mount
  useEffect(() => {
    // Simulate loading saved data
    const savedData = {
      rdExpenditure: submissionData?.rdExpenditure || 12.5,
      rdPercentage: submissionData?.rdPercentage || 6.3,
      patentApplications: submissionData?.patentApplications || 15,
      patentsGranted: submissionData?.patentsGranted || 7,
      researchCollaborations: submissionData?.researchCollaborations || 4,
      totalStaff: submissionData?.totalStaff || 250,
      innovationStaff: submissionData?.innovationStaff || 60,
      trainingPrograms: submissionData?.trainingPrograms || 5,
      newProducts: submissionData?.newProducts || 10,
      commercializedProducts: submissionData?.commercializedProducts || 8,
      totalRevenue: submissionData?.totalRevenue || 200,
      newProductRevenue: submissionData?.newProductRevenue || 50,
      industryPartnerships: submissionData?.industryPartnerships || 7,
      academicPartnerships: submissionData?.academicPartnerships || 3
    };
    console.log('Loaded saved data:', savedData);
    setFormData(savedData);
    setLastSaved(new Date(Date.now() - 300000)); // 5 minutes ago
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Data Submission</h1>
                <p className="text-muted-foreground mt-2">
                  Submit and update your organization's innovation metrics across all indicator categories
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
                <Button
                  variant="outline"
                  onClick={() => setShowHistory(true)}
                  iconName="History"
                  iconPosition="left"
                >
                  View History
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowBulkUpload(true)}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Bulk Upload
                </Button>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {formSections?.map((section) => {
                const completion = calculateCompletion(section?.id);
                return (
                  <div key={section?.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        completion === 100 ? 'bg-success text-success-foreground' : 
                        completion > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {completion === 100 ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <Icon name={section?.icon} size={16} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{section?.title}</h3>
                        <p className="text-xs text-muted-foreground">{completion}% Complete</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          completion === 100 ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {formSections?.map((section) => (
              <FormSection
                key={section?.id}
                title={section?.title}
                description={section?.description}
                icon={section?.icon}
                isActive={activeSection === section?.id}
                isCompleted={calculateCompletion(section?.id) === 100}
                completionPercentage={calculateCompletion(section?.id)}
                onToggle={() => setActiveSection(activeSection === section?.id ? '' : section?.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section?.fields?.map((field) => (
                    <FormField
                      key={field?.name}
                      {...field}
                      value={formData?.[field?.name]}
                      onChange={handleFieldChange}
                      error={errors?.[field?.name]}
                    />
                  ))}
                 

                </div>
                
               
              </FormSection>
              
            ))}
            <div className="mt-6">
  <label className="block text-sm font-medium text-foreground mb-2">
    Upload Verification Document (PDF)
  </label>

  <input
    type="file"
    accept="application/pdf"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file?.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Only PDF files are allowed');
      }
    }}
    className="block w-full text-sm text-muted-foreground
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-medium
      file:bg-primary file:text-primary-foreground
      hover:file:bg-primary/90"
  />

  {pdfFile && (
    <p className="mt-2 text-sm text-muted-foreground">
      Selected file: <span className="font-medium">{pdfFile.name}</span>
    </p>
  )}
</div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => navigate('/organization-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
            
            <div className="flex space-x-3">
              {/* <Button
                variant="outline"
                onClick={handleSaveDraft}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button> */}
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
              >
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <BulkUploadModal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        onUpload={(data) => {
          // Handle bulk upload data
          setShowBulkUpload(false);
        }}
      />
      <SubmissionHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
};

export default DataSubmission;