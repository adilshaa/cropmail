import React from 'react';
import TemplatePreview from './TemplatePreview';

const TemplateSuggestions = React.memo(({ templates, onSelect, onMore }) => {
  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Suggested Templates</h3>
        <button
          onClick={onMore}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          More Templates
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplatePreview
            key={template.id}
            template={template}
            onClick={() => onSelect(template)}
          />
        ))}
      </div>
    </div>
  );
});

export default TemplateSuggestions;
