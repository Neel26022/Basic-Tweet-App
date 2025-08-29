import { Router } from "express";
import { registerSchema } from "../validation/user.js";
import bcrypt from 'bcrypt'
import prisma from "../utils/prisma.js";

const registerRouter = Router()


registerRouter.post("/", async (req, res) => {

    console.log(req.body)

  const parseResult = registerSchema.safeParse(req.body);
    console.log(parseResult)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;
    return res.status(400).json({ errors });
  }

  const { fullName, email, password } = parseResult.data;

  try {

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ errors: { email: ["Email is already registered"] } });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Registration successful"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { general: "Server error" } });
  }
});

export default registerRouter;