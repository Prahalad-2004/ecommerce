import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="text-center">
              <button
                type="button"
                className=" text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
