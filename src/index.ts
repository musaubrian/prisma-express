import express from "express"
import { findUserbyID, listUsers, newUser } from "../db/user";
const app = express();

app.use(express.json())

app.get("/users", async(req, res) => {
    const users = await listUsers()
    res.json(users)
})

app.post("/users/new", async(req, res) => {
    const {name, email} = req.body
    const user = await newUser(name, email)
    res.json(user)
})

app.get("/users/:id", async (req, res) => {
    const {id} = req.params
    const intID = parseInt(id)
    const result = await findUserbyID(intID)
    res.json(result)    
})
app.listen(3000, () => console.log("Listening on port 3000"))
