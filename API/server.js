// use express module to create websever
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
// create constant named app represent sever express in the application
import { productRouter, categoryRouter, commentRouter } from "./routes/index.js";
const app = express();

// Set up CORS headers - why
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json({ limit: "30mb" }));
app.use(cors());
dotenv.config();

// active router for client request
app.get("/", (req, res) => {
  res.send('');
});

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/comment", commentRouter);

const Port = process.env.PORT;
// listen to server
app.listen(Port, async () => {
  connectDB();

  console.log(`Sever is runnning on port ${Port}`);
});
