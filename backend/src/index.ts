import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tranferRouter from "./router/tranfer-router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", tranferRouter);

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`));