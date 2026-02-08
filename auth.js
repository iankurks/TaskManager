// // routes/auth.js
// const express = require("express");
// const connectDB = require("./db");
// const sendOtp = require("./sendOtp");

// const router = express.Router();

// // SEND OTP
// router.post("/send-otp", async (req, res) => {
//   const { email } = req.body;
//   const db = await connectDB();

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   await db.collection("users").updateOne(
//     { email },
//     {
//       $set: {
//         email,
//         otp,
//         otpExpires: Date.now() + 5 * 60 * 1000,
//       },
//     },
//     { upsert: true }
//   );

//   await sendOtp(email, otp);

//   res.json({ message: "OTP sent successfully" });
// });

// // VERIFY OTP
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   const db = await connectDB();

//   const user = await db.collection("users").findOne({ email });

//   if (
//     !user ||
//     user.otp !== otp ||
//     user.otpExpires < Date.now()
//   ) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   await db.collection("users").updateOne(
//     { email },
//     { $unset: { otp: "", otpExpires: "" } }
//   );

//   res.json({
//     message: "Login successful",
//     user: { email },
//   });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const connectDB = require("./db");

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // const hashedPassword = btoa(password)
    await db.collection("users").insertOne({ email, password: password, tasks:[] });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    console.log("user",user);
    
    // if (!user) return res.status(400).json({ message: "Invalid email or password" });
    // console.log("atob(password)",atob(password));
    console.log("user.password",user.password);
    
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = (password == user.password) ? true : false;

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // ✅ Without JWT, just return success
    res.json({ message: "Login successful", email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
