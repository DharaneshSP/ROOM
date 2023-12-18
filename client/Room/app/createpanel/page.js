
"use client"

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../component/navbar';
import { BACKEND } from '../libs/constants';

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
      console.log("created")
      alert("created");
      available.current=="Not Available"
    }
    if(available.current=="Available" && password.length>0  ){
      axios.post("/api/createroom",{roomname,password})
      .then(show)
      .catch((e)=>console.log("error found"))
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

      <Navbar/>
     <div className='flex justify-center h-screen items-center'>

      <div className='border-solid border-2 border-black w-auto p-4'>
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h2 className=" rounded border-solid border-2 border-black bg-black  mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                CREATE ROOM
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
                  value={roomname}
                  onChange={execute}
                  required
                  style={{width:'60vw'}}
                  password="RoomName"
                  className="rounded w-full text-black "
                />
              </div>
              <label htmlFor="email" className="block text-sm font-medium leading-6" style={{color:(available.current=="Available")?'green':'red'}}>
                   {available.current}
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
                  placeholder='Password'
                  className="rounded text-black"
                />
              </div>
            </div>

            <div>
              <button
                onClick={create}
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-white text-black hover:bg-black hover:text-white mt-5"
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
