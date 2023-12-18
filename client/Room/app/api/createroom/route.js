
import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'


export async function POST(request){

    const body = await request.json();
    const {roomname,password}=body;

    const existroom = await prisma.room.findUnique({
        where:{
            name:roomname
        }
    });
    

    if(!existroom){
        
        const newroom= await prisma.room.create({
            data:{
                name:roomname,
                password:password,
            }
        })

        return NextResponse.json({newroom:newroom},{status:200})

    }
    else{
    throw new Error("Room already exist")
    }


}