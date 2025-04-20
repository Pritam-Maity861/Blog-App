import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const UpdateBlog = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("other");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/post/${id}`);
        const blog = response.data.data;
        setTitle(blog.title);
        setContent(blog.content);
        setCategory(blog.category);
        // image URL might be in blog.image, if needed for display or update
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", user._id);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8080/post/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate(`/blog/${id}`); 
    } catch (err) {
      console.error("Blog update failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto font-sans">
        <h2 className="text-2xl mb-4 font-semibold">Update Blog Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="p-2 border rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Business">Business</option>
            <option value="other">Other</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateBlog;
