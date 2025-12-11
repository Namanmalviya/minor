import React from 'react';
import Icon from '../../../components/AppIcon';

const FormSection = ({ 
  title, 
  description, 
  icon, 
  isActive, 
  isCompleted, 
  completionPercentage, 
  children, 
  onToggle 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full p-6 text-left transition-colors duration-200 ${
          isActive ? 'bg-muted/50' : 'hover:bg-muted/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isCompleted ? 'bg-success text-success-foreground' : 
              isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {isCompleted ? (
                <Icon name="Check" size={20} />
              ) : (
                <Icon name={icon} size={20} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {completionPercentage}% Complete
              </div>
              <div className="w-24 h-2 bg-muted rounded-full mt-1">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    completionPercentage === 100 ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <Icon 
              name={isActive ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </div>
        </div>
      </button>
      
      {isActive && (
        <div className="px-6 pb-6 border-t border-border bg-background/50">
          <div className="pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSection;