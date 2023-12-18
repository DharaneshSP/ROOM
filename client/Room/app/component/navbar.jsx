"use client"

import React from 'react'

const navbar = () => {
  return (
    <div>

          <div className='fixed top-0 bg-palewhite flex '> 
                  <div className='border-2 border-black border-solid h-20 flex items-center  gap-2 px-2 w-screen'>
                            <a  href='/' className=' border-2 border-black border-solid p-1 px-5 text-black hover:bg-black hover:text-white'>
                                Home
                            </a>          
                  </div>           
          </div>
      
    </div>
  )
}

export default navbar
