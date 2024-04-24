import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import connectToDB from "./utils/db";
import userRouter from "./routers/user.router";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  connectToDB();
});
