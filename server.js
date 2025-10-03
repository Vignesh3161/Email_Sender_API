import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendWelcomeEmail } from "./email.js"; // Import the email function

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Welcome Email API Endpoint
app.post("/api/welcome", async (req, res) => {
  // Use destructuring to get email and name from the request body
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ success: false, error: "Both 'email' and 'name' are required." });
  }

  try {
    // Call the function to send the email
    await sendWelcomeEmail(
      email,
      "🎉 Welcome to Student App - Your Account is Ready!",
      name // Pass the name for personalization
    );

    res.json({ success: true, message: `Welcome email sent to ${email}!` });
  } catch (err) {
    // Catch and return the error from the email function
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check route for Render
app.get("/", (req, res) => {
  res.send("✅ SendGrid Email Service is running!");
});

// Start server
const PORT = process.env.PORT || 10000; // Use port 10000 as shown in your logs
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));