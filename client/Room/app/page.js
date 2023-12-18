
"use client"

import React, { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'


const page = () => {

  const [session,setSession]=useState("");
  //const [gesture,setgesture]=useState((session)?("Hi, "+session?.user?.name):"Login To Use");

  const [gesture,setgesture]=useState("");
    
  const fetchSession = async () => {
    const session = await getSession();

    if(session){
        setgesture("Hi, "+session?.user?.name);
    }
    else{
        setgesture("Login To Use");
    }

  };


useEffect(()=>{

  fetchSession();

},[])


  return (
    <div>
        <div className='fixed top-0 bg-palewhite flex '> 
                        <div className='border-2 border-black border-solid h-20 flex items-center justify-between px-7 pr-3 gap-2 w-screen'>
                            <div className=' border-2 border-black border-solid p-3 px-5 bg-black text-white'>
                                ROOM
                            </div>

                           <div className='flex justify-between gap-3 border-0 border-black border-solid px-3'> 
                                <a href='/dashboard' className='text-black border-2 border-black border-solid p-2 hover:bg-black hover:text-white'>
                                    Dashboard
                                </a>
                                <a href='/login' className='text-black border-2 border-black border-solid p-2 hover:bg-black hover:text-white'>
                                    Login
                                </a>
                                <a href='/register' className='text-black border-2 border-black border-solid p-2 hover:bg-black hover:text-white'>
                                  Signup
                                </a>
                           </div>   
                        </div>
          </div>


            
          <div className='border-0 border-black border-solid  h-52 w-screen  flex justify-center items-end px-10 text-black mt-20'>
             <div className='text-8xl w-fit border-0 border-black border-solid h-fit'>ROOM</div>
          
             


          </div>
          
          <div className='border-0 border-black border-solid  h-fit w-screen  flex justify-center items-end px-10 text-black '>
             <div className='text-lg my-3 w-fit border-0 border-black border-solid h-fit text-center px-2'>
             A minimalistic secure application offering secret password protected chat rooms  for discreet and private conversations.
              </div>
             
          </div>

          <div className='border-1 border-black border-solid  h-fit w-screen  flex justify-center items-end px-10 text-black gap-4 my-3'>
             
              <a href={gesture === "Login To Use" ? "#" : "/createpanel"} className='border-1 border-black border-solid w-fit h-fit bg-black text-white p-3'>
                 CREATE ROOM
              </a>
              <a href={gesture === "Login To Use" ? "#" : "/joinpanel"} className='border-1 border-black border-solid w-fit h-fit bg-black text-white p-3 '>
                 JOIN ROOM
              </a>

            
          </div>

          <div className='text-black text-center text-lg my-6' >  
          <a href={gesture === "Login To Use" ? "/login" : "#"} >
                {gesture}
          </a>
          </div>  

        

    </div>
  )
}

export default page
