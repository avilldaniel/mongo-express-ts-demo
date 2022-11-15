import express, { Express, Request, Response } from "express";
import dontenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Post from "./models/Post";

dontenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    const allPosts = await Post.find();
    return res.status(200).json(allPosts);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

app.post("/post", async (req: Request, res: Response) => {
  try {
    const newPost = new Post({ ...req.body });
    const insertedPost = await newPost.save();
    return res.status(201).json(insertedPost);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const connect = async () => await mongoose.connect(process.env.MONGODB_URI!);
try {
  connect();
} catch (e) {
  console.error(e);
}
