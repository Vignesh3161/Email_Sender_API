import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey("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");

export const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to,
      from: "vigneshubi24@gmail.com",
      subject,
      text,
    };
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    throw new Error("Email could not be sent");
  }
};
