import React from "react";
import logo from '/BPlanner-Icon.png';
import { FiMenu } from "react-icons/fi";

const Header = () => {
  return (
    <header className="px-4 py-2 flex items-center">
      < FiMenu size={32} className="text-yellow-500 mr-7"/>
      <img src={logo} alt="calendar logo" className="mr-2 w-8 h-8" />
      <h1 className="mr-10 text-xl text-yellow-500 font-body">
        Calendar
      </h1>

    </header>
  );
};

export default Header;
