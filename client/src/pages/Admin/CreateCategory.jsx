import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Create Category
            </h1>

            {/* Form Placeholder */}
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
