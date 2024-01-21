
"use client"

import React, { useState,useEffect } from 'react'
import { getSession } from 'next-auth/react'

import { FaBars,FaTimes } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const page = () => {

  const [session,setSession]=useState("");
  
useEffect(()=>{

    const fetchSession = async () => {
        const data = await getSession();
            setSession(data);
      }

  fetchSession();

},[])


const navLinks = [

  {
      title: "Dashboard",
      link: (session)?"/dashboard":"/"
  },
  {
      title:"Login",
      link:'/login'
  },
  
  {
      title:"SignUp",
      link:'/register'
  }

]

const [open,setopen] = useState(false);



  return (
    <div>



<div className='bg-[#191825] border-2 border-black border-solid text-black'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16 '>


                <div className='flex items-center '>
                        <div className=' border-2 border-black border-solid p-3 px-5 bg-black text-[#E384FF]'>
                                ROOM
                        </div>
                </div>

                <div className='hidden md:block z-20'>
                    <div className='ml-10 flex gap-4'>

                            {navLinks.map((item) => (
                                    <a
                                        key={item.title}  
                                        className='text-[#E384FF] border-2 border-[#E384FF] border-solid p-2 hover:bg-[#E384FF] hover:text-black'
                                        href={item.link}
                                    >
                                        {item.title}
                                    </a>
                            ))}
                    </div>
                </div>    
                
                <div className='md:hidden'>
                        <button onClick={()=>setopen(!open)}>
                            {open? <FaTimes className='text-[#E384FF]'/>:<FaBars className='text-[#E384FF]' />}
                        </button>
                </div>

            </div>
        </div>

        {open ? (
            <div className='md:hidden fixed left-0 right-0 border-t border-solid border-2 border-black  bg-[#191825]'>
                <div className='z-20 flex-col items-center  h-auto  px-2 pt-2 pb-3  sm:px-3 '>

                        {navLinks.map((item) => (
                                    <a
                                        key={item.title}  
                                        className=' block text-[#E384FF] px-3 py-2  text-end z-1 font-bold
                                        hover:bg-black 
                                        hover:text-[#E384FF]
                                        border border-1 border-black border-solid mb-1 '
                                        href={item.link}
                                    >
                                        {item.title}
                                    </a>
                          ))}
                </div>
            </div> 
        ): null}

    </div >
  
    <div className='border border-0 border-black border-solid mt-32 mb-32 md:mb-36'>
          <div className=' mt-10    w-screen  flex justify-center items-end px-10 text-[#E384FF] '>
             <div className='text-8xl w-fit border-0 border-black border-solid h-fit'>ROOM</div>
          
          </div>
          
          <div className='border-0 border-black border-solid  h-fit w-screen  flex justify-center items-end px-10 text-black '>
             <div className='text-lg text-white my-3 w-fit border-0 border-black border-solid h-fit text-center px-2'>
             A minimalistic secure application offering secret password protected chat rooms  for discreet and private conversations.
              </div>
             
          </div>

        
          <div className='text-white text-center text-medium my-6'>

                {session?
                    
                   <div>  
                   <div className='border-1 border-black border-solid  h-fit w-screen  flex justify-center items-end px-10 text-black gap-4 my-3'>
           
                      <a href={"/createpanel"} className='border-1 border-black border-solid w-fit h-fit bg-black text-white p-3'>
                          CREATE ROOM
                      </a>
                      <a href={"/joinpanel"} className='border-1 border-black border-solid w-fit h-fit bg-black text-white p-3 '>
                          JOIN ROOM
                      </a>

                  </div>

                  <div>

                       
                        <TypeAnimation
                                sequence={[
                                    "Hi, "+ session?.user?.name
                                ]}
                                wrapper="span"
                                speed={5}
                                style={{ fontSize: '1em', display: 'inline-block' }}
     
                        />
                              
                  </div>    
              </div>
                    
                     :


                    <div>
                            <a href={"/login"} className='border-1 border-black border-solid w-fit h-fit bg-black text-white p-3 text-lg'>
                                Login To Use
                            </a>

                    </div>                   
            }
               
          </div>

      </div>  

    </div>
  )
}

export default page
