import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const listUsers = async() => {
    return prisma.user.findMany({
        include: {posts: true, profile: true}
    })
}

/**
* Creates a new user
*
* @param name: string
* @param email: string
*/
export const newUser = async(name: string | null, email: string) => {
    return await prisma.user.create({
        data: {
            name,
            email
        }
    })
}

/**
 * Searches for a user by their ID
 * 
 * @param userID: Number
 */
export const findUserbyID = async(userID: number) => {
    return await prisma.user.findUnique({
        where: {id: userID},
        include: {posts: true, profile: true}
    })
}