import React from "react";

interface HeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-105">
        {icon}
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
        {title}
      </h2>
      <p className="text-gray-600 font-medium">{subtitle}</p>
    </div>
  );
};

export default Header;
