import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="px-3 py-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 w-full">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
              <UserMenu />
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <h1 className="text-2xl font-semibold text-center mb-6">All Orders</h1>

            {orders?.map((o, i) => (
              <div
                key={o?._id || i}
                className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Table-like order summary */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-gray-600">
                        <th className="px-4 py-3 font-medium">#</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Buyer</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Payment</th>
                        <th className="px-4 py-3 font-medium">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3">{i + 1}</td>
                        <td className="px-4 py-3">{o?.status}</td>
                        <td className="px-4 py-3">{o?.buyer?.name}</td>
                        <td className="px-4 py-3">
                          {moment(o?.createdAt || o?.createAt).fromNow()}
                        </td>
                        <td className="px-4 py-3">
                          {o?.payment?.success ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                              Failed
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Products list */}
                <div className="p-4 grid gap-4">
                  {o?.products?.map((p) => (
                    <div
                      key={p?._id}
                      className="flex gap-4 rounded-xl border border-gray-100 p-3 md:p-4"
                    >
                      <div className="shrink-0">
                        <img
                          src={`/api/v1/product/product-photo/${p?._id}`}
                          alt={p?.name}
                          className="h-24 w-24 md:h-28 md:w-28 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{p?.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {p?.description?.substring(0, 30)}
                          {p?.description?.length > 30 ? "..." : ""}
                        </p>
                        <p className="mt-2 text-sm">
                          <span className="text-gray-500">Price:</span>{" "}
                          <span className="font-semibold">{p?.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {(!orders || orders.length === 0) && (
              <div className="text-center text-gray-600">No orders yet.</div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
