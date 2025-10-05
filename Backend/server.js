require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employees");

const app = express();
app.use(
  cors({
    origin: ["https://verto-ase-six.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => res.json("Server Health is running"));
app.use("/api/employees", employeeRoutes);
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    } else {
      console.log("Test mode - server not listening");
    }
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
};

start();

module.exports = app;
