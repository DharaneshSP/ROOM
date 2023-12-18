
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
    

        const userexistinroom = await prisma.roomuser.findMany({
            where:{
                userId:username,
                roomId:existroom.id
            }
        })
           

    if(userexistinroom.length==0){

        const modifiedroom= await prisma.room.update({
    
            where:{
                name:room,
            },
            data:{
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
    
        console.log("Assigned new user");
        }
        else{
            console.log("User already Joined in room");
        }
    }
    

    return NextResponse.json({done:"done"},{status:200});

}

