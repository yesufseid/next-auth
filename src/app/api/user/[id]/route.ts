import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET( request:Request,{ params }: { params: { id:number } }) {
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