import React, { useState, useEffect, useRef } from 'react';
import 'boxicons';
import SidebarPanel from './SidebarPanel';

function Sidebar({ currentUserId }) {
  const [activeLink, setActiveLink] = useState(null);
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setPanelVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const handleClick = (link) => {
    setActiveLink(link);
    setPanelVisible(true);
  };

  return (
    <div
      ref={sidebarRef}
      className={`h-[calc(100vh-2rem)] bg-[#101010] text-white fixed rounded-lg left-4 top-4 bottom-4 flex flex-col justify-between transition-all duration-300 ${isSidebarExpanded ? 'w-[230px]' : 'w-[80px]'
        } overflow-hidden`}
    >
      <div className="p-2 text-lg font-bold flex items-center justify-between">
        <button
          className="w-[40px] h-[40px] rounded-lg hover:bg-[#181818] flex items-center justify-center"
          onClick={handleMenuToggle}
        >
          <box-icon name='menu-alt-left' animation='tada-hover' color='#D1D5DB' size='24px'></box-icon>
        </button>
      </div>

      <div className="flex-grow flex flex-col justify-center relative">
        <ul>
          <li
            className={`relative flex items-center py-2 px-4 mx-2 cursor-pointer rounded-md transition-all duration-300 ${activeLink === 'Direct' ? 'bg-[#181818] text-white' : 'hover:bg-[#181818]'
              } my-2`}
            onClick={() => handleClick('Direct')}
          >
            <box-icon
              name='message-square-dots'
              color={activeLink === 'Direct' ? '#ffffff' : '#D1D5DB'}
              className={`transition-all duration-300 ${isSidebarExpanded ? 'mr-4' : 'mr-0'}`}
              size="32px"
            ></box-icon>
            <span
              className={`ml-4 text-sm transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
                }`}
            >
              Direct
            </span>
          </li>
          <li
            className={`relative flex items-center py-2 px-4 mx-2 cursor-pointer rounded-md transition-all duration-300 ${activeLink === 'Server' ? 'bg-[#181818] text-white' : 'hover:bg-[#181818]'
              } my-2`}
            onClick={() => handleClick('Server')}
          >
            <box-icon
              name='server'
              color={activeLink === 'Server' ? '#ffffff' : '#D1D5DB'}
              className={`transition-all duration-300 ${isSidebarExpanded ? 'mr-4' : 'mr-0'}`}
              size="32px"
            ></box-icon>
            <span
              className={`ml-4 text-sm transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
                }`}
            >
              Server
            </span>
          </li>
        </ul>
        {isPanelVisible && (
          <SidebarPanel 
            currentUserId={currentUserId} 
            content={activeLink} 
            isSidebarExpanded={isSidebarExpanded} 
          />
        )}
      </div>

      <div className="border-t border-[#37393f]"></div>

      <ul>
        <li
          className={`flex items-center py-2 px-4 mx-2 my-6 cursor-pointer rounded-md transition-all duration-300 hover:bg-[#181818]`}
        >
          <box-icon
            name='cog'
            type='solid'
            animation='spin-hover'
            color='#D1D5DB'
            size="28px"
          ></box-icon>
          <span
            className={`whitespace-nowrap ml-4 text-sm transition-all duration-300 ease-in-out flex items-center ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
              }`}
          >
            User Settings
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;