
import React from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';


const chatArea = ({socket,datas,currentroom}) => {

    const {data:session} = useSession();
    
    const deletechat=(id)=>{

            const execute=()=>{
        
                if(socket){
                    socket.emit('message',{
                    message:"",
                    username:"",
                    currentroom:currentroom
                    },currentroom)
                }
        
            }
  
    axios.delete(`/api/deletechat/${id}`)
    .then(execute)
    .catch((err)=>console.log(err));
  
  }



  const isSame=(item)=>{
      return item?.userId==session?.user.email;
  }
  

  

  return (
    <div>
      
      
 
       {datas.map((item)=>
            
              <div className=" rounded border-1 border-green-500 border-solid flex items-center p-2"  style={{justifyContent:(item?.userId!=session?.user.email)?'start':'end',color:(isSame(item))?'white':"white"}} > 
        
                    <div className='flex-col rounded shadow-lg' style={{border:'2px solid black',maxWidth:'45%',overflowWrap:'break-word',padding:'1vh 1.5vh 1.5vh 1.5vh',position:"relative",margin:'1.5vh',backgroundColor:(isSame(item))?'#191825':'#191825'}}>
                        <div style={{display:(item?.userId!=session?.user.email)?'content':'none'}} className=' text-lg py-0  rounded border border-2 border-black border-solid px-3 bg-black text-[#E384FF]' >{item?.user.name}</div>
                        <div className='font-light text-white py-2 '>{item.title}</div>
                    </div>
                    
              </div>
       
       )}

    </div>
  )
}



export default chatArea
