import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import ModeToggle from './DarkMode'
import SideMenu from './SideMenu'

export default function NavBar() {
  return (
    <div className='p-5 flex justify-between shadow-sm'>
        <div className='flex justify-between items-center space-x-5'>
          <Image src={'/logo.svg'} width={150} height={100}/>
          <div className="space-x-5 hidden md:flex">
          <Link href={'/'}>Home</Link>
          <Link href={'/'}>About Us</Link>
          <Link href={'/'}>Contact Us</Link>
          </div>
        </div>
        <div className="flex justify-between space-x-3">
            <Button className='bg-blue-500 text-white hover:bg-blue-700'>
              <Link href={'/files'}>
              Get Started
              </Link>
              </Button>
            <ModeToggle/>
            <div className="md:hidden">
            <SideMenu/>
            </div>
        </div>
        
    </div>
  )
}
