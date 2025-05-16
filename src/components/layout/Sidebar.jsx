import React from 'react';
import { 
  MdDashboard, 
  MdInventory, 
  MdShoppingCart, 
  MdPeople, 
  MdBarChart 
} from 'react-icons/md';

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', Icon: MdDashboard, current: false },
    { name: 'Products', Icon: MdInventory, current: true },
    { name: 'Orders', Icon: MdShoppingCart, current: false },
    { name: 'Customers', Icon: MdPeople, current: false },
    { name: 'Analytics', Icon: MdBarChart, current: false },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-white text-2xl font-bold">StyleTerrain</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const IconComponent = item.Icon;
              return (
                <a
                  key={item.name}
                  href="#"
                  className={`${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <IconComponent 
                    className={`${
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 h-6 w-6`}
                  />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-500">
                  <span className="text-sm font-medium leading-none text-white">A</span>
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Logout</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;