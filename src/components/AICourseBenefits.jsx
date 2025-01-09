import React from 'react';
import { FaLaptopCode, FaChartLine, FaCertificate, FaUsers, FaRobot, FaCloud } from 'react-icons/fa';

const AICourseBenefits = ({ isDarkTheme }) => {
  const benefits = [
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "Hands-on AI Projects",
      description: "Build real-world AI applications using industry-standard tools"
    },
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: "Practical Coding",
      description: "Learn Python, TensorFlow, PyTorch, and other essential AI frameworks"
    },
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: "Cloud Integration",
      description: "Deploy AI models using AWS, Google Cloud, and Azure"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Career Growth",
      description: "Prepare for high-demand AI and ML roles"
    },
    {
      icon: <FaCertificate className="w-8 h-8" />,
      title: "Certification",
      description: "Earn recognized certificates in AI specializations"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Expert Community",
      description: "Learn from AI practitioners and researchers"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {benefits.map((benefit, index) => (
        <div 
          key={index} 
          className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} 
            shadow-lg hover:shadow-xl transition-shadow duration-300 border
            ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="text-blue-500 mb-4">
            {benefit.icon}
          </div>
          <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {benefit.title}
          </h3>
          <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AICourseBenefits;
