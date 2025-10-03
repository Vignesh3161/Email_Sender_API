import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendEmail } from "./server.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome email API
app.post("/welcome", async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ success: false, error: "Email address is required" });
  }

  try {
    await sendEmail(
      to,
      "🎉 Welcome to Student App!",
      `Hello ${to},\n\nWelcome aboard! We're excited to have you with us. 🚀\n\nCheers,\nStudent Project Team`
    );

    res.json({ success: true, message: "Welcome email sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("✅ SendGrid backend server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
