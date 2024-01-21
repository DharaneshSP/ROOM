
'use client'

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function Example() {

    const session = useSession()
    const router = useRouter()

    const [data,setData]= useState({
        email:"",
        password:""
    })

    // useEffect(()=>{
    //     if(session?.status === "authenticated"){
    //         router.push('/')
    //     }
    // })


  //   useEffect(()=>{
  //     if(session?.status === "authenticated"){
  //         router.push('/')
  //     }
  //     console.log(session);
  // })




    const loginuser = async(e)=>{
      e.preventDefault();
      signIn('credentials',{...data,redirect:false})
      .then((response)=>{
        if(!response.ok){
          toast.error(response.error)
          throw new Error(response.error);
        }  
          toast.success("Logged in successfully");
          router.push("/");
      })
      .catch((err)=>{console.log(err)});
  }

    return (
      <>

        <div className='border border-3 border-black border-solid p-3' >
            <div className='flex items-center'>
                  <a className=' border-2 border-black border-solid p-3 px-5 bg-black text-[#E384FF] '>
                          ROOM
                  </a>
            </div>
          </div>
        
       
        <div className="fixed left-2 right-2 top-0  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h2 className=" rounded border-solid border-2 border-black bg-black  mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-[#E384FF]">
                LOGIN
              </h2>
            </div>  
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginuser}>
              <div>
                
                <div className="mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                    className="block text-white bg-[black] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=> setData({...data, email:e.target.value})}
                 />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    className="block text-white bg-[black] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setData({...data,password:e.target.value})}
                 />
                 
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-[#E384FF] text-black hover:bg-black hover:text-white mt-5"
                  >
                  GET IN
                </button>
              </div>
            </form>
  

          </div>
        </div>
      </>
    )
  }

