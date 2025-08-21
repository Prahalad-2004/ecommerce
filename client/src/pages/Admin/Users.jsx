import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              All Users
            </h1>

            {/* Users Table Placeholder */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Name
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Email
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr>
                    <td className="px-4 py-2 border border-gray-200">John Doe</td>
                    <td className="px-4 py-2 border border-gray-200">john@example.com</td>
                    <td className="px-4 py-2 border border-gray-200">Admin</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">Jane Smith</td>
                    <td className="px-4 py-2 border border-gray-200">jane@example.com</td>
                    <td className="px-4 py-2 border border-gray-200">User</td>
                  </tr>
                  {/* Map actual users here later */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
