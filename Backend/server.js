require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
connectDB()
const app = express();
const PORT = 3000;
app.get("/", (res, req) => {
  res.send("Server Health is Running~");
});
app.listen(PORT, () => {
  console.log("Server is running");
});
