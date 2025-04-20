import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../components/context/UseAuth';
import { toast } from 'react-toastify';
import Loading from '../components/layout/Loading';


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({email: "",password:"" });
  const [loading, setLoading] = useState(false); 
  
  const { login } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true); 

        axios.post('http://localhost:8080/user/login', loginInfo,{
          withCredentials:true
        })
            .then((res) => {
               
                // console.log("Login done", res);
                const { user } = res.data;
                // localStorage.setItem('token', JSON.stringify(accessToken));
                const { password, ...safeUser } = user;
                localStorage.setItem("user", JSON.stringify(safeUser));
                
                login(safeUser);
                toast.success("Login successful! Welcome back 👋");
                  navigate("/")
               
                
            })
            .catch((err) => {
              // console.error("Error while login", err);
              if (err.response && err.response.data.message === 'Invalid credentials') {
                toast.error("Email or password is incorrect!");
              } else {
                toast.error("Login failed! Please check your credentials.");
              }
                setLoginInfo({email: "",password:"" })
            }).finally(() => {
              setLoading(false); 
            })
    };


    const inputHandler = (e) => {
      const { name, value } = e.target;
      setLoginInfo((prevloginInfo) => ({ ...prevloginInfo, [name]: value }));
    };

    if (loading) return <Loading />;

  return (
    <div className='fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
      <form onSubmit={handleSubmit}> 
      <div className="bg-white p-12 rounded-xl">
        <div className='flex flex-col gap-4  max-w-[400px]'>
          <Link to="/" type="button" className=" relative top-3 right-3">
                  <i className="fa-solid fa-xmark"></i>
                  </Link>
      <h2>Welcome Back!</h2>
      <p>Please login to explore more </p>
      <div>
        <label className='font-bold  text-gray-700 ' htmlFor="email">Email*</label>
        <input onChange={inputHandler} name='email' type="text" placeholder='Enter your email' required className='p-3 mt-2 w-full rounded-full border border-gray-500' />
      </div>
      <div>
        <label className='font-bold  text-gray-700 ' htmlFor="name">Password*</label>
        <input onChange={inputHandler} name='password' type="password" placeholder='Enter your password' required className='p-3 mt-2 w-full rounded-full border border-gray-500' />
      </div>
      <div>
        <button type='submit' className=" bg-blue-500  hover:bg-blue-400 text-white px-6 py-2 mr-2 rounded">
          Login
        </button>
        <Link to="/" className=" bg-gray-400 border  border-gray-500  text-white px-4 py-2 rounded">
          Cancel
        </Link>
        <p className='text-dark-grey mt-2'>Don't have any account?
          <Link className=' text-blue-500 ml-2' to="/register">
          Register
          </Link>
        </p>
        </div>
      </div>
      </div>
      </form>
    </div>
  )
}

export default Login
