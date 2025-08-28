import { Router } from "express";
import  upload  from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import prisma from "../utils/prisma.js";

const tweetRouter = Router();


tweetRouter.post("/", authMiddleware, upload.single("image"),async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Image is required ❌" });
      }

      // Image path
      const imagePath = `/uploads/${req.file.filename}`;

      
      const newTweet = await prisma.tweet.create({
        data: {
          title,
          content: description,
          imageUrl: imagePath,
          userId: req.user.id, 
        },
      });
      

      return res.status(201).json({
        message: "Tweet created successfully ✅",
        tweet: {
          title,
          description,
          imageUrl: imagePath,
          id: newTweet.id
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create tweet ❌" });
    }
  }
);

export default tweetRouter;
