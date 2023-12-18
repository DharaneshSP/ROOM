


import NextAuth from 'next-auth/next'
import prisma from '../../../libs/prismadb'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
//import {hash,compare} from 'bcrypt'
//import { encodeBase64,decodeBase64 } from 'bcryptjs-react'
import bcrypt from 'bcrypt';


export const authOptions = {

    adapter : PrismaAdapter(prisma),
    providers : [
        // GithubProvider({
        //     clientId:process.env.GITHUB_ID,
        //     clientSecret : process.env.GITHUB_SECRET
        // }),
         
        // GoogleProvider({
        //     clientId:process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),

        CredentialsProvider({
            name:"credentials",
            credentials:{
                email: {label:"Email",type:"text",placeholder:"a@gmail.com"},
                password:{label:"Password",type:"text"},
                username: {label:"Username", type:"text",placeholder:"John"}
            },

            async authorize(credentials){
                
                if(!credentials.email || !credentials.password){
                     throw new Error('Missing Field');
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if(!user || !user?.password){
                    throw new Error('No user Found')
                }

                const passwordmatch = await bcrypt.compare(credentials.password,user.password)

                if(!passwordmatch){
                    throw new Error('Incorrect Password')
                }


                return user;

            },
        }),
    ],

    secret : process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    debug:process.env.NODE_ENV === "development",

} 


const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}

