"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '@/app/component/navbar'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { BACKEND } from '../libs/constants'


const page = () => {

    const [roomlist,setroomlist]=useState()  
    const {data:session}=useSession();
    const router=useRouter();
    
useEffect(()=>{

   
    async function fetchroomlist(userId){
        
        const data = await fetch(`${BACKEND}/api/userrooms/${userId}`)
        const roomlist=  await data.json();
        setroomlist(roomlist.rooms)

    }

   
    if(session?.user.email?.length>0){    
        console.log(session);
            fetchroomlist(session?.user.email);
    }

},[session])

const navigate=(room)=>{
    router.push('/main?room='+room);
}

    

  return (
    <div >
           
          <Navbar/>
            
        <div className='border-t-2 border-black border-solid  h-screen w-screen flex-col items-center  justify-center px-10 text-black my-20'>
            
         <div className='my-5 font-bold text-xl bg-black p-2 w-fit text-white'>JOINED ROOMS</div>

          {roomlist?.map((item)=>  

            <div className='border-2 border-black border-solid  w-11/12 my-10 p-3 flex justify-between ml-5' >
                <div className='border-2 border-black border-dashed w-11/12 flex justify-center items-center  font-semibold '>
                     <p>{item?.room.name}</p>
                </div>
                
                <div className='border-2 border-black border-solid bg-black text-white w-auto p-2'>
                   <button onClick={()=>navigate(item?.room.name)}>
                            JOIN
                   </button>
                </div>
                
            </div>
)}
           
        </div>   
      
    </div>
  )
}

export default page
