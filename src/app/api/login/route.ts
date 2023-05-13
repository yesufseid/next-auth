import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { signJwtAccessToken } from '../../../lib/jwt';
const prisma = new PrismaClient()



interface Reaquestbody{
  username:string;
  password:string;
}

export async function POST(request: Request) {

 const body:Reaquestbody=await request.json()
 console.log(body);
 
 const user=await prisma.user.findFirst({
  where:{
    email:body.username,
  }
 })





 if(user && (await bcrypt.compare(body.password,user.password)) ){
  const {password,...userWithoutpass}=user;
  const accessToken=signJwtAccessToken(userWithoutpass);
  const result={
    ...userWithoutpass,
    accessToken
  }
  return new Response(JSON.stringify(result))
 }else return new Response(JSON.stringify(null))
}

