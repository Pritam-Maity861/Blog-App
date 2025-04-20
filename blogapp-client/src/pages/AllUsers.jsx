import React, { useEffect, useState } from "react";
import "./AllUser.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// import toast from "react-hot-toast";

const User = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getuser",{
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(
          "There is a error while fetching data from backend..",
          error
        );
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8080/user/deleteUser/${userId}`,{
        withCredentials: true,
      })
      .then((response) => {
        setUser((prevUser) => prevUser.filter((user) => user._id !== userId));
        console.log(response);
        // toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
        alert("Something went wrong while deleting the user.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="userTable p-4">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-500 p-2">SL.No.</th>
              <th className="border border-gray-500 p-2">Name</th>
              <th className="border border-gray-500 p-2">Email</th>
              <th className="border border-gray-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user._id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this user?")) {
                        deleteUser(user._id);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default User;

