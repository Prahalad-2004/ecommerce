import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              All Orders
            </h1>

            {/* Orders Table Placeholder */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Order ID
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Date
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Status
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Rows */}
                  <tr>
                    <td className="px-4 py-2 border border-gray-200">#12345</td>
                    <td className="px-4 py-2 border border-gray-200">2025-08-10</td>
                    <td className="px-4 py-2 border border-gray-200">
                      <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                        Delivered
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-200">$120.00</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">#12346</td>
                    <td className="px-4 py-2 border border-gray-200">2025-08-15</td>
                    <td className="px-4 py-2 border border-gray-200">
                      <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-700">
                        Processing
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-200">$80.00</td>
                  </tr>
                  {/* Later: map orders dynamically from API */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
