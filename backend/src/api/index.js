import { Router } from "express";
import registerRouter from "./register.js";
import loginRouter from "./login.js";
import tweetRouter from "./tweet.js";
const router = Router()

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/tweet', tweetRouter)

export default router