import moment from "moment";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const ArticleCard = ({ allBlog,  image }) => {
  // console.log(image);
  // console.log(allBlog.comments.length);
  // console.log(blog);
  const navigate=useNavigate();
  const {user}=useAuth();

  const handleTitleClick = () => {
    if (user && (user.role === "user" || user.role === "admin")) {
      navigate(`/blog/${allBlog._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="p-4 border-b   flex gap-6 items-center w-[90%] hover:bg-gray-200 transition-all duration-200 ">
        {/* Text Section */}
        <div className="w-[75%]">
        <h3
          onClick={handleTitleClick}
          className="text-xl font-semibold w-[90%] cursor-pointer hover:underline"
        >
          {allBlog.title}
        </h3>

          <p className="text-sm text-gray-500">
            {allBlog.author?.name || "Unknown Author"} ·{" "}
            {moment(allBlog.createdAt).fromNow()}
          </p>
          <p className="text-gray-700 text-sm mt-2">
            {allBlog.likes.length} Likes · {allBlog.comments.length} comments
          </p>
        </div>

        {/* Image Section */}
        <div className="w-32 h-20 flex-shrink-0">
          <img
            src={image.url}
            alt="no image"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>
    </>
  );
};

export default ArticleCard;



