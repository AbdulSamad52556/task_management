import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import image from "../assets/wp13293242-anime-landscape-night-wallpapers.jpg";
import axiosInstance from '../axios';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_API;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}user/`, {
        email,
        password,
      });
      console.log(response.data)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
      // Redirect to dashboard or profile
      toast.success('Login Successfully');
      setTimeout(()=>{
        navigate('/dashboard')
      },1500)

    } catch (error) {
        console.log(error)
      toast.error('Login failed');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <div className="fixed">
        <Toaster position="top-right" richColors />
      </div>
      <div></div>
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-30 rounded-lg shadow-2xl opacity-90">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome
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
              type="email"
              id="email"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-200 border rounded-md shadow-xl bg-black bg-opacity-40 border-none focus:border-none focus:outline-none placeholder-gray-600"
              placeholder="Enter your Email"
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
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#000000] rounded-md hover:bg-opacity-90 transition duration-200 shadow-2xl"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
