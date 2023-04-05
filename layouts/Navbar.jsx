import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'

const Navbar = () => {
  return (
    <>
        <header className="w-full flex justify-between fixed z-50 items-center top-0 bg-gray-800 sm:px-8 px-4 py-2 border-b border-b-gray-900">
        <Link href="/">
          <div className='flex items-center gap-2 justify-center'>
          <img src="/logoo.png" alt="logo" className="w-8   object-contain" />
          <p className='text-xl'>AI Gallery</p>
          </div>
        </Link>
        <Link href="/createpost" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
        {/* <Link href={'/createpost'}><Button data={"Create"} /></Link> */}
      </header>
    </>
  )
}

export default Navbar