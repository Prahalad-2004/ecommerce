import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
  return (
    <Layout title={"Your Profile"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Profile
            </h1>

            {/* Profile Update Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  placeholder="Enter your address"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
