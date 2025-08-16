import React, { useContext } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider';

const Header = ({ data }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const userName = data?.role === 'admin' ? 'Admin' : data?.firstName || 'User';

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        Hello, <span className="text-yellow-300">{userName}</span> 👋
      </h1>
      <button 
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Log Out
      </button>
    </div>
  );
};

export default Header;
