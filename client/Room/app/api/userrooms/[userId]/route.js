
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server'


export async function GET(request,{params}){

   
    const {userId}= params;
  
    const rooms= await prisma.roomuser.findMany({
        where:{
            userId:userId
        },

        
        select:{
            room:{
                select:{
                    name:true
                }
            }
        }

    })



    console.log(rooms)

    return NextResponse.json({"rooms":rooms})
} 
