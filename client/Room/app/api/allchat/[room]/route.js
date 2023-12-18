import prisma from "../../../libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request,{params}){

    const {room} = params;

    console.log("from get ",room);

    const allchat= await prisma.chat.findMany({

        where:{
            roomname:room,
        },

        select:{
            id:true,
            title:true,
            userId:true,
            roomname:true,
            createdAt:true,
            user:{
                select:{
                    name:true
                }
            }
        }
    });

    //console.log(allchat)


    return NextResponse.json(allchat);
    
}