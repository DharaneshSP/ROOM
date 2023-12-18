import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request){

    const roomlist= await prisma.room.findMany({
        select:{
            name:true,
            password:true
        }
    })

    const response = NextResponse.next();



    return NextResponse.json(roomlist,{status:'200'},{Headers:'cache-no'});


}