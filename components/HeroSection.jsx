import React from 'react'
import { Button } from './ui/button'
import Constants from '@/lib/Constants'
import Link from 'next/link'

function HeroSection() {
  return (
    <div className=''>
<section className="max-w-xl mx-auto text-center">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        <span className='text-blue-500'>Upload , Store And Easily Share</span>Your Files In One Place
        <strong className="font-extrabold text-red-700 sm:block"> Increase Conversion. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        {Constants.des}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4 md:flex md:flex-row">
        <Button className='bg-blue-500 hover:bg-blue-700 text-white w-full md:w-52 shadow-sm'>
          <Link href={'/files'}>
              Get Started
          </Link></Button>
        <Button className='bg-white  hover:bg-gray-100 text-blue-500 w-full md:w-52 shadow-sm'>Learn More</Button>
      </div>
    </div>
  </div>
</section>    </div>
  )
}

export default HeroSection