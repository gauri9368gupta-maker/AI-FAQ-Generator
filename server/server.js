const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const faqRoutes = require("./router/faqRoutes");
// Use Routes
app.use("/api/faq", faqRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 AI FAQ Generator Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});