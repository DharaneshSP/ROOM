'use client'

import React, { useState,useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Navbar from '../component/navbar';
import {BACKEND} from '../libs/constants';

const page = () => {

    const [room,setroom]=useState("");
    const [password,setpassword]=useState("")
    const [data,setDatas]=useState([]);
    const [found,setfound]=useState("Not found")
    const roomdetail=useRef(null);
    const croom=useRef("");
    const router=useRouter()
    const {data:session}=useSession();

 
        
useEffect(()=>{
    const createroom = async()=>{
          const roomlist= await fetch(`${BACKEND}/api/roomlist`,{cache:'no-store'});      
          const result = await roomlist.json();
              if(roomlist.ok){
                  setDatas(result);
              }
      }
      createroom();
     
  },[room])
  



const execute = (e)=>{
    setroom(e.target.value)
    croom.current=e.target.value;
    
    let flag=false;
    for(let i=0;i<data.length;i++){

        if(croom.current==data[i].name){
            roomdetail.current=data[i];
          flag=true;
        }
    }

    console.log(room,data,flag,found,croom);

    if(flag && croom.current.length>0 ){
        setfound("found")
    }
    else{
        setfound("Not found")
        roomdetail.current=null;
       
    }        
}

const run =(e)=>{

  
   const navigate=()=>{
        router.push('/main?room='+room);
   }

   if(password==roomdetail?.current?.password && found=="found"){
        axios.post("/api/adduser",{username:session?.user.email,room:roomdetail?.current?.name})
        .then(navigate)
        .catch(()=>console.log("not done"))

   }

}



  return (
    <div>


              <Navbar/>
                        
                  <div className='flex justify-center h-screen items-center'>

                  <div className='border-solid border-2 border-black w-auto p-4'>
                      
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                          
                          <h2 className=" rounded border-solid border-2 border-black bg-black  mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            JOIN ROOM
                          </h2>
                        </div>  

                        <div>
                          <label htmlFor="email" className="mt-1 block text-m font-medium leading-6 text-black">
                            Roomname
                          </label>
                          <div className="mt-2">
                          <input
                                  
                                  name="email"
                                  type="text"
                                  onChange={execute}
                                  style={{width:'60vw'}}
                                  required
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                          </div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6" style={{color:(found=="found")?'green':'red'}}>
                              {found} 
                          </label>
                        </div>


                        <div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block  text-m font-medium leading-6 text-black mt-4">
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                          <input
                                    type="text"
                                    onChange={(e)=>setpassword(e.target.value)}
                                    required
                                    style={{width:'60vw'}}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={run}
                            className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-white text-black hover:bg-black hover:text-white mt-5"
                          >
                            JOIN
                          </button>
                        </div>



                  </div>

                  </div>






       
    </div>
  )
}

export default page
