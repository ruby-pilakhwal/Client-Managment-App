import React, { useState, useEffect } from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = (props) => {
  // Retrieve dark mode preference from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Set the initial dark mode state based on localStorage
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-[#1a1b1e] text-white' 
        : 'bg-[#f0f4f8] text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-8">
          <Header changeUser={props.changeUser} data={props.data} />
          
          <button
            onClick={toggleTheme}
            className={`px-6 py-3 rounded-xl font-medium shadow-lg 
            transition-all duration-300 flex items-center gap-3
            ${isDarkMode 
              ? 'bg-[#2c2d31] hover:bg-[#3a3b3f] text-white ring-1 ring-[#404144]' 
              : 'bg-white hover:bg-gray-50 text-gray-800 ring-1 ring-gray-200'
            }`}
          >
            {isDarkMode ? (
              <>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>

        <div className={`grid gap-8 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          <div className={`rounded-2xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#2c2d31] shadow-xl shadow-black/20' 
              : 'bg-white shadow-xl shadow-blue-100/30'
          }`}>
            <CreateTask isDarkMode={isDarkMode} />
          </div>
          
          <div className={`rounded-2xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#2c2d31] shadow-xl shadow-black/20' 
              : 'bg-white shadow-xl shadow-blue-100/30'
          }`}>
            <AllTask isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
