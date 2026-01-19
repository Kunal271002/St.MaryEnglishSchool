import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, dob, contact, standard, address } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // REQUIRED for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Office - St. Mary English School" <${process.env.SMTP_USER}>`,
      to: "info@stmaryenglishschool.ac.in",
      subject: "New Admission Enquiry",
      html: `
        <h3>New Admission Form Submission</h3>
        <p><b>Full Name:</b> ${fullName}</p>
        <p><b>Date of Birth:</b> ${dob}</p>
        <p><b>Contact Number:</b> ${contact}</p>
        <p><b>Standard:</b> ${standard}</p>
        <p><b>Permanent Address:</b><br>${address}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({ success: false, message: "Email failed" });
  }
}
