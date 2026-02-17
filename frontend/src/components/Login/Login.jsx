import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {Button, TextField} from '@mui/material'
import { toast } from "react-toastify";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email:form.email,
        password:form.password
      });
      if (res.data) {
       toast.success("login successfully");
        navigate('/dashboard');
        window.location.reload();
      } else {
        toast.error("Invalid Credentials");
      }
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('name',res.data.user.name);
      localStorage.setItem("email",res.data.user.email);
      
    } catch (error) {
      toast.error("Error logging in");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md mx-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <div className="space-y-5">
          <TextField
          sx={{
            mb:2,
            outline:"none",
            width:"full",
            borderRadius:10
          }}
            id="email" 
            name="email"
            label='email'
            value={form.email}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
          />

          <TextField
             sx={{
              mb:2,
              height:1
             }}
            name="password"
            type="password"
             label="Password"
             required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
          />

          <Button
           sx={{bgcolor:'blue', color:'white',py:1}}
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </Button>

          <div className="flex justify-between mt-2 text-sm">
            <NavLink to="/forgot-password" className="text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </NavLink>

            <NavLink to='/sign-up' className="text-green-600 hover:underline cursor-pointer">
              Create Account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
