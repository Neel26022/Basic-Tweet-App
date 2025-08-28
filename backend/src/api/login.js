import { Router } from "express";
import { loginSchema } from "../validation/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const parseResult = loginSchema.safeParse({ email, password });

  if (!parseResult.success) {
    return res.status(400).json({
      errors: parseResult.error.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      })),
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password ❌" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful ✅",
      token,
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Something went wrong on login" });
  }
});

export default loginRouter;
