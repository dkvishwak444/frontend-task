import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const email = localStorage.getItem("email");

  async function fetchData() {
    try {
      const res = await axios.get(`${apiUrl}/api/user-data/${email}`);
      const data = res.data.user;

      setUserData(data);
      setUser(data);         
      setEditUser(data);     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // If data not loaded yet
  if (!user) return <h2 className="text-center mt-10">Loading...</h2>;

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const saveChanges = async  () => {
    setUser(editUser);
    setEditMode(false);
    console.log(editUser);
    const res = await axios.post(`${apiUrl}/api/update-user/${email}`,{
      name : editUser.name,
      contact:editUser.contact,
      fatherName : editUser.fatherName,
      dob:editUser.dob,

    })
    if(res.data){
      toast.success('save changes successfully')
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg p-8 rounded-2xl mx-5">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">User Dashboard</h2>

        <div className="grid md:grid-cols-2 gap-6 text-lg">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Father’s Name:</span> {user.fatherName}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Contact:</span> {user.contact}</p>
          <p><span className="font-semibold">Date of Birth:</span> {user.dob}</p>
        </div>

        <button
          onClick={() => setEditMode(true)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {editMode && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg mx-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded-lg"
                name="name"
                value={editUser.name}
                onChange={handleChange}
              />
              <input
                className="w-full p-2 border rounded-lg"
                name="fatherName"
                value={editUser.fatherName}
                onChange={handleChange}
              />
              {/* <input
                className="w-full p-2 border rounded-lg"
                name="email"
                value={editUser.email}
                onChange={handleChange}
              /> */}
              <input
                className="w-full p-2 border rounded-lg"
                name="contact"
                value={editUser.contact}
                onChange={handleChange}
              />
              <input
                className="w-full p-2 border rounded-lg"
                name="dob"
                type="date"
                value={editUser.dob}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
