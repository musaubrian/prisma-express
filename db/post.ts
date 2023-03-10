import { PrismaClient } from "@prisma/client"
import { findUserbyID } from "./user"

const prisma = new PrismaClient


export async function newPost(userID: number, title: string, content: string){
    const user = await findUserbyID(userID)

    return await prisma.post.create({
        data: {
            title,
            content,
            author: {connect: {email: user?.email}}
        }
    })
}

export async function allPosts(){
    return await prisma.post.findMany({
        include: {author: true}
    })
}