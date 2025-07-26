import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import examRoutes from "./routes/examRoutes.js";
import connectDb from './db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDb();  // Note: Added await here

app.use("/api", examRoutes);  // Changed from "/api/auth" to "/api"

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});