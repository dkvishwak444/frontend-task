import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 mt-15">
      <div className="max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          About Me
        </h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            Hi, my name is <span className="font-semibold">Dinesh Vishwakarma</span>. 
            I am a passionate and dedicated full-stack developer with a strong interest 
            in building modern, scalable, and user-friendly web applications.
          </p>

          <p>
            I completed my <span className="font-semibold">Bachelor of Computer Applications (BCA)</span> 
            from <span className="font-semibold">Veer Bahadur Singh Purvanchal University, Jaunpur</span>.
          </p>

          <p>
            Later, I pursued my <span className="font-semibold">Master of Computer Applications (MCA)</span> 
            from <span className="font-semibold">Sandip University, Nashik</span>, which strengthened my 
            technical knowledge and practical development skills.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">Projects I Have Built</h2>

          <ul className="list-disc list-inside space-y-2">
            <li>✅ Todo App</li>
            <li>✅ Quiz Application</li>
            <li>✅ Employee Management System</li>
            <li>✅ E-commerce Website</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">Contact Information</h2>

          <p>Email: <span className="font-medium">dkvishwak44@gmail.com</span></p>
          <p>Phone: <span className="font-medium">6390830330</span></p>

          <p className="pt-6">
            I am always excited to work on new challenges, collaborations, and 
            innovative ideas. Let’s connect and build something meaningful together!
          </p>
        </div>
      </div>
    </div>
  );
}
