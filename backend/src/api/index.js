import { Router } from "express";
import userRouter from "./user.js";
import registerRouter from "./register.js";
import loginRouter from "./login.js";
const router = Router()

router.use('/register', registerRouter)
router.use('/login', loginRouter)

export default router