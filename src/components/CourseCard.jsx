import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserGraduate } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="block transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Course+Image';
            }}
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-blue-600">
            ${course.price}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {course.category || 'General'}
            </span>
            <span className="text-sm text-gray-500">
              {course.level || 'All Levels'}
            </span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex items-center">
            By {course.instructor}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400 w-4 h-4" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-gray-500 text-sm">
                ({course.students?.toLocaleString() || 0})
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FaUserGraduate className="mr-1" />
              {course.students?.toLocaleString() || 0} students
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
