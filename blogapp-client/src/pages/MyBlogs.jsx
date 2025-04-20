import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/post/delete/${id}`, {
        withCredentials: true,
      });

     
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/myblogs", {
          withCredentials: true,
        });
        // console.log(res.data);
        setBlogs(res.data);
      } catch (err) {
        console.log("Error fetching user blogs", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="userTable p-4">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-500 p-2">SL.No.</th>
              <th className="border border-gray-500 p-2">Name</th>
              <th className="border border-gray-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  You haven't posted any blogs yet.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                  </td>

                  <td className="border p-2 text-center flex justify-around">
                    <Link className="bg-yellow-300 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      to={`/update/${blog._id}`}
                      type="button"
                      
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link onClick={() => handleDelete(blog._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      <i className="fa-solid fa-trash" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyBlogs;
