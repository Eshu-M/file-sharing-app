'use client'
// 'use client'
import React, { createContext, useContext, useState } from 'react';
import SideNav from './_components/SideNav';
import HeaderTop from './_components/HeaderTop';

// Create a context for managing the sidebar state
export const SideMenuContext = createContext();

// Custom hook to use the context
export const useSideMenu = () => useContext(SideMenuContext);

function Layout({ children }) {
  // State to manage the sidebar visibility
  const [sideBar, setSideBar] = useState(false);

  // Context value with state and setter
  const sideMenu = {
    sideBar,
    setSideBar,
  };

  return (
    <SideMenuContext.Provider value={sideMenu}>
      <div className='flex'>
        <div className={`h-full inset-1 z-50 md:flex flex-col ${sideBar ? 'flex' : 'hidden'}`}>
          <SideNav />
        </div>
        <div className='w-full'>
          <HeaderTop />
          {children}
        </div>
      </div>
    </SideMenuContext.Provider>
  );
}

export default Layout;
