import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    surname,
    studentName,
    fatherName,
    religion,
    dob,
    standard,
    contact,

    // fatherFullName,
    // fatherOccupation,

    // motherFullName,
    // motherOccupation,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Port 465 requires SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Office - St. Mary English School" <${process.env.SMTP_USER}>`,
      to: "info@stmaryenglishschool.ac.in",
      cc: [
        "kk.s67533@gmail.com",
        "mallikashah53@gmail.com"
      ],
      subject: "New Admission Enquiry",
      html: `
    <h2>New Admission Form Submission</h2>

    <h3>Student Details</h3>
    <p><b>Surname:</b> ${surname}</p>
    <p><b>Student Name:</b> ${studentName}</p>
    <p><b>Father's Name:</b> ${fatherName}</p>
    <p><b>Religion:</b> ${religion}</p>
    <p><b>Date of Birth:</b> ${dob}</p>
    <p><b>Standard Applied For:</b> ${standard}</p>
    <p><b>Contact Number:</b> ${contact}</p>

  `,
    });


    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
}
