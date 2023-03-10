import express from "express";
import { allPosts, findPost, newPost } from "../db/post";
import { findUserbyID, listUsers, newUser } from "../db/user";
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await listUsers();
  res.json(users);
});

app.post("/users/new", async (req, res) => {
  const { name, email } = req.body;
  const user = await newUser(name, email);
  res.json(user);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const intID = parseInt(id);
  const result = await findUserbyID(intID);
  res.json(result);
});

app.get("/posts", async (req, res) => {
  const result = await allPosts();
  res.json(result);
});

app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await findPost(id);
  res.json(result);
});

app.post("/users/:id/posts/new", async (req, res) => {
  const userID = parseInt(req.params.id);
  const { title, content } = req.body;

  const result = await newPost(userID, title, content);

  res.json(result);
});

app.listen(3000, () => console.log("Listening on port 3000"));
