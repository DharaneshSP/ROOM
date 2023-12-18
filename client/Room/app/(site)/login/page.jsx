
'use client'

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import Navbar from "@/app/component/navbar"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

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

    const loginuser = async(e)=>{e
        e.preventDefault();
        signIn('credentials',{...data,redirect:false})
        .then(()=> {alert("user logged");router.push('/');})
        .catch(()=>alert("not logged"));
    }

    return (
      <>
        
        <Navbar/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginuser}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=> setData({...data, email:e.target.value})}
                 />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
              
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setData({...data,password:e.target.value})}
                 />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-white text-black hover:bg-black hover:text-white mt-5"
                >
                  Log in
                </button>
              </div>
            </form>
  

          </div>
        </div>
      </>
    )
  }

