import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", email: "",password:"" });

  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/register", userInfo);
       toast.success("Registration successful! Please Login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Ragistration failed! Please check your input.");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevuserInfo) => ({ ...prevuserInfo, [name]: value }));
  };
  
  return (
    <div className='fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
      <form onSubmit={submitHandler}> 
      <div className="bg-white p-12 rounded-xl">
        <div className='flex flex-col gap-4 mx-2 max-w-[450px]'>
        <Link to="/" type="button" className=" relative top-2 right-2">
        <i class="fa-solid fa-xmark"></i>
        </Link>
      <h2>Welcome to Blog App</h2>
      <p>Please Register to Explore.. </p>
      <div>
        <label className='font-bold  text-gray-700 ' htmlFor="name">Name*</label>
        <input onChange={inputHandler} type="text" name='name' placeholder='Enter your name' required className='p-3 mt-2 w-full rounded border border-gray-500' />
      </div>
      <div>
        <label className='font-bold  text-gray-700 ' htmlFor="email">Email*</label>
        <input onChange={inputHandler} type="email" name='email' placeholder='Enter your email' required className='p-3 mt-2 w-full rounded border border-gray-500' />
      </div>
      
      <div>
        <label className='font-bold  text-gray-700 ' htmlFor="name">Password*</label>
        <input onChange={inputHandler} type="password" name='password' placeholder='Enter your password' required className='p-3 mt-2 w-full rounded border border-gray-500' />
      </div>
      <div>
        <button type='submit' className=" bg-blue-500 border border-gray-500 text-white px-4 py-2 mr-3 rounded">
          Register
        </button>
        <Link to="/" className=" bg-gray-400 border  border-gray-500   text-white  px-5 py-2 rounded">
          Cancel
        </Link>
        <p className='text-dark-grey mt-2'>Already have an account?
          <Link className='text-blue-600 ml-2' to="/login">
          login
          </Link>
        </p>
        </div>
      </div>
      </div>
      
      
      </form>
      
    </div>
  )
}

export default Register
