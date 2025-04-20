import React, { useEffect, useState } from "react";
import "./AllUser.css";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {Link} from "react-router-dom"
// import toast from "react-hot-toast";

const AllusersBlog = () => {
  const [allBlog, setAllBlog] = useState([]);
  console.log(allBlog);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/post/all-post", {
          withCredentials: true,
        });
        setAllBlog(response.data.data);
      } catch (error) {
        console.log("Error while fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/post/delete/${blogId}`,
        { withCredentials: true }
      );
      setAllBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      console.log(response);
      // toast.success(response.data.message); // Optional
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Something went wrong while deleting the blog.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="userTable p-4">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-500 p-2">SL.No.</th>
              <th className="border border-gray-500 p-2">Title</th>
              <th className="border border-gray-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allBlog.map((blog, index) => (
              <tr key={blog._id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">
                    <Link to={`/blog/${blog._id}`}>
                    {blog.title}
                    </Link>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this blog?")) {
                        deleteBlog(blog._id);
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

export default AllusersBlog;
