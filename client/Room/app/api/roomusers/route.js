import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request){

    const body= await request.json();
    const {userId,roomname}= body;


    const exist = await prisma.room.findUnique({
        where:{
            name:roomname
        }
    })


    const user= await prisma.roomuser.findMany({
       where:{
            userId:userId,
            roomId:exist.id
       }
    })

   

    if(user.length>0){

        console.log("granted");
        return  NextResponse.json({done:"done"},{status:200});
    }
    else{
        throw new Error("User has no access");
    }

    


}