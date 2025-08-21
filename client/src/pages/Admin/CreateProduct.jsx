import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Create Product
            </h1>

            {/* Product Form */}
            <form className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Books</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
