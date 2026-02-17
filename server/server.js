const express  = require('express');
const connectdb = require('./DB/db');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forgotPassword, resetPassword, signup, verifyForgotOtp, verifySignupOtp, login, userData, updateUser } = require('./Controllers/AuthController');
    

 

 

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

 //MongoDB connect
 connectdb();

// Routes
app.post('/api/auth/login',login)
app.post("/api/auth/signup", signup);
app.post("/api/auth/verify-signup-otp", verifySignupOtp);

app.post("/api/auth/forgot-password", forgotPassword);
app.post("/api/auth/verify-forgot-otp", verifyForgotOtp);
app.post("/api/auth/reset-password", resetPassword);
app.get('/api/user-data/:email',userData);
app.post('/api/update-user/:email',updateUser);

app.get("/", (req, res) => res.send("Server running"));

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
