"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  // Changed to false so the dropdown doesn't stay open on page load
  const [showdropdown, setshowdropdown] = useState(false)
  
  return (
    // Added py-4 and gap-4 for proper mobile spacing
    <div className='bg-blue-950 text-white flex justify-between px-4 py-4 md:py-0 items-center md:h-16 flex-col md:flex-row gap-4 md:gap-0'>
      <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
        GETMEACHAI
      </Link>

      <div className='flex flex-col md:flex-row items-center gap-4 relative'>
        {session && <>
          {/* Wrapper specifically for the dropdown positioning */}
          <div className="relative">
            <button 
              onClick={() => setshowdropdown(!showdropdown)} 
              onBlur={() => { setTimeout(() => { setshowdropdown(false) }, 300); }} 
              id="dropdownDefaultButton" 
              className="inline-flex items-center justify-center text-white bg-blue-800 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none max-w-[250px]" 
              type="button"
            >
              {/* The truncate class and max-width ensure long emails get cut off with "..." on small screens */}
              <span className="truncate max-w-[130px] sm:max-w-[200px]">Welcome {session.user.email}</span>
              <svg className="w-4 h-4 ms-1.5 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            {/* Replaced absolute left-[125px] with responsive absolute positioning */}
            <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-full mt-2 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded">Your page</Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className="inline-flex items-center text-left w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
        </>}
        
        {session && (
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5' onClick={() => signOut()}>
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5'>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar