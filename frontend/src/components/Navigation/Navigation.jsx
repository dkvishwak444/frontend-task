import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useEffect } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    // if(name[0])
    //   {
    //    setName(name[0]);
    // }
    
    if (token) {
      setLogin(true);
    }
  }, [setLogin]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">Dinesh</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer"><NavLink to="/">Home</NavLink></li>
          <li className="hover:text-blue-600 cursor-pointer"><NavLink to="/about">About</NavLink></li>
          <li className="hover:text-blue-600 cursor-pointer">Services</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          <li className="hover:text-blue-600 cursor-pointer">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>

        {/* Login Button */}
        {isLogin ? (
          <div className="hidden md:block mx-5" onClick={handleLogOut}>
            <Avatar sx={{ bgcolor: "blue" }}>{name}</Avatar>
          </div>
        ) : (
          <div className="hidden md:block rounded-full">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 "
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <li className="list-none text-gray-700 hover:text-blue-600 cursor-pointer">
          </li>
          <li className="list-none text-gray-700 hover:text-blue-600 cursor-pointer">
           <NavLink to="/about">About</NavLink>
          </li>
          <li className="list-none text-gray-700 hover:text-blue-600 cursor-pointer">
            Services
          </li>
          <li className="list-none text-gray-700 hover:text-blue-600 cursor-pointer">
            Contact
          </li>
          <li className="list-none text-gray-700 hover:text-blue-600 cursor-pointer">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          <button
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            onClick={isLogin ? handleLogOut : handleLogin}
          >
            {isLogin ? "logOut" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
}
