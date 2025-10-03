import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Set the SendGrid API Key from environment variables
// This is the secure and recommended practice!
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends a welcome email using SendGrid.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} name - The recipient's name for a personalized message.
 */
export const sendWelcomeEmail = async (to, subject, name) => {
  const messageBody = `
    <h1>Hello ${name},</h1>
    <p>We're thrilled to welcome you to the Student App community! 🎉</p>
    <p>Your account is all set up. You can start exploring immediately.</p>
    <br>
    <p>If you have any questions, feel free to reply to this email.</p>
    <p>Cheers,</p>
    <b>The Student Project Team</b>
    <hr>
    <small>This is a transactional email and cannot be unsubscribed from.</small>
  `;

  const msg = {
    to: to,
    from: process.env.SENDGRID_VERIFIED_SENDER, // Must be a verified sender in SendGrid!
    subject: subject,
    // HTML is recommended for rich-text emails
    html: messageBody,
    // Plain text version for fallback
    text: `Hello ${name},\nWelcome aboard! We're excited to have you with us. You can start exploring immediately. Cheers, The Student Project Team`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Welcome Email sent successfully to ${to}`);
  } catch (error) {
    // Log the full error response for better debugging
    console.error("Error sending email:", error.response?.body || error.message);
    // Re-throw the error so the Express route can return a 500 status
    throw new Error("Email service error: Could not send email.");
  }
};