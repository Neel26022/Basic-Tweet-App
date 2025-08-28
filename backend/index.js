import express from "express";
import dotenv from "dotenv";
import router from "./src/api/index.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000; // fallback if .env is missing

// Middleware to parse JSON
app.use(express.json());
app.use('/api', router)
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
