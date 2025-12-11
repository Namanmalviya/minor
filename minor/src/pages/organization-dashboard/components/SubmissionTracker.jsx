import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionTracker = ({ submissions, onSubmitData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'overdue': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'overdue': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const upcomingDeadlines = submissions?.filter(s => s?.status === 'pending' || s?.status === 'overdue');
  const recentSubmissions = submissions?.filter(s => s?.status === 'completed')?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Submission Tracker</h2>
        <Button variant="outline" size="sm" onClick={onSubmitData}>
          <Icon name="Plus" size={16} className="mr-2" />
          Submit Data
        </Button>
      </div>
      {/* Upcoming Deadlines */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-foreground">Upcoming Deadlines</h3>
        {upcomingDeadlines?.length > 0 ? (
          <div className="space-y-3">
            {upcomingDeadlines?.map((submission) => (
              <div key={submission?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(submission?.status)}`}>
                    <Icon name={getStatusIcon(submission?.status)} size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{submission?.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {submission?.dueDate}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="ExternalLink" size={14} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All submissions up to date!</p>
          </div>
        )}
      </div>
      {/* Recent Submissions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Recent Submissions</h3>
        {recentSubmissions?.length > 0 ? (
          <div className="space-y-3">
            {recentSubmissions?.map((submission) => (
              <div key={submission?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{submission?.title}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {submission?.submittedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                    {submission?.validationStatus}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="FileText" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent submissions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionTracker;