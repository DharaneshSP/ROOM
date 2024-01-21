"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import error from "@/app/main/error"
import toast from "react-hot-toast"


export default function Example() {

  const router=useRouter()

    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    
    const navigate = ()=>{
  
      toast.success('Successfully Created');
      router.push('/')

    }

    const registeruser = async(e)=>{
        e.preventDefault()
        axios.post('/api/register',data)
        .then(navigate)
        .catch(()=> toast.error("Email Already Registered"));
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

  
        <div className="fixed left-0 right-0 top-2  flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                          
                          <h2 className="rounded border-solid border-2 border-black bg-black  mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-[#E384FF]">
                            JOIN ROOM
                          </h2>
                        </div>  
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={registeruser}>
              <div>
                
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="UserName"
                    className="text-white bg-[black] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setData({...data,name:e.target.value})}
                  />
                </div>
              </div>

              <div>
               
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email Address"
                    className="text-white bg-[black] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setData({...data,email:e.target.value})}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                 
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    className=" text-white bg-[black] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setData({...data,password:e.target.value})}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-[#E384FF] text-black hover:bg-black hover:text-white mt-5"
                  >
                  REGISTER
                </button>
              </div>
            </form>
  
            
          </div>
        </div>
      </>
    )
  }
  
