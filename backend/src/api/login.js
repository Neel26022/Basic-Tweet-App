import { Router } from "express";
import { loginSchema } from "../validation/user";
import { use } from "react";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const loginRouter = Router()

const prisma = new PrismaClient()

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body()

    const parseResult = loginSchema.safeParse({email, password})

    if(!parseResult.success) {
        res.status(400).json({
            errors: parseResult.error.errors.map(err => ({
                path: err[0],
                message: err.message
            }))
        })
    }

    try {

        const user = prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(401).json({
                error: "Invalid email or password ❌"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password ❌" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET,             
            { expiresIn: "1h" }
        )
        
        return res.status(200).json({
            message: "Login successful ✅",
            token
        })
    } catch (e) {
        console.log("login error",e)
        return res.status(500).json({ error: "Something went wrong on login" });
    }
})  

export default loginRouter