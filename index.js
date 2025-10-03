import express from "express";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();

const resend = new Resend("re_ZoHiPVdy_6PSThv9a4aKj5pEJMXepajXt");

// Parse JSON bodies
app.use(express.json());

// Route 1: Send Welcome Email (expects JSON with { "to": "email" })
app.post("/welcome-json", async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Email address is required in JSON body" });
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to,
      subject: "🎉 Welcome (JSON Route)!",
      text: `Hello ${to},\n\nThis email was sent using the JSON route.\n\n🚀 Cheers!`,
    });

    res.json({ success: true, message: "Email sent via JSON route!", data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route 2: Send Welcome Email (expects plain text body with just the email)
app.use(express.text());
app.post("/welcome-text", async (req, res) => {
  const to = req.body?.trim();

  if (!to) {
    return res.status(400).json({ error: "Email address is required in text body" });
  }

  try {
    const data = await resend.emails.send({
      from: "no-reply@yourdomain.com", // must be verified in Resend
      to,
      subject: "🎉 Welcome (Text Route)!",
      text: `Hello ${to},\n\nThis email was sent using the Text route.\n\n🚀 Cheers!`,
    });

    res.json({ success: true, message: "Email sent via Text route!", data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
