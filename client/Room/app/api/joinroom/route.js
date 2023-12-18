
import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'



export async function POST(request){


    const body = await request.json();

    const {username,room}=body;

    const existroom = await prisma.room.findUnique({
        where:{
            name:room
        }
    });
    

    if(!existroom){
        // creating new room with a initial user 
        const newroom= await prisma.room.create({
            data:{
                name:room,
                users:{
                    create:[
                      {
                        user:{
                            connect:{
                                email:username,
                            }
                        }
                      }
    
                    ]
                }
            }
        })

        console.log("new room created and user is assigned to it")
       
    }
    
    else{
       
        console.log(existroom.id);
        const userexistinroom = await prisma.roomuser.findMany({
            where:{
                userId:username,
                roomId:existroom.id
            }
        })
           

    if(!userexistinroom){
    
            console.log("no permission");
        };

        console.log("user already in room");

    }
    

    return NextResponse.json({done:"done"},{status:200});

}

