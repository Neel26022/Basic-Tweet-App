import express from "express";
import dotenv from "dotenv";
import router from "./src/api/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// **Enable CORS before routes**
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Parse JSON
app.use(express.json());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// API routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
