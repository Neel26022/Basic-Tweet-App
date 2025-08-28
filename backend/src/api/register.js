import { Router } from "express";
import { registerSchema } from "../validation/user.js";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";


const registerRouter = Router()

const prisma = new PrismaClient()

registerRouter.post('/', async (req, res) => {
    const { name, password, email} = req.body

    const parseResult = registerSchema.safeParse({name, password, email})
    
    if(!parseResult) {
        return res.status(400).json({
            erorrs: parseResult.erorr.erorrs.map(err => ({
                path: err.path[0],
                message: err.message
            }))
        })
    }

    const userData = parseResult.data;
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await prisma.user.create({
            data: { 
                name, 
                email,
                password: hashedPassword 
            }
        })

        res.status(200).json({
        message: "User registered successfully ✅",
        user: { name, email }, 
        })
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

export default registerRouter;