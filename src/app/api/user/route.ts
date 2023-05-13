import { verifyjwt } from '../../../lib/jwt'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()


interface Reaquestbody{
    name:string,
    email:string;
    password:string;
  }



export async function POST(request: Request) {
  const accessToken=request.headers.get("authorization")
  if (!accessToken || !verifyjwt(accessToken)) {
    return new Response(JSON.stringify({
      error:"unauthorized"      
    }),
    {
      status:401
    })
  }
   const body:Reaquestbody=await request.json()
 const user=await prisma.user.create({
    data: {
        name:body.name,
        email:body.email,
        password:await bcrypt.hash(body.password,10)
      },
 })
const {password,...result}=user;
return new Response(JSON.stringify(result))

}