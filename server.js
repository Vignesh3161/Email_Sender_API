import sgMail from "@sendgrid/mail";

// sgMail.setApiKey("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");
// sgMail.setApiKey("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");
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


