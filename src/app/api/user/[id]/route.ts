import { PrismaClient } from '@prisma/client'
import { verifyjwt } from '../../../../lib/jwt'
const prisma = new PrismaClient()

export async function GET( request:Request,{ params }: { params: { id:number } }) {
  const accessToken=request.headers.get("authorization")
  if (!accessToken || !verifyjwt(accessToken)) {
    return new Response(JSON.stringify({
      error:"unauthorized"      
    }),
    {
      status:401
    })
  }
    const posts=await prisma.post.findMany({
        where:{authorId:+params.id},
        include:{
          author:{
            select:{
              email:true,
              name:true
            }
          }
        }
    })


    return new Response(JSON.stringify(posts))
  }