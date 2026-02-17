import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mt-10">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Hi, I'm <span className="text-indigo-600">Dinesh Vishwakarma</span>
          </h1>

          <p className="text-lg text-gray-600">
            I'm a Full Stack Developer passionate about creating modern, fast,  
            and user-friendly web applications.  
            I build projects using **React, Node.js, Express & MongoDB**.
          </p>

          <div className="flex space-x-4 mt-6">
            <Link
              to="/about"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              About Me
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Image / Illustration */}
        {/* <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/full-stack-developer-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--working-programmer-coding-frontend-backend-pack-science-technology-illustrations-7846543.png"
            alt="Developer Illustration"
            className="w-80 md:w-[420px] drop-shadow-lg"
          />
        </div> */}
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 md:px-20">

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">HTML</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">CSS</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">JavaScript</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">React.js</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">Node.js</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">Express.js</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">MongoDB</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition">
            <p className="font-semibold text-lg text-indigo-600">TailwindCSS</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8 px-10 md:px-20">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">Todo App</h3>
            <p className="text-gray-600 mt-2">
              A simple and powerful todo manager built with React & localStorage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">Quiz App</h3>
            <p className="text-gray-600 mt-2">
              A quiz platform with scoring, timer, and category selection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">Employee Management</h3>
            <p className="text-gray-600 mt-2">
              Admin panel for managing employees, roles, and departments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-600">E-Commerce Website</h3>
            <p className="text-gray-600 mt-2">
              Shopping site with cart, product filtering, and secure checkout.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
