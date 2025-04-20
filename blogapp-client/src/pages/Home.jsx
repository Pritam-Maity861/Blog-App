import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import ArticleCard from "../components/blog/ArticleCard";
import Sidebar from "../components/layout/Sidebar";
import RecomendedTopics from "../components/blog/RecomendedTopics";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { blogs } from "../data";

const Home = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(""); 
  console.log(allBlog)
  // Fetching blog data based on selected topic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedTopic
          ? `http://localhost:8080/post/category/${selectedTopic}`
          : 'http://localhost:8080/post/all-post'; 
  
        const response = await axios.get(url);
        
        
        if (response.data && response.data.data) {
          const fetchedBlogs = response.data.data;
          const sortedBlogs = fetchedBlogs.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAllBlog(sortedBlogs);
        } else {
          setAllBlog([]);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
        setAllBlog([]); 
      }
    };

    fetchData();
  }, [selectedTopic]); 
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setSelectedTopic={setSelectedTopic} />
      <div className="max-w-6xl mx-auto flex mt-6 gap-6">
        <div className="w-full md:w-2/3">
          {allBlog && allBlog.length > 0 ? (
            allBlog.map((blog) => (
              <div key={blog._id}>
                <ArticleCard allBlog={blog} blog={blogs} image={blog.image} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              {selectedTopic
                ? `No blogs available in "${selectedTopic}" category`
                : "No blogs available"}
            </p>
          )}
        </div>
        <div className="w-0 md:w-1/3">
          <div className="hidden md:block">
            <Sidebar />
            <RecomendedTopics
              onTopicSelect={setSelectedTopic}
              selectedTopic={selectedTopic}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
