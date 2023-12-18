
import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'


export async function POST(request){

    const body = await request.json();
    const {message,username,room}= body;
    const existroom = await prisma.room.findUnique({
        where:{
            name:room
        }
    });
     
    const newchat = await prisma.chat.create({
        data:{
            title:message,
            userId:username,
            roomname:room
        }
    })

    console.log(newchat);

    return NextResponse.json({});

}
