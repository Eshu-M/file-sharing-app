import React from 'react'
import { Button } from "/components/ui/button"
import { IoMdMenu } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "/components/ui/dropdown-menu";
import Link from 'next/link';
function SideMenu() {
  return (
    <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            <IoMdMenu/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
        <Link href={'/'}>
            Home
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href={'/'}>
            About Us
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href={'/'}>
            Contact Us
        </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default SideMenu