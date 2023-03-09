import {PrismaClient} from "@prisma/client"
import express from "express"

const prisma = new PrismaClient()
const app = express();

app.use(express.json())

app.get("/users", async(req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post("/users/new",async (req, res) => {
    const {email, name } = req.body
    const created_user = await prisma.user.create({
        data: {
            email,
            name
        }
    })
    res.json(created_user)
})

app.listen(3000, () => console.log("Listening on port 3000"))