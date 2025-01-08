export const loadLocalTemplate = async (templateName) => {
  try {
    const template = await import(`../templates/${templateName}.html`);
    return template.default;
  } catch (error) {
    console.error('Error loading template:', error);
    return null;
  }
};

export const availableTemplates = [
  { id: 'template1', name: 'Basic Template' },
  { id: 'template2', name: 'Newsletter Template' },
  // Add more templates as needed
];
