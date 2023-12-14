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
        <div className={`md:flex flex-col gap-4 border-r ${sideBar ? 'flex' : 'hidden'}`}>
          <div className='p-5'>
            <Image src={'/logo.svg'} width={150} height={100} />
          </div>
          <div className='w-full'>
            {menuList.map((menu) => (
              <div key={menu.id} className='flex flex-col px-3 py-1'>
                <Link href={menu.path} className={`flex gap-4 text-lg  pt-1 pb-1 pl-5 pr-5 w-full items-center hover:bg-gray-200 rounded-lg ${activeState == menu.id ? 'text-blue-500 bg-white' : null}`} onClick={() => setActiveState(menu.id)}>
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
  