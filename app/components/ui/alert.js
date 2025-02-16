import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react';

const Alert = ({ 
  variant = 'info', 
  title, 
  message, 
  onClose, 
  className = '',
  showIcon = true 
}) => {
  const variants = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200 text-blue-800',
      iconClass: 'text-blue-500',
      Icon: Info
    },
    success: {
      containerClass: 'bg-green-50 border-green-200 text-green-800',
      iconClass: 'text-green-500',
      Icon: CheckCircle
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconClass: 'text-yellow-500',
      Icon: AlertTriangle
    },
    error: {
      containerClass: 'bg-red-50 border-red-200 text-red-800',
      iconClass: 'text-red-500',
      Icon: AlertCircle
    },
    neutral: {
      containerClass: 'bg-gray-50 border-gray-200 text-gray-800',
      iconClass: 'text-gray-500',
      Icon: Info
    }
  };

  const { containerClass, iconClass, Icon } = variants[variant] || variants.info;

  return (
    <div className={`relative flex items-start p-4 mb-4 rounded-lg border ${containerClass} ${className}`}>
      {showIcon && (
        <div className={`flex-shrink-0 mr-3 ${iconClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-sm font-medium mb-1">
            {title}
          </h3>
        )}
        {message && (
          <div className="text-sm opacity-90">
            {message}
          </div>
        )}
      </div>

      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Example usage component showing all variants
const AlertExample = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Alert
        variant="info"
        title="Information"
        message="This is an informational message for the user."
      />

      <Alert
        variant="success"
        title="Success!"
        message="Your changes have been successfully saved."
      />

      <Alert
        variant="warning"
        title="Warning"
        message="Please backup your data before proceeding."
      />

      <Alert
        variant="error"
        title="Error"
        message="An error occurred while processing your request."
        onClose={() => console.log('Alert closed')}
      />

      <Alert
        variant="neutral"
        title="Note"
        message="This is a neutral message with general information."
      />

      {/* Example without icon */}
      <Alert
        variant="info"
        title="No Icon Alert"
        message="This alert is displayed without an icon."
        showIcon={false}
      />

      {/* Example without title */}
      <Alert
        variant="success"
        message="This alert has no title, only a message."
      />
    </div>
  );
};

export default AlertExample;