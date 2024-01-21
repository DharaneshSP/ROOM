'use client'

import React from 'react'


const chathead = ({socket,currentroom,setCurrentroom,room}) => {

  return (

    <div className='font-bold text-xl text-[#E384FF] px-1'  >
        <p>{room}</p>
    </div>
   
  )
}




export default chathead;
