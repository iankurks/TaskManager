
// const nodemailer = require("nodemailer");
// module.exports = async (email, otp) => {
//     try {
//         // 1️⃣ Create a transporter for Gmail SMTP
//         console.log(process.env.EMAIL_USER);
//         console.log(process.env.EMAIL_PASS);

//         const transporter = nodemailer.createTransport({
//             // host: "smtp.srmuniv.edu.in",
//             service: "Gmail",
//             port: 587,
//             secure: false, // true if port 465
//             auth: {
//                 user: process.env.EMAIL_USER, // your Gmail
//                 pass: process.env.EMAIL_PASS, // Gmail App Password
//             },
//             // tls: {
//             //     rejectUnauthorized: false, // allows self-signed certs (some universities need this)
//             // },
//         });

//         // 2️⃣ Send the OTP email
//         const info = await transporter.sendMail({
//             from: `"Task Manager" <${process.env.EMAIL_USER}>`, // sender address
//             to: email, // recipient
//             subject: "Your Login OTP",
//             html: `
//         <h2>Login OTP</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes</p>
//       `,
//         });

//         console.log("OTP sent! Message ID:", info.messageId);
//         return info;
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         throw new Error("Failed to send OTP");
//     }
// };
