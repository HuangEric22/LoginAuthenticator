import React from "react";
import logo from '/BPlanner-Icon.png';
import { FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="px-0 py-2 flex items-center">
      <FiMenu size={32} className="text-yellow-500 mr-4 cursor-pointer"/>
      <div onClick={() => navigate('/home')} className="flex items-center cursor-pointer">
        <img src={logo} alt="calendar logo" className="mr-1 w-8 h-8" />
        <h1 className="mr-10 text-xs text-yellow-500 font-body">
          BruinPlanner
        </h1>
      </div>

      <div>

      </div>
    </header>
  );
};

export default Header;
