import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import MyBlogs from "./pages/MyBlogs";
import AllUsers from "./pages/AllUsers";
import OurStory from "./pages/OurStory";
import Loading from "./components/layout/Loading";
import AllusersBlog from "./pages/AllusersBlog";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
 
  return (
    <>
    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/UserList" element={<AllUsers />} />
        <Route path="/ourStory" element={<OurStory />} />
        <Route path="/allusersblogs" element={<AllusersBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
