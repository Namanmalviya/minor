import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmissionHistory = ({ isOpen, onClose }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const submissionHistory = [
    {
      id: 'SUB-2024-001',
      date: '2024-10-28',
      status: 'approved',
      version: '1.3',
      submittedBy: 'Sarah Chen',
      approvedBy: 'Dr. Michael Rodriguez',
      sections: ['R&D Metrics', 'Human Capital', 'Innovation Outputs'],
      changes: [
        { field: 'R&D Expenditure', oldValue: '$2.5M', newValue: '$2.8M', reason: 'Updated Q4 budget allocation' },
        { field: 'Patent Applications', oldValue: '12', newValue: '15', reason: 'Added recent filings' }
      ],
      comments: 'All metrics validated and approved. Excellent progress on patent portfolio.'
    },
    {
      id: 'SUB-2024-002',
      date: '2024-10-15',
      status: 'pending',
      version: '1.2',
      submittedBy: 'Sarah Chen',
      approvedBy: null,
      sections: ['Financial Indicators', 'Ecosystem Metrics'],
      changes: [
        { field: 'Revenue from New Products', oldValue: '$8.2M', newValue: '$9.1M', reason: 'Q3 sales update' }
      ],
      comments: 'Awaiting verification of financial data from accounting department.'
    },
    {
      id: 'SUB-2024-003',
      date: '2024-09-30',
      status: 'rejected',
      version: '1.1',
      submittedBy: 'Sarah Chen',
      approvedBy: 'Dr. Michael Rodriguez',
      sections: ['Human Capital'],
      changes: [
        { field: 'Innovation Staff Count', oldValue: '45', newValue: '52', reason: 'New hires in R&D team' }
      ],
      comments: 'Please provide supporting documentation for new staff classifications.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      default: return 'Circle';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Submission History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track all your data submissions and their approval status
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Submissions List */}
          <div className="w-1/2 border-r border-border overflow-y-auto">
            <div className="p-6 space-y-4">
              {submissionHistory?.map((submission) => (
                <div
                  key={submission?.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 border border-border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedSubmission?.id === submission?.id 
                      ? 'bg-primary/5 border-primary/20' :'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission?.status)}`}>
                        <Icon name={getStatusIcon(submission?.status)} size={12} className="inline mr-1" />
                        {submission?.status?.charAt(0)?.toUpperCase() + submission?.status?.slice(1)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{submission?.id}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">v{submission?.version}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Submitted</span>
                      <span className="text-sm text-foreground">{new Date(submission.date)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">By</span>
                      <span className="text-sm text-foreground">{submission?.submittedBy}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {submission?.sections?.map((section, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                          >
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Details */}
          <div className="w-1/2 overflow-y-auto">
            {selectedSubmission ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedSubmission?.id}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedSubmission?.status)}`}>
                      <Icon name={getStatusIcon(selectedSubmission?.status)} size={14} className="inline mr-2" />
                      {selectedSubmission?.status?.charAt(0)?.toUpperCase() + selectedSubmission?.status?.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Submitted Date:</span>
                      <p className="font-medium text-foreground">{new Date(selectedSubmission.date)?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Version:</span>
                      <p className="font-medium text-foreground">v{selectedSubmission?.version}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Submitted By:</span>
                      <p className="font-medium text-foreground">{selectedSubmission?.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Approved By:</span>
                      <p className="font-medium text-foreground">
                        {selectedSubmission?.approvedBy || 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Changes Made</h4>
                  <div className="space-y-3">
                    {selectedSubmission?.changes?.map((change, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium text-foreground mb-2">{change?.field}</div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">From:</span>
                            <span className="ml-2 text-error line-through">{change?.oldValue}</span>
                          </div>
                          <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                          <div>
                            <span className="text-muted-foreground">To:</span>
                            <span className="ml-2 text-success font-medium">{change?.newValue}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <strong>Reason:</strong> {change?.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Sections Updated</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission?.sections?.map((section, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Comments</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-foreground">{selectedSubmission?.comments}</p>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Details
                  </Button>
                  {selectedSubmission?.status === 'rejected' && (
                    <Button variant="default" size="sm">
                      <Icon name="RefreshCw" size={16} className="mr-2" />
                      Resubmit
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a submission to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionHistory;