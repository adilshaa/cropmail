import React from 'react';

const PageHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex gap-3">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
