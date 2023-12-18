
import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(request,{params}){

        const {id} = params;

        const chat = await prisma.chat.delete({
            where:{
                id:id
            }
        })

        return NextResponse.json({done:"done"},{status:200});
    
}