'use client'
import React, { createContext, useContext, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileStack } from "react-icons/lu";
import { FaShieldAlt } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import {  useSideMenu } from '../layout';
// ... (your imports)
  
    function SideNav() {
      const { sideBar } = useSideMenu();
    
      const menuList=[
        {
            id:1,
            name:'Upload',
            icon:<FaCloudUploadAlt/>,
            path:"/upload"
        },
        {
            id:2,
            name:'Files',
            icon:<LuFileStack/>,
            path:"/files"
        },
        {
            id:3,
            name:'Upgrade',
            icon:<FaShieldAlt/>,
            path:"/upgrade"
        }
    ]
      const [activeState, setActiveState] = useState(0);
    
      return (
        <div className={`md:flex flex-col items-center gap-4 border-r dark:border-gray-400 h-[100vh] w-52 ${sideBar ? 'flex' : 'hidden'}`}>
          <div className='p-5'>
            <Image src={'/logo.svg'} width={150} height={100} />
          </div>
          <div className='w-full'>
            {menuList.map((menu) => (
              <div key={menu.id} className=''>
                <Link href={menu.path} className={`flex gap-4 text-lg  w-full items-center pl-10 p-1.5 hover:bg-gray-200 ${activeState == menu.id ? 'bg-blue-100 text-blue-500' : null}`} onClick={() => setActiveState(menu.id)}>
                  {menu.icon}
                  <p>{menu.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    export default SideNav;
  