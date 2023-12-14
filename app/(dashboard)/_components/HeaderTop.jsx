'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import React, { useContext } from 'react'
import { IoMdMenu } from "react-icons/io";
import {  useSideMenu } from '../layout';

function HeaderTop() {
  const { sideBar, setSideBar } = useSideMenu();

  return (
    <div className='flex justify-between md:justify-end border-b p-5 items-center'>
      <div className='md:hidden'>
        <IoMdMenu className='text-xl' onClick={() => setSideBar(!sideBar)} />
      </div>
      <Image src={'/logo.svg'} width={150} height={100} className='md:hidden' />
      <div className=''>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default HeaderTop;