import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const Navbar = ({ setSelectedTopic }) => {
  const navigate = useNavigate();
  const [searchboxvisible, setSearchboxvisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
      <Link
        to="/"
        onClick={() => {
          setSelectedTopic("");
        }}
        className="flex-none bold font-bold text-2xl"
      >
        <h1>Approach</h1>
      </Link>

      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray-400 md:border-0 md:block md:p-0 md:relative md:inset-0   md:w-auto  md:show " +
          (searchboxvisible ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-[75%] bg-gray-100 p-2 rounded-full pl-6 pr-[12%] md:pr-6  placeholder:text-gray-400 md:pl-12 "
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 "></i>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <Link to="/ourStory" className="text-sm px-3 py-2">
          Our Story
        </Link>

        {user ? (
          <>
            {(user.role === "user" || user.role === "admin") && (
              <button
              onClick={() => {
                if (user && (user.role === "user" || user.role === "admin")) {
                  navigate("/createblog");
                } else {
                  navigate("/login");
                }
              }}
              className="text-sm px-3 py-2 hover:underline"
            >
              Write
            </button>
            
            )}

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-gray-300 px-4 py-2 rounded-full"
              >
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute top-full flex flex-col w-60 gap-1 right-0  pt-3 mt-3  bg-white shadow-md rounded-md z-50">
                  <div className="text-center bg-slate-300">
                    {user.email}
                    <br />
                    {user.name}
                  </div>
                  <ul className="flex flex-col gap-2  p-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/dashboard"
                        className="hover:bg-gray-100 p-2 rounded"
                      >
                        Dashboard
                      </Link>
                    </li>
                    {user.role === "user" && (
                      <>
                        <li>
                          <Link
                            to="/MyBlogs"
                            className="hover:bg-gray-100 p-2 rounded"
                          >
                            My Blogs
                          </Link>
                        </li>
                      </>
                    )}
                    {user.role === "admin" && (
                      <>
                        <li>
                          <Link
                            to="/myblogs"
                            className="hover:bg-gray-100 p-2 w-full rounded"
                          >
                            My Blogs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/UserList"
                            className="hover:bg-gray-100 p-2 rounded"
                          >
                            All Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/allusersblogs"
                            className="hover:bg-gray-100 p-2 rounded"
                          >
                            All Users' Blogs
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <button
                        onClick={logout}
                        className="text-left w-full hover:bg-gray-100 p-2 rounded"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                if (user && (user.role === "user" || user.role === "admin")) {
                  navigate("/createblog");
                } else {
                  navigate("/login");
                }
              }}
              className="text-sm px-3 py-2 hover:underline"
            >
              Write
            </button>

            <Link
              className="whitespace-nowrap bg-black text-white rounded-full py-2 px-6 capitalize hover:bg-opacity-80"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="whitespace-nowrap bg-gray-300 text-black py-2 rounded-full px-6 hidden md:block  hover:bg-opacity-80"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
