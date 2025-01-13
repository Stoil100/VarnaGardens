import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(req: Request) {
  try {
    const { values,id,status } = await req.json();
    const {name, email, phone, address, option, plan, services} = values;
    
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_MAIL_HOST,
        port: process.env.NEXT_PUBLIC_MAIL_PORT, // Typically 587 for TLS
        secure: process.env.NODE_ENV !== "development",
        auth: {
            user: process.env.NEXT_PUBLIC_MAIL_USER, // Your email address
            pass: process.env.NEXT_PUBLIC_MAIL_PASS, // Your email password or app-specific password
        },
    } as SMTPTransport.Options);

    function getStatusColor(status: string): string {
        return {
          pending: "#FACC15", // Yellow (Hex for bg-yellow-400)
          confirmed: "#22C55E", // Green (Hex for bg-green)
          declined: "#EF4444", // Red (Hex for bg-red-500)
          fulfilled: "#3B82F6", // Blue (Hex for bg-blue-500)
          expired: "#6B7280", // Gray (Hex for bg-gray-500)
          postponed: "#FB923C", // Orange (Hex for bg-orange-400)
        }[status] || "#D1D5DB"; // Default Gray (Hex for bg-gray-300)
      }

      const statusColor = getStatusColor(status);
    // HTML email template
    const emailHtml =  `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.8;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4caf50;
          color: #fff;
          text-align: center;
          padding: 20px;
        }
        .header img {
          max-width: 120px;
          margin-bottom: 10px;
        }
        .header h1 {
          font-size: 26px;
          margin: 0;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .status {
          font-size: 18px;
          font-weight: bold;
          margin: 10px 0;
          color: ${statusColor}; /* Dynamic color */
        }
        .content ul, .content ol {
          list-style-type: disc;
          padding-left: 40px;
          margin: 10px 0;
        }
        .content ul li, .content ol li {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .footer {
          background-color: #4caf50;
          color: #fff;
          text-align: center;
          padding: 15px;
          font-size: 16px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://varnagardens.com/logoText.png" alt="Varna Gardens Logo" />
          <h1>Thank You for Choosing Varna Gardens! 🌿</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}</h2>
          <h4>We’re excited to bring a touch of green to your life! Here’s a summary of your booking:</h4>
          <h3>Booking Details</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telephone:</strong> ${phone}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Booking Option:</strong> ${option}</li>
            ${
              option === "Subscription"
                ? `<li><strong>Plan Chosen:</strong> ${plan}</li>`
                : `<li><strong>Selected Services:</strong></li>
                   <ol>
                     ${services.map((service: string) => `<li>${service}</li>`).join("")}
                   </ol>`
            }
          </ul>
          <h3>Additional Information</h3>
          <p><strong>Booking ID:</strong> ${id}</p>
          <p class="status">Order Status: ${status}</p>
          <p>Our expert gardening team is looking forward to providing exceptional service at your scheduled time.</p>
          <p>Need help? Reach out to us at <a href="mailto:varnagardens@gmail.com">varnagardens@gmail.com</a>.</p>
        </div>
        <div class="footer">
          🌸 Stay Green, Stay Happy!<br />
          <strong>The Varna Gardens Team</strong>
        </div>
      </div>
    </body>
    </html>`;

    // Email options
    const mailOptions = {
      from: '"Varna Gardens" <varnagardens@gmail.com>',
      to: email,
      subject: "Your Garden’s Makeover is on the Way!",
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
