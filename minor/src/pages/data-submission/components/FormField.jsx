import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FormField = ({ 
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  description,
  options = [],
  prefix,
  suffix,
  min,
  max,
  step,
  rows = 3
}) => {
  const handleChange = (e) => {
    const newValue = type === 'number' ? parseFloat(e?.target?.value) || 0 : e?.target?.value;
    onChange(name, newValue);
  };

  const handleSelectChange = (selectedValue) => {
    onChange(name, selectedValue);
  };

  if (type === 'select') {
    return (
      <div className="space-y-2">
        <Select
          label={label}
          description={description}
          error={error}
          required={required}
          options={options}
          value={value}
          onChange={handleSelectChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <textarea
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
        />
        {error && (
          <p className="text-xs text-error flex items-center">
            <Icon name="AlertCircle" size={12} className="mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {(prefix || suffix) ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <div className="relative">
            {prefix && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                {prefix}
              </div>
            )}
            <input
              type={type}
              name={name}
              value={value || ''}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              min={min}
              max={max}
              step={step}
              className={`w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
                prefix ? 'pl-8' : ''
              } ${suffix ? 'pr-8' : ''}`}
            />
            {suffix && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                {suffix}
              </div>
            )}
          </div>
          {error && (
            <p className="text-xs text-error flex items-center">
              <Icon name="AlertCircle" size={12} className="mr-1" />
              {error}
            </p>
          )}
        </div>
      ) : (
        <Input
          type={type}
          label={label}
          description={description}
          error={error}
          required={required}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
};

export default FormField;