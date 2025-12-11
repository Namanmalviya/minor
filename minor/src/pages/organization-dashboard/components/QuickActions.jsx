import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ notifications }) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Submit New Data",
      description: "Add latest innovation metrics",
      icon: "Upload",
      variant: "default",
      onClick: () => navigate('/data-submission')
    },
    {
      id: 2,
      title: "View Analytics",
      description: "Explore detailed insights",
      icon: "BarChart3",
      variant: "outline",
      onClick: () => navigate('/analytics-visualization')
    },
    {
      id: 3,
      title: "Compare Performance",
      description: "Benchmark against peers",
      icon: "GitCompare",
      variant: "outline",
      onClick: () => navigate('/benchmarking-comparison')
    },
    {
      id: 4,
      title: "Generate Report",
      description: "Create PDF analytics report",
      icon: "FileText",
      variant: "outline",
      onClick: () => console.log('Generate report')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              onClick={action?.onClick}
              className="h-auto p-4 justify-start"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={action?.icon} size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{action?.title}</p>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Notifications</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Manage
          </Button>
        </div>
        
        {notifications?.length > 0 ? (
          <div className="space-y-3">
            {notifications?.slice(0, 4)?.map((notification) => (
              <div key={notification?.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification?.type === 'deadline' ? 'bg-warning/10' :
                  notification?.type === 'milestone'? 'bg-success/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={
                      notification?.type === 'deadline' ? 'Clock' :
                      notification?.type === 'milestone'? 'Trophy' : 'Bell'
                    } 
                    size={16} 
                    className={
                      notification?.type === 'deadline' ? 'text-warning' :
                      notification?.type === 'milestone'? 'text-success' : 'text-primary'
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                </div>
                {notification?.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Bell" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;