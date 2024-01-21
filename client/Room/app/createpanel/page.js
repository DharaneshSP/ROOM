
"use client"

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BACKEND } from '../libs/constants';
import toast from 'react-hot-toast';

const page = () => {

    const [roomname,setroomname]=useState("");
    const room=useRef("");
    const [password,setpassword]=useState("");
    const [data,setDatas]=useState("");
    const available = useRef("Not Available")

    
useEffect(()=>{
  const createroom = async()=>{
        const roomlist= await fetch(`${BACKEND}/api/roomlist`);      
        const result = await roomlist.json();
            console.log(result);
            if(roomlist.ok){
                setDatas(result);
            }
    }
    createroom();


},[roomname])

const create=()=>{

    const show=()=>{
     
      toast.success("Room created successfully");
      available.current="Not Available"
      
    }
    if(available.current=="Available" && password.length>0  ){
      axios.post("/api/createroom",{roomname,password})
      .then(show)
      .catch((e)=>toast.error("Please Try Again"))
    }
    else{
      toast.error("Enter Valid Room Name");
    }
}

function isalphanumeric(s) {
  var Regex = /^[a-zA-Z0-9]{0,13}$/;
  return Regex.test(s);
}

const execute = (e)=>{

  let s= e.target.value;

  if(isalphanumeric(s)){
      setroomname(e.target.value)
      room.current=e.target.value.trim();

        let flag=false;
        for(let i=0;i<data.length;i++){

            if(room.current==data[i].name){
              flag=true;
            }
        }

    if(!flag && room.current.length!=0 ){
      available.current="Available"
    }
    else{
      available.current="Not Available"
    }
  }

}

  return (
    <div>

        <div className='border border-3 border-black border-solid p-3' >
            <div className='flex items-center'>
                  <a className=' border-2 border-black border-solid p-3 px-5 bg-black text-[#E384FF] '>
                          ROOM
                  </a>
            </div>
          </div>
     
     <div className='fixed left-0 right-0 top-3  flex justify-center h-full items-center '>

      <div className='border-solid border-2 border-black w-auto p-10'>
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h2 className=" rounded border-solid border-2 border-black bg-black  mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-[#E384FF]">
                CREATE ROOM
              </h2>
            </div>  

            <div>
              
              <div className="mt-2">
                <input
                 
                 
                  type="text"
                  value={roomname}
                  onChange={execute}
                  required
                  placeholder='RoomName'
                  style={{width:'60vw'}}
                  password="RoomName"
                  className="rounded w-full text-black mt-4 text-white bg-[black] focus:outline-none"
                />
              </div>
              <label htmlFor="email" className="block text-sm font-medium leading-6" style={{color:(available.current=="Available")?'green':'red'}}>
                   { (roomname.length>0) ?available.current:"‎"}
              </label>
            </div>


            <div>
              <div className="flex items-center justify-between">
                {/* <label htmlFor="password" className="block  text-m font-medium leading-6 text-black mt-4">
                  Password
                </label> */}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e)=>setpassword(e.target.value)}
                  required
                  style={{width:'60vw'}}
                  placeholder='Password'
                  className="rounded text-white bg-[black]"
                />
              </div>
            </div>

            <div>
              <button
                onClick={create}
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-[#E384FF] text-black hover:bg-black hover:text-white mt-5"
              >
                CREATE
              </button>
            </div>
      </div>
     </div>
    </div>
  )
}

export default page
