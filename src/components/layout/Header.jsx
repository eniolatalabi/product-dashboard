import React from 'react';
import { 
  MdNotificationsNone 
} from 'react-icons/md';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">StyleTerrain</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <MdNotificationsNone className="h-6 w-6" />
            </button>
            
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                <span className="text-sm font-medium leading-none text-white">A</span>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;