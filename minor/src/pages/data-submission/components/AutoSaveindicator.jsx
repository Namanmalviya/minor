import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diff = Math.floor((now - lastSaved) / 1000);
      
      if (diff < 60) {
        setTimeAgo('just now');
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        setTimeAgo(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
      } else {
        const hours = Math.floor(diff / 3600);
        setTimeAgo(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      {isSaving ? (
        <>
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Icon name="Check" size={16} className="text-success" />
          <span className="text-muted-foreground">
            Saved {timeAgo}
          </span>
        </>
      ) : (
        <>
          <Icon name="AlertCircle" size={16} className="text-warning" />
          <span className="text-muted-foreground">Not saved</span>
        </>
      )}
    </div>
  );
};

export default AutoSaveIndicator;