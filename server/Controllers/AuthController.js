
const User = require('../models/User');
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

;

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Send OTP Email
const sendOtpEmail = async (email, otp) => {
  return transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2>
           <p>This OTP will expire in ${process.env.OTP_EXPIRE_MIN} minutes.</p>`,
  });
};

//---------------------LOGIN ---------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password'); // ensure password is selectable
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create JWT payload (keep only non-sensitive fields)
    const payload = {
      id: user._id,
      email: user.email,
      // add other non-sensitive claims if needed (e.g., role)
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Remove sensitive fields before sending user object
    const userSafe = user.toObject();
    delete userSafe.password;

    return res.json({
      message: 'Login successful',
      token,
      user: userSafe,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ------------------ SIGNUP WITH OTP ------------------

const signup = async (req, res) => {
  try {
    const { name, email, password ,fatherName,contact,dob} = req.body;
    
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ error: "Email already registered" });

   
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed, isVerified: false ,fatherName,contact,dob});
    await user.save();

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * process.env.OTP_EXPIRE_MIN);

    await Otp.deleteMany({ email });
    await new Otp({ email, otp, expiresAt }).save();

    await sendOtpEmail(email, otp);

    res.json({ message: "Signup successful. OTP sent to email.", email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ VERIFY OTP (SIGNUP) ------------------

 const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    

    const otpDoc = await Otp.findOne({ email, otp });
    
    if (!otpDoc) return res.status(400).json({ error: "Invalid OTP" });

    if (otpDoc.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteMany({ email });

    res.json({ message: "Signup OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ FORGOT PASSWORD: SEND OTP ------------------

 const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * process.env.OTP_EXPIRE_MIN);

    await Otp.deleteMany({ email });
    await new Otp({ email, otp, expiresAt }).save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent for password reset" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ VERIFY OTP (FORGOT PASSWORD) ------------------

 const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await Otp.findOne({ email, otp });
    
    if (!otpDoc) return res.status(400).json({ error: "Invalid OTP" });

    if (otpDoc.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    res.json({ message: "OTP verified. You can reset password now." });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ RESET PASSWORD ------------------

 const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email }, { password: hashed });
    await Otp.deleteMany({ email });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//----------------fetch user data--------------------------
const userData = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "Dashboard data fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//----------------------------update user info-----------------------
const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, fatherName, contact, dob } = req.body;
    

    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { name, fatherName, contact, dob },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {forgotPassword, resetPassword, signup, verifyForgotOtp, verifySignupOtp ,login,userData,updateUser};
