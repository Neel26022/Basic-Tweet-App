import { Router } from "express";
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import prisma from "../utils/prisma.js";

const tweetRouter = Router();

// CREATE TWEET
tweetRouter.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Image is required ❌" });
      }

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
          id: newTweet.id,
          title: newTweet.title,
          description: newTweet.content,
          imageUrl: newTweet.imageUrl,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create tweet ❌" });
    }
  }
);

// GET ALL TWEETS (OPTIONAL: only current user's tweets)
tweetRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        userId: true, 
        user: {       
          select: { id: true, name: true }
        }
      },
    });

    return res.status(200).json({ tweets, currentUserId: req.user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch tweets" });
  }
});


// UPDATE TWEET
tweetRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } });

      if (!tweet) return res.status(404).json({ error: "Tweet not found ❌" });
      if (tweet.userId !== req.user.id)
        return res.status(403).json({ error: "Unauthorized ❌" });

      const updatedData = {
        title: req.body.title ?? tweet.title,
        content: req.body.description ?? tweet.content,
      };

      if (req.file) {
        updatedData.imageUrl = `/uploads/${req.file.filename}`;
      }

      const updatedTweet = await prisma.tweet.update({
        where: { id: Number(id) },
        data: updatedData,
      });

      return res.status(200).json({
        message: "Tweet updated successfully ✅",
        tweet: updatedTweet,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update tweet ❌" });
    }
  }
);

// DELETE TWEET
tweetRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } });

    if (!tweet) return res.status(404).json({ error: "Tweet not found ❌" });
    if (tweet.userId !== req.user.id)
      return res.status(403).json({ error: "Unauthorized ❌" });

    await prisma.tweet.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "Tweet deleted successfully ✅" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete tweet ❌" });
  }
});

export default tweetRouter;
