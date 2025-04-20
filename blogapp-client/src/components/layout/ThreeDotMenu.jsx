import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ThreeDotMenu = ({id}) => {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:8080/post/delete/${id}`)
      .then(() => {
        navigate("/");
      }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative inline-block text-left">
      {/* Three-dot button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full font-bold hover:bg-gray-200"
      >
        &#x22EE;
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
          <Link to={`/update/` + id}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            
          >
            Update
          </Link>
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() =>deleteUser(id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
