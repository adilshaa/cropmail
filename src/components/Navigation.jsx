import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navigation = ({ isDarkTheme, toggleTheme, menuRefs, handleMouseEnter, handleMouseLeave }) => (
  <nav className={`fixed w-full backdrop-blur-md bg-opacity-70 ${
    isDarkTheme ? "bg-gray-900/70" : "bg-white/70"
  } z-50 px-5 sm:px-20 py-4`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo section */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20"></div>
          <img
            src="https://shreethemes.in/mortal_next/assets/images/logo-icon-40.png"
            alt="Logo Icon"
            className="w-8 h-8 mr-2 relative z-10"
          />
        </div>
        <h1 className={`text-2xl font-bold bg-gradient-to-r ${
          isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
        } bg-clip-text text-transparent`}>
          AICademy
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex space-x-8">
        {/* Menu Links */}
        {["Price", "About", "Contact"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            ref={menuRefs[item]}
            className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            {item}
          </Link>
        ))}
        <Link
          to="/login"
          className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} font-bold hover:underline`}
        >
          Sign Up
        </Link>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`ml-4 px-4 py-2 rounded flex items-center ${
          isDarkTheme ? "text-yellow-500" : "text-gray-800"
        }`}
      >
        {isDarkTheme ? <FaSun className="w-5 h-5 rotate" /> : <FaMoon className="w-5 h-5 float" />}
      </button>
    </div>
  </nav>
);

export default Navigation;
