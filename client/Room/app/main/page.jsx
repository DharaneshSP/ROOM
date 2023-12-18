"use client"

import { useSession} from 'next-auth/react'
import React from 'react'
import { useState,useEffect} from 'react';
import { io } from 'socket.io-client'; 
import Textinput from '@/app/component/textinput';
import Chathead from '@/app/component/chathead';
import ChatArea from '@/app/component/chatArea';
import { useSocketStore } from '../store/states';
import { useRoomStore } from '../store/states';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BACKEND } from '../libs/constants';
import { SOCKET_SERVER } from '../libs/constants';



const page = () => {

    const {data:session} = useSession();
    const searchparams= useSearchParams();
    const [datas,setDatas] = useState([]);
    const {socket,setSocket} = useSocketStore();
    const {currentroom,setCurrentroom} = useRoomStore();
    const [room,setRoom]= useState(searchparams.get("room"));
   


     
const handleJoinRoom = () => {
  
  const execute1=()=>{
    
    if (socket) {
        socket.emit('joinRoom', {username:session?.user.email,roomname:room});
        setCurrentroom(room)
    }
  }
  
    axios.post("/api/joinroom",{username:session?.user.email,room:room})
    .then(execute1)
    .catch((err)=>alert("error occured"))
    
};



useEffect(() => {

    const newSocket= io.connect("http://localhost:8000");
    console.log(SOCKET_SERVER);
    async function getData(croom){
        const alldata= await fetch(`http://localhost:3000/api/allchat/${croom}`);
        const result = await alldata.json();
            if(alldata.ok){
                setDatas(result);
            }
           
    }

  newSocket.on('connect', () => {
    console.log('Socket connected:', newSocket);
  });

  setSocket(newSocket)

  newSocket.on('message', (msg,room) => {
      console.log("message received",msg,room);
      getData(msg.currentroom);
  });

  return () => {
      newSocket.disconnect();
  };

},[]);



useEffect(()=>{

      async function getData(currentroom){

          const alldata= await fetch(`${BACKEND}/api/allchat/${currentroom}`);      
          const result = await alldata.json();
              if(alldata.ok){
                  setDatas(result);
              }
        }

      if(currentroom?.length>0 ){
        getData(currentroom);
      };

},[currentroom])


useEffect(()=>{

  
function checkpermission(session){
  
        const throwerror=(err)=>{
            throw new Error("User has no access")  
        }
  
          axios.post('/api/roomusers',{userId:session?.user.email,roomname:searchparams.get("room")})
          .then(handleJoinRoom)
          .catch(throwerror);
        }

  if(socket && session){
    checkpermission(session);
  }

  return ()=>{
    setCurrentroom("");
  }

},[socket,session])



useEffect(()=>{

  const area=document.getElementById("chatarea")
  setTimeout(()=>{
    console.log("fn called");
    area.scrollTo(0,area.scrollHeight);
  },0);

},[datas])


  return (
    <div  className='h-screen'>
           <div className='display-grid h-screen' >
            <div className='border-b-2 border-black border-solid flex justify-around items-center' >
            <div>
                <Chathead  socket={socket} currentroom={currentroom} setCurrentroom={setCurrentroom} room={room}/>
            </div>
            
              <div></div>
              <div></div>
              <div></div>
              <div></div>
    
            <div className='flex gap-1'>
                  <a href='/' className='text-black border-black border-2 px-2 hover:bg-black  hover:text-white '>
                      Home
                  </a>
                  <a href='/dashboard' className='text-black border-black border-2 px-2 hover:bg-black  hover:text-white '>
                    Change Room
                  </a>
            </div>
            </div>
            <div id='chatarea' className='overflow-auto' >
                 <ChatArea  socket={socket} datas={datas} currentroom={currentroom}/>
            </div>
             
            <div className='p-5'> 
                <Textinput socket={socket} currentroom={currentroom}/>
            </div>
        </div>
    </div>
  )
}



export default page;
