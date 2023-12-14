'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import React, { useContext } from 'react'
import { IoMdMenu } from "react-icons/io";
import {  useSideMenu } from '../layout';
import ModeToggle from '@/components/DarkMode';

function HeaderTop() {
  const { sideBar, setSideBar } = useSideMenu();

  return (
    <div className='flex justify-between md:justify-end border-b dark:border-gray-400 p-5 items-center'>
      <div className='md:hidden'>
        <IoMdMenu className='text-xl' onClick={() => setSideBar(!sideBar)} />
      </div>
      <Image src={'/logo.svg'} width={150} height={100} className='md:hidden' />
      <div className='flex space-x-4'>
        <UserButton afterSignOutUrl="/" />
        <ModeToggle/>
      </div>
    </div>
  );
}

export default HeaderTop;