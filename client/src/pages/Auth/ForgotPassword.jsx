import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data &&res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Forgot Password - Ecommerce App">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your favorite book"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
