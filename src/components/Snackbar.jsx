import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const Snackbar = ({ message, type = 'success', onClose }) => {
  const getStyles = () => {
    const baseStyles = "bg-white border shadow-lg";
    const successStyles = "border-green-500 text-gray-800";
    const errorStyles = "border-red-500 text-gray-800";
    
    return `${baseStyles} ${type === 'success' ? successStyles : errorStyles}`;
  };

  const getIcon = () => {
    if (type === 'success') {
      return <FaCheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <FaTimesCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${getStyles()} px-6 py-4 rounded-lg flex items-center gap-3 min-w-[300px]`}>
        {getIcon()}
        <span className="flex-1 text-gray-700 font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaTimes className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
