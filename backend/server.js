import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./database/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // for parsing application json from incoming requests
app.use(cookieParser()); // for parsing cookies from incoming requests
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port: ", PORT);
});

