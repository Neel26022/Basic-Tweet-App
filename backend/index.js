import express from "express";
import dotenv from "dotenv";
import router from "./src/api/index.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000; // fallback if .env is missing

// Middleware to parse JSON
app.use(express.json());
app.use('/api', router)
// Start server
app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
