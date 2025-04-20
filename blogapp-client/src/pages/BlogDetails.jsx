import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import axios from "axios";
import ThreeDotMenu from "../components/layout/threeDotmenu.jsx";
import moment from "moment";
import { toast } from "react-toastify";

// const comments = [
//   {
//     id: 1,
//     author:"Rohit Kumar",
//     comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae dicta quis nisi obcaecati cumque saepe culpa. Consequuntur officia dolorum quasi cum, aut quae delectus sint quam qui?",
//     date:"Jan 1, 2024",
//   },
//   {
//     id: 2,
//     author:"Rajkumar Rao",
//     comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae dicta quis nisi obcaecati cumque saepe culpa. Consequuntur officia dolorum quasi cum, aut quae delectus sint quam qui?",
//     date:"Jan 1, 2024",
//   },
//   {
//     id: 3,
//     author:"Mukash Kavi",
//     comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae dicta quis nisi obcaecati cumque saepe culpa. Consequuntur officia dolorum quasi cum, aut quae delectus sint quam qui?",
//     date:"Jan 1, 2024",
//   },
// ];

const BlogDetails = () => {
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  // const [author, setAuthor] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.name)
  // console.log(singleBlog)

  const handleLikeToggle = async () => {
    if (!user) return toast.error("Please login to like this post");

    try {
      const response = await axios.post(
        `http://localhost:8080/post/${id}/like`,
        { userId: user._id },
        { withCredentials: true }
      );

      const updatedLikes = response.data.likes;
      setLikes(updatedLikes);
      setHasLiked(updatedLikes.includes(user._id));
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error("Failed to update like");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      const response = await axios.post(
        `http://localhost:8080/post/${id}/comment`,
        {
          content: commentText,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      setComments(response.data.blog.comments);
      localStorage.setItem(
        `comments-${id}`,
        JSON.stringify(response.data.blog.comments)
      );

      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // console.log(singleBlog)

  const handleDeleteComment = async (commentId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/post/comment/${id}/${commentId}`,
        {
          data: { userId },
          withCredentials: true,
        }
      );
      // console.log(response)

      if (response.data.success) {
        const updatedComments = comments.filter((com) => com._id !== commentId);
        setComments(updatedComments);
        localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
      } else {
        console.error("Failed to delete comment:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not authorized to delete this comment.");
      } else {
        console.error("Error deleting comment:", error);
        alert("An error occurred while deleting the comment.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get(
          `http://localhost:8080/post/${id}`
        );
        setSingleBlog(blogResponse.data);
        // console.log(blogResponse.data.data.author.name)

        setLikes(blogResponse.data.data.likes || []);
        setHasLiked(blogResponse.data.data.likes?.includes(user?._id));

        const storedComments = localStorage.getItem(`comments-${id}`);
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        } else {
          setComments(blogResponse.data.data.comments || []);
        }
      } catch (error) {
        console.log("Error while fetching blog or author data:", error);
      }
    };

    fetchData();
  }, [id, comments, user?._id]);

  if (!singleBlog) {
    return <h1 className="text-center mt-10 text-2xl">Blog Not Found</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">{singleBlog.data.title}</h1>

          {user?._id === singleBlog.data.author?._id && (
            <ThreeDotMenu id={id} />
          )}
        </div>
        <p className="text-gray-600 font-bold mt-2 mb-2">
          {singleBlog?.data?.author.name || "Unknown Author"} <b>.</b>{" "}
          {moment(singleBlog.data.createdAt).fromNow()}
        </p>

        {/* default img loading  */}
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = singleBlog.data.image.url;
          }}
          src={singleBlog.data.image}
        />

        {/* <img src={singleBlog.image} id='image' alt="" className="w-full my-6 rounded-lg" /> */}
        <p className="text-lg mt-3 leading-7">{singleBlog.data.content}</p>

        {/* now these all are manual data */}
        <div className="mt-4 text-gray-500 flex items-center gap-4">
          <span>👁 {singleBlog.data.views || 0}</span>
          <span>💬 {singleBlog.data.comments?.length || 0}</span>
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1"
          >
            <i
              className={`fa-heart fa-lg ${
                hasLiked ? "fa-solid text-red-500" : "fa-regular text-gray-500"
              }`}
            ></i>
            <span>{likes.length}</span>
          </button>
        </div>
        <div className="comments mt-5">
          <form onSubmit={handleCommentSubmit}>
            <label className="font-bold text-base text-gray-600">
              Comments*
            </label>
            <textarea
              rows="4"
              className="p-3 mb-1 mt-2 border border-gray-500 rounded w-full"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-full"
            >
              Comment <i className="fa-solid fa-forward"></i>
            </button>
          </form>
        </div>
        <div className="commentList mt-10">
          <h2 className="text-center font-bold text-gray-700">
            {" "}
            .....Comment List.....{" "}
          </h2>
          {comments.length > 0 ? (
            comments.map((com, index) => (
              <div key={index} className="mt-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-semibold">
                    {com.author?.name || "Anonymous"} ·{" "}
                    {moment(com.date).fromNow()}
                  </p>
                  {(user?._id === com.author?._id ||
                    user?._id === singleBlog.data.author?._id) && (
                    <button
                      onClick={() => handleDeleteComment(com._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-gray-600">{com.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;
