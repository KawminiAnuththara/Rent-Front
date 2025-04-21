import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if(loading){
        fetchUsers();
    }
  }, [loading]);

  function handleBlockUser(email){
    const token =localStorage.getItem("token");

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,{},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(()=>{
        setLoading(true);
    }).catch((err)=>{
        console.error(err);
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Users List</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Profile</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.address}</td>
                  <td onClick={()=>{handleBlockUser(user.email)}} className="py-2 px-4 border-b cursor-pointer">{user.isBlocked ? "BLOCKED":"ACTIVE"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
