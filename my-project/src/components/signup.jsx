import React,{useState} from "react";
import { Toaster, toast } from "sonner";
import image from "../assets/wp13293242-anime-landscape-night-wallpapers.jpg";
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_API;

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [password2, setpassword2] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${backendUrl}signup/`, {
            username,
            email,
            password,
            password2,
          });
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
          setTimeout(()=>{
            toast.success('Account Created');
          },1500)
          navigate('/'); 
        } catch (error) {
          toast.error('Signup failed');
        }
      };



  return (
    <div
      className={`flex items-center justify-center min-h-screen`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <div className="fixed">   
        <Toaster position="top-right" richColors/>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-30 rounded-lg shadow-2xl opacity-90">
        <h2 className="text-2xl font-bold text-center text-gray-200">
          Create account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 border rounded-md shadow-xl bg-black bg-opacity-40 border-none focus:border-none focus:outline-none placeholder-gray-500"
              placeholder="Enter your username"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 border rounded-md shadow-xl bg-black bg-opacity-40 border-none focus:border-none focus:outline-none placeholder-gray-600"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}

            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 border rounded-md shadow-xl bg-black bg-opacity-40 border-none focus:border-none focus:outline-none placeholder-gray-600"
              placeholder="Enter your password"
              onChange={(e)=>setpassword(e.target.value)}

            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 border rounded-md shadow-xl bg-black bg-opacity-40 border-none focus:border-none focus:outline-none placeholder-gray-600"
              placeholder="Confirm your password"
              onChange={(e)=>setpassword2(e.target.value)}

            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#000000] rounded-md hover:bg-opacity-90 transition duration-200 shadow-2xl"
          >
            SignUp
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            LogIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
