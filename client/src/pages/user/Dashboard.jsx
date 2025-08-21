import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white shadow-md rounded-xl p-6 max-w-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span> {auth?.user?.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {auth?.user?.email}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {auth?.user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
